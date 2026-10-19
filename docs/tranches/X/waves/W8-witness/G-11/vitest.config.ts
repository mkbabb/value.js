// SERVED MODEL: claude-opus-5-5
// X.W8.d · G-11 falsifier harness: the repo's vitest config, with the include
// widened to this witness directory only. Run from the repo root:
//   npx vitest run --config docs/tranches/X/waves/W8-witness/G-11/vitest.config.ts
import path from "path";
import { mergeConfig } from "vitest/config";
import base from "../../../../../../vitest.config";

const repo = path.resolve(import.meta.dirname, "../../../../../..");

const config = mergeConfig(base, { root: repo });
// mergeConfig concatenates arrays; the include is REPLACED so only this suite runs.
config.test = { ...config.test, include: ["docs/tranches/X/waves/W8-witness/G-11/*.test.ts"] };
export default config;
