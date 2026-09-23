// 390 reachability repro: is the drawer body (easing/advanced/PlaybackRibbon) reachable? READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const res = { sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length, steps: [] };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: false });
const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.mouse.move(5, 300); await page.waitForTimeout(3500);
const probe = (label) => page.evaluate((label) => {
  const vis = (e) => e && e.getBoundingClientRect().width > 0;
  const hit = (el) => { if (!vis(el)) return "novis"; const b = el.getBoundingClientRect(); const cx = b.x + b.width / 2, cy = b.y + b.height / 2; if (cy > innerHeight || cy < 0) return `offscreen(y=${Math.round(cy)})`; const h = document.elementFromPoint(cx, cy); return el.contains(h) ? "hit" : "covered-by:" + (h?.closest("[aria-label]")?.getAttribute("aria-label") || h?.className?.toString().slice(0, 40)); };
  const pane = [...document.querySelectorAll(".controls-pane")].find(vis); const drawer = [...document.querySelectorAll(".controls-drawer-content")].find(vis);
  const play = [...document.querySelectorAll("#controls-ribbon-target button")].find(vis); const pen = [...document.querySelectorAll('[aria-label="Edit easing curve"]')].find(vis);
  const ez = [...document.querySelectorAll(".controls-pane [role=combobox]")].filter(vis).find(e => /ease|cubic/.test(e.textContent)); const fm = [...document.querySelectorAll(".controls-pane [role=combobox]")].filter(vis).find(e => /forwards/.test(e.textContent));
  const scrollers = [pane, drawer, ...(pane ? pane.querySelectorAll("*") : [])].filter(e => e && e.scrollHeight > e.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)).map(e => e.className.toString().slice(0, 50) + ` ${e.scrollHeight}/${e.clientHeight}`);
  const dockEl = [...document.querySelectorAll(".glass-dock")].filter(vis).map(d => { const b = d.getBoundingClientRect(); return [Math.round(b.y), Math.round(b.height), d.getAttribute("aria-label")]; });
  return { label, drawerY: drawer ? Math.round(drawer.getBoundingClientRect().y) : null, drawerH: drawer ? Math.round(drawer.getBoundingClientRect().height) : null, snap: drawer?.closest("[data-snap-points]")?.dataset, fillMode: hit(fm), pencil: hit(pen), easing: hit(ez), play: hit(play), scrollers, docks: dockEl };
}, label);
res.steps.push(await probe("peek"));
// expand via the dock toggle
const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900);
await page.getByRole("button", { name: "Controls panel" }).first().click(); await page.waitForTimeout(1400); await page.mouse.move(5, 300); await page.waitForTimeout(1200);
res.steps.push(await probe("expanded-via-toggle"));
await page.screenshot({ path: OUT + "R4-390-expanded-reach-390-light.png" });
// wheel inside the drawer body
await page.mouse.move(195, 700); await page.mouse.wheel(0, 600); await page.waitForTimeout(900);
res.steps.push(await probe("after-wheel-600"));
await page.screenshot({ path: OUT + "R5-390-after-wheel-390-light.png" });
// drag the handle up
const h = await page.evaluate(() => { const d = [...document.querySelectorAll(".controls-drawer-content")].find(e => e.getBoundingClientRect().width); const b = d.getBoundingClientRect(); return [b.x + b.width / 2, b.y + 20]; });
await page.mouse.move(h[0], h[1]); await page.mouse.down(); for (let i = 1; i <= 12; i++) { await page.mouse.move(h[0], h[1] - i * 35); await page.waitForTimeout(16); } await page.mouse.up(); await page.waitForTimeout(1400);
res.steps.push(await probe("after-handle-drag-up-420"));
await page.screenshot({ path: OUT + "R6-390-after-handle-drag-390-light.png" });
await browser.close(); writeFileSync(OUT + "repro390-log.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 1));
