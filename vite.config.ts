import { defineConfig, type Plugin } from "vite";
import path from "path";
import { readFileSync } from "fs";

import Vue from "@vitejs/plugin-vue";

import dts from "vite-plugin-dts";

import tailwindcss from "@tailwindcss/postcss";

import Markdown from "unplugin-vue-markdown/vite";

import { sourceExportPlugin } from "./plugins/vite-source-export";
import { deferGlassFonts } from "./plugins/vite-defer-glass-fonts";
import { injectGroundTokens } from "./demo/color-picker/composables/boot/ground";

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
        // The `@…`-prefixed demo aliases stay STRING finds precisely BECAUSE
        // `@rollup/plugin-alias` prefix-matches strings — `@src/foo/bar` must
        // resolve, and a string find (exact OR `find + "/…"`) is exactly that.
        // NOTE: T.W1 (the demo-dogfood keystone) retired every `@src/*` import
        // from the DEMO tree — the demo now consumes value.js ONLY through the
        // published `@mkbabb/value.js` subpaths (the self-alias set below), never
        // `src/` internals (`tsconfig.demo.json` dropped its `@src/*` path to
        // enforce this at the type level). The `@src` alias SURVIVES here for the
        // EXEMPT `assets/docs/*.md` reference pages, which embed live source
        // snippets via `@src/…?source` (the `sourceExportPlugin`), and for the
        // vitest suite's own `@src` alias in `vitest.config.ts`.
        alias: [
            { find: "@src", replacement: path.resolve(import.meta.dirname, "src") },
            { find: "@styles", replacement: path.resolve(import.meta.dirname, "demo/@/styles") },
            { find: "@components", replacement: path.resolve(import.meta.dirname, "demo/@/components") },
            { find: "@utils", replacement: path.resolve(import.meta.dirname, "demo/@/utils") },
            { find: "@lib", replacement: path.resolve(import.meta.dirname, "demo/@/lib") },
            { find: "@composables", replacement: path.resolve(import.meta.dirname, "demo/@/composables") },
            { find: "@assets", replacement: path.resolve(import.meta.dirname, "assets") },
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
// `server.fs.allow` widening: load-bearing for FONT-ASSET resolution off the
// Tailwind-source `./styles` surface (NARROWED at E.W0 Lane A; see
// `docs/tranches/E/audit/E.W0-lane-a-styles-adoption.md`). glass-ui ships TWO
// orthogonal style surfaces:
//
//   `./styles`     — Tailwind-source (dist/styles/index.css): tokens,
//                    typography (@font-face + url("../fonts/...woff2")),
//                    theme.css @theme aliases, utilities, @source directive.
//                    The consumer's Tailwind compiler processes this surface.
//   `./styles.css` — SFC-scoped compiled (dist/glass-ui.css): data-v-* scoped
//                    component CSS. Zero @font-face, zero url() refs.
//
// The Tailwind-source `./styles` surface ships `@font-face` declarations whose
// `url("../fonts/fira-code/...woff2")` refs resolve RELATIVE to the symlinked
// `dist/styles/` — they walk OUT of the package into glass-ui's repo-root
// `fonts/` directory. That walk is why `server.fs.allow` must reach glass-ui's
// parent (`path.resolve(__dirname, "..")`). This is NOT a source-resolution
// band-aid (the SFC-scoped component-CSS half closed at E.W0); only font-asset
// resolution remains. Retiring it entirely requires glass-ui to inline the
// fonts as data URLs in the compiled surface, or the demo to drop the
// Tailwind-source `./styles` import (forfeiting the design-system tokens +
// Tailwind `@source` class-scanning) — a glass-ui-owned successor concern.
const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];

// U-F23 (G-CANON-4): single-source the boot GroundRecord contract. The
// index.html fouc-guard `<script>` runs pre-module and cannot import
// boot/ground.ts, so its constants (GROUND_RECORD_VERSION, GROUND_STOP_COUNT,
// the FIRST_VISIT seed) are carried as `__GROUND_*__` tokens and resolved here
// at build/serve time through the TS origin's `injectGroundTokens`. A version
// bump in boot/ground.ts propagates into the boot read automatically — no
// hand-duplicated constant survives (the pre-U-F23 fork silently stranded the
// boot guard against a hard-typed `var VERSION = 1`). transformIndexHtml fires
// only when there is an index.html (dev + gh-pages); the library build has none.
function groundRecordInject(): Plugin {
    return {
        name: "value-js:ground-record-inject",
        transformIndexHtml(html) {
            return injectGroundTokens(html);
        },
    };
}

const defaultPlugins = [
    sourceExportPlugin(),
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({}),
    groundRecordInject(),
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
                        "src/v4/**/*.ts",
                        "src/math.ts",
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
                fs: { allow: siblingFsAllowTransient },
            },
            optimizeDeps: {},
            plugins: [...defaultPlugins, deferGlassFonts()],
        };
    }
});
