import { test, expect } from "@playwright/test";
import {
    SCENES,
    expectColdLoadSettled,
    installColdLoadWitness,
} from "../fixtures/cold-load";

/**
 * The prerendered first view (`/` on the BUILT bundle, the only origin that
 * serves the shell): it paints from the HTML, so the cold-load law holds only
 * if the HTML carries everything its first frame shows. Two holes, both
 * measured on the built bundle at 1440 on the GPU lane before the cure:
 *   · About's chunk sheet arrived with the chunk, after first paint, and the
 *     card narrowed 699 → 651 px and re-laid its rows in one frame (CLS 0.11);
 *   · the space titles ("OKLCh") were missing from the markup, because reka's
 *     SelectValue prints the registered option's text and the rows register
 *     only on the client; they appeared at hydration.
 */
const home = SCENES.find((scene) => scene.hash === "#/")!;

for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
]) {
    test(`the shell's cold load of #/ at ${viewport.width} never shifts`, async ({
        page,
    }) => {
        await page.setViewportSize(viewport);
        await installColdLoadWitness(page);
        await expectColdLoadSettled(page, home);
    });
}

test("the shell's markup carries the space titles it paints", async ({ page }) => {
    const html = await (await page.request.get("/")).text();
    await page.setContent("<!doctype html><title>shell</title>");
    const titles = await page.evaluate((source) => {
        const doc = new DOMParser().parseFromString(source, "text/html");
        return [
            ...doc.querySelectorAll(
                '#app[data-prerendered] [aria-label="Select color space"]',
            ),
        ].map((trigger) => trigger.textContent?.trim() ?? "");
    }, html);
    expect(titles).toEqual(["OKLCh", "OKLCh"]);
});
