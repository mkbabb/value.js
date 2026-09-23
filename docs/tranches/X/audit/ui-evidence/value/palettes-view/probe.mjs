// Diagnostic probe: why the palettes pane stays on "Loading the scene…".
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.argv[2] ?? "http://localhost:9000";
const route = process.argv[3] ?? "/#/palettes";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
if (process.env.SEED) await ctx.addInitScript(process.env.SEED);
const p = await ctx.newPage();
p.on("console", (m) => ["error", "warning"].includes(m.type()) && console.log("CONSOLE", m.type(), m.text().slice(0, 300)));
p.on("pageerror", (e) => console.log("PAGEERROR", String(e).slice(0, 400)));
p.on("requestfailed", (r) => console.log("REQFAIL", r.url().slice(0, 150), r.failure()?.errorText));
p.on("response", (r) => r.status() >= 400 && console.log("HTTP", r.status(), r.url().slice(0, 150)));
await p.goto(BASE + route);
await p.waitForTimeout(20000);
console.log("TEXT", (await p.locator("body").innerText()).slice(0, 400).replace(/\n+/g, " | "));
await p.screenshot({ path: new URL("probe.png", import.meta.url).pathname });
await b.close();
