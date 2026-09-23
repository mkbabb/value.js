// Read-only probe: what paints the flat saturated slab in the inspector slot mid-switch (/ -> /palettes, dark 1440).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const out = {};
for (const [scheme, from, to, pt] of [["dark", "/", "/palettes", [985, 500]], ["light", "/gradient", "/atmosphere", [900, 500]]]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#" + from, { waitUntil: "networkidle" }).catch(() => {}); await p.waitForTimeout(3500);
  // warm the target chunk once, return, then measure the switch
  await p.evaluate((t) => (location.hash = "#" + t), to); await p.waitForTimeout(2500);
  await p.evaluate((t) => (location.hash = "#" + t), from); await p.waitForTimeout(2500);
  const rows = [];
  await p.evaluate((t) => { window.__t0 = performance.now(); location.hash = "#" + t; }, to);
  for (let i = 0; i < 12; i++) {
    rows.push(await p.evaluate(([x, y]) => {
      const chain = []; let e = document.elementFromPoint(x, y);
      for (let k = 0; e && k < 7; k++, e = e.parentElement) { const cs = getComputedStyle(e); chain.push({ el: e.tagName.toLowerCase() + "." + String(e.className).split(/\s+/).slice(0, 4).join("."), bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 60), op: cs.opacity, bf: cs.backdropFilter, tf: cs.transform.slice(0, 40), anim: e.getAnimations().map((a) => a.animationName || a.transitionProperty).join(",") }); }
      return { ms: Math.round(performance.now() - window.__t0), chain };
    }, pt));
    if (i === 1 || i === 3) await p.screenshot({ path: `${OUT}probe-slab-${scheme}-${from.slice(1) || "home"}-to-${to.slice(1)}-${i}.png` });
    await p.waitForTimeout(40);
  }
  out[scheme] = rows; await ctx.close();
}
await b.close();
writeFileSync(OUT + "probe-slab.json", JSON.stringify(out, null, 1));
