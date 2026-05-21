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
// bare `@mkbabb/*` specifiers resolve through the sibling's `exports` map to
// `dist/` via the `file:` symlink in `node_modules`; the sibling's
// `build:watch` keeps `dist/` fresh under dev-orchestration. Consumer-side
// `resolve.conditions` widening is struck — Vite's defaults (`module`,
// `browser`, `default`) resolve the published surface in every demo mode.
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
                rollupOptions: {
                    external: ["vue", "@mkbabb/parse-that"],
                },
            },
            esbuild: {
                drop: ["console", "debugger"],
            },
            plugins: [...defaultPlugins, dts({ include: ["src/"] })],
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
                rollupOptions: {
                    output: {
                        manualChunks(id) {
                            if (id.includes("node_modules")) {
                                if (id.includes("katex")) return "vendor-katex";
                                if (id.includes("highlight")) return "vendor-highlight";
                            }
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
