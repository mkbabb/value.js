import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: [
            "apotheosis/test/**/*.test.ts",
            "cells/**/test/**/*.test.ts",
        ],
    },
});
