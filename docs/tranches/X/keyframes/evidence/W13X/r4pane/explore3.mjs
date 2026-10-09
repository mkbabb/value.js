// SERVED MODEL: claude-opus-5-5 — KF.W13X.r4pane: exploratory (not banked)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(process.argv[2] + "/#/cube"); await p.waitForTimeout(6000);
const d = () => p.evaluate(() => [...document.querySelectorAll("[aria-label='Select animation'],[aria-label='Scene facet'],[role=option],[role=menuitem],[role=menuitemradio]")].map((e) => `${e.tagName}|${e.getAttribute("role")}|${e.getAttribute("aria-label")}|${e.textContent.trim().slice(0, 25)}`));
console.log(await d());
await p.locator("[aria-label='Select animation']").first().focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(800);
console.log(await d());
await b.close();
