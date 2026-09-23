// Why does the dock Play not start the master after a reel? Probe hit-testing + both Play buttons.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" }); await p.waitForTimeout(2200);
const st = () => p.evaluate(() => { const t = document.body.innerText; return (t.match(/CLOCK\s*([\d.]+)/)?.[1]) + " " + (t.match(/\b(READY|PLAYING|PAUSED)\b/)?.[1]); });
const btns = () => p.evaluate(() => [...document.querySelectorAll('button[aria-label="Play animation"],button[aria-label="Pause animation"]')].map(x => { const r = x.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
  return { l: x.getAttribute("aria-label"), x: r.x, w: r.width, hitSelf: x.contains(hit), hit: hit?.tagName + "." + String(hit?.className?.baseVal ?? hit?.className).slice(0, 50), anc: x.parentElement?.className?.slice?.(0, 60) }; }));
console.log("fresh", JSON.stringify(await btns()));
await p.locator('[aria-label^="Play the reel"]').click(); await p.waitForTimeout(1900);
console.log("after reel", await st(), JSON.stringify(await btns()));
await p.screenshot({ path: process.argv[2] + "/after-reel-full.png" });
const all = await p.$$('button[aria-label="Play animation"]');
for (const [i, h] of all.entries()) { const r = await h.boundingBox(); await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2); await p.waitForTimeout(600); console.log("clicked #" + i, r.x, r.width, "->", await st()); }
await b.close();
