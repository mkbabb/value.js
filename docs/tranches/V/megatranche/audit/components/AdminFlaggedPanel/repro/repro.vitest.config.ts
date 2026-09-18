import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

const REPO = "/Users/mkbabb/Programming/value.js";

export default defineConfig({
    root: REPO,
    plugins: [vue()],
    resolve: {
        alias: {
            "@src": path.resolve(REPO, "src"),
        },
    },
    test: {
        include: [
            "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/flagged-a11y.test.ts",
        ],
        environment: "jsdom",
        css: false,
    },
});
