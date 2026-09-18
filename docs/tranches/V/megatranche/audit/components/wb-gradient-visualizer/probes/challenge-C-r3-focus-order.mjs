/**
 * CHALLENGE-C round 3 — after a keyboard nudge that crosses a neighbour, does
 * DOM/tab order still match the visual left-to-right order of the handles?
 * (WCAG 2.4.3 focus order / 1.3.2 meaningful sequence.) Read-only.
 *
 *   node docs/.../probes/challenge-C-r3-focus-order.mjs
 */
import { chromium } from "playwright";

const log = (...a) => console.log(...a);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar = main.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();

const order = () =>
    page.evaluate(() => {
        const hs = [...document.querySelectorAll("[data-stop-id]")];
        const rows = hs.map((h, i) => ({
            domIndex: i,
            label: h.getAttribute("aria-label"),
            x: Math.round(h.getBoundingClientRect().left),
        }));
        const visual = [...rows].sort((a, b) => a.x - b.x).map((r) => r.domIndex);
        return { rows, domOrder: rows.map((r) => r.domIndex), visualOrder: visual };
    });

// add a third stop at ~50 % with a bar click
const box = await bar.boundingBox();
await page.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
await page.waitForTimeout(500);
log("S0 three stops:", JSON.stringify(await order()));

// nudge the FIRST stop right, past the middle one (Shift = ±10)
const first = main.locator("[data-stop-id]").first();
await first.focus();
for (let i = 0; i < 7; i++) await page.keyboard.press("Shift+ArrowRight");
await page.waitForTimeout(500);
log("S1 after Shift+ArrowRight x7 on stop 0:", JSON.stringify(await order()));

// what does Tab actually visit?
const tabbed = await page.evaluate(async () => {
    const hs = [...document.querySelectorAll("[data-stop-id]")];
    hs[0].focus();
    const seen = [document.activeElement.getAttribute("aria-label")];
    for (let i = 0; i < 2; i++) {
        // emulate tab order by DOM order among the handles (tabindex is unset on all)
        const idx = hs.indexOf(document.activeElement);
        if (idx >= 0 && idx + 1 < hs.length) {
            hs[idx + 1].focus();
            seen.push(document.activeElement.getAttribute("aria-label"));
        }
    }
    return seen;
});
log("S2 sequential focus order (DOM order, tabindex unset on all):", JSON.stringify(tabbed));

await bar.screenshot({
    path: "docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/evidence/challenge-C-r3-crossed-focus-order.png",
});
await browser.close();
