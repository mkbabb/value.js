// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.scene · UIA-KF-143 deep-link ?state= feedback, served (READ-ONLY)
// Usage: BASE=http://localhost:5291 node deeplink.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5291";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const toasts = async (url) => { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto(`${BASE}/#/`); await sleep(1500); // a real payload: the app's own share encoding of its state
  const good = Buffer.from(encodeURIComponent(JSON.stringify({ activeScene: "cube" }))).toString("base64"); // the app's own encoding (hashSharing.encodeStateToHash)
  await p.goto(url(good)); await p.reload(); await sleep(1600); // inside the 3000 ms toast life
  const t = await p.evaluate(() => [...document.querySelectorAll('[data-slot^="toast"][data-tone], [data-slot="toast"]')].map((e) => e.textContent.trim()).filter(Boolean));
  await ctx.close(); return { good: !!good, t }; };
const bad = await toasts(() => `${BASE}/#/amiga?state=garbage!!`);
console.log(`${bad.t.some((x) => /invalid|could not|couldn't/i.test(x)) ? "GREEN" : "RED  "} UIA-KF-143 garbage ?state= on load → toasts ${JSON.stringify(bad.t)}`);
const ok = await toasts((g) => `${BASE}/#/amiga?state=${encodeURIComponent(g ?? "")}`);
console.log(`${ok.good ? (ok.t.some((x) => /restored/i.test(x)) ? "GREEN" : "RED  ") : "N/A  "} UIA-KF-143 valid ?state= on load (payload built by the page: ${ok.good}) → toasts ${JSON.stringify(ok.t)}`);
await b.close();
