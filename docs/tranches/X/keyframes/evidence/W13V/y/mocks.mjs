// SERVED MODEL: claude-opus-5-5
// KF.W13V.y — design-note MOCKS from the served page: the note's rules injected
// into the live page (prototype stylesheet + copy swap), no product byte.
// Usage: node mocks.mjs <baseUrl> <outDir>
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", outDir = "mocks"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const CSS = `
.preset-track{display:none!important}
.preset-cell,.specimen-tile{border-radius:var(--radius-field)!important;white-space:nowrap}
.preset-name-row{flex-wrap:nowrap!important}
.tile-name{white-space:nowrap!important;overflow:hidden;text-overflow:ellipsis;letter-spacing:normal!important;overflow-wrap:normal!important}
.spring-target .readout-accent{color:var(--muted-foreground)!important}
.spring-heatmap-section span{white-space:nowrap}
.seq-row-label{flex-direction:row!important;white-space:nowrap;gap:.35rem}
`;
const SHOTS = [
  ["spring", "pane", "1440x900"], ["spring", "pane", "390x844"], ["spring", "stage", "390x844"],
  ["easing", "stage", "1440x900"], ["easing", "stage", "390x844"], ["sequence", "stage", "1440x900"], ["sequence", "stage", "390x844"],
];
const b = await chromium.launch({ headless: false });
for (const [scene, mode, vp] of SHOTS) {
  const [w, h] = vp.split("x").map(Number);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: "light" });
  const p = await ctx.newPage();
  await p.goto(base.replace(/#.*$/, "") + `#/${scene}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  if (mode === "pane") {
    const dock = p.locator("[data-dock-tether=top]");
    await dock.hover({ force: true }).catch(() => {}); await p.waitForTimeout(1300);
    const it = dock.locator('[data-dock-surface-item][data-surface="spring"]');
    if ((await it.getAttribute("aria-pressed")) !== "true") await it.click().catch(() => {});
    await p.mouse.move(w / 2, h - 5); await p.waitForTimeout(1500);
  }
  await p.addStyleTag({ content: CSS });
  await p.evaluate(() => {
    const swap = (sel, fn) => document.querySelectorAll(sel).forEach(fn);
    swap(".spring-header h2", (e) => { e.textContent = "Spring"; });
    swap("#spring-rail-hint", (e) => { e.textContent = "Tap or drag the rail — the ball springs to the new target. Tune response and damping in the Physics pane."; });
    swap(".spring-heatmap-section > div:first-child > span:first-child", (e) => { e.textContent = "Peak overshoot"; });
    swap(".spring-heatmap-section > div:first-child > span:nth-child(2)", (e) => { e.style.display = "none"; });
    swap(".spring-heatmap-section > div:last-child > span:last-child", (e) => { e.style.display = "none"; });
    swap(".spring-heatmap-section > div:last-child .tabular-nums", (e) => { e.textContent = "0 → 53 % overshoot · set by damping alone"; });
    swap(".spring-target span.text-small", (e) => { if (/sweep/.test(e.textContent)) e.textContent = "Timing-function sweep"; });
  });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${outDir}/mock-${scene}-${mode}-${vp}-light.png` });
  console.log("mock", scene, mode, vp);
  await ctx.close();
}
await b.close();
console.log("ok");
