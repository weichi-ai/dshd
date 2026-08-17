# 鲸彩世界DSHD

**鲸彩世界DSHD**（DeepSeek Harness Desktop）是基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的桌面发行版，内置 Node 运行时与 dsh 程序，免安装 Node.js / npm，开箱即用。

## 安装

运行 `鲸彩世界DSHD-setup-win-x64.exe`，按向导安装即可。安装后从开始菜单或桌面快捷方式启动。

> 免安装版：`鲸彩世界DSHD` 目录即免安装版，解压后直接运行 `鲸彩世界DSHD.exe`。

## 使用

1. 启动应用，首次打开会看到 **鲸彩世界欢迎页**（小彩鲸动画 + 「开启鲸彩之旅」按钮）。
2. 点击「开启鲸彩之旅」进入主界面；此后不再自动弹出。
3. 想再看欢迎页？设置 → 通用 → **欢迎页** → 「重新显示欢迎页」。
4. 换肤：设置 → 通用 → **皮肤包**，7 套皮肤点选预览、确认应用（午夜 / 冷杉 / 暖纸 / 紫罗兰 / 卡通 / 可爱 / 深蓝）。
5. 首次使用在设置里填 API Key / 模型配置。

## 数据在哪里

- 用户数据（会话、配置、插件）：`%USERPROFILE%\.dsh`（`C:\Users\你的用户名\.dsh`）
- 程序目录只读不改，**升级 = 用新版安装包覆盖安装**，数据不丢。
- 皮肤包与欢迎页插件随程序预置，首次启动自动装入用户数据目录。

## 常见问题

| 问题 | 解决 |
|---|---|
| 杀毒软件/Defender 提示 | 未签名程序，白名单放行即可；正式分发会做代码签名 |
| 双击没反应 | 确认安装完整（看 `resources\app\vendor\node` 与 `vendor\app` 是否存在） |
| 想用命令行 dsh | 黑窗口未开；可手动在终端跑 `resources\app\vendor\node\node.exe resources\app\vendor\app\node_modules\@deepseek-ai\dsh\lib\bin.js` |

## macOS 版

- `DSHD-1.0.0-mac-arm64.dmg`（Apple Silicon）/ `DSHD-1.0.0-mac-x64.dmg`（Intel）
- 同时提供对应 ZIP；打开 DMG 后将 `鲸彩世界DSHD.app` 拖入「应用程序」。
- 未签名：首次打开请**右键 → 打开**（或系统设置 → 隐私与安全性 → 仍要打开），并在终端执行一次：

```bash
xattr -dr com.apple.quarantine /Applications/鲸彩世界DSHD.app
```

## 开发者

- 构建 Windows：`powershell -NoProfile -ExecutionPolicy Bypass -File build.ps1 -CacheDir downloads`（Unicode NSIS 当前用户安装包 + 便携 ZIP）
- 构建 macOS：必须在对应架构的 macOS 上运行 `bash build-mac.sh 1.0.0`；也可手动触发 `.github/workflows/build-macos.yml`
- Windows 默认安装路径：`%LOCALAPPDATA%\Programs\DSHD`，主程序为 `DSHD.exe`，无需管理员权限；界面与快捷方式仍显示“鲸彩世界DSHD”
- 品牌补丁：`whale-logo\patch-frontend.js`（前端标题/图标/鲸鱼渐变）
- 插件源码：`dsh-skin-pack`（皮肤包）、`dsh-welcome`（欢迎页）
