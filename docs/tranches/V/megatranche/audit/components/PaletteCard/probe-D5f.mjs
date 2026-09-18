// CHALLENGE-D pass 3 — probe F. Behavioural test of the expanded swatch row:
// the rendered swatch is a `<span aria-hidden="true" ... pointer-events:none>`.
// Does hovering it open the action popover? Does clicking it do anything?
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = new URL("./evidence/", import.meta.url).pathname;
const NOW = new Date().toISOString();
const mk = (c, i) => ({ css: c, position: i });
const F = { version: 1, palettes: [
    { id: "a", slug: "a", name: "Sunset Ridge", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#f4a261", "#e76f51", "#2a9d8f"].map(mk) },
]};
const R = {};
const b = await chromium.launch();
const page = await (await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })).newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), F);
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2400);
await page.click('[role="article"]');
await page.waitForTimeout(900);

const card = page.locator('[role="article"]').first();
const sw = card.locator('[data-testid="watercolor-swatch"]').first();
R.swatchCount = await card.locator('[data-testid="watercolor-swatch"]').count();
R.swatchBox = await sw.boundingBox();
R.swatchPointerEvents = await sw.evaluate((e) => getComputedStyle(e).pointerEvents);
R.swatchAriaHidden = await sw.getAttribute("aria-hidden");
R.swatchTag = await sw.evaluate((e) => e.tagName);

// what element actually receives a pointer at the swatch centre?
R.hitTest = await page.evaluate((box) => {
    const el = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
    return { tag: el.tagName, cls: String(el.getAttribute("class") || "").slice(0, 80), testid: el.getAttribute("data-testid") };
}, R.swatchBox);

// hover → does the teleported floating panel appear?
await page.mouse.move(R.swatchBox.x + R.swatchBox.width / 2, R.swatchBox.y + R.swatchBox.height / 2);
await page.waitForTimeout(700);
R.afterHover = await page.evaluate(() => ({
    floatingPanels: document.querySelectorAll(".floating-panel").length,
    bodyLastChildren: [...document.body.children].slice(-3).map((e) => e.tagName + "." + String(e.getAttribute("class") || "").slice(0, 40)),
}));
await page.screenshot({ path: OUT + "p3-swatch-hover.png", clip: { x: Math.round(R.swatchBox.x - 120), y: Math.round(R.swatchBox.y - 120), width: 380, height: 240 } });

// click → any effect?
const before = await page.evaluate(() => document.body.innerText.length);
await page.mouse.click(R.swatchBox.x + R.swatchBox.width / 2, R.swatchBox.y + R.swatchBox.height / 2);
await page.waitForTimeout(700);
R.afterClick = await page.evaluate(() => ({
    floatingPanels: document.querySelectorAll(".floating-panel").length,
    cardStillExpanded: !!document.querySelector('[role="article"] [data-testid="watercolor-swatch"]'),
    textLen: document.body.innerText.length,
}));
R.afterClick.textLenBefore = before;

// keyboard: can anything in the expanded card be reached by Tab?
await page.evaluate(() => document.querySelector('[role="article"]').scrollIntoView());
R.tabOrder = await page.evaluate(() => {
    const c = document.querySelector('[role="article"]');
    return [...c.querySelectorAll("*")].filter((e) => e.tabIndex >= 0).map((e) => e.tagName + ":" + (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 18)));
});

writeFileSync(OUT + "../probe-D5f-results.json", JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
await b.close();
