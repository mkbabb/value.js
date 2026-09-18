/**
 * CHALLENGE-C live probe #5 — keyboard operability of the saved-palette list.
 *   node docs/tranches/V/megatranche/audit/components/PalettesPane/repro-C5-keyboard.mjs
 */
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const KEY = "color-palettes";
const SEED = {
    version: 1,
    palettes: ["Alpha", "Bravo"].map((name, i) => ({
        id: `id-${name}`, name, slug: name.toLowerCase(),
        colors: [{ css: `hsl(${i * 90} 70% 50%)`, position: 0 }, { css: "#333", position: 1 }],
        createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", isLocal: true,
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.addInitScript(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1500);

console.log("=== aria role of the drag handle ===");
console.log(await page.locator(".palette-card-grid .drag-handle").first().ariaSnapshot().catch((e) => "(" + e.message.split("\n")[0] + ")"));
console.log("computed role     :", await page.evaluate(() => {
    const g = document.querySelector(".palette-card-grid .drag-handle");
    return { tag: g.tagName, role: g.getAttribute("role"), ariaHidden: g.getAttribute("aria-hidden"), focusable: g.tabIndex >= 0 };
}));

console.log("\n=== every focusable inside the saved-palette grid ===");
console.log(await page.evaluate(() => {
    const grid = document.querySelector(".palette-card-grid");
    const sel = "a[href],button,input,select,textarea,[tabindex]:not([tabindex='-1'])";
    return [...grid.querySelectorAll(sel)].map((e) => `${e.tagName.toLowerCase()} "${(e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 30)}"`);
}));
console.log("card is focusable :", await page.evaluate(() => {
    const c = document.querySelector(".palette-card-grid [role='article']");
    return { tabIndex: c.tabIndex, hasKeydown: !!c.onkeydown };
}));

console.log("\n=== can a keyboard user expand a palette? ===");
const expandedBefore = await page.locator(".palette-card-grid [role='article']").first().innerText();
await page.locator(".palette-card-grid [role='article']").first().focus().catch(() => {});
await page.keyboard.press("Enter");
await page.keyboard.press("Space");
await page.waitForTimeout(500);
const expandedAfter = await page.locator(".palette-card-grid [role='article']").first().innerText();
console.log("card text before  :", JSON.stringify(expandedBefore.replace(/\n+/g, " | ")));
console.log("card text after   :", JSON.stringify(expandedAfter.replace(/\n+/g, " | ")));
console.log("changed by kbd    :", expandedBefore !== expandedAfter);
await page.locator(".palette-card-grid [role='article']").first().click();
await page.waitForTimeout(500);
console.log("card text w/ mouse:", JSON.stringify((await page.locator(".palette-card-grid [role='article']").first().innerText()).replace(/\n+/g, " | ")));

console.log("\n=== menu items available on a saved card (is reorder there?) ===");
await page.getByRole("button", { name: "Palette menu" }).first().click();
await page.waitForTimeout(500);
console.log(await page.evaluate(() => [...document.querySelectorAll("[role='menuitem'],[role='menuitemcheckbox']")].map((e) => e.textContent.trim().replace(/\s+/g, " "))));

await browser.close();
