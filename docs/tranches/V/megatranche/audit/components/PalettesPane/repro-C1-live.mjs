/**
 * CHALLENGE-C live repro — PalettesPane drag-to-reorder against the RUNNING
 * dev server (http://localhost:9000).
 *
 * Audit artifact ONLY (read-only probe; it seeds its own localStorage in a
 * throwaway browser context and never writes to the repo or the API).
 *
 *   node docs/tranches/V/megatranche/audit/components/PalettesPane/repro-C1-live.mjs
 */
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const KEY = "color-palettes";

const mkPalette = (name, i) => ({
    id: `id-${name}`,
    name,
    slug: name.toLowerCase(),
    colors: [{ css: ["#e11d48", "#0ea5e9", "#22c55e", "#f59e0b"][i], position: 0 }],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: true,
});
const NAMES = ["Alpha", "Bravo", "Charlie", "Delta"];
const SEED = { version: 1, palettes: NAMES.map(mkPalette) };

const order = (page) =>
    page.evaluate((k) =>
        JSON.parse(localStorage.getItem(k)).palettes.map((p) => p.name).join(" "),
    KEY);

const domOrder = (page) =>
    page.$$eval(".palette-card-grid [role='article']", (els) =>
        els.map((e) => e.getAttribute("aria-label").replace("Palette: ", "")).join(" "),
    );

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
page.on("console", (m) => m.type() === "error" && console.log("  [console.error]", m.text()));

await page.addInitScript(
    ([k, seed]) => localStorage.setItem(k, JSON.stringify(seed)),
    [KEY, SEED],
);
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1500);

console.log("seeded store order :", await order(page));
console.log("rendered DOM order :", await domOrder(page));

const handles = page.locator(".palette-card-grid .drag-handle");
console.log("drag handles       :", await handles.count());

// tabbable check — can a keyboard user reach the reorder affordance at all?
const tabbable = await page.$$eval(".palette-card-grid .drag-handle", (els) =>
    els.map((e) => ({
        tag: e.tagName.toLowerCase(),
        tabindex: e.getAttribute("tabindex"),
        role: e.getAttribute("role"),
        ariaLabel: e.getAttribute("aria-label"),
        ariaHidden: e.getAttribute("aria-hidden"),
        box: (({ width, height }) => ({ width, height }))(e.getBoundingClientRect()),
    })),
);
console.log("handle a11y        :", JSON.stringify(tabbable[0]));

// ── the drag: Alpha (index 0) dropped onto index 2 (Charlie's row) ──
const src = handles.nth(0);
const dstCard = page.locator(".palette-card-grid [role='article']").nth(2);
const a = await src.boundingBox();
const b = await dstCard.boundingBox();
await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
await page.mouse.down();
for (let i = 1; i <= 12; i++) {
    await page.mouse.move(
        a.x + a.width / 2,
        a.y + a.height / 2 + ((b.y + b.height * 0.75 - (a.y + a.height / 2)) * i) / 12,
    );
    await page.waitForTimeout(25);
}
await page.mouse.up();
await page.waitForTimeout(600);

console.log("\ndrag Alpha(0) -> row index 2");
console.log("EXPECTED           : Bravo Charlie Alpha Delta");
console.log("ACTUAL store order :", await order(page));
console.log("ACTUAL DOM order   :", await domOrder(page));

await browser.close();
