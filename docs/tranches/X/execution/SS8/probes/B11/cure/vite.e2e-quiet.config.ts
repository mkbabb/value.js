// SS-8 B11 cures: the e2e dev server, quieted. Other seats rebuild `dist/`
// (the library the demo resolves) and edit `demo/**` while this seat's specs
// run; HMR pushes and dist page-reloads detach the page mid-`goto`. HMR is off
// and `dist/` is unwatched; `demo/**` stays watched, so a fresh page load
// still serves the current sources.
// Run: VITE_API_URL=http://localhost:8090 VJS_VITE_CACHE_DIR=$PWD/node_modules/.vite-e2e-8090 \
//   ~/.claude/guard/guarded --timeout 80 -- npx vite --port 8090 --config <this file>
import { defineConfig, mergeConfig, type ConfigEnv, type UserConfig } from "vite";
import base from "../../../../../../../vite.config";

export default defineConfig(async (env: ConfigEnv) => {
    const resolved = (typeof base === "function" ? await base(env) : base) as UserConfig;
    return mergeConfig(resolved, {
        server: { hmr: false, watch: { ignored: ["**/dist/**"] } },
    });
});
