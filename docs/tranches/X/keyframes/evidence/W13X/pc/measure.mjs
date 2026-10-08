// SERVED MODEL: claude-opus-5-5
// KF.W13X.pc served falsifier (KF-W13.md addendum (f) `.pc`): at 1440x900 and
// 1024x768, Easing and Spring, light and dark —
//   PC-1 REACH: after a user's wheel over the pane to its end, the pane's last
//        control in document order is wholly in view and hit-tests as itself;
//        and the named control (Easing's duration row, Spring's heatmap) is no
//        taller than the scroll port, inside its scroll range, and not cut on
//        the inline axis (the port has no inline scroll);
//   PC-2 CORNERS: at rest and at the end, no painted plate inside the rail
//        (glass Card / Configurator layer / panel) is cut by any clip box
//        (geometry, all four corners), and its visible TL/TR/BR corner pixels
//        read as the radius (nearer the backdrop outside than the card's own
//        edge pixel; BL is geometry-only, the cartoon stamp paints its outside).
// Headless real Chrome (COHESION §0ei). Usage: node measure.mjs <base> <tag> [outDir]
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const pred = fs.readFileSync(new URL("./pred.js", import.meta.url), "utf8");
const views = (process.env.V || "easing,spring").split(",");
const sizes = (process.env.W || "1440x900,1024x768").split(",").map((s) => s.split("x").map(Number));
const b = await chromium.launch({ channel: "chrome", headless: true });

// Corner pixels: sample the screenshot inside the page (no PNG dependency).
async function cornerRead(p, boxes) {
    const png = (await p.screenshot()).toString("base64");
    return p.evaluate(async ({ png, boxes }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + png;
        await img.decode();
        const cv = document.createElement("canvas");
        cv.width = img.width; cv.height = img.height;
        const g = cv.getContext("2d", { willReadFrequently: true });
        g.drawImage(img, 0, 0);
        const px = (x, y) => [...g.getImageData(Math.round(x), Math.round(y), 1, 1).data.slice(0, 3)];
        const d = (a, c) => Math.max(...a.map((v, i) => Math.abs(v - c[i])));
        const bad = [];
        for (const bx of boxes) {
            const { l, t, r, b: bt } = bx;
            if (r - l < 20 || bt - t < 20) continue;
            const midY = (t + bt) / 2, midX = (l + r) / 2;
            const corners = [
                ["TL", px(l + 1, t + 1), px(l - 6, t + 1), px(l + 1, midY)],
                ["TR", px(r - 2, t + 1), px(r + 6, t + 1), px(r - 2, midY)],
                // BL is read by geometry only: the cartoon stamp (offset -x,+y, glass-owned
                // under O-87) paints that corner's outside, so its pixels cannot tell a
                // radius from a cut (measured: dark C/O/E within 1 level).
                ["BR", px(r - 2, bt - 2), px(r - 2, bt + 6), px(midX, bt - 2)],
            ];
            for (const [k, C, O, E] of corners) {
                if (!(d(C, O) < d(C, E))) bad.push(`${bx.name} ${k} C=${C} O=${O} E=${E}`);
            }
        }
        return bad;
    }, { png, boxes });
}

const res = [];
for (const v of views) for (const [w, h] of sizes) for (const t of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: t });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, t);
    const p = await ctx.newPage();
    await p.goto(base + "#/" + v, { waitUntil: "networkidle" });
    await p.waitForSelector(".controls-pane-wrapper", { timeout: 30000 });
    await p.waitForTimeout(2500);
    const rest = await p.evaluate(`(${pred})(${JSON.stringify(v)})`);
    const restPx = await cornerRead(p, rest.boxes || []);
    if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${v}-${w}-${t}-rest.png` });
    // a user's wheel over the pane, to its end
    const sb = await p.evaluate(() => {
        const s = [...document.querySelectorAll(".controls-surface")].find((e) => e.offsetParent)
            || document.querySelector(".controls-pane-wrapper");
        const r = s.getBoundingClientRect();
        return { x: (r.left + r.right) / 2, y: r.top + Math.min(120, r.height / 2) };
    });
    await p.mouse.move(sb.x, sb.y);
    for (let i = 0; i < 8; i++) { await p.mouse.wheel(0, 400); await p.waitForTimeout(120); }
    await p.waitForTimeout(600);
    const end = await p.evaluate(`(${pred})(${JSON.stringify(v)})`);
    const endPx = await cornerRead(p, end.boxes || []);
    if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${v}-${w}-${t}-end.png` });
    const R = end.reach || {};
    // PC1 (addendum (f) letter): the last control and the named control are reachable on the block axis.
    const reachOk = !!(R.last && R.last.found && R.last.inView && R.last.hit && R.named && R.named.found && R.named.fits && R.named.inRange);
    // PC1i (reported beside, routed when RED): the named control is not cut on the inline axis.
    const inlineOk = !!(R.named && R.named.inline);
    const geomOk = !(rest.cut || []).length && !(end.cut || []).length;
    const pxOk = !restPx.length && !endPx.length;
    res.push({ cell: `${v}@${w}x${h}/${t}`, PC1: reachOk, PC1i: inlineOk, PC2: geomOk && pxOk, geomOk, pxOk, rest, end, restPx, endPx });
    await ctx.close();
}
await b.close();
let red = 0, redI = 0;
for (const r of res) {
    if (!r.PC1 || !r.PC2) red++;
    if (!r.PC1i) redI++;
    console.log(`${r.cell.padEnd(24)} PC1-reach ${r.PC1 ? "GREEN" : "RED  "} PC2-corners ${r.PC2 ? "GREEN" : "RED  "} PC1i-inline ${r.PC1i ? "GREEN" : "RED  "} (geom ${r.geomOk ? "ok" : "CUT"} px ${r.pxOk ? "ok" : "SQUARE"}) | reach=${JSON.stringify({ last: r.end.reach.last, who: r.end.reach.lastWho, named: r.end.reach.named })} | ${[...(r.rest.cut || []), ...(r.end.cut || []), ...r.restPx, ...r.endPx].slice(0, 3).join(" ; ").slice(0, 300)}`);
}
console.log(`CELLS ${res.length} RED ${red} GREEN ${res.length - red} (PC1+PC2, the addendum (f) gate) · PC1i-inline RED ${redI}`);
if (outDir) fs.writeFileSync(`${outDir}/${tag}.json`, JSON.stringify(res, null, 1));
