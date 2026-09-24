// SERVED MODEL: claude-opus-5-5
// KF.W13V.s — one-off served-page peek (open a dock item, screenshot). Usage: node peek.mjs <url> <w> <h> <out.png> [itemLabel]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [url, w, h, out, click] = process.argv.slice(2);
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, colorScheme: process.env.THEME || "light" });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
await p.locator("[data-dock-tether=top]").hover({ force: true }).catch(()=>{}); await p.waitForTimeout(800);
if (click) { await p.click(`[data-dock-tether=top] [aria-label="${click}"]`).catch(e=>console.log("clickfail",e.message.slice(0,80))); await p.waitForTimeout(1500); await p.locator("[data-dock-tether=top]").hover({ force: true }).catch(()=>{}); await p.waitForTimeout(600);}
await p.screenshot({ path: out }); await b.close();
