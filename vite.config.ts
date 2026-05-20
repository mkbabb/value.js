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
// `server.fs.allow` widening: narrowly retained as an explicit transient.
// glass-ui's `./styles` subpath (`./src/styles/index.css`) violates the
// contract-v2 §2.1 keystone ("no subpath advertises anything but a `dist/`
// artefact") because it ships Tailwind-source CSS that the consumer's
// Tailwind compiler processes — Tailwind-source is structurally `src/` and
// cannot be pre-compiled into `dist/` without losing its semantics. The
// precept's §5 migration map names glass-ui's 41-subpath cleanup as
// outstanding work in the AG fleet; the AG glass-ui-core wave at `ce5aad8`
// landed the root `exports["."]` advance only. Until that subpath migration
// completes (or glass-ui changes its Tailwind-source distribution model —
// see `docs/tranches/D/coordination/Q.md §3`), the demo must `@import
// "@mkbabb/glass-ui/styles"` and Vite must serve the `src/`-relative font
// assets (`url("../fonts/fira-code/…woff2")`) from glass-ui's parent
// directory. This widening is the consumer-side reciprocal of the
// publisher-side gap; it is filed and time-boxed, not silent.
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
                    "lucide-vue-next",
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
