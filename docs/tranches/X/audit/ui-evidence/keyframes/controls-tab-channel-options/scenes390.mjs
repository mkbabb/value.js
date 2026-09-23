// 390 per-scene Controls surface (drawer expanded via the dock toggle), light+dark. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const browser = await chromium.launch({ headless: false }); const log = { ...tree(), frames: [] };
for (const theme of ["light", "dark"]) for (const sc of ["amiga", "square", "easing", "spring"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); await page.goto(`http://localhost:5173/#/${sc}`, { waitUntil: "networkidle" }); await page.mouse.move(5, 300); await page.waitForTimeout(3500);
  const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900); }
  await page.getByRole("button", { name: "Controls panel" }).first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1400); await page.mouse.move(5, 300); await page.waitForTimeout(1200);
  const p = `12-${sc}-controls-default-390-${theme}.png`; await page.screenshot({ path: OUT + p });
  log.frames.push({ frame: p, ...tree(), drawer: await page.evaluate(() => { const d = [...document.querySelectorAll(".controls-drawer-content")].find(e => e.getBoundingClientRect().width); return d ? d.getBoundingClientRect().toJSON() : null; }) });
  await ctx.close();
}
await browser.close(); writeFileSync(OUT + "scenes390-log.json", JSON.stringify(log, null, 2)); console.log(log.sha, log.dirty, log.frames.length);
