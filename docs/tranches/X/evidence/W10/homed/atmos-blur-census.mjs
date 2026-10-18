// SERVED MODEL: claude-opus-5-5
// X.W10.h · ATMOS-DRAG-COMPOSITION — the blurred-layer census over the live
// atmosphere on the picker route (the surface w12-drag.spec.ts drags).
// One headless-shell browser, one context per viewport/scheme, closed in finally.
// Read-only: writes one JSON beside this file. Usage:
//   node atmos-blur-census.mjs <origin> <out.json>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const origin = process.argv[2] ?? "http://localhost:9041";
const out = process.argv[3] ?? "atmos-blur-census.json";
const cells = [
    { w: 1440, h: 900, scheme: "light" },
    { w: 1440, h: 900, scheme: "dark" },
    { w: 390, h: 844, scheme: "light" },
];
const result = { origin, cells: [] };
const browser = await chromium.launch();
try {
    for (const c of cells) {
        const ctx = await browser.newContext({
            viewport: { width: c.w, height: c.h },
            colorScheme: c.scheme,
        });
        try {
            const page = await ctx.newPage();
            await page.goto(origin + "/", { waitUntil: "load" });
            await page.waitForTimeout(2500);
            const census = await page.evaluate(() => {
                const vw = innerWidth * innerHeight;
                const rows = [];
                for (const el of document.querySelectorAll("body *")) {
                    const cs = getComputedStyle(el);
                    const bf = cs.backdropFilter || cs.webkitBackdropFilter || "none";
                    if (bf === "none") continue;
                    const r = el.getBoundingClientRect();
                    if (r.width === 0 || r.height === 0 || cs.visibility === "hidden" || cs.display === "none") continue;
                    let a = el.parentElement, nestedIn = null;
                    while (a) {
                        const acs = getComputedStyle(a);
                        const abf = acs.backdropFilter || acs.webkitBackdropFilter || "none";
                        if (abf !== "none") { nestedIn = (a.className?.baseVal ?? a.className ?? "").toString().slice(0, 80); break; }
                        a = a.parentElement;
                    }
                    const vis = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) *
                        Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
                    rows.push({
                        tag: el.tagName.toLowerCase(),
                        cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 100),
                        backdrop: bf,
                        areaFrac: +(vis / vw).toFixed(4),
                        nestedIn,
                    });
                }
                const canvases = [...document.querySelectorAll("canvas")].map((cv) => {
                    const r = cv.getBoundingClientRect();
                    return { cls: cv.className.toString().slice(0, 80), w: Math.round(r.width), h: Math.round(r.height) };
                });
                return {
                    blurred: rows.length,
                    visibleBlurred: rows.filter((r) => r.areaFrac > 0).length,
                    nested: rows.filter((r) => r.nestedIn && r.areaFrac > 0).length,
                    blurredAreaSum: +rows.reduce((s, r) => s + r.areaFrac, 0).toFixed(3),
                    rows,
                    canvases,
                };
            });
            result.cells.push({ ...c, ...census });
            console.log(`${c.w}x${c.h} ${c.scheme} blurred=${census.blurred} visible=${census.visibleBlurred} nested=${census.nested} areaSum=${census.blurredAreaSum} canvases=${census.canvases.length}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(out, JSON.stringify(result, null, 2));
