// Pass-4 harness config. Unlike `c3-vitest.config.ts` (whose `include` pointed
// at a session scratchpad that no longer exists — see C-35), this resolves the
// probe RELATIVE TO ITSELF, so it runs from a clean checkout.
//
//   npx vitest run --config docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/c4-vitest.config.ts
import { configDefaults, defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../../../../../.."); // → repo root

export default defineConfig({
    root: ROOT,
    plugins: [vue()],
    resolve: { alias: { "@src": path.resolve(ROOT, "src") } },
    test: {
        include: [path.join(HERE, "c4-slugbar.probe.test.ts")],
        exclude: configDefaults.exclude.filter((p) => !p.includes("dist")),
        environment: "jsdom",
    },
});
