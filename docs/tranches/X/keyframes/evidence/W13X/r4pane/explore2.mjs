// SERVED MODEL: claude-opus-5-5 — KF.W13X.r4pane: exploratory DOM read (not a banked reading)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, route = "cube"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(base + "/#/" + route);
await p.waitForTimeout(6000);
console.log(await p.evaluate(() => JSON.stringify({
  m: localStorage.getItem("keyframes-js-scene-machine")?.slice(0, 600),
  c: localStorage.getItem("animation-groups-control-options-store")?.slice(0, 400),
  dockBtns: [...document.querySelectorAll("[data-dock-tether] button, nav button")].map((e) => e.getAttribute("aria-label") || e.textContent.trim().slice(0, 30)).slice(0, 40),
})));
await b.close();
