// After facet interactions, watch the dock (transport host) for a morph that swallows the Play click.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; fs.mkdirSync(OUT + "H_dock_after_facet", { recursive: true });
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
const st = () => p.evaluate(() => ({ btns: [...document.querySelectorAll('button[aria-label$=" animation"]')].map(e => { const r = e.getBoundingClientRect(); return e.getAttribute("aria-label").split(" ")[0] + "@" + Math.round(r.x) + ":" + getComputedStyle(e).visibility[0] + ":" + (+getComputedStyle(e.closest(".dock-layer") || e).opacity).toFixed(2); }).join(" "), layers: [...document.querySelectorAll(".dock-layer")].map(e => e.className.replace(/\s+/g, ".").slice(0, 60) + ":" + (+getComputedStyle(e).opacity).toFixed(2)).join(" | "), anims: document.getAnimations().map(a => (a.animationName || a.transitionProperty) + ":" + a.playState).join(",") }));
const log = [];
log.push(["load", await st()]);
await p.mouse.click(420, 420); log.push(["after heatmap click", await st()]);
for (let i = 0; i < 12; i++) { await p.waitForTimeout(100); log.push(["+" + (i + 1) * 100, await st()]); await p.screenshot({ path: `${OUT}H_dock_after_facet/f${String(i).padStart(3, "0")}.png`, clip: { x: 540, y: 740, width: 360, height: 100 } }); }
await p.mouse.move(1400, 880); await p.waitForTimeout(1500); log.push(["settled", await st()]);
fs.writeFileSync(OUT + "H_dock_after_facet/log.json", JSON.stringify(log, null, 1));
for (const [k, v] of log) console.log(k, "|", v.btns, "|", v.layers.slice(0, 200), "|", v.anims.slice(0, 160));
await b.close();
