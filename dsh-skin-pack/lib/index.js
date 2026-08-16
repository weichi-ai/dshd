import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
//#region lib/types/index.js
/** Host registration for the skin-pack preference document. */
const name = "skin-pack";
/** Settings namespace owned by the skin-pack plugin (the persisted skin choice). */
const SKIN_PACK_NAMESPACE = settingsNamespace("skin-pack");
/** Field carrying the selected skin id. */
const SKIN_PACK_FIELD = "skin";
/** Default skin when the user-settings document has no override. */
const DEFAULT_SKIN = "deepseek";
/** Durable skin-pack schema; also the wire envelope the browser scope validates against. */
const SKIN_PACK_SCHEMA = z.object({
	[SKIN_PACK_FIELD]: z.string().default(DEFAULT_SKIN)
});
/**
* Register the durable skin-pack section when the optional Host settings
* service is composed.
* @param ctx - Host context that may acquire the settings service.
*/
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(SKIN_PACK_NAMESPACE, SKIN_PACK_SCHEMA);
	});
}
//#endregion
export { DEFAULT_SKIN, SKIN_PACK_FIELD, SKIN_PACK_NAMESPACE, SKIN_PACK_SCHEMA, apply, name };
