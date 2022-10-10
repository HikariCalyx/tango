use chrono_locale::LocaleDate;
use fluent_templates::Loader;

use crate::{audio, game, gui, i18n, patch, replay, rom, save, scanner, session, stats};

struct Selection {
    path: std::path::PathBuf,
    game: &'static (dyn game::Game + Send + Sync),
    replay: replay::Replay,
    save: Box<dyn save::Save + Send + Sync>,
    rom: Vec<u8>,
    patch: Option<(String, semver::Version, patch::Version)>,
    assets: Option<Box<dyn rom::Assets + Send + Sync>>,
    save_view: gui::save_view::State,
}

pub struct State {
    replays_scanner: scanner::Scanner<Vec<(std::path::PathBuf, bool, replay::Metadata)>>,
    selection: Option<Selection>,
}

impl State {
    pub fn new() -> Self {
        Self {
            selection: None,
            replays_scanner: scanner::Scanner::new(),
        }
    }

    pub fn rescan(&self, ctx: &egui::Context, replays_path: &std::path::Path) {
        tokio::task::spawn_blocking({
            let replays_scanner = self.replays_scanner.clone();
            let replays_path = replays_path.to_path_buf();
            let egui_ctx = ctx.clone();
            move || {
                replays_scanner.rescan(move || {
                    let mut replays = vec![];
                    for entry in walkdir::WalkDir::new(&replays_path) {
                        let entry = match entry {
                            Ok(entry) => entry,
                            Err(_) => {
                                continue;
                            }
                        };

                        if !entry.file_type().is_file() {
                            continue;
                        }

                        let path = entry.path();
                        let mut f = match std::fs::File::open(path) {
                            Ok(f) => f,
                            Err(_) => {
                                continue;
                            }
                        };

                        let (num_inputs, metadata) = match replay::read_metadata(&mut f) {
                            Ok((n, metadata)) => (n, metadata),
                            Err(_) => {
                                continue;
                            }
                        };

                        replays.push((path.to_path_buf(), num_inputs > 0, metadata));
                    }
                    replays.sort_by_key(|(_, _, metadata)| {
                        (
                            std::cmp::Reverse(metadata.ts),
                            metadata.link_code.clone(),
                            metadata.round,
                        )
                    });
                    Some(replays)
                });
                egui_ctx.request_repaint();
            }
        });
    }
}

