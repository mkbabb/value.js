// SERVED MODEL: claude-opus-5-5 — X.W12.u3: the pointer-debug overlay paints over the picker (UIA-V-54/676), scrolls (458), formats (671/672/674), focus ring (673), radii (460/675).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, touch, scheme] of [[390, 844, true, "dark"], [1440, 900, false, "light"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?debug=1&color=%23abcdef`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await p.locator(".debug-header").waitFor({ timeout: 60000 }); await p.waitForTimeout(800);
  const r = { vp: w, scheme };
  r.collapsed = await p.locator(".debug-overlay").evaluate((e) => { const c = getComputedStyle(e); return { z: c.zIndex, radius: c.borderTopLeftRadius }; });
  // drag across the picker surface to populate gauges + log
  const s = await p.locator("canvas, .spectrum, [data-picker-surface]").first().boundingBox().catch(() => null);
  await p.locator(".debug-header").click(); await p.waitForTimeout(300);
  if (s) { await p.mouse.move(s.x + s.width / 2, s.y + s.height / 2); await p.mouse.down(); await p.mouse.move(s.x + s.width / 2 + 20, s.y + s.height / 2 + 10, { steps: 5 }); await p.mouse.up(); }
  await p.locator(".debug-btn-danger").click(); await p.waitForTimeout(300);
  r.open = await p.evaluate(() => {
    const o = document.querySelector(".debug-overlay"), hd = document.querySelector(".debug-header"), q = hd.getBoundingClientRect();
    const hit = (x, y) => { const e = document.elementFromPoint(x, y); return !!e && o.contains(e); };
    const or = o.getBoundingClientRect();
    return {
      z: getComputedStyle(o).zIndex, radius: getComputedStyle(o).borderTopLeftRadius,
      headerHitIsOverlay: hit(q.x + q.width / 2, q.y + q.height / 2),
      toggleHitIsOverlay: hit(q.right - 12, q.y + q.height / 2),
      rightEdgeHitIsOverlay: hit(or.right - 8, or.y + or.height / 2),
      scrollPE: getComputedStyle(document.querySelector(".debug-scroll")).pointerEvents,
      btn: [...document.querySelectorAll(".debug-btn")].map((e) => [Math.round(e.getBoundingClientRect().height), getComputedStyle(e).borderTopLeftRadius]),
      gauges: [...document.querySelectorAll(".debug-gauge")].map((g) => g.innerText.replace(/\s+/g, " ")).slice(0, 12),
      firstRows: [...document.querySelectorAll(".debug-event")].slice(0, 4).map((e) => e.innerText.replace(/\s+/g, " ")),
      rawClockInLog: [...document.querySelectorAll(".debug-ts")].some((e) => /^\d{2,}\./.test(e.innerText)),
      noiseInLog: [...document.querySelectorAll(".debug-event")].some((e) => /\bp-1\b|\?\?/.test(e.innerText)),
    };
  });
  await p.keyboard.press("Tab"); await p.locator(".debug-header").focus(); await p.waitForTimeout(100);
  r.focusRing = await p.locator(".debug-header").evaluate((e) => getComputedStyle(e).boxShadow);
  await p.screenshot({ path: `${OUT}u3-debug-${w}-${scheme}.png` });
  res.push(r); await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-u3-debug${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
