<p align="center">
  <img src="whale-logo/deepseek-whale-colorful.svg" width="150" alt="Little Whale">
</p>

<h1 align="center">Whale Color World DSHD · DeepSeek Harness Desktop</h1>

<p align="center">
  <b>DeepSeek Harness Desktop, for everyone.</b><br>
  A desktop distribution of <a href="https://github.com/deepseek-ai/deepseek-harness">DeepSeek Harness</a> with a bundled Node runtime and the <code>dsh</code> CLI — no Node.js or npm installation required.
</p>

<p align="center">
  <a href="#-download">⬇ Download</a> ·
  <a href="#-quick-start">🚀 Quick Start</a> ·
  <a href="#-features">✨ Features</a> ·
  <a href="#-screenshots">🖼 Screenshots</a> ·
  <a href="#-faq">❓ FAQ</a> ·
  <a href="#-developers">🛠 Developers</a> ·
  <a href="#-community">💬 Community</a>
</p>

<p align="center">
  <a href="README.md">简体中文</a> · <b>English</b>
</p>

---

## 🐳 About

**Whale Color World DSHD** (DeepSeek Harness Desktop) is a desktop distribution of DeepSeek Harness that puts the full power of Harness into an out-of-the-box desktop app:

- **No environment setup**: bundled Node runtime and `dsh` program — no Node.js / npm installation needed
- **Little Whale branding**: official whale colorway with the Whale Color World welcome page
- **Local-first data**: sessions, configs and plugins live in your user directory; the program directory is read-only
- **Painless upgrades**: reinstall over the old version — your data is fully preserved

## ✨ Features

- 🐳 **Whale Color World welcome page**: animated colorful whale + "Start the journey" CTA, shown once on first launch, re-openable anytime from Settings
- 🎨 **7 built-in skins**: Midnight / Nord / Sepia / Violet / Cartoon / Cute / Deep Blue — live preview and one-click apply, plus a reserved custom slot
- 🌗 **Dark / Light mode**: follow the system or switch manually
- 🔒 **Local-first**: data stored in `%USERPROFILE%\.dsh`; the program directory is read-only
- 🖥 **Windows & macOS**: x64 / ARM64 coverage

## ⬇ Download

Installers are hosted on [GitHub Releases](https://github.com/weichi-ai/dshd/releases):

| Platform | Package | Notes |
|---|---|---|
| Windows | `DSHD-setup-win-x64.exe` | Setup wizard; launch from Start menu / desktop shortcut |
| Windows | `DSHD` (portable) | Extract and run `DSHD.exe` directly |
| macOS | `DSHD-mac-arm64.zip` | Apple Silicon |
| macOS | `DSHD-mac-x64.zip` | Intel |

## 🚀 Quick Start

1. Download and install the package for your platform
2. Launch the app — the **Whale Color World welcome page** appears on first run; click **"Start the journey"** to enter the main UI
3. Enter your API Key / model config in Settings and start exploring

> On macOS the app is unsigned. First launch: **right-click → Open**, then run once:
> ```bash
> xattr -dr com.apple.quarantine /Applications/DSHD.app
> ```

## 🖼 Screenshots

| Welcome page | Home · Dark mode |
|---|---|
| ![Welcome](docs/assets/img/dshd-pics/opt/1.webp) | ![Dark home](docs/assets/img/dshd-pics/opt/2.webp) |

| Home · Light mode | Theme settings |
|---|---|
| ![Light home](docs/assets/img/dshd-pics/opt/3.webp) | ![Themes](docs/assets/img/dshd-pics/opt/4.webp) |

## ⚙️ Usage

- **Welcome page**: Settings → General → Welcome page → "Show welcome page again"
- **Skins**: Settings → General → Skin pack — browse the 7 skins with live preview and apply
- **Data directory**: `%USERPROFILE%\.dsh` (sessions, configs, plugins)

## ❓ FAQ

| Question | Answer |
|---|---|
| Antivirus / Defender warning | The app is unsigned; allowlist it. Code signing is planned for official releases |
| Double-click does nothing | Verify the installation is complete (check `resources\app\vendor\node` and `vendor\app` exist) |
| Want the `dsh` CLI | Run `resources\app\vendor\node\node.exe resources\app\vendor\app\node_modules\@deepseek-ai\dsh\lib\bin.js` in a terminal |
| Will upgrading lose data? | No. The program directory is read-only; upgrading = reinstalling over, user data stays in `%USERPROFILE%\.dsh` |

## 🛠 Developers

### Repository layout

```
dshd/
├── dshd-package/   # Electron packaging (Windows / macOS build scripts)
├── dsh-welcome/    # Welcome page plugin (whale animation + CTA)
├── dsh-skin-pack/  # Skin pack plugin (7 built-in skins + custom slot)
├── whale-logo/     # Brand assets: Little Whale logo generation & frontend patches
└── docs/           # Official website (published via GitHub Pages)
```

### Build

```powershell
# Windows installer (outputs to dist\)
powershell -NoProfile -ExecutionPolicy Bypass -File dshd-package/build.ps1

# macOS packages (requires network to download darwin Electron/Node)
powershell -NoProfile -ExecutionPolicy Bypass -File dshd-package/build-mac.ps1
```

### Branding & plugins

- Branding patch: `whale-logo/patch-frontend.js` (frontend title / icons / whale gradient)
- Plugin source: `dsh-skin-pack` (skins), `dsh-welcome` (welcome page) — Cordis plugins, MIT licensed

## 📦 Website

The official website (the `docs/` folder of this repo) is published via GitHub Pages:

<p align="center"><a href="https://weichi-ai.github.io/dshd/">🌐 weichi-ai.github.io/dshd</a></p>

## 💬 Community

| Channel | How |
|---|---|
| QQ Group | **929082451** |
| WeChat Group | Scan the QR code on the website |
| Email | [2078580136@qq.com](mailto:2078580136@qq.com) |

## ⭐ Support Us

If this project helps you, please **Star ⭐** and share it with friends who love to explore — your support keeps us going!

## 📄 License

[MIT](LICENSE) © 2026 weichi-ai
