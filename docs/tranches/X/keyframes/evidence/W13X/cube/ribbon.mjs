// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · UIA-KF-157: the Matrix Controls ribbon buttons vs the sibling Timeline ribbon
// usage: node ribbon.mjs <baseUrl> <tag>
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.argv[2]; const TAG = process.argv[3] || "before"; const OUT = new URL("./frames/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false }); const out = {};
for (const theme of ["light", "dark"]) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme })).newPage();
  await p.goto(BASE + "/#/cube"); await p.waitForSelector(".cube-side"); await p.waitForTimeout(2500);
  const byText = (t) => p.evaluate((t) => [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0).find((e) => (e.getAttribute("aria-label") || e.textContent).trim() === t).click(), t);
  const skin = (t) => p.evaluate((t) => { const e = [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0).find((e) => e.textContent.trim() === t); const cs = getComputedStyle(e); const i = e.querySelector("svg")?.getBoundingClientRect(); return { h: Math.round(e.getBoundingClientRect().height), radius: cs.borderTopLeftRadius, font: cs.fontSize + "/" + cs.fontWeight, padX: cs.paddingLeft, bg: cs.backgroundColor, icon: i ? Math.round(i.width) : null }; }, t);
  await p.getByRole("combobox", { name: "Select animation" }).click(); await p.getByRole("option", { name: "Matrix" }).click(); await p.waitForTimeout(500);
  await byText("Matrix Controls"); await p.waitForTimeout(700);
  const reset = await skin("Reset"); await p.screenshot({ path: `${OUT}${TAG}-ribbon-matrix-${theme}.png`, clip: { x: 0, y: 0, width: 520, height: 900 } });
  await byText("Timeline"); await p.waitForTimeout(700);
  const snap = await skin("Snapshot");
  out[theme] = { reset, snapshot: snap, sameSkin: ["h", "radius", "font", "padX", "bg", "icon"].every((k) => reset[k] === snap[k]) };
}
console.log(JSON.stringify(out)); await b.close();
