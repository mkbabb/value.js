// SS-8 · B19 probe D (2026-10-20) — R-12 (P-5 engine midpoint + P-6 chip-vs-library-truth at
// chip scale) and the R-13 ring computed per scheme. Paint runs on the served origin so the
// LIVE sampler module (`shared/ui/color-chips/sample.ts`) is the one imported.
// usage: node probe-d.mjs  → probe-d.json + d-paint-<scheme>.png (pixels read by analyze-d.py)
import { launch, cell, save, go, EVID } from "./lib.mjs";

const FS = "/@fs/Users/mkbabb/Programming/value.js/demo";
const out = {};
const browser = await launch();
try {
    for (const scheme of ["light", "dark"]) {
        out[scheme] = await cell(browser, { colorScheme: scheme, viewport: { width: 900, height: 500 } }, async (page) => {
            await go(page, "mix");
            const res = await page.evaluate(async (FS) => {
                const S = await import(`${FS}/shared/ui/color-chips/sample.ts`);
                const host = document.createElement("div");
                host.id = "b19-paint";
                host.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#fff;padding:20px;display:flex;flex-direction:column;gap:12px";
                document.body.appendChild(host);
                const A = "oklch(0.62 0.27 20)", B = "oklch(0.62 0.27 200)";
                const bar = (bg, w = 200) => { const d = document.createElement("div"); d.style.cssText = `width:${w}px;height:16px;flex:none;background-image:${bg}`; host.appendChild(d); return d; };
                const p5 = {
                    E: bar(`linear-gradient(90deg, ${A}, ${B})`),
                    F: bar(`linear-gradient(in oklch shorter hue 90deg, ${A}, ${B})`),
                    G: bar(`linear-gradient(in srgb 90deg, ${A}, ${B})`),
                };
                const pair = ["oklch(0.62 0.27 9.8)", "rebeccapurple"];
                const W = 42;
                const p6 = {};
                for (const [sp, m] of [["oklch", "longer"], ["hsv", "shorter"], ["xyz", "shorter"], ["hsl", "longer"]]) {
                    const chip = S.sampleInterpolationRamp(pair, sp, m); // what PreviewRamp paints (17)
                    // library truth at each painted column's CENTRE: k = 2W gives t = j/(2W); the odd j
                    // are exactly (i + 0.5)/W, one per column, laid down as hard stops (no engine fill).
                    const dense = S.sampleInterpolationRamp(pair, sp, m, 2 * W);
                    const truth = dense.filter((_, j) => j % 2 === 1);
                    const hard = truth.map((c, i) => `${c} ${(i / W) * 100}% ${((i + 1) / W) * 100}%`).join(", ");
                    p6[`${sp}/${m}`] = { chipN: chip.length, truthN: truth.length, chipEl: bar(`linear-gradient(90deg, ${chip.join(", ")})`, W), truthEl: bar(`linear-gradient(90deg, ${hard})`, W) };
                }
                const rect = (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
                const mix = (base) => { const d = document.createElement("div"); d.style.color = `color-mix(in oklab, var(--foreground) 12%, ${base})`; document.body.appendChild(d); const v = getComputedStyle(d).color; d.remove(); return v; };
                const fgProbe = document.createElement("div"); fgProbe.style.color = "var(--foreground)"; document.body.appendChild(fgProbe);
                const fg = getComputedStyle(fgProbe).color; fgProbe.remove();
                // swatches for the ring composites, painted so the PNG carries the rasterised value
                const sw = {};
                for (const [k, css] of [["ringOverWhite", mix("white")], ["ringOverBlack", mix("black")], ["fg", fg]]) { const d = document.createElement("div"); d.style.cssText = `width:20px;height:20px;flex:none;background:${css}`; host.appendChild(d); sw[k] = { css, rect: rect(d) }; }
                return {
                    p5: Object.fromEntries(Object.entries(p5).map(([k, el]) => [k, rect(el)])),
                    p6: Object.fromEntries(Object.entries(p6).map(([k, v]) => [k, { chipN: v.chipN, truthN: v.truthN, chip: rect(v.chipEl), truth: rect(v.truthEl) }])),
                    swatches: sw,
                    colorScheme: getComputedStyle(document.documentElement).colorScheme,
                };
            }, FS);
            await page.waitForTimeout(300);
            await page.screenshot({ path: `${EVID}/d-paint-${scheme}.png` });
            return { ...res, png: `d-paint-${scheme}.png` };
        });
    }
} finally {
    await browser.close();
}
save("probe-d.json", out);
console.log(JSON.stringify(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.error ?? "ok"]))));
