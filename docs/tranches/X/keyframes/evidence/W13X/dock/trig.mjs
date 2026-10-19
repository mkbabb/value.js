// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.dock · diagnostic: the two dock triggers' box and type (UIA-KF-237)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const b = await chromium.launch();
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const mob = w < 1024;
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: "reduce", isMobile: mob, hasTouch: mob });
  await p.goto(`${srv.url}/#/cube`, { waitUntil: "load" }); await p.waitForTimeout(2200);
  const d = p.locator("[data-dock-tether=top] .glass-dock").first();
  for (let k = 0; k < 5 && !(await d.evaluate((e) => e.classList.contains("expanded"))); k++) { await d.hover({ force: true }).catch(() => {}); await p.waitForTimeout(500); }
  const r = await p.evaluate(() => ["Scene", "@mbabb menu"].map((l) => { const e = document.querySelector(`[data-dock-tether=top] [aria-label="${l}"]`); const c = getComputedStyle(e); const q = e.getBoundingClientRect();
    return `${l}: h ${q.height.toFixed(1)} fs ${c.fontSize} lh ${c.lineHeight} ff ${c.fontFamily.slice(0, 18)} pb ${c.paddingTop}/${c.paddingBottom} minh ${c.minHeight} bs ${c.blockSize} cls ${e.className.slice(0, 90)}`; }));
  console.log(`${w}x${h}\n  ${r.join("\n  ")}`);
  await p.close();
}
await b.close(); process.exit(0);
