// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.dock · diagnostic: what caps the scene list at 844x390 (A2-KE-X-13)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 844, height: 390 }, reducedMotion: "reduce", isMobile: true, hasTouch: true });
await p.goto(`${srv.url}/#/cube`, { waitUntil: "load" }); await p.waitForTimeout(2200);
const d = p.locator("[data-dock-tether=top] .glass-dock").first();
for (let k = 0; k < 5 && !(await d.evaluate((e) => e.classList.contains("expanded"))); k++) { await d.hover({ force: true }).catch(() => {}); await p.waitForTimeout(500); }
await p.locator('[data-dock-tether=top] [aria-label="Scene"]').first().focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(700);
console.log(JSON.stringify(await p.evaluate(() => {
  const l = document.querySelector("[role=listbox]"); const chain = [];
  for (let e = l; e && e !== document.body; e = e.parentElement) { const c = getComputedStyle(e); const r = e.getBoundingClientRect(); chain.push(`${e.tagName.toLowerCase()}.${(e.className || "").toString().slice(0, 40)} h${Math.round(r.height)} maxh ${c.maxHeight} ovf ${c.overflowY}`); }
  const inner = [...l.querySelectorAll("*")].filter((e) => e.scrollHeight > e.clientHeight + 1).map((e) => `${e.tagName}.${(e.className || "").toString().slice(0, 30)} ${e.scrollHeight}/${e.clientHeight} ovf ${getComputedStyle(e).overflowY}`);
  const opt = l.querySelector("[role=option]").getBoundingClientRect().height;
  return { chain, inner, optH: opt, n: l.querySelectorAll("[role=option]").length, siblings: [...l.parentElement.children].map((e) => e.tagName + "." + (e.className || "").toString().slice(0, 30) + (e.getAttribute("aria-hidden") ? " aria-hidden" : "")) };
}), null, 1));
await b.close(); process.exit(0);
