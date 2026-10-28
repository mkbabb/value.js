// SS8 B11 — MiniColorPicker second pass: R-4 ring scanlines with located ring/border pixels;
// R-2/R-6 picker geometry where the swatch is unreachable by pointer (opened by keyboard instead).
import { writeFileSync } from "node:fs";
import { withBrowser, cell, mockApi, gotoBrowse, pixels, contrast, lum, EV } from "./lib.mjs";
const out = {};
const IPHONE14 = { viewport: { width: 390, height: 664 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const openTray = async (page) => { await page.getByRole("button", { name: /^Filters/ }).click(); await page.getByRole("textbox", { name: "Search by CSS color" }).waitFor(); await page.waitForTimeout(350); };
const swatch = (page) => page.getByRole("button", { name: /^Open color picker/ });
const rects = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom].map((v) => +v.toFixed(1)); };
  const sw = document.querySelector('[aria-label^="Open color picker"]'); const pc = document.querySelector(".sv-canvas")?.closest("[role=dialog]");
  const a = r(sw), p = r(pc);
  const ov = a && p ? +(100 * Math.max(0, Math.min(a[2], p[2]) - Math.max(a[0], p[0])) * Math.max(0, Math.min(a[3], p[3]) - Math.max(a[1], p[1])) / ((a[2] - a[0]) * (a[3] - a[1]))).toFixed(1) : null;
  return { vp: [innerWidth, innerHeight], swatch: a, picker: p, side: pc?.getAttribute("data-side"), eclipsePctOfTrigger: ov, pickerInViewport: p ? p[1] >= 0 && p[3] <= innerHeight : null };
});

await withBrowser(async (b) => {
  out.r4 = await cell(b, { deviceScaleFactor: 2 }, async (page) => {
    await mockApi(page); await gotoBrowse(page); await openTray(page);
    await swatch(page).click(); await page.locator(".sv-canvas").waitFor(); await page.waitForTimeout(350);
    const res = {};
    for (const [name, fx, fy] of [["default", null, null], ["light-field", 0.12, 0.08], ["hue60-light", 0.25, 0.1]]) {
      if (name === "hue60-light") { const hb = await page.locator(".sv-canvas + div").boundingBox(); await page.mouse.click(hb.x + hb.width * (60 / 360), hb.y + hb.height / 2); await page.waitForTimeout(100); }
      if (fx !== null) { const box = await page.locator(".sv-canvas").boundingBox(); await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy); await page.mouse.move(0, 0); await page.waitForTimeout(150); }
      const t = await page.evaluate(() => { const th = document.querySelector(".sv-canvas > div"); const b = th.getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; });
      const shot = await page.screenshot();
      const [x, y, w, h] = t; const cy = Math.round((y + h / 2) * 2); const x0 = Math.round((x - 6) * 2);
      const line = await pixels(page, shot, { x: x0, y: cy, w: 22, h: 1 });
      const px = []; for (let i = 0; i < line.w; i++) px.push(line.data.slice(i * 4, i * 4 + 3));
      const field = px[1];
      // the ring is the 1-css-px box-shadow just outside the 16px box: device px 10..11 from x0 (css −1..0);
      // the white border is device px 12..15 (css 0..2). Pick the darkest of 9..12 and the brightest of 12..16.
      let ri = 9; for (let i = 9; i <= 12; i++) if (lum(px[i]) < lum(px[ri])) ri = i;
      let bi = 12; for (let i = 12; i <= 16; i++) if (lum(px[i]) > lum(px[bi])) bi = i;
      res[name] = { thumbCss: t.map((v) => +v.toFixed(2)), readout: await page.evaluate(() => document.querySelector(".sv-canvas").parentElement.querySelector(".font-mono").textContent.trim()), scan: px.map((p) => p.join(",")).join(" | "), field, ring: px[ri], ringIdx: ri, border: px[bi], borderIdx: bi, ringVsField: +contrast(px[ri], field).toFixed(3), borderVsField: +contrast(px[bi], field).toFixed(3), ringVsBorder: +contrast(px[ri], px[bi]).toFixed(3) };
      // the hue-rail handle at this hue (scanline through the handle)
      if (name === "hue60-light") {
        const hr = await page.evaluate(() => { const e = document.querySelector(".sv-canvas + div > div"); const b = e.getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; });
        const l2 = await pixels(page, shot, { x: Math.round((hr[0] - 4) * 2), y: Math.round((hr[1] + hr[3] / 2) * 2), w: 14, h: 1 });
        const q = []; for (let i = 0; i < l2.w; i++) q.push(l2.data.slice(i * 4, i * 4 + 3));
        let hb = 0; for (let i = 0; i < q.length; i++) if (lum(q[i]) > lum(q[hb])) hb = i;
        res.handleHue60 = { scan: q.map((p) => p.join(",")).join(" | "), rail: q[1], brightest: q[hb], borderVsRail: +contrast(q[hb], q[1]).toFixed(3) };
      }
    }
    await page.locator(".sv-canvas").locator("xpath=..").screenshot({ path: EV + "mini-thumb-light-field-dsf2.png" });
    return res;
  });

  for (const [name, opt] of [["iphone14", IPHONE14], ["zoom200-of-1280x900", { viewport: { width: 640, height: 450 }, deviceScaleFactor: 2 }], ["iphone14-pro-max-430x739", { viewport: { width: 430, height: 739 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }], ["390x844", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }]]) {
    out["geo-" + name] = await cell(b, opt, async (page) => {
      await mockApi(page); await gotoBrowse(page); await openTray(page);
      const r = { pointerReachable: null };
      try { await swatch(page).click({ timeout: 2500 }); r.pointerReachable = true; } catch { r.pointerReachable = false; await swatch(page).focus(); await page.keyboard.press("Enter"); }
      await page.waitForTimeout(450);
      Object.assign(r, await rects(page));
      r.touchAction = await page.evaluate(() => { const sv = document.querySelector(".sv-canvas"); return sv ? [getComputedStyle(sv).touchAction, getComputedStyle(sv.nextElementSibling).touchAction] : null; });
      if (name === "iphone14") await page.screenshot({ path: EV + "mini-geo-iphone14.png" });
      return r;
    });
  }
});
writeFileSync(EV + "mini2.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
