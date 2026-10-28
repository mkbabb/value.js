// SS-8 B16 — rename follow-up (SS8-0463 U-3, SS8-0465 U-5): (1) the focus timeline from the "Rename" menu
// item to 1.5 s after (where does the field's mount focus go?); (2) the press bleed with the field actually
// focused (a real click into it, then typed spaces), sampled per frame, at no-preference and reduce.
// Headless Chromium, one browser, a new context per cell, closed in finally. API mocked (lib.mjs).
import { chromium, newCell, mockApi, save, EV, APP } from "./lib.mjs";
const now = new Date().toISOString();
const SEED = JSON.stringify({ version: 1, palettes: [{ id: "ss8-local-1", name: "Harbor dusk at low tide", slug: "ss8-local-1", colors: ["oklch(0.45 0.12 250)", "oklch(0.7 0.1 200)", "oklch(0.85 0.08 80)"].map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true }] });
const CARD = '[role="article"][aria-label="Palette: Harbor dusk at low tide"]';
const out = {};
const sampler = (page, ms) => page.evaluate(([sel, ms]) => { window.__s = []; const t0 = performance.now(); const card = document.querySelector(sel);
  const tick = () => { const cs = getComputedStyle(card); window.__s.push({ t: +(performance.now() - t0).toFixed(0), tf: cs.transform, scale: cs.scale, pt: card.style.getPropertyValue("--press-t") });
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, [CARD, ms]);
const summarize = (s) => { let m = 0; for (const x of s) { const mm = x.tf.match(/matrix\(([^)]+)\)/); if (mm) { const [a, , , d] = mm[1].split(",").map(Number); m = Math.max(m, Math.abs(1 - a), Math.abs(1 - d)); } }
  const pts = s.map((x) => Number(x.pt || 0)); return { frames: s.length, maxScaleDev: +m.toFixed(4), maxPressT: Math.max(...pts), framesPressed: pts.filter((v) => v > 0).length, scales: [...new Set(s.map((x) => x.scale))].slice(0, 10), ptTrace: s.filter((x) => Number(x.pt || 0) > 0).slice(0, 14).map((x) => `${x.t}:${x.pt}:${x.scale}`), distinctTf: [...new Set(s.map((x) => x.tf))].slice(0, 8) }; };
const b = await chromium.launch({ headless: true });
try {
  for (const rm of ["no-preference", "reduce"]) {
    const rec = (out[rm] = {});
    const { ctx, page, errs } = await newCell(b, { reducedMotion: rm, seed: SEED });
    try {
      await mockApi(ctx);
      await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      const card = page.locator(CARD).first(); await card.waitFor({ state: "visible", timeout: 15000 });
      await card.getByRole("button", { name: "Palette menu" }).click(); await page.waitForTimeout(500);
      await page.evaluate(() => { window.__f = []; const t0 = performance.now(); let last = "";
        const k = () => { const a = document.activeElement; return a ? `${a.tagName}${a.getAttribute("aria-label") ? "[" + a.getAttribute("aria-label") + "]" : ""}${a.getAttribute("role") ? "{" + a.getAttribute("role") + "}" : ""}` : "null"; };
        document.addEventListener("focusin", (e) => window.__f.push({ t: +(performance.now() - t0).toFixed(0), ev: "focusin", k: k() }), true);
        const tick = () => { const s = k(); if (s !== last) { window.__f.push({ t: +(performance.now() - t0).toFixed(0), k: s }); last = s; } if (performance.now() - t0 < 2500) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
      await page.getByRole("menuitem", { name: /Rename/ }).first().click(); await page.waitForTimeout(1500);
      rec.focusTimeline = await page.evaluate(() => window.__f);
      const input = card.locator('input[aria-label="Palette name"]');
      rec.selAfterOpen = await input.evaluate((el) => ({ start: el.selectionStart, end: el.selectionEnd, focused: document.activeElement === el }));
      // Press bleed: a real click into the field, then End + typed spaces.
      await sampler(page, 2600);
      // Held, human-tempo input (~100 ms holds): a pointer press into the field, then typed keys.
      const bx = await input.boundingBox(); await page.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2);
      await page.mouse.down(); await page.waitForTimeout(110); await page.mouse.up(); await page.waitForTimeout(250);
      await page.keyboard.press("End");
      for (const key of [" ", "x", " ", " "]) { await page.keyboard.down(key); await page.waitForTimeout(100); await page.keyboard.up(key); await page.waitForTimeout(140); }
      await page.waitForTimeout(1200);
      rec.focusedAfterClick = await input.evaluate((el) => document.activeElement === el);
      rec.valueAfter = await input.inputValue();
      rec.press = summarize(await page.evaluate(() => window.__s));
      rec.errs = errs.slice(0, 5);
    } catch (e) { rec.error = String(e).slice(0, 500); } finally { await ctx.close(); }
  }
} finally { await b.close(); save("rename2-held.json", out); }
console.log(JSON.stringify(out, null, 0).slice(0, 3500));
