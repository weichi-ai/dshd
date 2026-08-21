// dsh-about — DSHD 关于页 host 端
// 提供三个本地 HTTP 路由（避开 /api 前缀，那是连接插件占用的命名空间）：
//   GET  /dshd-about        -> 当前版本 + 内置 dsh 版本 + 更新日志
//   GET  /dshd-about/check  -> 拉取 GitHub 最新 release 并与当前版本对比
//   POST /dshd-about/open   -> 用系统默认浏览器打开 GitHub release 页
// 幂等：所有注册均返回 disposer，插件停用/更新时自动注销。
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const requireFromHere = createRequire(import.meta.url);

const name = "dsh-about";

/** 发布仓库与 release 页（安装包托管在 weichi-ai/dshd Releases）。 */
const REPO = "weichi-ai/dshd";
const RELEASES_URL = `https://github.com/${REPO}/releases`;
const API_LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;

/**
 * 版本兜底：桌面版 main.js 会以 DSH_APP_VERSION 注入 app.getVersion()，
 * 与安装包版本自动一致；仅当该变量缺失（例如独立运行 dsh web）时用此常量。
 */
const FALLBACK_VERSION = "1.0.3";

/** 更新日志（每个发布版本追加一条）。 */
const CHANGELOG = [
	{ version: "1.0.3", date: "2026-08-22", notes: ["设置页新增「关于」：版本信息、更新日志、检查更新（对比 GitHub 最新版）"] },
	{ version: "1.0.2", date: "2026-08-21", notes: ["修复：启动时不再自动打开系统浏览器"] },
	{ version: "1.0.1", date: "2026-08-21", notes: ["内置 DeepSeek Harness 升级至 0.1.1-rc.2（多模态、Claude Code/Codex 子代理、图片输入等）"] },
	{ version: "1.0.0", date: "2026-08-18", notes: ["鲸彩世界 DSHD 首个发布版本"] }
];

/** 读取运行中的内置 dsh 版本（经 profile fallback 链接可解析到 vendor 依赖树）。 */
function readDshVersion() {
	try {
		return requireFromHere("@deepseek-ai/dsh/package.json").version;
	} catch {
		return "unknown";
	}
}

/** 解析 "v1.2.3" / "1.2.3-rc.1" -> [1, 2, 3]；无法解析返回 null。 */
function parseVersion(value) {
	const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(value ?? "").trim());
	return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

/** latest 是否严格新于 current（按主/次/补丁数字比较，忽略预发布后缀）。 */
function isNewer(latest, current) {
	const a = parseVersion(latest);
	const b = parseVersion(current);
	if (a === null || b === null) return false;
	for (let i = 0; i < 3; i++) {
		if (a[i] > b[i]) return true;
		if (a[i] < b[i]) return false;
	}
	return false;
}

/** 带超时的 GitHub API 请求（Node 24 全局 fetch；本机 Node/OpenSSL 链路可用）。 */
async function fetchGitHubLatest() {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 8000);
	try {
		const response = await fetch(API_LATEST, {
			headers: {
				"User-Agent": "DSHD-Desktop",
				Accept: "application/vnd.github+json"
			},
			signal: controller.signal
		});
		if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
		return await response.json();
	} finally {
		clearTimeout(timer);
	}
}

function sendJson(response, status, data) {
	const body = JSON.stringify(data);
	response.writeHead(status, {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store",
		"Access-Control-Allow-Origin": "*"
	});
	response.end(body);
}

function readBody(request) {
	return new Promise((resolve, reject) => {
		let data = "";
		request.on("data", (chunk) => {
			data += chunk;
			if (data.length > 65536) {
				request.destroy();
				reject(new Error("request body too large"));
			}
		});
		request.on("end", () => resolve(data));
		request.on("error", reject);
	});
}

function apply(ctx) {
	ctx.inject(["webServer"], (serverCtx) => {
		const appVersion = process.env.DSH_APP_VERSION || FALLBACK_VERSION;

		serverCtx.webServer.register({
			kind: "exact",
			path: "/dshd-about",
			handler: (request, response) => {
				if (request.method !== "GET") return sendJson(response, 405, { ok: false, error: "method not allowed" });
				sendJson(response, 200, {
					appVersion,
					dshVersion: readDshVersion(),
					repo: REPO,
					releasesUrl: RELEASES_URL,
					changelog: CHANGELOG
				});
			}
		});

		serverCtx.webServer.register({
			kind: "exact",
			path: "/dshd-about/check",
			handler: async (request, response) => {
				if (request.method !== "GET") return sendJson(response, 405, { ok: false, error: "method not allowed" });
				try {
					const release = await fetchGitHubLatest();
					const latest = String(release.tag_name ?? "unknown");
					const url = String(release.html_url ?? RELEASES_URL);
					const latestParsed = parseVersion(latest);
					const currentParsed = parseVersion(appVersion);
					const equal = latestParsed !== null && currentParsed !== null
						&& latestParsed[0] === currentParsed[0]
						&& latestParsed[1] === currentParsed[1]
						&& latestParsed[2] === currentParsed[2];
					sendJson(response, 200, {
						ok: true,
						current: appVersion,
						latest,
						url,
						newer: isNewer(latest, appVersion),
						equal
					});
				} catch (error) {
					sendJson(response, 200, {
						ok: false,
						error: error instanceof Error ? error.message : String(error)
					});
				}
			}
		});

		serverCtx.webServer.register({
			kind: "exact",
			path: "/dshd-about/open",
			handler: async (request, response) => {
				if (request.method !== "POST") return sendJson(response, 405, { ok: false, error: "method not allowed" });
				try {
					const body = JSON.parse(await readBody(request));
					const url = String((body && body.url) || "");
					if (!/^https:\/\/github\.com\//.test(url)) {
						return sendJson(response, 400, { ok: false, error: "only github.com URLs are allowed" });
					}
					if (process.platform === "win32") {
						spawn("cmd", ["/c", "start", "", url], { windowsHide: true, detached: true, stdio: "ignore" }).unref();
					} else {
						spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
					}
					sendJson(response, 200, { ok: true, url });
				} catch (error) {
					sendJson(response, 400, { ok: false, error: error instanceof Error ? error.message : String(error) });
				}
			}
		});
	});
}

export { CHANGELOG, REPO, RELEASES_URL, apply, name };
