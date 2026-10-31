// SERVED MODEL: claude-opus-5-5
// X.W11.e2b: the cell's renderer, read the way `useRealGpuCell` reads it.
import { test } from "@playwright/test";
import { detectRenderer } from "../../../../../../../../e2e/smoke/perf/frame-budget";
test("renderer of the cell", async ({ page }) => {
    await page.goto("/");
    console.log(`[e2b-renderer] ${await detectRenderer(page)}`);
});
