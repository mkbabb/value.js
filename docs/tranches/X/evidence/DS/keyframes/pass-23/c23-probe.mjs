// X-DS keyframes r4 pass 4 (critic C23) — AFTER probe for the C23 cure. Headless real Chrome only (§0ei).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "after");
const BASE = "http://localhost:5173/";
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const rep = {};
const safe = async (k, fn) => { try { await fn(); } catch (e) { rep[k] = "ERR " + e.message.split("\n")[0]; } };
const crop = async (page, name, loc, pad = 12) => { const b = await loc.boundingBox(); if (!b) { await page.screenshot({ path: path.join(OUT, `${name}.png`) }); return; } await page.screenshot({ path: path.join(OUT, `${name}.png`), clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); };
const edges = () => { const R = (s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { top: Math.round(q.top), bottom: Math.round(q.bottom) }; }; return { paneFrame: R(".pane-frame"), stage: R(".stage-cell .glass-resting, .stage-cell [data-slot=card]") }; };
const readouts = () => ({ readouts: [...document.querySelectorAll(".spring-target .stage-readout")].map((e) => [...e.children].map((c) => c.textContent.trim())), badge: document.querySelector(".spring-target .status-badge")?.textContent.trim() });
const easingHead = () => { const b = (s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: Math.round(q.left), y: Math.round(q.top), r: Math.round(q.right), b: Math.round(q.bottom) }; }; const code = document.querySelector(".literal-text"); return { name: b(".specimen-name"), code: b(".literal-text"), codeFont: code && getComputedStyle(code).fontSize, codeLines: code && Math.round(code.getBoundingClientRect().height / parseFloat(getComputedStyle(code).lineHeight)), copy: b(".specimen-literal button"), card: b(".easing-target"), drawer: b(".easing-target .specimen-drawer") }; };
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    for (const r of ["square", "easing", "spring", "sequence"]) await safe(`${r}-${scheme}`, async () => {
      await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      rep[`edges-${r}-1440-${scheme}`] = await page.evaluate(edges);
      if (r === "easing") rep[`easing-head-1440-${scheme}`] = await page.evaluate(easingHead);
      if (r === "spring") rep[`spring-rest-${scheme}`] = await page.evaluate(readouts);
      await page.screenshot({ path: path.join(OUT, `${r}-1440-${scheme}.png`) });
      if (r === "easing") await crop(page, `crop-easing-gallery-foot-1440-${scheme}`, page.locator(".easing-target").first(), 0);
    });
    await safe(`spring-play-${scheme}`, async () => {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      await page.locator('button[aria-label="Play animation"]').first().click({ force: true }); await page.waitForTimeout(900);
      rep[`spring-sweep-${scheme}`] = await page.evaluate(readouts);
      await page.screenshot({ path: path.join(OUT, `spring-playing-1440-${scheme}.png`) });
      await crop(page, `crop-spring-header-playing-${scheme}`, page.locator(".spring-header").first(), 12);
    });
    await ctx.close();
  }
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await safe(`easing-390-${scheme}`, async () => {
      await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      rep[`easing-head-390-${scheme}`] = await page.evaluate(easingHead);
      await page.screenshot({ path: path.join(OUT, `easing-390-${scheme}.png`) });
      await crop(page, `crop-easing-header-390-${scheme}`, page.locator(".gallery-header").first(), 12);
      await page.locator(".easing-target .specimen-drawer").first().evaluate((e) => { e.scrollTop = 420; }); await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT, `easing-390-scrolled-${scheme}.png`) });
    });
    await ctx.close();
  }
} finally { await browser.close(); fs.writeFileSync(path.join(OUT, "c23-probe.json"), JSON.stringify(rep, null, 1)); console.log(JSON.stringify(rep)); }
