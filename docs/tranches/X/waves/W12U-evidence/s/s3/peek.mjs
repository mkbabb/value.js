// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 read tool: print a route's main text (and optionally a frame). Usage: node peek.mjs <route> <w> <h> '<prepare opts json>' [png]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [route, W, H, opts] = [process.argv[2], Number(process.argv[3] ?? 1440), Number(process.argv[4] ?? 900), JSON.parse(process.argv[5] ?? "{}")];
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H } });
await prepare(ctx, opts);
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#" + route, { timeout: 90000 });
await p.waitForTimeout(3500);
console.log(p.url());
console.log((await p.evaluate(() => document.querySelector("main")?.innerText ?? document.body.innerText)).replace(/\n+/g, " | ").slice(0, 1500));
if (process.argv[6]) await p.screenshot({ path: process.argv[6] });
await b.close();
