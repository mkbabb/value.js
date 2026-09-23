// cube-scene: keyboard Tab after closing the controls panel — where does focus land? READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false }); const out = { sha, dirty, runs: {} };
for (const [vp, w, h] of [["1440", 1440, 900], ["390", 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: "light" }); const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  const gd = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(gd.x + gd.width / 2, gd.y + gd.height / 2); await page.waitForTimeout(1100);
  await page.getByRole("button", { name: "Controls panel" }).first().click(); await page.waitForTimeout(2500);
  await page.mouse.move(5, h / 2); await page.waitForTimeout(1500);
  const seq = [];
  for (let k = 1; k <= 8; k++) { await page.keyboard.press("Tab"); await page.waitForTimeout(200); seq.push(await page.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); let inert = false, hidden = false; for (let e = a; e; e = e.parentElement) { if (e.inert) inert = true; const cs = getComputedStyle(e); if (cs.visibility === "hidden" || cs.opacity === "0") hidden = true; } return `${a.tagName} ${a.getAttribute("aria-label") || a.textContent.trim().slice(0, 16)} rect=${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)}x${Math.round(r.height)} onscreen=${r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight} inert=${inert} hiddenAncestor=${hidden} fv=${a.matches(":focus-visible")}`; })); if (k === 4) await page.screenshot({ path: OUT + `15-panel-closed-tab4-${vp}-light.png` }); }
  out.runs[vp] = seq; await ctx.close();
}
writeFileSync(OUT + "focus-probe.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1)); await b.close();
