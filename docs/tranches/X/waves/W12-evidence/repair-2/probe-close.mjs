// SERVED MODEL: claude-opus-5-5 — X-W12 Repair 2 (H-2′) close probe: HEADED=1 [SS=1] LEGS=n BASE=http://localhost:PORT node probe-close.mjs
import { chromium } from "@playwright/test";
const b = await chromium.launch({ headless: !process.env.HEADED, args: process.env.SS ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] : [] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: process.env.THEME || "light" });
await p.goto((process.env.BASE || "http://localhost:8733") + "/" + (process.env.HASH || ""));
const t = p.locator(process.env.SEL || ".title-row [data-slot=select-trigger]").first();
await t.waitFor(); await p.waitForTimeout(3000);
const snap = () => p.evaluate(() => {
  const cs = [...document.querySelectorAll("[data-slot=select-content]")];
  return (async () => { const t0 = performance.now(); let n = 0; await new Promise(r => { const f = () => { n++; if (performance.now() - t0 > 250) r(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }); return JSON.stringify({ fps4: n, vis: document.visibilityState, focus: document.hasFocus(), n: cs.length, c: cs.map(el => { const s = getComputedStyle(el); return { st: el.getAttribute("data-state"), op: (+s.opacity).toFixed(3), an: s.animationName, pe: s.pointerEvents, a: el.getAnimations().map(a => `${a.animationName||a.transitionProperty}:${a.playState}:${Math.round(a.currentTime)}`) }; }) }); })();
});
for (let leg = 0; leg < +(process.env.LEGS || 4); leg++) {
  await t.focus(); await p.waitForTimeout(250);
  await p.keyboard.press("Enter");
  const fo = p.locator("[role=option]:focus"); await fo.waitFor();
  const o = await fo.getAttribute("data-space");
  await p.keyboard.press("ArrowDown");
  await p.waitForFunction((o) => document.activeElement?.getAttribute("data-space") && document.activeElement.getAttribute("data-space") !== o, o);
  await p.keyboard.press("Enter");
  const t0 = Date.now();
  for (let i = 0; i < 10; i++) { const r = await snap(); console.log(leg, Date.now() - t0, r.slice(0, 400)); if (r.includes('"n":0')) break; await p.waitForTimeout(300); }
  await p.waitForTimeout(500);
}
await b.close();
