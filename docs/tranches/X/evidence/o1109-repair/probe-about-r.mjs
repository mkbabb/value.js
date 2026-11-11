// o1109 repair — the About pane's containment against the picker it sits beside
// or under (owner 2026-11-09: "the picker explanation pane is too large--they
// should be contained a bit more and centred"; adversary defects 1 and 2).
// usage: node probe-about-r.mjs <base-url> <outdir>
// One browser per run, one context per cell, closed in finally.
// Per cell, at rest on Home:
//   TWO TRACKS (About beside the picker):
//     T1 card inline size <= --picker-measure + 0.5   (the picker's measure)
//     T2 |gapL - gapR| <= 1 inside its column            (centred)
//   ONE TRACK (About stacked under the picker):
//     O1 the card shares the picker's centre line (|centre delta| <= 1)
//     O2 it is inset inside the picker's edges by ONE token on both sides,
//        the same at every stacked width: gapL = gapR = --phi-2 (+-1)
//        (contained, and the inset is a rule, not a leftover: 820 no longer
//        stands 64 px in from a 779 px picker)
//     O3 its block size <= the scene band / sqrt(phi) + 1 (contained on the
//        block axis: not a screen-tall plate)
//   ALL: the document never scrolls sideways; reduced motion has the same rest
//        geometry.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const [base, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const CELLS = [[360, 780], [390, 844], [430, 932], [820, 1180], [1440, 900]];
const measure = () => {
    const about = document.querySelector(".about-card");
    const picker = document.querySelector(".pane-wrapper--stage .glass-resting");
    if (!about || !picker) return { missing: true };
    const a = about.getBoundingClientRect(), p = picker.getBoundingClientRect();
    const col = about.closest(".pane-wrapper").getBoundingClientRect();
    const probe = document.createElement("div");
    probe.style.cssText = "position:absolute;visibility:hidden;inline-size:var(--picker-measure);block-size:var(--scene-band-block);padding-left:var(--phi-2)";
    (document.querySelector(".pane-container") ?? document.body).appendChild(probe);
    const pr = probe.getBoundingClientRect();
    const phi2 = parseFloat(getComputedStyle(probe).paddingLeft);
    const measureW = parseFloat(getComputedStyle(probe).inlineSize);
    const band = parseFloat(getComputedStyle(probe).blockSize);
    probe.remove();
    const f = (v) => +v.toFixed(1);
    return {
        oneTrack: a.top >= p.bottom - 1,
        aW: f(a.width), aH: f(a.height), aL: f(a.left), pL: f(p.left), pW: f(p.width),
        gapColL: f(a.left - col.left), gapColR: f(col.right - a.right),
        gapPL: f(a.left - p.left), gapPR: f(p.right - a.right),
        centreD: f((a.left + a.right) / 2 - (p.left + p.right) / 2),
        measureW: f(measureW), phi2, band: f(band),
        title: (() => { const t = about.closest(".pane-shell").querySelector(".pane-header-title"); const r = t.getBoundingClientRect(); return { h: f(r.height), fs: parseFloat(getComputedStyle(t).fontSize) }; })(),
        docSW: document.documentElement.scrollWidth, vw: innerWidth,
    };
};
const rows = [];
const browser = await chromium.launch({ headless: true });
try {
    for (const [w, h] of CELLS) for (const scheme of ["light", "dark"]) for (const reduced of [false, true]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: reduced ? "reduce" : "no-preference" });
        try {
            const page = await ctx.newPage();
            await page.goto(`${base}/#/`, { waitUntil: "load", timeout: 60000 });
            await page.waitForSelector(".about-card .markdown-body > p", { timeout: 45000 });
            await page.waitForTimeout(2000);
            const m = await page.evaluate(measure);
            const pass = { sw: m.docSW <= m.vw };
            if (m.oneTrack) {
                pass.O1 = Math.abs(m.centreD) <= 1;
                pass.O2 = Math.abs(m.gapPL - m.phi2) <= 1 && Math.abs(m.gapPR - m.phi2) <= 1;
                pass.O3 = m.aH <= m.band / Math.sqrt((1 + Math.sqrt(5)) / 2) + 1;
            } else {
                pass.T1 = m.aW <= m.measureW + 0.5;
                pass.T2 = Math.abs(m.gapColL - m.gapColR) <= 1;
            }
            const row = { w, scheme, reduced, ...m, pass, green: Object.values(pass).every(Boolean) };
            rows.push(row);
            if (!reduced) {
                await page.locator(".about-card").scrollIntoViewIfNeeded();
                await page.evaluate(() => scrollBy(0, -120));
                await page.waitForTimeout(300);
                await page.screenshot({ path: `${out}/${w}-${scheme}-about.png` });
            }
            console.log(JSON.stringify(row));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
for (const r of rows.filter((x) => x.reduced)) {
    const f = rows.find((x) => !x.reduced && x.w === r.w && x.scheme === r.scheme);
    r.pass.rm = !!f && Math.abs(f.aW - r.aW) < 0.5 && Math.abs(f.aH - r.aH) < 0.5 && Math.abs(f.aL - r.aL) < 0.5;
    r.green = r.green && r.pass.rm;
}
const red = rows.filter((r) => !r.green);
writeFileSync(`${out}/rows.json`, JSON.stringify({ green: !red.length, rows }, null, 1));
console.log(red.length ? `VERDICT RED (${red.length}/${rows.length} cells)` : `VERDICT GREEN (${rows.length}/${rows.length})`);
process.exitCode = red.length ? 1 : 0;
