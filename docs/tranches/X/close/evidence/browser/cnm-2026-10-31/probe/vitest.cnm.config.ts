// SERVED MODEL: claude-opus-5-5 — X.W11.cnm: runs accent-walk.test.ts under the repo's vitest config.
import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../../../../../../vitest.config";
export default mergeConfig(base, defineConfig({ test: { include: ["docs/tranches/X/close/evidence/browser/cnm-2026-10-31/probe/accent-walk.test.ts"] } }));
