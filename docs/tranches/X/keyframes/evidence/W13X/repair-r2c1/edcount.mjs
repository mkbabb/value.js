// SERVED MODEL: claude-opus-5-5
// Repair 1 (C1r2-3) — counts mounted `.monaco-editor` nodes (and their isConnected hosts) across a cube → amiga swap. Headless; closed in finally.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(process.argv[2] + "#/cube", { waitUntil: "networkidle" }); await p.waitForTimeout(5000);
  const read = () => p.evaluate(() => [...document.querySelectorAll(".monaco-editor")].map((e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)} cv=${getComputedStyle(e.closest("[class*=pane], section") || e).contentVisibility}`; }));
  console.log("cube", JSON.stringify(await read()));
  await p.evaluate(() => { location.hash = "#/amiga"; }); await p.waitForTimeout(4000);
  console.log("amiga", JSON.stringify(await read()));
} finally { await b.close(); }
