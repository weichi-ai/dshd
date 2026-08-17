#!/usr/bin/env bash
# Native macOS builder. Run once on arm64 and once on x86_64.
set -euo pipefail

VERSION="${1:-1.0.0}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$ROOT/.." && pwd)"
ARCH="$(uname -m)"
case "$ARCH" in
  arm64) ARTIFACT_ARCH="arm64" ;;
  x86_64) ARTIFACT_ARCH="x64" ;;
  *) echo "Unsupported macOS architecture: $ARCH" >&2; exit 1 ;;
esac

APP_NAME="$(printf '%s' '6bK45b2p5LiW55WMRFNIRA==' | base64 --decode)"
ELECTRON_VERSION="37.10.3"
NODE_VERSION="v24.18.0"
DSH_VERSION="0.1.0-rc.6"
DIST="$ROOT/dist/mac-$ARTIFACT_ARCH"
WORK="$ROOT/dist/_macwork-$ARTIFACT_ARCH"
CACHE="$ROOT/downloads/mac-$ARTIFACT_ARCH"
APP="$WORK/$APP_NAME.app"
CONTENTS="$APP/Contents"
RESOURCES="$CONTENTS/Resources"
APP_RESOURCES="$RESOURCES/app"

rm -rf "$DIST" "$WORK"
mkdir -p "$DIST" "$WORK" "$CACHE"

download() {
  local url="$1"
  local destination="$2"
  if [[ ! -f "$destination" ]]; then
    curl --fail --location --retry 3 "$url" --output "$destination"
  fi
}

echo "== 1/8 download native runtimes ($ARTIFACT_ARCH) =="
ELECTRON_ZIP="$CACHE/electron-v$ELECTRON_VERSION-darwin-$ARTIFACT_ARCH.zip"
NODE_TGZ="$CACHE/node-$NODE_VERSION-darwin-$ARTIFACT_ARCH.tar.gz"
download "https://github.com/electron/electron/releases/download/v$ELECTRON_VERSION/electron-v$ELECTRON_VERSION-darwin-$ARTIFACT_ARCH.zip" "$ELECTRON_ZIP"
download "https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-darwin-$ARTIFACT_ARCH.tar.gz" "$NODE_TGZ"

echo "== 2/8 unpack Electron and Node =="
ditto -x -k "$ELECTRON_ZIP" "$WORK/electron"
mv "$WORK/electron/Electron.app" "$APP"
mkdir -p "$WORK/node"
tar -xzf "$NODE_TGZ" -C "$WORK/node" --strip-components 1
mv "$CONTENTS/MacOS/Electron" "$CONTENTS/MacOS/DSHD"
rm -f "$RESOURCES/default_app.asar" "$RESOURCES/electron.icns"

echo "== 3/8 install native DeepSeek Harness dependencies =="
mkdir -p "$WORK/dsh-app"
node -e 'const fs=require("fs");fs.writeFileSync(process.argv[1],JSON.stringify({name:"dshd-runtime",private:true,version:process.argv[2],dependencies:{"@deepseek-ai/dsh":process.argv[3]}},null,2)+"\n")' "$WORK/dsh-app/package.json" "$VERSION" "$DSH_VERSION"
(cd "$WORK/dsh-app" && npm install --ignore-scripts --no-audit --no-fund)

echo "== 4/8 assemble application resources =="
mkdir -p "$APP_RESOURCES/assets" "$APP_RESOURCES/vendor/app" "$APP_RESOURCES/vendor/node" "$APP_RESOURCES/vendor/plugins"
cp "$ROOT/electron/package.json" "$APP_RESOURCES/package.json"
cp "$ROOT/electron/main.js" "$ROOT/electron/bootstrap.js" "$ROOT/electron/capture.js" "$APP_RESOURCES/"
cp "$REPO_ROOT/whale-logo/deepseek-whale-icon-white.icns" "$RESOURCES/app.icns"
cp "$REPO_ROOT/whale-logo/deepseek-whale-icon-white.icns" "$APP_RESOURCES/assets/app.icns"
cp -R "$WORK/dsh-app/node_modules" "$APP_RESOURCES/vendor/app/node_modules"
cp -R "$WORK/node/bin" "$WORK/node/lib" "$APP_RESOURCES/vendor/node/"
cp -R "$REPO_ROOT/dsh-skin-pack" "$APP_RESOURCES/vendor/plugins/dsh-skin-pack"
cp -R "$REPO_ROOT/dsh-welcome" "$APP_RESOURCES/vendor/plugins/dsh-welcome"
find "$APP_RESOURCES/vendor/plugins" -type d -name scripts -prune -exec rm -rf {} +
sed "s/@@VERSION@@/$VERSION/g" "$ROOT/mac/Info.plist" > "$CONTENTS/Info.plist"
node -e 'const fs=require("fs");const p=process.argv[1];const x=JSON.parse(fs.readFileSync(p,"utf8"));x.version=process.argv[2];fs.writeFileSync(p,JSON.stringify(x,null,2)+"\n")' "$APP_RESOURCES/package.json" "$VERSION"

echo "== 5/8 apply application patches =="
node "$REPO_ROOT/whale-logo/patch-frontend.js" "$APP_RESOURCES/vendor/app/node_modules/@deepseek-ai/dsh-web-frontend/dist"
node "$REPO_ROOT/whale-logo/patch-apiproxy.js" "$APP_RESOURCES/vendor/app/node_modules/@deepseek-ai/dsh-host-apiproxy/lib/index.js"
chmod +x "$CONTENTS/MacOS/DSHD" "$APP_RESOURCES/vendor/node/bin/node"

echo "== 6/8 validate and ad-hoc sign =="
plutil -lint "$CONTENTS/Info.plist"
test "$(lipo -archs "$CONTENTS/MacOS/DSHD")" = "$ARCH"
test "$(lipo -archs "$APP_RESOURCES/vendor/node/bin/node")" = "$ARCH"
find "$APP" -name '*.cstemp' -delete
codesign --force --deep --sign "${APPLE_SIGN_IDENTITY:--}" "$APP"
codesign --verify --deep --strict --verbose=2 "$APP"

echo "== 7/8 create ZIP and DMG =="
ZIP="$DIST/DSHD-$VERSION-mac-$ARTIFACT_ARCH.zip"
DMG="$DIST/DSHD-$VERSION-mac-$ARTIFACT_ARCH.dmg"
ditto -c -k --sequesterRsrc --keepParent "$APP" "$ZIP"
mkdir -p "$WORK/dmg"
cp -R "$APP" "$WORK/dmg/"
ln -s /Applications "$WORK/dmg/Applications"
hdiutil create -volname "DSHD $VERSION" -srcfolder "$WORK/dmg" -ov -format UDZO "$DMG"

echo "== 8/8 checksums =="
(cd "$DIST" && shasum -a 256 "$(basename "$ZIP")" "$(basename "$DMG")" > SHA256SUMS.txt)
ls -lh "$DIST"
