// X-DS keyframes pass 16 (critic C20) — headless real Chrome (§0ei). Usage: node c20-probe.mjs <outdir> [shots]
import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2]; const SHOTS = process.argv[3] === "shots";
const ONLY = process.argv[4] ? process.argv[4].split(",") : null;
const want = (k) => !ONLY || ONLY.includes(k);
const BASE = "http://localhost:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const go = async (page, r) => { await page.goto(`${BASE}#/${r}`, { waitUntil: "domcontentloaded", timeout: 240000 }); await page.evaluate(() => localStorage.clear()); await page.reload({ waitUntil: "domcontentloaded", timeout: 240000 }); await page.waitForTimeout(5000); };
const shot = (p, n, clip) => SHOTS && p.screenshot({ path: path.join(OUT, n + ".png"), ...(clip ? { clip } : {}) });
const R = (b) => b && { x: Math.round(b.x), y: Math.round(b.y), r: Math.round(b.right), b: Math.round(b.bottom), w: Math.round(b.width), h: Math.round(b.height) };
const res = {};
const RS = "globalThis.R = (b) => b && { x: Math.round(b.x), y: Math.round(b.y), r: Math.round(b.right), b: Math.round(b.bottom), w: Math.round(b.width), h: Math.round(b.height) };";
const newCtx = async (o) => { const c = await browser.newContext(o); await c.addInitScript(RS); return c; };
for (const scheme of ["light", "dark"]) {
  const r = (res[scheme] = {});
  if (want("square")) {
    const ctx = await newCtx({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await go(page, "square");
    const geo = () => page.evaluate(() => { const box = document.querySelector(".demo-box"); const cs = getComputedStyle(box); const size = parseFloat(cs.width);
      const travel = parseFloat(cs.getPropertyValue("--square-travel")); const plate = document.querySelector(".square-stage").getBoundingClientRect();
      const arena = document.querySelector(".square-arena").getBoundingClientRect(); const hdr = document.querySelector(".square-telemetry").getBoundingClientRect();
      const cy = arena.top + arena.height / 2, cx = arena.left + arena.width / 2; const swell = 0.56 * size;
      const b = box.getBoundingClientRect();
      return { size: Math.round(size * 10) / 10, travel: Math.round(travel * 10) / 10, plate: { y: Math.round(plate.top), b: Math.round(plate.bottom), h: Math.round(plate.height), w: Math.round(plate.width) }, headerEnd: Math.round(hdr.bottom), headerRight: Math.round(hdr.right),
        fieldCentreY: Math.round(cy), swollenTopAtMinus1: Math.round(cy - travel - swell), swollenBottomAtPlus1: Math.round(cy + travel + swell), clearHeader: cy - travel - swell >= hdr.bottom, clearBottom: cy + travel + swell <= plate.bottom,
        box: { x: Math.round(b.left), y: Math.round(b.top), r: Math.round(b.right), b: Math.round(b.bottom) }, boxOverHeader: b.top < hdr.bottom && b.left < hdr.right }; });
    r.squareRest = await geo();
    await page.locator(".demo-box").focus();
    for (let i = 0; i < 4; i++) { await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowUp"); }
    await page.waitForTimeout(3500);
    r.squareCorner = await geo();
    await shot(page, `square-corner-${scheme}`);
    await ctx.close();
  }
  if (want("edit")) {
    const ctx = await newCtx({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await go(page, "cube");
    await page.locator('[aria-label="Edit easing curve"]').first().click({ timeout: 6000 }); await page.waitForTimeout(1500);
    r.edit = await page.evaluate(() => { const s = document.querySelector(".controls-surface"); const body = document.querySelector("[data-subpane-body]");
      const picker = body.querySelector('[data-slot="easing-picker"]'); const curve = body.querySelector('[data-slot="easing-curve"]'); const ctr = body.querySelector('[data-slot="easing-controls"]');
      const code = [...body.querySelectorAll("code")].find(e => e.getBoundingClientRect().height > 0);
      const sel = body.querySelector('button[role="combobox"]');
      return { range: s.scrollHeight - s.clientHeight, body: R(body.getBoundingClientRect()), picker: R(picker?.getBoundingClientRect()), plot: R(curve?.getBoundingClientRect()), controls: R(ctr?.getBoundingClientRect()), select: R(sel?.getBoundingClientRect()),
        readout: code && { text: code.textContent.trim(), ...R(code.getBoundingClientRect()), scrollW: code.scrollWidth, clientW: code.clientWidth, whole: code.scrollWidth <= code.clientWidth }, surfaceBottom: Math.round(s.getBoundingClientRect().bottom) }; });
    await shot(page, `cube-easing-edit-${scheme}`);
    await ctx.close();
  }
  if (want("phone")) {
    const ctx = await newCtx({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const phone = () => page.evaluate(() => { const sc = document.querySelector('.controls-drawer-content'); const sb = sc.getBoundingClientRect();
      const scroller = [...document.querySelectorAll('.controls-drawer-content *')].find(e => { const c = getComputedStyle(e); return (c.overflowY === "auto" || c.overflowY === "scroll") && e.scrollHeight > 0; }) || sc;
      const masked = document.querySelector('.controls-drawer-content .controls-pane'); const mcs = masked && getComputedStyle(masked);
      const hdr = [...document.querySelectorAll("[data-subpane-header]")].find(h => h.getBoundingClientRect().height > 0); const t = hdr?.querySelector("[data-subpane-title]");
      const mb = masked?.getBoundingClientRect(); const tb = t?.getBoundingClientRect();
      const fade = mcs && parseFloat(getComputedStyle(masked).getPropertyValue("--mask-fade")) ;
      const firstCtl = hdr && [...hdr.parentElement.parentElement.querySelectorAll('button, [role="combobox"], input, [data-slot="easing-curve"]')].filter(e => !hdr.contains(e) && e.getBoundingClientRect().height > 0).map(e => R(e.getBoundingClientRect()))[0];
      return { sheet: R(sb), detent: sc.getAttribute("data-detent") ?? sc.style.getPropertyValue("--detent-t"), maskEl: masked && { cls: masked.className.slice(0, 60), ...R(mb), scrollTop: masked.scrollTop, range: masked.scrollHeight - masked.clientHeight, maskImage: mcs.maskImage.slice(0, 120), anim: mcs.animationName, fade },
        title: tb && { ...R(tb), offsetIntoMask: mb && Math.round(tb.top - mb.top), text: t.textContent.trim().slice(0, 40) }, firstControl: firstCtl, firstControlVisible: firstCtl ? firstCtl.y < sb.bottom - 20 : null, vh: innerHeight }; });
    await go(page, "cube");
    await page.locator('[aria-label="Edit easing curve"]').first().click({ timeout: 6000 }); await page.waitForTimeout(2000);
    r.phoneEdit = await phone();
    await shot(page, `cube-easing-edit-390-${scheme}`);
    await go(page, "cube");
    try { await page.locator('[aria-controls]').filter({ hasText: "layer" }).first().click({ timeout: 6000 }); await page.waitForTimeout(2000); r.phoneLayer = await phone(); await shot(page, `layer-pane-cube-390-${scheme}`); } catch (e) { r.phoneLayer = e.message.slice(0, 100); }
    await ctx.close();
  }
  if (want("easing")) {
    const ctx = await newCtx({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await go(page, "easing");
    r.easingHeader = await page.evaluate(() => { const h = document.querySelector("[data-scene-stage-header]"); const codes = [...h.querySelectorAll("code")].filter(c => c.getBoundingClientRect().height > 0);
      return { header: R(h.getBoundingClientRect()), literals: codes.map(c => { const rects = [...c.getClientRects()].map(R); const range = document.createRange(); range.selectNodeContents(c); const lines = [...range.getClientRects()].map(x => Math.round(x.top)); return { text: c.textContent.trim(), ws: getComputedStyle(c).whiteSpace, rects, lineTops: [...new Set(lines)] }; }) }; });
    await shot(page, `easing-390-${scheme}`);
    await ctx.close();
  }
}
fs.writeFileSync(path.join(OUT, "c20-probe.json"), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await browser.close();
