// z-order probe: which element paints at points just inside each overlay's top edge.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const b = await chromium.launch({ headless: false });
const out = {};
for (const [name, sel] of [["scene-select", '[aria-label="Scene"][role=combobox]'], ["mbabb-menu", '[aria-label="@mbabb menu"]'], ["share-popover", '[data-dock-tether="top"] .glass-dock [aria-label="Share animation"]']]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:5173/", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.mouse.move(720, 71); await p.waitForTimeout(1300);
  await p.locator(sel).click(); await p.waitForTimeout(900);
  out[name] = await p.evaluate(() => {
    const c = [...document.querySelectorAll(".glass-reveal[data-state=open]")].at(-1);
    const r = c.getBoundingClientRect();
    const tether = document.querySelector('[data-dock-tether="top"]');
    const dock = tether.querySelector(".glass-dock").getBoundingClientRect();
    const hits = [];
    for (let y = Math.floor(r.top) + 1; y <= Math.ceil(dock.bottom) + 2; y++) {
      const x = Math.max(r.left + 30, dock.left + 30);
      const e = document.elementFromPoint(x, y);
      hits.push([y, c.contains(e) ? "overlay" : tether.contains(e) ? "dock" : (e?.className?.toString() || e?.tagName || "").slice(0, 30)]);
    }
    return { overlayTop: +r.top.toFixed(2), dockBottom: +dock.bottom.toFixed(2), tetherZ: getComputedStyle(tether).zIndex, overlayZ: getComputedStyle(c).zIndex, wrapperZ: c.closest("[data-reka-popper-content-wrapper]") ? getComputedStyle(c.closest("[data-reka-popper-content-wrapper]")).zIndex : null, hits };
  });
  await p.screenshot({ path: `${new URL(".", import.meta.url).pathname}sheets/zprobe-${name}.png`, clip: { x: 450, y: 30, width: 500, height: 110 } });
  await p.close();
}
await b.close();
fs.writeFileSync(new URL("./probe-z.json", import.meta.url).pathname, JSON.stringify(out, null, 1));
for (const [n, o] of Object.entries(out)) console.log(n, o.overlayTop, o.dockBottom, "tetherZ", o.tetherZ, "overlayZ", o.overlayZ, "wrapZ", o.wrapperZ, JSON.stringify(o.hits));
