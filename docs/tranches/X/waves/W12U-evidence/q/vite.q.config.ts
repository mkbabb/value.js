// SERVED MODEL: claude-opus-5-5
// X.W12U.q — the named same-tree mirror's config (INSTRUMENT, not product).
// It is the repository's own vite.config.ts, unmodified, with two instrument
// settings laid over the resolved object:
//   1. `server.watch = null` — no file watcher, so no HMR. Reason, measured by
//      `.h` (record, Act 6, ESC-W12Uh-1) and at this seat's open (`curl
//      localhost:9000/` -> 000 after 15 s at load 195): the shared :9000 dev
//      server's event loop saturates in fsevents dispatch while four tracks
//      write evidence into the tree; and a watching mirror hot-updates the
//      page under a running test whenever another seat saves a demo file
//      (read in this seat's first mirror log: `hmr update /App.vue, …` at
//      16:06-16:07 during r1). Set by assignment AFTER mergeConfig, because
//      mergeConfig skips null values (this seat's first attempt, corrected).
//   2. its own `cacheDir` — several vite servers on one tree share
//      node_modules/.vite, and one re-optimizing its deps answers the others
//      `504 (Outdated Optimize Dep)` (read by probe-webkit-gl at 16:07).
// The modules served are the working tree's bytes at first request,
// transformed by the same plugins. Started from the repository root:
//   Q_MIRROR_PORT=9141 VITE_API_URL=http://localhost:9141 npx vite --config <this file> --port 9141 --strictPort
import { defineConfig, mergeConfig, type ConfigEnv, type UserConfig } from "vite";
import path from "node:path";
import base from "../../../../../../vite.config.ts";

export default defineConfig(async (env: ConfigEnv) => {
    const resolved = (await (typeof base === "function" ? base(env) : base)) as UserConfig;
    const merged = mergeConfig(resolved, {
        cacheDir: path.resolve(process.cwd(), `node_modules/.vite-w12u-q-${process.env.Q_MIRROR_PORT ?? "mirror"}`),
    }) as UserConfig;
    merged.server = { ...merged.server, watch: null };
    return merged;
});
