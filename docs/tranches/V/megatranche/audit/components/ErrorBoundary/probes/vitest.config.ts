import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

const R = "/Users/mkbabb/Programming/value.js";
const P = R + "/docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes";

export default defineConfig({
    root: R,
    plugins: [vue()],
    resolve: {
        alias: {
            "@src": path.resolve(R, "src"),
            "@demo": path.resolve(R, "demo"),
        },
    },
    test: { include: [P + "/*.test.ts"], environment: "jsdom" },
});
