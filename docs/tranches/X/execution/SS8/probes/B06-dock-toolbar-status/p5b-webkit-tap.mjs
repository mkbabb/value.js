// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P5b (item 0186): WebKit-engine tap ordering on the colour input's
// popover toggle (reka PopoverTrigger around the contenteditable). Playwright WebKit with touch emulation —
// an engine witness, NOT iOS Safari. Run via `guarded --exclusive webkit`. One browser, context per cell.
import { webkit } from "playwright";
import { boot, writeJson, EV } from "./lib.mjs";
const out = { probe: "p5b-webkit-tap", at: new Date().toISOString(), cells: {} };
const read = (page) => page.evaluate(() => {
  const inp = document.querySelector('[aria-label="Enter a CSS color"]');
  const pop = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].find((w) => /Enter a color/.test(w.textContent));
  const trig = inp?.closest("[aria-expanded]");
  return { inputPresent: !!inp, inputVisible: !!inp && inp.getBoundingClientRect().width > 0, focused: document.activeElement === inp, activeTag: document.activeElement?.tagName, popoverOpen: !!pop, ariaExpanded: trig?.getAttribute("aria-expanded") ?? null, coarse: matchMedia("(pointer: coarse)").matches };
});
const browser = await webkit.launch();
try {
  for (const c of [{ n: "1366x1024", w: 1366, h: 1024 }, { n: "390x844", w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: c.w, height: c.h }, isMobile: true, hasTouch: true });
    const cell = (out.cells[c.n] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/", 2500);
      cell.before = await read(page);
      const inp = page.locator('[aria-label="Enter a CSS color"]').first();
      if (cell.before.inputVisible) {
        const ev = []; await page.exposeFunction("__ss8ev", (s) => ev.push(s));
        await page.evaluate(() => { const i = document.querySelector('[aria-label="Enter a CSS color"]'); const t = i.closest("[aria-expanded]") ?? i; for (const [el, tag] of [[i, "input"], [t, "trigger"]]) for (const e of ["touchstart", "touchend", "pointerdown", "pointerup", "mousedown", "focus", "click"]) el.addEventListener(e, () => window.__ss8ev(`${Math.round(performance.now())} ${tag}:${e} exp=${t.getAttribute("aria-expanded")}`), true); });
        await inp.tap();
        await page.waitForTimeout(700);
        cell.afterTap1 = await read(page);
        await inp.tap();
        await page.waitForTimeout(700);
        cell.afterTap2 = await read(page);
        cell.events = ev.slice(0, 40);
        await page.screenshot({ path: `${EV}/p5b-0186-${c.n}-after-taps.png`, clip: { x: 0, y: 0, width: c.w, height: Math.min(c.h, 420) } });
      }
    } catch (e) { cell.error = String(e).slice(0, 300); } finally { await ctx.close(); }
  }
} finally { await browser.close(); writeJson("p5b-webkit-tap.json", out); console.log(JSON.stringify(out, null, 1).slice(0, 6000)); }
