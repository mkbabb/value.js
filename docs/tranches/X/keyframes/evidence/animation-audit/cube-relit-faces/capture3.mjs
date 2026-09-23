// fresh load, playing: where does the drag rotation land? (orbit container vs .cube vs nowhere)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
const st = () => p.evaluate(() => ({ orbit: document.querySelector(".idle-hover").parentElement.getAttribute("style") || "", cube: (document.querySelector(".cube").style.transform || "").slice(0, 70), pose: (document.querySelector(".cube-pose").style.transform||"").slice(0,70), lit0: document.querySelector(".cube .cube-side").style.getPropertyValue("--lit") }));
const r = [await st()];
const bb = await p.locator(".cube").boundingBox(); let x = bb.x + bb.width/2, y = bb.y + bb.height/2;
await p.mouse.move(x, y); await p.mouse.down();
for (let i = 0; i < 6; i++) { y += 10; await p.mouse.move(x, y, { steps: 3 }); await p.waitForTimeout(200); r.push(await st()); }
await p.mouse.up(); await b.close();
for (const s of r) console.log(JSON.stringify(s));
