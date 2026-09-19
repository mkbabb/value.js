import { defineConfig } from "vite";
import path from "path";
import { readFileSync } from "fs";

import Vue from "@vitejs/plugin-vue";

import dts from "vite-plugin-dts";

import tailwindcss from "@tailwindcss/postcss";

import Markdown from "unplugin-vue-markdown/vite";

import { sourceExportPlugin } from "./plugins/vite-source-export";
import { deferGlassFonts } from "./plugins/vite-defer-glass-fonts";
import { groundTokensPlugin } from "./plugins/vite-ground-tokens";

import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
} from "./vite.library";

// value.js self-alias set, derived from this repo's own `package.json#exports`.
// The demo and its current sibling builds consume Value through bare package
// subpaths. A package does not install itself, so these exact aliases point the
// seven public specifiers at this checkout's freshly-built published surface.
//
// GENERATED (not hand-rolled) so the alias set can never drift from the exports
// map: add or rename a subpath in `package.json#exports` and the alias follows.
// Each entry is an ANCHORED regex (`^…$`), which makes resolution
// order-independent and — critically — subpath-safe. The prior object-form
// STRING alias was a prefix rewrite (`@rollup/plugin-alias` matches a string
// find as exact OR `find + "/…"`), so `@mkbabb/value.js/math` rewrote to
// `dist/value.js/math` — a path INTO the `dist/value.js` FILE → "Not a
// directory" → the R-era demo boot break. Anchored regexes cannot prefix-match,
// so the bare `.` entry never swallows a subpath specifier.
const VALUE_JS_PKG = JSON.parse(
    readFileSync(path.resolve(import.meta.dirname, "package.json"), "utf8"),
) as { exports: Record<string, { import: string }> };

const valueJsSelfAlias = Object.entries(VALUE_JS_PKG.exports).map(
    ([subpath, conditions]) => {
        const specifier = "@mkbabb/value.js" + subpath.slice(1);
        const escaped = specifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return {
            find: new RegExp(`^${escaped}$`),
            replacement: path.resolve(import.meta.dirname, conditions.import),
        };
    },
);

const defaultOptions = {
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },

    resolve: {
        // Array form (not object form): the value.js self-aliases MUST be
        // anchored-regex finds (see `valueJsSelfAlias` above — object-form
        // string aliases are prefix rewrites and mangle the `/math` subpath).
        // T.W1 (the demo-dogfood keystone) retired every `@src/*` import from the
        // DEMO tree — the demo consumes value.js ONLY through the published
        // `@mkbabb/value.js` subpaths (the self-alias set below), never `src/`
        // internals (`tsconfig.demo.json` dropped its `@src/*` path).
        alias: [
            // W43 (RF-15) killed the demo `@…` path aliases: every demo import
            // is now relative to its physical home (color-session/palettes/
            // platform/shell/shared/scenes + the feature trees). `@src` SURVIVES
            // for the EXEMPT `assets/docs/*.md` reference pages, which embed live
            // source snippets via `@src/…?source` (the `sourceExportPlugin`), and
            // for the vitest suite's own `@src` alias in `vitest.config.ts`.
            { find: "@src", replacement: path.resolve(import.meta.dirname, "src") },
            ...valueJsSelfAlias,
        ],
        // glass-ui's published `dist/` externalizes `vue` + `reka-ui` (it
        // imports them by bare specifier) but its symlinked package ALSO ships
        // its own nested `vue` + `reka-ui` under `node_modules`. Without dedupe
        // those externalized bare imports resolve to glass-ui's NESTED copies
        // while the demo's own imports resolve to the host copies — two Vue
        // reactivity systems + two reka-ui instances (broken cross-package
        // provide/inject, a Teleport-patch `insertBefore` NotFoundError when a
        // glass-ui portal mounts against a split `@vue/runtime-*` internal).
        // Deduping the full `@vue/*` family + `reka-ui` collapses every
        // cross-package import to the host's single instance. glass-ui declares
        // these as peerDependencies, so the host copy is the intended one. This
        // is the structural guarantee that the dist-resolution posture
        // (N.W1.C / mechanism-C) yields a single externalized vue/reka instance
        // — load-bearing for the gh-pages build, NOT a source-resolution
        // band-aid (it is the half that MAKES dist-resolution single-instance).
        dedupe: [
            "vue",
            "@vue/runtime-core",
            "@vue/runtime-dom",
            "@vue/reactivity",
            "@vue/shared",
            "reka-ui",
        ],
    },
};

