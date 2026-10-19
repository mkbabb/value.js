// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P2b: coarse follow-ups. Fresh context per cell (the action-bar
// mode persists per origin, so each cell boots clean). Items: 0156 (control), 0159 (390 seats reachable), 0178.
import { chromium } from "playwright";
import { boot, writeJson, EV } from "./lib.mjs";
const out = { probe: "p2b-coarse", at: new Date().toISOString(), cells: {} };
const held = (page) => page.evaluate(() => { const d = document.querySelector(".glass-dock"); return { collapsed: d.classList.contains("collapsed"), cls: d.className }; });
const barOpen = (page) => page.locator('.dock-face.is-active button[aria-label="Back"]').first().isVisible().catch(() => false);
async function openBar(page) {
  if (await barOpen(page)) return "already";
  const b = page.locator(".action-bar-toggle-inner button").first();
  if (!(await b.isVisible().catch(() => false))) return "toggle-not-visible";
  await b.tap(); await page.waitForTimeout(1200); return "tapped";
}
const mob = { isMobile: true, hasTouch: true, colorScheme: "light" };
const browser = await chromium.launch();
try {
  // 0156 control — coarse 1366x1024: untouched dock after 7.5 s; then bar open + two Copy taps + 7.5 s.
  {
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 1024 }, ...mob });
    const cell = (out.cells["coarse-1366-hold"] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/");
      cell.atBoot = await held(page);
      await page.waitForTimeout(7500);
      cell.untouched7s = await held(page);
      cell.open = await openBar(page);
      const copy = page.locator('.dock-face.is-active [data-scene-action="color.copy"] .action-button-wrapper').first();
      await copy.tap(); await page.waitForTimeout(400); await copy.tap(); await page.waitForTimeout(400);
      cell.afterTaps = await held(page);
      await page.tap("main", { position: { x: 600, y: 700 } }).catch(() => {});
      await page.waitForTimeout(7500);
      cell.afterTaps7s = await held(page);
    } catch (e) { cell.error = String(e).slice(0, 300); } finally { await ctx.close(); }
  }
  // 0159 — 390x844 picker: are the five command seats reachable on a phone?
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...mob });
    const cell = (out.cells["phone-390-picker-seats"] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/");
      cell.open = await openBar(page);
      cell.seats = await page.evaluate(() => [...document.querySelectorAll(".dock-face.is-active button[aria-label]")].map((b) => { const r = b.getBoundingClientRect(); return [b.getAttribute("aria-label"), +r.x.toFixed(1), +r.width.toFixed(1), +r.height.toFixed(1)]; }));
      await page.screenshot({ path: `${EV}/p2b-0159-390-picker-bar.png`, clip: { x: 0, y: 0, width: 390, height: 110 } });
    } catch (e) { cell.error = String(e).slice(0, 300); } finally { await ctx.close(); }
  }
  // 0178 — ROOT 390x844 Reset witness on /#/gradient: 90deg -> 337deg -> Reset -> read at +250ms.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...mob });
    const w = (out.cells["phone-390-gradient-reset"] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/gradient");
      const dirText = () => page.evaluate(() => { const s = [...document.querySelectorAll("span.tabular-nums")].find((e) => /deg$/.test(e.textContent.trim())); return s?.textContent.trim() ?? null; });
      const slider = page.getByRole("slider", { name: "Gradient direction" }).first();
      w.start = await dirText();
      w.sliderValueStart = (await slider.count()) ? await slider.getAttribute("aria-valuenow") : "absent";
      if (await slider.count()) {
        await slider.focus(); await page.keyboard.press("End");
        for (let i = 0; i < 23; i++) await page.keyboard.press("ArrowLeft");
        await page.waitForTimeout(300);
        w.set = await dirText(); w.sliderValueSet = await slider.getAttribute("aria-valuenow");
        w.open = await openBar(page);
        const reset = page.locator('.dock-face.is-active [data-scene-action="gradient.reset"]').first();
        w.resetState = (await reset.count()) ? await reset.getAttribute("data-action-state") : "absent";
        if (await reset.count()) {
          await reset.locator(".action-button-wrapper").tap();
          await page.waitForTimeout(250);
          w.after250 = await dirText(); w.sliderValueAfter250 = await slider.getAttribute("aria-valuenow");
          await page.screenshot({ path: `${EV}/p2b-0178-390-gradient-after-reset.png`, clip: { x: 0, y: 0, width: 390, height: 844 } });
        }
      }
    } catch (e) { w.error = String(e).slice(0, 300); } finally { await ctx.close(); }
  }
} finally { await browser.close(); writeJson("p2b-coarse.json", out); console.log(JSON.stringify(out, null, 1).slice(0, 6000)); }
