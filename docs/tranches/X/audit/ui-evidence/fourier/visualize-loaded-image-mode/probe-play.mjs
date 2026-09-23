// probe: does the persistent play/pause DockControl toggle? (read-only: clicks + keyboard only)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const slug = readFileSync(OUT + "slug.txt", "utf8").trim();
const b = await chromium.launch({ headless: false }); const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3100/w/" + slug, { waitUntil: "networkidle" }); await page.locator(".play-control").waitFor(); await page.waitForTimeout(2500);
const st = () => page.evaluate(() => { const c = document.querySelector(".play-control"); const r = c.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
  return { pressed: c.getAttribute("aria-pressed"), label: c.getAttribute("aria-label"), box: [r.x, r.y, r.width, r.height].map(Math.round), hit: hit?.className?.baseVal ?? hit?.className, hitIsCtl: c.contains(hit), dock: c.closest(".glass-dock")?.className, readout: document.querySelector(".controls-overlay .glass-dock")?.textContent.trim().slice(0, 60) }; });
const log = [];
log.push(["initial", await st()]);
await page.locator(".play-control").click(); await page.waitForTimeout(600); log.push(["after locator.click", await st()]);
await page.waitForTimeout(1500); log.push(["+1.5s", await st()]);
await page.locator(".play-control").click(); await page.waitForTimeout(600); log.push(["after 2nd click", await st()]);
await page.locator(".play-control").focus(); await page.keyboard.press("Space"); await page.waitForTimeout(600); log.push(["after Space", await st()]);
await page.keyboard.press("Space"); await page.waitForTimeout(600); log.push(["after Space 2", await st()]);
const r = await page.locator(".play-control").boundingBox(); await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await page.waitForTimeout(1200);
log.push(["hovered 1.2s", await st()]); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(600); log.push(["after hovered mouse click", await st()]);
await page.screenshot({ path: OUT + "probe-play-after.png" });
writeFileSync(OUT + "probe-play.json", JSON.stringify(log, null, 1)); console.log(JSON.stringify(log, null, 1)); await b.close();
