// X-DS fourier pass 15 — AFTER cells for the F17 cure. Headless real Chrome only (§0ei).
// usage: node f17-cure-probe.mjs OUT BASE
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { mkdirSync, writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3125";
const SLUG = "plush-evening-olive-squid";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const measure = () => {
  const vis = (e) => e.getClientRects().length > 0;
  const t = (sel) => [...document.querySelectorAll(sel)].filter(vis).map((e) => {
    const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
    return { text: e.textContent.trim().slice(0, 40), size: cs.fontSize, weight: cs.fontWeight, w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
  });
  const lines = (sel) => [...document.querySelectorAll(sel)].filter(vis).map((e) => {
    const range = document.createRange(); range.selectNodeContents(e);
    const rows = {}; for (const r of range.getClientRects()) { const k = Math.round(r.top); rows[k] = (rows[k] ?? 0) + r.width; }
    // line text: split by word tops
    const words = []; const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) { const n = walker.currentNode; const re = /\S+/g; let m;
      while ((m = re.exec(n.data))) { const rr = document.createRange(); rr.setStart(n, m.index); rr.setEnd(n, m.index + m[0].length); words.push([Math.round(rr.getBoundingClientRect().top), m[0]]); } }
    const byTop = {}; for (const [k, wd] of words) (byTop[k] ??= []).push(wd);
    return { lines: Object.values(byTop).map((a) => a.join(" ")), box: +e.getBoundingClientRect().width.toFixed(1), maxInline: getComputedStyle(e).maxInlineSize };
  });
  return { h1: t("h1"), sectionLabels: t(".configurator-section-label"), layerSubs: t(".configurator-layer-heading > :not(.configurator-section-label)"), cardTitles: t("[data-card-title], .gallery-card .card-title"), dropTitle: lines(".drop-target-title"), errTitle: lines(".stage-error-title") };
};
const routes = { v: `/v/${SLUG}`, w: "/w", "w-empty": "/visualize", equation: "/equation", gallery: "/gallery" };
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) for (const [n, r] of Object.entries(routes)) {
  const p = await page(theme, w);
  await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
  await p.waitForTimeout(n === "v" || n === "equation" ? 5000 : 2500);
  res[`${n}-${theme}-${w}`] = await p.evaluate(measure);
  await p.screenshot({ path: `${OUT}/${n}-${theme}-${w}.png` });
  if (n === "gallery" && w === 1440) {
    const card = p.locator(".gallery-card").nth(1); if (await card.count()) { await card.hover(); await p.waitForTimeout(600); }
    await p.screenshot({ path: `${OUT}/gallery-hover-${theme}-1440.png` });
  }
  await p.context().close();
}
writeFileSync(`${OUT}/f17-cure-probe-after.json`, JSON.stringify(res, null, 1));
await b.close();
