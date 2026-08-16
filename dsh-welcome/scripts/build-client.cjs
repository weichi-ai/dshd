// Build lib/client.js from scripts/client.template.js + the whale artwork.
// Injects the official whale path + colorful gradient stops (from
// whale-logo/deepseek-whale-colorful.svg) into the __WHALE_PATH__ and
// __WHALE_STOPS__ placeholders.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const whaleSvg = "D:/DSHProjects/whale-logo/deepseek-whale-colorful.svg";

const svg = fs.readFileSync(whaleSvg, "utf8");
const pathMatch = svg.match(/<path\s+d="([^"]+)"/);
if (!pathMatch) throw new Error("whale path not found in " + whaleSvg);
const whalePath = pathMatch[1];

const stopsMatch = svg.match(/<linearGradient[^>]*id="whaleColor"[^>]*>([\s\S]*?)<\/linearGradient>/);
if (!stopsMatch) throw new Error("whale gradient not found in " + whaleSvg);
const whaleStops = stopsMatch[1]
	.replace(/stop-color=/g, "stopColor=")
	.replace(/\s+/g, " ")
	.trim();

const escapeLiteral = (text) => text.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");

let template = fs.readFileSync(path.join(root, "scripts", "client.template.js"), "utf8");
template = template.replace('"__WHALE_STOPS__"', "`" + escapeLiteral(whaleStops) + "`");
template = template.replace('"__WHALE_PATH__"', "`" + escapeLiteral(whalePath) + "`");
if (template.includes("__WHALE_")) throw new Error("whale placeholder not replaced");
fs.writeFileSync(path.join(root, "lib", "client.js"), template, "utf8");
console.log("client.js written:", fs.statSync(path.join(root, "lib", "client.js")).size, "bytes");
console.log("  whale path:", whalePath.length, "chars; stops:", whaleStops.length, "chars");
