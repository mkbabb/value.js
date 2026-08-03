// CHALLENGE-D pass 5 — probe D17. Read-only.
//   Q8  what the edit overlay OCCLUDES, and the duplicated commit glyph
import { chromium } from "playwright";
import { writeFileSync } from "fs";

const HERE =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const BASE = "http://localhost:9000/";
const lab = (i, n) =>
    `lab(${(30 + (55 * i) / n).toFixed(1)}% ${(-70 + (150 * i) / n).toFixed(1)} ${(80 - (150 * i) / n).toFixed(1)})`;
const draft = (n) => Array.from({ length: n }, (_, i) => lab(i, n));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.addInitScript((c) => {
    localStorage.setItem("color-picker", JSON.stringify({ inputColor: "lab(72% 40 -60)", savedColors: c }));
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
}, draft(4));
await page.goto(BASE + "#/palettes", { waitUntil: "load" });
await page.waitForTimeout(2800);

await page.locator('.swatch-row [data-testid="watercolor-swatch"]').first().hover({ force: true }).catch(() => {});
await page.waitForTimeout(400);
await page.locator('[aria-label^="Edit color"]').first().click({ force: true }).catch(() => {});
await page.waitForTimeout(900);

const R = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const ov = well.querySelector(".edit-overlay");
    const o = ov.getBoundingClientRect();
    const inter = (r) => {
        const w = Math.max(0, Math.min(o.right, r.right) - Math.max(o.left, r.left));
        const h = Math.max(0, Math.min(o.bottom, r.bottom) - Math.max(o.top, r.top));
        return r.width * r.height > 0 ? +((100 * w * h) / (r.width * r.height)).toFixed(1) : 0;
    };
    const label = (e) =>
        e.getAttribute("aria-label") ??
        e.getAttribute("placeholder") ??
        (e.textContent.trim().slice(0, 20) || `${e.tagName}.${String(e.className).slice(0, 22)}`);
    const targets = [
        ...well.querySelectorAll('[data-testid="watercolor-swatch"], input, button, .text-mono-small'),
    ]
        .filter((e) => !ov.contains(e))
        .map((e) => {
            const r = e.getBoundingClientRect();
            return {
                what: label(e),
                bg: getComputedStyle(e).backgroundColor.slice(0, 26),
                rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
                pctCoveredByOverlay: inter(r),
            };
        });
    const checks = [...well.querySelectorAll("svg")]
        .filter((s) => /check/i.test(String(s.getAttribute("class") ?? "")))
        .map((s) => {
            const r = s.getBoundingClientRect();
            const btn = s.closest("button");
            return {
                cls: String(s.getAttribute("class")),
                size: `${+r.width.toFixed(1)}×${+r.height.toFixed(1)}`,
                x: +r.x.toFixed(1),
                y: +r.y.toFixed(1),
                inOverlay: !!ov.contains(s),
                ownerAriaLabel: btn?.getAttribute("aria-label") ?? null,
                ownerVisibleText: btn ? btn.textContent.trim() : null,
                ownerBox: btn ? `${+btn.getBoundingClientRect().width.toFixed(1)}×${+btn.getBoundingClientRect().height.toFixed(1)}` : null,
                iconColor: getComputedStyle(s).color,
            };
        });
    return {
        overlayRect: { x: +o.x.toFixed(1), y: +o.y.toFixed(1), w: +o.width.toFixed(1), h: +o.height.toFixed(1) },
        overlayBg: getComputedStyle(ov).backgroundColor,
        overlayBackdrop: getComputedStyle(ov).backdropFilter,
        overlayShadow: getComputedStyle(ov).boxShadow.slice(0, 150),
        overlayZ: getComputedStyle(ov).zIndex,
        wellRect: (() => { const r = well.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })(),
        occluded: targets.filter((t) => t.pctCoveredByOverlay > 0),
        notOccluded: targets.filter((t) => t.pctCoveredByOverlay === 0).map((t) => t.what),
        checkGlyphs: checks,
        checkGlyphSeparationPx: checks.length > 1 ? +(Math.abs(checks.at(-1).x - checks[0].x)).toFixed(1) : null,
    };
});
await page.screenshot({ path: `${HERE}/frames-D14/q8-occlusion-1440.png`, clip: { x: 690, y: 330, width: 740, height: 260 } });
await ctx.close();
await browser.close();
writeFileSync(`${HERE}/probe-D17-pass5.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
