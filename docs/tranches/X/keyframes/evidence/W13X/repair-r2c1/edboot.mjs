// SERVED MODEL: claude-opus-5-5
// Repair 1 — does the Keyframes editor boot? Counts `.monaco-editor`, busy wells, and page/console errors on #/<scene>, at rest
// (pane cached hidden) and after a reload with the scene's stored control = Keyframes (pane shown). Headless; closed in finally.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 200))); p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await p.goto(process.argv[2] + "#/" + (process.argv[3] || "cube"), { waitUntil: "networkidle" }); await p.waitForTimeout(6000);
  const read = () => p.evaluate(() => ({ editors: document.querySelectorAll(".monaco-editor").length, wells: [...document.querySelectorAll(".code-well__body > div:first-child")].map((e) => `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)} busy=${e.getAttribute("aria-busy")} shown=${e.checkVisibility({ contentVisibilityAuto: true })}`) }));
  const rest = await read();
  // Show the pane: the scene's stored control set to Keyframes (the controlOptionsStore key), then reload.
  const scene = process.argv[3] || "cube";
  await p.evaluate((scene) => localStorage.setItem("animation-groups-control-options-store", JSON.stringify({ _storeTimestamp: Date.now(), [scene]: { selectedControl: "keyframes" } })), scene);
  await p.reload({ waitUntil: "domcontentloaded" });
  const t0 = Date.now(); let shown;
  for (;;) { shown = await read(); if (shown.editors > 0 || Date.now() - t0 > 8000) break; await p.waitForTimeout(100); }
  console.log(JSON.stringify({ rest, shown, bootMs: Date.now() - t0 }), JSON.stringify(errs));
  if (0) console.log(JSON.stringify(await p.evaluate(() => ({ editors: document.querySelectorAll(".monaco-editor").length, wells: [...document.querySelectorAll(".code-well__body > div:first-child")].map((e) => `${e.getBoundingClientRect().width}x${e.getBoundingClientRect().height} busy=${e.getAttribute("aria-busy")} cv=${e.checkVisibility({ contentVisibilityAuto: true })}`) }))), JSON.stringify(errs));
} finally { await b.close(); }
