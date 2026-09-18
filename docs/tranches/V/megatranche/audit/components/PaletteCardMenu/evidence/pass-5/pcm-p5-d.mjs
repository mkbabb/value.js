// pass-5 probe D —
//  D1  the Space bifurcation: reka's typeahead buffer is `refAutoReset("", 1e3)`
//      (node_modules/reka-ui/dist/shared/useTypeahead.js:6) and MenuItem's keydown
//      swallows Space while it is non-empty. So `d` then Space is a no-op inside
//      1000 ms and an unconfirmed DELETE outside it. Measure the boundary.
//  D2  per-card component-instance cost of one CLOSED menu (census delta).
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const R = {};
const log = (k, v) => { R[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const seed = (n) => ({
    version: 1,
    palettes: Array.from({ length: n }, (_, i) => ({
        id: `p-${i}`, name: `Probe Palette ${i}`, slug: `probe-palette-${i}`,
        isLocal: true, colors: [{ css: "#ff0000" }], createdAt: "", updatedAt: "",
    })),
});

const CENSUS = () => {
    const app = document.querySelector("#app")?.__vue_app__;
    const counts = {}; let total = 0;
    function walk(inst, depth) {
        if (!inst || depth > 300) return;
        total++;
        const t = inst.type || {};
        const name = t.__name || t.name || "anonymous";
        counts[name] = (counts[name] || 0) + 1;
        const seen = new Set();
        (function vwalk(v) {
            if (!v || seen.has(v)) return;
            seen.add(v);
            if (v.component) return walk(v.component, depth + 1);
            if (Array.isArray(v.children)) v.children.forEach(vwalk);
            if (v.suspense) vwalk(v.suspense.activeBranch);
        })(inst.subTree);
    }
    if (app?._instance) walk(app._instance, 0);
    return { total, counts };
};

(async () => {
    const browser = await chromium.launch();
    const errs = [];

    // ── D1 · Space timing bifurcation ───────────────────────────────────────
    const bif = [];
    for (const delay of [150, 500, 900, 1100, 1600]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errs.push(`d1@${delay}: ${e}`));
        await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), seed(6));
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector("[role='article']");
        await page.waitForTimeout(400);
        const before = await page.evaluate(() => JSON.parse(localStorage["color-palettes"]).palettes.map((p) => p.name));
        await page.getByRole("button", { name: "Palette menu" }).nth(0).click();
        await page.waitForTimeout(300);
        await page.keyboard.press("d");
        await page.waitForTimeout(200);
        const focused = await page.evaluate(() => ({
            role: document.activeElement?.getAttribute("role"),
            text: (document.activeElement?.textContent || "").trim(),
            highlighted: document.activeElement?.hasAttribute("data-highlighted"),
        }));
        await page.waitForTimeout(Math.max(0, delay - 200));
        await page.keyboard.press(" ");
        await page.waitForTimeout(600);
        const after = await page.evaluate(() => ({
            store: JSON.parse(localStorage["color-palettes"]).palettes.map((p) => p.name),
            menus: document.querySelectorAll("[role='menu']").length,
            dialogs: document.querySelectorAll("[role='dialog'],[role='alertdialog']").length,
            scrollY: window.scrollY,
        }));
        bif.push({
            spaceAtMsAfterD: delay,
            focusedByTypeahead: focused,
            storeLenBefore: before.length,
            storeLenAfter: after.store.length,
            destroyed: before.filter((n) => !after.store.includes(n)),
            menusAfter: after.menus,
            dialogs: after.dialogs,
        });
        await ctx.close();
    }
    log("D1_spaceBifurcation", bif);

    // ── D2 · per-card cost of one CLOSED menu ───────────────────────────────
    const rows = [];
    for (const n of [1, 5, 25]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errs.push(`d2@${n}: ${e}`));
        await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), seed(n));
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
        await page.waitForSelector("[role='article']");
        await page.waitForTimeout(800);
        const c = await page.evaluate(CENSUS);
        rows.push({ n, cards: await page.locator("[role='article']").count(), total: c.total, counts: c.counts });
        await ctx.close();
    }
    const KEYS = ["PaletteCardMenu", "DropdownMenu", "DropdownMenuRoot", "MenuRoot", "PopperRoot",
        "DropdownMenuTrigger", "MenuAnchor", "PopperAnchor", "DropdownMenuContent",
        "DropdownMenuPortal", "MenuContent", "CollectionSlot", "Primitive", "PrimitiveSlot", "Button"];
    const a = rows.find((r) => r.n === 1), b = rows.find((r) => r.n === 25);
    const perCard = {};
    for (const k of KEYS) perCard[k] = ((b.counts[k] || 0) - (a.counts[k] || 0)) / 24;
    log("D2_instanceCensus", {
        totals: rows.map((r) => ({ n: r.n, totalVueInstances: r.total })),
        perCardDelta_totalInstances: (b.total - a.total) / 24,
        perCardDelta_byComponent: perCard,
    });
    log("pageErrors", errs);

    await browser.close();
    writeFileSync(OUT + "pcm-p5-d-results.json", JSON.stringify(R, null, 2));
})();
