// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.dock · diagnostic: the band, the dock plate, the trigger and the open list's rects (UIA-KF-131 / A2-KE-X-13)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const b = await chromium.launch();
for (const [w, h] of [[390, 844], [844, 390], [1440, 900]]) {
  const mob = w < 1024;
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: "reduce", isMobile: mob, hasTouch: mob });
  await p.goto(`${srv.url}/#/cube`, { waitUntil: "load" }); await p.waitForTimeout(2200);
  const d = p.locator("[data-dock-tether=top] .glass-dock").first();
  for (let k = 0; k < 5 && !(await d.evaluate((e) => e.classList.contains("expanded"))); k++) { await d.hover({ force: true }).catch(() => {}); await p.waitForTimeout(500); }
  const R = (sel) => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; })()`;
  const g0 = await p.evaluate(`({ band: ${R("[data-dock-tether=top] > div")}, plate: ${R("[data-dock-tether=top] .glass-dock")}, trig: ${R('[data-dock-tether=top] [aria-label="Scene"]')} })`);
  await p.locator('[data-dock-tether=top] [aria-label="Scene"]').first().focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(700);
  const g1 = await p.evaluate(`({ band: ${R("[data-dock-tether=top] > div")}, plate: ${R("[data-dock-tether=top] .glass-dock")}, trig: ${R('[data-dock-tether=top] [aria-label="Scene"]')}, list: ${R("[role=listbox]")}, wrap: (() => { const l = document.querySelector("[role=listbox]"); const x = l?.closest("[data-reka-popper-content-wrapper]"); return x ? [getComputedStyle(x).transform, x.style.getPropertyValue("--reka-popper-available-height") || getComputedStyle(x).getPropertyValue("--reka-select-content-available-height")] : null; })() })`);
  console.log(`${w}x${h} rest ${JSON.stringify(g0)} open ${JSON.stringify(g1)}`);
  await p.close();
}
await b.close(); process.exit(0);
