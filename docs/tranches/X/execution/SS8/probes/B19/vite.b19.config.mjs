// SS-8 · B19 — the repo's own vite config, served with HMR and file-watching OFF so a
// concurrent seat's edits cannot re-transform (or wedge) the probe server mid-run. The
// served model is the working tree as read at each module's first transform.
import base from "../../../../../../../vite.config.ts";
export default async (env) => {
    const c = await (typeof base === "function" ? base(env) : base);
    return { ...c, server: { ...(c.server ?? {}), hmr: false, watch: null } };
};
