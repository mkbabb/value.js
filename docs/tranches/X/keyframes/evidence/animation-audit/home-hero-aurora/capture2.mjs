// pass 2: fresh-load arm crossfade (amplified), clean rAF/LoAF sample, cursor swirl wiring, transport, dark leg.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/home-hero-aurora";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const kf = () => ({ head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(), at: new Date().toISOString() });
const R = { kfBefore: kf() };
fs.mkdirSync(`${OUT}/arm`, { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const logs = []; page.on("console", (m) => logs.push({ t: Date.now(), s: `${m.type()}: ${m.text()}`.slice(0, 200) }));
// amplified arm run: aurora at opacity 1 on top so the placeholder->canvas handoff is legible
await page.addInitScript(() => { const s = document.createElement("style"); s.id = "__amp"; s.textContent = ".hero-aurora{opacity:1!important;z-index:9999!important}"; document.addEventListener("DOMContentLoaded", () => document.head.appendChild(s)); });
const cdp = await ctx.newCDPSession(page); const fr = [];
cdp.on("Page.screencastFrame", async (f) => { fr.push({ ts: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
await cdp.send("Page.enable"); await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 720, maxHeight: 450 });
await page.goto("http://localhost:5173/", { waitUntil: "commit" });
await page.waitForTimeout(6000); await cdp.send("Page.stopScreencast");
fr.forEach((f, i) => fs.writeFileSync(`${OUT}/arm/m${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
R.armFrames = fr.length; R.armTs = fr.map((f) => +(f.ts - fr[0].ts).toFixed(3));
// second, served (un-amplified) fresh page for the clean sample
const p = await ctx.newPage(); const plogs = []; p.on("console", (m) => plogs.push(`${m.type()}: ${m.text()}`.slice(0, 160)));
await page.close();
await p.goto("http://localhost:5173/", { waitUntil: "load" }); await p.waitForSelector(".hero-aurora canvas"); await p.waitForTimeout(6000);
const sample = () => p.evaluate(() => new Promise((res) => { const d = []; let last = performance.now(); const t0 = last; const f = (t) => { d.push(t - last); last = t; if (t - t0 < 3000) requestAnimationFrame(f); else { const dr = d.filter((x) => x > 20); res({ n: d.length, mean: +(d.reduce((a, b) => a + b, 0) / d.length).toFixed(2), max: +Math.max(...d).toFixed(1), drops: dr.length, dropVals: dr.map((x) => +x.toFixed(0)) }); } }; requestAnimationFrame(f); }));
const mark = plogs.length; R.rafRunning = await sample(); R.loafRunning = plogs.slice(mark).filter((s) => s.includes("loaf"));
await p.evaluate(() => document.querySelector(".hero-aurora").__vueParentComponent.exposed.pause());
const mark2 = plogs.length; R.rafAuroraPaused = await sample(); R.loafPaused = plogs.slice(mark2).filter((s) => s.includes("loaf"));
// cursor swirl wiring: real pointer moves -> setCursor; compare fixed-t renders with/without cursor
R.swirl = await (async () => {
  await p.mouse.move(5, 5);
  const g = (t) => p.evaluate((t) => { const a = document.querySelector(".hero-aurora").__vueParentComponent.exposed; a.renderAt(t); return document.querySelector(".hero-aurora canvas").toDataURL(); }, t);
  await p.evaluate(() => document.querySelector(".hero-aurora").__vueParentComponent.exposed.clearCursor());
  const a = await g(10);
  await p.mouse.move(720, 450, { steps: 8 }); await p.waitForTimeout(400);
  const b = await g(10);
  await p.waitForTimeout(800); const c = await g(10);
  return p.evaluate(async ([a, b, c]) => {
    const load = (u) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = u; });
    const px = async (u) => { const i = await load(u); const cv = new OffscreenCanvas(144, 90); const x = cv.getContext("2d"); x.drawImage(i, 0, 0, 144, 90); return x.getImageData(0, 0, 144, 90).data; };
    const [A, B, C] = await Promise.all([px(a), px(b), px(c)]);
    const d = (P, Q) => { let s = 0, m = 0; for (let k = 0; k < P.length; k += 4) { const v = (Math.abs(P[k] - Q[k]) + Math.abs(P[k + 1] - Q[k + 1]) + Math.abs(P[k + 2] - Q[k + 2])) / 3; s += v; m = Math.max(m, v); } return { mean: +(s / (P.length / 4)).toFixed(3), max: +m.toFixed(1) }; };
    return { noCursorVsCursor: d(A, B), cursorSettled: d(B, C) };
  }, [a, b, c]);
})();
await p.evaluate(() => document.querySelector(".hero-aurora").__vueParentComponent.exposed.resume());
// transport: press Play; does aurora clock/state change? (ambient layer — expected independent)
const t0 = await p.evaluate(() => document.querySelector(".hero-aurora")?.isConnected);
const play = p.getByRole("button", { name: "Play animation" }).first();
R.playVisible = await play.isVisible().catch(() => false);
if (R.playVisible) { await play.click().catch((e) => (R.playErr = String(e).slice(0, 200))); await p.waitForTimeout(1500); }
R.afterPlay = await p.evaluate(() => ({ url: location.href, auroraMounted: !!document.querySelector(".hero-aurora"), armed: document.querySelector(".hero-aurora")?.__vueParentComponent?.exposed?.isArmed?.value }));
await p.screenshot({ path: `${OUT}/served/after-play.png` });
// dark leg
await p.goto("http://localhost:5173/", { waitUntil: "load" }); await p.waitForTimeout(3000);
const dk = p.getByRole("button", { name: "Switch to dark mode" }).first();
if (await dk.isVisible().catch(() => false)) { await dk.click(); await p.waitForTimeout(2500); await p.screenshot({ path: `${OUT}/served/dark-rest.png` });
  R.dark = await p.evaluate(() => { const r = document.querySelector(".hero-aurora"); return { mounted: !!r, opacity: r && getComputedStyle(r).opacity, html: document.documentElement.className.slice(0, 80) }; });
  await p.addStyleTag({ content: ".hero-aurora{opacity:1!important;z-index:9999!important}" }); await p.screenshot({ path: `${OUT}/amplified/dark-amplified.png` });
  const back = p.getByRole("button", { name: /Switch to light mode/ }).first(); if (await back.isVisible().catch(() => false)) await back.click(); }
R.kfAfter = kf();
fs.writeFileSync(`${OUT}/results2.json`, JSON.stringify(R, null, 1));
await browser.close(); console.log(JSON.stringify({ ...R, armTs: R.armTs.slice(0, 40) }).slice(0, 3000));
