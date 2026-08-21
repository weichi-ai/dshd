// patch-apiproxy.js — 把皮肤包/欢迎页命名空间暴露给配置客户端
// 目标：dsh-host-apiproxy 的 WEB_SETTINGS_NAMESPACES 白名单
// （否则即使 host 注册了命名空间，浏览器侧 settings scope 也读不到/写不进）
// 用法: node patch-apiproxy.js [dsh-app-node_modules根]   （默认开发机安装）
// 幂等：备份 *.bak-dsdh 后先还原再打补丁。
const fs = require('fs');
const path = require('path');

const DEFAULT_APIPROXY = 'D:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-host-apiproxy/lib/index.js';
const apiproxy = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_APIPROXY;

if (!fs.existsSync(apiproxy)) { console.error('apiproxy not found: ' + apiproxy); process.exit(1); }

const bak = apiproxy + '.bak-dsdh';
if (!fs.existsSync(bak)) { fs.copyFileSync(apiproxy, bak); console.log('backup:', bak); }
fs.copyFileSync(bak, apiproxy); // 幂等：从备份还原再打

let js = fs.readFileSync(apiproxy, 'utf8');

// dsh 0.1.1-rc.2 起，dsh-host-apiproxy 移除了浏览器侧
// WEB_SETTINGS_NAMESPACES 白名单：settings.describe 直接返回 settings
// provider 注册表里的全部命名空间（skin-pack / welcome 由插件自己
// settings.register() 注册即可见），此补丁不再需要，检测到即跳过。
if (!js.includes('web-search-deepseek') && js.includes('settingsNamespace')) {
  console.log('obsolete: 0.1.1+ auto-exposes registered settings namespaces, no patch needed');
  process.exit(0);
}

const needle = '\t"web-search-deepseek"\n];';
const repl = '\t"web-search-deepseek",\n\t"skin-pack",\n\t"welcome"\n];';
const count = js.split(needle).length - 1;
if (count !== 1) {
  // 尝试无制表符的变体
  const needle2 = '"web-search-deepseek"\n];';
  const count2 = js.split(needle2).length - 1;
  if (count2 !== 1) throw new Error(`WEB_SETTINGS_NAMESPACES needle not found uniquely (${count}, ${count2})`);
  js = js.replace(needle2, '"web-search-deepseek",\n\t"skin-pack",\n\t"welcome"\n];');
} else {
  js = js.replace(needle, repl);
}
fs.writeFileSync(apiproxy, js);

// 自检
const patched = fs.readFileSync(apiproxy, 'utf8');
const checks = [
  ['skin-pack exposed', patched.includes('"skin-pack"') && patched.includes('"welcome"')],
  ['in allowlist', /"web-search-deepseek",\s*"skin-pack",\s*"welcome"\s*\n\];/.test(patched) || /"web-search-deepseek",\s*\n\s*"skin-pack",\s*\n\s*"welcome"\s*\n\];/.test(patched)],
];
let ok = true;
for (const [label, pass] of checks) { console.log((pass ? 'PASS' : 'FAIL') + ' ' + label); if (!pass) ok = false; }
process.exit(ok ? 0 : 1);
