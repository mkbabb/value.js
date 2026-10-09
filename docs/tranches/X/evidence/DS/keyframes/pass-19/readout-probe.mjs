import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:5173/#/cube"); await page.evaluate(() => localStorage.clear()); await page.reload(); await page.waitForTimeout(5000);
await page.locator('[aria-label="Edit easing curve"]').first().click(); await page.waitForTimeout(1500);
console.log(JSON.stringify(await page.evaluate(() => { const c = [...document.querySelectorAll("[data-subpane-body] code")][0]; const s = document.querySelector(".controls-surface"); const h = document.querySelector(".panel-row--detail [data-subpane-header]"); const svg = document.querySelector("[data-subpane-body] svg").getBoundingClientRect();
 const chain = []; let e = c; for (let i = 0; i < 4; i++) { const r = e.getBoundingClientRect(); chain.push([e.tagName, e.className.toString().slice(0, 60), Math.round(r.left), Math.round(r.width)]); e = e.parentElement; }
 return { sw: c.scrollWidth, cw: c.clientWidth, chain, range: s.scrollHeight - s.clientHeight, hb: Math.round(h.getBoundingClientRect().bottom), svgTop: Math.round(svg.top), svgH: Math.round(svg.height) }; })));
await browser.close();
