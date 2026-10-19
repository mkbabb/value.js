// X-DS keyframes r3 pass 3 (critic C22) — AFTER probe for the C22 cure. Headless real Chrome only (§0ei).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "after");
const BASE = "http://localhost:5173/";
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const rep = {};
const safe = async (k, fn) => { try { await fn(); } catch (e) { rep[k] = "ERR " + e.message.split("\n")[0]; } };
const crop = async (page, name, loc, pad = 12) => { const b = await loc.boundingBox(); if (!b) { await page.screenshot({ path: path.join(OUT, `${name}.png`) }); return; } await page.screenshot({ path: path.join(OUT, `${name}.png`), clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); };
const filterRead = () => { const f = document.querySelector('[data-easing-catalogue] .catalogue-filter, [data-easing-catalogue] .segmented-tabs, [data-easing-catalogue] .segmented-tabs__mobile'); const sel = document.querySelector("[data-easing-catalogue] .segmented-tabs__trigger, [data-easing-catalogue] [role=combobox]"); const host = document.querySelector("[data-easing-catalogue]"); const b = (e) => e && (({ x, y, width, height }) => ({ x: Math.round(x), y: Math.round(y), w: Math.round(width), h: Math.round(height) }))(e.getBoundingClientRect()); return { host: b(host), strip: b(f), stripScrollW: f?.scrollWidth, select: b(sel), selectText: sel?.textContent.trim(), tabs: f ? [...f.querySelectorAll("button")].map((t) => [t.textContent.trim(), b(t)]) : null }; };
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    // KF-C22-01 — the family filter in the stage and in the cube popover.
    await safe(`easing-${scheme}`, async () => {
      await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      rep[`filter-1440-${scheme}`] = await page.evaluate(filterRead);
      await page.screenshot({ path: path.join(OUT, `easing-1440-${scheme}.png`) });
      await crop(page, `crop-easing-filter-1440-${scheme}`, page.locator("[data-easing-catalogue] .catalogue-filter").first(), 16);
    });
    await safe(`popover-${scheme}`, async () => {
      await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(4000);
      // KF-C22-05 — the pane's inline-end edges.
      rep[`pane-edges-${scheme}`] = await page.evaluate(() => { const R = (e) => e && Math.round(e.getBoundingClientRect().right * 10) / 10; const pc = document.querySelector(".panel-content"); return { fields: [...pc.children].map((c) => [c.className.toString().slice(0, 24), R(c)]), ribbonRow: R(document.querySelector(".param-row")), scrub: R(document.querySelector(".scrub-rail")), ribbonRule: R(document.querySelector(".ribbon-bar [data-slot=separator]")), glyphs: [...pc.querySelectorAll("svg.lucide")].map((s) => [s.getAttribute("class").split(" ")[1], R(s)]) }; });
      await crop(page, `crop-cube-pane-right-edge-${scheme}`, page.locator(".pane-frame").first(), 0);
      await page.locator('.pane-frame button[aria-haspopup]').first().click(); await page.waitForTimeout(1000);
      rep[`filter-popover-${scheme}`] = await page.evaluate(() => { const m = document.querySelector('[data-density="menu"]'); const sel = m?.querySelector("button[role=combobox], .segmented-tabs__trigger"); const strip = m?.querySelector(".segmented-tabs"); return { select: sel && { text: sel.textContent.trim(), w: Math.round(sel.getBoundingClientRect().width) }, strip: !!strip, hostW: m && Math.round(m.getBoundingClientRect().width) }; });
      await page.screenshot({ path: path.join(OUT, `cube-easing-popover-${scheme}.png`) });
      await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    });
    // KF-C22-02 — the Spring sweep: the sampler takes the protagonist's rung.
    await safe(`spring-${scheme}`, async () => {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      await page.locator('button[aria-label="Play animation"]').first().click({ force: true }); await page.waitForTimeout(700);
      rep[`spring-sweep-${scheme}`] = await page.evaluate(() => { const f = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return { w: Math.round(e.getBoundingClientRect().width), bg: c.backgroundColor }; }; return { sweeping: !!document.querySelector(".spring-target--sweeping"), live: !!document.querySelector(".spring-target--live"), sampler: f(".sampler-ball"), liveBall: f(".spring-ball") }; });
      await page.screenshot({ path: path.join(OUT, `spring-playing-1440-${scheme}.png`) });
      await crop(page, `crop-spring-sweep-${scheme}`, page.locator(".spring-target").first(), 0);
    });
    // KF-C22-03 — the Square legend's measure.
    await safe(`square-${scheme}`, async () => {
      await page.goto(`${BASE}#/square`, { waitUntil: "load" }); await page.waitForTimeout(4000);
      rep[`square-legend-${scheme}`] = await page.evaluate(() => { const b = (e) => e && (({ x, width, height }) => ({ x: Math.round(x), w: Math.round(width), h: Math.round(height) }))(e.getBoundingClientRect()); return { field: b(document.querySelector(".square-field")), legend: b(document.querySelector(".square-legend")), caption: b(document.querySelector(".square-legend > span")) }; });
      await page.screenshot({ path: path.join(OUT, `square-1440-${scheme}.png`) });
    });
    await ctx.close();
  }
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await safe(`easing-390-${scheme}`, async () => {
      await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      rep[`filter-390-${scheme}`] = await page.evaluate(filterRead);
      await page.screenshot({ path: path.join(OUT, `easing-390-${scheme}.png`) });
    });
    await safe(`square-390-${scheme}`, async () => {
      await page.goto(`${BASE}#/square`, { waitUntil: "load" }); await page.waitForTimeout(4000);
      rep[`square-legend-390-${scheme}`] = await page.evaluate(() => { const b = (e) => e && (({ x, width, height }) => ({ x: Math.round(x), w: Math.round(width), h: Math.round(height) }))(e.getBoundingClientRect()); return { field: b(document.querySelector(".square-field")), legend: b(document.querySelector(".square-legend")), caption: b(document.querySelector(".square-legend > span")) }; });
      await page.screenshot({ path: path.join(OUT, `square-390-${scheme}.png`) });
    });
    await ctx.close();
  }
} finally { await browser.close(); fs.writeFileSync(path.join(OUT, "c22-probe.json"), JSON.stringify(rep, null, 1)); console.log(JSON.stringify(rep, null, 1)); }
