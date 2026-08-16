// Build lib/client.js from scripts/client.template.js + the theme token sheets.
// Transformations:
//   body-level skins:  body[data-ds-skin="x"]  ->  body[data-skin-pack="x"]   (live apply on <body>)
//   scoped skins:      body[data-ds-skin="x"]  ->  [data-skin-pack-preview="x"] (preview modal frame),
//                      [data-ds-dark-theme]   ->  [data-preview-dark]
//   scoped deepseek:   design-platform body rules -> [data-skin-pack-preview="deepseek"] scope
const fs = require("fs");
const path = require("path");

const themePkg = "D:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-client-ui-theme/lib/styles";
const root = path.join(__dirname, "..");

const skinsCss = fs.readFileSync(path.join(themePkg, "skins.css"), "utf8");
const designCss = fs.readFileSync(path.join(themePkg, "design-platform.css"), "utf8");

// body-level skins
const skinsBody = skinsCss
	.replaceAll("body[data-ds-skin=\"", "body[data-skin-pack=\"");
// scoped skins (preview frames)
const skinsScoped = skinsCss
	.replaceAll("body[data-ds-skin=\"", "[data-skin-pack-preview=\"")
	.replaceAll("[data-ds-dark-theme]", "[data-preview-dark]");
// scoped deepseek base (statics + aliases) so the default skin previews too
const baseScoped = designCss
	.replaceAll("body[data-ds-dark-theme] {", "[data-skin-pack-preview=\"deepseek\"][data-preview-dark] {")
	.replaceAll("body {", "[data-skin-pack-preview=\"deepseek\"] {");

const scopedAll = baseScoped + "\n" + skinsScoped;

const escapeLiteral = (text) => text.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");

let template = fs.readFileSync(path.join(root, "scripts", "client.template.js"), "utf8");
template = template.replace("__SKINS_BODY_CSS__", "`" + escapeLiteral(skinsBody) + "`");
template = template.replace("__SKINS_SCOPED_CSS__", "`" + escapeLiteral(scopedAll) + "`");
if (template.includes("__SKINS_")) throw new Error("placeholder not replaced");
fs.writeFileSync(path.join(root, "lib", "client.js"), template, "utf8");
console.log("client.js written:", fs.statSync(path.join(root, "lib", "client.js")).size, "bytes");
console.log("  body skins:", skinsBody.length, "chars; scoped:", scopedAll.length, "chars");
