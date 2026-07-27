import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/postcss";
import path from "path";
const R = "/Users/mkbabb/Programming/value.js";
const S = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-slugbar";
export default defineConfig({
    root: R,
    plugins: [vue()],
    css: { postcss: { plugins: [tailwindcss()] } },
    resolve: { alias: { "@src": path.resolve(R, "src") } },
    test: { include: [S + "/*.test.ts"], environment: "jsdom" },
});
