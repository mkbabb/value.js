// X-DS fourier pass 4 cure (DS-F6-C1/C2): measures the cured cells. Headless real Chrome only (§0ei).
// Usage: node f6-cure-probe.mjs OUT_DIR [BASE]
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const asides = () => [...document.querySelectorAll(".configurator-aside")].map((e) => { const r = e.getBoundingClientRect(); return { display: getComputedStyle(e).display, top: Math.round(r.top), h: Math.round(r.height) }; });
for (const theme of ["light", "dark"]) {
  for (const [name, route] of [["v", "/v/plush-evening-olive-squid"], ["eq", "/equation"]]) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    await p.goto(BASE + route, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    await p.getByRole("tab", { name: "Canvas" }).click(); await p.waitForTimeout(2000);
    out[`${name}-canvas-${theme}-390`] = {
      asides: await p.evaluate(asides),
      under: await p.evaluate(() => [836, 837, 838, 839, 840, 841].map((y) => { const e = document.elementFromPoint(200, y); return [y, e?.tagName, String(e?.className ?? "").slice(0, 60)]; })),
    };
    await p.screenshot({ path: `${OUT}/${name}-canvas-tab-${theme}-390.png` });
    await p.getByRole("tab", { name: "Controls" }).click(); await p.waitForTimeout(1200);
    out[`${name}-controls-${theme}-390`] = { asides: await p.evaluate(asides), stages: await p.evaluate(() => [...document.querySelectorAll(".configurator-stage")].map((e) => getComputedStyle(e).display)) };
    await p.screenshot({ path: `${OUT}/${name}-controls-tab-${theme}-390.png` });
    await ctx.close();
  }
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  await p.mouse.move(500, 840); await p.waitForTimeout(600);
  await p.locator('[aria-label="More options"]').first().click({ force: true }); await p.waitForTimeout(900);
  out[`moremenu-${theme}`] = await p.evaluate(() => {
    const s = document.querySelector(".menu-sections"); if (!s) return null;
    const kids = [...s.children].map((e) => `${e.getAttribute("role") ?? e.tagName}:${e.getAttribute("data-slot") ?? ""}`);
    const seps = [...s.querySelectorAll('[role="separator"]')].map((e) => Math.round(e.getBoundingClientRect().top));
    const last = s.lastElementChild; const plate = s.closest('[role="menu"]')?.getBoundingClientRect();
    return { kids, seps, lastRole: last?.getAttribute("role"), lastBottom: Math.round(last?.getBoundingClientRect().bottom), plateBottom: Math.round(plate?.bottom) };
  });
  await p.screenshot({ path: `${OUT}/v-moremenu-${theme}-1440.png` });
  await ctx.close();
}
writeFileSync(`${OUT}/f6-cure-probe.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await b.close();
