// X-DS fourier pass 4 critic (F6): select-trigger fills, /morph vs /v, dark. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const BASE = process.argv[2] ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "dark"); } catch {} });
const p = await ctx.newPage();
const read = () => p.evaluate(() => [...document.querySelectorAll('button[role=combobox], [data-slot=select-trigger]')].filter(e => e.offsetParent).map(e => { const cs = getComputedStyle(e); return [e.textContent.trim().slice(0, 12), String(e.className).slice(0, 90), cs.backgroundColor, cs.backgroundImage.slice(0, 120), cs.backdropFilter]; }));
await p.goto(BASE + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
console.log("morph", JSON.stringify(await read(), null, 1));
await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
await p.getByRole("button", { name: /^Contour/ }).first().click().catch(() => {}); await p.waitForTimeout(800);
console.log("v", JSON.stringify(await read(), null, 1));
await b.close();
