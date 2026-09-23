// Probe: 390 drawer state across open / tab-switch. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false }); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const st = async (n) => console.log(n, JSON.stringify(await page.evaluate(() => { const d = document.querySelector(".controls-drawer-content"); const p = document.querySelector(".controls-pane"); const cp = [...document.querySelectorAll("button")].find(b => b.getAttribute("aria-label") === "Controls panel"); const r = (e) => e ? [e.getBoundingClientRect().y, e.getBoundingClientRect().height].map(Math.round) : null; return { drawer: r(d), pane: r(p), cpExpanded: cp?.getAttribute("aria-expanded"), cpPressed: cp?.getAttribute("aria-pressed"), cpState: cp?.dataset.state }; })));
const hd = async () => { const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1000); };
await st("load");
await hd(); await st("dock-hover"); await page.getByRole("button", { name: "Controls panel" }).first().click(); await page.waitForTimeout(1400); await st("after-open-click");
await hd(); await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name: /^Timeline/ }).click(); await page.waitForTimeout(1800); await st("after-tab-switch");
await page.mouse.move(5, 300); await page.waitForTimeout(800); await st("after-mouse-away");

const OUT = new URL(".", import.meta.url).pathname;
await page.screenshot({ path: OUT + "43-drawer-open-timeline-390-light.png" });
// try: wheel-scroll inside the pane
await page.mouse.move(195, 700); await page.mouse.wheel(0, 600); await page.waitForTimeout(800); await st("after-wheel");
console.log("scrollers", JSON.stringify(await page.evaluate(() => [...document.querySelectorAll(".controls-drawer-content *")].filter(e => e.scrollHeight > e.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)).map(e => [String(e.className).slice(0,50), e.scrollTop, e.scrollHeight, e.clientHeight]))));
// try: drag the grab handle up
const h = await page.evaluate(() => { const d = document.querySelector(".controls-drawer-content"); const r = d.getBoundingClientRect(); return [r.x + r.width / 2, r.y + 20]; });
await page.mouse.move(h[0], h[1]); await page.mouse.down(); for (let y = h[1]; y > 60; y -= 30) { await page.mouse.move(h[0], y); await page.waitForTimeout(16); } await page.mouse.up(); await page.waitForTimeout(1200); await st("after-handle-drag-up");
await page.screenshot({ path: OUT + "44-drawer-drag-up-timeline-390-light.png" });
console.log("snapshotBtn", JSON.stringify(await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Snapshot"); const r = b.getBoundingClientRect(); return [r.y, r.height, innerHeight]; })));
await b.close();
