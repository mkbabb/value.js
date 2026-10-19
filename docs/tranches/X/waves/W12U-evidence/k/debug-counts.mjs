// SERVED MODEL: claude-opus-5-5
// X.W12U.k — census debug: print EVERY component count on the given routes
// (not only the multi-mounted ones), to check the walk reaches a pane's rows.
// Usage: node debug-counts.mjs <route> [<route> …]
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { prepare } from "../x/seed-x.mjs";
const src = readFileSync(new URL("./probe-mounts.mjs", import.meta.url), "utf8");
const census = (0, eval)("(" + src.slice(src.indexOf("const census = ") + 15, src.indexOf("/** Read one census against the table. */")).trim().replace(/;$/, "") + ")");
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await prepare(ctx, { admin: true, palettes: true, user: true, browse: "ok" });
const p = await ctx.newPage();
p.on("pageerror", (e) => console.log("  pageerror:", String(e).slice(0, 300)));
p.on("console", (m) => { if (m.type() === "error") console.log("  console.error:", m.text().slice(0, 300)); });
p.on("requestfailed", (r) => console.log("  requestfailed:", r.url().slice(0, 160), r.failure()?.errorText));
await p.goto("http://localhost:9000/#/", { waitUntil: "commit", timeout: 600000 });
await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
for (const route of process.argv.slice(2)) {
    await p.evaluate((r) => { location.hash = `#${r}`; }, route);
    await p.waitForTimeout(25000);
    const c = await p.evaluate(census);
    const text = await p.evaluate(() => document.querySelector("main")?.innerText.slice(0, 300));
    console.log(route, JSON.stringify(c.counts ?? c, null, 0));
    console.log("  main:", JSON.stringify(text));
}
await b.close();
