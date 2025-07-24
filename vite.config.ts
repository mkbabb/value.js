import { defineConfig } from "vite";
import path from "path";

import VueMacros from "unplugin-vue-macros/vite";
import Vue from "@vitejs/plugin-vue";

import dts from "vite-plugin-dts";

import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

import Markdown from "unplugin-vue-markdown/vite";

const defaultOptions = {
    base: "./",
    css: {
        postcss: {
            plugins: [tailwindcss(), autoprefixer()],
        },
    },

    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@styles": path.resolve(__dirname, "demo/@/styles"),
            "@components": path.resolve(__dirname, "demo/@/components"),
            "@utils": path.resolve(__dirname, "demo/@/utils"),
            "@assets": path.resolve(__dirname, "assets"),
        },
    },
};

const defaultPlugins = [
    VueMacros({
        betterDefine: false,
        plugins: {
            vue: Vue({ include: [/\.vue$/, /\.md$/] }),
        },
    }),
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
                    entry: path.resolve(__dirname, "src/units/index.ts"),
                    name: "Value",
                    fileName: "value",
                    formats: ["es", "cjs"],
                },
                rollupOptions: {
                    external: ["vue"],
                },
            },
            plugins: [...defaultPlugins, dts({ rollupTypes: true })],
        };
    } else if (mode.mode === "gh-pages") {
        return {
            ...defaultOptions,
            root: "./demo/color-picker/",
            build: {
                outDir: path.resolve(__dirname, "./dist/"),
                emptyOutDir: true,
                minify: true,
                sourcemap: true,
            },
            plugins: [...defaultPlugins],
        };
    } else {
        return {
            ...defaultOptions,
            plugins: [...defaultPlugins],
        };
    }
});