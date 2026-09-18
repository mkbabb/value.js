/**
 * CHALLENGE-C live probe #3 — the states the visual audit never captured
 * (it shot /#/palettes with an EMPTY library, so no card ever rendered):
 *   (a) nameless buttons + sub-24px targets inside the Palettes pane, seeded
 *   (b) the `cardRefs` map: does it release unmounted cards?
 *   (c) the empty-state copy under a no-match search
 *
 *   node docs/tranches/V/megatranche/audit/components/PalettesPane/repro-C3-a11y-refs.mjs
 */
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const KEY = "color-palettes";
const NAMES = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];
const SEED = {
    version: 1,
    palettes: NAMES.map((name, i) => ({
        id: `id-${name}`,
        name,
        slug: name.toLowerCase(),
        colors: [{ css: `hsl(${i * 60} 70% 50%)`, position: 0 }],
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        isLocal: true,
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.addInitScript(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1500);

// ── (a) a11y inside the Palettes pane only ──────────────────────────────────
const a11y = await page.evaluate(() => {
    const grid = document.querySelector(".palette-card-grid");
    const pane = grid.closest("[class*='pane-scroll-fade']") ?? grid.parentElement;
    const name = (el) =>
        (el.getAttribute("aria-label") ||
            el.getAttribute("title") ||
            el.textContent.trim()).replace(/\s+/g, " ");
    const btns = [...pane.querySelectorAll("button")];
    const small = [...pane.querySelectorAll("button, [role='button'], a, input, .drag-handle")]
        .map((el) => {
            const r = el.getBoundingClientRect();
            return { tag: el.tagName.toLowerCase(), cls: (el.getAttribute("class") || "").split(" ")[0], w: Math.round(r.width), h: Math.round(r.height), name: name(el) };
        })
        .filter((x) => x.w > 0 && (x.w < 24 || x.h < 24));
    return {
        paneButtons: btns.length,
        nameless: btns.filter((b) => !name(b)).map((b) => b.outerHTML.slice(0, 160)),
        smallTargets: small,
        gridRole: grid.getAttribute("role"),
        cards: [...grid.querySelectorAll("[role='article']")].length,
    };
});
console.log("=== (a) Palettes pane, 6 saved palettes ===");
console.log("buttons in pane   :", a11y.paneButtons, "| cards:", a11y.cards);
console.log("nameless buttons  :", a11y.nameless.length);
a11y.nameless.forEach((h) => console.log("   ", h));
console.log("sub-24px targets  :", a11y.smallTargets.length);
for (const t of a11y.smallTargets) console.log(`    ${t.w}x${t.h}  <${t.tag} class="${t.cls}">  name="${t.name}"`);

// ── (b) cardRefs retention (Vue dev build exposes __vueParentComponent) ─────
const refsProbe = async (label) => {
    const n = await page.evaluate(() => {
        const grid = document.querySelector(".palette-card-grid");
        let inst = grid.__vueParentComponent;
        while (inst && !(inst.setupState && "cardRefs" in inst.setupState)) inst = inst.parent;
        if (!inst) return null;
        const refs = inst.setupState.cardRefs;
        return { keys: Object.keys(refs).length, ids: Object.keys(refs).join(",") };
    });
    console.log(label, JSON.stringify(n));
    return n;
};
console.log("\n=== (b) cardRefs retention ===");
await refsProbe("after mount (6 cards)   :");
const search = page.locator("input[placeholder='Search your palettes...']");
await search.fill("alpha");
await page.waitForTimeout(500);
console.log("DOM cards while filtered:", await page.locator(".palette-card-grid [role='article']").count());
await refsProbe("while filtered to 1 card:");
await search.fill("");
await page.waitForTimeout(500);
await refsProbe("after clearing the filter:");

// delete every palette, then re-check
await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ version: 1, palettes: [] })), KEY);
await page.evaluate(() => window.dispatchEvent(new StorageEvent("storage", { key: "color-palettes" })));
await page.waitForTimeout(600);
console.log("DOM cards after wipe    :", await page.locator(".palette-card-grid [role='article']").count());
await refsProbe("after wipe              :");

// ── (c) no-match search copy ───────────────────────────────────────────────
console.log("\n=== (c) empty-state copy under a no-match search ===");
await page.evaluate(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1200);
await page.locator("input[placeholder='Search your palettes...']").fill("zzzznomatch");
await page.waitForTimeout(500);
console.log("saved palettes in store :", await page.evaluate((k) => JSON.parse(localStorage.getItem(k)).palettes.length, KEY));
console.log("header badge            :", await page.locator(".palette-card-grid").locator("xpath=../..").locator("text=/^\\d+$/").first().textContent().catch(() => "n/a"));
console.log("empty-state text        :", (await page.locator(".palette-card-grid").innerText()).replace(/\n+/g, " | "));

await browser.close();
