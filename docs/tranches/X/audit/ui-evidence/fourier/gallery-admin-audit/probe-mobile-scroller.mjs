// Read-only probe: which ancestor scrolls horizontally on 390px after the Audit Log tab click.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.route("**/api/**", (r) => r.request().method() !== "GET" && /\/api\/admin\//.test(r.request().url()) ? r.abort() : r.fallback());
await page.goto("http://localhost:3100/gallery?admin=dev");
await page.getByRole("tab", { name: "Audit Log" }).waitFor({ timeout: 30000 });
await page.waitForTimeout(1500);
const before = await page.evaluate(() => { const t = document.querySelector("[role=tablist]"); return { tabsX: Math.round(t.getBoundingClientRect().x), tabsSW: t.scrollWidth, tabsCW: t.clientWidth }; });
await page.getByRole("tab", { name: "Audit Log" }).click(); await page.waitForTimeout(1500);
const after = await page.evaluate(() => [...document.querySelectorAll("*")].filter((e) => e.scrollLeft > 0 || e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX !== "visible").map((e) => ({ tag: e.tagName, cls: (e.className?.baseVal ?? e.className).slice(0, 120), sl: e.scrollLeft, sw: e.scrollWidth, cw: e.clientWidth, ox: getComputedStyle(e).overflowX })).concat([{ winScrollX: scrollX, docSW: document.documentElement.scrollWidth }]));
await page.screenshot({ path: new URL(".", import.meta.url).pathname + "m-light-0-probe-after-tab.png" });
console.log(JSON.stringify({ before, after }, null, 1));
await b.close();
