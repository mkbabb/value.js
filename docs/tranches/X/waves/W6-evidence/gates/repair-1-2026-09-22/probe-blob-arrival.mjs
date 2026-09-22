// SERVED MODEL: claude-opus-5-5[1m] — X-W6 Repair 1 probe (read-only against a vite dev server; argv[2] = origin)
import { chromium } from "@playwright/test";
const origin = process.argv[2];
const b = await chromium.launch();
for (let i = 0; i < 8; i++) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const t0 = Date.now();
  await p.goto(`${origin}/#/?space=oklch&color=${encodeURIComponent("oklch(0.65 0.3 150)")}`);
  const tLoad = Date.now() - t0;
  const marks = await p.evaluate(async () => {
    const out = {};
    const s = performance.now();
    while (performance.now() - s < 30000) {
      if (!out.anchor && document.querySelector(".hero-blob-anchor")) out.anchor = performance.now();
      if (!out.canvas && document.querySelector('[data-testid="goo-blob-canvas"]')) { out.canvas = performance.now(); break; }
      await new Promise(r => setTimeout(r, 100));
    }
    out.marks = performance.getEntriesByType("mark").filter(m => /overture/.test(m.name)).map(m => m.name.replace("overture:","") + "@" + Math.round(m.startTime)).join(" "); out.fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime;
    out.res = performance.getEntriesByType("resource").filter(r => /HeroBlob|blob/i.test(r.name)).map(r => [r.name.split("/").slice(-1)[0].slice(0,40), Math.round(r.startTime), Math.round(r.responseEnd)]).slice(0,6);
    return out;
  });
  console.log(i, "gotoMs", tLoad, JSON.stringify(marks));
  await ctx.close();
}
await b.close();
