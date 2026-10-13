// SERVED MODEL: claude-opus-5-5
// KF.W13X.pc2 served reading (COHESION §0fa item 1; ESC-W13X-pc-1 / PC1i):
// spring @ 1024x768 and 1440x900, light and dark. With the 'Peak overshoot'
// figure open and brought into view the way a user does it (press the row,
// let the reveal finish), is the heatmap's right edge inside every clip box
// above it (the rail's scroll port, glass's collapse region), and does a
// pointer at its last column land on the field?
// A cut under 0.5 px is clientWidth rounding (the clip is read in whole px), not a cut.
// Read-only: no style is written. Headless real Chrome (§0ei).
// Usage: node probe.mjs <base> [trial]   (trial = also read the in-page
//        minmax(0, 1fr) trial on the section, after the as-is reading)
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, trial] = process.argv;
const sizes = [[1024, 768], [1440, 900]];
const b = await chromium.launch({ channel: "chrome", headless: true });
let red = 0;
for (const [w, h] of sizes) for (const t of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: t });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, t);
    const p = await ctx.newPage();
    await p.goto(base + "#/spring", { waitUntil: "networkidle" });
    await p.waitForSelector(".spring-heatmap-section", { timeout: 60000 });
    await p.waitForTimeout(2500);
    const field = p.locator(".spring-heatmap[role=application]");
    let opened = "open at rest";
    if (!(await field.count()) || !(await field.first().isVisible())) {
        await p.locator(".spring-heatmap-section [data-figure-title]").click();
        opened = "opened by press";
        await field.first().waitFor({ state: "visible", timeout: 10000 });
        await p.waitForTimeout(1500);
    }
    const read = () => p.evaluate(() => {
        const R = (v) => Math.round(v * 10) / 10;
        const s = document.querySelector(".spring-heatmap-section");
        const f = s.querySelector(".spring-heatmap[role=application]");
        const plot = s.querySelector(".spring-heatmap-plot");
        const x = s.querySelector(".spring-heatmap-x");
        // bring the field into view on the BLOCK axis only, as a wheel does
        // (scrollIntoView also scrolls inline, and an `overflow: hidden` box
        // scrolls by script: that hid an 18 px cut in this probe's first draft,
        // before-1.log). Any inline scroll found on a clip box is reported.
        for (let a = f.parentElement; a; a = a.parentElement) {
            const cs = getComputedStyle(a);
            if (/auto|scroll/.test(cs.overflowY) && a.scrollHeight > a.clientHeight + 1) {
                const ar = a.getBoundingClientRect(), r0 = f.getBoundingClientRect();
                if (r0.bottom > ar.bottom - 48) a.scrollTop += r0.bottom - (ar.bottom - 48);
                else if (r0.top < ar.top) a.scrollTop -= ar.top - r0.top;
                break;
            }
        }
        const fr = f.getBoundingClientRect(), sr = s.getBoundingClientRect(), pr = plot.getBoundingClientRect();
        // every ancestor that clips on the inline axis
        const clips = [];
        for (let a = f.parentElement; a && a !== document.documentElement; a = a.parentElement) {
            const cs = getComputedStyle(a);
            if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
                const r = a.getBoundingClientRect();
                const l = r.left + a.clientLeft, rr = l + a.clientWidth;
                clips.push({ el: (a.className + "").slice(0, 46) || a.tagName, ox: cs.overflowX, l: R(l), r: R(rr), cutR: R(fr.right - rr), cutL: R(l - fr.left), sl: a.scrollLeft });
            }
        }
        const tight = clips.reduce((m, c) => Math.max(m, c.cutR), -1e9);
        // pointability of the last column: 3 px inside the right edge, at 3 heights
        const hits = [0.2, 0.5, 0.8].map((k) => {
            const e = document.elementFromPoint(fr.right - 3, fr.top + fr.height * k);
            return !!e && (e === f || f.contains(e));
        });
        const xr = x ? x.getBoundingClientRect() : null;
        return {
            glass: window.__GLASS_UI_VERSION__ ?? null,
            gtc: getComputedStyle(s).gridTemplateColumns, plotGtc: getComputedStyle(plot).gridTemplateColumns,
            section: `${R(sr.left)}..${R(sr.right)}`, plot: `${R(pr.left)}..${R(pr.right)}`,
            field: `${R(fr.left)}..${R(fr.right)}`, fieldY: `${R(fr.top)}..${R(fr.bottom)}`,
            xAxis: xr ? `${R(xr.left)}..${R(xr.right)}` : null,
            worstCutR: tight, hits, clips,
        };
    });
    // EMULATE_HEAD=1: the section's track forced back to `auto`, HEAD ca0b1a0b's computed
    // value (the RED side re-read under the settled predicate, with the cure in the tree).
    if (process.env.EMULATE_HEAD) {
        await p.evaluate(() => { document.querySelector(".spring-heatmap-section").style.gridTemplateColumns = "auto"; });
        await p.waitForTimeout(400);
    }
    const r = await read();
    const ok = r.worstCutR < 0.5 && r.hits.every(Boolean) && r.clips.every((c) => c.sl === 0);
    if (!ok) red++;
    console.log(`${ok ? "GREEN" : "RED"} spring ${w}x${h} ${t} [${opened}] section=${r.section} plot=${r.plot} field=${r.field} y=${r.fieldY} xAxis=${r.xAxis} worstCutR=${r.worstCutR} hits=${r.hits.join(",")} gtc(section)="${r.gtc}" gtc(plot)="${r.plotGtc}"`);
    for (const c of r.clips) console.log(`    clip ${c.el} ox=${c.ox} ${c.l}..${c.r} cutR=${c.cutR} scrollLeft=${c.sl}`);
    if (trial) {
        await p.evaluate(() => { document.querySelector(".spring-heatmap-section").style.gridTemplateColumns = "minmax(0, 1fr)"; });
        await p.waitForTimeout(300);
        const q = await read();
        console.log(`    TRIAL minmax(0, 1fr): section=${q.section} plot=${q.plot} field=${q.field} worstCutR=${q.worstCutR} hits=${q.hits.join(",")}`);
    }
    await p.screenshot({ path: new URL(`./frame-${process.env.TAG || "r"}-${w}-${t}.png`, import.meta.url).pathname });
    await ctx.close();
}
await b.close();
console.log(`cells RED: ${red} of 4`);
process.exit(red ? 1 : 0);
