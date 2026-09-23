// probe: does Reset (vs a plain scroll round-trip) blank the hero blob / collapse the picker? + satellites slider 0 vs 4 visible delta.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/blob-view";
const tree = () => execSync("git rev-parse --short HEAD; git status --porcelain | wc -l", { cwd: "/Users/mkbabb/Programming/value.js" }).toString().trim().replace(/\s+/g, " dirty=");
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await ctx.newPage(); const log = { tree: tree() };
await p.goto("http://localhost:9000/#/blob", { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(5000);
const state = () => p.evaluate(() => { const c = document.querySelector(".hero-blob-anchor canvas"); const sp = document.querySelector(".pane-shell canvas, .spectrum canvas"); const d = document.querySelector(".glass-dock"); return { scrollY, blobCanvas: c ? [c.width, c.height, getComputedStyle(c).opacity, getComputedStyle(c.closest('.hero-blob-anchor')).opacity] : null, condensed: !!document.querySelector(".is-condensed"), dockBox: d ? d.getBoundingClientRect().width : null }; });
const scrollHost = () => p.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
const top = () => p.evaluate(() => window.scrollTo(0, 0));
// A: scroll round-trip only
await scrollHost(); await p.waitForTimeout(800); await top(); await p.waitForTimeout(3000);
log.A_roundtrip = await state(); await p.screenshot({ path: `${OUT}/probe-A-scroll-roundtrip-3s.png` });
// B: satellites 0 vs 4
const sat = p.locator(".config-console [role=slider]").nth(1);
await sat.focus(); await p.keyboard.press("Home"); await top(); await p.waitForTimeout(2500);
await p.locator(".hero-blob-anchor").first().screenshot({ path: `${OUT}/probe-B-sat0.png` });
await sat.focus(); await p.keyboard.press("End"); await top(); await p.waitForTimeout(2500);
await p.locator(".hero-blob-anchor").first().screenshot({ path: `${OUT}/probe-B-sat4.png` });
// C: body radius min vs max
const br = p.locator(".config-console [role=slider]").first();
await br.focus(); await p.keyboard.press("Home"); await top(); await p.waitForTimeout(2000);
await p.locator(".hero-blob-anchor").first().screenshot({ path: `${OUT}/probe-C-body-min.png` });
await br.focus(); await p.keyboard.press("End"); await top(); await p.waitForTimeout(2000);
await p.locator(".hero-blob-anchor").first().screenshot({ path: `${OUT}/probe-C-body-max.png` });
// D: Reset then settle 3s at top
await p.getByRole("button", { name: /^Reset$/ }).click(); await p.waitForTimeout(300); await top(); await p.waitForTimeout(3000);
log.D_reset = await state(); await p.screenshot({ path: `${OUT}/probe-D-reset-3s.png` });
// E: tab order — where does Copy JSON land in keyboard order from the last slider
log.D_bodyAfterReset = await br.getAttribute("aria-valuenow");

// F: near-black pick → does the hero blob tile render as an opaque square?
await p.goto("http://localhost:9000/#/blob?space=lab&color=lab(2.7%25+2.5+0.2+/+82.7%25)", { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(5000);
await p.locator(".hero-blob-anchor").first().screenshot({ path: `${OUT}/probe-F-nearblack-blob.png` });
await p.screenshot({ path: `${OUT}/probe-F-nearblack-page.png` });
log.F_hit = "direct-load near-black";
// G: Home — the dock view select (no in-pane Home affordance exists)
const vs = p.getByRole("button", { name: "Select view" }).first();
if (await vs.count()) { await vs.click(); await p.waitForTimeout(800); await p.screenshot({ path: `${OUT}/probe-G-view-menu.png` });
  const items = await p.evaluate(() => [...document.querySelectorAll("[role=menuitem],[role=option],[role=menuitemradio]")].map(e => e.textContent.trim().slice(0, 30)));
  log.G_items = items;
  const home = p.getByRole("menuitem", { name: /Home/ }).or(p.getByRole("option", { name: /Home/ })).or(p.getByRole("menuitemradio", { name: /Home/ })).first();
  if (await home.count()) { await home.click(); await p.waitForTimeout(1500); log.G_route = await p.evaluate(() => location.hash); await p.screenshot({ path: `${OUT}/probe-G-home.png` }); }
}
writeFileSync(`${OUT}/probe-reset.json`, JSON.stringify(log, null, 1)); console.log(JSON.stringify(log));
await b.close();
