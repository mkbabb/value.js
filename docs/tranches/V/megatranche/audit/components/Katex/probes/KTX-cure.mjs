// Validate the proposed cures IN WEBKIT, injected at runtime (no source edits):
//  (1) `.katex-mathml annotation { display: none }` removes the raw-TeX tail
//      from the accessible name.
//  (2) tabindex=0 + role=region + aria-label makes the overflowing display
//      formula reachable and announced.
import { webkit } from "playwright";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForSelector(".markdown-body", { timeout: 25000 }).catch(() => {});
await page.waitForTimeout(3000);

await page.evaluate(() => {
    const d = [...document.querySelectorAll("div.inline-block")].find((x) =>
        x.querySelector(":scope > .katex-display"),
    );
    d.id = "ktx-target";
    d.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(500);
console.log("BEFORE:", JSON.stringify((await page.locator("#ktx-target").ariaSnapshot()).slice(0, 400)));

await page.addStyleTag({ content: ".katex-mathml annotation{display:none}" });
await page.waitForTimeout(400);
const after = await page.locator("#ktx-target").ariaSnapshot();
console.log("AFTER css cure:", JSON.stringify(after.slice(0, 400)));
console.log("still contains raw TeX:", /\\(frac|begin|sqrt|epsilon)/.test(after));

// (2) tabindex cure on the OVERFLOWING one
await page.evaluate(() => {
    const d = [...document.querySelectorAll("div.inline-block")].find(
        (x) => x.querySelector(":scope > .katex-display") && x.scrollWidth > x.clientWidth + 1,
    );
    d.setAttribute("data-ktx-probe", "1");
    d.setAttribute("tabindex", "0");
    d.setAttribute("role", "region");
    d.setAttribute("aria-label", "Formula, scrollable");
    d.scrollIntoView({ block: "center" });
    document.body.focus();
});
await page.waitForTimeout(400);
let hit = -1;
for (let i = 0; i < 90; i++) {
    await page.keyboard.press("Tab");
    const p = await page.evaluate(() => document.activeElement?.hasAttribute("data-ktx-probe") ?? false);
    if (p) {
        hit = i + 1;
        break;
    }
}
console.log("webkit: with tabindex=0 the scroller is reached at Tab press", hit);
if (hit > 0) {
    const before = await page.evaluate(() => document.querySelector("[data-ktx-probe]").scrollLeft);
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(300);
    const afterScroll = await page.evaluate(() => document.querySelector("[data-ktx-probe]").scrollLeft);
    console.log("webkit: ArrowRight scrollLeft", before, "->", afterScroll);
}
await browser.close();
