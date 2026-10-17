// X-DS fourier pass 16 cure (F16X): AFTER frames + the field x of every /morph control row (DS-F16X-C1: one label
// column across the three phase cards and the levels card). Headless real Chrome only (§0ei).
// usage: BASE=http://localhost:3136 node f16x-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3136";
const out = {};
const readRows = (p) => p.evaluate(() => {
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(1) }; };
  return [...document.querySelectorAll(".config-card, .levels-card")].map((c) => ({
    card: c.classList.contains("levels-card") ? "levels" : c.querySelector("[data-card-title]")?.textContent.trim(),
    cardBox: box(c), labelCol: getComputedStyle(c).getPropertyValue("--row-label-col").trim(),
    rows: [...c.querySelectorAll(".control-row")].map((r) => ({ label: r.querySelector(".control-row-label")?.textContent.trim(),
      labelBox: box(r.querySelector(".control-row-label")), field: box(r.querySelector(".control-row-field")) })),
    easeLabel: box(c.querySelector(".config-label")), easeSelect: box(c.querySelector(".config-select")),
  }));
});
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of ["light", "dark"]) for (const w of [1440, 1024, 390]) {
    const k = `morph-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    try {
      await p.mouse.move(0, 0).catch(() => {});
      await p.goto(BASE + "/morph", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(3000);
      await p.screenshot({ path: `${OUT}/${k}-stage.png` });
      await p.locator(".config-card").first().scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
      out[k] = await readRows(p);
      await p.screenshot({ path: `${OUT}/${k}-cards.png` });
      await p.locator(".levels-card").scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
      await p.screenshot({ path: `${OUT}/${k}-levels.png` });
    } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f16x-probe.json`, JSON.stringify(out, null, 1)); }