// Cross-repo resolution (N.W1.C / mechanism-C, supersedes the K.W2 inv-K-4
// `development`-condition posture): bare `@mkbabb/glass-ui` specifiers resolve
// through the sibling's `exports` map via the `file:` symlink in
// `node_modules`. The `development` export condition K.W2 introduced was a
// contract-v2 precept violation (it source-resolved glass-ui and caused the
// dual-instance fragility); it was abrogated constellation-wide. glass-ui's
// `exports` map now carries ONLY `{types, import, default}` (all → `dist/`), so
// the demo resolves glass-ui from its published `dist/` surface in every mode —
// no `customConditions`/`resolve.conditions` override, no source-resolution.
// During co-development the dist is kept fresh by `build:watch`
// (`dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)`); there is no mid-edit source
// consumption at any hop. The published value.js library build (`production`
// mode) imports glass-ui NEVER (inv-K-1, eslint-enforced).
//
// `server.fs.allow`: DELETED at X.W5.a under COHESION §0j.A **DR-14** (the
// owner's verb: DELETE) and §0k.1 **RS-1** (*"DR-14's DELETE rides X-W5's
// existing `vite.config.ts` modify-carve"*). The carve-out allowed the whole
// sibling directory so a `url("../fonts/…woff2")` in glass-ui's Tailwind-source
// `./styles` surface could walk OUT of the package into a repo-root `fonts/`.
// It is dead at the installed bytes, measured this unit: `@mkbabb/glass-ui` is
// an ordinary directory under `node_modules` with no `fonts/` at its root, and
// its shipped `dist/` carries ZERO `url("../fonts` references — the walk the
// allowance existed for has no target, and vite's own workspace root covers
// what remains. The ruling's rationale, verbatim: *a transient carve-out is a
// compat shim by another name (no-backwards-compat law); the name may not
// survive X either way.*

// U-F23 (G-CANON-4): single-source the boot GroundRecord contract. The
// index.html fouc-guard `<script>` runs pre-module and cannot import
// boot/ground.ts, so its constants (GROUND_RECORD_VERSION, GROUND_STOP_COUNT,
// the FIRST_VISIT seed) are carried as `__GROUND_*__` tokens resolved at
// build/serve time through the TS origin. A version bump in boot/ground.ts
// propagates into the boot read automatically — no hand-duplicated constant
// survives (the pre-U-F23 fork silently stranded the boot guard against a
// hard-typed `var VERSION = 1`). X.W5.a (App L-3): the transform itself moved
// to `plugins/vite-ground-tokens.ts` — the split is by LIFETIME, so a node-only
// HTML transform no longer rides inside a browser module and this config no
// longer reaches across the demo's boundary to import one.

const defaultPlugins = [
    sourceExportPlugin(),
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({}),
    groundTokensPlugin(),
];

