// M-13 baseline — how much of the viewport does each route actually use?
// Coverage = the union of visible leaf content boxes vs the viewport, plus <main> box + gutters.
import { webkit } from "playwright";
const ROUTES = ["#/", "#/gradient", "#/browse", "#/blob", "#/generate", "#/mix", "#/extract"];
const VIEWPORTS = [
  ["mobile-390", 390, 844], ["mobile-430", 430, 932], ["tablet-768", 768, 1024],
  ["desktop-1440", 1440, 900], ["wide-2560", 2560, 1440], ["ultrawide-3440", 3440, 1440],
];
const b = await webkit.launch();
console.log("route          viewport       mainW%  mainH%  gutterL  gutterR  contentW%  contentH%  text");
for (const [name, w, h] of VIEWPORTS) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  for (const r of ROUTES) {
    await p.goto("http://localhost:9000/" + r, { waitUntil: "networkidle", timeout: 45000 }).catch(()=>{});
    await p.waitForTimeout(1800);
    const m = await p.evaluate(() => {
      const vw = innerWidth, vh = innerHeight;
      const main = document.querySelector("main") || document.body;
      const mr = main.getBoundingClientRect();
      // union of visible leaf boxes (content extent), sampled
      let minX = vw, maxX = 0, minY = vh, maxY = 0, n = 0;
      for (const el of document.querySelectorAll("main *, nav *")) {
        if (el.children.length > 2) continue;
        const b = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        if (b.width < 4 || b.height < 4 || s.visibility === "hidden" || s.opacity === "0") continue;
        n++; minX = Math.min(minX, Math.max(0, b.left)); maxX = Math.max(maxX, Math.min(vw, b.right));
        minY = Math.min(minY, Math.max(0, b.top)); maxY = Math.max(maxY, Math.min(vh, b.bottom));
      }
      return { vw, vh,
        mainWp: Math.round(mr.width / vw * 100), mainHp: Math.round(mr.height / vh * 100),
        gL: Math.round(mr.left), gR: Math.round(vw - mr.right),
        cWp: n ? Math.round((maxX - minX) / vw * 100) : 0,
        cHp: n ? Math.round((maxY - minY) / vh * 100) : 0,
        text: (document.body.innerText || "").replace(/\s+/g, " ").trim().length };
    });
    console.log(`${r.padEnd(14)} ${name.padEnd(14)} ${String(m.mainWp).padStart(5)}%  ${String(m.mainHp).padStart(5)}%  ${String(m.gL).padStart(7)}  ${String(m.gR).padStart(7)}  ${String(m.cWp).padStart(8)}%  ${String(m.cHp).padStart(8)}%  ${m.text}`);
  }
  await ctx.close();
}
await b.close();
