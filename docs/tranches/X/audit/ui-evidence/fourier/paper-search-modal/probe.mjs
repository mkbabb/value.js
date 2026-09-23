// READ-ONLY probe: ✕/Clear stacking, Esc query retention, Enter landing, shadow, Clear semantics.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {} });
const p = await ctx.newPage();
await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
await p.waitForTimeout(2500);
const out = {};
const open = async () => { await p.mouse.click(1430, 450); await p.keyboard.press("Meta+k"); await p.waitForTimeout(800); };
await open();
out.stack = await p.evaluate(() => {
  const dc = document.querySelector('[role="dialog"]');
  const x = dc.querySelector('[data-slot="dialog-close"]'); const xr = x.getBoundingClientRect();
  const clear = [...dc.querySelectorAll("button")].find(e => e.textContent.trim() === "Clear"); const cr = clear.getBoundingClientRect();
  const top = document.elementFromPoint(xr.x + xr.width / 2, xr.y + xr.height / 2);
  const topC = document.elementFromPoint(cr.x + cr.width / 2, cr.y + cr.height / 2);
  return { x: [xr.x, xr.y, xr.width, xr.height], clear: [cr.x, cr.y, cr.width, cr.height], atXcenter: top?.closest("button")?.textContent.trim(), atClearCenter: topC?.closest("button")?.textContent.trim(), shadow: getComputedStyle(dc).boxShadow, clearColor: getComputedStyle(clear).color, hintColor: getComputedStyle(dc.querySelector(".search-modal-hint")).color, emptyColor: getComputedStyle(dc.querySelector(".search-modal-empty")).color,
    under: document.elementsFromPoint(700, 500).slice(0, 5).map(e => (e.getAttribute("data-slot") || "") + "." + String(e.className).slice(0, 50)) };
});
// Esc query retention
await p.locator('[role="dialog"] input').fill("theorem"); await p.waitForTimeout(500);
await p.keyboard.press("Escape"); await p.waitForTimeout(600);
out.esc = await p.evaluate(() => ({ dialog: !!document.querySelector('[role="dialog"]'), sidebarInput: document.querySelector(".paper-search-input-wrap input, .paper-sidebar input")?.value }));
// Clear semantics
await open();
await p.locator('[role="dialog"] input').fill("lemma"); await p.waitForTimeout(400);
await p.getByRole("button", { name: "Clear" }).click({ force: true }); await p.waitForTimeout(600);
out.clear = await p.evaluate(() => ({ dialogStillOpen: !!document.querySelector('[role="dialog"]'), sidebarInput: document.querySelector(".paper-search-input-wrap input")?.value }));
// ✕ click (force, then via mouse at its center)
await open();
await p.locator('[role="dialog"] input').fill("lemma"); await p.waitForTimeout(400);
const xb = await p.locator('[data-slot="dialog-close"]').boundingBox();
await p.mouse.click(xb.x + xb.width / 2, xb.y + xb.height / 2); await p.waitForTimeout(600);
out.xByMouse = await p.evaluate(() => ({ dialogStillOpen: !!document.querySelector('[role="dialog"]'), sidebarInput: document.querySelector(".paper-search-input-wrap input")?.value }));
await p.keyboard.press("Escape"); await p.waitForTimeout(400);
// tab stops in the listbox
await open();
await p.locator('[role="dialog"] input').fill("fourier"); await p.waitForTimeout(500);
out.tabbableOptions = await p.evaluate(() => [...document.querySelectorAll('[role="option"]')].filter(e => e.tabIndex >= 0).length);
// Enter landing
await p.locator('[role="dialog"] input').fill("parseval"); await p.waitForTimeout(600);
out.enterRows = await p.evaluate(() => [...document.querySelectorAll('[role="option"]')].slice(0, 4).map(e => e.textContent.trim().replace(/\s+/g, " ")));
await p.keyboard.press("Enter"); await p.waitForTimeout(2500);
out.enterLanding = await p.evaluate(() => {
  const cands = [...document.querySelectorAll("[id]")].filter(e => /parseval/i.test(e.id) || /parseval/i.test(e.textContent.slice(0, 80)) && /theorem|thm/i.test(e.className));
  const hs = [...document.querySelectorAll("h2,h3,h4,.theorem, [class*=theorem]")].map(e => ({ t: e.textContent.trim().slice(0, 50), y: Math.round(e.getBoundingClientRect().y) })).filter(o => o.y > -50 && o.y < 500).slice(0, 5);
  return { parsevalEls: cands.slice(0, 4).map(e => ({ id: e.id, y: Math.round(e.getBoundingClientRect().y), cls: String(e.className).slice(0, 40) })), visible: hs, pg: document.body.innerText.match(/pg\s+\d+\s*\/\s*\d+/)?.[0] };
});
await p.screenshot({ path: `${OUT}1440-light-P1-enter-landing.png` });
await b.close();
writeFileSync(`${OUT}probe.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
