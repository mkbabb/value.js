// X-DS fourier pass 7 cure (F7X): AFTER frames + computed reads for DS-F7X-C1/C2 (and the G1 witness). Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const blur = (p) => p.evaluate(() => {
  const sel = ["nav.sidebar-nav", ".floating-toc-bar", ".configurator-stage", "aside.configurator-aside", "article"];
  const r = {};
  for (const s of sel) for (const [i, e] of [...document.querySelectorAll(s)].entries()) {
    const b = e.getBoundingClientRect(); if (!b.width || !b.height) continue;
    const cs = getComputedStyle(e);
    r[`${s}#${i}`] = { backdrop: cs.backdropFilter, bg: cs.backgroundColor, surface: e.getAttribute("data-surface"), cls: [...e.classList].slice(0, 4).join(".") };
  }
  r.backdropBlurEls = [...document.querySelectorAll("body *")].filter((e) => { const b = e.getBoundingClientRect(); return b.width && b.height && getComputedStyle(e).backdropFilter !== "none"; }).map((e) => e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 3).join("."));
  return r;
});
const rows = (p) => p.evaluate(() => {
  const res = [...document.querySelectorAll("[data-control-row]")].filter((e) => e.getClientRects().length).map((e) => {
    const rr = e.getBoundingClientRect();
    const lab = e.querySelector("[data-row-label]").getBoundingClientRect();
    const fld = e.querySelector('[role="spinbutton"]')?.getBoundingClientRect();
    const tr = e.querySelector(".control-row-track").getBoundingClientRect();
    return { label: e.querySelector("[data-row-label]").textContent.trim(), kind: e.dataset.rowKind, h: Math.round(rr.height * 10) / 10, w: Math.round(rr.width),
      inline: tr.top < lab.bottom && tr.bottom > lab.top, labelX: Math.round(lab.left - rr.left), fieldX: fld ? Math.round(fld.left - rr.left) : null, trackX: Math.round(tr.left - rr.left), trackW: Math.round(tr.width) };
  });
  const card = document.querySelector(".levels-card")?.getBoundingClientRect();
  const strip = document.querySelector(".levels-card .grid");
  const tiles = strip ? [...strip.children].filter((t) => { const r = t.getBoundingClientRect(), s = strip.getBoundingClientRect(); return r.right <= s.right + 1 && r.left >= s.left - 1; }).length : null;
  return { rows: res, levelsCardH: card ? Math.round(card.height) : null, tilesWhole: tiles };
});
const cells = [["morph", 1440], ["morph", 1024], ["morph", 390], ["paper", 1440], ["paper", 390], ["equation", 1440], ["equation", 390], ["visualize", 1440]];
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
      await p.screenshot({ path: `${OUT}/${k}.png` });
      out[k] = { blur: await blur(p), ...(route === "morph" || route === "equation" ? await rows(p) : {}) };
    } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
    await ctx.close();
  }
} finally { await b.close(); writeFileSync(`${OUT}/f7x-probe.json`, JSON.stringify(out, null, 1)); }
