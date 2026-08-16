// Verify the host entry loads as a cordis plugin and registers the settings schema.
import { apply, name, SKIN_PACK_NAMESPACE, SKIN_PACK_SCHEMA, DEFAULT_SKIN } from "../lib/index.js";

let registered = null;
const ctx = {
	inject: (deps, cb) => {
		if (!deps.includes("settings")) throw new Error("expected settings inject");
		const settingsCtx = { settings: { register: (ns, schema) => { registered = { ns, schema }; } } };
		cb(settingsCtx);
	}
};
apply(ctx);
if (registered === null) { console.error("FAIL: settings not registered"); process.exit(1); }
if (registered.ns !== "skin-pack" || registered.ns !== SKIN_PACK_NAMESPACE) { console.error("FAIL: namespace wrong", registered.ns); process.exit(1); }
console.log("name:", name, "| namespace:", registered.ns, "| schema type:", typeof registered.schema);
const resolved = registered.schema({ skin: "cute" });
if (resolved.skin !== "cute") { console.error("FAIL: schema did not resolve skin", JSON.stringify(resolved)); process.exit(1); }
const def = registered.schema({});
if (def.skin !== DEFAULT_SKIN) { console.error("FAIL: default skin wrong", JSON.stringify(def)); process.exit(1); }
console.log("OK: host entry registers schema; resolves custom + default deepseek");
