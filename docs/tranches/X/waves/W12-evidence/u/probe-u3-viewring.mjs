// SERVED MODEL: claude-opus-5-5 — X.W12.u3: the dock view-select trigger paints a keyboard focus ring (UIA-V-7).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, scheme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/?color=%23abcdef", { waitUntil: "domcontentloaded", timeout: 120000 });
  const t = p.getByRole("combobox", { name: "Select view" }); await t.waitFor({ timeout: 60000 }); await p.waitForTimeout(800);
  let hops = 0; while (hops++ < 60) { await p.keyboard.press("Tab"); if (await t.evaluate((e) => e === document.activeElement)) break; }
  const r = await t.evaluate((e) => ({ focused: e === document.activeElement, fv: e.matches(":focus-visible"), boxShadow: getComputedStyle(e).boxShadow, ring: getComputedStyle(e).getPropertyValue("--dock-ring").slice(0, 120) }));
  r.vp = w; r.scheme = scheme; r.tabs = hops;
  const bb = await t.boundingBox(); await p.screenshot({ path: `${OUT}u3-viewring-${w}-${scheme}${process.env.RUN ?? ""}.png`, clip: { x: Math.max(0, bb.x - 16), y: Math.max(0, bb.y - 16), width: bb.width + 32, height: bb.height + 32 } });
  res.push(r); await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-u3-viewring${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
