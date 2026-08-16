window.__ModuleLoader__.load({
	id: "dsh-welcome",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region style injection (mirrors the build's \0dsh-css: pattern)
		function injectCss(tagId, css) {
			if (typeof document === "undefined" || document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") !== null) return;
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-welcome";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const welcomeCss = [
			// fullscreen splash
			".dsw-wc-overlay{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;background:radial-gradient(1100px 760px at 50% 32%,#16397a 0%,#0d2350 48%,#070f28 100%);color:#eef4ff;overflow:hidden;font-family:-apple-system,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;transition:opacity .55s ease}",
			".dsw-wc-overlay.dsw-wc-leave{opacity:0;pointer-events:none}",
			// whale wander/jump area
			".dsw-wc-stage{position:relative;width:250px;height:200px;animation:dsw-wander 8.5s ease-in-out infinite alternate}",
			".dsw-wc-glow{position:absolute;left:50%;bottom:2px;width:150px;height:26px;transform:translateX(-50%);background:radial-gradient(ellipse at center,rgba(103,232,249,.5),rgba(103,232,249,0) 70%);filter:blur(2px)}",
			".dsw-wc-whale{position:absolute;left:50%;top:50%;width:195px;height:143px;transform:translate(-50%,-50%);animation:dsw-jump 2.7s ease-in-out infinite;filter:drop-shadow(0 12px 26px rgba(34,211,238,.35))}",
			".dsw-wc-whale svg{display:block;width:100%;height:100%;animation:dsw-wiggle 4.2s ease-in-out infinite}",
			// 鲸鱼三色循环：蓝 -> 黑 -> 彩（交叉淡入淡出，9s 一轮，每段约 2.4-2.7s）
			// 注意：animation 简写会重置 animation-name，必须每条单独写全
			".dsw-phase-blue{animation:9s ease-in-out infinite dsw-phase-blue}",
			".dsw-phase-black{animation:9s ease-in-out infinite dsw-phase-black}",
			".dsw-phase-colorful{animation:9s ease-in-out infinite dsw-phase-colorful}",
			"@keyframes dsw-phase-blue{0%,30%{opacity:1}37%,63%{opacity:0}70%,96%{opacity:0}100%{opacity:1}}",
			"@keyframes dsw-phase-black{0%,30%{opacity:0}37%,63%{opacity:1}70%,96%{opacity:0}}",
			"@keyframes dsw-phase-colorful{0%,30%{opacity:0}37%,63%{opacity:0}70%,96%{opacity:1}}",
			"@keyframes dsw-wander{from{transform:translateX(-32px)}to{transform:translateX(32px)}}",
			"@keyframes dsw-jump{0%,58%{transform:translate(-50%,-50%) scale(1,1)}68%{transform:translate(-50%,-42%) scale(1.06,.9)}83%{transform:translate(-50%,-98%) scale(.94,1.1)}94%{transform:translate(-50%,-50%) scale(1.08,.88)}100%{transform:translate(-50%,-50%) scale(1,1)}}",
			"@keyframes dsw-wiggle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3.5deg)}}",
			// copy + CTA
			".dsw-wc-copy{max-width:min(620px,88vw);text-align:center;color:#eef4ff;letter-spacing:.02em;padding:0 20px}",
			".dsw-wc-l1{font-size:21px;font-weight:600;line-height:1.6;color:#f0f6ff;letter-spacing:.05em}",
			".dsw-wc-l2{margin-top:10px;font-size:15px;line-height:1.8;color:#c7d6f8}",
			".dsw-wc-btn{appearance:none;border:0;cursor:pointer;font:inherit;font-size:16px;font-weight:600;letter-spacing:.14em;color:#08234d;background:linear-gradient(90deg,#67e8f9,#60a5fa 45%,#c084fc 80%,#f9a8d4);background-size:180% 100%;margin:34px 0 0;padding:14px 48px;border-radius:999px;box-shadow:0 10px 30px rgba(34,211,238,.35),inset 0 1px 0 rgba(255,255,255,.55);transition:transform .18s ease,box-shadow .18s ease;animation:dsw-btn-shimmer 4s ease-in-out infinite}",
			".dsw-wc-btn:hover{transform:translateY(-2px);box-shadow:0 14px 38px rgba(34,211,238,.5)}",
			".dsw-wc-btn:active{transform:translateY(0) scale(.98)}",
			"@keyframes dsw-btn-shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}",
			// bubbles
			".dsw-wc-bubbles{position:absolute;inset:0;pointer-events:none}",
			".dsw-b{position:absolute;bottom:-40px;border-radius:50%;background:radial-gradient(circle at 32% 30%,rgba(255,255,255,.5),rgba(147,197,253,.12) 60%,transparent 70%);animation:dsw-rise linear infinite}",
			".dsw-b1{left:12%;width:26px;height:26px;animation-duration:9s;animation-delay:0s}",
			".dsw-b2{left:26%;width:14px;height:14px;animation-duration:12s;animation-delay:2.2s}",
			".dsw-b3{left:62%;width:20px;height:20px;animation-duration:10s;animation-delay:1s}",
			".dsw-b4{left:78%;width:12px;height:12px;animation-duration:13s;animation-delay:3.4s}",
			".dsw-b5{left:88%;width:30px;height:30px;animation-duration:9.5s;animation-delay:.6s}",
			".dsw-b6{left:44%;width:9px;height:9px;animation-duration:11s;animation-delay:4s}",
			"@keyframes dsw-rise{0%{transform:translateY(0) scale(.7);opacity:0}12%{opacity:.9}100%{transform:translateY(-110vh) scale(1.1);opacity:0}}",
			// settings row
			".dsw-row{display:flex;align-items:center;gap:12px;padding:16px 0;border-bottom:1px solid var(--dsw-alias-border-l2)}",
			".dsw-row-main{flex:1;display:flex;flex-direction:column;gap:4px}",
			".dsw-row-title{color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}",
			".dsw-row-sub{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}",
			".dsw-row-btn{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-elevated-fill);color:var(--dsw-alias-label-primary);border-radius:8px;padding:6px 14px;font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}",
			".dsw-row-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}"
		].join("");
		injectCss("dsh-welcome/welcome.css", welcomeCss);
		//#endregion
		//#region data
		/** Settings namespace owned by this plugin (persisted "seen" flag). */
		const WELCOME_NS = "welcome";
		/** Locale dictionary namespace for the settings row. */
		const WELCOME_SETTINGS_NS = "settings.welcome";
		/** Field carrying whether the user has dismissed the welcome splash. */
		const WELCOME_FIELD = "seen";
		/** Whale artwork: colorful gradient + official whale path (shape unchanged). */
		const WHALE_STOPS = "__WHALE_STOPS__";
		const WHALE_PATH = "__WHALE_PATH__";
		//#endregion
		//#region overlay
		/** Currently mounted overlay element (null when hidden). */
		let overlayRoot = null;
		/** Whether the splash already auto-shown this session. */
		let autoShown = false;
		/** Build the splash markup (ocean gradient + wandering/jumping whale + copy + CTA). */
		function buildOverlayHtml() {
			return [
				'<div class="dsw-wc-overlay" data-dsw-welcome="1">',
				'<div class="dsw-wc-bubbles"><i class="dsw-b dsw-b1"></i><i class="dsw-b dsw-b2"></i><i class="dsw-b dsw-b3"></i><i class="dsw-b dsw-b4"></i><i class="dsw-b dsw-b5"></i><i class="dsw-b dsw-b6"></i></div>',
				'<div class="dsw-wc-stage">',
				'<div class="dsw-wc-glow"></div>',
				'<div class="dsw-wc-whale"><svg viewBox="0 0 63.1196 46.4033" fill="none" aria-hidden="true"><defs><linearGradient id="dswWhaleGrad" gradientUnits="userSpaceOnUse" x1="8" y1="40" x2="56" y2="7">' + WHALE_STOPS + '</linearGradient></defs><path class="dsw-phase dsw-phase-blue" d="' + WHALE_PATH + '" fill="#426EFE"/><path class="dsw-phase dsw-phase-black" d="' + WHALE_PATH + '" fill="#111111" stroke="rgba(226,232,240,0.55)" stroke-width="0.6"/><path class="dsw-phase dsw-phase-colorful" d="' + WHALE_PATH + '" fill="url(#dswWhaleGrad)"/></svg></div>',
				'</div>',
				'<div class="dsw-wc-copy"><div class="dsw-wc-l1">你好，我是小彩鲸。</div><div class="dsw-wc-l2">欢迎来到鲸彩世界，期待你与deepseek harness一起创造更加精彩的世界。</div></div>',
				'<button type="button" class="dsw-wc-btn" data-dsw-welcome-cta="1">开启鲸彩之旅</button>',
				'</div>'
			].join("");
		}
		/**
		* Show the splash overlay. Only the CTA button dismisses it (spec).
		* @param scope - bound settings scope; CTA persists the "seen" flag.
		*/
		function showWelcome(scope) {
			if (typeof document === "undefined") return;
			if (overlayRoot !== null) {
				overlayRoot.classList.remove("dsw-wc-leave");
				return;
			}
			const host = document.createElement("div");
			host.innerHTML = buildOverlayHtml();
			overlayRoot = host.firstElementChild;
			const cta = overlayRoot.querySelector("[data-dsw-welcome-cta]");
			if (cta !== null) {
				cta.addEventListener("click", () => {
					hideWelcome();
					if (scope !== null && typeof scope.set === "function") {
						scope.set(WELCOME_FIELD, true).catch(() => {});
					}
				});
			}
			document.body.appendChild(overlayRoot);
		}
		/** Fade the splash out and detach it after the transition. */
		function hideWelcome() {
			if (overlayRoot === null) return;
			overlayRoot.classList.add("dsw-wc-leave");
			const el = overlayRoot;
			window.setTimeout(() => {
				el.remove();
				if (overlayRoot === el) overlayRoot = null;
			}, 650);
		}
		/** Wait for document.body, then show (used by both auto-show and rearm). */
		function showWhenReady(scope) {
			if (typeof document === "undefined") return;
			if (document.body !== null) {
				showWelcome(scope);
			} else {
				document.addEventListener("DOMContentLoaded", () => showWelcome(scope), { once: true });
			}
		}
		//#endregion
		//#region locales
		/** Simplified Chinese dictionary (key-set source of truth). */
		const zh = {
			"row.title": "欢迎页",
			"row.subtitle": "首次启动展示鲸彩世界欢迎页，可随时重新打开",
			"row.rearm": "重新显示欢迎页"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"row.title": "Welcome",
			"row.subtitle": "Shown on first launch; re-open it anytime",
			"row.rearm": "Show welcome again"
		};
		//#endregion
		//#region component
		/** Welcome preference row in Settings -> General: status copy + rearm button. */
		function WelcomeRow({ t, rearm }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "dsw-row",
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: "dsw-row-main",
					children: [(0, react_jsx_runtime.jsx)("div", {
						className: "dsw-row-title",
						children: t("row.title")
					}), (0, react_jsx_runtime.jsx)("div", {
						className: "dsw-row-sub",
						children: t("row.subtitle")
					})]
				}), (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "dsw-row-btn",
					onClick: () => {
						rearm();
					},
					children: t("row.rearm")
				})]
			});
		}
		//#endregion
		//#region apply
		/** Required client services. */
		const inject = ["slots", "locale", "connection", "remote", "settingsScope"];
		/**
		* Client plugin body: adopt the welcome settings scope, auto-show the splash
		* on first launch, and register the rearm row into Settings -> General.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			const scope = ctx.settingsScope.bind({ namespace: WELCOME_NS });
			ctx.effect(() => ctx.locale.register(WELCOME_SETTINGS_NS, {
				zh,
				en
			}), "dsh-welcome: settings row dictionaries");
			ctx.effect(() => scope.subscribe((snapshot) => {
				if (autoShown) return;
				if (snapshot.status !== "ready") return;
				const value = snapshot.value;
				if (value === void 0 || value.seen !== true) {
					autoShown = true;
					showWhenReady(scope);
				}
			}), "dsh-welcome: scope adoption");
			// 覆盖已 ready 的情形（快照在 subscribe 前已发布）
			{
				const early = scope.getSnapshot();
				if (early.status === "ready" && early.value !== void 0 && early.value.seen !== true) {
					autoShown = true;
					showWhenReady(scope);
				}
			}
			const injected = () => ({
				rearm: () => {
					if (scope !== null && typeof scope.set === "function") {
						scope.set(WELCOME_FIELD, false).catch(() => {});
					}
					showWhenReady(scope);
				}
			});
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "dsh-welcome",
				order: 30,
				locale: WELCOME_SETTINGS_NS,
				inject: injected
			}, WelcomeRow));
		}
		//#endregion
		exports.WELCOME_FIELD = WELCOME_FIELD;
		exports.WELCOME_NS = WELCOME_NS;
		exports.WELCOME_SETTINGS_NS = WELCOME_SETTINGS_NS;
		exports.WelcomeRow = WelcomeRow;
		exports.apply = apply;
		exports.hideWelcome = hideWelcome;
		exports.inject = inject;
		exports.showWelcome = showWelcome;
		return module.exports;
	}
});
