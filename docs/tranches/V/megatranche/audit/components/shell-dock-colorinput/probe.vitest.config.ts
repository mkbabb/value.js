import { defineConfig } from "vitest/config";
import path from "path";

// CHALLENGE-L probe harness. Read-only: runs ONE spec that lives beside it and
// imports the live demo composables by relative path. Nothing under src/ demo/
// test/ e2e/ is touched.
const repoRoot = path.resolve(import.meta.dirname, "../../../../../../..");

export default defineConfig({
    root: repoRoot,
    resolve: {
        alias: [
            { find: "@src", replacement: path.resolve(repoRoot, "src") },
            {
                find: /^@mkbabb\/value\.js\/color$/,
                replacement: path.resolve(repoRoot, "dist/subpaths/color.js"),
            },
            {
                find: /^@mkbabb\/value\.js\/css$/,
                replacement: path.resolve(repoRoot, "dist/subpaths/css.js"),
            },
        ],
    },
    test: {
        include: [
            "docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/*.probe.ts",
        ],
        environment: "jsdom",
    },
});
