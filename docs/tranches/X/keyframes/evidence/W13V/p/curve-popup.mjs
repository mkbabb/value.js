// SERVED MODEL: claude-opus-5-5
// KF.W13V.p — UIA-KF-046's Curve preset strip at glass 10.0.1: open the Curve facet's 'Easing preset' Select by keyboard and list every rounded box >= 30 px tall in its listbox (height, width, computed radius).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const base = process.argv[2] || "http://localhost:5173/";
await p.goto(base + "#/easing", { waitUntil: "networkidle" }); await p.waitForTimeout(2300);
const dock = p.locator("[data-dock-tether=top]");
await dock.hover({ force: true }); await p.waitForTimeout(1300);
await dock.locator('[data-dock-surface-item][data-surface="easing"]').click().catch(() => {});
await p.mouse.move(720, 895); await p.waitForTimeout(1300);
const t = p.locator('.controls-surface [aria-label="Easing preset"]').first();
console.log("trigger", await t.count(), await t.getAttribute("aria-expanded"));
await t.focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(900);
console.log("expanded", await t.getAttribute("aria-expanded"), "controls", await t.getAttribute("aria-controls"));
console.log(await p.evaluate(() => { const id = document.querySelector('.controls-surface [aria-label="Easing preset"]')?.getAttribute("aria-controls"); const root = id && document.getElementById(id); if (!root) return "no popup root"; const out = [];
  for (const el of root.querySelectorAll("*")) { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); const rad = parseFloat(cs.borderTopLeftRadius) || 0; if (!rad || r.height < 30) continue; out.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0,2).join(".")}[${el.getAttribute("role")||""}] "${el.textContent.trim().replace(/\s+/g," ").slice(0,20)}" h=${Math.round(r.height)} w=${Math.round(r.width)} r=${Math.min(9999,rad)}`); } return `root ${root.getAttribute("role")} items=${out.length}\n` + out.join("\n"); }));
await p.screenshot({ path: "logs/curve-popup-1440-light.png" });
await b.close();
