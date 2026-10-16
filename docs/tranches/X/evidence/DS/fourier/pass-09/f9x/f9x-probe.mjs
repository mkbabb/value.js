// X-DS fourier pass 9 cure (F9X): AFTER frames + computed reads for DS-F9X-C1/C2/C3 (and the G1 witness). Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const levels = (p) => p.evaluate(() => {
  const card = document.querySelector(".levels-card")?.getBoundingClientRect();
  const strip = document.querySelector(".levels-card .grid");
  const s = strip.getBoundingClientRect();
  const kids = [...strip.children];
  const whole = kids.filter((t) => { const r = t.getBoundingClientRect(); return r.right <= s.right + 1 && r.left >= s.left - 1; });
  const high = kids.filter((t) => t.classList.contains("is-bound")).map((t) => ({ label: t.textContent.trim(), inView: (() => { const r = t.getBoundingClientRect(); return r.right <= s.right + 1 && r.left >= s.left - 1; })() }));
  const cs = getComputedStyle(strip);
  const metrics = [...document.querySelectorAll(".metric")].filter((m) => m.getClientRects().length && m.querySelector(".metric__label") && m.querySelector(".metric__value")).slice(0, 4).map((m) => ({ label: m.querySelector(".metric__label")?.textContent.trim(), labelPx: parseFloat(getComputedStyle(m.querySelector(".metric__label")).fontSize), valuePx: parseFloat(getComputedStyle(m.querySelector(".metric__value")).fontSize) }));
  const rows = new Set(kids.map((t) => Math.round(t.getBoundingClientRect().top))).size;
  const rowTops = kids.map((t) => Math.round(t.getBoundingClientRect().top)); const perRow = [...new Set(rowTops)].map((y) => rowTops.filter((v) => v === y).length);
  return { perRow, levelsCardH: Math.round(card.height), stripW: Math.round(s.width), tiles: kids.length, tilesWhole: whole.length, rows, tileW: Math.round(kids[0].getBoundingClientRect().width), tileH: Math.round(kids[0].getBoundingClientRect().height), bound: high, display: cs.display, metrics, mask: cs.maskImage, gridCols: cs.gridTemplateColumns };
});
const empty = (p) => p.evaluate(() => {
  const st = document.querySelector(".configurator-stage")?.getBoundingClientRect();
  const dt = document.querySelector(".drop-target"); if (!dt) return null;
  const r = dt.getBoundingClientRect(); const cs = getComputedStyle(dt);
  const caps = [...document.querySelectorAll("button.glass-capsule")].filter((e) => e.getClientRects().length).map((e) => ({ text: e.textContent.trim().slice(0, 30), shadow: getComputedStyle(e).boxShadow }));
  const g = dt.querySelector(".drop-target-grid"); const gs = g && getComputedStyle(g);
  const grid = g && { opacity: gs.opacity, bgAttach: gs.backgroundAttachment, bgBlend: gs.backgroundBlendMode, layers: gs.backgroundImage.split("linear-gradient").length - 1, token: getComputedStyle(document.documentElement).getPropertyValue("--paper-grid-opacity").trim() };
  return { grid, stage: st && [Math.round(st.x), Math.round(st.y), Math.round(st.width), Math.round(st.height)], dropTarget: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], bgImage: cs.backgroundImage.slice(0, 120), bgAttach: cs.backgroundAttachment, bgBlend: cs.backgroundBlendMode, capsules: caps };
});
const cells = [["morph", 1440], ["morph", 1024], ["morph", 390], ["visualize", 1440], ["visualize", 390]];
try {
  for (const theme of ["light", "dark"]) for (const [route, w] of cells) {
    const k = `${route}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    try {
      await p.mouse.move(0, 0);
      await p.goto(BASE + "/" + route, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(4000);
      if (route === "morph") { await p.locator(".levels-card").scrollIntoViewIfNeeded(); await p.waitForTimeout(500); }
      await p.screenshot({ path: `${OUT}/${k}.png` });
      out[k] = route === "morph" ? await levels(p) : await empty(p);
    } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
    await ctx.close();
  }
} finally { await b.close(); writeFileSync(`${OUT}/f9x-probe.json`, JSON.stringify(out, null, 1)); }
