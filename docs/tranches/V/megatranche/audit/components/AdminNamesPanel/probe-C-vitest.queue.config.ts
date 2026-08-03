import { defineConfig } from "vitest/config";

const SCRATCH =
    "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

export default defineConfig({
    root: "/Users/mkbabb/Programming/value.js",
    test: {
        include: [`${SCRATCH}/dup-key-repro.test.ts`],
        environment: "jsdom",
    },
});
