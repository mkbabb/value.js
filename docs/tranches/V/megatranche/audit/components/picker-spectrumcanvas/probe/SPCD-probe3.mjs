import { chromium } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const out = {};
const browser = await chromium.launch();

// ============ 1. space invariance ============
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  const rows = [];
  const read = async (tag) => rows.push({ tag, ...(await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    return {
      space: document.querySelector('.space-trigger, [aria-label="Select color space"]')?.textContent.trim().replace(/\s+/g, " "),
      bg: getComputedStyle(p).backgroundImage,
      aria: p.getAttribute("aria-label"),
      readout: document.querySelector('[class*="readout"]')?.textContent,
      dotLeftTop: [p.querySelector(".spectrum-dot").style.left, p.querySelector(".spectrum-dot").style.top],
    };
  })) });
  await read("initial");
  const trig = page.locator('[aria-label="Select color space"]').first();
  for (const target of ["OKLCH", "HSL", "sRGB", "XYZ"]) {
    try {
      await trig.click(); await page.waitForTimeout(400);
      const opt = page.getByRole("option").filter({ hasText: new RegExp(`^\\s*${target}`, "i") }).first();
      if (await opt.count()) { await opt.click(); await page.waitForTimeout(700); await read(target); }
      else { await page.keyboard.press("Escape"); await page.waitForTimeout(200);
             const names = await page.getByRole("option").allTextContents().catch(() => []);
             rows.push({ tag: target, err: "no option", available: names.slice(0, 12) }); }
    } catch (e) { rows.push({ tag: target, err: String(e).slice(0, 100) }); try { await page.keyboard.press("Escape"); } catch {} }
  }
  out.spaceInvariance = rows;
  await ctx.close();
}

// ============ 2. cost attribution: plate drag vs channel-slider drag ============
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Performance.enable");
  const snap = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
  const drag = async (box, horizOnly) => {
    const a = await snap();
    const t0 = Date.now();
    await page.mouse.move(box.x + 8, box.y + box.height / 2);
    await page.mouse.down();
    const N = 80;
    for (let i = 0; i < N; i++) {
      const x = box.x + 8 + (i / N) * (box.width - 16);
      const y = horizOnly ? box.y + box.height / 2 : box.y + box.height - 8 - (i / N) * (box.height - 16);
      await page.mouse.move(x, y);
      await page.waitForTimeout(6);
    }
    await page.mouse.up();
    await page.waitForTimeout(400);
    const b = await snap();
    return {
      wall_ms: Date.now() - t0, moves: N,
      LayoutCount: b.LayoutCount - a.LayoutCount,
      RecalcStyleCount: b.RecalcStyleCount - a.RecalcStyleCount,
      LayoutDuration_ms: +((b.LayoutDuration - a.LayoutDuration) * 1000).toFixed(1),
      RecalcStyleDuration_ms: +((b.RecalcStyleDuration - a.RecalcStyleDuration) * 1000).toFixed(1),
      ScriptDuration_ms: +((b.ScriptDuration - a.ScriptDuration) * 1000).toFixed(1),
    };
  };
  const plateBox = await page.locator(".spectrum-picker").boundingBox();
  out.costPlate = await drag(plateBox, false);
  // channel slider (same session-update path, producer marker mechanism)
  const sl = page.locator('[role="slider"]').first();
  const slBox = await sl.boundingBox();
  const trackBox = await page.locator(".slider-track").first().boundingBox().catch(() => null);
  out.costSlider = trackBox ? await drag(trackBox, true) : { note: "no .slider-track", slBox };
  // idle control of the same wall duration
  {
    const a = await snap(); const t0 = Date.now();
    await page.waitForTimeout(out.costPlate.wall_ms);
    const b = await snap();
    out.costIdleMatched = {
      wall_ms: Date.now() - t0,
      LayoutCount: b.LayoutCount - a.LayoutCount,
      RecalcStyleCount: b.RecalcStyleCount - a.RecalcStyleCount,
      RecalcStyleDuration_ms: +((b.RecalcStyleDuration - a.RecalcStyleDuration) * 1000).toFixed(1),
      ScriptDuration_ms: +((b.ScriptDuration - a.ScriptDuration) * 1000).toFixed(1),
    };
  }
  // where does the plate live in the card? measure the real Card root shadow
  out.cardChain = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    const chain = [];
    let e = p;
    for (let i = 0; i < 8 && e; i++) {
      const cs = getComputedStyle(e);
      chain.push({ tag: e.tagName, cls: (e.className || "").toString().slice(0, 70), shadow: cs.boxShadow.slice(0, 90) });
      e = e.parentElement;
    }
    return chain;
  });
  await ctx.close();
}

// ============ 3. alt matrices: forced-colors, reduced-motion, zoom, dark, rtl ============
const shots = {};
for (const cfg of [
  { tag: "light", opts: { colorScheme: "light" } },
  { tag: "dark", opts: { colorScheme: "dark" } },
  { tag: "forced-colors", opts: { colorScheme: "light", forcedColors: "active" } },
  { tag: "reduced-motion", opts: { colorScheme: "light", reducedMotion: "reduce" } },
]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...cfg.opts });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const info = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    if (!p) return null;
    const d = p.querySelector(".spectrum-dot");
    const cs = getComputedStyle(p), ds = getComputedStyle(d);
    return {
      bgImage: cs.backgroundImage.slice(0, 160), bgColor: cs.backgroundColor,
      forcedAdjust: cs.forcedColorAdjust, animation: cs.animation,
      dotBg: ds.backgroundColor, dotBorder: ds.border, dotFilter: ds.filter, dotTransform: ds.transform, dotTranslate: ds.translate,
      rect: (() => { const r = p.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })(),
    };
  });
  shots[cfg.tag] = info;
  const b = await page.locator(".spectrum-picker").boundingBox();
  if (b) await page.screenshot({ path: `${OUT}/SPCD-${cfg.tag}.png`, clip: { x: Math.max(0, b.x - 24), y: Math.max(0, b.y - 90), width: b.width + 48, height: b.height + 140 } });
  await ctx.close();
}
out.matrices = shots;

// ============ 4. zoom 200% ============
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1 });
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await page.waitForTimeout(1200);
  out.zoom200 = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    const r = p.getBoundingClientRect();
    const d = p.querySelector(".spectrum-dot").getBoundingClientRect();
    return { plate: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), aspect: +(r.width / r.height).toFixed(3) }, dot: { w: +d.width.toFixed(1), h: +d.height.toFixed(1) }, docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  const b = await page.locator(".spectrum-picker").boundingBox();
  if (b) await page.screenshot({ path: `${OUT}/SPCD-zoom200.png`, clip: { x: Math.max(0, b.x - 20), y: Math.max(0, b.y - 60), width: Math.min(b.width + 40, 1400), height: Math.min(b.height + 120, 880) } });
  await ctx.close();
}

fs.writeFileSync(`${OUT}/SPCD-probe3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
