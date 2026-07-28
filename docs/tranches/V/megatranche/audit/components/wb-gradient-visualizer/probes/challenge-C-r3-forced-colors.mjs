/**
 * CHALLENGE-C round 3 — REAL forced-colors (WHCM) measurement for the gradient
 * pane. The shipped `forced-colors-desktop` matrix is a WebKit context and
 * WebKit does not implement forcedColors emulation, so that row is not
 * evidence. Chromium does. Read-only.
 *
 *   node docs/.../probes/challenge-C-r3-forced-colors.mjs
 */
import { chromium } from "playwright";

const log = (...a) => console.log(...a);
const browser = await chromium.launch();

for (const forced of ["none", "active"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: forced });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
    await page.waitForTimeout(3500);
    const main = page.getByRole("main", { name: "Color tool panes" });
    await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
    const bar = main.getByTestId("gradient-stop-bar").last();
    await bar.scrollIntoViewIfNeeded();

    const m = await page.evaluate(() => {
        const rail = document.querySelector('[data-testid="gradient-stop-bar"]');
        const tile = document.querySelector('[data-testid="gradient-render-tile"]');
        const h0 = document.querySelector("[data-stop-id]");
        const cs = (el) => (el ? getComputedStyle(el) : null);
        const pick = (el) => {
            const s = cs(el);
            if (!s) return null;
            return {
                backgroundImage: s.backgroundImage.slice(0, 60),
                backgroundColor: s.backgroundColor,
                forcedColorAdjust: s.forcedColorAdjust,
            };
        };
        return {
            forcedActive: matchMedia("(forced-colors: active)").matches,
            rail: pick(rail),
            tile: pick(tile),
            handle0: pick(h0),
            tileRole: tile?.getAttribute("role"),
            tileLabel: tile?.getAttribute("aria-label"),
        };
    });
    log(`== forcedColors: ${forced} ==`, JSON.stringify(m, null, 1));

    await bar.screenshot({
        path: `docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/evidence/challenge-C-r3-rail-forced-${forced}.png`,
    });
    await main
        .getByTestId("gradient-render-tile")
        .last()
        .screenshot({
            path: `docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/evidence/challenge-C-r3-tile-forced-${forced}.png`,
        });
    await ctx.close();
}
await browser.close();
