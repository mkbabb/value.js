import { configDefaults, defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@src": path.resolve(import.meta.dirname, "src"),
            // S.W5 Lane C: the gradient strict-parser unit tests import the
            // demo composable, which reaches @lib/color-utils transitively.
            "@lib": path.resolve(import.meta.dirname, "demo/@/lib"),
            // S.W7-4: the accent contrast probe reads the REAL view schema
            // (viewSchema.ts is pure data — safe outside a Vue app).
            "@composables": path.resolve(
                import.meta.dirname,
                "demo/@/composables",
            ),
        },
    },
    test: {
        // T.W1-src §5: the test tree mirrors the src shape (test/units/color/…,
        // test/parsing/…, test/transform/, test/quantize/); the flat `test/*.ts`
        // glob would miss every mirrored subdir.
        // V′.W40-S3 bracket B7: the two relocated aurora suites live under
        // `demo/test/glass/`; extend the include so they are discovered and run
        // (they were silently dropped outside the `test/**` glob).
        include: ["test/**/*.ts", "demo/test/**/*.ts"],
        // U.W-CANON (U-F49/U-F50): the repo-hygiene gates live in `test/dist/`,
        // but vitest's default exclude swallows `**/dist/**`. `include` is scoped
        // to `test/**` and `test/dist` is the ONLY dist dir under it, so drop just
        // the dist rule (node_modules / cypress / config excludes untouched) to
        // auto-discover them under `npm test`.
        exclude: configDefaults.exclude.filter((p) => !p.includes("dist")),
        environment: "jsdom",
    },
});
