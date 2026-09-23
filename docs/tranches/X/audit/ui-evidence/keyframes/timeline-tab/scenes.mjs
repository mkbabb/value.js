// Cohesion sweep: the Timeline tab across every animation scene (1440 light). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const rev = () => execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim() + "+" + execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false }); const res = { kf: rev() };
for (const sc of ["cube", "amiga", "square", "easing", "spring"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" }); const page = await ctx.newPage();
  try {
    await page.goto(`http://localhost:5173/#/${sc}`, { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
    const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1000);
    const trig = page.locator('[aria-label="Controls tab"]').first(); const has = await trig.count(); let opts = [];
    if (has) { await trig.click(); await page.waitForTimeout(700); opts = (await page.getByRole("option").allTextContents()).map(s => s.trim()); const o = page.getByRole("option", { name: /^Timeline/ }); if (await o.count()) { await o.first().click(); await page.waitForTimeout(2000); } else await page.keyboard.press("Escape"); }
    await page.mouse.move(1435, 5); await page.waitForTimeout(600);
    const m = await page.evaluate(() => ({ stages: [...document.querySelectorAll(".timeline-preview-stage")].filter(e => e.getBoundingClientRect().height > 0).length, tracks: [...document.querySelectorAll(".timeline-track")].filter(e => e.getBoundingClientRect().height > 0).length, monaco: [...document.querySelectorAll(".monaco-editor")].map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height), e.closest(".controls-pane") ? "pane" : "scene"]; }), ribbon: [...document.querySelectorAll("button")].filter(b => /^(Snapshot|Import|Export|Add CSS)$/.test(b.textContent.trim()) && b.getBoundingClientRect().height > 0).map(b => b.textContent.trim()) }));
    await page.screenshot({ path: OUT + `30-${sc}-timeline-1440-light.png` });
    res[sc] = { hasTab: !!has, opts, ...m };
  } catch (e) { res[sc] = String(e).slice(0, 200); }
  await ctx.close();
}
writeFileSync(OUT + "scenes.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res));
await b.close();