pub fn show(
    ui: &mut egui::Ui,
    clipboard: &mut arboard::Clipboard,
    font_families: &gui::FontFamilies,
    state: &mut State,
    replay_dump_windows: &mut gui::replay_dump_windows::State,
    language: &unic_langid::LanguageIdentifier,
    patches_path: &std::path::Path,
    patches_scanner: patch::Scanner,
    roms_scanner: rom::Scanner,
    replays_path: &std::path::Path,
    audio_binder: audio::LateBinder,
    emu_tps_counter: std::sync::Arc<parking_lot::Mutex<stats::Counter>>,
    session: std::sync::Arc<parking_lot::Mutex<Option<session::Session>>>,
) {
    let roms = roms_scanner.read();
    let patches = patches_scanner.read();

    egui::SidePanel::left("replays-window-left-panel").show_inside(ui, |ui| {
        egui::ScrollArea::vertical()
            .auto_shrink([false, false])
            .id_source("replays-window-left")
            .show(ui, |ui| {
                if state.replays_scanner.is_scanning() {
                    ui.horizontal(|ui| {
                        ui.spinner();
                        ui.label(i18n::LOCALES.lookup(language, "replays-scanning").unwrap());
                    });
                    return;
                }

                let replays = state.replays_scanner.read();
                ui.with_layout(egui::Layout::top_down_justified(egui::Align::LEFT), |ui| {
                    for (path, _, metadata) in replays.iter() {
                        let ts = if let Some(ts) =
                            std::time::UNIX_EPOCH.checked_add(std::time::Duration::from_millis(metadata.ts))
                        {
                            ts
                        } else {
                            continue;
                        };

                        let local_side = if let Some(side) = metadata.local_side.as_ref() {
                            side
                        } else {
                            continue;
                        };

                        let remote_side = if let Some(side) = metadata.remote_side.as_ref() {
                            side
                        } else {
                            continue;
                        };

                        let game_info = if let Some(game_info) = local_side.game_info.as_ref() {
                            game_info
                        } else {
                            continue;
                        };

                        let game = if let Some(game) =
                            game::find_by_family_and_variant(game_info.rom_family.as_str(), game_info.rom_variant as u8)
                        {
                            game
                        } else {
                            continue;
                        };

                        let selected = state.selection.as_ref().map(|s| &s.path) == Some(path);
                        let text_color = if selected {
                            ui.ctx().style().visuals.selection.stroke.color
                        } else {
                            ui.visuals().text_color()
                        };

                        let mut layout_job = egui::text::LayoutJob::default();
                        layout_job.append(
                            &chrono::DateTime::<chrono::Local>::from(ts)
                                .formatl("%c", &language.to_string())
                                .to_string(),
                            0.0,
                            egui::TextFormat::simple(
                                ui.style().text_styles.get(&egui::TextStyle::Body).unwrap().clone(),
                                text_color,
                            ),
                        );
                        layout_job.append(
                            "\n",
                            0.0,
                            egui::TextFormat::simple(
                                ui.style().text_styles.get(&egui::TextStyle::Body).unwrap().clone(),
                                text_color,
                            ),
                        );
                        layout_job.append(
                            &i18n::LOCALES
                                .lookup_with_args(
                                    language,
                                    "replay-subtitle",
                                    &std::collections::HashMap::from([
                                        (
                                            "game_family",
                                            i18n::LOCALES
                                                .lookup(
                                                    language,
                                                    &format!("game-{}.short", game.family_and_variant().0),
                                                )
                                                .unwrap()
                                                .into(),
                                        ),
                                        ("link_code", metadata.link_code.clone().into()),
                                        ("nickname", remote_side.nickname.clone().into()),
                                    ]),
                                )
                                .unwrap(),
                            0.0,
                            egui::TextFormat::simple(
                                ui.style().text_styles.get(&egui::TextStyle::Small).unwrap().clone(),
                                text_color,
                            ),
                        );

                        if ui.selectable_label(selected, layout_job).clicked() {
                            let mut f = match std::fs::File::open(&path) {
                                Ok(f) => f,
                                Err(e) => {
                                    log::error!("failed to load replay {}: {:?}", path.display(), e);
                                    continue;
                                }
                            };

                            let replay = match replay::Replay::decode(&mut f) {
                                Ok(replay) => replay,
                                Err(e) => {
                                    log::error!("failed to load replay {}: {:?}", path.display(), e);
                                    continue;
                                }
                            };

                            let save_state = if let Some(save_state) = replay.local_state.as_ref() {
                                save_state
                            } else {
                                continue;
                            };

                            let save = match game.save_from_wram(save_state.wram()) {
                                Ok(save) => save,
                                Err(e) => {
                                    log::error!("failed to load replay {}: {:?}", path.display(), e);
                                    continue;
                                }
                            };

                            let mut rom = if let Some(rom) = roms.get(&game) {
                                rom.clone()
                            } else {
                                continue;
                            };

                            let patch = if let Some(patch_info) = game_info.patch.as_ref() {
                                let patch = if let Some(patch) = patches.get(&patch_info.name) {
                                    patch
                                } else {
                                    continue;
                                };

                                let version = if let Ok(version) = semver::Version::parse(&patch_info.version) {
                                    version
                                } else {
                                    continue;
                                };

                                let version_meta = if let Some(version_meta) = patch.versions.get(&version) {
                                    version_meta
                                } else {
                                    continue;
                                };

                                let (rom_code, revision) = game.rom_code_and_revision();

                                rom = match patch::apply_patch_from_disk(
                                    &rom,
                                    game,
                                    patches_path,
                                    &patch_info.name,
                                    &version,
                                ) {
                                    Ok(r) => r,
                                    Err(e) => {
                                        log::error!(
                                            "failed to apply patch {}: {:?}: {:?}",
                                            patch_info.name,
                                            (rom_code, revision),
                                            e
                                        );
                                        continue;
                                    }
                                };

                                Some((patch_info.name.clone(), version, version_meta.clone()))
                            } else {
                                None
                            };

                            let assets = match game.load_rom_assets(
                                &rom,
                                save_state.wram(),
                                &patch
                                    .as_ref()
                                    .map(|(_, _, metadata)| metadata.rom_overrides.clone())
                                    .unwrap_or_default(),
                            ) {
                                Ok(assets) => Some(assets),
                                Err(e) => {
                                    log::error!("failed to load assets: {:?}", e);
                                    None
                                }
                            };

                            state.selection = Some(Selection {
                                path: path.clone(),
                                game,
                                replay,
                                save,
                                rom,
                                patch,
                                assets,
                                save_view: gui::save_view::State::new(),
                            });
                        }
                    }
                });
            });
    });

    egui::CentralPanel::default().show_inside(ui, |ui| {
        egui::ScrollArea::vertical()
            .auto_shrink([false, false])
            .id_source("replays-window-info")
            .vscroll(false)
            .show(ui, |ui| {
                let selection = if let Some(selection) = state.selection.as_mut() {
                    selection
                } else {
                    return;
                };

                ui.vertical(|ui| {
                    ui.with_layout(egui::Layout::right_to_left(egui::Align::Min), |ui| {
                        if ui
                            .button(format!("▶️ {}", i18n::LOCALES.lookup(language, "replays-play").unwrap()))
                            .clicked()
                        {
                            tokio::task::spawn_blocking({
                                let egui_ctx = ui.ctx().clone();
                                let audio_binder = audio_binder.clone();
                                let game = selection.game;
                                let patch = selection
                                    .patch
                                    .as_ref()
                                    .map(|(name, version, _)| (name.clone(), version.clone()));
                                let rom = selection.rom.clone();
                                let emu_tps_counter = emu_tps_counter.clone();
                                let replay = selection.replay.clone();

                                move || {
                                    *session.lock() = Some(
                                        session::Session::new_replayer(
                                            audio_binder,
                                            game,
                                            patch,
                                            &rom,
                                            emu_tps_counter,
                                            &replay,
                                        )
                                        .unwrap(),
                                    ); // TODO: Don't unwrap maybe
                                    egui_ctx.request_repaint();
                                }
                            });
                        }

                        if ui
                            .button(format!(
                                "💾 {}",
                                i18n::LOCALES.lookup(language, "replays-export").unwrap()
                            ))
                            .clicked()
                        {
                            replay_dump_windows.add_child(
                                selection.rom.clone(),
                                selection.replay.clone(),
                                selection.path.clone(),
                            );
                        }

                        ui.with_layout(egui::Layout::top_down_justified(egui::Align::Min), |ui| {
                            ui.horizontal(|ui| {
                                ui.with_layout(
                                    egui::Layout::left_to_right(egui::Align::Max).with_main_wrap(true),
                                    |ui| {
                                        ui.heading(&format!(
                                            "{}",
                                            selection
                                                .path
                                                .strip_prefix(replays_path)
                                                .unwrap_or(selection.path.as_path())
                                                .display()
                                        ));
                                    },
                                );
                            });
                        });
                    });
                    if let Some(assets) = selection.assets.as_ref() {
                        let game_language = selection.game.language();
                        gui::save_view::show(
                            ui,
                            false,
                            clipboard,
                            font_families,
                            language,
                            if let Some((_, _, metadata)) = selection.patch.as_ref() {
                                if let Some(language) = metadata.rom_overrides.language.as_ref() {
                                    language
                                } else {
                                    &game_language
                                }
                            } else {
                                &game_language
                            },
                            &selection.save,
                            &assets,
                            &mut selection.save_view,
                            false,
                        );
                    }
                });
            });
    });
}
