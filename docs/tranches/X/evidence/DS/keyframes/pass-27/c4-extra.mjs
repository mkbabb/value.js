// X-DS keyframes r5 pass 4 — two regression reads beside c4-probe.mjs. Headless real Chrome (§0ei).
// (1) The spring heatmap opened from the rail at rest: the figure is brought into the scroller's view (it opened wholly under the fold).
// (2) The easing sub-pane on the 390 sheet: the hung header row is not clipped.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url)); const OUT = path.join(HERE, "after"); const BASE = process.env.BASE ?? "http://localhost:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true }); const report = {};
try {
  for (const [w, h] of [[1440, 900], [1280, 800]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light" }); const page = await ctx.newPage();
    await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(4000);
    const sc = page.locator(".pane-frame .controls-surface >> visible=true").first();
    await page.locator(".pane-frame button", { hasText: "Peak overshoot" }).first().click(); await page.waitForTimeout(1500);
    report[`heatmap-open-${w}`] = await sc.evaluate((s) => { const r = s.querySelector(".spring-heatmap-section").getBoundingClientRect(); const p = s.getBoundingClientRect(); return { scrollTop: Math.round(s.scrollTop), clientHeight: s.clientHeight, scrollHeight: s.scrollHeight, fadeStart: s.hasAttribute("data-fade-start"), fadeEnd: s.hasAttribute("data-fade-end"), section: { top: Math.round(r.top), bottom: Math.round(r.bottom) }, port: { top: Math.round(p.top), bottom: Math.round(p.bottom) }, shown: Math.round(Math.min(r.bottom, p.bottom) - Math.max(r.top, p.top)) }; });
    const b = await page.locator(".pane-frame").first().boundingBox();
    await page.screenshot({ path: path.join(OUT, `pane-spring-heatmap-open-${w}x${h}-light.png`), clip: { x: b.x - 8, y: b.y - 8, width: b.width + 16, height: b.height + 16 } });
    await ctx.close();
  }
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 2, hasTouch: true, isMobile: true }); const page = await ctx.newPage();
  await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(4500);
  const edit = page.locator('button[aria-label="Edit easing curve"] >> visible=true').first();
  report.phoneEditVisible = await edit.count();
  if (report.phoneEditVisible) { await edit.scrollIntoViewIfNeeded(); await edit.tap(); await page.waitForTimeout(1800);
    report.phoneSubpane = await page.evaluate(() => { const h = [...document.querySelectorAll(".panel-row--detail [data-subpane-header]")].find((e) => e.offsetParent); if (!h) return null; const a = h.querySelector("svg").getBoundingClientRect(); const btn = h.querySelector("button").getBoundingClientRect(); const body = h.parentElement.querySelector("[data-subpane-body]").getBoundingClientRect(); let clip = null; for (let e = h.parentElement; e; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.overflowX !== "visible") { clip = +e.getBoundingClientRect().left.toFixed(1); break; } } return { arrowX: +a.left.toFixed(1), buttonX: +btn.left.toFixed(1), gutterX: +body.left.toFixed(1), clipX: clip }; }); }
  await page.screenshot({ path: path.join(OUT, "cube-easing-edit-390-light.png") });
  await ctx.close();
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "c4-extra.json"), JSON.stringify(report, null, 1)); console.log(JSON.stringify(report, null, 1)); }
