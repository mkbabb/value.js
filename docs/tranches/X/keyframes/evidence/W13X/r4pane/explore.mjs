// SERVED MODEL: claude-opus-5-5 — KF.W13X.r4pane: exploratory DOM read (not a banked reading)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, route = "easing", w = 1440, h = 900] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: +w, height: +h } })).newPage();
await p.goto(base + "/#/" + route);
await p.waitForTimeout(6000);
console.log(JSON.stringify(await p.evaluate(() => ({
  surfaces: [...document.querySelectorAll("[data-surface-panel]")].map((e) => [e.getAttribute("aria-label"), e.dataset.state]),
  combos: [...document.querySelectorAll("button[role=combobox],[aria-haspopup]")].map((e) => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 40)).slice(0, 20),
  stored: Object.keys(localStorage),
  scrollers: [...document.querySelectorAll(".controls-surface,.controls-pane")].map((e) => [e.className.slice(0, 80), e.scrollHeight, e.clientHeight, getComputedStyle(e).maskImage.slice(0, 30)]),
  cards: document.querySelectorAll(".controls-pane [data-slot=card]").length,
})), null, 1));
await b.close();
