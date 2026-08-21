// dsh-about — DSHD 关于页 client 端
// 在设置页末尾注册「关于」分节：显示版本信息、更新日志、检查更新。
// 数据来自 host 端本地路由（同源 fetch，无 CORS/CSP 问题）：
//   GET  /dshd-about        版本 + 更新日志
//   GET  /dshd-about/check  检查更新（对比 GitHub 最新 release）
//   POST /dshd-about/open   用系统默认浏览器打开 GitHub release 页
window.__ModuleLoader__.load({
	id: "dsh-about",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let React = require("react");

		const inject = ["slots"];

		/** 极简内联样式（跟随当前主题文本色，不依赖额外样式表）。 */
		const s = {
			root: {
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				maxWidth: 640,
				padding: "4px 2px"
			},
			title: { fontSize: 18, fontWeight: 600, margin: 0 },
			card: {
				border: "1px solid rgba(128,128,128,.28)",
				borderRadius: 8,
				padding: "12px 14px",
				display: "flex",
				flexDirection: "column",
				gap: "8px"
			},
			row: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" },
			mono: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" },
			notes: { margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 },
			btn: {
				padding: "6px 14px",
				borderRadius: 6,
				border: "1px solid rgba(128,128,128,.45)",
				background: "transparent",
				color: "inherit",
				cursor: "pointer",
				fontSize: 13
			},
			btnPrimary: {
				padding: "6px 14px",
				borderRadius: 6,
				border: "1px solid transparent",
				background: "#2563eb",
				color: "#fff",
				cursor: "pointer",
				fontSize: 13
			},
			ok: { color: "#22c55e" },
			err: { color: "#ef4444" },
			muted: { opacity: 0.65, fontSize: 12 },
			link: { color: "inherit", textDecoration: "underline", cursor: "pointer", background: "none", border: "none", padding: 0, fontSize: 13 }
		};

		/** 关于页主体：版本信息 + 更新日志 + 检查更新。 */
		function AboutSection() {
			const [info, setInfo] = React.useState(null);
			const [check, setCheck] = React.useState(null); // { phase: 'idle'|'loading'|'done', data? }
			const [openState, setOpenState] = React.useState(null); // null | 'opening' | 'opened' | 'failed'

			React.useEffect(() => {
				let alive = true;
				fetch("/dshd-about")
					.then((r) => r.json())
					.then((data) => { if (alive) setInfo(data); })
					.catch(() => { if (alive) setInfo({ error: "无法加载版本信息" }); });
				return () => { alive = false; };
			}, []);

			const runCheck = () => {
				setCheck({ phase: "loading" });
				setOpenState(null);
				fetch("/dshd-about/check")
					.then((r) => r.json())
					.then((data) => setCheck({ phase: "done", data }))
					.catch(() => setCheck({ phase: "done", data: { ok: false, error: "网络错误，请稍后重试" } }));
			};

			const openReleases = () => {
				const url = (check && check.phase === "done" && check.data && check.data.url) || (info && info.releasesUrl);
				if (!url) return;
				setOpenState("opening");
				fetch("/dshd-about/open", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ url })
				})
					.then((r) => r.json())
					.then((data) => setOpenState(data.ok ? "opened" : "failed"))
					.catch(() => setOpenState("failed"));
			};

			const versionRow = () => {
				if (info && info.error) {
					return React.createElement("div", { style: s.err }, info.error);
				}
				if (!info) {
					return React.createElement("div", { style: s.muted }, "加载中…");
				}
				return React.createElement("div", { style: s.row }, [
					React.createElement("span", { key: "app", style: s.mono }, `鲸彩世界 DSHD v${info.appVersion}`),
					React.createElement("span", { key: "dsh", style: s.mono }, `内置 dsh ${info.dshVersion}`)
				]);
			};

			const checkArea = () => {
				if (check === null) {
					return React.createElement(
						"button",
						{ type: "button", style: s.btn, onClick: runCheck },
						"检查更新"
					);
				}
				if (check.phase === "loading") {
					return React.createElement("div", { style: s.muted }, "正在检查更新…");
				}
				const data = check.data;
				if (data && data.ok) {
					if (data.newer) {
						return React.createElement("div", { style: s.row }, [
							React.createElement("span", { key: "txt" }, [
								React.createElement("span", { style: s.ok }, "发现新版本 "),
								React.createElement("span", { key: "v", style: { ...s.mono, fontWeight: 600 } }, data.latest)
							]),
							React.createElement("button", { key: "go", type: "button", style: s.btnPrimary, onClick: openReleases }, "去下载"),
							openState === "opening" ? React.createElement("span", { key: "st", style: s.muted }, "正在打开浏览器…") : null,
							openState === "failed" ? React.createElement("span", { key: "st", style: s.err }, "打开失败，请手动访问 GitHub Releases") : null
						]);
					}
					if (data.equal) {
						return React.createElement("div", { style: s.row }, [
							React.createElement("span", { key: "txt", style: s.ok }, "✓ 已是最新版本"),
							React.createElement("button", { key: "go", type: "button", style: s.link, onClick: openReleases }, "前往 GitHub Releases")
						]);
					}
					return React.createElement("div", { style: s.row }, [
						React.createElement("span", { key: "txt" }, `当前版本 ${data.current}，GitHub 最新 ${data.latest}`),
						React.createElement("button", { key: "go", type: "button", style: s.link, onClick: openReleases }, "前往 GitHub Releases")
					]);
				}
				return React.createElement("div", { style: s.row }, [
					React.createElement("span", { key: "txt", style: s.err }, `检查失败：${(data && data.error) || "未知错误"}`),
					React.createElement("button", { key: "go", type: "button", style: s.btn, onClick: runCheck }, "重试"),
					info && info.releasesUrl
						? React.createElement("button", { key: "link", type: "button", style: s.link, onClick: openReleases }, "前往 GitHub Releases")
						: null
				]);
			};

			const changelogArea = () => {
				const rows = (info && info.changelog) || [];
				return React.createElement(
					"div",
					{ style: s.card },
					[
						React.createElement("div", { key: "h", style: { fontWeight: 600, fontSize: 14 } }, "更新日志"),
						rows.length === 0
							? React.createElement("div", { key: "e", style: s.muted }, "暂无更新日志")
							: rows.map((entry) => React.createElement("div", { key: entry.version, style: { display: "flex", flexDirection: "column", gap: 4 } }, [
								React.createElement("div", { key: "t", style: { fontWeight: 600 } }, `${entry.version} · ${entry.date}`),
								(entry.notes || []).map((note, i) => React.createElement("div", { key: i, style: { paddingLeft: 6 } }, `· ${note}`))
							]))
					]
				);
			};

			return React.createElement(
				"div",
				{ style: s.root },
				[
					React.createElement("h2", { key: "title", style: s.title }, "关于"),
					React.createElement("div", { key: "ver", style: s.card }, versionRow()),
					React.createElement("div", { key: "check", style: s.card }, checkArea()),
					changelogArea()
				]
			);
		}

		function apply(ctx) {
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "dsh-about",
				order: 10000,
				label: "关于"
			}, AboutSection));
		}

		exports.inject = inject;
		exports.apply = apply;
		exports.AboutSection = AboutSection;
		return module.exports;
	}
});
