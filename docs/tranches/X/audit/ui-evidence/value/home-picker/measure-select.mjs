// measure the space-select popover box at 390 + 1440 (read-only)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(4000);
  await p.locator(".space-trigger").first().click();
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const c = document.querySelector("[role=listbox]") || document.querySelector("[data-slot=select-content]");
    const pop = c?.closest("[data-reka-popper-content-wrapper]") || c;
    const bx = (e) => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); };
    return { vw: innerWidth, listbox: c && bx(c), wrapper: pop && bx(pop), rad: c && getComputedStyle(c).borderRadius, opts: [...document.querySelectorAll("[role=option]")].map(o => o.textContent.replace(/\s+/g, " ").trim().slice(0, 60)), optRad: [...document.querySelectorAll("[role=option]")].slice(0,1).map(o => getComputedStyle(o).borderRadius), color: getComputedStyle(document.querySelector(".readout")).color };
  });
  console.log(w, JSON.stringify(r));
  await ctx.close();
}
await b.close();
