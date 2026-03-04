import { defineConfig } from "vite";
import type { Plugin } from "vite";
import path from "path";
import { readFileSync } from "fs";

import Vue from "@vitejs/plugin-vue";

import dts from "vite-plugin-dts";

import tailwindcss from "@tailwindcss/postcss";

import Markdown from "unplugin-vue-markdown/vite";

/**
 * Vite plugin: extracts exported function source text from utils.ts
 * at build time, serving them as named string exports from a virtual module.
 *
 * Usage in markdown files:
 *   import { rgb2hsl, hsl2rgb } from "virtual:color-source";
 */
function colorSourcePlugin(): Plugin {
    const virtualId = "virtual:color-source";
    const resolvedId = "\0" + virtualId;

    return {
        name: "color-source",
        resolveId(id) {
            if (id === virtualId) return resolvedId;
        },
        load(id) {
            if (id !== resolvedId) return;

            const filePath = path.resolve(import.meta.dirname, "src/units/color/utils.ts");
            const raw = readFileSync(filePath, "utf-8");

            // Find all exported functions/consts and extract their source
            const exportRe = /export\s+(?:const|function)\s+(\w+)/g;
            const entries: string[] = [];
            let m: RegExpExecArray | null;

            while ((m = exportRe.exec(raw)) !== null) {
                const name = m[1];
                const start = m.index;

                // Find matching closing brace via brace counting
                const openBrace = raw.indexOf("{", start);
                if (openBrace === -1) continue;

                let depth = 0;
                let inStr = false;
                let strChar = "";
                let end = -1;

                for (let i = openBrace; i < raw.length; i++) {
                    const ch = raw[i];
                    if (inStr) {
                        if (ch === "\\" ) { i++; continue; }
                        if (ch === strChar) inStr = false;
                        continue;
                    }
                    if (ch === '"' || ch === "'" || ch === "`") {
                        inStr = true;
                        strChar = ch;
                        continue;
                    }
                    if (ch === "{") depth++;
                    if (ch === "}") {
                        depth--;
                        if (depth === 0) {
                            end = raw[i + 1] === ";" ? i + 2 : i + 1;
                            break;
                        }
                    }
                }

                if (end === -1) continue;
                const source = raw.slice(start, end).replace(/^export\s+/, "");
                entries.push(`export const ${name} = ${JSON.stringify(source)};`);
            }

            return entries.join("\n");
        },
    };
}

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
    },
};

const defaultPlugins = [
    colorSourcePlugin(),
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
                    formats: ["es", "cjs"],
                },
                rollupOptions: {
                    external: ["vue"],
                },
            },
            esbuild: {
                drop: ["console", "debugger"],
            },
            plugins: [...defaultPlugins, dts({ rollupTypes: true })],
        };
    } else if (mode.mode === "gh-pages") {
        return {
            ...defaultOptions,
            base: "./",
            root: "./demo/color-picker/",
            build: {
                outDir: path.resolve(import.meta.dirname, "./dist/"),
                emptyOutDir: true,
                minify: true,
                sourcemap: false,
                rollupOptions: {
                    output: {
                        manualChunks(id) {
                            if (id.includes("node_modules")) {
                                if (id.includes("katex")) return "vendor-katex";
                                if (id.includes("prettier")) return "vendor-prettier";
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
            },
            optimizeDeps: {
                include: [
                    "vue",
                    "reka-ui",
                    "@vueuse/core",
                    "lucide-vue-next",
                    "vue-sonner",
                    "katex",
                    "highlight.js/lib/core",
                    "prettier",
                ],
            },
            plugins: [...defaultPlugins],
        };
    }
});
