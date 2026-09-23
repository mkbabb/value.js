// home-picker probe: DOM discovery only (no captures). READ-ONLY on the app.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const URL = "http://localhost:9000/#/";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errs = [];
p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 200)); });
p.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 200)));
await p.goto(URL, { waitUntil: "networkidle" });
await p.waitForTimeout(4000);
const info = await p.evaluate(() => {
  const q = (s) => [...document.querySelectorAll(s)];
  const r = (el) => { const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  return {
    html: document.documentElement.className,
    dockBtns: q("[aria-label]").filter(e => e.closest("nav,[class*=dock]")).map(e => e.getAttribute("aria-label")).slice(0, 60),
    readoutCells: q(".readout-fig").map(r),
    rail: q(".channel-rail-item").map(e => e.getAttribute("aria-label")),
    spaceTrigger: q(".space-trigger").map(r),
    blob: q(".hero-blob-anchor").map(r),
    card: q(".pane-shell > :first-child").map(r),
    panes: q("[data-pane],[data-slot=card]").map(e => (e.getAttribute("data-pane") || e.className.slice(0, 60)) + " " + r(e)).slice(0, 12),
  };
});
console.log(JSON.stringify(info, null, 1));
console.log(errs.join("\n"));
await b.close();
