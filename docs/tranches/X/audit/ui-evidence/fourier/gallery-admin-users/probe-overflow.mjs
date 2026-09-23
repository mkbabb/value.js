// READ-ONLY probe: which element scrolls horizontally on mobile admin gallery; GETs only (non-GET admin aborted).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.route("**/api/**", (r) => r.request().method() !== "GET" && /\/api\/admin\//.test(r.request().url()) ? r.abort() : r.fallback());
await page.goto("http://localhost:3100/gallery?admin=dev");
await page.getByRole("tab", { name: "Users" }).waitFor({ timeout: 30000 }); await page.waitForTimeout(2000);
const scan = () => page.evaluate(() => [...document.querySelectorAll("*")].filter((e) => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX !== "visible").map((e) => ({ tag: e.tagName, cls: (e.className?.baseVal ?? e.className).slice(0, 90), sw: e.scrollWidth, cw: e.clientWidth, sl: e.scrollLeft, ox: getComputedStyle(e).overflowX })).concat([{ tablist: (() => { const r = document.querySelector("[role=tablist]").getBoundingClientRect(); return [r.x, r.width, document.querySelector("[role=tablist]").scrollWidth]; })() }]));
console.log("before", JSON.stringify(await scan()));
await page.screenshot({ path: OUT + "m-light-0-gallery-tab-before-users.png" });
// tap via touch at the tab's current position without Playwright's scrollIntoView
const b = await page.getByRole("tab", { name: "Users" }).boundingBox();
console.log("users tab box", JSON.stringify(b));
await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(2500);
console.log("after tap", JSON.stringify(await scan()));
await page.screenshot({ path: OUT + "m-light-0b-users-after-tap.png" });
const al = await page.getByRole("tab", { name: "Audit Log" }).boundingBox(); console.log("audit tab box", JSON.stringify(al));
await browser.close();
