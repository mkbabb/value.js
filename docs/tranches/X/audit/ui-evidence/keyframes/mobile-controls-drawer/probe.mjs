// mobile-controls-drawer DOM probe — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);
const out = await page.evaluate(() => {
  const px = (e) => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const d = document.querySelector(".glass-drawer");
  const r = { drawer: d ? { box: px(d), attrs: [...d.attributes].map(a => a.name + "=" + a.value.slice(0, 80)) } : null };
  r.handle = [...document.querySelectorAll("[aria-label='Drawer position'], .glass-drawer-handle")].map(e => ({ tag: e.tagName, role: e.getAttribute("role"), aria: [...e.attributes].map(a => a.name + "=" + a.value.slice(0, 60)).join(" "), box: px(e) }));
  r.tabs = [...(d || document).querySelectorAll("[role=tab]")].map(e => ({ t: e.textContent.trim().slice(0, 30), sel: e.getAttribute("aria-selected"), box: px(e), vis: e.getBoundingClientRect().bottom <= innerHeight }));
  r.tablists = [...(d || document).querySelectorAll("[role=tablist]")].map(e => ({ box: px(e), cls: e.className.slice(0, 100) }));
  r.docks = [...document.querySelectorAll(".glass-dock")].map(e => ({ box: px(e), cls: e.className.slice(0, 80) }));
  r.buttons = [...(d || document).querySelectorAll("button")].slice(0, 40).map(e => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 30) + " " + px(e).join(","));
  r.vars = { reserve: getComputedStyle(document.documentElement).getPropertyValue("--dock-band-reserve-stable") };
  return r;
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
