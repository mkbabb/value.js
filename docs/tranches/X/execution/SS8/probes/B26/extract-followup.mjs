// SS-8 B26 — #/extract follow-up cells (Chromium headless): X-5 phone add via the eyedropper,
// XW-37/K-4 RTL with a developed palette, D-8 dark plate ground with the plate's content hidden.
import { chromium, goto, makePng, loadImage, meanRgb, oklchChroma, save, runCells, EV } from "./lib.mjs";
const want = process.argv.slice(2);
const cells = [
  ["x5-phone-eyedropper-add", { w: 390, h: 844, mobile: true, hasTouch: true }, async (page) => {
    await goto(page, "extract");
    await loadImage(page, await makePng(page));
    await page.waitForTimeout(1000);
    await page.locator("text=Pick a color").first().tap();
    await page.waitForTimeout(2000);
    const stage = await page.evaluate(() => { const c = [...(document.querySelector('[role="dialog"]') || document).querySelectorAll("canvas,img")].map((e) => e.getBoundingClientRect()).sort((a, b) => b.width * b.height - a.width * a.height)[0]; return { x: c.x, y: c.y, w: c.width, h: c.height }; });
    await page.touchscreen.tap(stage.x + stage.w * 0.75, stage.y + stage.h * 0.25);
    await page.waitForTimeout(800);
    const snap = () => page.evaluate(() => ({
      hash: location.hash,
      h1: (document.querySelector("h1") || {}).textContent?.trim() || null,
      savedColors: (() => { try { const m = JSON.parse(localStorage.getItem("color-picker-model") || "null"); return m && m.savedColors ? m.savedColors.length : null; } catch { return "unparsed"; } })(),
      lsKeys: Object.keys(localStorage),
      pulse: document.querySelectorAll(".swatch-pulse").length,
      live: [...document.querySelectorAll('[role="status"],[aria-live],[role="alert"],[data-sonner-toast]')].map((e) => e.textContent.trim().slice(0, 60)).filter(Boolean),
      visiblePanes: [...document.querySelectorAll(".pane-shell")].filter((p) => { const r = p.getBoundingClientRect(); return r.width > 0 && r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight; }).map((p) => (p.querySelector("h1,h2,h3") || {}).textContent?.trim()),
      dialogOpen: !!document.querySelector('[role="dialog"]'),
    }));
    const add = page.locator('[title="Add to palette"]').first();
    const addVisible = await add.isVisible().catch(() => false);
    const before = await snap();
    await page.evaluate(() => { window.__m = 0; new MutationObserver((l) => { window.__m += l.length; }).observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true }); });
    if (addVisible) await add.tap();
    await page.waitForTimeout(250);
    const at250 = await snap();
    await page.screenshot({ path: EV + "x5-390-after-add-250ms.png" });
    await page.waitForTimeout(1500);
    const after = { ...(await snap()), mutations: await page.evaluate(() => window.__m) };
    return { addVisible, before, at250, after };
  }],
  ["rtl-image", { w: 1440, h: 900 }, async (page) => {
    await goto(page, "extract");
    await loadImage(page, await makePng(page));
    await page.waitForTimeout(1200);
    const read = () => page.evaluate(() => {
      const grads = [...document.querySelectorAll(".pane-shell *")].filter((e) => /linear-gradient/.test(getComputedStyle(e).backgroundImage) && e.getBoundingClientRect().width > 100).map((e) => ({ cls: String(e.className).slice(0, 60), bg: getComputedStyle(e).backgroundImage.slice(0, 90), dir: getComputedStyle(e).direction }));
      const sw = [...document.querySelectorAll('.pane-shell [aria-label^="Color swatch "]')].map((e) => Math.round(e.getBoundingClientRect().x));
      const sl = document.querySelector('[aria-label="Number of colors"]'); const range = sl && sl.querySelector('[class*="range"], [data-slot="slider-range"]');
      const wrap = sl && sl.closest(".flex.flex-col"); const label = wrap && [...wrap.querySelectorAll("span,label")].find((e) => /colou?rs?/i.test(e.textContent) && e.children.length === 0);
      const b = (e) => e ? { x: Math.round(e.getBoundingClientRect().x), w: Math.round(e.getBoundingClientRect().width) } : null;
      return { dir: document.documentElement.dir || "ltr", grads, swatchXs: sw, slider: b(sl), range: b(range), label: label ? { text: label.textContent.trim(), ...b(label) } : null };
    });
    const ltr = await read();
    await page.evaluate(() => { document.documentElement.dir = "rtl"; });
    await page.waitForTimeout(800);
    const rtl = await read();
    await page.screenshot({ path: EV + "extract-1440-rtl-image.png" });
    return { ltr, rtl };
  }],
  ["d8-dark-plate", { w: 1440, h: 900, scheme: "dark" }, async (page) => {
    await goto(page, "extract");
    await loadImage(page, await makePng(page));
    await page.waitForTimeout(1500);
    const plate = await page.evaluate(() => { const s = document.querySelector('.pane-shell [aria-label^="Palette: "]'); if (!s) return null; for (const c of s.querySelectorAll("*")) c.style.setProperty("visibility", "hidden", "important"); const r = s.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const pane = await page.evaluate(() => { const p = document.querySelector(".pane-shell"); const r = p.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const plateMean = plate ? await meanRgb(page, { x: plate.x + plate.w * 0.3, y: plate.y + plate.h * 0.3, width: plate.w * 0.4, height: plate.h * 0.4 }) : null;
    // ambient = a strip of bare page ground: right of every pane-shell (incl. its 8px caster shadow), lower half.
    const amb = await page.evaluate(() => { const right = Math.max(...[...document.querySelectorAll(".pane-shell")].map((p) => p.getBoundingClientRect().right)) + 10; return { x: Math.min(right, innerWidth - 8), y: 600, width: Math.max(4, Math.min(16, innerWidth - right - 2)), height: 120 }; });
    const ambient = await meanRgb(page, amb);
    await page.screenshot({ path: EV + "extract-1440-dark-plate-hidden.png" });
    return { plate, pane, amb, plateMean, plateC: plateMean && oklchChroma([plateMean.r, plateMean.g, plateMean.b]), ambient, ambientC: oklchChroma([ambient.r, ambient.g, ambient.b]) };
  }],
];
const out = { app: process.env.APP, at: new Date().toISOString() };
const browser = await chromium.launch();
try { await runCells(browser, cells.filter(([n]) => !want.length || want.includes(n)), out); }
finally { await browser.close(); save("extract-followup.json", out); }
