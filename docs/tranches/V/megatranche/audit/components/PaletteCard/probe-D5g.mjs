// CHALLENGE-D pass 3 — probe G. The TOUCH arm of the swatch affordance.
// On a coarse pointer `canHover` is false and SwatchHoverMenu renders the
// reka-ui <Popover><PopoverTrigger as-child><WatercolorDot tag="button">.
// glass-ui 7.0.0 renders WatercolorDot as <span aria-hidden pointer-events:none>.
// Question: can a touch user open the add/edit/copy panel at all?
import { chromium, devices } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = new URL("./evidence/", import.meta.url).pathname;
const NOW = new Date().toISOString();
const mk = (c, i) => ({ css: c, position: i });
const F = { version: 1, palettes: [
    { id: "a", slug: "a", name: "Sunset Ridge", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#f4a261", "#e76f51", "#2a9d8f"].map(mk) },
]};
const R = {};
const b = await chromium.launch();
const ctx = await b.newContext({ ...devices["iPhone 14"], hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), F);
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2600);
await page.locator('[role="article"]').first().tap();
await page.waitForTimeout(1000);

const card = page.locator('[role="article"]').first();
R.expanded = await card.evaluate((e) => e.getBoundingClientRect().height);
R.swatchCount = await card.locator('[data-testid="watercolor-swatch"]').count();
if (R.swatchCount) {
    const sw = card.locator('[data-testid="watercolor-swatch"]').first();
    R.swatchHtml = (await sw.evaluate((e) => e.outerHTML)).slice(0, 260);
    R.swatchPointerEvents = await sw.evaluate((e) => getComputedStyle(e).pointerEvents);
    R.parentIsTrigger = await sw.evaluate((e) => {
        const p = e.parentElement;
        return { tag: p.tagName, slot: p.getAttribute("data-slot"), state: p.getAttribute("data-state"), aria: p.getAttribute("aria-expanded") };
    });
    const box = await sw.boundingBox();
    R.swatchBox = box;
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(900);
    R.afterTap = await page.evaluate(() => ({
        popoverContents: document.querySelectorAll('[data-slot="popover-content"], [data-reka-popper-content-wrapper]').length,
        floatingPanels: document.querySelectorAll(".floating-panel").length,
        anyEditCopyButton: [...document.querySelectorAll("button[aria-label]")].map((e) => e.getAttribute("aria-label")).filter((n) => /Edit color|Copy color|Add /.test(n)),
    }));
    await page.screenshot({ path: OUT + "p3-touch-swatch-tap.png", fullPage: true });
}
R.tapTargets = await card.evaluate((c) => [...c.querySelectorAll("*")].filter((e) => {
    const r = e.getBoundingClientRect();
    const interactive = e.tagName === "BUTTON" || e.tabIndex >= 0 || getComputedStyle(e).cursor === "pointer";
    return interactive && r.width > 0 && r.width < 44 && r.height < 44;
}).map((e) => ({ tag: e.tagName, cls: String(e.getAttribute("class") || "").slice(0, 40), w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) })));

writeFileSync(OUT + "../probe-D5g-results.json", JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
await b.close();
