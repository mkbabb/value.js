// SERVED MODEL: claude-opus-5-5 — KF.W13X.r4pane · A2-KE-L1-6 trigger-glyph limb: exploratory crop of the curve trigger (design call; not a banked reading)
import { createRequire } from "node:module";
import { dirname } from "node:path"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, label] = process.argv.slice(2); const dir = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const t of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: t, deviceScaleFactor: 2 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, t);
  const p = await ctx.newPage(); await p.goto(base + "/#/cube"); await p.waitForTimeout(9000);
  const trig = p.locator("button[aria-labelledby]").filter({ has: p.locator(".curve-glyph") }).first();
  console.log(t, await trig.evaluate((e) => ({ name: e.textContent.trim(), box: e.getBoundingClientRect().height, glyph: e.querySelector(".curve-glyph").getBoundingClientRect().toJSON() })));
  await trig.screenshot({ path: `${dir}/frames/${label}-glyph-${t}.png` });
  await ctx.close();
}
await b.close();
