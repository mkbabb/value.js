// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.matrix · critic gap (KF-W13V record :322): the matrix-editor cell and reset tweens, frame by frame.
// Four legs at 1440x900: a cell edit and a Reset, while the channel PLAYS and while it is PAUSED. Each leg: a CDP screencast
// (every compositor frame, jpeg) + a per-rAF trace of the `.cube-pose` transform and the edited cell's text.
// Usage: BASE=http://localhost:5196 RUN=before-r1 THEME=light node tweens.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run"; const THEME = process.env.THEME || "light";
const FR = `${OUT}frames/tweens-${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5196";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: THEME });
await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__m")) { localStorage.clear(); sessionStorage.setItem("__m", "1"); } localStorage.setItem("vueuse-color-scheme", t); } catch {} }, THEME);
const p = await ctx.newPage();
await p.goto(`${BASE}/#/cube`); await p.waitForSelector(".cube-pose", { timeout: 20000 }); await sleep(3000);
await p.locator('[aria-label="Select animation"]:visible').first().click(); await sleep(700);
await p.getByRole("option", { name: /^Matrix/ }).first().click(); await sleep(1200);
await p.evaluate(() => [...document.querySelectorAll('[data-dock-surface-item][aria-label="Matrix Controls"]')].find((e) => e.getBoundingClientRect().width > 0)?.click()); await sleep(1800);
const cdp = await ctx.newCDPSession(p);
let shots = [], leg = "";
cdp.on("Page.screencastFrame", async (f) => { shots.push({ leg, t: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
const trace = (ms) => p.evaluate((ms) => new Promise((res) => {
  const g = [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0);
  const cell = g.children[0].querySelector("input"); const out = []; const t0 = performance.now();
  const f = () => { const e = document.querySelector(".cube-pose"); const tf = getComputedStyle(e).transform; out.push([Math.round(performance.now() - t0), tf, cell.value, tf === "none" ? 1 : new DOMMatrix(tf).m11]); if (performance.now() - t0 < ms) requestAnimationFrame(f); else res(out); };
  requestAnimationFrame(f); }), ms);
const runLeg = async (name, act) => {
  leg = name; await cdp.send("Page.startScreencast", { format: "jpeg", quality: 55, maxWidth: 960, everyNthFrame: 1 });
  const tp = trace(1400); await sleep(60); await act(); const tr = await tp;
  await cdp.send("Page.stopScreencast"); await sleep(150);
  const legShots = shots.filter((s) => s.leg === name); const t0 = legShots[0]?.t ?? 0;
  legShots.forEach((s, i) => fs.writeFileSync(`${FR}${name}-${String(i).padStart(3, "0")}-${Math.round((s.t - t0) * 1000)}ms.jpg`, Buffer.from(s.data, "base64")));
  const poses = tr.map((r) => r[1]); const distinct = new Set(poses).size;
  const cellSeries = [...new Set(tr.map((r) => r[2]))];
  // largest per-frame change of the pose's m11 (the Sx diagonal) and of its translation, as a smoothness read
  const m = tr.map((r) => r[3]);
  let dA = 0; for (let i = 1; i < m.length; i++) dA = Math.max(dA, Math.abs(m[i] - m[i - 1]));
  const lastChange = tr.reduce((acc, r, i) => (i && r[1] !== tr[i - 1][1] ? r[0] : acc), 0);
  return { leg: name, frames: legShots.length, rafSamples: tr.length, distinctPoses: distinct, maxStepM11: +dA.toFixed(4), lastPoseChangeMs: lastChange, cellSeries: cellSeries.slice(0, 12).join(" → "), endM11: +m[m.length - 1].toFixed(4) };
};
const cellInput = () => p.evaluate(() => [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0).children[0].querySelector("input"));
const editCell = async (v) => { await p.evaluate((v) => { const i = [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0).children[0].querySelector("input"); i.focus(); i.value = v; i.dispatchEvent(new Event("input", { bubbles: true })); }, v); await sleep(20); await p.evaluate(() => document.activeElement?.blur?.()); };
const reset = () => p.evaluate(() => [...document.querySelectorAll("button")].find((e) => e.getBoundingClientRect().width > 0 && /Reset/.test(e.textContent) && !/Reset animation/.test(e.getAttribute("aria-label") || ""))?.click());
const res = [];
res.push(await runLeg("cell-playing", () => editCell("1.5")));
res.push(await runLeg("reset-playing", reset));
const pauseBtns = await p.evaluate(() => [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0 && /^(Pause|Play)/i.test((e.getAttribute("aria-label") || e.textContent).trim())).map((e) => (e.getAttribute("aria-label") || e.textContent).trim()));
await p.locator("button[aria-label='Pause animation']:visible").first().click({ timeout: 4000 }); await sleep(900);
const still = await p.evaluate(() => new Promise((r) => { const s = new Set(); const t0 = performance.now(); const f = () => { s.add(getComputedStyle(document.querySelector(".cube-pose")).transform); if (performance.now() - t0 < 400) requestAnimationFrame(f); else r(s.size); }; requestAnimationFrame(f); }));
console.log("pause controls before:", JSON.stringify(pauseBtns), "pose distinct over 400ms after Pause:", still);
res.push(await runLeg("cell-paused", () => editCell("1.5")));
console.log("after cell-paused, transport (must read Play):", JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0 && /^(Pause|Play)/i.test((e.getAttribute("aria-label") || e.textContent).trim())).map((e) => (e.getAttribute("aria-label") || e.textContent).trim()))));
res.push(await runLeg("reset-paused", reset));
await b.close();
fs.writeFileSync(`${OUT}tweens-${RUN}.json`, JSON.stringify(res, null, 1));
for (const r of res) console.log(JSON.stringify(r));
