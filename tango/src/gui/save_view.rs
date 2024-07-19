mod auto_battle_data_view;
mod folder_view;
mod navi_view;
mod patch_cards_view;

use crate::{config, gui, i18n};
use fluent_templates::Loader;

#[derive(PartialEq, Clone)]
enum Tab {
    Navi,
    Folder,
    PatchCards,
    AutoBattleData,
}

pub struct State {
    tab: Option<Tab>,
    navi_view: navi_view::State,
    folder_view: folder_view::State,
    patch_cards_view: patch_cards_view::State,
    auto_battle_data_view: auto_battle_data_view::State,
}

impl State {
    pub fn new() -> Self {
        Self {
            tab: None,
            navi_view: navi_view::State::new(),
            folder_view: folder_view::State::new(),
            patch_cards_view: patch_cards_view::State::new(),
            auto_battle_data_view: auto_battle_data_view::State::new(),
        }
    }
}
pub fn show(
    ui: &mut egui::Ui,
    streamer_mode: bool,
    config: &config::Config,
    shared_root_state: &mut gui::SharedRootState,
    game_lang: &unic_langid::LanguageIdentifier,
    save: &(dyn tango_dataview::save::Save + Send + Sync),
    assets: &(dyn tango_dataview::rom::Assets + Send + Sync),
    state: &mut State,
    prefer_vertical: bool,
) {
    let lang = &config.language;

    ui.vertical(|ui| {
        let navi_view = save.view_navi();
        let chips_view = save.view_chips();
        let patch_cards_view = save.view_patch_cards();
        let auto_battle_data_view = save.view_auto_battle_data();

        let mut available_tabs = vec![];
        if navi_view.is_some() {
            available_tabs.push(Tab::Navi);
        }
        if chips_view.is_some() {
            available_tabs.push(Tab::Folder);
        }
        if patch_cards_view.is_some() {
            available_tabs.push(Tab::PatchCards);
        }
        if auto_battle_data_view.is_some() {
            available_tabs.push(Tab::AutoBattleData);
        }

        ui.horizontal(|ui| {
            if streamer_mode
                && ui
                    .selectable_label(
                        state.tab.is_none(),
                        i18n::LOCALES.lookup(lang, "save-tab-cover").unwrap(),
                    )
                    .clicked()
            {
                state.tab = None;
            }

            for tab in available_tabs.iter() {
                if ui
                    .selectable_label(
                        state.tab.as_ref() == Some(tab),
                        i18n::LOCALES
                            .lookup(
                                lang,
                                match tab {
                                    Tab::Navi => "save-tab-navi",
                                    Tab::Folder => "save-tab-folder",
                                    Tab::PatchCards => "save-tab-patch-cards",
                                    Tab::AutoBattleData => "save-tab-auto-battle-data",
                                },
                            )
                            .unwrap(),
                    )
                    .clicked()
                {
                    state.tab = Some(tab.clone());
                }
            }
        });

        if state.tab.is_none() && !streamer_mode {
            state.tab = available_tabs.first().cloned();
        }

        match state.tab {
            Some(Tab::Navi) => {
                if let Some(navi_view) = navi_view {
                    navi_view::show(
                        ui,
                        config,
                        shared_root_state,
                        game_lang,
                        &navi_view,
                        assets,
                        &mut state.navi_view,
                        prefer_vertical,
                    );
                }
            }
            Some(Tab::Folder) => {
                if let Some(chips_view) = chips_view {
                    folder_view::show(
                        ui,
                        config,
                        shared_root_state,
                        game_lang,
                        chips_view.as_ref(),
                        assets,
                        &mut state.folder_view,
                    );
                }
            }
            Some(Tab::PatchCards) => {
                if let Some(patch_cards_view) = patch_cards_view {
                    patch_cards_view::show(
                        ui,
                        config,
                        shared_root_state,
                        game_lang,
                        &patch_cards_view,
                        assets,
                        &mut state.patch_cards_view,
                    );
                }
            }
            Some(Tab::AutoBattleData) => {
                if let Some(auto_battle_data_view) = auto_battle_data_view {
                    auto_battle_data_view::show(
                        ui,
                        config,
                        shared_root_state,
                        game_lang,
                        auto_battle_data_view.as_ref(),
                        assets,
                        &mut state.auto_battle_data_view,
                    );
                }
            }
            None => {
                ui.with_layout(
                    egui::Layout::centered_and_justified(egui::Direction::LeftToRight)
                        .with_main_align(egui::Align::Center),
                    |ui| {
                        ui.label(i18n::LOCALES.lookup(lang, "save-cover-description").unwrap());
                    },
                );
            }
        }
    });
}
