// SERVED MODEL: claude-opus-5-5 · SS-8 B23 R-11 (wb-mix-animationcanvas, K-13 revival witness):
// does an abspos `width:100%` child of a classic-scrollbar `position:relative; overflow-y:auto` box
// resolve against the scrollbar-reduced padding box (== parent.clientWidth)? Synthetic page + the live app.
// usage: node k13.mjs chromium|webkit
import { launch, BASE, save } from "./lib.mjs";
const engine = process.argv[2] ?? "chromium";
const b = await launch(engine);
const out = { engine };
try {
    const ctx = await b.newContext({ viewport: { width: 800, height: 600 } });
    try {
        const p = await ctx.newPage();
        await p.setContent(`<style>::-webkit-scrollbar{width:15px}</style>
<div id=a style="position:relative;overflow-y:scroll;width:400px;height:200px;border:0;padding:0">
 <canvas id=c style="position:absolute;inset:0;width:100%;height:100%"></canvas>
 <div style="height:900px"></div></div>
<div id=b style="position:relative;overflow-y:auto;width:400px;height:200px;scrollbar-gutter:stable">
 <canvas id=d style="position:absolute;inset:0;width:100%;height:100%"></canvas><div style="height:900px"></div></div>`);
        out.synthetic = await p.evaluate(() => ["a", "b"].map((id) => { const par = document.getElementById(id); const cv = par.querySelector("canvas");
            return { id, parentOffsetW: par.offsetWidth, parentClientW: par.clientWidth, scrollbarPx: par.offsetWidth - par.clientWidth, canvasCssW: +cv.getBoundingClientRect().width.toFixed(2), canvasClientW: cv.clientWidth, agrees: Math.abs(cv.getBoundingClientRect().width - par.clientWidth) < 0.5 }; }));
        if (engine === "chromium") {
            await p.goto(`${BASE}/#/mix`, { timeout: 150000, waitUntil: "domcontentloaded" });
            await p.locator("canvas.z-controls").first().waitFor({ state: "attached", timeout: 120000 });
            await p.waitForTimeout(1500);
            out.app = await p.evaluate(() => { const cv = document.querySelector("canvas.z-controls"); const par = cv.parentElement; const cs = getComputedStyle(par);
                return { parentClientW: par.clientWidth, parentOffsetW: par.offsetWidth, overflowY: cs.overflowY, canvasCssW: +cv.getBoundingClientRect().width.toFixed(2), agrees: Math.abs(cv.getBoundingClientRect().width - par.clientWidth) < 0.5 }; });
        }
    } finally { await ctx.close(); }
} finally { await b.close(); }
save(`k13-${engine}.json`, out);
console.log(JSON.stringify(out));
