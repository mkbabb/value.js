// SERVED MODEL: claude-opus-5-5 — X.W12.u1 (UIA-V-25/27): the current-palette swatch
// actions open on glass's Popover for both pointers and paint inside the viewport.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const vp of [{ w: 1440, h: 900, touch: false }, { w: 390, h: 844, touch: true }]) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, hasTouch: vp.touch, isMobile: vp.touch });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?color=%23abcdef#/palettes`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const add = p.locator(".add-slot-ghost").first(); await add.waitFor({ timeout: 60000 });
  // Seed two distinct colours into the current palette through the live add-slot.
  await add.click(); await p.waitForTimeout(300);
  const sw = p.locator('.swatch-row [aria-label^="Color swatch "]').first();
  const trig = await sw.evaluate((el) => ({ tag: el.tagName, aria: el.getAttribute("aria-label"), expanded: el.getAttribute("aria-expanded"), haspopup: el.getAttribute("aria-haspopup") })).catch((e) => ({ err: String(e).slice(0, 120) }));
  if (vp.touch) await sw.tap(); else await sw.hover();
  await p.waitForTimeout(900);
  const edit = p.getByRole("button", { name: /^Edit color / }).first();
  const box = await edit.boundingBox().catch(() => null);
  const inView = !!box && box.x >= 0 && box.y >= 0 && box.x + box.width <= vp.w && box.y + box.height <= vp.h;
  const panel = await p.evaluate(() => { const c = document.querySelector('[data-slot="popover-content"], [data-slot="hover-card-content"], [role="dialog"]'); if (!c) return null; const s = getComputedStyle(c); const r = c.getBoundingClientRect(); return { slot: c.getAttribute("data-slot"), role: c.getAttribute("role"), aria: c.getAttribute("aria-label"), hidden: c.getAttribute("aria-hidden"), bg: s.backgroundColor, radius: s.borderRadius, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; });
  await p.screenshot({ path: `${OUT}swatch-popover-${vp.w}.png` });
  // Keyboard: Escape closes; focus + Enter re-opens (coarse) / focus opens (fine).
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  const closed = !(await edit.isVisible().catch(() => false));
  res.push({ vp: vp.w, trigger: trig, editBox: box, inView, panel, closedOnEscape: closed });
  await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-swatch-popover${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
