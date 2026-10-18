// SERVED MODEL: claude-opus-5-5
//
// X.W11.d · G7 — the one-time falsifier re-demonstration (W11.md G7 Falsifier).
// The ROOT playwright config, unchanged, with exactly one variable moved: the
// `smoke` project's testDir points at this directory, which holds a copy of
// e2e/smoke/views/browse-loading.spec.ts with one true assertion inverted.
// Same harness, same server, same engine; e2e/ is not written.
import { defineConfig } from "@playwright/test";
import root from "../../../../../../../playwright.config.ts";

const smoke = root.projects!.find((p) => p.name === "smoke")!;
const REPO = new URL("../../../../../../../", import.meta.url).pathname;
// webServer runs from the CONFIG's directory unless told otherwise; pin it to
// the repo root so the server is the root config's own, byte for byte.
const webServer = [root.webServer!].flat().map((w) => ({ ...w, cwd: REPO }));

export default defineConfig({
    ...root,
    webServer,
    testDir: import.meta.dirname,
    projects: [
        {
            ...smoke,
            name: "smoke-falsifier",
            testDir: import.meta.dirname,
            testIgnore: [],
        },
    ],
});
