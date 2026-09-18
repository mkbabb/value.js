// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b — the STANDALONE runnable config for the visual matrix.
 *
 * `playwright.config.ts` belongs to X.W1.a (W1.md §Disjointness), so this unit
 * cannot wire its project there. It must still be RUNNABLE — a gate that cannot
 * be executed by the seat that authored it is the `vnext` disease this tranche
 * names in its own Archaeology (*"193 gate commands named a runner
 * (`.vnext/proof-runner.mjs`) that does not exist"*). So:
 *
 *   npx playwright test -c e2e/visual/visual.config.ts
 *
 * runs the whole matrix today, against the same project definitions X.W1.a will
 * spread into the root config. The projects are IMPORTED, not restated, so the
 * standalone path and the wired path cannot diverge.
 *
 * The dev server is the substrate here for the same reason the root config gives
 * (*"the runtime product is byte-identical to what a user drives"*), on its own
 * port so a concurrent smoke run on :8090 is never attached to by mistake —
 * T.W3's lane-local port seam, applied.
 */
import { resolve } from "node:path";

import { defineConfig } from "@playwright/test";

import { VISUAL_PROJECTS } from "./visual.project";

const PORT = Number(process.env.VJS_VISUAL_PORT ?? 8190);
const ORIGIN = `http://localhost:${PORT}`;
/** The repo root — `vite.config.ts`'s directory, and the dev server's cwd. */
const REPO_ROOT = resolve(import.meta.dirname, "../..");

export default defineConfig({
    testDir: ".",
    workers: 1,
    retries: 0,
    timeout: 120_000,
    expect: { timeout: 30_000 },
    reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
    webServer: {
        command: `npx vite --port ${PORT}`,
        // EXPLICIT. `webServer.cwd` defaults to the directory of the CONFIG
        // file, which is `e2e/visual/` — so the default made Vite start with no
        // `vite.config.ts` in reach, serving `e2e/visual/` as its root and
        // answering `/` with 404. Measured: `curl -o /dev/null -w "%{http_code}"
        // http://localhost:8190/` → `404`, and the first navigation of the run
        // died `net::ERR_HTTP_RESPONSE_CODE_FAILURE at /#/browse`.
        //
        // That defect and the one below had been hiding each other: while
        // `reuseExistingServer` was true, this command never ran, so the wrong
        // cwd was never exercised — and because the command never ran, the `env`
        // below was never applied. Fixing either one alone surfaces the other.
        cwd: REPO_ROOT,
        // `url`, not `port`. A bound socket is not a working server: the 404
        // above satisfies a port check and fails every test afterwards. Waiting
        // on a real HTTP response turns a mis-rooted or still-starting Vite into
        // a loud webServer timeout instead of a cascade of navigation errors.
        url: ORIGIN,
        // NEVER reuse. This is the cure for a measured, silent, gate-defeating
        // failure — the worst kind this wave exists to end.
        //
        // With `reuseExistingServer: true`, Playwright attaches to whatever is
        // already on the port and skips `env` entirely (`webServerPlugin`:
        // `if (isAlreadyAvailable) { if (reuseExistingServer) return; }` — the
        // env below is only ever applied to a server IT launches). A dev server
        // left over from any other invocation therefore has no `VITE_API_URL`,
        // which trips `detectDevMisconfig()` (loopback origin + unset
        // VITE_API_URL + cross-origin BASE_URL), lights the `misconfigured` lamp
        // in the GLOBAL nav, and short-circuits every transport call before a
        // request is issued.
        //
        // Measured, not feared: the first full mint of this matrix ran against
        // exactly such a leftover and minted 205 goldens of an app in the
        // misconfigured state — a nav alert reading "dev misconfigured — run
        // `npm run dev`" baked into every cell, and the browse wall showing "The
        // commons is unreachable" instead of its content. Every one of those
        // goldens was DISCARDED and re-minted. A visual gate whose baseline is a
        // broken app is green forever and means nothing.
        //
        // The cost of `false` is that an orphaned server on this port now fails
        // the run loudly ("is already used"). That is the correct trade: loud
        // beats silent, and `substrate-integrity.spec.ts` reds if this line is
        // ever changed back and the substrate goes wrong again.
        reuseExistingServer: false,
        timeout: 120_000,
        // inv-K-5 (K.W2b): point the demo's palette API at the SAME-ORIGIN dev
        // server, so no cross-origin `api.color.babb.dev` fetch fires under the
        // matrix and no CORS preflight error can perturb a golden.
        env: { VITE_API_URL: ORIGIN },
    },
    projects: VISUAL_PROJECTS.map((p) => ({
        ...p,
        // The root config resolves `testDir: "./e2e/visual"` from the repo root;
        // this config already lives there.
        testDir: ".",
        use: { ...p.use, baseURL: ORIGIN },
    })),
});
