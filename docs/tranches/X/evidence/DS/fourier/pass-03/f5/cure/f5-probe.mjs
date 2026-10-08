// X-DS fourier pass 3 (critic F5) — measurement probe. Headless real Chrome only (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const BASE = process.argv[2] ?? "http://localhost:3115"; const OUT = process.argv[3];
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const res = {};
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
for (const theme of ["light", "dark"]) {
  // C1 slider rule + C2 labels on /equation
  for (const w of [1440, 390]) {
    const p = await page(theme, w);
    await p.goto(BASE + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    res[`eq-${theme}-${w}`] = await p.evaluate(() => {
      const labels = [...document.querySelectorAll("label, [data-slot=label], .control-row-label")].filter(e => e.offsetParent).map(e => { const cs = getComputedStyle(e); return [e.textContent.trim().slice(0, 24), cs.fontSize, cs.fontWeight]; });
      const tr = document.querySelector(".control-row-track"); const cs = tr && getComputedStyle(tr);
      return { labels, trackBg: cs && cs.getPropertyValue("--glass-slider-track-background").slice(0, 300) };
    });
    await p.context().close();
  }
  // C3 + C4 + C5 on /morph
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    res[`morph-${theme}-1440`] = await p.evaluate(() => {
      const cards = [...document.querySelectorAll(".config-card")];
      return cards.map(c => ({ title: c.querySelector("h3")?.textContent, rows: [...c.querySelectorAll("[data-card-subtitle], .control-row, .config-field:not(.control-row)")].map(e => Math.round(e.getBoundingClientRect().top)), labels: [...c.querySelectorAll("label")].map(l => [l.textContent.trim(), getComputedStyle(l).fontSize, getComputedStyle(l).fontWeight]) }));
    });
    await p.context().close(); }
  { const p = await page(theme, 390);
    await p.goto(BASE + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
    await p.evaluate(() => { for (const m of [document.querySelector("main"), document.scrollingElement]) if (m) m.scrollTop = 600; });
    await p.waitForTimeout(800);
    res[`morph-${theme}-390`] = await p.evaluate(() => {
      const r = (e) => { const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.right), Math.round(b.top), Math.round(b.bottom)]; };
      const band = document.querySelector(".stage-column"); const cs = getComputedStyle(band);
      const info = document.querySelector(".demo-info"); const plate = document.querySelector(".morph-button");
      const metrics = [...info.children].map(e => [e.textContent.trim().replace(/\s+/g, " "), r(e)]);
      return { band: r(band), bandBorder: cs.borderBottomWidth + " " + cs.borderBottomColor, bandBgImage: cs.backgroundImage.slice(0, 40), info: r(info), plate: r(plate), metrics, vw: innerWidth };
    });
    await p.screenshot({ path: `${OUT}/probe-morph-scrolled-${theme}-390.png` });
    await p.context().close(); }
  // C8 /gallery
  { const p = await page(theme, 1440);
    await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
    res[`gallery-${theme}-1440`] = await p.evaluate(() => {
      const g = document.querySelector(".gallery-grid"); if (!g) return null;
      return { grid: Math.round(g.getBoundingClientRect().width), tracks: getComputedStyle(g).gridTemplateColumns, cards: [...g.children].slice(0, 6).map(c => Math.round(c.getBoundingClientRect().width)), slugs: [...g.querySelectorAll("a, h3, [class*=slug]")].slice(0, 6).map(e => [e.textContent.trim().slice(0, 40), e.scrollWidth > e.clientWidth]) };
    });
    await p.context().close(); }
}
writeFileSync(`${OUT}/f5-probe.json`, JSON.stringify(res, null, 1));
await b.close();
