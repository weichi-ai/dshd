window.__ModuleLoader__.load({
	id: "dsh-skin-pack",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region clsx (vendored, same shape as the build's inline copy)
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region style injection (mirrors the build's \0dsh-css: pattern)
		function injectCss(tagId, css) {
			if (typeof document === "undefined" || document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") !== null) return;
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-skin-pack";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const skinsBodyCss = `/* Preset skins — palette layers stacked over design-platform.css.
 *
 * Selector specificity: \`body[data-skin-pack="x"]\` (+ \`[data-ds-dark-theme]\`)
 * is an attribute layer, so these rules only win while the attribute is
 * present and the base sheets keep the \`deepseek\` default otherwise.
 *
 * Delivery: the client bundle injects this file's content as a
 * \`skins.css\` style tag at plugin activation; the source-repo build imports
 * it from the web shell's base.css AFTER design-platform.css (order is
 * load-bearing — the alias layer must be declared first).
 *
 * \`custom\` intentionally has no sheet: the reserved slot renders the
 * default palette until the custom-token editor lands.
 */

/* ---------- midnight · 午夜：高对比冷黑 ---------- */
body[data-skin-pack="midnight"] {
  --dsw-alias-bg-base: #f4f6fa;
  --dsw-alias-bg-layer-1: #fafbfd;
  --dsw-alias-bg-layer-2: #f4f6fa;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #eef1f6;
  --dsw-alias-bg-multi-select: #eef1f6;
  --dsw-alias-bg-skeleton: rgba(23, 37, 84, 0.05);
  --dsw-alias-border-l1: rgba(23, 37, 84, 0.06);
  --dsw-alias-border-l2: rgba(23, 37, 84, 0.12);
  --dsw-alias-border-l3: rgba(23, 37, 84, 0.16);
  --dsw-alias-brand-primary: #0f172a;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #3b6fd4;
  --dsw-alias-brand-text: #0f172a;
  --dsw-alias-button-primary-fill: #2563eb;
  --dsw-alias-button-primary-hover: #1d4ed8;
  --dsw-alias-button-primary-dimmed: #e8eefc;
  --dsw-alias-button-info-fill: #3b82f6;
  --dsw-alias-button-info-hover: #60a5fa;
  --dsw-alias-button-ghost-active-fill: #e8eefc;
  --dsw-alias-button-ghost-active-hover: #dbe4f5;
  --dsw-alias-interactive-bg-hover: rgba(30, 58, 138, 0.06);
  --dsw-alias-interactive-bg-active: rgba(30, 58, 138, 0.1);
  --dsw-alias-interactive-bg-hover-accent: rgba(30, 58, 138, 0.14);
  --dsw-alias-interactive-bg-hover-solid: #eef1f6;
  --dsw-alias-label-primary: #0f172a;
  --dsw-alias-label-secondary: #334155;
  --dsw-alias-label-tertiary: #64748b;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #1e3a8a;
  --dsw-alias-markdown-code-block: #f4f6fa;
  --dsw-alias-markdown-code-block-banner: #eef1f6;
  --dsw-alias-markdown-inline-code: #e8eefc;
  --dsw-alias-scrollbar-bg-l1: #d9dee8;
  --dsw-alias-scrollbar-bg-l2: #d9dee8;
  --dsw-alias-scrollbar-hover-l1: #c3cad8;
  --dsw-alias-scrollbar-hover-l2: #c3cad8;
  --dsw-alias-state-business-primary: #3b6fd4;
  --dsw-alias-state-business-tertiary: #e0e8f8;
  --dsw-alias-state-error-primary: #dc2626;
  --dsw-alias-state-success-primary: #16a34a;
  --dsw-alias-state-success-tertiary: #e0f2e6;
  --dsw-alias-state-warn-primary: #d97706;
  --dsw-alias-state-warn-tertiary: #fdeeda;
  --dsw-alias-toast-bg: #1e293b;
  --dsw-alias-tooltip-bg: #1e293b;
  --dsw-specific-bubble: #e8eefc;
  --dsw-specific-bubble-highlight: #dbe4f5;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #eef1f6;
  --dsw-specific-sidebar-nav-item-active: #e8eefc;
  --dsw-specific-sidebar-nav-item-active-accent: #dbe4f5;
  --dsw-specific-sidebar-nav-item-hover: #e4e9f2;
  --dsw-linear-gradient-think: linear-gradient(180deg, #fafbfd 20.19%, rgba(250, 251, 253, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #eef1f6 20.19%, rgba(238, 241, 246, 0) 100%);
}

body[data-skin-pack="midnight"][data-ds-dark-theme] {
  --dsw-alias-bg-base: #0d0f14;
  --dsw-alias-bg-layer-1: #141821;
  --dsw-alias-bg-layer-2: #1a1f2b;
  --dsw-alias-bg-layer-3: #212838;
  --dsw-alias-bg-overlay: #262e40;
  --dsw-alias-bg-module-platform: #1a1f2b;
  --dsw-alias-bg-multi-select: #141821;
  --dsw-alias-bg-skeleton: rgba(255, 255, 255, 0.08);
  --dsw-alias-border-l1: rgba(255, 255, 255, 0.07);
  --dsw-alias-border-l2: rgba(255, 255, 255, 0.13);
  --dsw-alias-border-l3: rgba(255, 255, 255, 0.18);
  --dsw-alias-brand-primary: #f1f5f9;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #4d9fff;
  --dsw-alias-brand-text: #f1f5f9;
  --dsw-alias-button-primary-fill: #3b82f6;
  --dsw-alias-button-primary-hover: #60a5fa;
  --dsw-alias-button-primary-dimmed: #1e2a44;
  --dsw-alias-button-info-fill: #4d9fff;
  --dsw-alias-button-info-hover: #3b82f6;
  --dsw-alias-button-ghost-active-fill: #1e2a44;
  --dsw-alias-button-ghost-active-hover: #243253;
  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.08);
  --dsw-alias-interactive-bg-active: rgba(255, 255, 255, 0.13);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 255, 255, 0.2);
  --dsw-alias-interactive-bg-hover-solid: #1a1f2b;
  --dsw-alias-label-primary: #f1f5f9;
  --dsw-alias-label-secondary: #cbd5e1;
  --dsw-alias-label-tertiary: #94a3b8;
  --dsw-alias-label-primary-foreground: #0d0f14;
  --dsw-alias-label-primary-inverted: #1a1f2b;
  --dsw-alias-label-primary-bluish: #bfdbfe;
  --dsw-alias-markdown-code-block: #11151d;
  --dsw-alias-markdown-code-block-banner: #141821;
  --dsw-alias-markdown-inline-code: #1a2030;
  --dsw-alias-scrollbar-bg-l1: #2e3648;
  --dsw-alias-scrollbar-bg-l2: #39415a;
  --dsw-alias-scrollbar-hover-l1: #3d4660;
  --dsw-alias-scrollbar-hover-l2: #47527a;
  --dsw-alias-state-business-primary: #4d9fff;
  --dsw-alias-state-business-tertiary: #1e2a44;
  --dsw-alias-state-error-primary: #f87171;
  --dsw-alias-state-success-primary: #4ade80;
  --dsw-alias-state-success-tertiary: #10331f;
  --dsw-alias-state-warn-primary: #fbbf24;
  --dsw-alias-state-warn-tertiary: #33270c;
  --dsw-alias-toast-bg: #262e40;
  --dsw-alias-tooltip-bg: #262e40;
  --dsw-specific-bubble: #1a2030;
  --dsw-specific-bubble-highlight: #232b40;
  --dsw-specific-input-major: #141821;
  --dsw-specific-sidebar-fill: #0f131b;
  --dsw-specific-sidebar-nav-item-active: #1a2030;
  --dsw-specific-sidebar-nav-item-active-accent: #232b40;
  --dsw-specific-sidebar-nav-item-hover: #161b26;
  --dsw-linear-gradient-think: linear-gradient(180deg, #141821 20.19%, rgba(20, 24, 33, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #1a1f2b 20.19%, rgba(26, 31, 43, 0) 100%);
}

/* ---------- nord · 冷杉：低饱和蓝灰 ---------- */
body[data-skin-pack="nord"] {
  --dsw-alias-bg-base: #eceff4;
  --dsw-alias-bg-layer-1: #f4f6f9;
  --dsw-alias-bg-layer-2: #eceff4;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #e5e9f0;
  --dsw-alias-bg-multi-select: #e5e9f0;
  --dsw-alias-bg-skeleton: rgba(46, 52, 64, 0.05);
  --dsw-alias-border-l1: rgba(46, 52, 64, 0.07);
  --dsw-alias-border-l2: rgba(46, 52, 64, 0.14);
  --dsw-alias-border-l3: rgba(46, 52, 64, 0.18);
  --dsw-alias-brand-primary: #2e3440;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #5e81ac;
  --dsw-alias-brand-text: #2e3440;
  --dsw-alias-button-primary-fill: #5e81ac;
  --dsw-alias-button-primary-hover: #81a1c1;
  --dsw-alias-button-primary-dimmed: #e5e9f0;
  --dsw-alias-button-info-fill: #88c0d0;
  --dsw-alias-button-info-hover: #5e81ac;
  --dsw-alias-button-ghost-active-fill: #e5e9f0;
  --dsw-alias-button-ghost-active-hover: #dce2ec;
  --dsw-alias-interactive-bg-hover: rgba(76, 86, 106, 0.08);
  --dsw-alias-interactive-bg-active: rgba(76, 86, 106, 0.12);
  --dsw-alias-interactive-bg-hover-accent: rgba(76, 86, 106, 0.16);
  --dsw-alias-interactive-bg-hover-solid: #e5e9f0;
  --dsw-alias-label-primary: #2e3440;
  --dsw-alias-label-secondary: #4c566a;
  --dsw-alias-label-tertiary: #6b7690;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #3b5b8a;
  --dsw-alias-markdown-code-block: #e5e9f0;
  --dsw-alias-markdown-code-block-banner: #dce2ec;
  --dsw-alias-markdown-inline-code: #e5e9f0;
  --dsw-alias-scrollbar-bg-l1: #c9d1dd;
  --dsw-alias-scrollbar-bg-l2: #c9d1dd;
  --dsw-alias-scrollbar-hover-l1: #b3bdc9;
  --dsw-alias-scrollbar-hover-l2: #b3bdc9;
  --dsw-alias-state-business-primary: #5e81ac;
  --dsw-alias-state-business-tertiary: #e0e8f0;
  --dsw-alias-state-error-primary: #bf616a;
  --dsw-alias-state-success-primary: #a3be8c;
  --dsw-alias-state-success-tertiary: #eaf0e2;
  --dsw-alias-state-warn-primary: #d08770;
  --dsw-alias-state-warn-tertiary: #f6ece4;
  --dsw-alias-toast-bg: #434c5e;
  --dsw-alias-tooltip-bg: #434c5e;
  --dsw-specific-bubble: #e5e9f0;
  --dsw-specific-bubble-highlight: #dce2ec;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #e5e9f0;
  --dsw-specific-sidebar-nav-item-active: #dce2ec;
  --dsw-specific-sidebar-nav-item-active-accent: #c9d1dd;
  --dsw-specific-sidebar-nav-item-hover: #dde3ec;
  --dsw-linear-gradient-think: linear-gradient(180deg, #f4f6f9 20.19%, rgba(244, 246, 249, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #e5e9f0 20.19%, rgba(229, 233, 240, 0) 100%);
}

body[data-skin-pack="nord"][data-ds-dark-theme] {
  --dsw-alias-bg-base: #2e3440;
  --dsw-alias-bg-layer-1: #353b4a;
  --dsw-alias-bg-layer-2: #3b4252;
  --dsw-alias-bg-layer-3: #434c5e;
  --dsw-alias-bg-overlay: #4c566a;
  --dsw-alias-bg-module-platform: #3b4252;
  --dsw-alias-bg-multi-select: #353b4a;
  --dsw-alias-bg-skeleton: rgba(216, 222, 233, 0.07);
  --dsw-alias-border-l1: rgba(216, 222, 233, 0.08);
  --dsw-alias-border-l2: rgba(216, 222, 233, 0.15);
  --dsw-alias-border-l3: rgba(216, 222, 233, 0.2);
  --dsw-alias-brand-primary: #eceff4;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #88c0d0;
  --dsw-alias-brand-text: #eceff4;
  --dsw-alias-button-primary-fill: #5e81ac;
  --dsw-alias-button-primary-hover: #81a1c1;
  --dsw-alias-button-primary-dimmed: #434c5e;
  --dsw-alias-button-info-fill: #88c0d0;
  --dsw-alias-button-info-hover: #5e81ac;
  --dsw-alias-button-ghost-active-fill: #434c5e;
  --dsw-alias-button-ghost-active-hover: #4c566a;
  --dsw-alias-interactive-bg-hover: rgba(216, 222, 233, 0.08);
  --dsw-alias-interactive-bg-active: rgba(216, 222, 233, 0.12);
  --dsw-alias-interactive-bg-hover-accent: rgba(216, 222, 233, 0.18);
  --dsw-alias-interactive-bg-hover-solid: #3b4252;
  --dsw-alias-label-primary: #eceff4;
  --dsw-alias-label-secondary: #d8dee9;
  --dsw-alias-label-tertiary: #a8b1c4;
  --dsw-alias-label-primary-foreground: #2e3440;
  --dsw-alias-label-primary-inverted: #3b4252;
  --dsw-alias-label-primary-bluish: #d8dee9;
  --dsw-alias-markdown-code-block: #2a2f3a;
  --dsw-alias-markdown-code-block-banner: #313744;
  --dsw-alias-markdown-inline-code: #353b4a;
  --dsw-alias-scrollbar-bg-l1: #4c566a;
  --dsw-alias-scrollbar-bg-l2: #555f74;
  --dsw-alias-scrollbar-hover-l1: #5a647a;
  --dsw-alias-scrollbar-hover-l2: #636d85;
  --dsw-alias-state-business-primary: #88c0d0;
  --dsw-alias-state-business-tertiary: #3a4a52;
  --dsw-alias-state-error-primary: #bf616a;
  --dsw-alias-state-success-primary: #a3be8c;
  --dsw-alias-state-success-tertiary: #35402e;
  --dsw-alias-state-warn-primary: #d08770;
  --dsw-alias-state-warn-tertiary: #40332a;
  --dsw-alias-toast-bg: #4c566a;
  --dsw-alias-tooltip-bg: #4c566a;
  --dsw-specific-bubble: #3b4252;
  --dsw-specific-bubble-highlight: #434c5e;
  --dsw-specific-input-major: #353b4a;
  --dsw-specific-sidebar-fill: #2a2f3a;
  --dsw-specific-sidebar-nav-item-active: #353b4a;
  --dsw-specific-sidebar-nav-item-active-accent: #434c5e;
  --dsw-specific-sidebar-nav-item-hover: #313744;
  --dsw-linear-gradient-think: linear-gradient(180deg, #353b4a 20.19%, rgba(53, 59, 74, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #3b4252 20.19%, rgba(59, 66, 82, 0) 100%);
}

/* ---------- sepia · 暖纸：米黄暖调 ---------- */
body[data-skin-pack="sepia"] {
  --dsw-alias-bg-base: #faf6ee;
  --dsw-alias-bg-layer-1: #fdfaf3;
  --dsw-alias-bg-layer-2: #faf6ee;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #f5efe2;
  --dsw-alias-bg-multi-select: #f5efe2;
  --dsw-alias-bg-skeleton: rgba(120, 90, 50, 0.06);
  --dsw-alias-border-l1: rgba(120, 90, 50, 0.1);
  --dsw-alias-border-l2: rgba(120, 90, 50, 0.16);
  --dsw-alias-border-l3: rgba(120, 90, 50, 0.22);
  --dsw-alias-brand-primary: #3d2f1c;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #a06a2a;
  --dsw-alias-brand-text: #3d2f1c;
  --dsw-alias-button-primary-fill: #a06a2a;
  --dsw-alias-button-primary-hover: #8a5a22;
  --dsw-alias-button-primary-dimmed: #f2e8d4;
  --dsw-alias-button-info-fill: #c07f3a;
  --dsw-alias-button-info-hover: #a06a2a;
  --dsw-alias-button-ghost-active-fill: #f2e8d4;
  --dsw-alias-button-ghost-active-hover: #eadcc2;
  --dsw-alias-interactive-bg-hover: rgba(90, 60, 20, 0.07);
  --dsw-alias-interactive-bg-active: rgba(90, 60, 20, 0.11);
  --dsw-alias-interactive-bg-hover-accent: rgba(90, 60, 20, 0.15);
  --dsw-alias-interactive-bg-hover-solid: #f5efe2;
  --dsw-alias-label-primary: #3d2f1c;
  --dsw-alias-label-secondary: #5f4c2e;
  --dsw-alias-label-tertiary: #8a7350;
  --dsw-alias-label-primary-foreground: #fffdf7;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #7a5a2a;
  --dsw-alias-markdown-code-block: #f5efe2;
  --dsw-alias-markdown-code-block-banner: #efe5d1;
  --dsw-alias-markdown-inline-code: #f2e8d4;
  --dsw-alias-scrollbar-bg-l1: #e0d3b8;
  --dsw-alias-scrollbar-bg-l2: #e0d3b8;
  --dsw-alias-scrollbar-hover-l1: #cdbc9b;
  --dsw-alias-scrollbar-hover-l2: #cdbc9b;
  --dsw-alias-state-business-primary: #a06a2a;
  --dsw-alias-state-business-tertiary: #f0e4cd;
  --dsw-alias-state-error-primary: #b4543c;
  --dsw-alias-state-success-primary: #6f8f4f;
  --dsw-alias-state-success-tertiary: #e8efdd;
  --dsw-alias-state-warn-primary: #c07f3a;
  --dsw-alias-state-warn-tertiary: #f6e7d3;
  --dsw-alias-toast-bg: #4a3a22;
  --dsw-alias-tooltip-bg: #4a3a22;
  --dsw-specific-bubble: #f2e8d4;
  --dsw-specific-bubble-highlight: #eadcc2;
  --dsw-specific-input-major: #fffdf7;
  --dsw-specific-sidebar-fill: #f5efe2;
  --dsw-specific-sidebar-nav-item-active: #f2e8d4;
  --dsw-specific-sidebar-nav-item-active-accent: #e6d7b8;
  --dsw-specific-sidebar-nav-item-hover: #efe5d1;
  --dsw-linear-gradient-think: linear-gradient(180deg, #fdfaf3 20.19%, rgba(253, 250, 243, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #f5efe2 20.19%, rgba(245, 239, 226, 0) 100%);
}

body[data-skin-pack="sepia"][data-ds-dark-theme] {
  --dsw-alias-bg-base: #2a241c;
  --dsw-alias-bg-layer-1: #332b21;
  --dsw-alias-bg-layer-2: #3b3226;
  --dsw-alias-bg-layer-3: #44392c;
  --dsw-alias-bg-overlay: #4d4233;
  --dsw-alias-bg-module-platform: #3b3226;
  --dsw-alias-bg-multi-select: #332b21;
  --dsw-alias-bg-skeleton: rgba(255, 240, 214, 0.07);
  --dsw-alias-border-l1: rgba(255, 240, 214, 0.08);
  --dsw-alias-border-l2: rgba(255, 240, 214, 0.14);
  --dsw-alias-border-l3: rgba(255, 240, 214, 0.2);
  --dsw-alias-brand-primary: #f5ecd9;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #d8a05f;
  --dsw-alias-brand-text: #f5ecd9;
  --dsw-alias-button-primary-fill: #c07f3a;
  --dsw-alias-button-primary-hover: #d8a05f;
  --dsw-alias-button-primary-dimmed: #4d4233;
  --dsw-alias-button-info-fill: #d8a05f;
  --dsw-alias-button-info-hover: #c07f3a;
  --dsw-alias-button-ghost-active-fill: #4d4233;
  --dsw-alias-button-ghost-active-hover: #574b3b;
  --dsw-alias-interactive-bg-hover: rgba(255, 240, 214, 0.08);
  --dsw-alias-interactive-bg-active: rgba(255, 240, 214, 0.12);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 240, 214, 0.18);
  --dsw-alias-interactive-bg-hover-solid: #3b3226;
  --dsw-alias-label-primary: #f5ecd9;
  --dsw-alias-label-secondary: #d8c9ab;
  --dsw-alias-label-tertiary: #b09d7f;
  --dsw-alias-label-primary-foreground: #2a241c;
  --dsw-alias-label-primary-inverted: #3b3226;
  --dsw-alias-label-primary-bluish: #f5ecd9;
  --dsw-alias-markdown-code-block: #262017;
  --dsw-alias-markdown-code-block-banner: #2f281e;
  --dsw-alias-markdown-inline-code: #332b21;
  --dsw-alias-scrollbar-bg-l1: #4d4233;
  --dsw-alias-scrollbar-bg-l2: #584c3c;
  --dsw-alias-scrollbar-hover-l1: #5f5242;
  --dsw-alias-scrollbar-hover-l2: #6b5d4a;
  --dsw-alias-state-business-primary: #d8a05f;
  --dsw-alias-state-business-tertiary: #4a3d2a;
  --dsw-alias-state-error-primary: #e08a72;
  --dsw-alias-state-success-primary: #a8c088;
  --dsw-alias-state-success-tertiary: #3a4028;
  --dsw-alias-state-warn-primary: #e0a868;
  --dsw-alias-state-warn-tertiary: #45351f;
  --dsw-alias-toast-bg: #4d4233;
  --dsw-alias-tooltip-bg: #4d4233;
  --dsw-specific-bubble: #3b3226;
  --dsw-specific-bubble-highlight: #44392c;
  --dsw-specific-input-major: #332b21;
  --dsw-specific-sidebar-fill: #262017;
  --dsw-specific-sidebar-nav-item-active: #332b21;
  --dsw-specific-sidebar-nav-item-active-accent: #44392c;
  --dsw-specific-sidebar-nav-item-hover: #2f281e;
  --dsw-linear-gradient-think: linear-gradient(180deg, #332b21 20.19%, rgba(51, 43, 33, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #3b3226 20.19%, rgba(59, 50, 38, 0) 100%);
}

/* ---------- violet · 紫罗兰：紫调个性 ---------- */
body[data-skin-pack="violet"] {
  --dsw-alias-bg-base: #faf8ff;
  --dsw-alias-bg-layer-1: #fefdff;
  --dsw-alias-bg-layer-2: #faf8ff;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #f3effd;
  --dsw-alias-bg-multi-select: #f3effd;
  --dsw-alias-bg-skeleton: rgba(76, 29, 149, 0.05);
  --dsw-alias-border-l1: rgba(76, 29, 149, 0.08);
  --dsw-alias-border-l2: rgba(76, 29, 149, 0.14);
  --dsw-alias-border-l3: rgba(76, 29, 149, 0.18);
  --dsw-alias-brand-primary: #2e1065;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #7c5cd6;
  --dsw-alias-brand-text: #2e1065;
  --dsw-alias-button-primary-fill: #7c5cd6;
  --dsw-alias-button-primary-hover: #6d4fc4;
  --dsw-alias-button-primary-dimmed: #efe9fc;
  --dsw-alias-button-info-fill: #8b5cf6;
  --dsw-alias-button-info-hover: #7c5cd6;
  --dsw-alias-button-ghost-active-fill: #efe9fc;
  --dsw-alias-button-ghost-active-hover: #e4dcf9;
  --dsw-alias-interactive-bg-hover: rgba(91, 33, 182, 0.07);
  --dsw-alias-interactive-bg-active: rgba(91, 33, 182, 0.11);
  --dsw-alias-interactive-bg-hover-accent: rgba(91, 33, 182, 0.15);
  --dsw-alias-interactive-bg-hover-solid: #f3effd;
  --dsw-alias-label-primary: #2e1065;
  --dsw-alias-label-secondary: #4c3a7a;
  --dsw-alias-label-tertiary: #7c6aa8;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #5b21b6;
  --dsw-alias-markdown-code-block: #f3effd;
  --dsw-alias-markdown-code-block-banner: #ece4fb;
  --dsw-alias-markdown-inline-code: #efe9fc;
  --dsw-alias-scrollbar-bg-l1: #ddd2f4;
  --dsw-alias-scrollbar-bg-l2: #ddd2f4;
  --dsw-alias-scrollbar-hover-l1: #c9b8ec;
  --dsw-alias-scrollbar-hover-l2: #c9b8ec;
  --dsw-alias-state-business-primary: #7c5cd6;
  --dsw-alias-state-business-tertiary: #ece4fb;
  --dsw-alias-state-error-primary: #d64545;
  --dsw-alias-state-success-primary: #2f9e6e;
  --dsw-alias-state-success-tertiary: #e0f2ea;
  --dsw-alias-state-warn-primary: #d97706;
  --dsw-alias-state-warn-tertiary: #fdeeda;
  --dsw-alias-toast-bg: #3b2a63;
  --dsw-alias-tooltip-bg: #3b2a63;
  --dsw-specific-bubble: #efe9fc;
  --dsw-specific-bubble-highlight: #e4dcf9;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #f3effd;
  --dsw-specific-sidebar-nav-item-active: #efe9fc;
  --dsw-specific-sidebar-nav-item-active-accent: #e0d6f8;
  --dsw-specific-sidebar-nav-item-hover: #eae2fa;
  --dsw-linear-gradient-think: linear-gradient(180deg, #fefdff 20.19%, rgba(254, 253, 255, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #f3effd 20.19%, rgba(243, 239, 253, 0) 100%);
}

body[data-skin-pack="violet"][data-ds-dark-theme] {
  --dsw-alias-bg-base: #17122b;
  --dsw-alias-bg-layer-1: #1d1636;
  --dsw-alias-bg-layer-2: #241b41;
  --dsw-alias-bg-layer-3: #2b214d;
  --dsw-alias-bg-overlay: #33275c;
  --dsw-alias-bg-module-platform: #241b41;
  --dsw-alias-bg-multi-select: #1d1636;
  --dsw-alias-bg-skeleton: rgba(230, 220, 255, 0.08);
  --dsw-alias-border-l1: rgba(230, 220, 255, 0.08);
  --dsw-alias-border-l2: rgba(230, 220, 255, 0.15);
  --dsw-alias-border-l3: rgba(230, 220, 255, 0.2);
  --dsw-alias-brand-primary: #f3eeff;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #a78bfa;
  --dsw-alias-brand-text: #f3eeff;
  --dsw-alias-button-primary-fill: #8b5cf6;
  --dsw-alias-button-primary-hover: #a78bfa;
  --dsw-alias-button-primary-dimmed: #33275c;
  --dsw-alias-button-info-fill: #a78bfa;
  --dsw-alias-button-info-hover: #8b5cf6;
  --dsw-alias-button-ghost-active-fill: #33275c;
  --dsw-alias-button-ghost-active-hover: #3b2e6a;
  --dsw-alias-interactive-bg-hover: rgba(230, 220, 255, 0.08);
  --dsw-alias-interactive-bg-active: rgba(230, 220, 255, 0.13);
  --dsw-alias-interactive-bg-hover-accent: rgba(230, 220, 255, 0.19);
  --dsw-alias-interactive-bg-hover-solid: #241b41;
  --dsw-alias-label-primary: #f3eeff;
  --dsw-alias-label-secondary: #cfc3f2;
  --dsw-alias-label-tertiary: #a395d6;
  --dsw-alias-label-primary-foreground: #17122b;
  --dsw-alias-label-primary-inverted: #241b41;
  --dsw-alias-label-primary-bluish: #ddd2f4;
  --dsw-alias-markdown-code-block: #141021;
  --dsw-alias-markdown-code-block-banner: #1a1530;
  --dsw-alias-markdown-inline-code: #1d1636;
  --dsw-alias-scrollbar-bg-l1: #33275c;
  --dsw-alias-scrollbar-bg-l2: #3d2f6d;
  --dsw-alias-scrollbar-hover-l1: #423377;
  --dsw-alias-scrollbar-hover-l2: #4d3c88;
  --dsw-alias-state-business-primary: #a78bfa;
  --dsw-alias-state-business-tertiary: #2e2452;
  --dsw-alias-state-error-primary: #f0898e;
  --dsw-alias-state-success-primary: #6fd4a4;
  --dsw-alias-state-success-tertiary: #1c3a2e;
  --dsw-alias-state-warn-primary: #f0b45a;
  --dsw-alias-state-warn-tertiary: #3d3015;
  --dsw-alias-toast-bg: #33275c;
  --dsw-alias-tooltip-bg: #33275c;
  --dsw-specific-bubble: #241b41;
  --dsw-specific-bubble-highlight: #2b214d;
  --dsw-specific-input-major: #1d1636;
  --dsw-specific-sidebar-fill: #141021;
  --dsw-specific-sidebar-nav-item-active: #1d1636;
  --dsw-specific-sidebar-nav-item-active-accent: #2b214d;
  --dsw-specific-sidebar-nav-item-hover: #1a1530;
  --dsw-linear-gradient-think: linear-gradient(180deg, #1d1636 20.19%, rgba(29, 22, 54, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #241b41 20.19%, rgba(36, 27, 65, 0) 100%);
}

/* ---------- cartoon · 卡通：奶油底、高饱和、童趣 ---------- */
body[data-skin-pack="cartoon"] {
  --dsw-alias-bg-base: #fff7e0;
  --dsw-alias-bg-layer-1: #fffbe9;
  --dsw-alias-bg-layer-2: #fff7e0;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #ffeec4;
  --dsw-alias-bg-multi-select: #ffeec4;
  --dsw-alias-bg-skeleton: rgba(120, 60, 20, 0.07);
  --dsw-alias-border-l1: rgba(120, 60, 20, 0.12);
  --dsw-alias-border-l2: rgba(120, 60, 20, 0.2);
  --dsw-alias-border-l3: rgba(120, 60, 20, 0.26);
  --dsw-alias-brand-primary: #3a2d20;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff6b4a;
  --dsw-alias-brand-text: #3a2d20;
  --dsw-alias-button-primary-fill: #ff6b4a;
  --dsw-alias-button-primary-hover: #e85a3c;
  --dsw-alias-button-primary-dimmed: #ffe6dd;
  --dsw-alias-button-info-fill: #3ba7ff;
  --dsw-alias-button-info-hover: #6dbfff;
  --dsw-alias-button-ghost-active-fill: #ffe6dd;
  --dsw-alias-button-ghost-active-hover: #ffd9cc;
  --dsw-alias-interactive-bg-hover: rgba(255, 107, 74, 0.1);
  --dsw-alias-interactive-bg-active: rgba(255, 107, 74, 0.16);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 107, 74, 0.2);
  --dsw-alias-interactive-bg-hover-solid: #ffeec4;
  --dsw-alias-label-primary: #3a2d20;
  --dsw-alias-label-secondary: #6b5745;
  --dsw-alias-label-tertiary: #9c8366;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #2a6db0;
  --dsw-alias-markdown-code-block: #ffeec4;
  --dsw-alias-markdown-code-block-banner: #ffe4ad;
  --dsw-alias-markdown-inline-code: #ffe6dd;
  --dsw-alias-scrollbar-bg-l1: #f0d49e;
  --dsw-alias-scrollbar-bg-l2: #f0d49e;
  --dsw-alias-scrollbar-hover-l1: #e2bf80;
  --dsw-alias-scrollbar-hover-l2: #e2bf80;
  --dsw-alias-state-business-primary: #ff6b4a;
  --dsw-alias-state-business-tertiary: #ffe6dd;
  --dsw-alias-state-error-primary: #ff5252;
  --dsw-alias-state-success-primary: #51cf66;
  --dsw-alias-state-success-tertiary: #e3f7e6;
  --dsw-alias-state-warn-primary: #ffb020;
  --dsw-alias-state-warn-tertiary: #fff0cc;
  --dsw-alias-toast-bg: #4a3826;
  --dsw-alias-tooltip-bg: #4a3826;
  --dsw-specific-bubble: #ffe6dd;
  --dsw-specific-bubble-highlight: #ffd9cc;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #ffeec4;
  --dsw-specific-sidebar-nav-item-active: #ffe6dd;
  --dsw-specific-sidebar-nav-item-active-accent: #ffd9cc;
  --dsw-specific-sidebar-nav-item-hover: #ffe9d2;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(120, 60, 20, 0.1), 0 2px 8px 0 rgba(120, 60, 20, 0.06);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(120, 60, 20, 0.18), 0 0 4px 0 rgba(120, 60, 20, 0.06), 0 12px 32px 0 rgba(120, 60, 20, 0.14);
  --dsw-linear-gradient-think: linear-gradient(180deg, #fffbe9 20.19%, rgba(255, 251, 233, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #ffeec4 20.19%, rgba(255, 238, 196, 0) 100%);
}

body[data-skin-pack="cartoon"][data-ds-dark-theme] {
  --dsw-alias-bg-base: #1f1e2e;
  --dsw-alias-bg-layer-1: #26243a;
  --dsw-alias-bg-layer-2: #2d2a45;
  --dsw-alias-bg-layer-3: #353150;
  --dsw-alias-bg-overlay: #3d3859;
  --dsw-alias-bg-module-platform: #2d2a45;
  --dsw-alias-bg-multi-select: #26243a;
  --dsw-alias-bg-skeleton: rgba(255, 240, 200, 0.08);
  --dsw-alias-border-l1: rgba(255, 240, 200, 0.09);
  --dsw-alias-border-l2: rgba(255, 240, 200, 0.17);
  --dsw-alias-border-l3: rgba(255, 240, 200, 0.24);
  --dsw-alias-brand-primary: #fff6e6;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff8a6a;
  --dsw-alias-brand-text: #fff6e6;
  --dsw-alias-button-primary-fill: #ff6b4a;
  --dsw-alias-button-primary-hover: #ff8a6a;
  --dsw-alias-button-primary-dimmed: #3d3859;
  --dsw-alias-button-info-fill: #66d9e8;
  --dsw-alias-button-info-hover: #8ae4ef;
  --dsw-alias-button-ghost-active-fill: #3d3859;
  --dsw-alias-button-ghost-active-hover: #463f66;
  --dsw-alias-interactive-bg-hover: rgba(255, 240, 200, 0.09);
  --dsw-alias-interactive-bg-active: rgba(255, 240, 200, 0.14);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 240, 200, 0.2);
  --dsw-alias-interactive-bg-hover-solid: #2d2a45;
  --dsw-alias-label-primary: #fff6e6;
  --dsw-alias-label-secondary: #d8cdb4;
  --dsw-alias-label-tertiary: #ab9f85;
  --dsw-alias-label-primary-foreground: #1f1e2e;
  --dsw-alias-label-primary-inverted: #2d2a45;
  --dsw-alias-label-primary-bluish: #c9e6ff;
  --dsw-alias-markdown-code-block: #1a1926;
  --dsw-alias-markdown-code-block-banner: #211f30;
  --dsw-alias-markdown-inline-code: #26243a;
  --dsw-alias-scrollbar-bg-l1: #3d3859;
  --dsw-alias-scrollbar-bg-l2: #47416b;
  --dsw-alias-scrollbar-hover-l1: #4d4675;
  --dsw-alias-scrollbar-hover-l2: #595086;
  --dsw-alias-state-business-primary: #ff8a6a;
  --dsw-alias-state-business-tertiary: #462f26;
  --dsw-alias-state-error-primary: #ff7070;
  --dsw-alias-state-success-primary: #5fdd7f;
  --dsw-alias-state-success-tertiary: #223a26;
  --dsw-alias-state-warn-primary: #ffc145;
  --dsw-alias-state-warn-tertiary: #403414;
  --dsw-alias-toast-bg: #3d3859;
  --dsw-alias-tooltip-bg: #3d3859;
  --dsw-specific-bubble: #2d2a45;
  --dsw-specific-bubble-highlight: #353150;
  --dsw-specific-input-major: #26243a;
  --dsw-specific-sidebar-fill: #1a1926;
  --dsw-specific-sidebar-nav-item-active: #26243a;
  --dsw-specific-sidebar-nav-item-active-accent: #353150;
  --dsw-specific-sidebar-nav-item-hover: #211f30;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(0, 0, 0, 0.3), 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(0, 0, 0, 0.45), 0 0 4px 0 rgba(0, 0, 0, 0.18), 0 12px 32px 0 rgba(0, 0, 0, 0.35);
  --dsw-linear-gradient-think: linear-gradient(180deg, #26243a 20.19%, rgba(38, 36, 58, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #2d2a45 20.19%, rgba(45, 42, 69, 0) 100%);
}

/* ---------- cute · 可爱：粉嫩软萌、低对比 ---------- */
body[data-skin-pack="cute"] {
  --dsw-alias-bg-base: #fff5f8;
  --dsw-alias-bg-layer-1: #fffafc;
  --dsw-alias-bg-layer-2: #fff5f8;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #ffeef4;
  --dsw-alias-bg-multi-select: #ffeef4;
  --dsw-alias-bg-skeleton: rgba(180, 70, 120, 0.06);
  --dsw-alias-border-l1: rgba(180, 70, 120, 0.1);
  --dsw-alias-border-l2: rgba(180, 70, 120, 0.16);
  --dsw-alias-border-l3: rgba(180, 70, 120, 0.22);
  --dsw-alias-brand-primary: #4a2b3a;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #e56a8f;
  --dsw-alias-brand-text: #4a2b3a;
  --dsw-alias-button-primary-fill: #e56a8f;
  --dsw-alias-button-primary-hover: #d95a80;
  --dsw-alias-button-primary-dimmed: #ffe4ee;
  --dsw-alias-button-info-fill: #8aa7ff;
  --dsw-alias-button-info-hover: #a9c0ff;
  --dsw-alias-button-ghost-active-fill: #ffe4ee;
  --dsw-alias-button-ghost-active-hover: #ffd9e6;
  --dsw-alias-interactive-bg-hover: rgba(229, 106, 143, 0.09);
  --dsw-alias-interactive-bg-active: rgba(229, 106, 143, 0.14);
  --dsw-alias-interactive-bg-hover-accent: rgba(229, 106, 143, 0.18);
  --dsw-alias-interactive-bg-hover-solid: #ffeef4;
  --dsw-alias-label-primary: #4a2b3a;
  --dsw-alias-label-secondary: #7d5468;
  --dsw-alias-label-tertiary: #a87d92;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #4a5fb0;
  --dsw-alias-markdown-code-block: #ffeef4;
  --dsw-alias-markdown-code-block-banner: #ffe4ee;
  --dsw-alias-markdown-inline-code: #ffe4ee;
  --dsw-alias-scrollbar-bg-l1: #f3cddb;
  --dsw-alias-scrollbar-bg-l2: #f3cddb;
  --dsw-alias-scrollbar-hover-l1: #e9b3c8;
  --dsw-alias-scrollbar-hover-l2: #e9b3c8;
  --dsw-alias-state-business-primary: #e56a8f;
  --dsw-alias-state-business-tertiary: #ffe4ee;
  --dsw-alias-state-error-primary: #e5486e;
  --dsw-alias-state-success-primary: #5fbf8f;
  --dsw-alias-state-success-tertiary: #e2f5ec;
  --dsw-alias-state-warn-primary: #e8a13c;
  --dsw-alias-state-warn-tertiary: #fbf0dc;
  --dsw-alias-toast-bg: #5a3348;
  --dsw-alias-tooltip-bg: #5a3348;
  --dsw-specific-bubble: #ffe4ee;
  --dsw-specific-bubble-highlight: #ffd9e6;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #ffeef4;
  --dsw-specific-sidebar-nav-item-active: #ffe4ee;
  --dsw-specific-sidebar-nav-item-active-accent: #ffd9e6;
  --dsw-specific-sidebar-nav-item-hover: #ffe9f1;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(180, 70, 120, 0.08), 0 2px 8px 0 rgba(180, 70, 120, 0.05);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(180, 70, 120, 0.14), 0 0 4px 0 rgba(180, 70, 120, 0.04), 0 12px 32px 0 rgba(180, 70, 120, 0.1);
  --dsw-linear-gradient-think: linear-gradient(180deg, #fffafc 20.19%, rgba(255, 250, 252, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #ffeef4 20.19%, rgba(255, 238, 244, 0) 100%);
}

body[data-skin-pack="cute"][data-ds-dark-theme] {
  --dsw-alias-bg-base: #231823;
  --dsw-alias-bg-layer-1: #2b1e2b;
  --dsw-alias-bg-layer-2: #332434;
  --dsw-alias-bg-layer-3: #3b2b3d;
  --dsw-alias-bg-overlay: #433147;
  --dsw-alias-bg-module-platform: #332434;
  --dsw-alias-bg-multi-select: #2b1e2b;
  --dsw-alias-bg-skeleton: rgba(255, 220, 235, 0.07);
  --dsw-alias-border-l1: rgba(255, 220, 235, 0.08);
  --dsw-alias-border-l2: rgba(255, 220, 235, 0.15);
  --dsw-alias-border-l3: rgba(255, 220, 235, 0.21);
  --dsw-alias-brand-primary: #fdeef4;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff9ec2;
  --dsw-alias-brand-text: #fdeef4;
  --dsw-alias-button-primary-fill: #e56a8f;
  --dsw-alias-button-primary-hover: #ff9ec2;
  --dsw-alias-button-primary-dimmed: #433147;
  --dsw-alias-button-info-fill: #a9c0ff;
  --dsw-alias-button-info-hover: #8aa7ff;
  --dsw-alias-button-ghost-active-fill: #433147;
  --dsw-alias-button-ghost-active-hover: #4d3852;
  --dsw-alias-interactive-bg-hover: rgba(255, 220, 235, 0.08);
  --dsw-alias-interactive-bg-active: rgba(255, 220, 235, 0.13);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 220, 235, 0.19);
  --dsw-alias-interactive-bg-hover-solid: #332434;
  --dsw-alias-label-primary: #fdeef4;
  --dsw-alias-label-secondary: #ddb8c8;
  --dsw-alias-label-tertiary: #b58ea2;
  --dsw-alias-label-primary-foreground: #231823;
  --dsw-alias-label-primary-inverted: #332434;
  --dsw-alias-label-primary-bluish: #d8e0ff;
  --dsw-alias-markdown-code-block: #1e141e;
  --dsw-alias-markdown-code-block-banner: #261a26;
  --dsw-alias-markdown-inline-code: #2b1e2b;
  --dsw-alias-scrollbar-bg-l1: #433147;
  --dsw-alias-scrollbar-bg-l2: #4d3852;
  --dsw-alias-scrollbar-hover-l1: #543d59;
  --dsw-alias-scrollbar-hover-l2: #5f4565;
  --dsw-alias-state-business-primary: #ff9ec2;
  --dsw-alias-state-business-tertiary: #46293a;
  --dsw-alias-state-error-primary: #ff8aa5;
  --dsw-alias-state-success-primary: #8fe0b8;
  --dsw-alias-state-success-tertiary: #223a2e;
  --dsw-alias-state-warn-primary: #f0b45a;
  --dsw-alias-state-warn-tertiary: #403414;
  --dsw-alias-toast-bg: #433147;
  --dsw-alias-tooltip-bg: #433147;
  --dsw-specific-bubble: #332434;
  --dsw-specific-bubble-highlight: #3b2b3d;
  --dsw-specific-input-major: #2b1e2b;
  --dsw-specific-sidebar-fill: #1e141e;
  --dsw-specific-sidebar-nav-item-active: #2b1e2b;
  --dsw-specific-sidebar-nav-item-active-accent: #3b2b3d;
  --dsw-specific-sidebar-nav-item-hover: #261a26;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(0, 0, 0, 0.28), 0 2px 8px 0 rgba(0, 0, 0, 0.18);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(0, 0, 0, 0.42), 0 0 4px 0 rgba(0, 0, 0, 0.16), 0 12px 32px 0 rgba(0, 0, 0, 0.32);
  --dsw-linear-gradient-think: linear-gradient(180deg, #2b1e2b 20.19%, rgba(43, 30, 43, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #332434 20.19%, rgba(51, 36, 52, 0) 100%);
}
`;
		const skinsScopedCss = `/* Figma font-weight 510 (an SF Pro variable-font weight) always renders as
   font-weight: 500 in this UI — non-variable webfonts snap intermediate
   weights unpredictably across platforms. */
[data-skin-pack-preview="deepseek"] {
  --dsw-static-amber-100: rgb(254, 245, 231);
  --dsw-static-amber-400: rgb(247, 173, 49);
  --dsw-static-amber-500: rgb(245, 158, 11);
  --dsw-static-amber-600: rgb(221, 134, 41);
  --dsw-static-amber-900: rgb(39, 36, 31);
  --dsw-static-blue-100: rgb(219, 234, 254);
  --dsw-static-blue-300: rgb(147, 197, 253);
  --dsw-static-blue-400: rgb(96, 165, 250);
  --dsw-static-blue-450: rgb(77, 147, 248);
  --dsw-static-blue-500: rgb(59, 130, 246);
  --dsw-static-blue-50: rgb(239, 246, 255);
  --dsw-static-blue-50p: rgb(234, 243, 255);
  --dsw-static-blue-600: rgb(37, 99, 235);
  --dsw-static-blue-75: rgb(229, 240, 255);
  --dsw-static-blue-800: rgb(30, 64, 175);
  --dsw-static-blue-900: rgb(14, 48, 116);
  --dsw-static-blue-950: rgb(23, 37, 84);
  --dsw-static-deepseek-100: rgb(228, 237, 253);
  --dsw-static-deepseek-200: rgb(211, 226, 255);
  --dsw-static-deepseek-300: rgb(183, 200, 254);
  --dsw-static-deepseek-400: rgb(103, 158, 254);
  --dsw-static-deepseek-450: rgb(86, 134, 254);
  --dsw-static-deepseek-500: rgb(65, 118, 230);
  --dsw-static-deepseek-50: rgb(237, 243, 254);
  --dsw-static-deepseek-600: rgb(72, 104, 178);
  --dsw-static-deepseek-700-delete: rgb(47, 76, 143);
  --dsw-static-deepseek-800: rgb(52, 65, 91);
  --dsw-static-deepseek-900: rgb(40, 49, 66);
  --dsw-static-green-100: rgb(230, 250, 237);
  --dsw-static-green-400: rgb(78, 209, 126);
  --dsw-static-green-500: rgb(34, 197, 94);
  --dsw-static-green-900: rgb(35, 60, 44);
  --dsw-static-neutral-00: rgb(255, 255, 255);
  --dsw-static-neutral-1000: rgb(0, 0, 0);
  --dsw-static-neutral-100: rgb(245, 245, 245);
  --dsw-static-neutral-150: rgb(237, 237, 237);
  --dsw-static-neutral-200: rgb(229, 229, 229);
  --dsw-static-neutral-250: rgb(220, 220, 220);
  --dsw-static-neutral-300: rgb(212, 212, 212);
  --dsw-static-neutral-400: rgb(162, 164, 166);
  --dsw-static-neutral-500: rgb(127, 130, 135);
  --dsw-static-neutral-50: rgb(250, 250, 250);
  --dsw-static-neutral-550: rgb(101, 103, 107);
  --dsw-static-neutral-600: rgb(84, 85, 87);
  --dsw-static-neutral-700: rgb(60, 60, 61);
  --dsw-static-neutral-800: rgb(41, 41, 41);
  --dsw-static-neutral-850: rgb(33, 33, 35);
  --dsw-static-neutral-900: rgb(15, 15, 15);
  --dsw-static-neutral-bluish-00: rgb(255, 255, 255);
  --dsw-static-neutral-bluish-1000: rgb(15, 17, 21);
  --dsw-static-neutral-bluish-100: rgb(235, 238, 242);
  --dsw-static-neutral-bluish-150: rgb(233, 236, 242);
  --dsw-static-neutral-bluish-200: rgb(225, 229, 238);
  --dsw-static-neutral-bluish-300: rgb(207, 211, 214);
  --dsw-static-neutral-bluish-400: rgb(173, 178, 184);
  --dsw-static-neutral-bluish-500: rgb(151, 157, 166);
  --dsw-static-neutral-bluish-50: rgb(249, 250, 251);
  --dsw-static-neutral-bluish-600: rgb(129, 133, 140);
  --dsw-static-neutral-bluish-60: rgb(245, 246, 247);
  --dsw-static-neutral-bluish-700: rgb(97, 102, 107);
  --dsw-static-neutral-bluish-750: rgb(67, 69, 74);
  --dsw-static-neutral-bluish-75: rgb(241, 243, 245);
  --dsw-static-neutral-bluish-800: rgb(53, 54, 56);
  --dsw-static-neutral-bluish-850: rgb(44, 44, 46);
  --dsw-static-neutral-bluish-875: rgb(35, 35, 36);
  --dsw-static-neutral-bluish-900: rgb(27, 27, 28);
  --dsw-static-neutral-bluish-950: rgb(21, 21, 23);
  --dsw-static-red-100: rgb(254, 226, 226);
  --dsw-static-red-400: rgb(242, 90, 90);
  --dsw-static-red-500: rgb(239, 68, 68);
  --dsw-static-red-50: rgb(254, 242, 242);
  --dsw-static-red-600: rgb(236, 19, 19);
  --dsw-static-red-900: rgb(87, 12, 12);
}

[data-skin-pack-preview="deepseek"][data-preview-dark] {
  --dsw-static-amber-100: rgb(254, 245, 231);
  --dsw-static-amber-400: rgb(247, 173, 49);
  --dsw-static-amber-500: rgb(245, 158, 11);
  --dsw-static-amber-600: rgb(221, 134, 41);
  --dsw-static-amber-900: rgb(39, 36, 31);
  --dsw-static-blue-100: rgb(219, 234, 254);
  --dsw-static-blue-300: rgb(147, 197, 253);
  --dsw-static-blue-400: rgb(96, 165, 250);
  --dsw-static-blue-450: rgb(77, 147, 248);
  --dsw-static-blue-500: rgb(59, 130, 246);
  --dsw-static-blue-50: rgb(239, 246, 255);
  --dsw-static-blue-50p: rgb(234, 243, 255);
  --dsw-static-blue-600: rgb(37, 99, 235);
  --dsw-static-blue-75: rgb(229, 240, 255);
  --dsw-static-blue-800: rgb(30, 64, 175);
  --dsw-static-blue-900: rgb(14, 48, 116);
  --dsw-static-blue-950: rgb(23, 37, 84);
  --dsw-static-deepseek-100: rgb(228, 237, 253);
  --dsw-static-deepseek-200: rgb(211, 226, 255);
  --dsw-static-deepseek-300: rgb(183, 200, 254);
  --dsw-static-deepseek-400: rgb(103, 158, 254);
  --dsw-static-deepseek-450: rgb(86, 134, 254);
  --dsw-static-deepseek-500: rgb(65, 118, 230);
  --dsw-static-deepseek-50: rgb(237, 243, 254);
  --dsw-static-deepseek-600: rgb(72, 104, 178);
  --dsw-static-deepseek-700-delete: rgb(47, 76, 143);
  --dsw-static-deepseek-800: rgb(52, 65, 91);
  --dsw-static-deepseek-900: rgb(40, 49, 66);
  --dsw-static-green-100: rgb(230, 250, 237);
  --dsw-static-green-400: rgb(78, 209, 126);
  --dsw-static-green-500: rgb(34, 197, 94);
  --dsw-static-green-900: rgb(35, 60, 44);
  --dsw-static-neutral-00: rgb(255, 255, 255);
  --dsw-static-neutral-1000: rgb(0, 0, 0);
  --dsw-static-neutral-100: rgb(245, 245, 245);
  --dsw-static-neutral-150: rgb(237, 237, 237);
  --dsw-static-neutral-200: rgb(229, 229, 229);
  --dsw-static-neutral-250: rgb(220, 220, 220);
  --dsw-static-neutral-300: rgb(212, 212, 212);
  --dsw-static-neutral-400: rgb(162, 164, 166);
  --dsw-static-neutral-500: rgb(127, 130, 135);
  --dsw-static-neutral-50: rgb(250, 250, 250);
  --dsw-static-neutral-550: rgb(101, 103, 107);
  --dsw-static-neutral-600: rgb(84, 85, 87);
  --dsw-static-neutral-700: rgb(60, 60, 61);
  --dsw-static-neutral-800: rgb(41, 41, 41);
  --dsw-static-neutral-850: rgb(33, 33, 35);
  --dsw-static-neutral-900: rgb(15, 15, 15);
  --dsw-static-neutral-bluish-00: rgb(255, 255, 255);
  --dsw-static-neutral-bluish-1000: rgb(15, 17, 21);
  --dsw-static-neutral-bluish-100: rgb(235, 238, 242);
  --dsw-static-neutral-bluish-150: rgb(233, 236, 242);
  --dsw-static-neutral-bluish-200: rgb(225, 229, 238);
  --dsw-static-neutral-bluish-300: rgb(207, 211, 214);
  --dsw-static-neutral-bluish-400: rgb(173, 178, 184);
  --dsw-static-neutral-bluish-500: rgb(151, 157, 166);
  --dsw-static-neutral-bluish-50: rgb(249, 250, 251);
  --dsw-static-neutral-bluish-600: rgb(129, 133, 140);
  --dsw-static-neutral-bluish-60: rgb(249, 250, 251);
  --dsw-static-neutral-bluish-700: rgb(97, 102, 107);
  --dsw-static-neutral-bluish-750: rgb(67, 69, 74);
  --dsw-static-neutral-bluish-75: rgb(241, 243, 245);
  --dsw-static-neutral-bluish-800: rgb(53, 54, 56);
  --dsw-static-neutral-bluish-850: rgb(44, 44, 46);
  --dsw-static-neutral-bluish-875: rgb(35, 35, 36);
  --dsw-static-neutral-bluish-900: rgb(27, 27, 28);
  --dsw-static-neutral-bluish-950: rgb(21, 21, 23);
  --dsw-static-red-100: rgb(254, 226, 226);
  --dsw-static-red-400: rgb(242, 90, 90);
  --dsw-static-red-500: rgb(239, 68, 68);
  --dsw-static-red-50: rgb(254, 242, 242);
  --dsw-static-red-600: rgb(236, 19, 19);
  --dsw-static-red-900: rgb(87, 12, 12);
}

[data-skin-pack-preview="deepseek"] {
  --dsw-alias-bg-base: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-bg-layer-1: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-bg-layer-2: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-bg-layer-3: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-bg-mask-1: rgba(0, 0, 0, 0.24);
  --dsw-alias-bg-mask-2: rgba(0, 0, 0, 0.12);
  --dsw-alias-bg-mask-3: rgba(0, 0, 0, 0.48);
  --dsw-alias-bg-mask-photo: rgba(0, 0, 0, 0.88);
  --dsw-alias-bg-mask-drop: rgba(255, 255, 255, 0.7);
  --dsw-alias-bg-module-platform: var(--dsw-static-neutral-bluish-60);
  --dsw-alias-bg-multi-select: var(--dsw-static-neutral-bluish-60);
  --dsw-alias-bg-overlay: var(--dsw-static-neutral-bluish-150);
  --dsw-alias-bg-skeleton: rgba(0, 0, 0, 0.04);
  --dsw-alias-border-inverted2: rgba(0, 0, 0, 0);
  --dsw-alias-border-inverted: rgba(0, 0, 0, 0);
  --dsw-alias-border-l1: rgba(0, 0, 0, 0.04);
  --dsw-alias-border-l2-darkmode-thin: rgba(0, 0, 0, 0.1);
  --dsw-alias-border-l2: rgba(0, 0, 0, 0.1);
  --dsw-alias-border-l3: rgba(0, 0, 0, 0.12);
  --dsw-alias-border-l4: rgba(0, 0, 0, 0.16);
  --dsw-alias-brand-primary-invert: var(--dsw-static-neutral-bluish-1000);
  --dsw-alias-brand-primary-new-colorprimary-new-color: rgb(65, 118, 230);
  --dsw-alias-brand-primary: var(--dsw-static-neutral-bluish-1000);
  --dsw-alias-brand-text: var(--dsw-static-neutral-bluish-1000);
  --dsw-alias-button-contrast-fill: var(--dsw-static-neutral-bluish-700);
  --dsw-alias-button-elevated-fill: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-button-floating-fill: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-button-floating-hover: var(--dsw-static-neutral-bluish-75);
  --dsw-alias-button-ghost-active-border: var(--dsw-static-neutral-bluish-500);
  --dsw-alias-button-ghost-active-fill: var(--dsw-static-neutral-bluish-100);
  --dsw-alias-button-ghost-active-hover: var(--dsw-static-neutral-bluish-150);
  --dsw-alias-button-info-fill: var(--dsw-static-deepseek-500);
  --dsw-alias-button-info-hover: var(--dsw-static-deepseek-400);
  --dsw-alias-button-primary-dimmed: var(--dsw-static-neutral-bluish-100);
  --dsw-alias-button-primary-fill: var(--dsw-alias-brand-primary);
  --dsw-alias-button-primary-hover: var(--dsw-static-neutral-bluish-750);
  --dsw-alias-button-tool-bar-fill-invisible: rgba(31, 31, 31, 0.36);
  --dsw-alias-button-tool-bar-fill: rgba(84, 85, 87, 0.5);
  --dsw-alias-button-tool-bar-hover: rgba(84, 85, 87, 0.6);
  --dsw-alias-interactive-bg-active: rgba(38, 49, 72, 0.1);
  --dsw-alias-interactive-bg-hover-accent: rgba(38, 49, 72, 0.14);
  --dsw-alias-interactive-bg-hover-danger: rgba(236, 19, 19, 0.05);
  --dsw-alias-interactive-bg-hover-solid: var(--dsw-static-neutral-bluish-75);
  --dsw-alias-interactive-bg-hover: rgba(38, 49, 72, 0.06);
  --dsw-alias-label-caption: var(--dsw-static-neutral-bluish-400);
  --dsw-alias-label-dimmed: var(--dsw-static-neutral-bluish-200);
  --dsw-alias-label-primary-bluish: var(--dsw-static-blue-900);
  --dsw-alias-label-primary-dimmed: var(--dsw-static-neutral-bluish-950);
  --dsw-alias-label-primary-foreground: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-label-primary-inverted: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-label-primary: var(--dsw-static-neutral-bluish-1000);
  --dsw-alias-label-secondary: var(--dsw-static-neutral-bluish-700);
  --dsw-alias-label-tertiary: var(--dsw-static-neutral-bluish-600);
  --dsw-alias-markdown-citation: var(--dsw-static-neutral-bluish-100);
  --dsw-alias-markdown-code-block-banner: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-markdown-code-block: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-markdown-code-segment-selected: var(--dsw-static-neutral-bluish-00);
  --dsw-alias-markdown-code-segment-unselected: var(--dsw-static-neutral-bluish-75);
  --dsw-alias-markdown-inline-code: var(--dsw-static-neutral-bluish-100);
  --dsw-alias-markdown-placeholder: var(--dsw-static-neutral-bluish-60);
  --dsw-alias-markdown-tag: var(--dsw-static-neutral-bluish-75);
  --dsw-alias-scrollbar-bg-l1: var(--dsw-static-neutral-200);
  --dsw-alias-scrollbar-bg-l2: var(--dsw-static-neutral-200);
  --dsw-alias-scrollbar-hover-l1: var(--dsw-static-neutral-300);
  --dsw-alias-scrollbar-hover-l2: var(--dsw-static-neutral-300);
  --dsw-alias-state-business-primary: var(--dsw-static-deepseek-500);
  --dsw-alias-state-business-tertiary: var(--dsw-static-deepseek-100);
  --dsw-alias-state-error-primary: var(--dsw-static-red-600);
  --dsw-alias-state-error-secondary: var(--dsw-static-red-400);
  --dsw-alias-state-success-primary: var(--dsw-static-green-500);
  --dsw-alias-state-success-secondary: var(--dsw-static-green-400);
  --dsw-alias-state-success-tertiary: var(--dsw-static-green-100);
  --dsw-alias-state-warn-label: var(--dsw-static-amber-600);
  --dsw-alias-state-warn-primary: var(--dsw-static-amber-500);
  --dsw-alias-state-warn-secondary: var(--dsw-static-amber-400);
  --dsw-alias-state-warn-tertiary: var(--dsw-static-amber-100);
  --dsw-alias-toast-bg: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-tooltip-bg: var(--dsw-static-neutral-bluish-850);
  --dsw-specific-bubble-highlight: var(--dsw-static-deepseek-200);
  --dsw-specific-bubble: var(--dsw-static-deepseek-50);
  --dsw-specific-input-major: var(--dsw-static-neutral-bluish-00);
  --dsw-specific-login-input: var(--dsw-static-neutral-bluish-50);
  --dsw-specific-menu: var(--dsw-alias-bg-layer-3);
  --dsw-specific-selector: var(--dsw-static-neutral-bluish-60);
  --dsw-specific-sidebar-fill: var(--dsw-static-neutral-bluish-50);
  --dsw-specific-sidebar-nav-item-active-accent: var(--dsw-static-deepseek-100);
  --dsw-specific-sidebar-nav-item-active: var(--dsw-static-neutral-bluish-100);
  --dsw-specific-sidebar-nav-item-hover: var(--dsw-static-neutral-bluish-75);
  --dsw-specific-tip: var(--dsw-static-neutral-bluish-60);
}

[data-skin-pack-preview="deepseek"][data-preview-dark] {
  --dsw-alias-bg-base: var(--dsw-static-neutral-bluish-950);
  --dsw-alias-bg-layer-1: var(--dsw-static-neutral-bluish-875);
  --dsw-alias-bg-layer-2: var(--dsw-static-neutral-bluish-850);
  --dsw-alias-bg-layer-3: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-bg-mask-1: rgba(0, 0, 0, 0.5);
  --dsw-alias-bg-mask-2: rgba(0, 0, 0, 0.2);
  --dsw-alias-bg-mask-3: rgba(0, 0, 0, 0.48);
  --dsw-alias-bg-mask-photo: rgba(0, 0, 0, 0.88);
  --dsw-alias-bg-mask-drop: rgba(39, 39, 48, 0.7);
  --dsw-alias-bg-module-platform: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-bg-multi-select: var(--dsw-static-neutral-850);
  --dsw-alias-bg-overlay: var(--dsw-static-neutral-bluish-700);
  --dsw-alias-bg-skeleton: rgba(255, 255, 255, 0.08);
  --dsw-alias-border-inverted2: rgba(255, 255, 255, 0.08);
  --dsw-alias-border-inverted: rgba(255, 255, 255, 0.06);
  --dsw-alias-border-l1: rgba(255, 255, 255, 0.06);
  --dsw-alias-border-l2-darkmode-thin: rgba(255, 255, 255, 0.06);
  --dsw-alias-border-l2: rgba(255, 255, 255, 0.12);
  --dsw-alias-border-l3: rgba(255, 255, 255, 0.16);
  --dsw-alias-border-l4: rgba(255, 255, 255, 0.2);
  --dsw-alias-brand-primary-invert: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-brand-primary-new-colorprimary-new-color: var(--dsw-static-deepseek-450);
  --dsw-alias-brand-primary: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-brand-text: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-button-contrast-fill: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-button-elevated-fill: var(--dsw-static-neutral-bluish-750);
  --dsw-alias-button-floating-fill: var(--dsw-static-neutral-bluish-850);
  --dsw-alias-button-floating-hover: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-button-ghost-active-border: var(--dsw-static-neutral-bluish-600);
  --dsw-alias-button-ghost-active-fill: var(--dsw-static-neutral-bluish-750);
  --dsw-alias-button-ghost-active-hover: var(--dsw-static-neutral-bluish-700);
  --dsw-alias-button-info-fill: var(--dsw-static-deepseek-400);
  --dsw-alias-button-info-hover: var(--dsw-static-deepseek-500);
  --dsw-alias-button-primary-dimmed: var(--dsw-static-neutral-bluish-750);
  --dsw-alias-button-primary-fill: var(--dsw-alias-brand-primary);
  --dsw-alias-button-primary-hover: var(--dsw-static-neutral-bluish-100);
  --dsw-alias-button-tool-bar-fill-invisible: rgba(31, 31, 31, 0.36);
  --dsw-alias-button-tool-bar-fill: rgba(84, 85, 87, 0.5);
  --dsw-alias-button-tool-bar-hover: rgba(84, 85, 87, 0.6);
  --dsw-alias-interactive-bg-active: rgba(255, 255, 255, 0.14);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 255, 255, 0.24);
  --dsw-alias-interactive-bg-hover-danger: rgba(242, 90, 90, 0.15);
  --dsw-alias-interactive-bg-hover-solid: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.08);
  --dsw-alias-label-caption: var(--dsw-static-neutral-bluish-600);
  --dsw-alias-label-dimmed: var(--dsw-static-neutral-bluish-750);
  --dsw-alias-label-primary-bluish: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-label-primary-dimmed: var(--dsw-static-neutral-bluish-100);
  --dsw-alias-label-primary-foreground: var(--dsw-static-neutral-bluish-1000);
  --dsw-alias-label-primary-inverted: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-label-primary: var(--dsw-static-neutral-bluish-50);
  --dsw-alias-label-secondary: var(--dsw-static-neutral-bluish-300);
  --dsw-alias-label-tertiary: var(--dsw-static-neutral-bluish-400);
  --dsw-alias-markdown-citation: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-markdown-code-block-banner: var(--dsw-static-neutral-bluish-850);
  --dsw-alias-markdown-code-block: var(--dsw-static-neutral-bluish-900);
  --dsw-alias-markdown-code-segment-selected: var(--dsw-static-neutral-bluish-800);
  --dsw-alias-markdown-code-segment-unselected: var(--dsw-static-neutral-bluish-900);
  --dsw-alias-markdown-inline-code: var(--dsw-static-neutral-bluish-850);
  --dsw-alias-markdown-placeholder: var(--dsw-static-neutral-bluish-850);
  --dsw-alias-markdown-tag: var(--dsw-static-neutral-bluish-850);
  --dsw-alias-scrollbar-bg-l1: var(--dsw-static-neutral-700);
  --dsw-alias-scrollbar-bg-l2: var(--dsw-static-neutral-600);
  --dsw-alias-scrollbar-hover-l1: var(--dsw-static-neutral-600);
  --dsw-alias-scrollbar-hover-l2: var(--dsw-static-neutral-550);
  --dsw-alias-state-business-primary: var(--dsw-static-deepseek-400);
  --dsw-alias-state-business-tertiary: var(--dsw-static-deepseek-800);
  --dsw-alias-state-error-primary: var(--dsw-static-red-400);
  --dsw-alias-state-error-secondary: var(--dsw-static-red-400);
  --dsw-alias-state-success-primary: var(--dsw-static-green-500);
  --dsw-alias-state-success-secondary: var(--dsw-static-green-400);
  --dsw-alias-state-success-tertiary: var(--dsw-static-green-900);
  --dsw-alias-state-warn-label: var(--dsw-static-amber-600);
  --dsw-alias-state-warn-primary: var(--dsw-static-amber-500);
  --dsw-alias-state-warn-secondary: var(--dsw-static-amber-400);
  --dsw-alias-state-warn-tertiary: var(--dsw-static-amber-900);
  --dsw-alias-toast-bg: var(--dsw-static-neutral-bluish-750);
  --dsw-alias-tooltip-bg: var(--dsw-static-neutral-bluish-750);
  --dsw-specific-bubble-highlight: var(--dsw-static-neutral-bluish-750);
  --dsw-specific-bubble: var(--dsw-static-neutral-bluish-850);
  --dsw-specific-input-major: var(--dsw-static-neutral-bluish-850);
  --dsw-specific-login-input: var(--dsw-static-neutral-bluish-900);
  --dsw-specific-menu: var(--dsw-alias-bg-layer-3);
  --dsw-specific-selector: var(--dsw-static-neutral-bluish-800);
  --dsw-specific-sidebar-fill: var(--dsw-static-neutral-bluish-900);
  --dsw-specific-sidebar-nav-item-active-accent: var(--dsw-static-neutral-bluish-800);
  --dsw-specific-sidebar-nav-item-active: var(--dsw-static-neutral-bluish-750);
  --dsw-specific-sidebar-nav-item-hover: var(--dsw-static-neutral-bluish-850);
  --dsw-specific-tip: var(--dsw-static-neutral-bluish-800);
}

/* Preset skins — palette layers stacked over design-platform.css.
 *
 * Selector specificity: \`[data-skin-pack-preview="x"]\` (+ \`[data-preview-dark]\`)
 * is an attribute layer, so these rules only win while the attribute is
 * present and the base sheets keep the \`deepseek\` default otherwise.
 *
 * Delivery: the client bundle injects this file's content as a
 * \`skins.css\` style tag at plugin activation; the source-repo build imports
 * it from the web shell's base.css AFTER design-platform.css (order is
 * load-bearing — the alias layer must be declared first).
 *
 * \`custom\` intentionally has no sheet: the reserved slot renders the
 * default palette until the custom-token editor lands.
 */

/* ---------- midnight · 午夜：高对比冷黑 ---------- */
[data-skin-pack-preview="midnight"] {
  --dsw-alias-bg-base: #f4f6fa;
  --dsw-alias-bg-layer-1: #fafbfd;
  --dsw-alias-bg-layer-2: #f4f6fa;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #eef1f6;
  --dsw-alias-bg-multi-select: #eef1f6;
  --dsw-alias-bg-skeleton: rgba(23, 37, 84, 0.05);
  --dsw-alias-border-l1: rgba(23, 37, 84, 0.06);
  --dsw-alias-border-l2: rgba(23, 37, 84, 0.12);
  --dsw-alias-border-l3: rgba(23, 37, 84, 0.16);
  --dsw-alias-brand-primary: #0f172a;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #3b6fd4;
  --dsw-alias-brand-text: #0f172a;
  --dsw-alias-button-primary-fill: #2563eb;
  --dsw-alias-button-primary-hover: #1d4ed8;
  --dsw-alias-button-primary-dimmed: #e8eefc;
  --dsw-alias-button-info-fill: #3b82f6;
  --dsw-alias-button-info-hover: #60a5fa;
  --dsw-alias-button-ghost-active-fill: #e8eefc;
  --dsw-alias-button-ghost-active-hover: #dbe4f5;
  --dsw-alias-interactive-bg-hover: rgba(30, 58, 138, 0.06);
  --dsw-alias-interactive-bg-active: rgba(30, 58, 138, 0.1);
  --dsw-alias-interactive-bg-hover-accent: rgba(30, 58, 138, 0.14);
  --dsw-alias-interactive-bg-hover-solid: #eef1f6;
  --dsw-alias-label-primary: #0f172a;
  --dsw-alias-label-secondary: #334155;
  --dsw-alias-label-tertiary: #64748b;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #1e3a8a;
  --dsw-alias-markdown-code-block: #f4f6fa;
  --dsw-alias-markdown-code-block-banner: #eef1f6;
  --dsw-alias-markdown-inline-code: #e8eefc;
  --dsw-alias-scrollbar-bg-l1: #d9dee8;
  --dsw-alias-scrollbar-bg-l2: #d9dee8;
  --dsw-alias-scrollbar-hover-l1: #c3cad8;
  --dsw-alias-scrollbar-hover-l2: #c3cad8;
  --dsw-alias-state-business-primary: #3b6fd4;
  --dsw-alias-state-business-tertiary: #e0e8f8;
  --dsw-alias-state-error-primary: #dc2626;
  --dsw-alias-state-success-primary: #16a34a;
  --dsw-alias-state-success-tertiary: #e0f2e6;
  --dsw-alias-state-warn-primary: #d97706;
  --dsw-alias-state-warn-tertiary: #fdeeda;
  --dsw-alias-toast-bg: #1e293b;
  --dsw-alias-tooltip-bg: #1e293b;
  --dsw-specific-bubble: #e8eefc;
  --dsw-specific-bubble-highlight: #dbe4f5;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #eef1f6;
  --dsw-specific-sidebar-nav-item-active: #e8eefc;
  --dsw-specific-sidebar-nav-item-active-accent: #dbe4f5;
  --dsw-specific-sidebar-nav-item-hover: #e4e9f2;
  --dsw-linear-gradient-think: linear-gradient(180deg, #fafbfd 20.19%, rgba(250, 251, 253, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #eef1f6 20.19%, rgba(238, 241, 246, 0) 100%);
}

[data-skin-pack-preview="midnight"][data-preview-dark] {
  --dsw-alias-bg-base: #0d0f14;
  --dsw-alias-bg-layer-1: #141821;
  --dsw-alias-bg-layer-2: #1a1f2b;
  --dsw-alias-bg-layer-3: #212838;
  --dsw-alias-bg-overlay: #262e40;
  --dsw-alias-bg-module-platform: #1a1f2b;
  --dsw-alias-bg-multi-select: #141821;
  --dsw-alias-bg-skeleton: rgba(255, 255, 255, 0.08);
  --dsw-alias-border-l1: rgba(255, 255, 255, 0.07);
  --dsw-alias-border-l2: rgba(255, 255, 255, 0.13);
  --dsw-alias-border-l3: rgba(255, 255, 255, 0.18);
  --dsw-alias-brand-primary: #f1f5f9;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #4d9fff;
  --dsw-alias-brand-text: #f1f5f9;
  --dsw-alias-button-primary-fill: #3b82f6;
  --dsw-alias-button-primary-hover: #60a5fa;
  --dsw-alias-button-primary-dimmed: #1e2a44;
  --dsw-alias-button-info-fill: #4d9fff;
  --dsw-alias-button-info-hover: #3b82f6;
  --dsw-alias-button-ghost-active-fill: #1e2a44;
  --dsw-alias-button-ghost-active-hover: #243253;
  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.08);
  --dsw-alias-interactive-bg-active: rgba(255, 255, 255, 0.13);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 255, 255, 0.2);
  --dsw-alias-interactive-bg-hover-solid: #1a1f2b;
  --dsw-alias-label-primary: #f1f5f9;
  --dsw-alias-label-secondary: #cbd5e1;
  --dsw-alias-label-tertiary: #94a3b8;
  --dsw-alias-label-primary-foreground: #0d0f14;
  --dsw-alias-label-primary-inverted: #1a1f2b;
  --dsw-alias-label-primary-bluish: #bfdbfe;
  --dsw-alias-markdown-code-block: #11151d;
  --dsw-alias-markdown-code-block-banner: #141821;
  --dsw-alias-markdown-inline-code: #1a2030;
  --dsw-alias-scrollbar-bg-l1: #2e3648;
  --dsw-alias-scrollbar-bg-l2: #39415a;
  --dsw-alias-scrollbar-hover-l1: #3d4660;
  --dsw-alias-scrollbar-hover-l2: #47527a;
  --dsw-alias-state-business-primary: #4d9fff;
  --dsw-alias-state-business-tertiary: #1e2a44;
  --dsw-alias-state-error-primary: #f87171;
  --dsw-alias-state-success-primary: #4ade80;
  --dsw-alias-state-success-tertiary: #10331f;
  --dsw-alias-state-warn-primary: #fbbf24;
  --dsw-alias-state-warn-tertiary: #33270c;
  --dsw-alias-toast-bg: #262e40;
  --dsw-alias-tooltip-bg: #262e40;
  --dsw-specific-bubble: #1a2030;
  --dsw-specific-bubble-highlight: #232b40;
  --dsw-specific-input-major: #141821;
  --dsw-specific-sidebar-fill: #0f131b;
  --dsw-specific-sidebar-nav-item-active: #1a2030;
  --dsw-specific-sidebar-nav-item-active-accent: #232b40;
  --dsw-specific-sidebar-nav-item-hover: #161b26;
  --dsw-linear-gradient-think: linear-gradient(180deg, #141821 20.19%, rgba(20, 24, 33, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #1a1f2b 20.19%, rgba(26, 31, 43, 0) 100%);
}

/* ---------- nord · 冷杉：低饱和蓝灰 ---------- */
[data-skin-pack-preview="nord"] {
  --dsw-alias-bg-base: #eceff4;
  --dsw-alias-bg-layer-1: #f4f6f9;
  --dsw-alias-bg-layer-2: #eceff4;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #e5e9f0;
  --dsw-alias-bg-multi-select: #e5e9f0;
  --dsw-alias-bg-skeleton: rgba(46, 52, 64, 0.05);
  --dsw-alias-border-l1: rgba(46, 52, 64, 0.07);
  --dsw-alias-border-l2: rgba(46, 52, 64, 0.14);
  --dsw-alias-border-l3: rgba(46, 52, 64, 0.18);
  --dsw-alias-brand-primary: #2e3440;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #5e81ac;
  --dsw-alias-brand-text: #2e3440;
  --dsw-alias-button-primary-fill: #5e81ac;
  --dsw-alias-button-primary-hover: #81a1c1;
  --dsw-alias-button-primary-dimmed: #e5e9f0;
  --dsw-alias-button-info-fill: #88c0d0;
  --dsw-alias-button-info-hover: #5e81ac;
  --dsw-alias-button-ghost-active-fill: #e5e9f0;
  --dsw-alias-button-ghost-active-hover: #dce2ec;
  --dsw-alias-interactive-bg-hover: rgba(76, 86, 106, 0.08);
  --dsw-alias-interactive-bg-active: rgba(76, 86, 106, 0.12);
  --dsw-alias-interactive-bg-hover-accent: rgba(76, 86, 106, 0.16);
  --dsw-alias-interactive-bg-hover-solid: #e5e9f0;
  --dsw-alias-label-primary: #2e3440;
  --dsw-alias-label-secondary: #4c566a;
  --dsw-alias-label-tertiary: #6b7690;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #3b5b8a;
  --dsw-alias-markdown-code-block: #e5e9f0;
  --dsw-alias-markdown-code-block-banner: #dce2ec;
  --dsw-alias-markdown-inline-code: #e5e9f0;
  --dsw-alias-scrollbar-bg-l1: #c9d1dd;
  --dsw-alias-scrollbar-bg-l2: #c9d1dd;
  --dsw-alias-scrollbar-hover-l1: #b3bdc9;
  --dsw-alias-scrollbar-hover-l2: #b3bdc9;
  --dsw-alias-state-business-primary: #5e81ac;
  --dsw-alias-state-business-tertiary: #e0e8f0;
  --dsw-alias-state-error-primary: #bf616a;
  --dsw-alias-state-success-primary: #a3be8c;
  --dsw-alias-state-success-tertiary: #eaf0e2;
  --dsw-alias-state-warn-primary: #d08770;
  --dsw-alias-state-warn-tertiary: #f6ece4;
  --dsw-alias-toast-bg: #434c5e;
  --dsw-alias-tooltip-bg: #434c5e;
  --dsw-specific-bubble: #e5e9f0;
  --dsw-specific-bubble-highlight: #dce2ec;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #e5e9f0;
  --dsw-specific-sidebar-nav-item-active: #dce2ec;
  --dsw-specific-sidebar-nav-item-active-accent: #c9d1dd;
  --dsw-specific-sidebar-nav-item-hover: #dde3ec;
  --dsw-linear-gradient-think: linear-gradient(180deg, #f4f6f9 20.19%, rgba(244, 246, 249, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #e5e9f0 20.19%, rgba(229, 233, 240, 0) 100%);
}

[data-skin-pack-preview="nord"][data-preview-dark] {
  --dsw-alias-bg-base: #2e3440;
  --dsw-alias-bg-layer-1: #353b4a;
  --dsw-alias-bg-layer-2: #3b4252;
  --dsw-alias-bg-layer-3: #434c5e;
  --dsw-alias-bg-overlay: #4c566a;
  --dsw-alias-bg-module-platform: #3b4252;
  --dsw-alias-bg-multi-select: #353b4a;
  --dsw-alias-bg-skeleton: rgba(216, 222, 233, 0.07);
  --dsw-alias-border-l1: rgba(216, 222, 233, 0.08);
  --dsw-alias-border-l2: rgba(216, 222, 233, 0.15);
  --dsw-alias-border-l3: rgba(216, 222, 233, 0.2);
  --dsw-alias-brand-primary: #eceff4;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #88c0d0;
  --dsw-alias-brand-text: #eceff4;
  --dsw-alias-button-primary-fill: #5e81ac;
  --dsw-alias-button-primary-hover: #81a1c1;
  --dsw-alias-button-primary-dimmed: #434c5e;
  --dsw-alias-button-info-fill: #88c0d0;
  --dsw-alias-button-info-hover: #5e81ac;
  --dsw-alias-button-ghost-active-fill: #434c5e;
  --dsw-alias-button-ghost-active-hover: #4c566a;
  --dsw-alias-interactive-bg-hover: rgba(216, 222, 233, 0.08);
  --dsw-alias-interactive-bg-active: rgba(216, 222, 233, 0.12);
  --dsw-alias-interactive-bg-hover-accent: rgba(216, 222, 233, 0.18);
  --dsw-alias-interactive-bg-hover-solid: #3b4252;
  --dsw-alias-label-primary: #eceff4;
  --dsw-alias-label-secondary: #d8dee9;
  --dsw-alias-label-tertiary: #a8b1c4;
  --dsw-alias-label-primary-foreground: #2e3440;
  --dsw-alias-label-primary-inverted: #3b4252;
  --dsw-alias-label-primary-bluish: #d8dee9;
  --dsw-alias-markdown-code-block: #2a2f3a;
  --dsw-alias-markdown-code-block-banner: #313744;
  --dsw-alias-markdown-inline-code: #353b4a;
  --dsw-alias-scrollbar-bg-l1: #4c566a;
  --dsw-alias-scrollbar-bg-l2: #555f74;
  --dsw-alias-scrollbar-hover-l1: #5a647a;
  --dsw-alias-scrollbar-hover-l2: #636d85;
  --dsw-alias-state-business-primary: #88c0d0;
  --dsw-alias-state-business-tertiary: #3a4a52;
  --dsw-alias-state-error-primary: #bf616a;
  --dsw-alias-state-success-primary: #a3be8c;
  --dsw-alias-state-success-tertiary: #35402e;
  --dsw-alias-state-warn-primary: #d08770;
  --dsw-alias-state-warn-tertiary: #40332a;
  --dsw-alias-toast-bg: #4c566a;
  --dsw-alias-tooltip-bg: #4c566a;
  --dsw-specific-bubble: #3b4252;
  --dsw-specific-bubble-highlight: #434c5e;
  --dsw-specific-input-major: #353b4a;
  --dsw-specific-sidebar-fill: #2a2f3a;
  --dsw-specific-sidebar-nav-item-active: #353b4a;
  --dsw-specific-sidebar-nav-item-active-accent: #434c5e;
  --dsw-specific-sidebar-nav-item-hover: #313744;
  --dsw-linear-gradient-think: linear-gradient(180deg, #353b4a 20.19%, rgba(53, 59, 74, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #3b4252 20.19%, rgba(59, 66, 82, 0) 100%);
}

/* ---------- sepia · 暖纸：米黄暖调 ---------- */
[data-skin-pack-preview="sepia"] {
  --dsw-alias-bg-base: #faf6ee;
  --dsw-alias-bg-layer-1: #fdfaf3;
  --dsw-alias-bg-layer-2: #faf6ee;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #f5efe2;
  --dsw-alias-bg-multi-select: #f5efe2;
  --dsw-alias-bg-skeleton: rgba(120, 90, 50, 0.06);
  --dsw-alias-border-l1: rgba(120, 90, 50, 0.1);
  --dsw-alias-border-l2: rgba(120, 90, 50, 0.16);
  --dsw-alias-border-l3: rgba(120, 90, 50, 0.22);
  --dsw-alias-brand-primary: #3d2f1c;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #a06a2a;
  --dsw-alias-brand-text: #3d2f1c;
  --dsw-alias-button-primary-fill: #a06a2a;
  --dsw-alias-button-primary-hover: #8a5a22;
  --dsw-alias-button-primary-dimmed: #f2e8d4;
  --dsw-alias-button-info-fill: #c07f3a;
  --dsw-alias-button-info-hover: #a06a2a;
  --dsw-alias-button-ghost-active-fill: #f2e8d4;
  --dsw-alias-button-ghost-active-hover: #eadcc2;
  --dsw-alias-interactive-bg-hover: rgba(90, 60, 20, 0.07);
  --dsw-alias-interactive-bg-active: rgba(90, 60, 20, 0.11);
  --dsw-alias-interactive-bg-hover-accent: rgba(90, 60, 20, 0.15);
  --dsw-alias-interactive-bg-hover-solid: #f5efe2;
  --dsw-alias-label-primary: #3d2f1c;
  --dsw-alias-label-secondary: #5f4c2e;
  --dsw-alias-label-tertiary: #8a7350;
  --dsw-alias-label-primary-foreground: #fffdf7;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #7a5a2a;
  --dsw-alias-markdown-code-block: #f5efe2;
  --dsw-alias-markdown-code-block-banner: #efe5d1;
  --dsw-alias-markdown-inline-code: #f2e8d4;
  --dsw-alias-scrollbar-bg-l1: #e0d3b8;
  --dsw-alias-scrollbar-bg-l2: #e0d3b8;
  --dsw-alias-scrollbar-hover-l1: #cdbc9b;
  --dsw-alias-scrollbar-hover-l2: #cdbc9b;
  --dsw-alias-state-business-primary: #a06a2a;
  --dsw-alias-state-business-tertiary: #f0e4cd;
  --dsw-alias-state-error-primary: #b4543c;
  --dsw-alias-state-success-primary: #6f8f4f;
  --dsw-alias-state-success-tertiary: #e8efdd;
  --dsw-alias-state-warn-primary: #c07f3a;
  --dsw-alias-state-warn-tertiary: #f6e7d3;
  --dsw-alias-toast-bg: #4a3a22;
  --dsw-alias-tooltip-bg: #4a3a22;
  --dsw-specific-bubble: #f2e8d4;
  --dsw-specific-bubble-highlight: #eadcc2;
  --dsw-specific-input-major: #fffdf7;
  --dsw-specific-sidebar-fill: #f5efe2;
  --dsw-specific-sidebar-nav-item-active: #f2e8d4;
  --dsw-specific-sidebar-nav-item-active-accent: #e6d7b8;
  --dsw-specific-sidebar-nav-item-hover: #efe5d1;
  --dsw-linear-gradient-think: linear-gradient(180deg, #fdfaf3 20.19%, rgba(253, 250, 243, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #f5efe2 20.19%, rgba(245, 239, 226, 0) 100%);
}

[data-skin-pack-preview="sepia"][data-preview-dark] {
  --dsw-alias-bg-base: #2a241c;
  --dsw-alias-bg-layer-1: #332b21;
  --dsw-alias-bg-layer-2: #3b3226;
  --dsw-alias-bg-layer-3: #44392c;
  --dsw-alias-bg-overlay: #4d4233;
  --dsw-alias-bg-module-platform: #3b3226;
  --dsw-alias-bg-multi-select: #332b21;
  --dsw-alias-bg-skeleton: rgba(255, 240, 214, 0.07);
  --dsw-alias-border-l1: rgba(255, 240, 214, 0.08);
  --dsw-alias-border-l2: rgba(255, 240, 214, 0.14);
  --dsw-alias-border-l3: rgba(255, 240, 214, 0.2);
  --dsw-alias-brand-primary: #f5ecd9;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #d8a05f;
  --dsw-alias-brand-text: #f5ecd9;
  --dsw-alias-button-primary-fill: #c07f3a;
  --dsw-alias-button-primary-hover: #d8a05f;
  --dsw-alias-button-primary-dimmed: #4d4233;
  --dsw-alias-button-info-fill: #d8a05f;
  --dsw-alias-button-info-hover: #c07f3a;
  --dsw-alias-button-ghost-active-fill: #4d4233;
  --dsw-alias-button-ghost-active-hover: #574b3b;
  --dsw-alias-interactive-bg-hover: rgba(255, 240, 214, 0.08);
  --dsw-alias-interactive-bg-active: rgba(255, 240, 214, 0.12);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 240, 214, 0.18);
  --dsw-alias-interactive-bg-hover-solid: #3b3226;
  --dsw-alias-label-primary: #f5ecd9;
  --dsw-alias-label-secondary: #d8c9ab;
  --dsw-alias-label-tertiary: #b09d7f;
  --dsw-alias-label-primary-foreground: #2a241c;
  --dsw-alias-label-primary-inverted: #3b3226;
  --dsw-alias-label-primary-bluish: #f5ecd9;
  --dsw-alias-markdown-code-block: #262017;
  --dsw-alias-markdown-code-block-banner: #2f281e;
  --dsw-alias-markdown-inline-code: #332b21;
  --dsw-alias-scrollbar-bg-l1: #4d4233;
  --dsw-alias-scrollbar-bg-l2: #584c3c;
  --dsw-alias-scrollbar-hover-l1: #5f5242;
  --dsw-alias-scrollbar-hover-l2: #6b5d4a;
  --dsw-alias-state-business-primary: #d8a05f;
  --dsw-alias-state-business-tertiary: #4a3d2a;
  --dsw-alias-state-error-primary: #e08a72;
  --dsw-alias-state-success-primary: #a8c088;
  --dsw-alias-state-success-tertiary: #3a4028;
  --dsw-alias-state-warn-primary: #e0a868;
  --dsw-alias-state-warn-tertiary: #45351f;
  --dsw-alias-toast-bg: #4d4233;
  --dsw-alias-tooltip-bg: #4d4233;
  --dsw-specific-bubble: #3b3226;
  --dsw-specific-bubble-highlight: #44392c;
  --dsw-specific-input-major: #332b21;
  --dsw-specific-sidebar-fill: #262017;
  --dsw-specific-sidebar-nav-item-active: #332b21;
  --dsw-specific-sidebar-nav-item-active-accent: #44392c;
  --dsw-specific-sidebar-nav-item-hover: #2f281e;
  --dsw-linear-gradient-think: linear-gradient(180deg, #332b21 20.19%, rgba(51, 43, 33, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #3b3226 20.19%, rgba(59, 50, 38, 0) 100%);
}

/* ---------- violet · 紫罗兰：紫调个性 ---------- */
[data-skin-pack-preview="violet"] {
  --dsw-alias-bg-base: #faf8ff;
  --dsw-alias-bg-layer-1: #fefdff;
  --dsw-alias-bg-layer-2: #faf8ff;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #f3effd;
  --dsw-alias-bg-multi-select: #f3effd;
  --dsw-alias-bg-skeleton: rgba(76, 29, 149, 0.05);
  --dsw-alias-border-l1: rgba(76, 29, 149, 0.08);
  --dsw-alias-border-l2: rgba(76, 29, 149, 0.14);
  --dsw-alias-border-l3: rgba(76, 29, 149, 0.18);
  --dsw-alias-brand-primary: #2e1065;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #7c5cd6;
  --dsw-alias-brand-text: #2e1065;
  --dsw-alias-button-primary-fill: #7c5cd6;
  --dsw-alias-button-primary-hover: #6d4fc4;
  --dsw-alias-button-primary-dimmed: #efe9fc;
  --dsw-alias-button-info-fill: #8b5cf6;
  --dsw-alias-button-info-hover: #7c5cd6;
  --dsw-alias-button-ghost-active-fill: #efe9fc;
  --dsw-alias-button-ghost-active-hover: #e4dcf9;
  --dsw-alias-interactive-bg-hover: rgba(91, 33, 182, 0.07);
  --dsw-alias-interactive-bg-active: rgba(91, 33, 182, 0.11);
  --dsw-alias-interactive-bg-hover-accent: rgba(91, 33, 182, 0.15);
  --dsw-alias-interactive-bg-hover-solid: #f3effd;
  --dsw-alias-label-primary: #2e1065;
  --dsw-alias-label-secondary: #4c3a7a;
  --dsw-alias-label-tertiary: #7c6aa8;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #5b21b6;
  --dsw-alias-markdown-code-block: #f3effd;
  --dsw-alias-markdown-code-block-banner: #ece4fb;
  --dsw-alias-markdown-inline-code: #efe9fc;
  --dsw-alias-scrollbar-bg-l1: #ddd2f4;
  --dsw-alias-scrollbar-bg-l2: #ddd2f4;
  --dsw-alias-scrollbar-hover-l1: #c9b8ec;
  --dsw-alias-scrollbar-hover-l2: #c9b8ec;
  --dsw-alias-state-business-primary: #7c5cd6;
  --dsw-alias-state-business-tertiary: #ece4fb;
  --dsw-alias-state-error-primary: #d64545;
  --dsw-alias-state-success-primary: #2f9e6e;
  --dsw-alias-state-success-tertiary: #e0f2ea;
  --dsw-alias-state-warn-primary: #d97706;
  --dsw-alias-state-warn-tertiary: #fdeeda;
  --dsw-alias-toast-bg: #3b2a63;
  --dsw-alias-tooltip-bg: #3b2a63;
  --dsw-specific-bubble: #efe9fc;
  --dsw-specific-bubble-highlight: #e4dcf9;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #f3effd;
  --dsw-specific-sidebar-nav-item-active: #efe9fc;
  --dsw-specific-sidebar-nav-item-active-accent: #e0d6f8;
  --dsw-specific-sidebar-nav-item-hover: #eae2fa;
  --dsw-linear-gradient-think: linear-gradient(180deg, #fefdff 20.19%, rgba(254, 253, 255, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #f3effd 20.19%, rgba(243, 239, 253, 0) 100%);
}

[data-skin-pack-preview="violet"][data-preview-dark] {
  --dsw-alias-bg-base: #17122b;
  --dsw-alias-bg-layer-1: #1d1636;
  --dsw-alias-bg-layer-2: #241b41;
  --dsw-alias-bg-layer-3: #2b214d;
  --dsw-alias-bg-overlay: #33275c;
  --dsw-alias-bg-module-platform: #241b41;
  --dsw-alias-bg-multi-select: #1d1636;
  --dsw-alias-bg-skeleton: rgba(230, 220, 255, 0.08);
  --dsw-alias-border-l1: rgba(230, 220, 255, 0.08);
  --dsw-alias-border-l2: rgba(230, 220, 255, 0.15);
  --dsw-alias-border-l3: rgba(230, 220, 255, 0.2);
  --dsw-alias-brand-primary: #f3eeff;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #a78bfa;
  --dsw-alias-brand-text: #f3eeff;
  --dsw-alias-button-primary-fill: #8b5cf6;
  --dsw-alias-button-primary-hover: #a78bfa;
  --dsw-alias-button-primary-dimmed: #33275c;
  --dsw-alias-button-info-fill: #a78bfa;
  --dsw-alias-button-info-hover: #8b5cf6;
  --dsw-alias-button-ghost-active-fill: #33275c;
  --dsw-alias-button-ghost-active-hover: #3b2e6a;
  --dsw-alias-interactive-bg-hover: rgba(230, 220, 255, 0.08);
  --dsw-alias-interactive-bg-active: rgba(230, 220, 255, 0.13);
  --dsw-alias-interactive-bg-hover-accent: rgba(230, 220, 255, 0.19);
  --dsw-alias-interactive-bg-hover-solid: #241b41;
  --dsw-alias-label-primary: #f3eeff;
  --dsw-alias-label-secondary: #cfc3f2;
  --dsw-alias-label-tertiary: #a395d6;
  --dsw-alias-label-primary-foreground: #17122b;
  --dsw-alias-label-primary-inverted: #241b41;
  --dsw-alias-label-primary-bluish: #ddd2f4;
  --dsw-alias-markdown-code-block: #141021;
  --dsw-alias-markdown-code-block-banner: #1a1530;
  --dsw-alias-markdown-inline-code: #1d1636;
  --dsw-alias-scrollbar-bg-l1: #33275c;
  --dsw-alias-scrollbar-bg-l2: #3d2f6d;
  --dsw-alias-scrollbar-hover-l1: #423377;
  --dsw-alias-scrollbar-hover-l2: #4d3c88;
  --dsw-alias-state-business-primary: #a78bfa;
  --dsw-alias-state-business-tertiary: #2e2452;
  --dsw-alias-state-error-primary: #f0898e;
  --dsw-alias-state-success-primary: #6fd4a4;
  --dsw-alias-state-success-tertiary: #1c3a2e;
  --dsw-alias-state-warn-primary: #f0b45a;
  --dsw-alias-state-warn-tertiary: #3d3015;
  --dsw-alias-toast-bg: #33275c;
  --dsw-alias-tooltip-bg: #33275c;
  --dsw-specific-bubble: #241b41;
  --dsw-specific-bubble-highlight: #2b214d;
  --dsw-specific-input-major: #1d1636;
  --dsw-specific-sidebar-fill: #141021;
  --dsw-specific-sidebar-nav-item-active: #1d1636;
  --dsw-specific-sidebar-nav-item-active-accent: #2b214d;
  --dsw-specific-sidebar-nav-item-hover: #1a1530;
  --dsw-linear-gradient-think: linear-gradient(180deg, #1d1636 20.19%, rgba(29, 22, 54, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #241b41 20.19%, rgba(36, 27, 65, 0) 100%);
}

/* ---------- cartoon · 卡通：奶油底、高饱和、童趣 ---------- */
[data-skin-pack-preview="cartoon"] {
  --dsw-alias-bg-base: #fff7e0;
  --dsw-alias-bg-layer-1: #fffbe9;
  --dsw-alias-bg-layer-2: #fff7e0;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #ffeec4;
  --dsw-alias-bg-multi-select: #ffeec4;
  --dsw-alias-bg-skeleton: rgba(120, 60, 20, 0.07);
  --dsw-alias-border-l1: rgba(120, 60, 20, 0.12);
  --dsw-alias-border-l2: rgba(120, 60, 20, 0.2);
  --dsw-alias-border-l3: rgba(120, 60, 20, 0.26);
  --dsw-alias-brand-primary: #3a2d20;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff6b4a;
  --dsw-alias-brand-text: #3a2d20;
  --dsw-alias-button-primary-fill: #ff6b4a;
  --dsw-alias-button-primary-hover: #e85a3c;
  --dsw-alias-button-primary-dimmed: #ffe6dd;
  --dsw-alias-button-info-fill: #3ba7ff;
  --dsw-alias-button-info-hover: #6dbfff;
  --dsw-alias-button-ghost-active-fill: #ffe6dd;
  --dsw-alias-button-ghost-active-hover: #ffd9cc;
  --dsw-alias-interactive-bg-hover: rgba(255, 107, 74, 0.1);
  --dsw-alias-interactive-bg-active: rgba(255, 107, 74, 0.16);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 107, 74, 0.2);
  --dsw-alias-interactive-bg-hover-solid: #ffeec4;
  --dsw-alias-label-primary: #3a2d20;
  --dsw-alias-label-secondary: #6b5745;
  --dsw-alias-label-tertiary: #9c8366;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #2a6db0;
  --dsw-alias-markdown-code-block: #ffeec4;
  --dsw-alias-markdown-code-block-banner: #ffe4ad;
  --dsw-alias-markdown-inline-code: #ffe6dd;
  --dsw-alias-scrollbar-bg-l1: #f0d49e;
  --dsw-alias-scrollbar-bg-l2: #f0d49e;
  --dsw-alias-scrollbar-hover-l1: #e2bf80;
  --dsw-alias-scrollbar-hover-l2: #e2bf80;
  --dsw-alias-state-business-primary: #ff6b4a;
  --dsw-alias-state-business-tertiary: #ffe6dd;
  --dsw-alias-state-error-primary: #ff5252;
  --dsw-alias-state-success-primary: #51cf66;
  --dsw-alias-state-success-tertiary: #e3f7e6;
  --dsw-alias-state-warn-primary: #ffb020;
  --dsw-alias-state-warn-tertiary: #fff0cc;
  --dsw-alias-toast-bg: #4a3826;
  --dsw-alias-tooltip-bg: #4a3826;
  --dsw-specific-bubble: #ffe6dd;
  --dsw-specific-bubble-highlight: #ffd9cc;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #ffeec4;
  --dsw-specific-sidebar-nav-item-active: #ffe6dd;
  --dsw-specific-sidebar-nav-item-active-accent: #ffd9cc;
  --dsw-specific-sidebar-nav-item-hover: #ffe9d2;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(120, 60, 20, 0.1), 0 2px 8px 0 rgba(120, 60, 20, 0.06);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(120, 60, 20, 0.18), 0 0 4px 0 rgba(120, 60, 20, 0.06), 0 12px 32px 0 rgba(120, 60, 20, 0.14);
  --dsw-linear-gradient-think: linear-gradient(180deg, #fffbe9 20.19%, rgba(255, 251, 233, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #ffeec4 20.19%, rgba(255, 238, 196, 0) 100%);
}

[data-skin-pack-preview="cartoon"][data-preview-dark] {
  --dsw-alias-bg-base: #1f1e2e;
  --dsw-alias-bg-layer-1: #26243a;
  --dsw-alias-bg-layer-2: #2d2a45;
  --dsw-alias-bg-layer-3: #353150;
  --dsw-alias-bg-overlay: #3d3859;
  --dsw-alias-bg-module-platform: #2d2a45;
  --dsw-alias-bg-multi-select: #26243a;
  --dsw-alias-bg-skeleton: rgba(255, 240, 200, 0.08);
  --dsw-alias-border-l1: rgba(255, 240, 200, 0.09);
  --dsw-alias-border-l2: rgba(255, 240, 200, 0.17);
  --dsw-alias-border-l3: rgba(255, 240, 200, 0.24);
  --dsw-alias-brand-primary: #fff6e6;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff8a6a;
  --dsw-alias-brand-text: #fff6e6;
  --dsw-alias-button-primary-fill: #ff6b4a;
  --dsw-alias-button-primary-hover: #ff8a6a;
  --dsw-alias-button-primary-dimmed: #3d3859;
  --dsw-alias-button-info-fill: #66d9e8;
  --dsw-alias-button-info-hover: #8ae4ef;
  --dsw-alias-button-ghost-active-fill: #3d3859;
  --dsw-alias-button-ghost-active-hover: #463f66;
  --dsw-alias-interactive-bg-hover: rgba(255, 240, 200, 0.09);
  --dsw-alias-interactive-bg-active: rgba(255, 240, 200, 0.14);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 240, 200, 0.2);
  --dsw-alias-interactive-bg-hover-solid: #2d2a45;
  --dsw-alias-label-primary: #fff6e6;
  --dsw-alias-label-secondary: #d8cdb4;
  --dsw-alias-label-tertiary: #ab9f85;
  --dsw-alias-label-primary-foreground: #1f1e2e;
  --dsw-alias-label-primary-inverted: #2d2a45;
  --dsw-alias-label-primary-bluish: #c9e6ff;
  --dsw-alias-markdown-code-block: #1a1926;
  --dsw-alias-markdown-code-block-banner: #211f30;
  --dsw-alias-markdown-inline-code: #26243a;
  --dsw-alias-scrollbar-bg-l1: #3d3859;
  --dsw-alias-scrollbar-bg-l2: #47416b;
  --dsw-alias-scrollbar-hover-l1: #4d4675;
  --dsw-alias-scrollbar-hover-l2: #595086;
  --dsw-alias-state-business-primary: #ff8a6a;
  --dsw-alias-state-business-tertiary: #462f26;
  --dsw-alias-state-error-primary: #ff7070;
  --dsw-alias-state-success-primary: #5fdd7f;
  --dsw-alias-state-success-tertiary: #223a26;
  --dsw-alias-state-warn-primary: #ffc145;
  --dsw-alias-state-warn-tertiary: #403414;
  --dsw-alias-toast-bg: #3d3859;
  --dsw-alias-tooltip-bg: #3d3859;
  --dsw-specific-bubble: #2d2a45;
  --dsw-specific-bubble-highlight: #353150;
  --dsw-specific-input-major: #26243a;
  --dsw-specific-sidebar-fill: #1a1926;
  --dsw-specific-sidebar-nav-item-active: #26243a;
  --dsw-specific-sidebar-nav-item-active-accent: #353150;
  --dsw-specific-sidebar-nav-item-hover: #211f30;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(0, 0, 0, 0.3), 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(0, 0, 0, 0.45), 0 0 4px 0 rgba(0, 0, 0, 0.18), 0 12px 32px 0 rgba(0, 0, 0, 0.35);
  --dsw-linear-gradient-think: linear-gradient(180deg, #26243a 20.19%, rgba(38, 36, 58, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #2d2a45 20.19%, rgba(45, 42, 69, 0) 100%);
}

/* ---------- cute · 可爱：粉嫩软萌、低对比 ---------- */
[data-skin-pack-preview="cute"] {
  --dsw-alias-bg-base: #fff5f8;
  --dsw-alias-bg-layer-1: #fffafc;
  --dsw-alias-bg-layer-2: #fff5f8;
  --dsw-alias-bg-layer-3: #ffffff;
  --dsw-alias-bg-overlay: #ffffff;
  --dsw-alias-bg-module-platform: #ffeef4;
  --dsw-alias-bg-multi-select: #ffeef4;
  --dsw-alias-bg-skeleton: rgba(180, 70, 120, 0.06);
  --dsw-alias-border-l1: rgba(180, 70, 120, 0.1);
  --dsw-alias-border-l2: rgba(180, 70, 120, 0.16);
  --dsw-alias-border-l3: rgba(180, 70, 120, 0.22);
  --dsw-alias-brand-primary: #4a2b3a;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #e56a8f;
  --dsw-alias-brand-text: #4a2b3a;
  --dsw-alias-button-primary-fill: #e56a8f;
  --dsw-alias-button-primary-hover: #d95a80;
  --dsw-alias-button-primary-dimmed: #ffe4ee;
  --dsw-alias-button-info-fill: #8aa7ff;
  --dsw-alias-button-info-hover: #a9c0ff;
  --dsw-alias-button-ghost-active-fill: #ffe4ee;
  --dsw-alias-button-ghost-active-hover: #ffd9e6;
  --dsw-alias-interactive-bg-hover: rgba(229, 106, 143, 0.09);
  --dsw-alias-interactive-bg-active: rgba(229, 106, 143, 0.14);
  --dsw-alias-interactive-bg-hover-accent: rgba(229, 106, 143, 0.18);
  --dsw-alias-interactive-bg-hover-solid: #ffeef4;
  --dsw-alias-label-primary: #4a2b3a;
  --dsw-alias-label-secondary: #7d5468;
  --dsw-alias-label-tertiary: #a87d92;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-label-primary-inverted: #ffffff;
  --dsw-alias-label-primary-bluish: #4a5fb0;
  --dsw-alias-markdown-code-block: #ffeef4;
  --dsw-alias-markdown-code-block-banner: #ffe4ee;
  --dsw-alias-markdown-inline-code: #ffe4ee;
  --dsw-alias-scrollbar-bg-l1: #f3cddb;
  --dsw-alias-scrollbar-bg-l2: #f3cddb;
  --dsw-alias-scrollbar-hover-l1: #e9b3c8;
  --dsw-alias-scrollbar-hover-l2: #e9b3c8;
  --dsw-alias-state-business-primary: #e56a8f;
  --dsw-alias-state-business-tertiary: #ffe4ee;
  --dsw-alias-state-error-primary: #e5486e;
  --dsw-alias-state-success-primary: #5fbf8f;
  --dsw-alias-state-success-tertiary: #e2f5ec;
  --dsw-alias-state-warn-primary: #e8a13c;
  --dsw-alias-state-warn-tertiary: #fbf0dc;
  --dsw-alias-toast-bg: #5a3348;
  --dsw-alias-tooltip-bg: #5a3348;
  --dsw-specific-bubble: #ffe4ee;
  --dsw-specific-bubble-highlight: #ffd9e6;
  --dsw-specific-input-major: #ffffff;
  --dsw-specific-sidebar-fill: #ffeef4;
  --dsw-specific-sidebar-nav-item-active: #ffe4ee;
  --dsw-specific-sidebar-nav-item-active-accent: #ffd9e6;
  --dsw-specific-sidebar-nav-item-hover: #ffe9f1;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(180, 70, 120, 0.08), 0 2px 8px 0 rgba(180, 70, 120, 0.05);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(180, 70, 120, 0.14), 0 0 4px 0 rgba(180, 70, 120, 0.04), 0 12px 32px 0 rgba(180, 70, 120, 0.1);
  --dsw-linear-gradient-think: linear-gradient(180deg, #fffafc 20.19%, rgba(255, 250, 252, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #ffeef4 20.19%, rgba(255, 238, 244, 0) 100%);
}

[data-skin-pack-preview="cute"][data-preview-dark] {
  --dsw-alias-bg-base: #231823;
  --dsw-alias-bg-layer-1: #2b1e2b;
  --dsw-alias-bg-layer-2: #332434;
  --dsw-alias-bg-layer-3: #3b2b3d;
  --dsw-alias-bg-overlay: #433147;
  --dsw-alias-bg-module-platform: #332434;
  --dsw-alias-bg-multi-select: #2b1e2b;
  --dsw-alias-bg-skeleton: rgba(255, 220, 235, 0.07);
  --dsw-alias-border-l1: rgba(255, 220, 235, 0.08);
  --dsw-alias-border-l2: rgba(255, 220, 235, 0.15);
  --dsw-alias-border-l3: rgba(255, 220, 235, 0.21);
  --dsw-alias-brand-primary: #fdeef4;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #ff9ec2;
  --dsw-alias-brand-text: #fdeef4;
  --dsw-alias-button-primary-fill: #e56a8f;
  --dsw-alias-button-primary-hover: #ff9ec2;
  --dsw-alias-button-primary-dimmed: #433147;
  --dsw-alias-button-info-fill: #a9c0ff;
  --dsw-alias-button-info-hover: #8aa7ff;
  --dsw-alias-button-ghost-active-fill: #433147;
  --dsw-alias-button-ghost-active-hover: #4d3852;
  --dsw-alias-interactive-bg-hover: rgba(255, 220, 235, 0.08);
  --dsw-alias-interactive-bg-active: rgba(255, 220, 235, 0.13);
  --dsw-alias-interactive-bg-hover-accent: rgba(255, 220, 235, 0.19);
  --dsw-alias-interactive-bg-hover-solid: #332434;
  --dsw-alias-label-primary: #fdeef4;
  --dsw-alias-label-secondary: #ddb8c8;
  --dsw-alias-label-tertiary: #b58ea2;
  --dsw-alias-label-primary-foreground: #231823;
  --dsw-alias-label-primary-inverted: #332434;
  --dsw-alias-label-primary-bluish: #d8e0ff;
  --dsw-alias-markdown-code-block: #1e141e;
  --dsw-alias-markdown-code-block-banner: #261a26;
  --dsw-alias-markdown-inline-code: #2b1e2b;
  --dsw-alias-scrollbar-bg-l1: #433147;
  --dsw-alias-scrollbar-bg-l2: #4d3852;
  --dsw-alias-scrollbar-hover-l1: #543d59;
  --dsw-alias-scrollbar-hover-l2: #5f4565;
  --dsw-alias-state-business-primary: #ff9ec2;
  --dsw-alias-state-business-tertiary: #46293a;
  --dsw-alias-state-error-primary: #ff8aa5;
  --dsw-alias-state-success-primary: #8fe0b8;
  --dsw-alias-state-success-tertiary: #223a2e;
  --dsw-alias-state-warn-primary: #f0b45a;
  --dsw-alias-state-warn-tertiary: #403414;
  --dsw-alias-toast-bg: #433147;
  --dsw-alias-tooltip-bg: #433147;
  --dsw-specific-bubble: #332434;
  --dsw-specific-bubble-highlight: #3b2b3d;
  --dsw-specific-input-major: #2b1e2b;
  --dsw-specific-sidebar-fill: #1e141e;
  --dsw-specific-sidebar-nav-item-active: #2b1e2b;
  --dsw-specific-sidebar-nav-item-active-accent: #3b2b3d;
  --dsw-specific-sidebar-nav-item-hover: #261a26;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(0, 0, 0, 0.28), 0 2px 8px 0 rgba(0, 0, 0, 0.18);
  --dsw-shadow-lv3:
    0 0 1px 0 rgba(0, 0, 0, 0.42), 0 0 4px 0 rgba(0, 0, 0, 0.16), 0 12px 32px 0 rgba(0, 0, 0, 0.32);
  --dsw-linear-gradient-think: linear-gradient(180deg, #2b1e2b 20.19%, rgba(43, 30, 43, 0) 100%);
  --dsw-linear-think-select: linear-gradient(180deg, #332434 20.19%, rgba(51, 36, 52, 0) 100%);
}
`;
		injectCss("dsh-skin-pack/skins.css", skinsBodyCss);
		injectCss("dsh-skin-pack/preview.css", skinsScopedCss);
		//#endregion
		//#region panel component styles
		const panelCss = [
			".spk-group{display:flex;flex-direction:column;gap:10px;padding:16px 0;border-bottom:1px solid var(--dsw-alias-border-l2)}",
			".spk-title{color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}",
			".spk-sub{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}",
			".spk-cubes{display:flex;flex-wrap:wrap;gap:8px}",
			".spk-cube{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:16px;flex-direction:column;flex:140px;justify-content:center;align-items:center;gap:6px;padding:14px 12px;font-size:13px;line-height:20px;display:flex}",
			".spk-cube:hover:not(.spk-on):not(.spk-off){background:var(--dsw-alias-interactive-bg-hover)}",
			".spk-cube.spk-on{background:var(--dsw-alias-bg-module-platform);border-color:var(--dsw-static-neutral-bluish-400)}",
			".spk-cube.spk-off{opacity:.55;cursor:not-allowed}",
			".spk-cube.spk-off:hover{background:0 0}",
			".spk-swatches{display:flex;gap:4px}",
			".spk-swatch{box-sizing:border-box;width:16px;height:16px;border-radius:50%;border:1px solid rgba(0,0,0,.14);display:inline-block}",
			".spk-name{color:var(--dsw-alias-label-primary)}",
			".spk-badge{font-size:11px;line-height:16px;padding:0 6px;border-radius:8px;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-tertiary)}",
			".spk-badge-on{font-size:11px;line-height:16px;padding:0 6px;border-radius:8px;background:var(--dsw-alias-state-success-tertiary);color:var(--dsw-alias-state-success-primary)}",
			".spk-badge-prev{font-size:11px;line-height:16px;padding:0 6px;border-radius:8px;background:var(--dsw-alias-state-business-tertiary);color:var(--dsw-alias-state-business-primary)}",
			".spk-bar{display:flex;align-items:center;gap:10px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:12px;padding:10px 12px}",
			".spk-bar-text{color:var(--dsw-alias-label-secondary);font-size:13px;flex:1}",
			".spk-btn{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-elevated-fill);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 14px;font:inherit;cursor:pointer}",
			".spk-btn-primary{border:0;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);border-radius:8px;padding:5px 14px;font:inherit;cursor:pointer}",
			".spk-zoom{font-size:12px;line-height:18px;padding:3px 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:0 0;color:var(--dsw-alias-label-secondary);cursor:pointer;align-self:flex-start}",
			".spk-overlay{position:fixed;inset:0;background:var(--dsw-alias-bg-mask-2);display:flex;align-items:center;justify-content:center;z-index:1000}",
			".spk-modal{width:min(720px,92vw);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l3);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}",
			".spk-modal-head{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--dsw-alias-border-l2)}",
			".spk-modal-name{color:var(--dsw-alias-label-tertiary);font-size:13px}",
			".spk-modal-close{margin-left:auto;border:0;background:0 0;color:var(--dsw-alias-label-secondary);font-size:16px;cursor:pointer;padding:2px 8px}",
			".spk-modal-toolbar{display:flex;justify-content:flex-end;padding:10px 16px;gap:8px}",
			".spk-frame{height:340px;border-radius:12px;overflow:hidden;margin:0 16px 16px}",
			// mini UI mock (token-driven; resolves inside the preview frame scope)
			".mu{display:flex;height:100%;width:100%;font:13px/1.6 -apple-system,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif}",
			".mu-side{width:130px;background:var(--dsw-specific-sidebar-fill);border-right:1px solid var(--dsw-alias-border-l2);padding:10px;display:flex;flex-direction:column;gap:6px;flex:none}",
			".mu-brand{font-weight:700;color:var(--dsw-alias-label-primary);letter-spacing:.06em}",
			".mu-nav{padding:5px 9px;border-radius:7px;color:var(--dsw-alias-label-secondary);background:var(--dsw-specific-sidebar-nav-item-hover)}",
			".mu-nav.mu-on{background:var(--dsw-specific-sidebar-nav-item-active);color:var(--dsw-alias-label-primary);font-weight:600}",
			".mu-main{flex:1;display:flex;flex-direction:column;gap:8px;padding:12px;background:var(--dsw-alias-bg-base)}",
			".mu-bubble{max-width:78%;padding:8px 12px;border-radius:12px}",
			".mu-bot{align-self:flex-start;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary)}",
			".mu-user{align-self:flex-end;background:var(--dsw-specific-bubble);color:var(--dsw-alias-label-primary)}",
			".mu-code{background:var(--dsw-alias-markdown-inline-code);padding:1px 5px;border-radius:4px;font-family:Consolas,'SF Mono',monospace}",
			".mu-composer{margin-top:auto;display:flex;align-items:center;gap:8px;background:var(--dsw-specific-input-major);border:1px solid var(--dsw-alias-border-l2);border-radius:11px;padding:8px 10px}",
			".mu-input{flex:1;color:var(--dsw-alias-label-tertiary)}",
			".mu-send{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);padding:4px 12px;border-radius:8px;font-weight:600}"
		].join("");
		injectCss("dsh-skin-pack/panel.css", panelCss);
		//#endregion
		//#region data
		/** Settings namespace owned by this plugin (persisted skin choice). */
		const SKIN_PACK_NS = "skin-pack";
		/** Locale dictionary namespace for the settings row. */
		const SKIN_PACK_SETTINGS_NS = "settings.skinPack";
		/** Skin catalog: palette swatches (bg, primary, accent); `custom` is a reserved slot. */
		const SKINS = [
			{ id: "deepseek", labelKey: "skin.deepseek", swatches: ["#ffffff", "#4176e6", "#4176e6"] },
			{ id: "midnight", labelKey: "skin.midnight", swatches: ["#f4f6fa", "#2563eb", "#3b6fd4"] },
			{ id: "nord", labelKey: "skin.nord", swatches: ["#eceff4", "#5e81ac", "#88c0d0"] },
			{ id: "sepia", labelKey: "skin.sepia", swatches: ["#faf6ee", "#a06a2a", "#c07f3a"] },
			{ id: "violet", labelKey: "skin.violet", swatches: ["#faf8ff", "#7c5cd6", "#8b5cf6"] },
			{ id: "cartoon", labelKey: "skin.cartoon", swatches: ["#fff7e0", "#ff6b4a", "#3ba7ff"] },
			{ id: "cute", labelKey: "skin.cute", swatches: ["#fff5f8", "#e56a8f", "#8aa7ff"] },
			{ id: "custom", labelKey: "skin.custom", swatches: ["#f2f2f2", "#c4c4c4", "#8f8f8f"], planned: true }
		];
		/** Default skin id (no sheet; the app's base palette is the default look). */
		const DEFAULT_SKIN = "deepseek";
		/** Apply one skin id to the document; deepseek/custom render the default palette. */
		function applySkinAttribute(id) {
			if (typeof document === "undefined") return;
			const body = document.body;
			if (id !== void 0 && id !== "deepseek" && id !== "custom") body.setAttribute("data-skin-pack", id);
			else body.removeAttribute("data-skin-pack");
		}
		//#endregion
		//#region store
		/**
		* Skin-pack row store. Mutators own the DOM write (applySkinAttribute) —
		* the framework bakes each action against the live instance, so the
		* attribute follows exactly the state the component sees.
		*/
		function createSkinPackStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					skin: DEFAULT_SKIN,
					preview: null,
					zoom: false,
					zoomDark: false,
					revision: -1
				}),
				actions: {
					sync: (d, skin, revision) => {
						if (revision <= d.revision) return;
						d.skin = skin;
						d.revision = revision;
						if (d.preview === null) applySkinAttribute(skin);
					},
					preview: (d, id) => {
						d.preview = id;
						applySkinAttribute(id);
					},
					commit: (d) => {
						if (d.preview === null) return;
						d.skin = d.preview;
						d.preview = null;
						applySkinAttribute(d.skin);
					},
					rollback: (d) => {
						d.preview = null;
						applySkinAttribute(d.skin);
					},
					zoom: (d, value) => {
						d.zoom = value;
					},
					zoomDark: (d, value) => {
						d.zoomDark = value;
					}
				}
			});
		}
		//#endregion
		//#region locales
		/** Simplified Chinese dictionary (key-set source of truth). */
		const zh = {
			"panel.title": "皮肤包",
			"panel.subtitle": "点选皮肤即时预览，确认后一键换肤",
			"panel.comingSoon": "开发中",
			"panel.applied": "已应用",
			"panel.previewing": "预览中",
			"panel.apply": "应用此皮肤",
			"panel.cancel": "取消",
			"panel.previewingText": "预览中：",
			"panel.zoom": "放大预览",
			"panel.zoomTitle": "皮肤预览 · ",
			"panel.dark": "深色",
			"panel.light": "浅色",
			"skin.deepseek": "深蓝",
			"skin.midnight": "午夜",
			"skin.nord": "冷杉",
			"skin.sepia": "暖纸",
			"skin.violet": "紫罗兰",
			"skin.cartoon": "卡通",
			"skin.cute": "可爱",
			"skin.custom": "自定义"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"panel.title": "Skin Pack",
			"panel.subtitle": "Pick a skin to preview it live; confirm to apply",
			"panel.comingSoon": "Coming soon",
			"panel.applied": "Applied",
			"panel.previewing": "Previewing",
			"panel.apply": "Apply skin",
			"panel.cancel": "Cancel",
			"panel.previewingText": "Previewing: ",
			"panel.zoom": "Zoom preview",
			"panel.zoomTitle": "Skin preview · ",
			"panel.dark": "Dark",
			"panel.light": "Light",
			"skin.deepseek": "DeepSeek",
			"skin.midnight": "Midnight",
			"skin.nord": "Nord",
			"skin.sepia": "Sepia",
			"skin.violet": "Violet",
			"skin.cartoon": "Cartoon",
			"skin.cute": "Cute",
			"skin.custom": "Custom"
		};
		//#endregion
		//#region component
		/** Mini DSHD mock rendered inside the preview frame (real tokens). */
		function MiniUi() {
			const d = panelCssClasses;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: d.mu,
				children: [(0, react_jsx_runtime.jsx)("aside", {
					className: d.muSide,
					children: [(0, react_jsx_runtime.jsx)("div", {
						className: d.muBrand,
						children: "DSHD"
					}), (0, react_jsx_runtime.jsx)("div", {
						className: d.muNav + " " + d.muOn,
						children: "会话"
					}), (0, react_jsx_runtime.jsx)("div", {
						className: d.muNav,
						children: "设置"
					})]
				}), (0, react_jsx_runtime.jsx)("main", {
					className: d.muMain,
					children: [(0, react_jsx_runtime.jsx)("div", {
						className: d.muBubble + " " + d.muBot,
						children: (0, react_jsx_runtime.jsxs)("span", {
							children: ["给你讲讲这个方案：", (0, react_jsx_runtime.jsx)("code", {
								className: d.muCode,
								children: "const skin = 'cute'"
							})]
						})
					}), (0, react_jsx_runtime.jsx)("div", {
						className: d.muBubble + " " + d.muUser,
						children: "真好看，就它了！"
					}), (0, react_jsx_runtime.jsx)("div", {
						className: d.muComposer,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: d.muInput,
							children: "输入消息…"
						}), (0, react_jsx_runtime.jsx)("span", {
							className: d.muSend,
							children: "发送"
						})]
					})]
				})]
			});
		}
		/**
		* Skin-pack settings row registered into the General section item slot.
		* Click a card to preview live; the footer bar confirms (apply) or
		* rolls back. The zoom button opens a token-rendered preview modal with a
		* light/dark toggle.
		*/
		function SkinPackRow({ t, useStore, actions }) {
			const d = panelCssClasses;
			const state = useStore((s) => s);
			const effective = state.preview !== null ? state.preview : state.skin;
			const skinLabel = (id) => {
				const found = SKINS.find((entry) => entry.id === id);
				return found === void 0 ? id : t(found.labelKey);
			};
			const frameProps = {
				className: d.frame,
				"data-skin-pack-preview": effective
			};
			if (state.zoomDark) frameProps["data-preview-dark"] = "";
			return (0, react_jsx_runtime.jsxs)("div", {
				className: d.group,
				children: [(0, react_jsx_runtime.jsx)("div", {
					className: d.title,
					children: t("panel.title")
				}), (0, react_jsx_runtime.jsx)("div", {
					className: d.sub,
					children: t("panel.subtitle")
				}), (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: d.zoom,
					onClick: () => {
						actions.zoom(true);
					},
					children: t("panel.zoom")
				}), (0, react_jsx_runtime.jsx)("div", {
					className: d.cubes,
					children: SKINS.map(({ id, labelKey, swatches, planned }) => {
						const selected = effective === id;
						const applied = state.preview === null && state.skin === id;
						return (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: planned === true,
							className: clsx(d.cube, selected && d.on, planned === true && d.off),
							"aria-pressed": selected,
							onClick: () => {
								if (planned !== true) actions.preview(id);
							},
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: d.swatches,
								children: swatches.map((color) => (0, react_jsx_runtime.jsx)("i", {
									className: d.swatch,
									style: { background: color }
								}, color))
							}), (0, react_jsx_runtime.jsx)("span", {
								className: d.name,
								children: t(labelKey)
							}), planned === true ? (0, react_jsx_runtime.jsx)("span", {
								className: d.badge,
								children: t("panel.comingSoon")
							}) : applied ? (0, react_jsx_runtime.jsx)("span", {
								className: d.badgeOn,
								children: t("panel.applied")
							}) : selected ? (0, react_jsx_runtime.jsx)("span", {
								className: d.badgePrev,
								children: t("panel.previewing")
							}) : null]
						}, id);
					})
				}), state.preview !== null && (0, react_jsx_runtime.jsxs)("div", {
					className: d.bar,
					children: [(0, react_jsx_runtime.jsx)("span", {
						className: d.barText,
						children: (0, react_jsx_runtime.jsxs)("span", {
							children: [t("panel.previewingText"), skinLabel(state.preview)]
						})
					}), (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: d.btnPrimary,
						onClick: () => {
							actions.commit();
						},
						children: t("panel.apply")
					}), (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: d.btn,
						onClick: () => {
							actions.rollback();
						},
						children: t("panel.cancel")
					})]
				}), state.zoom && (0, react_jsx_runtime.jsxs)("div", {
					className: d.overlay,
					onClick: () => {
						actions.zoom(false);
					},
					children: [(0, react_jsx_runtime.jsxs)("div", {
						className: d.modal,
						onClick: (event) => {
							event.stopPropagation();
						},
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: d.modalHead,
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: d.title,
								children: t("panel.zoomTitle")
							}), (0, react_jsx_runtime.jsx)("span", {
								className: d.modalName,
								children: skinLabel(effective)
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: d.modalClose,
								onClick: () => {
									actions.zoom(false);
								},
								children: "✕"
							})]
						}), (0, react_jsx_runtime.jsx)("div", {
							className: d.modalToolbar,
							children: (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: d.btn,
								onClick: () => {
									actions.zoomDark(!state.zoomDark);
								},
								children: state.zoomDark ? t("panel.light") : t("panel.dark")
							})
						}), (0, react_jsx_runtime.jsx)("div", frameProps, (0, react_jsx_runtime.jsx)(MiniUi, {}))]
					})]
				})]
			});
		}
		//#endregion
		//#region apply
		/** Required client services (cordis fiber inject). */
		const inject = ["slots", "locale", "connection", "remote", "settingsScope"];
		/**
		* Client plugin body: bind the skin-pack settings scope, register the
		* settings row, and keep the persisted skin synced into the store.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			const scope = ctx.settingsScope.bind({ namespace: SKIN_PACK_NS });
			const store = createSkinPackStore();
			let baked = null;
			const syncNow = () => {
				if (baked === null) return;
				const snapshot = scope.getSnapshot();
				const value = snapshot.value;
				if (value === void 0 || typeof value.skin !== "string") return;
				baked.sync(value.skin, snapshot.revision);
			};
			ctx.effect(() => scope.subscribe(syncNow), "skin-pack: settings scope adoption");
			ctx.effect(() => ctx.locale.register(SKIN_PACK_SETTINGS_NS, {
				zh,
				en
			}), "skin-pack: settings row dictionaries");
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin-pack",
				order: 20,
				store,
				locale: SKIN_PACK_SETTINGS_NS,
				inject: (actions) => {
					baked = actions;
					syncNow();
					return {};
				}
			}, SkinPackRow));
		}
		//#endregion
		/** Stable class-name map shared by the panel stylesheet and components. */
		const panelCssClasses = Object.freeze({
			group: "spk-group",
			title: "spk-title",
			sub: "spk-sub",
			cubes: "spk-cubes",
			cube: "spk-cube",
			on: "spk-on",
			off: "spk-off",
			swatches: "spk-swatches",
			swatch: "spk-swatch",
			name: "spk-name",
			badge: "spk-badge",
			badgeOn: "spk-badge-on",
			badgePrev: "spk-badge-prev",
			bar: "spk-bar",
			barText: "spk-bar-text",
			btn: "spk-btn",
			btnPrimary: "spk-btn-primary",
			zoom: "spk-zoom",
			overlay: "spk-overlay",
			modal: "spk-modal",
			modalHead: "spk-modal-head",
			modalName: "spk-modal-name",
			modalClose: "spk-modal-close",
			modalToolbar: "spk-modal-toolbar",
			frame: "spk-frame",
			mu: "mu",
			muSide: "mu-side",
			muBrand: "mu-brand",
			muNav: "mu-nav",
			muOn: "mu-on",
			muMain: "mu-main",
			muBubble: "mu-bubble",
			muBot: "mu-bot",
			muUser: "mu-user",
			muCode: "mu-code",
			muComposer: "mu-composer",
			muInput: "mu-input",
			muSend: "mu-send"
		});
		exports.DEFAULT_SKIN = DEFAULT_SKIN;
		exports.SKINS = SKINS;
		exports.SKIN_PACK_NS = SKIN_PACK_NS;
		exports.SKIN_PACK_SETTINGS_NS = SKIN_PACK_SETTINGS_NS;
		exports.SkinPackRow = SkinPackRow;
		exports.apply = apply;
		exports.applySkinAttribute = applySkinAttribute;
		exports.createSkinPackStore = createSkinPackStore;
		exports.inject = inject;
		return module.exports;
	}
});
