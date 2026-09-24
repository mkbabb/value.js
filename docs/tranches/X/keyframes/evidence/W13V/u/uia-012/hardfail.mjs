// SERVED MODEL: claude-opus-5-5
// UIA-KF-012 · the CSS editor's rejection state: replace the whole buffer with input that carries no keyframes
// ("}}} @@ nope {", "rotate( ; )"), wait for the debounced re-parse, read every toast raised and the editor's markers.
// usage: node hardfail.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false }); const res = { base: BASE, legs: [] };
for (const [i, text] of ["}}} @@ nope {", "rotate( ; )"].entries()) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500);
  await p.mouse.move(720, 70); await p.waitForTimeout(700);
  await p.locator("[data-dock-tether=top] [aria-label=Keyframes]").first().click(); await p.waitForTimeout(2500);
  await p.evaluate(() => { window.__toasts = []; new MutationObserver(() => { for (const t of document.querySelectorAll('[data-slot="toast"]')) { const s = t.textContent.replace(/\s+/g, " ").trim().slice(0, 140); if (!window.__toasts.includes(s)) window.__toasts.push(s); } }).observe(document.body, { childList: true, subtree: true, characterData: true }); });
  const vl = await p.locator(".monaco-editor .view-lines").first().boundingBox();
  await p.mouse.click(vl.x + 120, vl.y + 40); await p.keyboard.press("Meta+A"); await p.keyboard.type(text, { delay: 20 });
  await p.waitForTimeout(3000);
  const toasts = await p.evaluate(() => window.__toasts);
  const markers = await p.evaluate(() => document.querySelectorAll(".monaco-editor .squiggly-error, .monaco-editor .cdr.squiggly-error").length);
  await p.screenshot({ path: `${OUT}leg${i}.png` });
  res.legs.push({ text, toasts, markers }); await p.context().close();
}
fs.writeFileSync(OUT + "hardfail.json", JSON.stringify(res, null, 1)); for (const l of res.legs) console.log(JSON.stringify(l));
await b.close();
