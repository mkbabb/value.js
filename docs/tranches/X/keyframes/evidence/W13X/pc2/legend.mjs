// SERVED MODEL: claude-opus-5-5
// KF.W13X.pc2 — (1) honest BEFORE frames: probe.mjs's `trial` run shot its frames after the
// in-page trial, so frame-before* showed the trialled layout and were deleted. Here the section's
// track is forced back to `auto` in-page (the HEAD bytes' computed value) and shot, beside the
// served (cured) state. (2) the title row's legend sentence: is its text inside the clip, before and after?
// Usage: node legend.mjs <base>
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base] = process.argv;
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [w, h] of [[1024, 768], [1440, 900]]) for (const t of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: t });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, t);
    const p = await ctx.newPage();
    await p.goto(base + "#/spring", { waitUntil: "networkidle" });
    await p.waitForSelector(".spring-heatmap-section", { timeout: 60000 });
    await p.waitForTimeout(2500);
    const field = p.locator(".spring-heatmap[role=application]");
    if (!(await field.count()) || !(await field.first().isVisible())) {
        await p.locator(".spring-heatmap-section [data-figure-title]").click();
        await field.first().waitFor({ state: "visible", timeout: 10000 });
        await p.waitForTimeout(1500);
    }
    const read = (tag) => p.evaluate((tag) => {
        const n = (v) => Math.round(v * 10) / 10;
        const s = document.querySelector(".spring-heatmap-section"), f = s.querySelector(".spring-heatmap[role=application]");
        const clip = s.closest(".configurator-layer-body").parentElement.getBoundingClientRect();
        const lg = s.querySelector("[data-figure-legend]"); let txt = null;
        if (lg) { const r = document.createRange(); r.selectNodeContents(lg); txt = r.getBoundingClientRect(); }
        const fr = f.getBoundingClientRect();
        return `${tag}: gtc=${getComputedStyle(s).gridTemplateColumns} clipRight=${n(clip.right)} field.right=${n(fr.right)} (cut ${n(fr.right - clip.right)}) legendText.right=${txt ? n(txt.right) : "none"} (cut ${txt ? n(txt.right - clip.right) : "-"})`;
    }, tag);
    const shot = (k) => p.screenshot({ path: new URL(`./frame-${k}-${w}-${t}.png`, import.meta.url).pathname });
    console.log(`spring ${w}x${h} ${t}`);
    console.log("  " + await read("served (cured bytes)")); await shot("cured");
    await p.evaluate(() => { document.querySelector(".spring-heatmap-section").style.gridTemplateColumns = "auto"; });
    await p.waitForTimeout(400);
    console.log("  " + await read("track forced to auto (= HEAD ca0b1a0b)")); await shot("before");
    await ctx.close();
}
await b.close();
