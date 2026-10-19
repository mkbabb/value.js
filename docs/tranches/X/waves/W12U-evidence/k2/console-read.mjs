// SERVED MODEL: claude-opus-5-5
// X.W12U.k2 — read a route's console errors and its main text (diagnostic).
// Usage: node console-read.mjs <route> [width] [height]
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const route = process.argv[2] ?? "/";
const [W, H] = [Number(process.argv[3] ?? 390), Number(process.argv[4] ?? 844)];
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H } });
await prepare(ctx, { palettes: true, user: true, admin: true, browse: "ok" });
const p = await ctx.newPage();
const errs = [];
p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text().slice(0, 300)}`); });
p.on("pageerror", (e) => errs.push(`pageerror: ${String(e).slice(0, 300)}`));
await p.goto(`${process.env.BASE ?? "http://localhost:9000"}/#${route}`, { waitUntil: "commit", timeout: 600000 });
await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
await p.waitForTimeout(8000);
console.log(JSON.stringify({ route, main: (await p.evaluate(() => document.querySelector("main")?.innerText ?? "")).replace(/\s+/g, " ").slice(0, 400), errs: errs.slice(0, 12) }, null, 1));
await b.close();
