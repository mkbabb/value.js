// extra probes: inventory reach path (Shift-drag / single-axis drag), transport independence, PRM step, blur release, rAF sampling of the live transition
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/cube-axis-lines";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const stamp = () => ({ head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(), t: new Date().toISOString() });
const R = { stamp0: stamp() };
const browser = await chromium.launch({ headless: false });
async function fresh(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ...opts });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  return { ctx, page };
}
const act = (page) => page.evaluate(() => [...document.querySelectorAll(".axis-line")].map((e) => { const cs = getComputedStyle(e); return `${e.classList[1]}:${cs.getPropertyValue("--axis-active").trim()}/${cs.opacity}/${cs.borderTopStyle}`; }).join(" "));
// sample --axis-active of an axis every rAF for ms
const sampler = (page, axis, ms) => page.evaluate(([axis, ms]) => new Promise((res) => {
  const el = document.querySelector(`.axis-line.${axis}`); const out = []; const t0 = performance.now();
  const f = (t) => { const cs = getComputedStyle(el); out.push([+(t - t0).toFixed(1), +(+cs.getPropertyValue("--axis-active")).toFixed(3), cs.borderTopStyle[0], cs.filter === "none" ? 0 : 1]); if (t - t0 < ms) requestAnimationFrame(f); else res(out); };
  requestAnimationFrame(f);
}), [axis, ms]);
{ // 1. inventory reach path
  const { ctx, page } = await fresh();
  const g = await page.evaluate(() => { const r = document.querySelector(".graph").getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  const maxDuring = async (fn) => { let seen = new Set(); const iv = setInterval(async () => { try { seen.add(await act(page)); } catch {} }, 30); await fn(); clearInterval(iv); return [...seen]; };
  R.shiftDrag = await maxDuring(async () => { await page.keyboard.down("Shift"); await page.mouse.move(g[0], g[1]); await page.mouse.down(); for (let i = 0; i < 25; i++) { await page.mouse.move(g[0] + i * 8, g[1]); await page.waitForTimeout(16); } await page.mouse.up(); await page.keyboard.up("Shift"); });
  R.singleAxisDrag = await maxDuring(async () => { await page.mouse.move(g[0], g[1]); await page.mouse.down(); for (let i = 0; i < 25; i++) { await page.mouse.move(g[0] + i * 8, g[1] + (i % 2)); await page.waitForTimeout(16); } await page.mouse.up(); });
  // 2. live rAF sampling of lock-in / release
  const pIn = sampler(page, "y", 400); await page.waitForTimeout(40); await page.keyboard.down("y"); R.liveIn = await pIn;
  const pOut = sampler(page, "y", 400); await page.waitForTimeout(40); await page.keyboard.up("y"); R.liveOut = await pOut;
  // rapid re-toggle mid-transition (reversal): down, 80ms, up
  const pRev = sampler(page, "x", 450); await page.waitForTimeout(30); await page.keyboard.down("x"); await page.waitForTimeout(80); await page.keyboard.up("x"); R.reversal = await pRev;
  // 3. transport independence: pause the scene, then arm X
  const pause = page.getByRole("button", { name: "Pause animation" }).first();
  R.pauseBtn = await pause.count();
  if (R.pauseBtn) { await pause.click(); await page.mouse.move(5, 890); await page.waitForTimeout(300); }
  R.afterPauseAnims = await page.evaluate(() => document.getAnimations().length);
  const pP = sampler(page, "x", 350); await page.waitForTimeout(30); await page.keyboard.down("x"); R.whilePausedIn = await pP;
  await page.screenshot({ path: `${OUT}/paused-x-held.png` });
  // 4. blur while held -> OD-5 release
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await page.waitForTimeout(350); R.afterBlur = await act(page);
  await page.keyboard.up("x"); await page.waitForTimeout(300);
  // 5. typing x in a field must not latch
  const inp = page.locator("input").first(); R.inputs = await inp.count();
  if (R.inputs) { await inp.click(); await page.keyboard.down("x"); await page.waitForTimeout(250); R.inInput = await act(page); await page.keyboard.up("x"); await page.keyboard.press("Backspace"); }
  await ctx.close();
}
{ // 6. PRM
  const { ctx, page } = await fresh({ reducedMotion: "reduce" });
  R.prm = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const p = sampler(page, "z", 300); await page.waitForTimeout(30); await page.keyboard.down("z"); R.prmIn = await p;
  R.prmTransition = await page.evaluate(() => { const cs = getComputedStyle(document.querySelector(".axis-line.z")); return [cs.transitionDuration, cs.transitionProperty]; });
  await page.keyboard.up("z"); await ctx.close();
}
R.stamp1 = stamp();
fs.writeFileSync(`${OUT}/probes-log.json`, JSON.stringify(R));
await browser.close();
const sh = (a) => a.filter((_, i) => i % 2 === 0).map((s) => `${s[0]}:${s[1]}${s[2]}${s[3]}`).join(" ");
console.log(JSON.stringify({ s0: R.stamp0, s1: R.stamp1, shiftDrag: R.shiftDrag, singleAxisDrag: R.singleAxisDrag, pauseBtn: R.pauseBtn, afterPauseAnims: R.afterPauseAnims, afterBlur: R.afterBlur, inputs: R.inputs, inInput: R.inInput, prm: R.prm, prmTransition: R.prmTransition }));
console.log("liveIn", sh(R.liveIn)); console.log("liveOut", sh(R.liveOut)); console.log("reversal", sh(R.reversal)); console.log("pausedIn", sh(R.whilePausedIn)); console.log("prmIn", sh(R.prmIn));
