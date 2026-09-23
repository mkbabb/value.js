// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — KFA-168 host read: glass spring tokens on :root at 10.0.1 + the computed transition of .controls-layout (AnimationControlsGroup.css:57).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto((process.argv[2] ?? "http://localhost:5173") + "/#/cube", { waitUntil: "load" }); await p.waitForTimeout(4000);
console.log(JSON.stringify(await p.evaluate(() => { const r = getComputedStyle(document.documentElement);
  const names = ["--spring-smooth", "--spring-snappy", "--spring-present", "--spring-panel", "--spring-press", "--spring-dock", "--duration-slow"];
  const tok = Object.fromEntries(names.map((n) => [n, r.getPropertyValue(n).trim().slice(0, 50)]));
  const g = [...document.querySelectorAll("*")].find((e) => getComputedStyle(e).transitionProperty.includes("grid-template-columns") || /AnimationControlsGroup|controls-group/.test(e.className));
  const els = [...document.querySelectorAll(".controls-layout")].slice(0, 3).map((e) => ({ cls: String(e.className).slice(0, 60), tp: getComputedStyle(e).transitionProperty, td: getComputedStyle(e).transitionDuration, tf: getComputedStyle(e).transitionTimingFunction.slice(0, 40) }));
  return { tok, gridHosts: els }; })));
await b.close();
