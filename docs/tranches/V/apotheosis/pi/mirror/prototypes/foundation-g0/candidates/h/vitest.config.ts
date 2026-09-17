import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["prototypes/foundation-g0/candidates/h/**/*.test.ts"],
    },
});
