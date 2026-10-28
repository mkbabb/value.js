// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P5 (item 0177): does Playwright WebKit honour (pointer: coarse)
// under mobile emulation, and what does the view-select trigger measure there? ENGINE-SPECIFIC, so WebKit,
// launched only via `guarded --exclusive webkit`. One WebKit browser, one context per cell, closed in finally.
import { webkit } from "playwright";
import { boot, writeJson } from "./lib.mjs";

const out = { probe: "p5-webkit-coarse", at: new Date().toISOString(), cells: {} };
const browser = await webkit.launch();
try {
  for (const cell of [
    { name: "isMobile+hasTouch", opts: { isMobile: true, hasTouch: true } },
    { name: "hasTouch-only", opts: { hasTouch: true } },
    { name: "desktop-default", opts: {} },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...cell.opts });
    try {
      const page = await ctx.newPage();
      await boot(page, "#/", 2500);
      out.cells[cell.name] = await page.evaluate(() => {
        const t = document.querySelector(".view-select-trigger")?.getBoundingClientRect();
        const tog = document.querySelector(".action-bar-toggle-inner button")?.getBoundingClientRect();
        return { coarse: matchMedia("(pointer: coarse)").matches, fine: matchMedia("(pointer: fine)").matches, anyCoarse: matchMedia("(any-pointer: coarse)").matches, hoverNone: matchMedia("(hover: none)").matches, touchFloor: getComputedStyle(document.documentElement).getPropertyValue("--dock-touch-target").trim(), trigger: t ? [+t.width.toFixed(2), +t.height.toFixed(2)] : null, toggle: tog ? [+tog.width.toFixed(2), +tog.height.toFixed(2)] : null, ua: navigator.userAgent.slice(0, 90) };
      });
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
  writeJson("p5-webkit-coarse.json", out);
  console.log(JSON.stringify(out, null, 1));
}
