// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4shell · the home Play hop, functional (READ-ONLY): pick a channel on home's list, press Play → #/cube playing the pick; the cube element is the SAME node across the hop (no remount); Home again → the start screen is back.
// Usage: BASE=http://localhost:5393 node hop.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import os from "node:os";
const BASE = process.env.BASE || "http://localhost:5393"; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.goto(`${BASE}/#/`); await sleep(6000);
await p.evaluate(() => { window.__cubeNode = document.querySelector(".cube"); });
const dock = p.locator("[data-dock-tether=bottom]"); await dock.hover(); await sleep(600);
await p.locator('[data-dock-tether=bottom] [aria-label="Select animation"]').click(); await sleep(600);
await p.getByRole("option", { name: "Matrix" }).click(); await sleep(600);
const midHash = await p.evaluate(() => location.hash);
await p.locator('[data-dock-tether=bottom] [aria-label="Play animation"]').first().click(); await sleep(2500);
const s = await p.evaluate(() => ({ hash: location.hash, same: document.querySelector(".cube") === window.__cubeNode, sel: document.querySelector('[data-dock-tether=bottom] [aria-label="Select animation"]')?.textContent?.trim(), pause: !!document.querySelector('[data-dock-tether=bottom] [aria-label="Pause animation"]'), hero: !!document.querySelector(".hero-band") }));
await p.evaluate(() => { location.hash = "#/"; }); await sleep(2500);
const h = await p.evaluate(() => ({ hash: location.hash, hero: !!document.querySelector(".hero-band"), reset: !!document.querySelector('[data-dock-tether=bottom] [aria-label="Reset animation"]') }));
console.log(`load ${os.loadavg()[0].toFixed(2)} · pick on home kept #/: ${midHash} · after Play ${JSON.stringify(s)} · back home ${JSON.stringify(h)} · page errors ${errs.length}${errs.length ? " " + errs[0].slice(0, 160) : ""}`);
await b.close();
