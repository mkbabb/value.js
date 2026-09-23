// pass 3: cursor-swirl wiring (live integration), resolved config, dark leg.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/home-hero-aurora";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const kf = () => ({ head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim() });
const R = { kfBefore: kf() };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/", { waitUntil: "load" }); await p.waitForSelector(".hero-aurora canvas"); await p.waitForTimeout(5000);
R.cfg = await p.evaluate(() => { const i = document.querySelector(".hero-aurora").__vueParentComponent; const c = i.props.config; return { interactivity: JSON.parse(JSON.stringify(c.interactivity ?? null)), medium: c.medium, drift: c.drift ?? c.warpDrift, keys: Object.keys(c).slice(0, 60), alpha: c.alpha }; });
const grab = (t) => p.evaluate((t) => { const a = document.querySelector(".hero-aurora").__vueParentComponent.exposed; a.pause(); a.renderAt(t); const u = document.querySelector(".hero-aurora canvas").toDataURL(); return u; }, t);
const diff = (a, b) => p.evaluate(async ([a, b]) => { const L = (u) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = u; }); const px = async (u) => { const i = await L(u); const c = new OffscreenCanvas(144, 90); const x = c.getContext("2d"); x.drawImage(i, 0, 0, 144, 90); return x.getImageData(0, 0, 144, 90).data; }; const [A, B] = await Promise.all([px(a), px(b)]); let s = 0, m = 0; for (let k = 0; k < A.length; k += 4) { const v = (Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2])) / 3; s += v; m = Math.max(m, v); } return { mean: +(s / (A.length / 4)).toFixed(3), max: +m.toFixed(1) }; }, [a, b]);
const live = () => p.evaluate(() => document.querySelector(".hero-aurora").__vueParentComponent.exposed.resume());
const base = await grab(10); await live();
// real pointer sweep across the viewport for 2 s while the loop runs
for (let k = 0; k < 40; k++) { await p.mouse.move(300 + k * 20, 300 + (k % 10) * 20); await p.waitForTimeout(50); }
const withCursor = await grab(10); fs.writeFileSync(`${OUT}/stepped/cursor-t10.png`, Buffer.from(withCursor.split(",")[1], "base64")); fs.writeFileSync(`${OUT}/stepped/nocursor-t10.png`, Buffer.from(base.split(",")[1], "base64"));
R.swirlReal = await diff(base, withCursor);
// direct API call (bypasses the consumer listener)
await live(); for (let k = 0; k < 30; k++) { await p.evaluate((k) => document.querySelector(".hero-aurora").__vueParentComponent.exposed.setCursor(0.3 + k * 0.01, 0.4), k); await p.waitForTimeout(33); }
const withApi = await grab(10); R.swirlApi = await diff(base, withApi);
R.listenerProbe = await p.evaluate(() => new Promise((res) => { let n = 0; window.addEventListener("pointermove", (e) => { n++; res({ type: e.pointerType, n }); }, { once: true }); setTimeout(() => res({ n }), 1500); }));
await p.mouse.move(700, 400); await p.mouse.move(710, 410);
R.kfAfter = kf();
fs.writeFileSync(`${OUT}/results3.json`, JSON.stringify(R, null, 1)); await browser.close(); console.log(JSON.stringify(R).slice(0, 2500));
