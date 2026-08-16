# DSHD 官网（静态站）

小彩鲸 · 鲸彩世界 —— DeepSeek Harness 桌面版官网。纯静态（HTML + CSS + JS），零构建、零依赖，可双击打开，也可直接部署到 GitHub Pages / Netlify / 任意静态服务器。

## 本地预览

```bash
# 方式一：直接双击 index.html
# 方式二：本地静态服务器
python -m http.server 8080
# 或
npx serve .
```

## 部署到 GitHub Pages

本目录已作为仓库 `docs/` 发布（Settings → Pages → Deploy from branch: main, folder: /docs），线上地址：

https://weichi-ai.github.io/dshd/

更新网站内容后推送到 main 分支即可自动重新构建。

## 替换占位内容

| 占位内容 | 位置 | 说明 |
|---|---|---|
| GitHub 仓库地址 | `assets/js/main.js` 顶部 `GITHUB_REPO = 'weichi-ai/dshd'` | 已接入；页面内所有下载/Star 链接自动跟随 |
| QQ 群号 | `index.html` 社区卡片 `<b>929082451</b>` | 已填真实群号 |
| QQ 群二维码 | `assets/qr/qq.jpg` | 已放置；无图时显示占位框 |
| 微信群二维码 | `assets/qr/wechat.png` | 已放置；无图时显示占位框 |
| 联系邮箱 | `index.html` 两处 `mailto:2078580136@qq.com` | 已填真实邮箱 |
| 版本号 | `index.html` 下载卡片 `v1.0.0` | 替换为最新版本 |

> 提示：二维码占位框逻辑在 `index.html` 的 `onerror` 中，图片缺失时自动显示占位样式，无需改动 JS。

## 文件结构

```
dshd-website/
├── index.html          # 单页结构 + i18n 数据属性
├── assets/
│   ├── css/style.css   # 全屏视觉、小彩鲸动画、波浪气泡、响应式
│   ├── js/main.js      # 中英切换、Star 数、气泡、Lightbox、滚动动效
│   ├── img/
│   │   ├── deepseek-whale-colorful.svg  # 官方小彩鲸 Logo
│   │   └── dshd-pics/   # 产品截图
│   │       ├── 1~4.png  # 原始截图（约 11MB/张，勿直接引用）
│   │       └── opt/     # 压缩后的 WebP（~1600px，页面实际引用）
│   └── qr/             # 二维码图片存放处（qq.jpg / wechat.png）
└── README.md
```

## 产品截图

原始截图放 `assets/img/dshd-pics/`（1.png ~ 4.png），页面引用的是 `opt/` 下压缩后的 WebP。

替换/更新截图时：

```bash
# 放入新原图后，用 Python + Pillow 重新压缩（宽 1600、质量 82）：
# 注意：本机需先清空 PYTHONPATH，避免加载到损坏的 venv 版 Pillow
$env:PYTHONPATH=''
py -3 -c "from PIL import Image; im=Image.open('assets/img/dshd-pics/1.png'); im=im.resize((1600,round(im.height*1600/im.width)),Image.LANCZOS) if im.width>1600 else im; im.save('assets/img/dshd-pics/opt/1.webp','WEBP',quality=82,method=6)"
```

界面预览区的每张图配文（中英）在 `assets/js/main.js` 的 `shots.cap1~4` 词条中修改。

## 功能一览

- 🌐 中英双语：默认跟随浏览器语言，导航栏一键切换并记忆选择
- 🐳 小彩鲸：彩虹渐变鲸鱼 SVG 穿梭首屏，喷水、扇鳍、彩虹尾迹动画
- 🌊 全屏视觉：极光光晕、漂浮气泡、双层波浪、渐变流光标题
- ⬇️ Windows / macOS 下载卡片（跳转 GitHub Releases）
- 🖼 Hero 主图轮播：欢迎页/主页（深/浅色）/皮肤设置截图在 App 窗口内自动轮播（悬停暂停、触屏滑动、圆点切换、点击放大）
- ⭐ GitHub 接入：一键跳转仓库 + Star 引导三步 + 实时 Star 数（GitHub API）
- 💬 社区预留：QQ 群 / 微信群二维码位 / 邮箱
- 📱 响应式适配：桌面 / 平板 / 手机，移动端汉堡菜单
