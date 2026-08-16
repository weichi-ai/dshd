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
		const skinsBodyCss = __SKINS_BODY_CSS__;
		const skinsScopedCss = __SKINS_SCOPED_CSS__;
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
