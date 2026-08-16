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
		const WHALE_STOPS = `<stop offset="0%" stopColor="#22D3EE"/> <stop offset="28%" stopColor="#3B82F6"/> <stop offset="52%" stopColor="#8B5CF6"/> <stop offset="74%" stopColor="#EC4899"/> <stop offset="100%" stopColor="#FB7185"/>`;
		const WHALE_PATH = `M62.4575 3.89441C61.7888 3.56726 61.501 4.1908 61.1101 4.50769C60.9763 4.60999 60.863 4.7428 60.75 4.86548C59.7727 5.9082 58.6311 6.59302 57.1394 6.51123C54.9587 6.38855 53.0969 7.07349 51.4512 8.73975C51.1013 6.68506 49.939 5.45837 48.1699 4.67126C47.2441 4.26233 46.3081 3.85352 45.6599 2.96411C45.2073 2.33032 45.084 1.625 44.8577 0.929932C44.7136 0.510864 44.5696 0.081543 44.0862 0.0098877C43.5615 -0.0718994 43.3557 0.367676 43.1501 0.735718C42.3271 2.2384 42.0083 3.89441 42.0391 5.5708C42.1111 9.34277 43.7056 12.3481 46.8738 14.4846C47.2336 14.73 47.3264 14.9753 47.2131 15.333C46.9971 16.0691 46.74 16.7847 46.5137 17.5206C46.3696 17.9908 46.1538 18.093 45.6497 17.8887C43.9114 17.1628 42.4094 16.0895 41.0825 14.7913C38.8298 12.6139 36.7932 10.2117 34.2524 8.33081C33.6558 7.89124 33.0593 7.48242 32.4421 7.09399C29.8499 4.57922 32.7815 2.5144 33.4604 2.26904C34.1702 2.01343 33.7073 1.1344 31.4133 1.14465C29.1196 1.15479 27.0212 1.92151 24.3467 2.94373C23.9558 3.09705 23.5444 3.20947 23.1226 3.30151C20.6951 2.84143 18.1748 2.73926 15.5415 3.03577C10.5835 3.58777 6.62329 5.92859 3.7124 9.92554C0.215088 14.73 -0.60791 20.1886 0.400146 25.8824C1.45972 31.8828 4.5249 36.8508 9.23608 40.7354C14.1221 44.7629 19.7488 46.7357 26.1675 46.3575C30.0659 46.1327 34.4067 45.6113 39.303 41.4713C40.5374 42.0847 41.8335 42.33 43.9834 42.514C45.6394 42.6674 47.2336 42.4323 48.468 42.1766C50.4019 41.7678 50.2683 39.9789 49.5688 39.6517C43.9009 37.0144 45.1455 38.0878 44.0142 37.2189C46.8943 33.8148 51.2351 30.278 52.9324 18.8188C53.0662 17.9091 52.9529 17.3367 52.9324 16.6006C52.9221 16.1509 53.0249 15.9771 53.5393 15.9259C54.9587 15.7625 56.3372 15.3739 57.6023 14.6788C61.2747 12.6753 62.7559 9.38367 63.1055 5.43799C63.157 4.83484 63.0952 4.2113 62.4575 3.89441ZM30.4568 39.4065C24.9639 35.0927 22.2998 33.6718 21.199 33.7332C20.1704 33.7944 20.3557 34.97 20.5818 35.7367C20.8186 36.493 21.1272 37.0144 21.5591 37.6788C21.8574 38.1184 22.0632 38.7727 21.2607 39.2633C19.4915 40.3571 16.416 38.8953 16.272 38.8237C12.6924 36.718 9.69897 33.9375 7.59033 30.1349C5.55347 26.4753 4.37061 22.5499 4.17529 18.3589C4.12378 17.3468 4.42212 16.989 5.43018 16.8051C6.75708 16.5597 8.12524 16.5087 9.45215 16.7029C15.0581 17.5206 19.8311 20.025 23.8323 23.9913C26.116 26.2504 27.844 28.9491 29.6235 31.5864C31.5164 34.3873 33.553 37.0553 36.145 39.2429C37.0605 40.0095 37.791 40.5922 38.4905 41.0215C36.3816 41.2567 32.8638 41.3077 30.4568 39.4065ZM33.0901 22.4886C33.0901 22.0388 33.4502 21.681 33.9026 21.681C34.0056 21.681 34.0981 21.7015 34.1804 21.7322C34.2935 21.7731 34.3965 21.8344 34.4788 21.9264C34.6228 22.0695 34.7051 22.2739 34.7051 22.4886C34.7051 22.9384 34.345 23.2961 33.8923 23.2961C33.4397 23.2961 33.0901 22.9384 33.0901 22.4886ZM41.2676 26.6798C40.7432 26.8944 40.2185 27.0784 39.7144 27.0989C38.9326 27.1398 38.0789 26.8229 37.616 26.4344C36.896 25.8313 36.3816 25.494 36.1658 24.441C36.073 23.9913 36.1245 23.2961 36.2068 22.8975C36.3921 22.0388 36.1863 21.4868 35.5793 20.986C35.0857 20.577 34.4583 20.4646 33.769 20.4646C33.5117 20.4646 33.2751 20.3522 33.1003 20.2601C32.8123 20.1171 32.5757 19.7593 32.802 19.3197C32.874 19.1766 33.2239 18.8291 33.3062 18.7677C34.2422 18.2362 35.3223 18.4099 36.3201 18.8086C37.2458 19.1869 37.9453 19.882 38.9534 20.8633C39.9819 22.0491 40.167 22.3762 40.7534 23.2655C41.2163 23.9607 41.6379 24.6761 41.926 25.494C42.1008 26.0051 41.8745 26.4242 41.2676 26.6798Z`;
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
