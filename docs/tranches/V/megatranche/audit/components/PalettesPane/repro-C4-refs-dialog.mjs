/**
 * CHALLENGE-C live probe #4 —
 *   (d) are the retained `cardRefs` entries DEAD (unmounted) instances?
 *   (e) whole-page nameless buttons on /#/palettes, attributed to a pane
 *   (f) the delete-all dialog: focus management + Escape
 *   (g) the card's accessible tree (what AT sees for the drag handle)
 *
 *   node docs/tranches/V/megatranche/audit/components/PalettesPane/repro-C4-refs-dialog.mjs
 */
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const KEY = "color-palettes";
const NAMES = ["Alpha", "Bravo", "Charlie"];
const SEED = {
    version: 1,
    palettes: NAMES.map((name, i) => ({
        id: `id-${name}`, name, slug: name.toLowerCase(),
        colors: [{ css: `hsl(${i * 90} 70% 50%)`, position: 0 }],
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

// ── (d) dead-instance retention ────────────────────────────────────────────
await page.locator("input[placeholder='Search your palettes...']").fill("alpha");
await page.waitForTimeout(500);
const dead = await page.evaluate(() => {
    const grid = document.querySelector(".palette-card-grid");
    let inst = grid.__vueParentComponent;
    while (inst && !(inst.setupState && "cardRefs" in inst.setupState)) inst = inst.parent;
    const refs = inst.setupState.cardRefs;
    return Object.entries(refs).map(([id, c]) => ({
        id,
        isUnmounted: c.$ ? c.$.isUnmounted : "n/a",
        stillInDom: !!(c.$?.vnode?.el && document.contains(c.$.vnode.el)),
    }));
});
console.log("=== (d) cardRefs entries while only 'Alpha' is mounted ===");
for (const d of dead) console.log("   ", JSON.stringify(d));
await page.locator("input[placeholder='Search your palettes...']").fill("");
await page.waitForTimeout(400);

// ── (e) nameless buttons across the whole route, attributed ────────────────
const nameless = await page.evaluate(() => {
    const accName = (el) =>
        (el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent.trim()).replace(/\s+/g, " ");
    const paneOf = (el) => {
        const grid = document.querySelector(".palette-card-grid");
        const palettesPane = grid?.closest(".pane-scroll-fade");
        if (palettesPane && palettesPane.contains(el)) return "PalettesPane";
        const card = el.closest(".pane-scroll-fade");
        return card ? "other pane: " + (card.innerText || "").split("\n")[0].slice(0, 40) : "chrome/dock";
    };
    return [...document.querySelectorAll("button")]
        .filter((b) => !accName(b) && b.getBoundingClientRect().width > 0)
        .map((b) => ({ where: paneOf(b), html: b.outerHTML.replace(/\s+/g, " ").slice(0, 170) }));
});
console.log("\n=== (e) nameless buttons on /#/palettes (whole page) ===");
console.log("count:", nameless.length);
for (const n of nameless) console.log(`   [${n.where}] ${n.html}`);

// ── (f) delete-all dialog focus + Escape ───────────────────────────────────
console.log("\n=== (f) delete-all dialog ===");
const trigger = page.getByRole("button", { name: "Delete all saved palettes" });
console.log("trigger box:", JSON.stringify(await trigger.boundingBox()));
await trigger.click();
await page.waitForTimeout(700);
console.log("focus after open  :", await page.evaluate(() => {
    const a = document.activeElement;
    return a ? `${a.tagName.toLowerCase()} "${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 40)}"` : "none";
}));
console.log("dialog aria       :", await page.evaluate(() => {
    const d = document.querySelector("[role='dialog'],[role='alertdialog']");
    return d ? { role: d.getAttribute("role"), modal: d.getAttribute("aria-modal"), labelled: d.getAttribute("aria-labelledby") ? "yes" : "no", described: d.getAttribute("aria-describedby") ? "yes" : "no" } : "no dialog";
}));
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
console.log("dialog after Esc  :", await page.locator("[role='dialog'],[role='alertdialog']").count());
console.log("focus after Esc   :", await page.evaluate(() => {
    const a = document.activeElement;
    return a ? `${a.tagName.toLowerCase()} "${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 40)}"` : "none";
}));

// ── (g) what AT sees for one card ──────────────────────────────────────────
console.log("\n=== (g) accessible tree of one PaletteCard ===");
console.log(await page.locator(".palette-card-grid [role='article']").first().ariaSnapshot());

await browser.close();
