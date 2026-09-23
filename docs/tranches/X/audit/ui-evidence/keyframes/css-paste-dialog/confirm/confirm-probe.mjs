// css-paste-dialog — 390 timeline reach probe (READ-ONLY). Why does the ribbon Import not take a real click at 390?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const theme = process.argv[2] || "light"; const out = { sha, dirty, theme, steps: [] };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: theme });
await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const hoverDock = async () => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const openDrawer = async () => { await hoverDock(); const t = page.getByRole("button", { name: "Controls panel" }).first(); if (await t.count()) { await t.click(); await page.waitForTimeout(1400); } await page.mouse.move(5, 300); await page.waitForTimeout(600); };
await openDrawer(); await hoverDock();
await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800);
await page.getByRole("option", { name: /^Timeline/ }).first().click(); await page.waitForTimeout(2000);
const h2 = await page.evaluate(() => { const r = document.querySelector(".glass-drawer-handle").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await page.mouse.move(h2.x, h2.y); await page.mouse.down(); await page.mouse.move(h2.x, 20, { steps: 12 }); await page.mouse.up(); await page.waitForTimeout(1500);
out.census = await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Import" && b.getBoundingClientRect().width > 0);
  const chain = []; let e = b;
  while (e && e !== document.body) { const c = getComputedStyle(e), r = e.getBoundingClientRect(); chain.push({ el: e.tagName + "." + String(e.className).slice(0, 70), ov: c.overflowY, h: Math.round(r.height), y: Math.round(r.y), sh: e.scrollHeight, ch: e.clientHeight, maxH: c.maxHeight, pos: c.position }); e = e.parentElement; }
  const pane = document.querySelector(".controls-drawer-content .controls-pane");
  return { chain, paneInChain: !!(pane && pane.contains(b)), paneOv: pane && getComputedStyle(pane).overflowY };
});
await page.screenshot({ path: OUT + `c1-390-expanded-${theme}.png` });
writeFileSync(OUT + `confirm-probe-${theme}.json`, JSON.stringify(out, null, 1)); await browser.close();
