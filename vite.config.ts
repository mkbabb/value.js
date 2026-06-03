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
        },
        // The symlinked `@mkbabb/glass-ui` ships its own nested `vue` in
        // node_modules. Without dedupe the demo loads two Vue instances —
        // two reactivity systems, broken cross-package provide/inject.
        // glass-ui declares `vue` as a peerDependency, so the host's copy is
        // the intended single instance.
        dedupe: ["vue"],
    },
};

// Contract-v2 (docs/precepts/cross-repo-dev-resolution.md §1.2, §2):
// bare `@mkbabb/*` specifiers resolve through the sibling's `exports` map via
// the `file:` symlink in `node_modules`. K.W2 (inv-K-4) added a `development`
// export condition to glass-ui (→ its live `src/`); Vite's built-in serve
// default applies `development`, so the demo `serve` modes now source-resolve
// glass-ui (build-state independent, cohort-/HMR-friendly), while `build` modes
// (`production` condition) resolve the published `dist/` surface. No
// consumer-side `resolve.conditions` override is used (it would REPLACE Vite's
// default list). See the inv-K-4 note below.
//
// `server.fs.allow` widening: NARROWED at E.W0 Lane A (post-glass-ui-9275584
// `./styles.css` adoption) — see `docs/tranches/E/audit/E.W0-lane-a-styles-
// adoption.md`. Glass-ui now ships TWO orthogonal style surfaces:
//
//   `./styles`     — Tailwind-source (src/styles/index.css): tokens,
//                    typography (@font-face + url("../fonts/...woff2")),
//                    theme.css @theme aliases, utilities, @source directive.
//                    Consumer's Tailwind compiler processes this; structurally
//                    `src/`, cannot be pre-compiled without losing semantics.
//   `./styles.css` — SFC-scoped compiled (dist/glass-ui.css): data-v-* scoped
//                    component CSS. Zero @font-face, zero url() refs.
//
// The compiled `./styles.css` surface ABSORBS the SFC-scoped contract-v2
// component-CSS gap, but the Tailwind-source `./styles` surface still ships
// `@font-face` declarations whose `url("../fonts/fira-code/...woff2")` refs
// are resolved RELATIVE to `node_modules/@mkbabb/glass-ui/src/styles/` — i.e.
// they walk OUT of the symlinked package into glass-ui's repo-root `fonts/`
// directory. That walk is the residual reason `server.fs.allow` must reach
// glass-ui's parent (`path.resolve(__dirname, "..")`). The widening is now
// the consumer-side reciprocal of a NARROWED publisher-side gap — only
// font-asset resolution remains; the SFC-scoped component-CSS half is
// closed. Retiring this entirely requires either (a) glass-ui inlining the
// font binaries as base64 data URLs in `dist/glass-ui.css` and exporting the
// `@font-face` declarations through the compiled surface, or (b) the demo
// dropping the Tailwind-source `./styles` import entirely (which would
// forfeit the design-system tokens + Tailwind `@source` class-scanning).
// Neither is appropriate scope for tranche E; filed as a successor concern.
const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];

// inv-K-4 (K.W2) — cross-repo source resolution is handled by glass-ui's
// `development` export condition (added K.W2) + Vite's built-in serve/build
// condition default: Vite applies `development` in `serve` and `production` in
// `build`, so the demo resolves `@mkbabb/glass-ui` from the sibling's live
// `src/` in dev (cohort/HMR against source, build-state independent) and from
// the published `dist/` surface for the gh-pages deploy artifact — no explicit
// `resolve.conditions` override needed (overriding would REPLACE Vite's default
// list and risk other packages' resolution). The CSS `@import
// "@mkbabb/glass-ui/styles*"` keys carry no `development` variant, so they stay
// on the Tailwind-source/dist surface either way. The published library build
// (`production` mode) imports glass-ui never (inv-K-1).

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
                    external: ["vue", "@mkbabb/parse-that"],
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
