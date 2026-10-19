// B03 · C — AuroraPane U-4, U-5, U-8, U-11 computed IN THE SERVED APP: the live Vite-served modules
// (atmosphere-calibration.ts, aurora-harmony-stops.ts, aurora-atoms.ts, glass-ui /aurora + /color deps)
// are dynamically imported into the page; the strip/field paints are read back through the browser's own
// colour pipeline (canvas fillStyle). guaranteeSeamOffset is module-private in useAtmosphere.ts, so it is
// transcribed byte-for-byte from useAtmosphere.ts:93-111 at the served HEAD (re-read this seat).
import { chromium } from "playwright";
import { BASE, save } from "./lib.mjs";

const ROOT = "/@fs/Users/mkbabb/Programming/value.js/demo";
const browser = await chromium.launch();
let out;
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "#/atmosphere", { waitUntil: "networkidle" });
        await page.waitForTimeout(2000);
        // live strip stops as stamped in the DOM (U-8): open the Harmony menu
        await page.getByRole("combobox", { name: "Harmony" }).click();
        await page.waitForTimeout(600);
        const domStrips = await page.$$eval("[role=option]", (os) => os.map((o) => ({ opt: o.textContent.trim(), stops: o.querySelector(".preview-strip")?.dataset.stops, w: o.querySelector(".preview-strip")?.getBoundingClientRect().width })));
        await page.keyboard.press("Escape");
        out = await page.evaluate(async ({ ROOT, domStrips }) => {
            const src = await (await fetch(ROOT + "/app/composables/boot/useAtmosphere.ts")).text();
            const dep = (spec) => { const m = src.match(new RegExp(`from "([^"]*/node_modules/\\.vite/deps/${spec}[^"]*)"`)); return m && m[1]; };
            const auroraUrl = dep("@mkbabb_glass-ui_aurora"), colorUrl = dep("@mkbabb_glass-ui_color");
            const cal = await import(ROOT + "/app/composables/boot/atmosphere-calibration.ts");
            const hs = await import(ROOT + "/scenes/atmosphere/aurora-harmony-stops.ts");
            const at = await import(ROOT + "/scenes/atmosphere/aurora-atoms.ts");
            const color = colorUrl ? await import(colorUrl) : null;
            const aurora = auroraUrl ? await import(auroraUrl) : null;
            const cssToOklch = color.cssToOklch;
            // --- transcription of useAtmosphere.ts:75 + :93-111 (served HEAD)
            const DERIVE_SEAM_FLOOR = 0.06;
            const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
            const seedLightness = (seed) => { if (typeof seed !== "string") return typeof seed === "object" && seed ? seed.L : null; try { return cssToOklch(seed).L; } catch { return null; } };
            function guaranteeSeamOffset(config, seed) {
                const seedL = seedLightness(seed); const palette = config.palette;
                if (seedL == null || !palette?.length) return config;
                const meanL = palette.reduce((s, st) => s + st.L, 0) / palette.length;
                const delta = meanL - seedL;
                if (Math.abs(delta) >= DERIVE_SEAM_FLOOR) return config;
                let dir = delta >= 0 ? 1 : -1;
                const need = DERIVE_SEAM_FLOOR - Math.abs(delta);
                const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;
                if (headroom < need) dir = -dir;
                const push = dir * (DERIVE_SEAM_FLOOR - dir * delta);
                return { ...config, palette: palette.map((st) => ({ ...st, L: clamp(st.L + push, 0.02, 0.98) })) };
            }
            const fmt = (v) => v.toFixed(4).replace(/\.?0+$/, "");
            const ser = (p) => p.map((s) => `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})`);
            const ATOMS = at.DEFAULT_AURORA_ATOMS;
            const HARMONIES = ["analogous", "complementary", "split-complementary", "triad", "tetradic", "monochrome"];
            // browser paint read-back
            const cv = document.createElement("canvas"); cv.width = cv.height = 1;
            const g = cv.getContext("2d", { willReadFrequently: true });
            const paint = (css) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1); return Array.from(g.getImageData(0, 0, 1, 1).data.slice(0, 3)); };
            const fieldPal = (atoms, h) => { const a = { ...atoms, harmony: h }; return guaranteeSeamOffset(cal.resolveCalibratedAtmosphere(a), a.seed).palette; };
            const stripStops = (atoms, h) => hs.auroraHarmonyStops(atoms, h);
            // U-4 grid (p2-seam A: L 0.10..0.95 step .05 × C {0,.05,.12,.2,.28} × 6 harmonies, hue 25)
            let total = 0, div = 0, maxDL = 0, maxRGB = 0;
            for (let L = 0.10; L <= 0.95; L += 0.05) for (const C of [0.0, 0.05, 0.12, 0.2, 0.28]) for (const h of HARMONIES) {
                const seed = `oklch(${L.toFixed(2)} ${C} 25)`; const atoms = { ...ATOMS, seed };
                const s = stripStops(atoms, h), fp = fieldPal(atoms, h), f = ser(fp); total++;
                if (JSON.stringify(s) !== JSON.stringify(f)) {
                    div++;
                    const sp = cal.resolveCalibratedAtmosphere({ ...atoms, harmony: h }).palette;
                    maxDL = Math.max(maxDL, ...sp.map((x, i) => Math.abs(x.L - fp[i].L)));
                    s.forEach((css, i) => { const a = paint(css), b = paint(f[i]); maxRGB = Math.max(maxRGB, ...a.map((v, k) => Math.abs(v - b[k]))); });
                }
            }
            const twoSeeds = {};
            for (const seed of ["oklch(0.5 0.16 10)", "oklch(0.62 0.27 9.8)"]) {
                twoSeeds[seed] = HARMONIES.map((h) => { const atoms = { ...ATOMS, seed }; const s = stripStops(atoms, h), f = ser(fieldPal(atoms, h)); let m = 0; s.forEach((css, i) => { const a = paint(css), b = paint(f[i]); m = Math.max(m, ...a.map((v, k) => Math.abs(v - b[k]))); }); return [h, m]; });
            }
            // U-5 B and C grids (p2-seam B/C)
            let fired = 0, broken = 0; const bad = [];
            for (let L = 0.02; L <= 0.99; L += 0.01) for (const C of [0.0, 0.04, 0.1, 0.18, 0.28]) for (const h of HARMONIES) {
                const seed = `oklch(${L.toFixed(2)} ${C} 25)`; const cfg = cal.resolveCalibratedAtmosphere({ ...ATOMS, seed, harmony: h });
                const seedL = cssToOklch(seed).L; const mb = cfg.palette.reduce((s, x) => s + x.L, 0) / cfg.palette.length;
                if (Math.abs(mb - seedL) >= DERIVE_SEAM_FLOOR) continue; fired++;
                const o = guaranteeSeamOffset(cfg, seed); const ma = o.palette.reduce((s, x) => s + x.L, 0) / o.palette.length;
                if (Math.abs(ma - seedL) < DERIVE_SEAM_FLOOR - 1e-9) { broken++; if (bad.length < 3) bad.push({ seed, h, got: +Math.abs(ma - seedL).toFixed(4) }); }
            }
            let sFired = 0, crushed = 0; const crush = [];
            for (let L = 0.02; L <= 0.99; L += 0.01) for (const C of [0.0, 0.1, 0.28]) {
                const seed = `oklch(${L.toFixed(2)} ${C} 25)`; const cfg = cal.resolveCalibratedAtmosphere({ ...ATOMS, seed });
                const before = cfg.palette.map((s) => s.L); const mb = before.reduce((a, b) => a + b, 0) / before.length;
                if (Math.abs(mb - cssToOklch(seed).L) >= DERIVE_SEAM_FLOOR) continue; sFired++;
                const after = guaranteeSeamOffset(cfg, seed).palette.map((s) => s.L);
                const sb = Math.max(...before) - Math.min(...before), sa = Math.max(...after) - Math.min(...after);
                if (Math.abs(sa - sb) > 1e-9) { crushed++; if (crush.length < 3) crush.push({ seed, sb: +sb.toFixed(4), sa: +sa.toFixed(4) }); }
            }
            // U-8 Analogous vs Monochrome — DOM-stamped stops, painted, ΔEok per stop
            const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
            const ok = ([r, gg, b]) => { const [R, G, B] = [lin(r), lin(gg), lin(b)]; const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
            const dE = (a, b) => Math.hypot(...ok(a).map((v, i) => v - ok(b)[i]));
            const an = domStrips.find((d) => /^Analogous/.test(d.opt)), mo = domStrips.find((d) => /^Monochrome/.test(d.opt));
            const anS = an.stops.split("|"), moS = mo.stops.split("|");
            const perStop = anS.map((c, i) => +dE(paint(c), paint(moS[i] ?? moS[moS.length - 1])).toFixed(4));
            // U-11 high-chroma seeds: the strip's oklch() paint vs the same palette through the css-tier hex path
            const gamut = [];
            for (const seed of ["oklch(0.62 0.27 9.8)", "oklch(0.7 0.37 145)", "oklch(0.55 0.32 265)", "oklch(0.85 0.3 110)"]) {
                for (const h of ["analogous", "triad"]) {
                    const pal = guaranteeSeamOffset(cal.resolveCalibratedAtmosphere({ ...ATOMS, seed, harmony: h }), seed).palette;
                    const grad = aurora.paletteToCssGradient(pal);
                    const fieldCols = [...grad.matchAll(/#[0-9a-f]{6}|oklch\([^)]*\)|rgba?\([^)]*\)/gi)].map((m) => m[0]);
                    const stripCols = ser(pal);
                    let m = 0; stripCols.forEach((c, i) => { if (fieldCols[i]) { const a = paint(c), b = paint(fieldCols[i]); m = Math.max(m, ...a.map((v, k) => Math.abs(v - b[k]))); } });
                    gamut.push({ seed, h, maxC: +Math.max(...pal.map((s) => s.C)).toFixed(3), fieldForm: fieldCols.slice(0, 2), nField: fieldCols.length, nStrip: stripCols.length, maxRgbDelta: m });
                }
            }
            return {
                urls: { auroraUrl, colorUrl }, atoms: ATOMS,
                U4: { diverged: div, total, maxDL: +maxDL.toFixed(4), maxRgbDeltaGrid: maxRGB, twoSeeds },
                U5: { fired, broken, bad, spreadFired: sFired, spreadChanged: crushed, crush },
                U8: { analogous: an.stops, monochrome: mo.stops, chipW: an.w, perStopDEok: perStop, meanDEok: +(perStop.reduce((a, b) => a + b, 0) / perStop.length).toFixed(4) },
                U11: gamut,
            };
        }, { ROOT, domStrips });
    } finally { await ctx.close(); }
} finally { await browser.close(); }
save("C-compute.json", out);
console.log(JSON.stringify(out).slice(0, 5000));
