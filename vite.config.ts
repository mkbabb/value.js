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

// Demo build modes (dev, gh-pages, hero-lab) resolve sibling `@mkbabb/*`
// packages through their `development` conditional export so the demo always
// consumes the siblings' `src/` and never a stale `dist/`. This is scoped to
// the demo modes only — the `production` library build keeps Vite's default
// conditions so it resolves to published `dist/` artefacts.
const demoConditions = ["development", "module", "browser"];

// The demo reaches assets (fonts) inside symlinked sibling packages that live
// outside value.js's root. `fs.allow` must cover the shared parent directory
// or Vite's dev server denies them with a 403.
const demoServerFsAllow = [path.resolve(import.meta.dirname, "..")];

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
            resolve: { ...defaultOptions.resolve, conditions: demoConditions },
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
                fs: { allow: demoServerFsAllow },
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
            resolve: { ...defaultOptions.resolve, conditions: demoConditions },
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
            resolve: { ...defaultOptions.resolve, conditions: demoConditions },
            root: "./demo/color-picker/",
            server: {
                host: true,
                fs: { allow: demoServerFsAllow },
            },
            optimizeDeps: {},
            plugins: [...defaultPlugins],
        };
    }
});
