// cohesion — READ-ONLY: the easing scene's sibling surfaces (Controls, Keyframes) beside Curve, 1440 light, for the duplicate-authority check.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const sha = execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim();
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
for (const name of ["Controls", "Keyframes"]) {
  const top = p.locator(".glass-dock").first(); const bb = await top.boundingBox(); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(900);
  await p.getByRole("combobox", { name: "Controls tab" }).click(); await p.waitForTimeout(700);
  await p.getByRole("option", { name }).click(); await p.waitForTimeout(1300); await p.mouse.move(1435, 5); await p.waitForTimeout(500);
  const o = await p.evaluate(() => { const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; }; const pane = [...document.querySelectorAll(".controls-pane")].find(vis);
    return { labels: pane ? [...pane.querySelectorAll("label, [role=combobox], [aria-label]")].filter(vis).map(e => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 30)).slice(0, 30) : null }; });
  console.log(name, sha, JSON.stringify(o));
  await p.screenshot({ path: OUT + `C-${name.toLowerCase()}-surface-1440-light.png` });
}
await b.close();
