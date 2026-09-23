// SERVED MODEL: claude-opus-5-5[1m]
// X.W5.d2 — EB-4/EB-2 falsifier on the built bundle: (1) slow chunk -> loading plate occupies the empty region;
// (2) failed chunk -> PaneErrorPlate in place, boundary NOT latched, reported; (3) navigating away then renders the next pane.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright-core/index.mjs";
const BASE = "http://127.0.0.1:8131";
const b = await chromium.launch({ headless: true });
const out = {};
for (const arm of ["slow", "fail"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", (m) => { if (m.type() === "error") logs.push(m.text().slice(0, 160)); });
  await page.route(/GradientPane-.*\.js$/, async (route) => {
    if (arm === "fail") return route.abort("failed");
    await new Promise((r) => setTimeout(r, 1500));
    return route.continue();
  });
  await page.goto(`${BASE}/#/`, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { location.hash = "#/gradient"; });
  await page.waitForTimeout(900);
  const mid = await page.evaluate(() => ({
    loadingPlate: document.querySelectorAll('.pane-wrapper--stage [aria-busy="true"]').length,
    errorPlate: [...document.querySelectorAll('.pane-wrapper--stage [role="alert"]')].map((e) => e.textContent.trim().slice(0, 60)),
    boundaryLatched: document.querySelectorAll(".pane-wrapper--stage .vj-error-boundary").length,
  }));
  await page.waitForTimeout(2500);
  const settled = await page.evaluate(() => ({
    loadingPlate: document.querySelectorAll('.pane-wrapper--stage [aria-busy="true"]').length,
    errorPlate: document.querySelectorAll('.pane-wrapper--stage [role="alert"]').length,
    boundaryLatched: document.querySelectorAll(".pane-wrapper--stage .vj-error-boundary").length,
    stageKids: document.querySelector(".pane-wrapper--stage")?.children.length,
    h1: document.querySelector("h1")?.textContent.trim(),
  }));
  await page.evaluate(() => { location.hash = "#/extract"; });
  await page.waitForTimeout(2500);
  const after = await page.evaluate(() => ({
    h1: document.querySelector("h1")?.textContent.trim(),
    errorPlate: document.querySelectorAll('.pane-wrapper--stage [role="alert"]').length,
    stageRoot: document.querySelector(".pane-wrapper--stage")?.firstElementChild?.className.slice(0, 50),
  }));
  out[arm] = { mid, settled, after, reported: logs.filter((l) => l.includes("pane-chunk")).length, errors: logs.slice(0, 4) };
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(out, null, 2));
