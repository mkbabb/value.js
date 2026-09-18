// CHALLENGE-C probe E — `addCurrentColor`'s raw-string identity test across a
// color-space change (useSwatchActions.ts:63 `indexOf(cssColorOpaque)`).
// Reads the two strings the comparison actually sees, off the live DOM.
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
    // savedColors seeded in HEX/rgb space; inputColor deliberately in OKLCH so
    // `model.color` parses into a DIFFERENT picker space than the saved copies.
    localStorage.setItem(
        "color-picker",
        JSON.stringify({ inputColor: "oklch(0.628 0.2577 29.23)", savedColors: ["#ff0000", "#00ff00"] }),
    );
});
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4500);

const out = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const dots = Array.from(well.querySelectorAll('[data-testid="watercolor-swatch"]'));
    const read = (el) => el.style.getPropertyValue("--watercolor-color").trim();
    const add = well.querySelector(".add-slot-ghost");
    const saved = dots.filter((d) => d !== add).map(read);
    const current = read(add);
    return {
        savedColorStrings: saved,
        cssColorOpaque: current,
        indexOfResult: saved.indexOf(current),
        sameColorPhysically: "swatch 0 and the live color are both pure red",
    };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
