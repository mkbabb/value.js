// OD19 fourier detail: F5 corner, F6 glyph ink, F7 control-row slider, V1 width sweep. Headless; one browser; context per cell.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const B = "http://localhost:3100"; const R = {};
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const w of [1440, 390]) {
    const cell = `${scheme}-${w}`; const H = w === 390 ? 844 : 900; const C = (R[cell] = {});
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      // F7 — the SliderControl row on /equation
      await page.goto(B + "/equation", { waitUntil: "load" }); await page.waitForTimeout(2500);
      await page.waitForFunction(() => !document.querySelector("[aria-busy=true]"), null, { timeout: 20000 }).catch(() => {});
      C.eqApi = await page.evaluate(() => performance.getEntriesByType("resource").filter((r) => r.name.includes("/api/")).map((r) => `${r.name.split("/api/")[1].slice(0, 30)} start=${Math.round(r.startTime)} dur=${Math.round(r.duration)} ttfb=${Math.round(r.responseStart - r.requestStart)}`));
      const row = page.locator(".control-row").first();
      if (await row.count()) { await row.scrollIntoViewIfNeeded(); await row.screenshot({ path: `${OUT}${cell}-F7-control-row.png` });
        C.F7 = await row.evaluate((r) => [".control-row-track", ".slider-track", ".track-well", ".slider-range", ".slider-thumb"].map((s) => { const e = r.querySelector(s); if (!e) return `${s}: absent`; const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); return `${s} ${Math.round(b.width)}x${Math.round(b.height)} border=${cs.borderTopWidth} ${cs.borderTopColor.slice(0, 30)} shadow=${cs.boxShadow.slice(0, 70)} bg=${cs.backgroundImage !== "none" ? "image" : cs.backgroundColor.slice(0, 30)} r=${cs.borderTopLeftRadius}`; })); }
      // F6 — app-dock glyph ink boxes
      C.F6 = await page.evaluate(() => [...document.querySelectorAll(".app-dock svg")].filter((s) => s.getBoundingClientRect().width > 8).map((s) => { const b = s.getBoundingClientRect(); let ink = null; try { const bb = s.getBBox(); const vb = s.viewBox.baseVal; const k = vb && vb.width ? b.width / vb.width : 1; ink = `${Math.round(bb.width * k)}x${Math.round(bb.height * k)}`; } catch {} return `${(s.closest("[aria-label]")?.getAttribute("aria-label") ?? "").slice(0, 16)} box=${Math.round(b.width)}x${Math.round(b.height)} ink=${ink}`; }));
      await page.locator(".app-dock").screenshot({ path: `${OUT}${cell}-F6-appdock.png` });
      // F5 — the Image layer card corners on /v
      await page.goto(B + "/v/hazy-etching-cream-elk", { waitUntil: "load" }); await page.waitForTimeout(3000);
      const layer = page.locator(".configurator-layer").first();
      if (await layer.count()) { const bb = await layer.boundingBox();
        if (bb && bb.width > 0) { await page.screenshot({ path: `${OUT}${cell}-F5-layer-top.png`, clip: { x: Math.max(0, bb.x - 16), y: Math.max(0, bb.y - 16), width: Math.min(w - Math.max(0, bb.x - 16), bb.width + 32), height: 90 } }); }
        C.F5 = await layer.evaluate((l) => { const out = []; for (let e = l; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.borderTopWidth !== "0px" || cs.boxShadow !== "none" || cs.outlineStyle !== "none" || cs.backgroundColor !== "rgba(0, 0, 0, 0)") { const b = e.getBoundingClientRect(); out.push(`${e.tagName}.${String(e.className).slice(0, 50)} ${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.width)}x${Math.round(b.height)} bw=${cs.borderTopWidth} r=${cs.borderTopLeftRadius} ctx=${cs.getPropertyValue("--radius-ctx").trim()} inset=${cs.getPropertyValue("--radius-inset").trim()} floor=${cs.getPropertyValue("--radius-floor").trim()} shadow=${cs.boxShadow.slice(0, 40)} bg=${cs.backgroundColor.slice(0, 26)}`); } } return out; }); }
    } catch (e) { C.error = e.message.slice(0, 200); } finally { await ctx.close(); }
  }
  // V1 — width sweep: app-dock run overflow + plate corner per width (light), on /v
  R.V1 = {};
  for (const w of [1440, 1280, 1024, 900, 768, 600, 480, 390, 360]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } }); const page = await ctx.newPage();
    try { await page.goto(B + "/v/hazy-etching-cream-elk", { waitUntil: "load" }); await page.waitForTimeout(2200);
      R.V1[w] = await page.evaluate(() => [...document.querySelectorAll(".glass-dock")].map((d) => { const run = d.querySelector(".dock-run"); const p = getComputedStyle(d.querySelector(".dock-plate")); const b = d.getBoundingClientRect(); return `${d.classList.contains("app-dock") ? "app" : d.classList.contains("animation-dock") ? "anim" : "small"}:${Math.round(b.width)}x${Math.round(b.height)} run=${run.scrollWidth}/${run.clientWidth} plateR=${p.borderStartStartRadius}/${p.borderEndEndRadius}`; }).join(" · "));
      if (w === 1024 || w === 390) await page.locator(".app-dock").screenshot({ path: `${OUT}light-${w}-V1-appdock.png` });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${OUT}detail.json`, JSON.stringify(R, null, 1)); console.log(JSON.stringify(R, null, 1).slice(0, 9000));
