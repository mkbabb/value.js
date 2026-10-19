// X-DS keyframes pass 15 (critic C19) — headless real Chrome (§0ei). Usage: node c19-probe.mjs <outdir> [shots]
import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2]; const SHOTS = process.argv[3] === "shots";
const BASE = "http://localhost:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const go = async (page, r) => { await page.goto(`${BASE}#/${r}`, { waitUntil: "domcontentloaded", timeout: 240000 }); await page.evaluate(() => localStorage.clear()); await page.reload({ waitUntil: "domcontentloaded", timeout: 240000 }); await page.waitForTimeout(5000); };
const shot = (p, n, clip) => SHOTS && p.screenshot({ path: path.join(OUT, n + ".png"), ...(clip ? { clip } : {}) });
const res = {};
for (const scheme of ["light", "dark"]) {
  const r = (res[scheme] = {});
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  // C19-01: easing edit drill-in fits
  await go(page, "cube");
  await page.locator('[aria-label="Edit easing curve"]').first().click({ timeout: 6000 }); await page.waitForTimeout(1500);
  r.edit = await page.evaluate(() => { const s = document.querySelector(".controls-surface"); const sb = s.getBoundingClientRect();
    const code = [...document.querySelectorAll("[data-subpane-body] code")].find(e => e.getBoundingClientRect().height > 0); const cb = code?.getBoundingClientRect();
    const h = document.querySelector('.panel-row--detail [data-subpane-header]').getBoundingClientRect();
    return { scrollH: s.scrollHeight, clientH: s.clientHeight, range: s.scrollHeight - s.clientHeight, surfBottom: Math.round(sb.bottom), mask: getComputedStyle(s).maskImage.slice(0, 40), readoutTop: cb && Math.round(cb.top), readoutBottom: cb && Math.round(cb.bottom), headerH: Math.round(h.height) }; });
  await shot(page, `cube-easing-edit-${scheme}`);
  // C19-02: focus ring whole on first and last fields
  await go(page, "cube");
  const fields = [];
  await page.locator(".controls-surface input").first().focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(400);
  for (let i = 0; i < 12; i++) {
    const f = await page.evaluate(() => { const a = document.activeElement; if (!a.closest(".panel-content")) return null; const b = a.getBoundingClientRect(); const cs = getComputedStyle(a);
      const reach = (parseFloat(cs.outlineWidth) || 0) + (parseFloat(cs.outlineOffset) || 0);
      const pc = a.closest(".panel-content").getBoundingClientRect();
      return { label: (a.getAttribute("aria-label") || a.id || a.tagName).slice(0, 30), fv: a.matches(":focus-visible"), reach, inset: { top: Math.round(b.top - pc.top), right: Math.round(pc.right - b.right), bottom: Math.round(pc.bottom - b.bottom), left: Math.round(b.left - pc.left) } }; });
    if (f) { f.whole = Math.min(...Object.values(f.inset)) >= f.reach; fields.push(f); if (i === 0) await shot(page, `focus-first-${scheme}`, { x: 60, y: 60, width: 420, height: 120 }); }
    await page.keyboard.press("Tab"); await page.waitForTimeout(150);
  }
  r.focus = fields;
  // C19-03: square legend during play
  await go(page, "square");
  await page.locator('[aria-label="Play animation"]').first().click({ timeout: 6000 });
  const samples = [];
  for (let i = 0; i < 6; i++) { await page.waitForTimeout(500); samples.push(await page.evaluate(() => { const l = document.querySelector(".square-legend"); return l && { op: +getComputedStyle(l).opacity, state: document.body.innerText.match(/SETTLED|TRACKING|TOURING/)?.[0] }; })); }
  r.legendPlaying = samples;
  await shot(page, `square-playing-${scheme}`);
  await page.locator('[aria-label="Pause animation"]').first().click({ timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(4000);
  r.legendSettled = await page.evaluate(() => { const l = document.querySelector(".square-legend"); return l && { op: +getComputedStyle(l).opacity, state: document.body.innerText.match(/SETTLED|TRACKING|TOURING/)?.[0] }; });
  await shot(page, `square-settled-${scheme}`);
  // T1: sequence ruler 0
  await go(page, "sequence");
  r.ruler = await page.evaluate(() => { const col = document.querySelector(".seq-lane-scrub .lane-track-column") || document.querySelector(".lane-track-column"); const cb = col.getBoundingClientRect(); const ph = col.querySelector(".lane-track-playhead")?.getBoundingClientRect();
    return { originX: Math.round(cb.left * 10) / 10, endX: Math.round(cb.right * 10) / 10, playheadCx: ph && Math.round((ph.left + ph.right) / 2 * 10) / 10,
      labels: [...col.querySelectorAll(".lane-track-tick-label")].map(e => { const b = e.getBoundingClientRect(); const g = e.parentElement.getBoundingClientRect(); return { t: e.textContent.trim(), cx: Math.round((b.left + b.right) / 2 * 10) / 10, left: Math.round(b.left * 10) / 10, right: Math.round(b.right * 10) / 10, gridX: Math.round(g.left * 10) / 10 }; }) }; });
  await shot(page, `sequence-1440-${scheme}`);
  await ctx.close();
}
fs.writeFileSync(path.join(OUT, "c19-probe.json"), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await browser.close();
