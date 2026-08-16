const fs = require('fs');
const dist = 'D:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist';

const oldName = 'index-Dqw48FrP.js';
const newName = 'index-Dqw48FrP-colorful.js';

// rename bundle so browsers can't serve the stale cached copy
if (fs.existsSync(dist + '/assets/' + oldName)) {
  fs.renameSync(dist + '/assets/' + oldName, dist + '/assets/' + newName);
  console.log('renamed', oldName, '->', newName);
} else {
  console.log('old bundle already renamed');
}

// update index.html reference
const htmlPath = dist + '/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
if (html.includes(oldName)) {
  html = html.replace(oldName, newName);
  fs.writeFileSync(htmlPath, html);
  console.log('index.html updated');
} else {
  console.log('WARN oldName not in index.html');
}

// syntax check the patched bundle (ESM): use node --check via child process
const { execFileSync } = require('node:child_process');
const pkg = JSON.parse(fs.readFileSync(dist + '/../package.json', 'utf8'));
console.log('frontend package type:', pkg.type);
try {
  const out = execFileSync(process.execPath, ['--check', dist + '/assets/' + newName], { encoding: 'utf8' });
  console.log('syntax check: OK');
} catch (e) {
  console.log('syntax check output:', e.stdout?.toString?.() || '');
  console.log('syntax check FAILED:', e.stderr?.toString?.() || e.message);
  process.exit(1);
}
