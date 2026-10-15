// SERVED MODEL: claude-opus-5-5
// KF.W13X.r4ribbon — diagnostic: after choosing the Timeline surface on cube,
// what the dock offers and what the pane holds.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const logs = [];
p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") logs.push(m.text().slice(0, 200)); });
p.on("pageerror", (e) => logs.push("PAGEERROR " + String(e).slice(0, 200)));
await p.goto(process.argv[2] + "#/cube", { waitUntil: "domcontentloaded", timeout: 180000 });
await p.waitForSelector(".controls-layout", { timeout: 90000 });
await p.waitForTimeout(3500);
const items = await p.evaluate(() => [...document.querySelectorAll("[data-dock-surface-item]")].map((e) => e.getAttribute("aria-label") + ":" + (e.getBoundingClientRect().width > 0)));
console.log("surface items", JSON.stringify(items));
const tl = p.locator('[data-dock-surface-item][aria-label="Timeline"]').first();
console.log("timeline item count", await tl.count());
if (await tl.count()) await tl.click({ force: true });
await p.waitForTimeout(2500);
console.log(await p.evaluate(() => {
    const panels = [...document.querySelectorAll("[data-surface-panel]")].map((e) => e.getAttribute("aria-label") + ":" + e.dataset.state);
    const surf = document.querySelector(".controls-surface");
    return JSON.stringify({ panels, buttons: [...document.querySelectorAll(".controls-pane-wrapper button")].map((x) => x.getAttribute("aria-label") || x.textContent.trim().slice(0, 16)).slice(0, 30), surfHtml: surf ? surf.innerHTML.length : -1, ribbonTarget: document.querySelector("#timeline-ribbon-target")?.childElementCount });
}));
console.log("logs", logs.length, logs.slice(0, 6).join("\n"));
await b.close();
