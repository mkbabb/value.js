// SERVED MODEL: claude-opus-5-5 — r4cube: does the home landing's die move, and under which playback state?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(`${process.env.BASE || "http://localhost:5493"}/#/`, { timeout: 120000 }); await p.waitForSelector(".cube-pose", { timeout: 90000 }); await new Promise((r) => setTimeout(r, 3000));
console.log(JSON.stringify(await p.evaluate(() => new Promise((res) => { const s = { cube: new Set(), bob: new Set(), pose: new Set(), roll: new Set() }; const t0 = performance.now();
  const f = () => { s.cube.add(getComputedStyle(document.querySelector(".cube")).transform); s.bob.add(getComputedStyle(document.querySelector(".cube-bob")).transform); s.pose.add(getComputedStyle(document.querySelector(".cube-pose")).transform); s.roll.add(getComputedStyle(document.querySelector(".idle-hover")).transform);
    if (performance.now() - t0 < 1000) requestAnimationFrame(f); else res({ cube: s.cube.size, bob: s.bob.size, pose: s.pose.size, roll: s.roll.size, cls: document.querySelector(".idle-hover").className }); }; requestAnimationFrame(f); }))));
await b.close();
