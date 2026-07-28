import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    test: {
        root: "/Users/mkbabb/Programming/value.js",
        include: [
            "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/KTX-repro.test.ts",
        ],
        environment: "jsdom",
    },
});