export default defineConfig((mode) => {
    if (mode.mode === "production") {
        return {
            ...defaultOptions,
            optimizeDeps: {},
            build: {
                minify: true,
                lib: {
                    // The seven literal package capabilities are the complete
                    // library graph; there is no root or compatibility entry.
                    entry: libraryEntries(import.meta.dirname),
                    fileName: libraryFileName,
                    formats: ["es"],
                },
                rolldownOptions: {
                    external: libraryExternal,
                    // H.W4 Lane A — strip per-module `//#region src/...` source-
                    // navigation markers from emitted library chunks. Default is
                    // `'simple'`, which emits one `//#region` + `//#endregion`
                    // pair per source module (artefact of the G.W1 1→9-module
                    // color/conversions decomposition; ~+314 B in the published
                    // bundle). `'none'` attaches no debug information and is
                    // appropriate for the library build, where the bundled
                    // output is consumed verbatim by downstream packages and
                    // source-navigation lives in the sourcemap, not in inline
                    // comments. See
                    // `node_modules/rolldown/dist/shared/define-config-
                    // CeKzMIcs.d.mts:3613-3625` (`AttachDebugOptions`).
                    experimental: {
                        attachDebugInfo: "none",
                    },
                },
            },
            esbuild: {
                drop: ["console", "debugger"],
            },
            plugins: [
                ...defaultPlugins,
                // Emit declarations beside the seven literal runtime entries.
                // Overriding `rootDir` keeps vite-plugin-dts from mirroring the
                // source tree under `dist/src/`; `outDir` is the package's
                // declared `dist/subpaths/` trust boundary.
                dts({
                    // K.W2 tsconfig split: the root `tsconfig.json` is now a
                    // thin solution file (`files: []` + references), which
                    // starves vite-plugin-dts of source files. Point it at the
                    // PUBLISHED library program (`src/` only) so the dts program
                    // sees the same source set the runtime bundle does.
                    tsconfigPath: path.resolve(import.meta.dirname, "tsconfig.lib.json"),
                    include: [
                        "src/subpaths/color.ts",
                        "src/subpaths/value.ts",
                        "src/subpaths/css.ts",
                        "src/subpaths/easing.ts",
                        "src/subpaths/math.ts",
                        "src/subpaths/transform.ts",
                        "src/subpaths/quantize.ts",
                        "src/color/**/*.ts",
                        "src/css/**/*.ts",
                        "src/foundation/**/*.ts",
                        "src/value.ts",
                        "src/easing.ts",
                        "src/quantize.ts",
                        "src/transform/**/*.ts",
                    ],
                    compilerOptions: {
                        rootDir: path.resolve(import.meta.dirname, "src"),
                    },
                    outDir: path.resolve(import.meta.dirname, "dist/subpaths"),
                    entryRoot: path.resolve(import.meta.dirname, "src"),
                    rollupTypes: true,
                }),
            ],
        };
    } else if (mode.mode === "gh-pages") {
        return {
            ...defaultOptions,
            base: "./",
            root: "./demo/color-picker/",
            build: {
                outDir: path.resolve(import.meta.dirname, "./dist/gh-pages"),
                emptyOutDir: true,
                minify: true,
                sourcemap: false,
                rolldownOptions: {
                    output: {
                        // Declarative code-splitting (Rolldown 1.x). Replaces
                        // the legacy `manualChunks` function-form per the
                        // deprecation notice in
                        // node_modules/rolldown/dist/shared/define-config-
                        // CeKzMIcs.d.mts:784 ("Please use `codeSplitting`
                        // instead"). Each group's `test` regex captures
                        // modules under `node_modules/<pkg>/`; matched
                        // modules are emitted into a chunk whose `[name]`
                        // placeholder is filled from the group's `name`.
                        // Path separator is `[\\/]` per Rolldown's Windows
                        // guidance at d.mts:1050.
                        codeSplitting: {
                            groups: [
                                {
                                    name: "vendor-katex",
                                    test: /node_modules[\\/]katex/,
                                },
                                {
                                    name: "vendor-highlight",
                                    test: /node_modules[\\/]highlight/,
                                },
                            ],
                        },
                    },
                },
            },
            plugins: [...defaultPlugins, deferGlassFonts()],
        };
    } else {
        // Dev mode: serve the demo app with HMR
        return {
            ...defaultOptions,
            root: "./demo/color-picker/",
            server: {
                host: true,
            },
            optimizeDeps: {},
            plugins: [...defaultPlugins, deferGlassFonts()],
        };
    }
});
