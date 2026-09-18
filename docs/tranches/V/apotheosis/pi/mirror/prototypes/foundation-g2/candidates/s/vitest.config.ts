import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["foundation-g2-s.test.ts"],
        testTimeout: 15_000,
    },
});

