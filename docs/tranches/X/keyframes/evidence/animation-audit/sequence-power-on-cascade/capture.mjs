// sequence-power-on-cascade — headed Chromium, real GPU, served page.
// Pass A: real-time CDP screencast of the natural boot (cube -> #/sequence) + in-page rAF/class/animation log.
// Pass B: seeked frames — the 780ms class-removal timer is stretched, stage animations paused and stepped via currentTime.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const meta = { khead, kdirty, at: new Date().toISOString() };
const mode = process.argv[2] || "all";

const LOGGER = `
window.__log = { cls: [], raf: [] };
(function(){
  let last = performance.now();
  const tick = (t) => {
    const st = document.querySelector('.seq-stage');
    const e = { t, d: t - last };
    last = t;
    if (st) {
      e.on = st.classList.contains('is-powering-on');
      const ax = st.querySelector('.seq-axis'), pt = st.querySelector('.seq-playhead-track');
      const rows = [...st.querySelectorAll('.seq-row')];
      const cs = (el) => { if(!el) return null; const c = getComputedStyle(el); return [c.opacity, c.transform, c.clipPath]; };
      e.ax = cs(ax); e.pt = cs(pt); e.rows = rows.map(r => { const c = getComputedStyle(r); return [c.opacity, c.transform]; });
      e.anims = st.getAnimations({subtree:true}).filter(a=>a.animationName && a.animationName.startsWith('seq-')).map(a => [a.animationName, Math.round(a.currentTime ?? -1), a.playState]);
      e.docVT = document.getAnimations().filter(a => a.effect?.pseudoElement?.includes('view-transition')).length;
    }
    window.__log.raf.push(e);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  new MutationObserver((ms) => {
    for (const m of ms) if (m.type==='attributes' && m.target.classList?.contains('seq-stage')) window.__log.cls.push([performance.now(), m.target.className]);
      else if (m.type==='childList') for (const n of m.addedNodes) if (n.nodeType===1 && (n.matches?.('.seq-stage')||n.querySelector?.('.seq-stage'))) { const s = n.matches('.seq-stage')?n:n.querySelector('.seq-stage'); window.__log.cls.push([performance.now(), 'INSERTED '+s.className]); }
  }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['class'], childList: true });
})();`;

async function newPage(browser, stretch) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  if (stretch) await page.addInitScript(() => {
    const o = window.setTimeout;
    window.setTimeout = function (fn, ms, ...a) { if (ms === 780) { window.__stretched = (window.__stretched||0)+1; ms = 1e8; } return o.call(this, fn, ms, ...a); };
  });
  return { ctx, page };
}

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

if (mode === "all" || mode === "A") {
  const dir = path.join(OUT, "A-screencast"); fs.mkdirSync(dir, { recursive: true });
  const { ctx, page } = await newPage(browser, false);
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
  await page.waitForTimeout(3500);
  meta.gpu = await page.evaluate(() => { const c = document.createElement('canvas').getContext('webgl'); const e = c?.getExtension('WEBGL_debug_renderer_info'); return e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'n/a'; });
  await page.evaluate(LOGGER);
  const cdp = await ctx.newCDPSession(page);
  const frames = [];
  cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(()=>{}); });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
  await page.waitForTimeout(300);
  const navT = await page.evaluate(() => { const t = performance.now(); location.hash = '#/sequence'; return t; });
  const navWall = Date.now() / 1000;
  await page.waitForTimeout(2600);
  // second visit: away and back — does the boot fire again?
  await page.evaluate(() => { location.hash = '#/cube'; });
  await page.waitForTimeout(1500);
  const nav2T = await page.evaluate(() => { const t = performance.now(); location.hash = '#/sequence'; return t; });
  await page.waitForTimeout(1500);
  await cdp.send("Page.stopScreencast");
  const log = await page.evaluate(() => window.__log);
  frames.forEach((f, i) => fs.writeFileSync(path.join(dir, `f${String(i).padStart(3, "0")}.png`), Buffer.from(f.data, "base64")));
  fs.writeFileSync(path.join(dir, "frames.json"), JSON.stringify({ navWall, frames: frames.map((f, i) => ({ i, ts: f.ts, rel: +(f.ts - navWall).toFixed(3) })) }, null, 1));
  fs.writeFileSync(path.join(dir, "inpage-log.json"), JSON.stringify({ navT, nav2T, ...log }));
  const stage = await page.evaluate(() => { const r = document.querySelector('.seq-stage')?.getBoundingClientRect(); return r && { x: r.x, y: r.y, w: r.width, h: r.height }; });
  meta.stageRect = stage;
  meta.A = { frames: frames.length, navT, nav2T };
  await ctx.close();
}

