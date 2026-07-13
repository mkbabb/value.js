import { defineConfig } from "vitest/config";
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
        include: ["test/**/*.ts"],
        environment: "jsdom",
    },
});
