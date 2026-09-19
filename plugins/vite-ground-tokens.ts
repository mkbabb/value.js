/**
 * vite-ground-tokens — the BUILD-TIME half of the ground contract.
 *
 * X.W5.a (App **L-3**): `boot/ground.ts` carried a browser contract AND a
 * node-only HTML transform in one module — two lifetimes in one file, so the
 * app chunk imported a function only vite ever calls and the config imported
 * across the demo's own boundary to reach it. The split is by LIFETIME, not by
 * concern: the RECORD (`GROUND_STORE_KEY`, the version, the stop count, the
 * first-visit constants, the normalizer and the builder) stays with the boot
 * chain that reads and writes it at runtime; the TRANSFORM lives here, beside
 * its two sibling plugins, and runs only in a node process.
 *
 * What it does (U-F23 · G-CANON-4). The boot reader — index.html's fouc-guard
 * `<script>` — runs PRE-MODULE, before any ES module loads, synchronously, for
 * a no-FOUC first paint, so it cannot import the ground record. Rather than
 * hand-duplicate `GROUND_RECORD_VERSION` / `GROUND_STOP_COUNT` / the
 * first-visit seed as vanilla-JS literals (the pre-U-F23 fork, where a bump in
 * the TS origin silently stranded the boot guard against a hard-typed
 * `var VERSION = 1`), the boot HTML carries `__GROUND_*__` tokens that vite's
 * `transformIndexHtml` resolves through the TS origin at build/serve time. The
 * constants therefore DERIVE from that module by construction: bump one there
 * and the injected boot guard tracks automatically.
 *
 * `transformIndexHtml` fires only where an index.html exists (dev + gh-pages);
 * the library build has none.
 */
import type { Plugin } from "vite";

import {
    FIRST_VISIT_GROUND,
    GROUND_RECORD_VERSION,
    GROUND_STOP_COUNT,
} from "../demo/color-picker/composables/boot/ground";

/** Resolve every `__GROUND_*__` token in the boot HTML against the record. */
export function injectGroundTokens(html: string): string {
    let out = html
        .replaceAll("__GROUND_RECORD_VERSION__", String(GROUND_RECORD_VERSION))
        .replaceAll("__GROUND_STOP_COUNT__", String(GROUND_STOP_COUNT))
        .replaceAll("__GROUND_FIRST_VISIT__", JSON.stringify(FIRST_VISIT_GROUND));
    // The @property initial-values + the theme-color base stop are the LIGHT
    // first-visit seed (the material that paints ONLY if the boot script itself
    // fails); single-source them too so no first-visit literal is hand-typed.
    FIRST_VISIT_GROUND.light.forEach((hex, i) => {
        out = out.replaceAll("__GROUND_LIGHT_" + i + "__", hex);
    });
    return out;
}

export function groundTokensPlugin(): Plugin {
    return {
        name: "value-js:ground-record-inject",
        transformIndexHtml(html) {
            return injectGroundTokens(html);
        },
    };
}
