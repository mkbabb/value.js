// CHALLENGE-D wb-gradient-stopeditor probe 2 — settled focus ring, unsorted-stop invariant,
// coarse overlap, root-font scaling, reduced motion, white-fill invisibility, chip collision.
import { chromium, devices } from "playwright";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const URL = "http://localhost:9000/#/gradient";
const out = (n) => resolve(HERE, `WBGSE-${n}.png`);
const browser = await chromium.launch();

async function fresh(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...opts });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text().slice(0, 160)); });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2200);
  return { ctx, page, errs };
}
const barGeo = (page) => page.evaluate(() => {
  const b = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();
  return { x: b.x, y: b.y, w: b.width, h: b.height, cy: b.y + b.height / 2 };
});
const labels = (page) => page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map(h => h.getAttribute("aria-label")));
const cssOut = (page) => page.evaluate(() => document.querySelector('[contenteditable="true"]').innerText.replace(/\s+/g, " ").trim());

// ── 1. settled focus ring ──
{
  const { ctx, page } = await fresh();
  await page.evaluate(() => document.querySelector("[data-stop-id]").focus());
  await page.waitForTimeout(600);
  const f = await page.evaluate(() => {
    const h = document.activeElement, cs = getComputedStyle(h);
    const rs = getComputedStyle(document.documentElement);
    return { boxShadow: cs.boxShadow, outline: cs.outline,
             inner: rs.getPropertyValue("--focus-ring-inner").trim(),
             outer: rs.getPropertyValue("--focus-ring-outer").trim(),
             ring: rs.getPropertyValue("--ring").trim() };
  });
  console.log("== 1 settled focus ==\n" + JSON.stringify(f, null, 1));
  const g = await barGeo(page);
  await page.screenshot({ path: out("p2-focus"), clip: { x: g.x - 24, y: g.y - 24, width: 300, height: 88 } });
  await ctx.close();
}

// ── 2. unsorted stops under drag (3 stops) ──
{
  const { ctx, page, errs } = await fresh();
  const g = await barGeo(page);
  await page.mouse.click(g.x + g.w * 0.5, g.cy);
  await page.waitForTimeout(400);
  console.log("== 2 after add ==", JSON.stringify(await labels(page)), "|", await cssOut(page));
  const h0 = await page.evaluate(() => { const b = document.querySelectorAll("[data-stop-id]")[0].getBoundingClientRect(); return { x: b.x + b.width/2, y: b.y + b.height/2 }; });
  await page.mouse.move(h0.x, h0.y);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(h0.x + (g.w * 0.8) * (i / 10), h0.y, { steps: 2 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  console.log("== 2 after drag-past ==", JSON.stringify(await labels(page)));
  console.log("   css:", await cssOut(page));
  console.log("   dom left offsets:", JSON.stringify(await page.evaluate(() =>
    [...document.querySelectorAll("[data-stop-id]")].map(h => h.style.left))));
  for (let p = 0.05; p < 1; p += 0.05) { await page.mouse.move(g.x + g.w * p, g.cy); await page.waitForTimeout(45); }
  console.log("   errors:", JSON.stringify(errs));
  await page.mouse.move(g.x + g.w * 0.3, g.cy);
  await page.waitForTimeout(200);
  await page.screenshot({ path: out("p2-unsorted"), clip: { x: g.x - 20, y: g.y - 40, width: 700, height: 300 } });
  await ctx.close();
}

// ── 3. remove-chip collision + selected state (3 stops) ──
{
  const { ctx, page } = await fresh();
  const g = await barGeo(page);
  await page.mouse.click(g.x + g.w * 0.5, g.cy);
  await page.waitForTimeout(400);
  await page.mouse.click(g.x + g.w * 0.5, g.cy);
  await page.waitForTimeout(300);
  const chip = await page.evaluate(() => {
    const c = document.querySelector(".rail-remove-chip");
    if (!c) return null;
    const b = c.getBoundingClientRect();
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();
    const hr = document.querySelector("hr");
    const hrb = hr ? hr.getBoundingClientRect() : null;
    const h3 = document.querySelectorAll("h3")[0];
    const h3b = h3 ? h3.getBoundingClientRect() : null;
    return { chip: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: b.width, h: b.height, bottom: +b.bottom.toFixed(1) },
             barBottom: +bar.bottom.toFixed(1), hrTop: hrb ? +hrb.top.toFixed(1) : null,
             h3Top: h3b ? +h3b.top.toFixed(1) : null,
             overlapsHr: hrb ? b.bottom > hrb.top : null,
             chipHitAtHrY: hrb ? (() => { const el = document.elementFromPoint(b.x + b.width/2, hrb.top); return el ? (el.getAttribute("aria-label") || el.tagName) : null; })() : null };
  });
  console.log("== 3 remove chip ==\n" + JSON.stringify(chip, null, 1));
  console.log("   stops:", JSON.stringify(await labels(page)));
  await page.screenshot({ path: out("p2-chip"), clip: { x: g.x - 20, y: g.y - 20, width: 700, height: 190 } });
  await ctx.close();
}

// ── 4. coarse pointer: overlapping 44px hit zones ──
{
  const { ctx, page } = await fresh({ ...devices["iPhone 14"] });
  const g = await barGeo(page);
  await page.touchscreen.tap(g.x + g.w * 0.40, g.cy);
  await page.waitForTimeout(400);
  await page.touchscreen.tap(g.x + g.w * 0.46, g.cy);
  await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    const hs = [...document.querySelectorAll("[data-stop-id]")];
    const info = hs.map(h => { const b = h.getBoundingClientRect(); return { label: h.getAttribute("aria-label"), cx: +(b.x + b.width/2).toFixed(1) }; });
    const coarse = matchMedia("(pointer: coarse)").matches;
    const pb = getComputedStyle(hs[1], "::before");
    const hits = hs.map(h => { const b = h.getBoundingClientRect();
      const el = document.elementFromPoint(b.x + b.width/2, b.y + b.height/2);
      return { own: h.getAttribute("aria-label"), hit: el ? (el.getAttribute("aria-label") || el.tagName + "." + String(el.className).split(/\s+/)[0]) : null }; });
    return { coarse, beforeSize: pb.width + "x" + pb.height, railW: +document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect().width.toFixed(1), info, hits };
  });
  console.log("== 4 coarse ==\n" + JSON.stringify(r, null, 1));
  await ctx.close();
}

