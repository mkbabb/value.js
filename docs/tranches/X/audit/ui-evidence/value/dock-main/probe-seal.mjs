// dock-main probe: seal ink presence, focus-visible ring on the view trigger, trailing-zone button paint.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await c.newPage();
const logs = []; p.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(m.type() + ": " + m.text().slice(0, 240)); });
await p.goto("http://localhost:9000/#/", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
const res = {};
await p.keyboard.press("Tab"); await p.waitForTimeout(300);
res.focus = await p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { label: e.getAttribute("aria-label"), fv: e.matches(":focus-visible"), outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, shadow: cs.boxShadow, dockRing: cs.getPropertyValue("--dock-ring") }; });
await p.keyboard.press("Tab"); await p.waitForTimeout(300);
res.focus2 = await p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { label: e.getAttribute("aria-label"), fv: e.matches(":focus-visible"), outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, shadow: cs.boxShadow.slice(0, 160) }; });
await p.evaluate(() => document.activeElement.blur());
await p.mouse.move(700, 850);
for (let i = 0; i < 60; i++) { if (await p.evaluate(() => document.querySelector(".glass-dock").classList.contains("collapsed"))) break; await p.waitForTimeout(200); }
await p.waitForTimeout(1500);
res.seal = await p.evaluate(() => {
  const s = document.querySelector(".dock-seal"); const w = document.querySelector(".dock-seal-wax"); const ink = document.querySelector(".dock-seal-ink");
  const box = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { r: [r.x, r.y, r.width, r.height].map((v) => Math.round(v)), op: cs.opacity, vis: cs.visibility, disp: cs.display, color: cs.color, radius: cs.borderTopLeftRadius, filter: cs.filter.slice(0, 80), z: cs.zIndex, pos: cs.position }; };
  const summary = document.querySelector(".dock-layer--summary");
  return { seal: box(s), wax: box(w), ink: box(ink), inkTag: ink?.tagName, inkParent: ink?.parentElement?.className, summary: box(summary), sealInk: getComputedStyle(document.documentElement).getPropertyValue("--seal-ink"), waxChildren: w ? [...w.children].map((c) => c.tagName + "." + String(c.className.baseVal ?? c.className).slice(0, 60)) : null };
});
await p.screenshot({ path: `${OUT}d-light-15-seal-probe.png`, clip: { x: 640, y: 0, width: 160, height: 100 } });
res.logs = logs;
writeFileSync(`${OUT}probe-seal.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await b.close();
