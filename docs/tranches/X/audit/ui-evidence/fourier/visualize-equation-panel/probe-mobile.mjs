// Mobile dock reach probe: does the first tap on the collapsed canvas dock land on Edit (tap-through)?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const slug = readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 2, hasTouch: true, isMobile: true });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {} });
const page = await ctx.newPage();
const log = [];
await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const t = page.getByRole("tab", { name: /canvas/i }); log.push("canvas tabs " + await t.count()); if (await t.count()) await t.first().click();
await page.waitForTimeout(1500);
const st = async (k) => log.push(k + " " + JSON.stringify(await page.evaluate(() => {
  const d = document.querySelector(".controls-dock-anchor .glass-dock"); const r = d?.getBoundingClientRect();
  return { dock: r && [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], expanded: d?.getAttribute("data-expanded") ?? d?.getAttribute("data-state"),
    controls: [...document.querySelectorAll(".controls-dock-anchor [aria-label]")].map((e) => { const b = e.getBoundingClientRect(); return e.getAttribute("aria-label") + "@" + Math.round(b.x) + "," + Math.round(b.y) + "," + Math.round(b.width) + "x" + Math.round(b.height); }),
    editing: !!document.querySelector(".editor-shell:not(.is-hidden)"), eq: !!document.querySelector(".eq-panel") };
})));
await st("after-canvas-tab"); await page.screenshot({ path: OUT + "m-light-probe-0-collapsed.png" });
// tap the dock's summary where there is no control: its left padding
const summary = page.locator(".controls-dock-anchor [aria-label='Expand dock']").first();
log.push("expand-dock count " + await summary.count());
const bb = await (await summary.count() ? summary : page.locator(".controls-dock-anchor .glass-dock").first()).boundingBox();
log.push("summary bb " + JSON.stringify(bb));
await page.touchscreen.tap(bb.x + 12, bb.y + bb.height / 2);
await page.waitForTimeout(900); await st("after-tap-dock-left-edge"); await page.screenshot({ path: OUT + "m-light-probe-1-expanded.png" });
const eq = page.locator("[aria-label='Equation']");
log.push("eq count " + await eq.count());
if (await eq.count()) { const eb = await eq.first().boundingBox(); log.push("eq bb " + JSON.stringify(eb)); await page.touchscreen.tap(eb.x + eb.width / 2, eb.y + eb.height / 2); await page.waitForTimeout(1500); await st("after-tap-eq"); await page.screenshot({ path: OUT + "m-light-probe-2-eq.png" }); }
writeFileSync(OUT + "probe-mobile.log", log.join("\n") + "\n");
await browser.close(); console.log(log.join("\n"));
