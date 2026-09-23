// focused measurement probe (READ-ONLY): row typography, GitHub as-child row, header block, slug layer overflow.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "light" });
await ctx.addInitScript(() => { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("palette-user-slug", "vivid-heron-42"); });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/", { waitUntil: "load", timeout: 60000 }); await p.waitForTimeout(2500);
await p.locator('[aria-label="Menu"]').first().click(); await p.waitForTimeout(700);
const m = await p.evaluate(() => {
  const menu = document.querySelector('[role="menu"]');
  const root = getComputedStyle(document.documentElement);
  const rows = [...menu.children].map((el) => { const s = getComputedStyle(el), r = el.getBoundingClientRect(); return { tag: el.tagName, role: el.getAttribute("role"), tabindex: el.getAttribute("tabindex"), cls: String(el.className).slice(0, 140), txt: el.textContent.trim().replace(/\s+/g, " ").slice(0, 60), display: s.display, dir: s.flexDirection, h: Math.round(r.height), fs: s.fontSize, ff: s.fontFamily.split(",")[0], fw: s.fontWeight, color: s.color, opacity: s.opacity }; });
  const kids = [...menu.querySelectorAll("a, [tabindex]")].map((e) => ({ tag: e.tagName, role: e.getAttribute("role"), ti: e.getAttribute("tabindex"), txt: e.textContent.trim().slice(0, 20) }));
  return { rows, kids, tokens: { dropdownText: root.getPropertyValue("--dropdown-text"), textSmall: root.getPropertyValue("--text-small"), fontDisplay: root.getPropertyValue("--font-display").slice(0, 60) } };
});
console.log(JSON.stringify(m, null, 0));
// keyboard walk: which rows receive focus?
const walk = [];
for (let i = 0; i < 12; i++) { await p.keyboard.press("ArrowDown"); walk.push(await p.evaluate(() => document.activeElement?.textContent.trim().replace(/\s+/g, " ").slice(0, 24))); }
console.log("arrow-walk", JSON.stringify(walk));
await p.keyboard.press("Escape"); await p.waitForTimeout(400);
// slug layer overflow
await p.locator('[aria-label="Menu"]').first().click(); await p.waitForTimeout(600);
await p.locator('[role="menu"] [role="menuitem"]').filter({ hasText: "Switch account" }).click(); await p.waitForTimeout(900);
const s = await p.evaluate(() => {
  const inp = document.querySelector('input[aria-label="Slug or admin token"]');
  const f = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), r: Math.round(r.right), w: Math.round(r.width), vis: e.checkVisibility?.() }; };
  let dock = inp; for (let i = 0; i < 8 && dock; i++) { dock = dock.parentElement; if (dock && getComputedStyle(dock).overflow !== "visible") break; }
  const dr = dock?.getBoundingClientRect();
  return { input: f('input[aria-label="Slug or admin token"]'), inputScrollW: inp?.scrollWidth, placeholderFits: inp ? (() => { const c = document.createElement("canvas").getContext("2d"); c.font = getComputedStyle(inp).font; return Math.round(c.measureText(inp.placeholder).width); })() : null, submit: f('[aria-label="Switch to slug"]'), regen: f('[aria-label="Generate new slug"]'), cancel: f('[aria-label="Cancel"]'), clipper: dock && { cls: String(dock.className).slice(0, 120), x: Math.round(dr.x), r: Math.round(dr.right), overflow: getComputedStyle(dock).overflow } };
});
console.log("slug-layer", JSON.stringify(s));
await p.screenshot({ path: `${OUT}light-390-in-9-slug-layer-measure.png` });
await ctx.close(); await b.close();
