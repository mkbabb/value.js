// read-only: log the gallery list request URL + whether the route stub fires
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: "block" });
const p = await ctx.newPage(); let hit = 0;
await p.route("**/api/visualizations**", (r) => { hit++; console.log("ROUTE", r.request().url()); r.fulfill({ status: 200, contentType: "application/json", body: '{"items":[],"next_cursor":null,"has_more":false}' }); });
p.on("request", (r) => { if (r.url().includes("/api/")) console.log("REQ", r.method(), r.url()); });
p.on("response", (r) => { if (r.url().includes("/api/")) console.log("RES", r.status(), r.url()); });
await p.goto("http://localhost:3100/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
console.log("hits", hit, await p.evaluate(() => navigator.serviceWorker?.controller?.scriptURL));
await b.close();