// ── 5. root font scaling (WCAG 1.4.4 text resize) ──
{
  const { ctx, page } = await fresh();
  const snap = () => page.evaluate(() => { const b = document.querySelector("[data-stop-id]").getBoundingClientRect(); const bar = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { handleW: +b.width.toFixed(2), handleLeftEdge: +b.x.toFixed(2), barLeftEdge: +bar.x.toFixed(2), rootFS: getComputedStyle(document.documentElement).fontSize }; });
  const before = await snap();
  await page.evaluate(() => { document.documentElement.style.fontSize = "20px"; });
  await page.waitForTimeout(400);
  const after = await snap();
  console.log("== 5 root font ==\n" + JSON.stringify({ before, after,
    beforeOverhangPx: +(before.barLeftEdge - before.handleLeftEdge).toFixed(2),
    afterOverhangPx: +(after.barLeftEdge - after.handleLeftEdge).toFixed(2) }, null, 1));
  const g = await barGeo(page);
  await page.screenshot({ path: out("p2-fontscale"), clip: { x: g.x - 26, y: g.y - 16, width: 300, height: 90 } });
  await ctx.close();
}

// ── 6. reduced motion ──
{
  const { ctx, page } = await fresh({ reducedMotion: "reduce" });
  const rm = await page.evaluate(() => {
    const h = document.querySelector("[data-stop-id]");
    const cs = getComputedStyle(h);
    return { reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
             transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration,
             inlineTransition: (h.getAttribute("style") || "").includes("transition") };
  });
  console.log("== 6 reduced-motion ==\n" + JSON.stringify(rm, null, 1));
  await ctx.close();
}

// ── 7. white/near-white ramp: handle visibility ──
{
  const { ctx, page } = await fresh();
  const g = await barGeo(page);
  const editor = page.locator('[contenteditable="true"]');
  await editor.click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type("linear-gradient(90deg, #ffffff 0%, #fafafa 100%)");
  await page.waitForTimeout(1200);
  await page.mouse.click(g.x + g.w * 0.5, g.y - 60);
  await page.waitForTimeout(600);
  console.log("== 7 white ramp ==", JSON.stringify(await labels(page)), "|", (await cssOut(page)).slice(0, 120));
  await page.screenshot({ path: out("p2-white"), clip: { x: g.x - 24, y: g.y - 16, width: 520, height: 76 } });
  await ctx.close();
}
await browser.close();
