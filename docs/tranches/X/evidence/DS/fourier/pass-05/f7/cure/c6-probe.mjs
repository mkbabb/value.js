// X-DS fourier pass 5 cure (DS-F7-C6): the canvas legend inset follows the canvas dock's state at 390. Headless real Chrome only (§0ei).
// Usage: node c6-probe.mjs OUT_DIR [BASE]
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const read = () => { const s = document.querySelector(".canvas-stage"); const a = document.querySelector(".controls-dock-anchor"); const r = a?.getBoundingClientRect(); return { expanded: s?.getAttribute("data-dock-expanded"), inset: s && getComputedStyle(s).getPropertyValue("--legend-inset-top"), dock: r && [r.x, r.y, r.width, r.height].map(Math.round) }; };
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "load", timeout: 90000 }); await p.locator(".canvas-stage").first().waitFor({ state: "attached", timeout: 60000 }); await p.waitForTimeout(4000);
  await p.getByRole("tab", { name: "Canvas" }).click(); await p.waitForTimeout(2000);
  out[`collapsed-${theme}`] = await p.evaluate(read);
  await p.screenshot({ path: `${OUT}/v-canvas-tab-${theme}-390.png` });
  const trig = p.locator(".controls-dock-anchor").getByLabel("Expand dock").first();
  if (await trig.count()) { await trig.tap(); await p.waitForTimeout(1500); }
  out[`expanded-${theme}`] = await p.evaluate(read);
  await p.screenshot({ path: `${OUT}/v-canvas-tab-expanded-${theme}-390.png` });
  await ctx.close();
}
writeFileSync(`${OUT}/c6-probe.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
await b.close();
