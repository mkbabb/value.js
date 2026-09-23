// pass 4: swirl wiring under the library clock — identical time sequences with vs without cursor.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/home-hero-aurora";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const kf = () => `${execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim()} dirty=${execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim()}`;
const R = { kfBefore: kf() };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/", { waitUntil: "load" }); await p.waitForSelector(".hero-aurora canvas"); await p.waitForTimeout(5000);
R.res = await p.evaluate(async () => {
  const a = document.querySelector(".hero-aurora").__vueParentComponent.exposed; const cv = document.querySelector(".hero-aurora canvas");
  const L = (u) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = u; });
  const px = async (u) => { const i = await L(u); const c = new OffscreenCanvas(144, 90); const x = c.getContext("2d"); x.drawImage(i, 0, 0, 144, 90); return x.getImageData(0, 0, 144, 90).data; };
  const d = (A, B) => { let s = 0, m = 0; for (let k = 0; k < A.length; k += 4) { const v = (Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2])) / 3; s += v; m = Math.max(m, v); } return { mean: +(s / (A.length / 4)).toFixed(3), max: +m.toFixed(1) }; };
  a.pause(); a.clearCursor();
  const seq = async (cursor) => { const out = []; for (let k = 0; k < 60; k++) { if (cursor) a.setCursor(0.35 + k * 0.005, 0.45 + Math.sin(k / 6) * 0.05); a.renderAt(10 + k / 60); if (k % 15 === 14) out.push(cv.toDataURL()); } return out; };
  for (let k = 0; k < 30; k++) a.renderAt(1 + k / 60); // let any engagement decay
  const A = await seq(false); a.clearCursor(); for (let k = 0; k < 30; k++) a.renderAt(3 + k / 60);
  const B = await seq(true);
  const r = []; for (let i = 0; i < A.length; i++) r.push(d(await px(A[i]), await px(B[i])));
  window.__cursorFrame = B[B.length - 1]; window.__baseFrame = A[A.length - 1];
  return r;
});
const [cf, bf] = await p.evaluate(() => [window.__cursorFrame, window.__baseFrame]);
fs.writeFileSync(`${OUT}/stepped/swirl-with-cursor.png`, Buffer.from(cf.split(",")[1], "base64"));
fs.writeFileSync(`${OUT}/stepped/swirl-no-cursor.png`, Buffer.from(bf.split(",")[1], "base64"));
R.kfAfter = kf(); fs.writeFileSync(`${OUT}/results4.json`, JSON.stringify(R, null, 1)); await browser.close(); console.log(JSON.stringify(R));
