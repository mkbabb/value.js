// Probe: mobile reach of the canvas dock + desktop keyboard/tooltip paths. READ-ONLY (no writes to API).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const slug = readFileSync(OUT + "seed.txt", "utf8").trim();
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
const info = await page.evaluate(() => ({
  tabs: [...document.querySelectorAll("[role=tab],button")].map((b) => (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 30)).filter(Boolean),
  anchor: (() => { const a = document.querySelector(".controls-dock-anchor"); if (!a) return null; const r = a.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, vis: getComputedStyle(a).visibility, parentCls: a.parentElement.className }; })(),
  stage: (() => { const a = document.querySelector(".canvas-stage"); if (!a) return null; const r = a.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, cls: a.className, disp: getComputedStyle(a).display, vis: getComputedStyle(a).visibility, op: getComputedStyle(a).opacity }; })(),
}));
console.log(JSON.stringify(info, null, 1));
await page.screenshot({ path: OUT + "m-light-probe-landing.png" });
await ctx.close(); await browser.close();
