// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — the bench's own vitest program. The root `vitest.config.ts` collects `test/**` and
// `demo/test/**` only; the bench of record and the differential against the retired hand parser
// live here, beside the corpus they read, and run on demand:
//   npx vitest bench --run -c bench/vitest.config.ts      (the timing bench, `*.bench.ts`)
//   npx vitest run -c bench/vitest.config.ts              (the differential, `*.measure.test.ts`)
// Both read library source only (no SFC, no DOM), so the program carries no plugin and runs in node.
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["bench/**/*.measure.test.ts"],
        benchmark: { include: ["bench/**/*.bench.ts"] },
        environment: "node",
    },
});
