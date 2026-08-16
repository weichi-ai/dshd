// Smoke test for the dsh-skin-pack client bundle: eval in Node with stubs,
// exercise the store state machine, apply() wiring, and component rendering.
const fs = require("fs");
const path = require("path");

const appended = [];
global.window = {};
global.document = {
	head: { appendChild(tag) { appended.push(tag); } },
	createElement() {
		return { dataset: {}, style: {}, _attrs: {}, textContent: "", setAttribute(k, v) { this._attrs[k] = v; }, removeAttribute(k) { delete this._attrs[k]; } };
	},
	querySelector() { return null; },
	body: { _attrs: {}, setAttribute(k, v) { this._attrs[k] = v; }, removeAttribute(k) { delete this._attrs[k]; }, style: {} }
};
global.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });

const factories = {};
window.__ModuleLoader__ = { load(handoff) { factories[handoff.id] = handoff.factory; } };

require(path.join(__dirname, "..", "lib", "client.js"));
const id = "dsh-skin-pack";
if (!factories[id]) { console.error("FAIL: factory not registered"); process.exit(1); }

// ---- stubs ----
// jsx recorder
function mkEl(type, props, key) { return { type, props: props || {}, key }; }
const jsx = mkEl, jsxs = mkEl;

// fake defineStore mirroring the framework contract (handle + create)
function fakeDefineStore(decl) {
	return {
		spec: decl,
		create() {
			let state = decl.init();
			const listeners = new Set();
			const store = {
				getSnapshot: () => state,
				subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
				update(mutator) { mutator(state); for (const fn of [...listeners]) fn(); }
			};
			const actions = {};
			for (const key of Object.keys(decl.actions)) {
				const mutate = decl.actions[key];
				actions[key] = (...params) => { store.update((d) => mutate(d, ...params)); };
			}
			return { actions, getSnapshot: store.getSnapshot, subscribe: store.subscribe, store };
		}
	};
}

const require2 = (spec) => {
	if (spec === "react/jsx-runtime") return { jsx, jsxs, Fragment: {} };
	if (spec === "@deepseek-ai/dsh-client-runtime/client") return { defineStore: fakeDefineStore };
	throw new Error("unexpected require: " + spec);
};
const mod = factories[id](require2);
console.log("exports:", Object.keys(mod).join(", "));

// ---- 1) CSS injection ----
const tags = appended.map((t) => t.dataset && t.dataset.pluginCss);
for (const want of ["dsh-skin-pack/skins.css", "dsh-skin-pack/preview.css", "dsh-skin-pack/panel.css"]) {
	if (!tags.includes(want)) { console.error("FAIL: missing style tag", want); process.exit(1); }
}
const skinsTag = appended.find((t) => t.dataset.pluginCss === "dsh-skin-pack/skins.css");
const bodyCss = skinsTag.textContent;
for (const skin of ["midnight", "nord", "sepia", "violet", "cartoon", "cute"]) {
	if (!bodyCss.includes('body[data-skin-pack="' + skin + '"]')) { console.error("FAIL: body css missing", skin); process.exit(1); }
}
if (!bodyCss.includes('body[data-skin-pack="cute"][data-ds-dark-theme]')) { console.error("FAIL: body dark css missing"); process.exit(1); }
const prevTag = appended.find((t) => t.dataset.pluginCss === "dsh-skin-pack/preview.css");
const scopedCss = prevTag.textContent;
if (!scopedCss.includes('[data-skin-pack-preview="deepseek"] {') || !scopedCss.includes('[data-skin-pack-preview="cute"][data-preview-dark]')) {
	console.error("FAIL: scoped preview css incomplete"); process.exit(1);
}
console.log("OK: 3 style tags injected; body + scoped css verified");

// ---- 2) store state machine ----
const { createSkinPackStore } = mod;
const handle = createSkinPackStore();
const inst = handle.create();
const { actions, getSnapshot } = inst;
let attr = () => global.document.body._attrs["data-skin-pack"] || null;

actions.sync("cute", 3);
if (attr() !== "cute") { console.error("FAIL: sync did not apply attribute", attr()); process.exit(1); }
actions.preview("midnight");
if (attr() !== "midnight") { console.error("FAIL: preview did not apply", attr()); process.exit(1); }
let st = getSnapshot();
if (st.preview !== "midnight" || st.skin !== "cute") { console.error("FAIL: preview state wrong", JSON.stringify(st)); process.exit(1); }
actions.commit();
st = getSnapshot();
if (st.skin !== "midnight" || st.preview !== null) { console.error("FAIL: commit state wrong", JSON.stringify(st)); process.exit(1); }
if (attr() !== "midnight") { console.error("FAIL: commit attribute wrong", attr()); process.exit(1); }
actions.preview("cartoon");
actions.rollback();
st = getSnapshot();
if (st.preview !== null || st.skin !== "midnight" || attr() !== "midnight") { console.error("FAIL: rollback wrong", JSON.stringify(st), attr()); process.exit(1); }
actions.sync("deepseek", 4);
if (attr() !== null) { console.error("FAIL: deepseek should clear attribute", attr()); process.exit(1); }
actions.preview("custom");
if (attr() !== null) { console.error("FAIL: custom should render default (no attribute)", attr()); process.exit(1); }
actions.preview("nord");
if (attr() !== "nord") { console.error("FAIL: nord preview", attr()); process.exit(1); }
console.log("OK: store state machine (sync/preview/commit/rollback/deepseek/custom)");

