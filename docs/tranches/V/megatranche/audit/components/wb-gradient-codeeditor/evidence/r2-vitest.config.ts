// Audit-only vitest config: same resolution as the repo root, `include`
// widened to this evidence directory so the oracle can run WITHOUT touching
// `test/` (no source edits land from this formation).
//   npx vitest run --config docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/r2-vitest.config.ts
import { configDefaults, defineConfig } from "vitest/config";
import path from "path";

const root = path.resolve(import.meta.dirname, "../../../../../../../..");

export default defineConfig({
    root,
    resolve: { alias: { "@src": path.resolve(root, "src") } },
    test: {
        include: [
            "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence/*.test.ts",
        ],
        exclude: configDefaults.exclude.filter((p) => !p.includes("dist")),
        environment: "jsdom",
    },
});
