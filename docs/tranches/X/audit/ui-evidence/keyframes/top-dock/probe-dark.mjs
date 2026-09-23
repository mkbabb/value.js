// probe: why dark resting controls paint a stadium; also popup gutter at 390. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false }); const res = {};
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await p.mouse.move(700, 880); await p.waitForTimeout(3500);
  const bb = await p.locator(".glass-dock").first().boundingBox(); await p.mouse.move(bb.x + 4, bb.y + bb.height / 2); await p.waitForTimeout(1200);
  res[theme] = await p.evaluate(() => [...document.querySelectorAll(".glass-dock .dock-layer--full button, .glass-dock .dock-layer--full [role=combobox]")].map(e => { const c = getComputedStyle(e), a = getComputedStyle(e, "::before"), z = getComputedStyle(e, "::after"); return { n: e.getAttribute("aria-label"), cls: e.className.slice(0, 120), bg: c.backgroundColor, bgi: c.backgroundImage.slice(0, 80), border: c.borderTopWidth + " " + c.borderTopStyle + " " + c.borderTopColor, shadow: c.boxShadow.slice(0, 160), before: a.content !== "none" ? a.backgroundColor + " " + a.boxShadow.slice(0, 80) + " " + a.borderTopColor : "none", after: z.content !== "none" ? z.backgroundColor + " " + z.width : "none" }; }));
  await ctx.close();
}
writeFileSync(OUT + "probe-dark.json", JSON.stringify(res, null, 1)); await b.close();
