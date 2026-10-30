// SERVED MODEL: claude-opus-5-5 — X.W11.ref: runs field-maximin.test.ts under the repo's vitest config.
import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../../../../../../vitest.config";
export default mergeConfig(base, defineConfig({ test: { include: ["docs/tranches/X/close/evidence/browser/ref-2026-10-30/probe/field-maximin.test.ts"] } }));