// ---- 3) apply() wiring ----
const { apply, SKIN_PACK_NS } = mod;
let scopeValue = { value: { skin: "violet" }, revision: 5 };
const scopeListeners = new Set();
const fakeScope = {
	getSnapshot: () => scopeValue,
	subscribe: (fn) => { scopeListeners.add(fn); return () => scopeListeners.delete(fn); },
	set: (field, value) => { scopeValue = { value: { skin: value }, revision: scopeValue.revision + 1 }; for (const fn of [...scopeListeners]) fn(); }
};
let registered = null;
const ctx = {
	settingsScope: { bind: (spec) => { if (spec.namespace !== SKIN_PACK_NS) throw new Error("wrong ns"); return fakeScope; } },
	locale: { register() {} },
	slots: {
		inject: (name, thunk) => { if (name !== "settings.general.item") throw new Error("wrong slot"); thunk(); },
		register: (opts) => {
			const inst2 = opts.store.create();
			const injected = opts.inject(inst2.actions);
			registered = { opts, inst: inst2, injected };
			return () => {};
		}
	},
	effect: (fn) => { fn(); },
	on() { return () => {}; },
	provide() {}
};
apply(ctx);
if (!registered || !registered.opts) { console.error("FAIL: slot row not registered"); process.exit(1); }
if (attr() !== "violet") { console.error("FAIL: initial apply did not run", attr()); process.exit(1); }
// simulate a settings change pushed from host
scopeValue = { value: { skin: "sepia" }, revision: 6 };
for (const fn of [...scopeListeners]) fn();
if (attr() !== "sepia") { console.error("FAIL: scope sync did not re-apply", attr()); process.exit(1); }
console.log("OK: apply() wiring (scope bind, slot register, initial + pushed sync)");

// ---- 4) component render ----
const { SkinPackRow } = mod;
function render(state, actionsBag) {
	let lastTree = null;
	const useStore = (sel) => sel(state);
	return SkinPackRow({ t: (k) => k, useStore, actions: actionsBag });
}
const actionsBag = {
	preview() {}, commit() {}, rollback() {}, zoom() {}, zoomDark() {}
};
let tree = render({ skin: "deepseek", preview: null, zoom: false, zoomDark: false }, actionsBag);
const cubesWrap = tree.props.children.find((n) => n && n.props && n.props.className === "spk-cubes");
const cubes = cubesWrap ? cubesWrap.props.children : [];
if (cubes.length !== 8) { console.error("FAIL: expected 8 cubes, got", cubes.length); process.exit(1); }
const customCube = cubes.find((n) => n.key === "custom");
if (!customCube || customCube.props.disabled !== true) { console.error("FAIL: custom cube should be disabled"); process.exit(1); }
const bars = tree.props.children.filter((n) => n && n.props && n.props.className === "spk-bar");
if (bars.length !== 0) { console.error("FAIL: bar should be hidden without preview"); process.exit(1); }
tree = render({ skin: "deepseek", preview: "cartoon", zoom: false, zoomDark: false }, actionsBag);
let bars2 = tree.props.children.filter((n) => n && n.props && n.props.className === "spk-bar");
if (bars2.length !== 1) { console.error("FAIL: bar should show during preview"); process.exit(1); }
tree = render({ skin: "deepseek", preview: "cute", zoom: true, zoomDark: true }, actionsBag);
const overlays = tree.props.children.filter((n) => n && n.props && n.props.className === "spk-overlay");
if (overlays.length !== 1) { console.error("FAIL: zoom overlay missing"); process.exit(1); }
const modal = overlays[0].props.children[0];
const frame = modal.props.children[2];
if (frame.props["data-skin-pack-preview"] !== "cute" || frame.props["data-preview-dark"] !== "") {
	console.error("FAIL: preview frame attrs wrong", JSON.stringify(frame.props)); process.exit(1);
}
console.log("OK: component render (8 cubes, custom disabled, preview bar, zoom modal + frame attrs)");
console.log("ALL SKIN-PACK SMOKE TESTS PASSED");
