import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
//#region lib/types/index.js
/** Host registration for the welcome preference document. */
const name = "welcome";
/** Settings namespace owned by the welcome plugin (the persisted "seen" flag). */
const WELCOME_NAMESPACE = settingsNamespace("welcome");
/** Field carrying whether the user has dismissed the welcome splash. */
const WELCOME_FIELD = "seen";
/** Default: welcome has not been seen yet. */
const WELCOME_DEFAULT = false;
/** Durable welcome schema; also the wire envelope the browser scope validates against. */
const WELCOME_SCHEMA = z.object({
	[WELCOME_FIELD]: z.boolean().default(WELCOME_DEFAULT)
});
/**
* Register the durable welcome section when the optional Host settings
* service is composed.
* @param ctx - Host context that may acquire the settings service.
*/
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(WELCOME_NAMESPACE, WELCOME_SCHEMA);
	});
}
//#endregion
export { WELCOME_DEFAULT, WELCOME_FIELD, WELCOME_NAMESPACE, WELCOME_SCHEMA, apply, name };
