import { defineConfig } from "vitest/config";
import path from "path";
export default defineConfig({
    resolve: { alias: { "@src": path.resolve("/Users/mkbabb/Programming/value.js", "src") } },
    test: {
        include: ["/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/repro/**/*.test.ts"],
        environment: "jsdom",
    },
});
