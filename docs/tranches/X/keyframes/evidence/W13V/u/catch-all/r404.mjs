// SERVED MODEL: claude-opus-5-5 — which request 404s on a cold catch-all visit (and on a cold #/ visit, the control)?
// usage: node r404.mjs [baseURL]  (u2: base arg added; each link in a fresh context, so no negative-cache carry)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.argv[2] || "http://localhost:5173/";
const b = await chromium.launch({ headless: false });
for (const link of ["#/nope", "#/", "#/cube/extra", "#/nope"]) { const ctx = await b.newContext(); const p = await ctx.newPage(); const bad = []; p.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url().slice(0, 120)); }); await p.goto(BASE + link); await p.waitForTimeout(3000); const icon = await p.evaluate(async () => { const l = document.querySelector('link[rel=icon]'); const r = await fetch(l.href); return l.getAttribute("href") + " " + r.status; }); console.log(link, "icon=" + icon, JSON.stringify(bad)); await ctx.close(); }
await b.close();
