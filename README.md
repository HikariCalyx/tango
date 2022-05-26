# Tango

Tango is rollback netplay for Mega Man Battle Network.

## Design

Tango is composed of two parts: the launcher and the core. The launcher performs high-level control operations, such as starting matches and configuration, while the core performs emulation and netplay. There are additional supplementary tools (replayview, replaydump, keymaptool) that the launcher may also use for certain specialized operations.

The core and launcher send IPC requests to each other over stdout/stdin pipes.

## Building

### Core

The core is written in Rust. Despite being for Windows, you must have a POSIX-y MinGW environment set up. The following instructions are for Ubuntu.

1.  Install Rust.

    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

1.  Install the Rust target and toolchain for `x86_64-pc-windows-gnu`.

    ```sh
    rustup target add x86_64-pc-windows-gnu
    rustup toolchain install stable-x86_64-pc-windows-gnu
    ```

1.  Install mingw-w64.

    ```sh
    sudo apt-get install -y mingw-w64
    ```

1.  Dowload the DLLs for SDL2.

    ```sh
    pushd core &&
    ./get-windows-sdl.sh &&
    popd
    ```

1.  Ensure mingw-w64 is using the POSIX threading model.

    ```sh
    sudo update-alternatives --install /usr/bin/x86_64-w64-mingw32-gcc x86_64-w64-mingw32-gcc /usr/bin/x86_64-w64-mingw32-gcc-win32 60 &&
    sudo update-alternatives --install /usr/bin/x86_64-w64-mingw32-gcc x86_64-w64-mingw32-gcc /usr/bin/x86_64-w64-mingw32-gcc-posix 90 &&
    sudo update-alternatives --config x86_64-w64-mingw32-gcc &&
    sudo update-alternatives --install /usr/bin/x86_64-w64-mingw32-g++ x86_64-w64-mingw32-g++ /usr/bin/x86_64-w64-mingw32-g++-win32 60 &&
    sudo update-alternatives --install /usr/bin/x86_64-w64-mingw32-g++ x86_64-w64-mingw32-g++ /usr/bin/x86_64-w64-mingw32-g++-posix 90 &&
    sudo update-alternatives --config x86_64-w64-mingw32-g++
    ```

1.  Build the core.

    ```sh
    cd core &&
    cargo build --target x86_64-pc-windows-gnu
    ```

### Launcher

The launcher is written in Node + Electron.

1.  Run `npm install` to get all Node dependencies.

    ```sh
    cd launcher &&
    npm install
    ```

1.  Make a `dev-bin` directory in `launcher` and copy the core files into it. Note you will need to do this on every rebuild.

    ```sh
    mkdir launcher/dev-bin &&
    cp /usr/x86_64-w64-mingw32/lib/libwinpthread-1.dll \
        /usr/lib/gcc/x86_64-w64-mingw32/9.3-posix/*.dll \
        core/target/x86_64-pc-windows-gnu/release/tango-core.exe \
        core/target/x86_64-pc-windows-gnu/release/replayview.exe \
        core/target/x86_64-pc-windows-gnu/release/replaydump.exe \
        core/target/x86_64-pc-windows-gnu/release/keymaptool.exe \
        launcher/dev-bin
    ```

1.  In the `launcher` directory, you can use the following commands:

    ```sh
    npm run start  # start webpack (keep this running in the background)
    npm run start:main  # start electron (run this in a new terminal)
    ```

### Server

#### Signaling

The signaling server is the remote HTTP server-based component that Tango connects to. It doesn't actually do very much, so you can run it on absolutely piddly hardware. All it does is provide signaling by sending WebRTC SDPs around.

If you already have Rust installed, you can build it like so:

1.  Enter the core directory and build it.

    ```sh
    cd core &&
    cargo build --release --bin tango-signaling-server
    ```

That should be it! The server should be available in the usual Rust output directory.

##### ICE configuration

**An ICE configuration server is not provided. You must write your own. Note that by default Tango will use Google's public STUN servers, but will not use any TURN servers.**

If you want to guarantee connections across even funny NATed connections, you will need to use an ICE configuration server. This can be configured in Tango under _Settings > Advanced > ICE configuration endpoint_.

The ICE configuration server must:

-   Run over HTTP or HTTPS.
-   Accept, via POST, `GetRequest` and return `GetResponse` as defined in `core/tango-protos/src/protos/iceconfig.proto`. Note that these must be in serialized Protobuf format.

## Automatic Updates

Whenever a new version of Tango is released, Tango will download the update for you automatically. When you see a **purple** dot on the Settings cog in Tango, the update is currently being downloaded. When you see a **blue** dot on the Settings cog, the download is complete, and will be installed once Tango is closed. When you next open Tango, it will be running the up-to-date version.

**_A note for Linux users:_**

The `.AppImage` release for Linux users also fully supports automatic updates! However, due to how the update process works, the original `.AppImage` you downloaded will be replaced with the latest `.AppImage` file, _effectively renaming it_. This renaming will break any scripts, shortcuts, or `.desktop` entries you may have created against the original filename. However, this can easily be avoided; simply rename your `.AppImage` to `Tango.AppImage` - the key is removing the version number. If you do this, you will still receive automatic updates, but the `.AppImage` won't be renamed after an update, meaning any scripts or shortcuts pointing to Tango will continue working after updates.

## Language support

Tango is fully internationalized and supports language switching based on your computer's language settings.

The order of language support is as follows:

-   **English (en):** This is Tango's primary and fallback language. All Tango development is done in English.

-   **Japanese (ja):** This is Tango's secondary but fully supported language. All text in the UI, barring some extremely supplementary text (e.g. the About screen) is expected to be available in Japanese. If new UI text is added, a Japanese translation SHOULD also be provided. Tango releases MUST NOT contain missing Japanese text.

-   **Simplified Chinese (zh-Hans), Spanish (es):** These are Tango's tertiary languages. Support is provided on a best effort basis and translations are provided as available.
