import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const out = {};

const CONTRAST = () => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const rgb = (c) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]]; };
  const L = (c) => { const [r, g, b] = rgb(c).map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (a, b) => { const la = L(a), lb = L(b); return +(((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05))).toFixed(2); };
  const st = document.querySelector(".easing-authoring");
  const card = st?.querySelector(".glass-card");
  const path = st?.querySelector("svg path[class*='easing-curve-accent']") || st?.querySelector("svg path");
  const grid = st?.querySelectorAll("svg line");
  const rect0 = st?.querySelector("svg rect");
  const txt = st?.querySelector("svg text");
  const cs = (e, p) => (e ? getComputedStyle(e)[p] : null);
  const cardBg = cs(card, "backgroundColor");
  const restingBg = getComputedStyle(document.documentElement).getPropertyValue("--glass-bg-resting").trim();
  return {
    cardBg, restingBg,
    curve: cs(path, "stroke"),
    curveVsWell: ratio(cs(path, "stroke"), cardBg),
    curveVsRestingToken: restingBg ? ratio(cs(path, "stroke"), restingBg) : null,
    boxRect: cs(rect0, "stroke"),
    boxRectVsWell: ratio(cs(rect0, "stroke"), cardBg),
    gridLine: grid?.[2] ? cs(grid[2], "stroke") : null,
    gridVsWell: grid?.[2] ? ratio(cs(grid[2], "stroke"), cardBg) : null,
    diagonalGuide: grid?.[0] ? cs(grid[0], "stroke") : null,
    diagonalVsWell: grid?.[0] ? ratio(cs(grid[0], "stroke"), cardBg) : null,
    axisLabel: txt ? { fill: cs(txt, "fill"), fontSizePx: +(txt.getBBox().height).toFixed(3), renderedPx: null } : null,
    axisVsWell: txt ? ratio(cs(txt, "fill"), cardBg) : null,
  };
};

for (const scheme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.emulateMedia({ colorScheme: scheme });
  await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.locator('button[aria-label="Author a custom curve"]').first().click();
  await page.waitForTimeout(600);
  out[`contrast_${scheme}`] = await page.evaluate(CONTRAST);

  // axis label rendered size
  out[`axisPx_${scheme}`] = await page.evaluate(() => {
    const t = document.querySelector(".easing-authoring svg text");
    if (!t) return null;
    const r = t.getBoundingClientRect();
    return { w: +r.width.toFixed(2), h: +r.height.toFixed(2), text: t.textContent };
  });

  // TRUE steps tile
  const t = page.locator('[data-specimen="steps"]').first();
  if (await t.count()) {
    await t.scrollIntoViewIfNeeded().catch(() => {});
    await t.click();
    await page.waitForTimeout(900);
    out[`steps_${scheme}`] = await page.evaluate(() => {
      const st = document.querySelector(".easing-authoring");
      const svg = st?.querySelector("svg");
      const vb = svg?.viewBox.baseVal; const r = svg?.getBoundingClientRect();
      const s = vb && r ? Math.min(r.width / vb.width, r.height / vb.height) : 0;
      return { alive: !!st, mode: st?.querySelector("[data-testid='easing-picker']")?.getAttribute("data-mode"), literal: document.querySelector('[id^="easing-interval-"] code')?.textContent?.trim(), viewBox: svg?.getAttribute("viewBox"), box: r ? { w: +r.width.toFixed(1), h: +r.height.toFixed(1) } : null, ink: vb ? { w: +(vb.width * s).toFixed(1), h: +(vb.height * s).toFixed(1) } : null, deadPct: vb && r ? +(100 * (1 - (vb.width * s * vb.height * s) / (r.width * r.height))).toFixed(1) : null, vbRatioVar: st ? getComputedStyle(st).getPropertyValue("--vb-ratio") : null, controls: [...(st?.querySelectorAll("[aria-label]") || [])].map((e) => e.getAttribute("aria-label")), stageH: st ? +st.getBoundingClientRect().height.toFixed(1) : null };
    });
    try { await page.locator(".easing-authoring").first().screenshot({ path: `${OUT}/${scheme}-steps.png`, timeout: 4000 }); } catch { await page.screenshot({ path: `${OUT}/${scheme}-steps-PAGE.png` }); }
  }
  await ctx.close();
}

// boundary z-order forensics
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.locator('button[aria-label="Author a custom curve"]').first().click();
  await page.waitForTimeout(400);
  await page.locator('.easing-authoring [role="slider"]').nth(1).focus();
  await page.keyboard.press("Shift+ArrowUp"); await page.waitForTimeout(200);
  await page.keyboard.press("Shift+ArrowUp"); await page.waitForTimeout(1200);
  out.boundaryZ = await page.evaluate(() => {
    const b = document.querySelector(".vj-error-boundary");
    const p = b?.querySelector("p");
    const r = p.getBoundingClientRect();
    const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
    const top = document.elementFromPoint(cx, cy);
    const stack = document.elementsFromPoint(cx, cy).map((e) => e.tagName + "." + String(e.className).slice(0, 40));
    // sample the actual painted pixel at the glyph centre via html2canvas-free trick: use getComputedStyle only
    return { pRect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, topEl: top ? top.tagName + "." + String(top.className).slice(0, 40) : null, stack, bodyChildren: [...document.body.children].map((e) => e.tagName + "." + String(e.className).slice(0, 30)) };
  });
  await page.screenshot({ path: `${OUT}/boundary-full.png`, clip: { x: 400, y: 380, width: 640, height: 260 } });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/probe6.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
