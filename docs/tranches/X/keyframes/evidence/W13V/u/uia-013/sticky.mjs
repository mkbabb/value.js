// SERVED MODEL: claude-opus-5-5
// UIA-KF-013 · Controls pane option fields (duration, delay, iterations): type an invalid value + Enter, then type
// the persisted value back + Enter; read the field's invalid state (aria-invalid / data-invalid / the error text) each time.
// usage: node sticky.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false }); const res = { base: BASE, fields: [] };
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500);
await p.mouse.move(720, 70); await p.waitForTimeout(700);
// the Controls pane is open on scene entry at 1440 (the dock roster lists its comboboxes); open it only if it is not
if (!(await p.getByLabel("duration", { exact: true }).first().isVisible().catch(() => false))) { await p.locator("[data-dock-tether=top] [aria-label=Controls], [data-dock-tether=top] button:has-text('Controls')").first().click(); await p.waitForTimeout(1500); }
const read = (label) => p.evaluate((label) => {
  const i = [...document.querySelectorAll("input")].find((e) => e.offsetParent && (e.labels?.[0]?.textContent.trim() === label || e.getAttribute("aria-label") === label));
  if (!i) return null; const w = i.closest("[data-invalid], [data-slot]") ?? i.parentElement;
  const desc = (i.getAttribute("aria-describedby") || "").split(/\s+/).map((id) => document.getElementById(id)?.textContent.trim()).filter(Boolean).join(" / ");
  return { value: i.value, ariaInvalid: i.getAttribute("aria-invalid"), dataInvalid: w?.getAttribute("data-invalid") ?? null, describedBy: desc.slice(0, 120) };
}, label);
for (const [label, bad] of [["duration", "abc"], ["delay", "abc"], ["iterations", "abc"]]) {
  const input = p.getByLabel(label, { exact: true }).first();
  const orig = await input.inputValue();
  await input.fill(bad); await input.press("Enter"); await p.waitForTimeout(400); const afterBad = await read(label);
  await input.fill(orig); await input.press("Enter"); await p.waitForTimeout(400); const afterRestore = await read(label);
  await p.screenshot({ path: `${OUT}${label}-restored.png`, clip: { x: 0, y: 0, width: 720, height: 900 } });
  res.fields.push({ label, orig, afterBad, afterRestore });
}
fs.writeFileSync(OUT + "sticky.json", JSON.stringify(res, null, 1)); for (const f of res.fields) console.log(JSON.stringify(f));
await b.close();
