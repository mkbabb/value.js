#!/usr/bin/env node
// X-DS · value · pass 7 (critic V7R, 2026-10-16) — the OPENED-OVERLAY cells (V7R-03).
// The route capture never opens a floater, so the only surfaces the canon allows a shadow
// (a menu, a select, a popover over content) were never judged, and V7R-01's buried menus
// went unseen for six passes. Each cell boots its route, opens one overlay, then:
//   - frames it (<cell>-<theme>.png);
//   - reads the floater's layer: the reka popper wrapper's and the content's computed z-index;
//   - PAINT ORDER: with pointer-events forced on for every element (reka's modal layer sets
//     body pointer-events:none, so a plain elementFromPoint "hits" a menu painted under the
//     stage), the top element at 5 points inside the floater must be inside the floater;
//   - lighting on the floater alone: max box-shadow layers on one element (rings apart),
//     and gradient fills.
// Real Chrome, new headless (§0ei). usage: node overlays.mjs [--base URL] [--out DIR]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const OUT = path.resolve(opt("out", import.meta.dirname));
fs.mkdirSync(OUT, { recursive: true });

export const CELLS = [
    { cell: "view-menu-1440", route: "/#/", width: 1440, trigger: '[aria-label="Select view"]' },
    { cell: "card-menu-1440", route: "/#/browse", width: 1440, trigger: '[aria-label="Palette menu"]', browse: true },
    { cell: "overflow-menu-390", route: "/#/", width: 390, trigger: '[aria-label="Menu"]' },
    { cell: "mix-select-1440", route: "/#/mix", width: 1440, trigger: "main [role=combobox]" },
];

export function floaterProbe() {
    const vis = (el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 1 && r.height > 1 && cs.visibility !== "hidden" && cs.display !== "none";
    };
    const f = [...document.querySelectorAll('[role="menu"],[role="listbox"]')].filter(vis).pop();
    if (!f) return { error: "no open floater" };
    const wrapper = f.closest("[data-reka-popper-content-wrapper]");
    const r = f.getBoundingClientRect();
    const st = document.createElement("style");
    st.textContent = "*{pointer-events:auto!important}";
    document.head.appendChild(st);
    const pts = [[0.5, 0.5], [0.3, 0.25], [0.7, 0.25], [0.3, 0.8], [0.7, 0.8]].map(([fx, fy]) => {
        const x = r.left + r.width * fx, y = r.top + r.height * fy;
        const top = document.elementFromPoint(x, y);
        const d = (el) => el ? `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").split(/\s+/).slice(0, 3).join(".")}` : "null";
        return { x: Math.round(x), y: Math.round(y), onFloater: !!top && f.contains(top), top: d(top) };
    });
    st.remove();
    const lengths = (l) => (l.replace(/[a-z-]+\([^)]*\)/g, "").match(/-?[\d.]+px/g) || []).map(parseFloat);
    const splitTop = (v) => { const o = []; let d = 0, c = ""; for (const ch of v) { if (ch === "(") d++; else if (ch === ")") d--; if (ch === "," && !d) { o.push(c.trim()); c = ""; } else c += ch; } if (c.trim()) o.push(c.trim()); return o; };
    let maxLayers = 0, maxEl = "", gradients = 0;
    for (const el of [f, ...f.querySelectorAll("*")]) {
        if (el.closest("svg")) continue;
        const cs = getComputedStyle(el);
        if (cs.boxShadow && cs.boxShadow !== "none") {
            const n = splitTop(cs.boxShadow).filter((l) => { const [x = 0, y = 0, b = 0] = lengths(l); return (x || y || b) && !/rgba?\([^)]*,\s*0\)|\/ 0\)/.test(l); }).length;
            if (n > maxLayers) { maxLayers = n; maxEl = `${el.tagName.toLowerCase()}[${el.getAttribute("data-slot") || el.getAttribute("role") || ""}]`; }
        }
        if (/-gradient\(/.test(cs.backgroundImage)) gradients++;
    }
    return {
        role: f.getAttribute("role"),
        slot: f.getAttribute("data-slot"),
        rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) },
        zContent: getComputedStyle(f).zIndex,
        zWrapper: wrapper ? getComputedStyle(wrapper).zIndex : "(no wrapper)",
        paintTopAll: pts.every((p) => p.onFloater),
        points: pts,
        floaterMaxShadowLayers: maxLayers,
        floaterMaxShadowEl: maxEl,
        floaterGradientFills: gradients,
    };
}

async function run({ cell, route, width, trigger, browse }, theme) {
    let browser;
    try {
        browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
        const page = await newPage(browser, width, theme);
        if (browse) await routeBrowseFixture(page);
        await bootRoute(page, BASE + route, { waitArticle: !!browse });
        await page.locator(trigger).first().click();
        await page.locator('[role="menu"],[role="listbox"]').first().waitFor({ timeout: 30_000 });
        await page.waitForTimeout(800); // the open transition settles
        const m = await page.evaluate(floaterProbe);
        await page.screenshot({ path: path.join(OUT, `${cell}-${theme}.png`) });
        return { cell, theme, ok: true, ...m };
    } catch (e) {
        return { cell, theme, ok: false, error: String(e).slice(0, 240) };
    } finally {
        try { await browser?.close(); } catch {}
    }
}

const results = [];
for (const c of CELLS) for (const theme of ["light", "dark"]) {
    const r = await run(c, theme);
    console.log(JSON.stringify(r));
    results.push(r);
}
fs.writeFileSync(path.join(OUT, "overlays.json"), JSON.stringify({ base: BASE, results }, null, 2) + "\n");
console.log("PAINT-TOP FAIL", results.filter((r) => !r.paintTopAll).map((r) => `${r.cell}-${r.theme}`).join(",") || "none");
