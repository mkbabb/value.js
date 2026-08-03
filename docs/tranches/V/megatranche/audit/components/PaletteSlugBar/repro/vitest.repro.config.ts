// AUDIT-ONLY vitest config (mega-tranche · PaletteSlugBar challenge-C).
// Lives under docs/ so it cannot alter the shipped gate. Adds @vitejs/plugin-vue
// (the repo's own vitest.config.ts has NO vue plugin — see finding D-9) so that
// the subject SFC can actually be mounted.
import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "../../../../../../../..");

export default defineConfig({
    root: ROOT,
    plugins: [Vue()],
    resolve: {
        alias: { "@src": path.resolve(ROOT, "src") },
    },
    test: {
        include: [
            "docs/tranches/V/megatranche/audit/components/PaletteSlugBar/repro/*.test.ts",
        ],
        environment: "jsdom",
        css: false,
    },
});
