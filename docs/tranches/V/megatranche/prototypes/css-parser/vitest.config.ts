import { defineConfig } from "vitest/config";

// The prototype workspace is nested inside value.js, whose root `vitest.config.ts`
// scopes `include` to `test/**` + `demo/test/**`. Without a local config vitest
// walks up, finds the root config, and reports "No test files found". This config
// is deliberately minimal: node environment, colocated `*.test.ts`.
export default defineConfig({
    test: {
        include: ["**/*.test.ts"],
        exclude: ["node_modules/**"],
        environment: "node",
    },
});
