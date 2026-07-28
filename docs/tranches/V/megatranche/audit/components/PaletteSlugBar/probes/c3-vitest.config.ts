import { configDefaults, defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

const ROOT = "/Users/mkbabb/Programming/value.js";

export default defineConfig({
    root: ROOT,
    plugins: [vue()],
    resolve: { alias: { "@src": path.resolve(ROOT, "src") } },
    test: {
        include: [
            "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/slugbar.probe.test.ts",
        ],
        exclude: configDefaults.exclude.filter((p) => !p.includes("dist")),
        environment: "jsdom",
    },
});
