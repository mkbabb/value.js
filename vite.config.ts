import { defineConfig } from "vite";
import path from "path";

import Vue from "@vitejs/plugin-vue";

import dts from "vite-plugin-dts";

import tailwindcss from "@tailwindcss/postcss";

import Markdown from "unplugin-vue-markdown/vite";

import { sourceExportPlugin } from "./plugins/vite-source-export";

const defaultOptions = {
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },

    resolve: {
        alias: {
            "@src": path.resolve(import.meta.dirname, "src"),
            "@styles": path.resolve(import.meta.dirname, "demo/@/styles"),
            "@components": path.resolve(import.meta.dirname, "demo/@/components"),
            "@utils": path.resolve(import.meta.dirname, "demo/@/utils"),
            "@lib": path.resolve(import.meta.dirname, "demo/@/lib"),
            "@composables": path.resolve(import.meta.dirname, "demo/@/composables"),
            "@assets": path.resolve(import.meta.dirname, "assets"),
            // inv-K-2 / mechanism-C (N.W1.C): glass-ui's aurora color path
            // consumes the value.js canonical core via the bare
            // `@mkbabb/value.js` specifier. glass-ui's published `dist/`
            // (aurora.js, color-*.js) imports those symbols by that name; under
            // dist-resolution (N.W1.C) the demo resolves glass-ui from its dist,
            // so those imports must point at THIS repo's own published surface.
            // A package never installs itself — there is no
            // `node_modules/@mkbabb/value.js` to walk up to — so we alias the
            // bare specifier to value.js's OWN `dist/value.js`. This makes the
            // whole graph consume ONE consistent published value.js surface
            // (the demo's own `@src` imports + glass-ui's `@mkbabb/value.js`
            // imports both land on the same library, dist for glass-ui's path).
            // Repointed src→dist at N.W1.C (the K.W2.5 mechanism-C remainder):
            // dist-resolution everywhere, kept fresh by `build:watch` (dev.sh).
            "@mkbabb/value.js": path.resolve(import.meta.dirname, "dist/value.js"),
        },
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

const defaultPlugins = [
    sourceExportPlugin(),
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({}),
];

export default defineConfig((mode) => {
    if (mode.mode === "production") {
        return {
            ...defaultOptions,
            optimizeDeps: {},
            build: {
                minify: true,
                lib: {
                    entry: path.resolve(import.meta.dirname, "src/index.ts"),
                    name: "Value",
                    fileName: "value",
                    formats: ["es"],
                },
                rolldownOptions: {
                    // `prettier` is externalized (N.W7.B): the `formatCSS` lazy
                    // wrapper (`parsing/serialize.ts`) dynamic-imports
                    // `prettier` + `prettier/plugins/postcss`. Without this,
                    // Rolldown bundles Prettier's standalone+postcss (~304 KB
                    // raw / 52% of the unpacked tarball — E3 F-1) into
                    // `dist/postcss-*.js` + `dist/standalone-*.js`; every
                    // consumer ships it, and a `formatCSS` user gets a copy
                    // that can't dedup against their own Prettier. Externalized,
                    // the dynamic `import("prettier")` resolves to the
                    // consumer's own install. `prettier` is declared an OPTIONAL
                    // peerDependency (package.json `peerDependenciesMeta`), so a
                    // non-`formatCSS` consumer never installs it and pays zero
                    // ship-weight; a `formatCSS` consumer (e.g. keyframes.js,
                    // which already depends on prettier) supplies their own.
                    external: ["vue", "@mkbabb/parse-that", /^prettier(\/.*)?$/],
                    // H.W4 Lane A — strip per-module `//#region src/...` source-
                    // navigation markers from `dist/value.js`. Default is
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
                // Flatten the emitted dts tree so `dist/index.d.ts` lives at
                // the path package.json `"types"` + `exports["."].types`
                // claim. vite-plugin-dts infers `publicRoot` from the common
                // ancestor of the program's source files; with only
                // `entryRoot` set, the plugin still mirrors the source layout
                // under `dist/src/`, which breaks every TS consumer with
                // TS7016. Overriding `compilerOptions.rootDir` anchors
                // `publicRoot` at `<repo>/src` so the pairing collapses the
                // tree to a flat `dist/{index,units,parsing,...}` shape —
                // parallel to the runtime `dist/value.js`.
                dts({
                    // K.W2 tsconfig split: the root `tsconfig.json` is now a
                    // thin solution file (`files: []` + references), which
                    // starves vite-plugin-dts of source files. Point it at the
                    // PUBLISHED library program (`src/` only) so the dts program
                    // sees the same source set the runtime bundle does.
                    tsconfigPath: path.resolve(import.meta.dirname, "tsconfig.lib.json"),
                    include: ["src/"],
                    compilerOptions: {
                        rootDir: path.resolve(import.meta.dirname, "src"),
                    },
                    entryRoot: path.resolve(import.meta.dirname, "src"),
                }),
            ],
        };
    } else if (mode.mode === "hero-lab") {
        return {
            ...defaultOptions,
            base: "./",
            root: "./demo/hero-lab/",
            build:
                mode.command === "build"
                    ? {
                          outDir: path.resolve(import.meta.dirname, "./dist/hero-lab"),
                          emptyOutDir: true,
                          minify: true,
                          sourcemap: false,
                      }
                    : undefined,
            server: {
                host: true,
                fs: { allow: siblingFsAllowTransient },
            },
            optimizeDeps: {
                include: [
                    "vue",
                    "reka-ui",
                    "@vueuse/core",
                    "@lucide/vue",
                ],
            },
            plugins: [...defaultPlugins],
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
            plugins: [...defaultPlugins],
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
            plugins: [...defaultPlugins],
        };
    }
});
