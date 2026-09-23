// Unthrottled cold load: per-rAF log of skeleton presence + stage-plate geometry, stills at fixed times.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const D = new URL(".", import.meta.url).pathname; fs.mkdirSync(`${D}organic/stills`, { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page); await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
await page.addInitScript(() => { window.__log = []; let last = "";
  const f = () => { const sk = document.querySelector(".scene-skeleton__plate"); const host = document.querySelector(".scene-host");
    const card = host && host.querySelector(".card"); const r = (card || {}).getBoundingClientRect?.();
    const s = `${sk ? "SKEL" : host ? (host.children.length ? "SCENE" : "HOST-EMPTY") : "NOHOST"} ${r ? [r.x, r.y, r.width, r.height].map(Math.round).join(",") : "-"} txt=${host ? host.innerText.trim().length : 0} dock=${!!document.querySelector(".dock, [class*=dock]")}`;
    if (s !== last) { window.__log.push([Math.round(performance.now()), s]); last = s; } if (performance.now() < 4000) requestAnimationFrame(f); };
  requestAnimationFrame(f); });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "commit" });
for (const t of [300, 450, 600, 900, 1500, 3000]) { await page.waitForFunction((t) => performance.now() >= t, t); await page.screenshot({ path: `${D}organic/stills/t${t}.png` }); }
console.log(JSON.stringify(await page.evaluate(() => window.__log)));
await browser.close();
