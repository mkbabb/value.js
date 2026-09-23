// probe: 390px canvas dock expanded — which controls are reachable/visible (tap + geometry only)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const slug = readFileSync(OUT + "slug.txt", "utf8").trim();
const b = await chromium.launch({ headless: false });
const page = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true })).newPage();
await page.goto("http://localhost:3100/w/" + slug, { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
await page.getByRole("tab", { name: "Canvas" }).click(); await page.waitForTimeout(1500);
const top = page.locator(".controls-dock-anchor .glass-dock");
await top.getByRole("button", { name: "Expand dock" }).tap(); await page.waitForTimeout(1200);
const r = await page.evaluate(() => {
  const d = document.querySelector(".controls-dock-anchor .glass-dock"); const dr = d.getBoundingClientRect();
  const sc = [...d.querySelectorAll("*")].filter((e) => e.scrollWidth > e.clientWidth + 2).map((e) => ({ cls: String(e.className).slice(0, 60), sw: e.scrollWidth, cw: e.clientWidth, ox: getComputedStyle(e).overflowX }));
  const btns = [...d.querySelectorAll("button[aria-label]")].map((b) => { const r = b.getBoundingClientRect(); const cs = getComputedStyle(b); return { label: b.getAttribute("aria-label"), x: Math.round(r.x), w: Math.round(r.width), vis: cs.visibility, inDock: r.x >= dr.x - 1 && r.right <= dr.right + 1 }; });
  const label = document.querySelector(".canvas-container canvas").getBoundingClientRect();
  return { dock: [Math.round(dr.x), Math.round(dr.y), Math.round(dr.width), Math.round(dr.height)], cls: d.className, scrollers: sc, btns };
});
await page.screenshot({ path: OUT + "probe-mobile-topdock.png" });
writeFileSync(OUT + "probe-mobile-topdock.json", JSON.stringify(r, null, 1)); console.log(JSON.stringify(r, null, 1)); await b.close();
