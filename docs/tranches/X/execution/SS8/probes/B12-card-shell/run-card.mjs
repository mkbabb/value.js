// SERVED MODEL: claude-opus-5-5 · SS-8 B12 — PaletteCard record (successor: PaletteInspector + PaletteSpecimen
// + PaletteCardSwatches + SwatchHoverMenu). One browser, one context per cell.
import { launch, cell, openBrowse, card, save, palette, installColor, modePixels, EVID, BASE, WALL } from "./lib.mjs";
import { resolve } from "node:path";

const only = process.argv[2] ? process.argv[2].split(",") : null;
const want = (k) => !only || only.includes(k);
const LOCAL = (n) => Array.from({ length: n }, (_, i) => ({ id: `l${i}`, name: `Local ${i}`, slug: `local-${i}`,
    colors: ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"].map((css, position) => ({ css, position })),
    createdAt: "2026-10-19T00:00:00.000Z", updatedAt: "2026-10-19T00:00:00.000Z", isLocal: true, published: false, visibility: "private", tags: [] }));
async function openPalettes(p, n = 4) {
    await p.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s })); } catch {} }, LOCAL(n));
    await p.goto(`${BASE}/#/palettes`, { timeout: 90000 });
    await p.locator('[role="article"].palette-card').first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
}
const out = [];
const b = await launch();
try {
    if (want("u1")) out.push(await cell(b, "PC-U1 PRM expand/collapse retention", { reducedMotion: "reduce" }, async (p) => {
        await openBrowse(p);
        const c = card(p, "Probe Eight");
        const snap = (tag) => p.evaluate(([t]) => {
            const el = document.querySelector('[aria-label="Palette: Probe Eight"]');
            const dc = el.querySelector(".disclosure-content");
            const zero = [...el.querySelectorAll("*")].filter((n) => n.children.length && n.getBoundingClientRect().height === 0 && getComputedStyle(n).display !== "contents").length;
            const copySlug = [...document.querySelectorAll("button")].filter((x) => /slug/i.test(x.getAttribute("aria-label") || "")).map((x) => ({ label: x.getAttribute("aria-label"), h: x.getBoundingClientRect().height, tabbable: x.tabIndex >= 0 && !x.closest("[inert],[hidden]") && x.getBoundingClientRect().height > 0 }));
            return { t, docNodes: document.getElementsByTagName("*").length, cardNodes: el.getElementsByTagName("*").length, detailChildren: dc ? dc.getElementsByTagName("*").length : null, detailH: dc ? dc.getBoundingClientRect().height : null, dcState: dc?.getAttribute("data-state"), dcHidden: dc?.hasAttribute("hidden"), zeroHeightWithKids: zero, copySlug };
        }, [tag]);
        const s0 = await snap("collapsed-initial");
        await c.locator(".palette-specimen__name").click(); await p.waitForTimeout(1500);
        const s1 = await snap("expanded");
        await c.locator(".palette-specimen__name").click(); await p.waitForTimeout(1500);
        const s2 = await snap("re-collapsed");
        return { s0, s1, s2 };
    }));
    if (want("u2")) out.push(await cell(b, "PC-U2 hover panel geometry (successor popover)", {}, async (p) => {
        await openBrowse(p);
        const c = card(p, "Probe Five");
        await c.locator(".palette-specimen__name").click(); await p.waitForTimeout(1000);
        const sw = c.locator(".disclosure-content button").filter({ has: p.locator("[class*=watercolor], span") }).nth(1);
        const swBox = await sw.boundingBox();
        await sw.hover(); await p.waitForTimeout(900);
        const panel = await p.evaluate(() => {
            const fp = document.querySelectorAll(".floating-panel").length;
            const el = [...document.querySelectorAll('[role="dialog"], [data-reka-popper-content-wrapper] > *')].find((n) => /Actions for/.test(n.getAttribute("aria-label") || "")) || document.querySelector("[data-reka-popper-content-wrapper] > *");
            if (!el) return { found: false, floatingPanelNodes: fp };
            const r = el.getBoundingClientRect();
            return { found: true, floatingPanelNodes: fp, label: el.getAttribute("aria-label"), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), position: getComputedStyle(el.parentElement).position, inViewport: r.x >= 0 && r.y >= 0 && r.right <= innerWidth && r.bottom <= innerHeight, buttons: [...el.querySelectorAll("button")].map((x) => x.getAttribute("aria-label")) };
        });
        await p.screenshot({ path: resolve(EVID, "pc-u2-hover-panel-1440.png"), clip: { x: Math.max(0, swBox.x - 200), y: Math.max(0, swBox.y - 140), width: 520, height: 320 } });
        return { swatch: swBox, panel };
    }));
    if (want("u3")) out.push(await cell(b, "PC-U3 WHCM + print of the compact strip", { forcedColors: "active" }, async (p) => {
        await openBrowse(p);
        const strip = card(p, "Probe Five").locator(".palette-specimen > div").first();
        const read = () => strip.evaluate((s) => ({ attrs: [...s.attributes].map((a) => `${a.name}=${a.value.slice(0, 60)}`), fca: getComputedStyle(s).forcedColorAdjust, pca: getComputedStyle(s).printColorAdjust, kids: [...s.children].map((k) => ({ bg: getComputedStyle(k).backgroundColor, fca: getComputedStyle(k).forcedColorAdjust, pca: getComputedStyle(k).printColorAdjust, dcs: k.hasAttribute("data-color-surface") })) }));
        const whcm = await read();
        await strip.screenshot({ path: resolve(EVID, "pc-u3-strip-forced-colors.png") });
        await p.emulateMedia({ media: "print", forcedColors: "none" });
        const print = await read();
        await p.pdf({ path: resolve(EVID, "pc-u3-print-default.pdf"), width: "1440px", height: "900px" }).catch((e) => String(e));
        return { whcm, print };
    }));
    if (want("u4")) out.push(await cell(b, "PC-U4 corner caster vs grid contain", { deviceScaleFactor: 2 }, async (p) => {
        await openBrowse(p);
        const c = card(p, "Probe Featured");
        const r = await c.evaluate((el) => {
            const chain = []; let n = el.parentElement;
            while (n && chain.length < 8) { const cs = getComputedStyle(n); chain.push({ cls: [...n.classList].slice(0, 3).join("."), contain: cs.contain, overflow: cs.overflow, pad: cs.padding }); n = n.parentElement; }
            const cs = getComputedStyle(el);
            return { boxShadow: cs.boxShadow, border: cs.borderWidth, radius: cs.borderRadius, filter: cs.filter, castChild: !!el.querySelector(".cartoon-cast"), chain };
        });
        const bb = await c.boundingBox();
        await p.screenshot({ path: resolve(EVID, "pc-u4-corner-1440-dpr2.png"), clip: { x: bb.x - 16, y: bb.y + bb.height - 40, width: 80, height: 56 } });
        return r;
    }));
    console.error("card part A done");
    save("run-card-A.json", out);
} finally { await b.close(); }
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
