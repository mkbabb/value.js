// probe-easing-ribbon — READ-ONLY: on easing/spring under Keyframes, is the ribbon inside the viewport / reachable? (1440x900 light)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const rev = () => execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim() + "+" + execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const browser = await chromium.launch({ headless: false }); const res = { kf: rev() };
for (const sc of ["easing", "spring", "cube"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" }); const page = await ctx.newPage();
  await page.goto(`http://localhost:5173/#/${sc}`, { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100);
  await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(700);
  await page.getByRole("option", { name: /^Keyframes/ }).first().click(); await page.waitForTimeout(2500); await page.mouse.move(1435, 5); await page.waitForTimeout(500);
  const g = () => page.evaluate(() => { const vis = e => e && e.getBoundingClientRect().height > 0; const r = e => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
    const btn = n => { const x = [...document.querySelectorAll("button")].filter(vis).find(x => x.textContent.trim() === n); return x ? r(x) : null; };
    const pane = [...document.querySelectorAll(".controls-pane")].find(vis);
    const sc = [...document.querySelectorAll(".controls-pane *")].filter(e => /(auto|scroll)/.test(getComputedStyle(e).overflowY) && vis(e)).map(e => ({ sh: e.scrollHeight, ch: e.clientHeight, st: e.scrollTop, box: r(e), cls: (e.className?.baseVal ?? e.className).toString().slice(0, 60) }));
    return { pane: pane && r(pane), copy: btn("Copy"), apply: btn("Apply CSS"), scrollers: sc.slice(0, 5), docScroll: [document.scrollingElement.scrollHeight, innerHeight] }; });
  const before = await g();
  await page.mouse.move(250, 300); await page.mouse.wheel(0, 2000); await page.waitForTimeout(700); const after = await g();
  await page.screenshot({ path: OUT + `21-${sc}-keyframes-wheel-1440-light.png` });
  res[sc] = { before, after }; await ctx.close();
}
await browser.close(); writeFileSync(OUT + "probe-easing-ribbon-log.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res));
