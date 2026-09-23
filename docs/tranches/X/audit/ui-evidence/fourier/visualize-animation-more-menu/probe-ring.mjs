// Probe: what paints the ring on a hovered menu row + does the dock hold open under an open menu (desktop, pointer parked on the menu)?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3100/w/smoky-nesting-ruby-cat", { waitUntil: "networkidle" });
await p.locator(".animation-dock").waitFor(); await p.waitForTimeout(1500);
await p.locator(".animation-dock").hover(); await p.waitForTimeout(800);
const more = p.locator(".animation-dock [aria-label='More options']");
await more.hover(); await more.click(); await p.waitForTimeout(600);
const row = p.getByRole("menuitemradio", { name: /Cubic/ });
await row.hover(); await p.waitForTimeout(500);
const r = await row.evaluate((e) => { const cs = getComputedStyle(e); return { outline: cs.outline, shadow: cs.boxShadow, border: cs.border, fv: e.matches(":focus-visible"), f: e.matches(":focus"), hl: e.hasAttribute("data-highlighted") }; });
// park pointer inside the menu 4s: does the dock collapse?
await p.waitForTimeout(4000);
const dockCls = await p.locator(".animation-dock").evaluate((e) => e.className);
await p.screenshot({ path: "d-light-9-menu-open-4s-parked.png" });
// move pointer far away while menu still open
await p.mouse.move(200, 200); await p.waitForTimeout(3500);
const dockCls2 = await p.locator(".animation-dock").evaluate((e) => e.className);
const menuOpen = await p.locator("[role=menu]").count();
await p.screenshot({ path: "d-light-10-pointer-away-3s.png" });
writeFileSync("probe-ring.json", JSON.stringify({ row: r, dockParked: dockCls, dockAway: dockCls2, menuOpenAfterAway: menuOpen }, null, 1));
console.log(JSON.stringify({ row: r, dockParked: dockCls.includes("collapsed") ? "collapsed" : "expanded", dockAway: dockCls2.includes("collapsed") ? "collapsed" : "expanded", menuOpen }));
await b.close();
