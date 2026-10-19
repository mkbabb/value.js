// SERVED MODEL: claude-opus-5-5
// Repair 1 (C1r2-1) — the roster driver's synthetic press on #/<scene>: which Play control it finds, and the transport label after
// pointerdown and after pointerup (SYNC=1: down and up in one task, as the driver dispatches them). Headless; closed in finally. Usage: node pressdiag.mjs <base> [scene]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(process.argv[2] + "#/" + (process.argv[3] || "sequence"), { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  const r = await p.evaluate(async (SYNC) => {
    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    const labels = () => [...document.querySelectorAll('button[aria-label*="animation" i]')].map((e) => `${e.getAttribute("aria-label")}${e.getBoundingClientRect().width > 0 ? "" : "(0box)"}`);
    const el = [...document.querySelectorAll('button[aria-label="Play animation"]')].find((e) => e.getBoundingClientRect().width > 0);
    const out = { before: labels(), found: !!el };
    const opts = { bubbles: true, cancelable: true, button: 0, pointerType: "mouse", isPrimary: true, pointerId: 1 };
    el.dispatchEvent(new PointerEvent("pointerdown", opts)); if (!SYNC) await sleep(0); out.afterDown = labels(); out.connected = el.isConnected;
    el.dispatchEvent(new PointerEvent("pointerup", opts)); await sleep(150); out.afterUp = labels();
    return out;
  }, !!process.env.SYNC);
  console.log(JSON.stringify(r));
} finally { await b.close(); }
