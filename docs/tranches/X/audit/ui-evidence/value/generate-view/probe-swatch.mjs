// read-only DOM probe of the generate swatch row
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] })).newPage();
await p.goto("http://localhost:9000/#/generate", { waitUntil: "domcontentloaded" });
await p.locator("[data-generate-plate]").waitFor({ timeout: 45000 }); await new Promise(r => setTimeout(r, 3000));
const info = await p.evaluate(() => { const row = document.querySelector(".generate-swatch").parentElement; const e = row.firstElementChild; const s = getComputedStyle(e);
  return { rowHTML: row.outerHTML.slice(0, 900), tag: e.tagName, pe: s.pointerEvents, rowPe: getComputedStyle(row).pointerEvents, tabIndex: e.tabIndex, buttonsInRow: row.querySelectorAll("button").length, ariaHidden: e.getAttribute("aria-hidden") }; });
console.log(JSON.stringify(info, null, 1));
await p.evaluate(() => navigator.clipboard.writeText("SENTINEL"));
const bb = await p.locator(".generate-swatch").first().boundingBox();
await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await new Promise(r => setTimeout(r, 400));
console.log("clipboard after swatch click:", await p.evaluate(() => navigator.clipboard.readText()));
const snap = await p.locator("[data-generate-plate]").ariaSnapshot();
console.log(snap);
await b.close();
