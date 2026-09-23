// transport-dock — probe the collapsed face geometry (why the pill is 56px while its face is wider).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
console.log("khead", kf("rev-parse --short HEAD"), "kdirty", kf("status --porcelain").split("\n").filter(Boolean).length);
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.mouse.move(1300, 200);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4000);
const b = await page.locator('[data-dock-tether="bottom"] .glass-dock').boundingBox();
await page.mouse.move(b.x + b.width / 2, b.y + 28, { steps: 3 }); await page.waitForTimeout(800);
await page.mouse.move(1300, 200, { steps: 3 }); await page.waitForTimeout(4800);
const geo = await page.evaluate(() => {
  const dock = document.querySelector('[data-dock-tether="bottom"] .glass-dock');
  const walk = (el, d = 0, out = []) => { if (d > 5) return out; const s = getComputedStyle(el), r = el.getBoundingClientRect();
    out.push(`${"  ".repeat(d)}${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 4).join(".")} x${Math.round(r.x)} w${Math.round(r.width)} disp:${s.display} pos:${s.position} w:${s.width} minW:${s.minWidth} maxW:${s.maxWidth} ov:${s.overflowX} clip:${s.clipPath.slice(0, 30)} op:${s.opacity} vis:${s.visibility} ${el.inert ? "INERT" : ""}`);
    if (!el.matches("button,svg")) [...el.children].forEach((c) => walk(c, d + 1, out)); return out; };
  return { style: dock.getAttribute("style"), cls: dock.className, tree: walk(dock) };
});
console.log(JSON.stringify(geo, null, 1));
await page.screenshot({ path: OUT + "probe-collapsed.png", clip: { x: 600, y: 760, width: 240, height: 70 } });
// top ChromeDock collapsed for comparison
const top = await page.evaluate(() => { const d = document.querySelector('[data-dock-tether="top"] .glass-dock'); return d ? { cls: d.className, style: d.getAttribute("style"), w: d.getBoundingClientRect().width } : null; });
console.log(JSON.stringify(top));
await browser.close();
