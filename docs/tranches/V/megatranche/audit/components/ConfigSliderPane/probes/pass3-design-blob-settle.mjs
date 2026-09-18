import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/blob", { waitUntil: "networkidle" });
const series = [];
for (let i = 0; i < 24; i++) {
  await p.waitForTimeout(1000);
  const s = await p.evaluate(() => {
    const c = document.querySelector(".goo-blob-canvas");
    if (!c) return null;
    const r = c.getBoundingClientRect();
    const pane = document.querySelector(".config-console")?.closest("div.relative.w-full");
    const pr = pane?.getBoundingClientRect();
    return { t: Math.round(performance.now()), w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: +r.x.toFixed(1), y: +r.y.toFixed(1), formW: pr ? +pr.width.toFixed(1) : null, formH: pr ? +pr.height.toFixed(1) : null };
  });
  if (s) series.push(s);
}
const areas = series.map(s => s.w * s.h);
const form = series[0].formW * series[0].formH;
console.log(JSON.stringify({
  samples: series.map(s => ({ t: s.t, wh: `${s.w}x${s.h}`, area: Math.round(s.w * s.h), ratioFormOverPreview: +(form / (s.w * s.h)).toFixed(1) })),
  formArea: Math.round(form),
  previewAreaMin: Math.round(Math.min(...areas)),
  previewAreaMax: Math.round(Math.max(...areas)),
  ratioMin: +(form / Math.max(...areas)).toFixed(1),
  ratioMax: +(form / Math.min(...areas)).toFixed(1),
}, null, 1));
await b.close();
