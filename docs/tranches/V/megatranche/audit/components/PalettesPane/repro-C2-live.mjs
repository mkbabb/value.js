/**
 * CHALLENGE-C live repro #2 — (a) is the corruption only the FIRST drag?
 * (b) reorder while the search filter is active.
 *
 *   node docs/tranches/V/megatranche/audit/components/PalettesPane/repro-C2-live.mjs
 */
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const KEY = "color-palettes";
const NAMES = ["Alpha", "Bravo", "Charlie", "Delta"];
const SEED = {
    version: 1,
    palettes: NAMES.map((name, i) => ({
        id: `id-${name}`,
        name,
        slug: name.toLowerCase(),
        colors: [{ css: ["#e11d48", "#0ea5e9", "#22c55e", "#f59e0b"][i], position: 0 }],
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        isLocal: true,
    })),
};

const store = (page) =>
    page.evaluate((k) => JSON.parse(localStorage.getItem(k)).palettes.map((p) => p.name).join(" "), KEY);
const dom = (page) =>
    page.$$eval(".palette-card-grid [role='article']", (els) =>
        els.map((e) => e.getAttribute("aria-label").replace("Palette: ", "")).join(" "));

async function drag(page, fromIdx, toIdx) {
    const src = page.locator(".palette-card-grid .drag-handle").nth(fromIdx);
    const dst = page.locator(".palette-card-grid [role='article']").nth(toIdx);
    const a = await src.boundingBox();
    const b = await dst.boundingBox();
    const targetY = toIdx > fromIdx ? b.y + b.height * 0.75 : b.y + b.height * 0.25;
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    for (let i = 1; i <= 12; i++) {
        await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2 + ((targetY - (a.y + a.height / 2)) * i) / 12);
        await page.waitForTimeout(25);
    }
    await page.mouse.up();
    await page.waitForTimeout(600);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.addInitScript(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1500);

console.log("=== (a) drag #1 then drag #2 ===");
console.log("start              :", await dom(page));
await drag(page, 0, 2);
console.log("after drag#1 (0->2):", await dom(page), "  [expected: Bravo Charlie Alpha Delta]");
const before2 = (await dom(page)).split(" ");
await drag(page, 0, 2);
const exp2 = (() => { const a = [...before2]; const [m] = a.splice(0, 1); a.splice(2, 0, m); return a.join(" "); })();
console.log("after drag#2 (0->2):", await dom(page), "  [expected:", exp2 + "]");

console.log("\n=== (b) reorder with the search filter active ===");
await page.evaluate((k) => localStorage.setItem(k, JSON.stringify(JSON.parse(localStorage.getItem(k)))), KEY);
await page.reload({ waitUntil: "domcontentloaded" });
await page.evaluate(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1200);
console.log("start store        :", await store(page));

const search = page.locator("input[placeholder='Search your palettes...']");
await search.fill("l");
await page.waitForTimeout(400);
console.log("filtered DOM ('l') :", await dom(page), " (Bravo is filtered OUT)");
// burn the first-drag stale-snapshot effect so (b) isolates the filter defect:
//   the store write from a prior drag re-caches the computed. Do a no-op-ish
//   drag first?  No — instead assert on the FULL store after ONE filtered drag.
await drag(page, 0, 1);
console.log("after filtered drag: DOM", await dom(page));
await search.fill("");
await page.waitForTimeout(400);
console.log("full store order   :", await store(page));
console.log("EXPECTED           : Bravo must still sit at index 1 (it was never dragged)");

await browser.close();
