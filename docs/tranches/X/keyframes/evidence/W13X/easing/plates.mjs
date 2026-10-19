// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.easing · A2-KE-L3-5 stage-plate frame across easing / spring / sequence
// usage: node plates.mjs <baseUrl>
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch();
const SEL = { easing: ".easing-target", spring: ".spring-target", sequence: ".seq-target" };
for (const [w, h, theme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: w < 1024, hasTouch: w < 1024 });
  const p = await ctx.newPage(); const row = {};
  for (const [scene, sel] of Object.entries(SEL)) {
    await p.goto(`${process.argv[2]}/#/${scene}`, { waitUntil: "load" }); await p.waitForTimeout(3000);
    row[scene] = await p.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); const h1 = e.querySelector("h1,h2,h3"); const hr = h1?.getBoundingClientRect();
      const pc = document.querySelector(".panel-content"); const rail = pc ? pc.closest("[class*=card], .card, section")?.getBoundingClientRect() ?? pc.getBoundingClientRect() : null;
      return { left: Math.round(r.left), right: Math.round(innerWidth - r.right), top: Math.round(r.top), titleInset: hr ? Math.round(hr.top - r.top) : null, railGutter: rail && rail.width > 0 && rail.right < r.left ? Math.round(r.left - rail.right) : null }; }, sel);
  }
  console.log(`${w}-${theme}`, JSON.stringify(row));
  await ctx.close();
}
await b.close();
