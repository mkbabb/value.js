// transport-dock — follow-up: the animation Select opened WHILE PLAYING (fresh load; the scene autoplays):
// the progress-dot (--dot-p) liveness per item, sampled per rAF for 3 s, + 24 screenshots 125 ms apart (real time, method 3-lite).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const prov = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() };
fs.mkdirSync(OUT + "psel", { recursive: true });
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.mouse.move(1300, 200);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4500);
const playing = await page.locator('[data-dock-tether="bottom"] .dock-layer--full button').first().getAttribute("aria-label");
await page.locator('[data-dock-tether="bottom"] [aria-label="Select animation"]').click();
await page.waitForTimeout(500);
const series = await page.evaluate(() => new Promise((res) => { const out = []; const t0 = performance.now(); const tick = (now) => { const lb = document.querySelector('[role="listbox"]');
  const items = lb ? [...lb.querySelectorAll('[role="option"]')].map((o) => { const d = o.querySelector(".progress-dot"); return { name: o.innerText.trim(), p: d ? d.style.getPropertyValue("--dot-p") : null, bg: d ? getComputedStyle(d).backgroundImage.slice(0, 60) : null, status: o.querySelector("[data-state],[class*=status]")?.className?.slice(0, 40) ?? null }; }) : null;
  out.push({ t: +(now - t0).toFixed(1), items }); if (now - t0 < 3000) requestAnimationFrame(tick); else res(out); }; requestAnimationFrame(tick); }));
for (let i = 0; i < 24; i++) { await page.screenshot({ path: `${OUT}psel/f${String(i).padStart(2, "0")}.png`, clip: { x: 600, y: 600, width: 260, height: 160 } }); await page.waitForTimeout(125); }
const pick = series.filter((_, i) => i % 30 === 0);
fs.writeFileSync(OUT + "psel-log.json", JSON.stringify({ prov, playing, series }));
console.log(JSON.stringify({ prov, playing, n: series.length, pick }, null, 0).slice(0, 2500));
await browser.close();
