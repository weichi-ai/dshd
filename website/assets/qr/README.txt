二维码图片存放目录

- qq.jpg      → QQ 交流群二维码（800px 宽，已放置）
- wechat.png  → 微信群二维码（685px，已放置）

原图在 assets/img/dshd-pics/ 下（二维码_QQ群.jpg / 二维码_微信.png）。
如需重新生成：用 Pillow 缩放至 800px 内再保存（QQ 用 JPEG quality=90，微信用 PNG optimize）。
图片缺失时页面会显示占位框，无需修改代码。
