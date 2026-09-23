import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" }); await p.waitForTimeout(2200);
const q = () => p.evaluate(() => { const e = document.elementFromPoint(687, 792); return { tag: e?.tagName, cls: e?.className?.baseVal ?? e?.className, html: e?.outerHTML.slice(0, 160),
  btns: [...document.querySelectorAll('button[aria-label="Play animation"],button[aria-label="Pause animation"],button[aria-label="Reset animation"]')].map(x => ({ l: x.getAttribute("aria-label"), r: x.getBoundingClientRect().toJSON(), vis: x.checkVisibility() })) }; });
console.log(JSON.stringify(await q()));
await p.locator('[aria-label^="Play the reel"]').click(); await p.waitForTimeout(1900);
console.log(JSON.stringify(await q()));
await p.screenshot({ path: process.argv[2] });
await b.close();
