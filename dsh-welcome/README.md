# dsh-welcome

鲸彩世界DSHD 欢迎页插件：首次启动显示全屏欢迎页（中央小彩鲸"游离跳跃"动画 + 介绍文案 + 「开启鲸彩之旅」按钮），仅按钮可关闭；点击后写入持久化标记（`settings.yaml` 的 `welcome.seen`），之后不再自动弹出；设置 → 通用 → 欢迎页 可随时「重新显示欢迎页」。

## 特性

- **全屏欢迎页**：深海渐变背景 + 中央彩色鲸鱼（官方鲸鱼形状）CSS 动画（游离漂移 + 跳跃 + 摇曳），6 个上升气泡点缀。
- **鲸鱼三色循环**：官方蓝（#426EFE）→ 官网黑（#111111，带浅描边保证深色背景可见）→ 五彩渐变，12 秒一轮交叉淡入淡出循环。
- **两行文案**：`你好，我是小彩鲸。` / `欢迎来到鲸彩世界，期待你与deepseek harness一起创造更加精彩的世界。`
- **仅按钮关闭**：点击「开启彩鲸之旅」淡出关闭并持久化 `seen`。
- **首次必显示**：`seen !== true` 时自动弹出；点击后不再打扰。
- **可重新开启**：设置 → 通用 → 欢迎页 → 「重新显示欢迎页」（立即重新弹出并清除 seen）。
- **自包含**：不修改主包 dist；卸载插件即恢复。
- **双语言**：设置行文案 zh/en。

## 安装

与 `dsh-skin-pack` 相同（profile + pnpm 插件机制）：

1. 把本包放进 profile 的依赖树：复制 `dsh-welcome` 目录到 `$DSH_HOME/profiles/node_modules/dsh-welcome`。
2. 在 `$DSH_HOME/profiles/<name>/cordis.patch.yml` 追加：

   ```yaml
   - insert:
       - id: dsh-welcome
         name: dsh-welcome
   ```

3. 重启 DSHD。首次启动即可看到欢迎页。

> 注意：host 端注册的 settings 命名空间需要被 dsh-host-apiproxy 暴露给浏览器（`WEB_SETTINGS_NAMESPACES` 白名单）。配套的 `whale-logo/patch-apiproxy.js` 会把 `skin-pack`、`welcome` 加入白名单——桌面版构建脚本已内置该补丁。

## 开发

```
scripts/build-client.cjs   # 从 scripts/client.template.js + whale-logo 鲸鱼 SVG 生成 lib/client.js
```

- 文案/按钮在 `scripts/client.template.js` 的 `buildOverlayHtml` 与 locale 字典。
- 鲸鱼动画（`dsw-jump`/`dsw-wander`/`dsw-wiggle`/气泡 `dsw-rise`）在注入的 CSS 里。
