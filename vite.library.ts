import { readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * The value.js multi-entry library map (O.W1 S3 / O.W2 S1) — the glass-ui
 * `vite.library.ts` pattern adapted for the subpath split.
 *
 * Two tiers:
 *
 *  1. The CURATED root barrel — `index` → `src/index.ts`, emitted as
 *     `dist/value.js` (fileName legacy-preserved by `libraryFileName`). This is
 *     the `"."` monolithic export; its surface is BYTE-COMPATIBLE pre/post split
 *     (the entry source is untouched). Every consumer importing `@mkbabb/value.js`
 *     keeps the full grammar exactly as before.
 *
 *  2. The TRIVIAL subpath barrels — batch-resolved from `src/subpaths/*.ts`
 *     (authored O.W1 S2 / finalized O.W2 S3). Each emits one `dist/<name>.js`
 *     chunk: `color`, `parsing`, `math`, `easing`, `transform`, `units`,
 *     `quantize`. A new subpath barrel is picked up automatically — no hand-edit
 *     here. The headline win: `dist/color.js` (+ the other non-parsing chunks)
 *     are parse-that-FREE and tree-shakeable, where the monolith never was.
 *
 * `package.json` `exports` keys each `import`/`types` at `dist/<name>.js` /
 * `dist/subpaths/<name>.d.ts` — the BUILT chunk keyed by entry name, independent
 * of where the source barrel lives.
 */
export function libraryEntries(rootDir: string): Record<string, string> {
    // Tier 1 — the curated monolithic root (the "." export).
    const curated: Record<string, string> = {
        index: resolve(rootDir, "src/index.ts"),
    };

    // Tier 2 — batch-resolve every `src/subpaths/*.ts` subpath barrel.
    const subpathsDir = resolve(rootDir, "src/subpaths");
    const batched: Record<string, string> = {};
    for (const file of readdirSync(subpathsDir)) {
        if (!file.endsWith(".ts")) continue;
        const name = file.slice(0, -3);
        batched[name] = resolve(subpathsDir, file);
    }

    return { ...curated, ...batched };
}

/** `index` → the legacy `value.js` filename (BC); every subpath entry →
 *  `subpaths/<name>.js`. The subpaths/ prefix is LOAD-BEARING: a flat
 *  `dist/units.js` chunk SHADOWS the mirrored-source `dist/units/` directory, so
 *  the root `index.d.ts`'s `export { ValueUnit } from './units'` would resolve to
 *  the (type-less) chunk instead of `dist/units/index.d.ts` — collapsing
 *  ValueUnit/FunctionValue/ValueArray to `any` (and breaking `instanceof`
 *  narrowing) in every consumer. Emitting subpath chunks under `dist/subpaths/`
 *  (where their `.d.ts` already live) removes the collision. */
export function libraryFileName(_format: string, entryName: string): string {
    return entryName === "index" ? "value.js" : `subpaths/${entryName}.js`;
}

/**
 * Modules never bundled into ANY chunk. `@mkbabb/parse-that` is external so the
 * `./parsing` chunk imports it (resolving to the consumer's own install) rather
 * than inlining it; the non-parsing chunks reference it ZERO times by graph
 * construction (the O.W1 S1 edge severance), so externalizing it is the belt to
 * that suspenders. `prettier` is the optional `formatCSS` peer (externalized
 * since N.W7.B). `vue` keeps the demo plugin's peer out of the library build.
 */
export const libraryExternal: (string | RegExp)[] = [
    "vue",
    "@mkbabb/parse-that",
    /^prettier(\/.*)?$/,
];
