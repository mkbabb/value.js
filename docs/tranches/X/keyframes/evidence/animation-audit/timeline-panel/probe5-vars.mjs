// timeline-panel — probe5: dump the snapshot vars and re-run the engine's own parse on each (read-only).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { window.__v = (sel) => [...document.querySelectorAll(sel)].find((e) => e.checkVisibility()); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(5000);
await page.mouse.move(720, 70); await page.waitForTimeout(700);
await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); await page.waitForTimeout(1500);
await page.getByRole("button", { name: /^Snapshot$/ }).click(); await page.waitForTimeout(800);
const r = await page.evaluate(async () => {
  const st = __v(".timeline-preview-stage"); let inst = st.__vueParentComponent; while (inst && !inst.setupState?.scrub) inst = inst.parent;
  const vars = inst.setupState.state.keyframes[0].vars;
  const m = await import("/@fs/Users/mkbabb/Programming/keyframes.js/src/animation/compile/parse-facade.ts");
  const res = {};
  for (const [k, v] of Object.entries(vars)) { let ok; try { const p = m.parseCssValues(v); ok = p.ok ? "ok" : "FAIL " + JSON.stringify(p.diagnostics?.[0] ?? p).slice(0, 120); } catch (e) { ok = "THROW " + e.message.slice(0, 100); } res[k] = [v.slice(0, 70), ok]; }
  return res;
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
