#!/usr/bin/env bash
# Wrapper that provides the Nix-store library paths Playwright's Chromium
# headless shell needs at runtime.
#
# Paths are discovered dynamically via `nix-instantiate --eval` so the script
# survives Nix package upgrades — no hardcoded store hashes.
set -e

# Query nixpkgs for each package's lib dir.  nix-instantiate evaluates the
# Nix expression without building anything and returns the store paths
# computed from the current channel — fast (~30 s) and always up to date.
EXTRA_LIBS="$(nix-instantiate --eval --raw -E '
  let
    pkgs = import <nixpkgs> {};
    dirs = [
      "${pkgs.libgbm}/lib"           # libgbm.so.1   (mesa-libgbm)
      "${pkgs.eudev}/lib"            # libudev.so.1
      "${pkgs.glib.out}/lib"         # libglib-2.0.so.0, libgobject, libgio
      "${pkgs.nspr}/lib"             # libnspr4.so
      "${pkgs.nss}/lib"              # libnss3.so, libnssutil3.so
      "${pkgs.at-spi2-core}/lib"     # libatspi.so.0, libatk-1.0.so.0
      "${pkgs.at-spi2-atk}/lib"      # libatk-bridge-2.0.so.0
      "${pkgs.dbus.lib}/lib"         # libdbus-1.so.3
      "${pkgs.xorg.libX11}/lib"      # libX11.so.6
      "${pkgs.xorg.libXcomposite}/lib"  # libXcomposite.so.1
      "${pkgs.xorg.libXdamage}/lib"     # libXdamage.so.1
      "${pkgs.xorg.libXext}/lib"        # libXext.so.6
      "${pkgs.xorg.libXfixes}/lib"      # libXfixes.so.3
      "${pkgs.xorg.libXrandr}/lib"      # libXrandr.so.2
      "${pkgs.xorg.libxcb}/lib"         # libxcb.so.1
      "${pkgs.libxkbcommon}/lib"        # libxkbcommon.so.0
      "${pkgs.alsa-lib}/lib"            # libasound.so.2
    ];
  in builtins.concatStringsSep ":" dirs
' 2>/dev/null)"

export LD_LIBRARY_PATH="${EXTRA_LIBS}${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"

exec pnpm exec playwright test tests/hero-mobile.spec.ts "$@"
