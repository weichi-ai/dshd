const fs = require('fs');

const src = fs.readFileSync('favicon-api-docs.svg', 'utf8');
// extract the exact official svg root attributes and path
const rootAttrs = /<svg([^>]*)>/.exec(src)[1];
const pathTag = /<path[^>]*\/?>/.exec(src)[0];
const d = /<path[^>]*\sd="([^"]+)"/.exec(src)[1];
const fillRule = /<path[^>]*fill-rule="([^"]+)"/.exec(src)[1];
console.log('official root attrs:', rootAttrs.trim());

const colorful = `<?xml version="1.0" encoding="UTF-8"?>
<!-- DeepSeek official whale, recolored (shape 100% unchanged) -->
<svg${rootAttrs}>
  <defs>
    <linearGradient id="whaleColor" gradientUnits="userSpaceOnUse" x1="8" y1="40" x2="56" y2="7">
      <stop offset="0%"   stop-color="#22D3EE"/>
      <stop offset="28%"  stop-color="#3B82F6"/>
      <stop offset="52%"  stop-color="#8B5CF6"/>
      <stop offset="74%"  stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#FB7185"/>
    </linearGradient>
  </defs>
  <path d="${d}" fill-rule="${fillRule}" fill="url(#whaleColor)"/>
</svg>
`;
fs.writeFileSync('deepseek-whale-colorful.svg', colorful);
console.log('rewritten deepseek-whale-colorful.svg with official root attrs');
