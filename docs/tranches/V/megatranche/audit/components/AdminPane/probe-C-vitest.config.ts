// CHALLENGE-C · AdminPane — scratch vitest config for the isolated SFC mount.
// Root is the repo so the SFC's relative imports resolve; nothing here is wired
// into the repo test tree (run explicitly with `--config`).
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    root: "/Users/mkbabb/Programming/value.js",
    plugins: [vue()],
    test: {
        environment: "jsdom",
        include: [
            "docs/tranches/V/megatranche/audit/components/AdminPane/probe-C-mount.test.ts",
        ],
    },
});
