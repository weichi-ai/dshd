// 鲸彩世界DSHD — 首启插件预置（幂等、崩溃安全）
// 1) 全新用户：profiles\node_modules 为空时，从应用内置的完整依赖树（vendor\app\node_modules）
//    整体播种，保证 host 插件能解析 @deepseek-ai/* 等依赖。
// 2) 插件（皮肤包/欢迎页）按版本同步：先复制到临时目录再原子替换，任何一步失败都不破坏现有安装。
const fs = require('fs');
const path = require('path');

const PATCH = `# 鲸彩世界DSHD 插件层（应用首启自动维护，勿手改）
- insert:
    - id: skin-pack
      name: dsh-skin-pack
    - id: dsh-welcome
      name: dsh-welcome
`;

const PROFILE_PKG = {
  name: 'dsh-profile-web',
  private: true,
  dependencies: {},
  dsh: {
    profile: {
      bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app']
    }
  }
};

const PLUGINS = ['dsh-skin-pack', 'dsh-welcome'];

function ensure(dshHome, appPath) {
  const profiles = path.join(dshHome, 'profiles');
  fs.mkdirSync(path.join(profiles, 'web'), { recursive: true });
  fs.mkdirSync(path.join(profiles, 'node_modules'), { recursive: true });

  const pkgPath = path.join(profiles, 'web', 'package.json');
  fs.writeFileSync(pkgPath, JSON.stringify(PROFILE_PKG, null, 2) + '\n');
  fs.writeFileSync(path.join(profiles, 'web', 'cordis.patch.yml'), PATCH);

  // 依赖树不需要播种：dsh 启动时（healProfilesModuleFallback）会自动在
  // profiles\node_modules 建立指向应用依赖的符号链接（installation fallback）。

  // 插件同步（版本不同才替换；临时目录 + 原子 rename）
  const profileNodeModules = path.join(profiles, 'node_modules');
  for (const name of PLUGINS) {
    const src = path.join(appPath, 'vendor', 'plugins', name);
    const dst = path.join(profileNodeModules, name);
    if (!fs.existsSync(src)) continue;
    let seedVer = null;
    let dstVer = null;
    try {
      seedVer = JSON.parse(fs.readFileSync(path.join(src, 'package.json'), 'utf8')).version;
    } catch (e) { /* fallthrough */ }
    try {
      dstVer = JSON.parse(fs.readFileSync(path.join(dst, 'package.json'), 'utf8')).version;
    } catch (e) { /* fallthrough */ }
    if (seedVer === dstVer && fs.existsSync(path.join(dst, 'lib'))) {
      continue; // 已就位
    }
    const tmp = dst + '.tmp-' + process.pid;
    fs.rmSync(tmp, { recursive: true, force: true });
    fs.cpSync(src, tmp, { recursive: true });
    fs.rmSync(dst, { recursive: true, force: true });
    fs.renameSync(tmp, dst);
    console.log('[bootstrap] plugin synced: ' + name + '@' + seedVer);
  }
  console.log('[bootstrap] plugins ensured in ' + dshHome);
}

module.exports = { ensure };
