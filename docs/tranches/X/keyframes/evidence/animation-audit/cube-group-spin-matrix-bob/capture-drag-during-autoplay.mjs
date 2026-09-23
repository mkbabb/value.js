// Drag the die WHILE the autoplayed group spins: which writers land on .cube per rAF,
// and is OrbitalDrag's container composing (isStarted) during autoplay? Headed, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname) + "/interact";
const kf = "/Users/mkbabb/Programming/keyframes.js";
const r = { khead: execSync(`git -C ${kf} rev-parse --short HEAD`).toString().trim(), kdirty: execSync(`git -C ${kf} status --porcelain | wc -l`).toString().trim() };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".cube"); await page.waitForTimeout(2500);
r.label = await page.locator('button[aria-label="Play animation"]:visible, button[aria-label="Pause animation"]:visible').first().getAttribute("aria-label");
await page.evaluate(() => { window.__d = []; const f = () => { const c = document.querySelector(".cube").style.transform; const o = document.querySelector(".graph > div").style.transform; window.__d.push({ kind: c.startsWith("matrix3d") ? "M" : c.startsWith("rotateX") ? "R" : c.slice(0, 8), o: o ? "C" : "-" }); if (window.__d.length < 150) requestAnimationFrame(f); }; requestAnimationFrame(f); });
const b = await page.locator(".cube").boundingBox(); const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
await page.mouse.move(cx, cy); await page.mouse.down();
for (let k = 1; k <= 30; k++) { await page.mouse.move(cx + k * 5, cy + k * 2); }
await page.mouse.up();
await page.waitForTimeout(1500);
const d = await page.evaluate(() => window.__d);
r.seq = d.map((x) => x.kind + x.o).join(" ");
r.counts = d.reduce((a, x) => ((a[x.kind + x.o] = (a[x.kind + x.o] || 0) + 1), a), {});
fs.writeFileSync(OUT + "/drag-during-autoplay.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify(r).slice(0, 1500));
await browser.close();
