// X-DS fourier pass 4 — measurement probe for the DS-F4 cure. Headless real Chrome (§0ei).
// Usage: node m-probe.mjs [BASE]
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
for (const w of [1440, 390]) {
  const p = await page("light", w);
  await p.goto(`${BASE}/equation`, { waitUntil: "networkidle" });
  await p.waitForTimeout(3000);
  out[`labels-${w}`] = await p.evaluate(() => [...document.querySelectorAll(".labeled-field .label, .control-row-label")].map((e) => `${e.textContent.trim()}:${getComputedStyle(e).fontSize}`));
  out[`chips-${w}`] = await p.evaluate(() => { const g = document.querySelector(".preset-group"); return g ? [...g.children].map((c) => Math.round(c.getBoundingClientRect().top)) : null; });
  await p.context().close();
}
for (const theme of ["light", "dark"]) {
  const p = await page(theme, 390);
  await p.goto(`${BASE}/morph`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  await p.evaluate(() => { const m = document.querySelector("main"); m.scrollTop = 600; });
  await p.waitForTimeout(600);
  out[`morph-band-${theme}`] = await p.evaluate(() => { const s = document.querySelector(".stage-column").getBoundingClientRect(); return { left: s.left, right: s.right, vw: innerWidth, top: s.top, bottom: s.bottom }; });
  const buf = await p.screenshot();
  out[`morph-shot-${theme}`] = buf.length;
  await p.context().close();
}
{
  const p = await page("light", 1440);
  await p.goto(`${BASE}/paper`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  out.toc = await p.evaluate(() => {
    const rows = [...document.querySelectorAll(".paper-sidebar .toc-link[data-depth='0']")];
    return { rail: Math.round(document.querySelector(".paper-sidebar")?.getBoundingClientRect().width ?? -1), rows: rows.map((r) => { const b = r.getBoundingClientRect(); const l = r.querySelector(".toc-label").getBoundingClientRect(); return `${Math.round(b.height)}/${Math.round(l.top - b.top)}`; }) };
  });
  await p.context().close();
}
{
  const p = await page("light", 1440);
  await p.goto(`${BASE}/v/${SLUG}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(4000);
  out.v = await p.evaluate(() => { const s = document.querySelector(".canvas-stage"); const cs = getComputedStyle(s); return { inset: cs.getPropertyValue("--epicycle-inset-bottom"), dockH: cs.getPropertyValue("--dock-h"), overlay: document.querySelector(".controls-overlay")?.getBoundingClientRect().top, stageBottom: s.getBoundingClientRect().bottom }; });
  await p.context().close();
}
{
  const p = await page("light", 390);
  await p.goto(`${BASE}/w/`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  out.h1 = await p.evaluate(() => { const h = document.querySelector(".drop-target-title"); if (!h) return null; const r = document.createRange(); r.selectNodeContents(h); return { h: h.getBoundingClientRect().height, w: h.getBoundingClientRect().width, lines: [...r.getClientRects()].length, fs: getComputedStyle(h).fontSize, maxw: getComputedStyle(h).maxInlineSize }; });
  await p.context().close();
}
console.log(JSON.stringify(out, null, 1));
await b.close();
