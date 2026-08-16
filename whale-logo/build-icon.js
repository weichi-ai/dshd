const fs = require('fs');

const src = fs.readFileSync('reference/favicon-api-docs.svg', 'utf8');
const m = src.match(/<path[^>]*d="([^"]+)"[^>]*fill-rule="([^"]+)"/);
const d = m[1], fillRule = m[2];

const whaleGrad = `
    <linearGradient id="whaleColor" gradientUnits="userSpaceOnUse" x1="8" y1="40" x2="56" y2="7">
      <stop offset="0%"   stop-color="#22D3EE"/>
      <stop offset="28%"  stop-color="#3B82F6"/>
      <stop offset="52%"  stop-color="#8B5CF6"/>
      <stop offset="74%"  stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#FB7185"/>
    </linearGradient>`;

const whale = `  <!-- 官方鲸鱼形状，仅换色（shape 100% unchanged） -->
  <g transform="translate(113 218) scale(12.65)">
    <path d="${d}" fill-rule="${fillRule}" fill="url(#whaleColor)"/>
  </g>`;

// ---- 深色版（原版） ----
const dark = `<?xml version="1.0" encoding="UTF-8"?>
<!-- DeepSeek official whale, colorful recolor — dark icon -->
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="55%" r="70%">
      <stop offset="0%" stop-color="#13264f"/>
      <stop offset="60%" stop-color="#0b1530"/>
      <stop offset="100%" stop-color="#060b1a"/>
    </radialGradient>${whaleGrad}
  </defs>
  <rect x="0" y="0" width="1024" height="1024" rx="208" fill="url(#bg)"/>
  <circle cx="512" cy="512" r="360" fill="none" stroke="#38BDF8" stroke-opacity="0.10" stroke-width="4"/>
  <circle cx="512" cy="512" r="440" fill="none" stroke="#38BDF8" stroke-opacity="0.07" stroke-width="4"/>
${whale}
  <circle cx="252" cy="330" r="12" fill="#67E8F9" opacity="0.45"/>
  <circle cx="222" cy="280" r="8"  fill="#67E8F9" opacity="0.35"/>
  <circle cx="262" cy="244" r="6"  fill="#67E8F9" opacity="0.30"/>
</svg>
`;
fs.writeFileSync('deepseek-whale-icon.svg', dark);
console.log('written deepseek-whale-icon.svg (dark)');

// ---- 白底版 ----
const white = `<?xml version="1.0" encoding="UTF-8"?>
<!-- DeepSeek official whale, colorful recolor — white icon -->
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="52%" r="75%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eef3ff"/>
    </radialGradient>${whaleGrad}
  </defs>
  <rect x="0" y="0" width="1024" height="1024" rx="208" fill="url(#bg)"/>
  <circle cx="512" cy="512" r="360" fill="none" stroke="#22D3EE" stroke-opacity="0.28" stroke-width="4"/>
  <circle cx="512" cy="512" r="440" fill="none" stroke="#22D3EE" stroke-opacity="0.16" stroke-width="4"/>
${whale}
  <circle cx="252" cy="330" r="12" fill="#22D3EE" opacity="0.55"/>
  <circle cx="222" cy="280" r="8"  fill="#22D3EE" opacity="0.40"/>
  <circle cx="262" cy="244" r="6"  fill="#22D3EE" opacity="0.35"/>
</svg>
`;
fs.writeFileSync('deepseek-whale-icon-white.svg', white);
console.log('written deepseek-whale-icon-white.svg (white)');