if (mode === "all" || mode === "B") {
  const dir = path.join(OUT, "B-seeked"); fs.mkdirSync(dir, { recursive: true });
  const { ctx, page } = await newPage(browser, true);
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    window.__paused = null;
    const mo = new MutationObserver(() => {
      const st = document.querySelector('.seq-stage.is-powering-on');
      if (st && !window.__paused) {
        const as = st.getAnimations({ subtree: true }).filter(a => a.animationName?.startsWith('seq-'));
        as.forEach(a => a.pause());
        window.__paused = as.map(a => a.animationName);
      }
    });
    mo.observe(document.documentElement, { subtree: true, attributes: true, childList: true });
    location.hash = '#/sequence';
  });
  await page.waitForFunction(() => window.__paused, null, { timeout: 5000 });
  await page.waitForTimeout(2000); // let the VT cross-fade + scene settle; stage anims stay paused
  const info = await page.evaluate(() => {
    const st = document.querySelector('.seq-stage');
    const as = st.getAnimations({ subtree: true }).filter(a => a.animationName?.startsWith('seq-'));
    return { stretched: window.__stretched, paused: window.__paused, anims: as.map(a => ({ n: a.animationName, el: a.effect.target.className, delay: a.effect.getTiming().delay, dur: a.effect.getTiming().duration, fill: a.effect.getTiming().fill, easing: a.effect.getTiming().easing, ct: a.currentTime, ps: a.playState })), cls: st.className };
  });
  const r = await page.evaluate(() => { const r = document.querySelector('.seq-stage').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const clip = { x: Math.max(0, Math.floor(r.x) - 8), y: Math.max(0, Math.floor(r.y) - 8), width: Math.ceil(r.width) + 16, height: Math.ceil(r.height) + 16 };
  const N = 48, T = 800;
  const samples = [];
  for (let i = 0; i < N; i++) {
    const t = Math.round((i * T) / (N - 1));
    const s = await page.evaluate((t) => {
      const st = document.querySelector('.seq-stage');
      st.getAnimations({ subtree: true }).filter(a => a.animationName?.startsWith('seq-')).forEach(a => { a.currentTime = t; });
      const g = (el) => { const c = getComputedStyle(el); return [c.opacity, c.transform, c.clipPath, c.zIndex]; };
      return { t, ax: g(st.querySelector('.seq-axis')), pt: g(st.querySelector('.seq-playhead-track')), rows: [...st.querySelectorAll('.seq-row')].map(r => { const c = getComputedStyle(r); return [c.opacity, c.transform, Math.round(r.getBoundingClientRect().y*100)/100]; }) };
    }, t);
    await page.waitForTimeout(60);
    await page.screenshot({ path: path.join(dir, `s${String(i).padStart(2, "0")}_t${String(t).padStart(3, "0")}.png`), clip });
    samples.push(s);
  }
  // rest state: remove the class the way the timer would
  await page.evaluate(() => { const st = document.querySelector('.seq-stage'); st.getAnimations({subtree:true}).filter(a=>a.animationName?.startsWith('seq-')).forEach(a=>{a.currentTime=800;}); });
  await page.waitForTimeout(60);
  await page.screenshot({ path: path.join(dir, `end_paused800.png`), clip });
  await page.evaluate(() => document.querySelector('.seq-stage').classList.remove('is-powering-on'));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(dir, `rest_classRemoved.png`), clip });
  fs.writeFileSync(path.join(dir, "samples.json"), JSON.stringify({ info, clip, samples }, null, 1));
  meta.B = { info, clip };
  await ctx.close();
}
fs.writeFileSync(path.join(OUT, `meta-${mode}.json`), JSON.stringify(meta, null, 1));
await browser.close();
console.log(JSON.stringify(meta).slice(0, 3000));
