import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    root: "/Users/mkbabb/Programming/value.js",
    plugins: [vue()],
    resolve: {
        alias: { "@src": "/Users/mkbabb/Programming/value.js/src" },
    },
    test: {
        include: ["docs/tranches/V/megatranche/audit/components/AdminAuditPanel/pi/*.test.ts"],
        environment: "jsdom",
    },
});
