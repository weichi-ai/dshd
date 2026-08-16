# dsh-skin-pack

DSHD（DeepSeek Harness Desktop）皮肤包插件：**7 套内置皮肤 + 1 个"自定义"预留槽位**，设置页内**点选即预览、确认即一键换肤**，另带真实 token 渲染的放大预览弹层（明暗切换）。

| 皮肤 | 风格 |
|---|---|
| `deepseek`（默认） | 品牌深蓝，即默认外观 |
| `midnight` 午夜 | 高对比冷黑 |
| `nord` 冷杉 | 低饱和蓝灰 |
| `sepia` 暖纸 | 米黄暖调 |
| `violet` 紫罗兰 | 紫调个性 |
| `cartoon` 卡通 | 奶油底、高饱和、童趣 |
| `cute` 可爱 | 粉嫩软萌 |
| `custom` | 预留槽位（开发中，UI 置灰） |

## 特性

- **预览**：点击皮肤卡片立即在真实界面上预览（所见即所得）；「应用此皮肤 / 取消」确认或回滚。
- **一键换肤**：点「应用」即写入持久化设置（`skin-pack.skin`），刷新/重启后保持。
- **放大预览**：面板内「放大预览」按钮打开弹层，用真实 `--dsw-alias-*` token 渲染迷你 DSHD 界面，可切换明暗。
- **自包含**：皮肤 CSS 随插件注入（`body[data-skin-pack="…"]` 独立属性），与内置主题机制零冲突；卸载插件即恢复默认外观。
- **双明暗**：每套皮肤含 light / dark 两档，跟随系统或手动明暗偏好。

## 安装

DSHD 使用 profile + pnpm 管理插件（`dsh plugin --profile <name> add <package>`）。本地/离线安装：

1. 把本包放进 profile 的依赖树（二选一）：
   - `dsh plugin --profile <name> add dsh-skin-pack`（包已发布时）
   - 或手动把 `dsh-skin-pack` 目录复制到 `$DSH_HOME/profiles/node_modules/dsh-skin-pack`（本仓库自带的 `install-to-profile.ps1` 即此路径）
2. 在 `$DSH_HOME/profiles/<name>/cordis.patch.yml` 追加 entry（脚本自动完成）：

   ```yaml
   - insert:
       - id: skin-pack
         name: dsh-skin-pack
   ```

3. 重启 DSHD。设置 → 通用 → 皮肤包 即出现。

> web 与 desktop profile 均已支持；脚本默认同时安装到两者。

## 使用

设置 → 通用 → **皮肤包**：

1. 点任意皮肤卡片 → 整站立即预览该皮肤（卡片出现"预览中"角标）。
2. 「应用此皮肤」→ 持久化生效；「取消」→ 回滚到原皮肤。
3. 「放大预览」→ 弹层中查看真实 token 渲染效果，可切深/浅色。

## 开发

```
scripts/build-client.cjs   # 从 dsh-client-ui-theme 的 skins.css/design-platform.css 重新生成 lib/client.js
scripts/smoke-test.cjs     # 客户端冒烟测试（store 状态机 / apply 接线 / 组件渲染）
scripts/host-test.mjs      # host 入口测试（settings schema 注册）
```

新增皮肤：在 `scripts/client.template.js` 的 `SKINS` 里加条目 + 在源 `skins.css` 补色板 → 重跑 `build-client.cjs`。

## 已知边界

- `custom` 为预留槽位：schema/UI 已就位，编辑器（自定义 token）后续版本提供。
- 皮肤只作用于 UI token（颜色/渐变/阴影）；代码块语法高亮（`--shiki-*`）保持默认。
- 远程（非回环）浏览器无特权设置 API 时，换肤仅进程内生效（与内置主题行为一致）。
