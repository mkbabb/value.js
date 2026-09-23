// continuous in-page rAF log + long-animation-frame attribution across 8 X toggles (scene playing), then 8 with the scene paused
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/cube-axis-lines";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const stamp = () => ({ head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim() });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const run = async (label) => {
  await page.evaluate(() => {
    window.__log = []; window.__ev = []; window.__loaf = [];
    const t0 = performance.now(); window.__t0 = t0; let last = t0; window.__run = true;
    const f = (t) => { window.__log.push([+(t - t0).toFixed(1), +(t - last).toFixed(1)]); last = t; if (window.__run) requestAnimationFrame(f); };
    requestAnimationFrame(f);
    addEventListener("keydown", (e) => window.__ev.push(["d", +(performance.now() - t0).toFixed(1)]), true);
    addEventListener("keyup", (e) => window.__ev.push(["u", +(performance.now() - t0).toFixed(1)]), true);
    try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__loaf.push([+(e.startTime - t0).toFixed(0), +e.duration.toFixed(0), +(e.blockingDuration ?? 0), (e.scripts || []).map((s) => `${(s.sourceURL || "").split("/").pop()}:${s.sourceFunctionName}:${Math.round(s.duration)}`).slice(0, 3).join("|")]))).observe({ type: "long-animation-frame", buffered: false }); } catch (e) { window.__loaf.push(["noLoAF"]); }
  });
  for (let i = 0; i < 8; i++) { await page.keyboard.down("x"); await page.waitForTimeout(350); await page.keyboard.up("x"); await page.waitForTimeout(350); }
  await page.waitForTimeout(200);
  const r = await page.evaluate(() => { window.__run = false; return { log: window.__log, ev: window.__ev, loaf: window.__loaf }; });
  const long = r.log.filter((x) => x[1] > 20);
  return { label, frames: r.log.length, drops: long.length, long, ev: r.ev, loaf: r.loaf.filter((l) => l[1] > 50) };
};
const A = await run("scene-playing");
await page.getByRole("button", { name: "Pause animation" }).first().click();
await page.mouse.move(5, 890); await page.waitForTimeout(400);
const B = await run("scene-paused");
fs.writeFileSync(`${OUT}/jank-log.json`, JSON.stringify({ stamp: stamp(), A, B }));
for (const X of [A, B]) console.log(X.label, "frames", X.frames, "drops>20ms", X.drops, "long", JSON.stringify(X.long.slice(0, 12)), "\n ev", JSON.stringify(X.ev.slice(0, 16)), "\n loaf", JSON.stringify(X.loaf.slice(0, 10)));
await browser.close();
