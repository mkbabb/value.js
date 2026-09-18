import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import path from "path";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../../../..");

export default defineConfig({
    root: repoRoot,
    plugins: [Vue()],
    resolve: {
        alias: { "@src": path.resolve(repoRoot, "src") },
    },
    test: {
        include: ["docs/tranches/V/megatranche/audit/components/Markdown/repro/*.repro.test.ts"],
        environment: "jsdom",
    },
});
