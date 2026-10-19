// SERVED MODEL: claude-opus-5-5
// X.W12U.h scratch — which heading on /gradient carries a control's text (H gate 18.608/18.608).
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await prepare(ctx, { theme: "light" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient", { timeout: 240000 });
await p.waitForFunction(() => document.querySelectorAll(".pane-wrapper .pane-header-title").length > 0, null, { timeout: 90000 }).catch(() => {});
await p.waitForTimeout(4000);
console.log(await p.evaluate(() => [...document.querySelectorAll(".pane-wrapper--stage h1,.pane-wrapper--stage h2,.pane-wrapper--stage h3,.pane-wrapper--stage h4")].map((e) => e.tagName + " fs=" + getComputedStyle(e).fontSize + " cls=" + e.className.slice(0, 80) + " :: " + e.outerHTML.replace(/\s+/g, " ").slice(0, 420)).join("\n")));
await b.close();
