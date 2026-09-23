// 390 reach probe — READ-ONLY: where is the advanced row on mobile and what covers it.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900); }
const t = page.getByRole("button", { name: "Controls panel" }).first(); console.log("toggle", await t.count());
if (await t.count()) { await t.click(); await page.waitForTimeout(1400); }
await page.mouse.move(5, 300); await page.waitForTimeout(600);
const info = await page.evaluate(() => {
  const r = (e) => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const btn = [...document.querySelectorAll(".controls-pane button")].find(b => b.textContent.trim() === "advanced");
  const bb = btn?.getBoundingClientRect(); const hit = bb ? document.elementFromPoint(bb.x + bb.width / 2, bb.y + bb.height / 2) : null;
  const pane = document.querySelector(".controls-pane"); const dr = document.querySelector(".controls-drawer-content");
  return { btn: btn && r(btn), hit: hit && (hit.className?.toString().slice(0, 80) + " " + hit.tagName), pane: pane && r(pane), paneScroll: pane && [pane.scrollHeight, pane.clientHeight], drawer: dr && r(dr), drawerScroll: dr && [dr.scrollHeight, dr.clientHeight] };
});
console.log(JSON.stringify(info));
await page.screenshot({ path: OUT + "probe390-drawer.png" });
// attempt 1: wheel inside the drawer
await page.mouse.move(195, 700); await page.mouse.wheel(0, 600); await page.waitForTimeout(900);
const y1 = await page.evaluate(() => { const b = [...document.querySelectorAll(".controls-pane button")].find(b => b.textContent.trim() === "advanced"); const d = document.querySelector(".controls-drawer-content"); return [Math.round(b.getBoundingClientRect().y), Math.round(d.getBoundingClientRect().y), d.scrollTop, document.querySelector(".controls-pane").scrollTop]; });
console.log("after wheel [advY, drawerY, drawerScrollTop, paneScrollTop]", y1);
await page.screenshot({ path: OUT + "probe390-after-wheel.png" });
// attempt 2: drag the handle up
await page.mouse.move(195, 520); await page.mouse.down(); for (let y = 520; y >= 120; y -= 20) { await page.mouse.move(195, y); await page.waitForTimeout(16); } await page.mouse.up(); await page.waitForTimeout(1200);
const y2 = await page.evaluate(() => { const b = [...document.querySelectorAll(".controls-pane button")].find(b => b.textContent.trim() === "advanced"); const d = document.querySelector(".controls-drawer-content"); const bb = b.getBoundingClientRect(); const hit = document.elementFromPoint(bb.x + bb.width / 2, bb.y + bb.height / 2); return [Math.round(bb.y), Math.round(d.getBoundingClientRect().y), Math.round(d.getBoundingClientRect().height), hit ? hit.tagName + "." + String(hit.className).slice(0, 40) : null]; });
console.log("after drag [advY, drawerY, drawerH, hit]", y2);
await page.screenshot({ path: OUT + "probe390-after-drag.png" });
await browser.close();
