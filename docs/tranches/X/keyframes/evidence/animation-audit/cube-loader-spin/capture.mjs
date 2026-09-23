// Pass 2 (cold-load mutation ledger) + Pass 3 (loader forced live by a same-page StorageEvent that
// clears cube.selectedAnimation — a runtime state poke, no source edit) → WAAPI frame-step + live screencast.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const dir = OUT + "frames/"; fs.mkdirSync(dir, { recursive: true });
const live = OUT + "live/"; fs.mkdirSync(live, { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const gpu = [];
page.on("console", (m) => { if (/WebGL|GPU|SwiftShader/i.test(m.text())) gpu.push(m.text()); });
await page.addInitScript(() => {
  const L = (window.__mut = []); let paints = 0;
  new MutationObserver((recs) => {
    for (const r of recs) {
      for (const n of r.addedNodes) if (n.nodeType === 1 && (n.matches?.("svg.animate-spin") || n.querySelector?.("svg.animate-spin"))) L.push({ t: +performance.now().toFixed(1), ev: "added", paintsSoFar: paints, connectedNow: !!document.querySelector("svg.animate-spin") });
      for (const n of r.removedNodes) if (n.nodeType === 1 && (n.matches?.("svg.animate-spin") || n.querySelector?.("svg.animate-spin"))) L.push({ t: +performance.now().toFixed(1), ev: "removed", paintsSoFar: paints });
    }
  }).observe(document, { subtree: true, childList: true });
  window.__loaderPaintedFrames = 0;
  const raf = () => { paints++; if (document.querySelector("svg.animate-spin")) window.__loaderPaintedFrames++; requestAnimationFrame(raf); }; requestAnimationFrame(raf);
});
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForSelector(".cube", { timeout: 30000 });
await page.waitForTimeout(2500);
const cold = await page.evaluate(() => ({ mut: window.__mut, loaderPaintedFrames: window.__loaderPaintedFrames, sel: JSON.parse(localStorage.getItem("animation-groups-control-options-store")).cube?.selectedAnimation,
  renderer: (() => { const c = document.createElement("canvas").getContext("webgl"); const e = c && c.getExtension("WEBGL_debug_renderer_info"); return e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : "n/a"; })() }));
await page.screenshot({ path: OUT + "cold-rest.png" });
const res0 = {};
// Force showLoader: clear the IN-MEMORY cube storedControls.selectedAnimation (the reactive
// object CubeScene holds; localStorage is out of sync with it, see inspect.mjs) — runtime poke only.
res0.forcedVia = await page.evaluate(() => { let sc = document.querySelector(".cube").__vueParentComponent; while (sc && sc.type.__name !== "CubeScene") sc = sc.parent; const m = sc.setupState.storedControls; const was = m.selectedAnimation; m.selectedAnimation = ""; return was; });
let forced = true;
try { await page.waitForSelector("svg.animate-spin", { timeout: 4000 }); } catch { forced = false; }
const res = { cold, forced, gpu, ...res0 };
if (forced) {
  await page.waitForTimeout(600);
  res.state = await page.evaluate(() => {
    const el = document.querySelector("svg.animate-spin"); const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    const chain = []; let n = el; for (let i = 0; i < 9 && n; i++, n = n.parentElement) { const c = getComputedStyle(n); chain.push({ tag: n.tagName, cls: (n.getAttribute("class") || "").slice(0, 60), transform: c.transform.slice(0, 80), ts: c.transformStyle, filter: c.filter, opacity: c.opacity, z: c.zIndex, blend: c.mixBlendMode, anim: c.animationName, pos: c.position, disp: c.display }); }
    const cube = document.querySelector(".cube").getBoundingClientRect();
    return { rect: [r.x, r.y, r.width, r.height].map(Math.round), cubeRect: [cube.x, cube.y, cube.width, cube.height].map(Math.round), color: cs.color, stroke: cs.stroke,
      anims: el.getAnimations().map(a => ({ name: a.animationName, ps: a.playState, ct: a.currentTime, dur: a.effect.getTiming().duration, easing: a.effect.getTiming().easing, iters: a.effect.getTiming().iterations, kf: a.effect.getKeyframes().map(k => k.transform + "@" + k.offset) })),
      allAnims: document.getAnimations().length, chain, sel: document.querySelector("svg.animate-spin")?.closest(".cube") ? "inside .cube" : "outside" };
  });
  // Live: rAF deltas over 3s + angle samples of the svg
  res.liveSample = await page.evaluate(() => new Promise((ok) => {
    const el = document.querySelector("svg.animate-spin"); const d = []; const ang = []; let last = performance.now(); const t0 = last;
    const f = (t) => { d.push(t - last); last = t; const m = getComputedStyle(el).transform; if (m.startsWith("matrix(")) { const [a, b] = m.slice(7, -1).split(",").map(Number); ang.push([+(t - t0).toFixed(0), +(Math.atan2(b, a) * 180 / Math.PI).toFixed(1)]); } if (t - t0 < 3000) requestAnimationFrame(f); else ok({ frames: d.length, dropped: d.filter(x => x > 20).length, maxDelta: +Math.max(...d).toFixed(1), angSample: ang.filter((_, i) => i % 15 === 0) }); };
    requestAnimationFrame(f);
  }));
  // Live screencast ≥2 iterations (1s each)
  const cdp = await ctx.newCDPSession(page); const lf = [];
  cdp.on("Page.screencastFrame", async (f) => { lf.push({ ts: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 }); await page.waitForTimeout(2600); await cdp.send("Page.stopScreencast");
  lf.forEach((f, i) => fs.writeFileSync(live + `l${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
  res.liveFrames = lf.length; res.liveTs = lf.map(f => +(f.ts - lf[0].ts).toFixed(3));
  // Transport: click Pause, check whether the spin continues
  res.transport = await page.evaluate(async () => {
    const el = document.querySelector("svg.animate-spin"); const a = el.getAnimations()[0];
    const btn = [...document.querySelectorAll("button")].find(b => /^\s*(Pause|Play)\b/i.test(b.textContent)); const label = btn?.textContent.trim();
    const t1 = a.currentTime; btn?.click(); await new Promise(r => setTimeout(r, 500)); const t2 = a.currentTime;
    const label2 = btn?.textContent.trim(); btn?.click(); await new Promise(r => setTimeout(r, 100));
    return { btn: label, afterClick: label2, spinAdvancedMs: +(t2 - t1).toFixed(0), spinPS: a.playState };
  });
  // WAAPI frame-step: pause the spin animation, 48 steps over one iteration, clip to the loader box
  const box = res.state.rect; const clip = { x: Math.max(0, box[0] - 20), y: Math.max(0, box[1] - 20), width: box[2] + 40, height: box[3] + 40 };
  res.clip = clip;
  await page.evaluate(() => { for (const a of document.querySelector("svg.animate-spin").getAnimations()) a.pause(); });
  res.stepped = [];
  for (let i = 0; i < 48; i++) {
    const ct = (i * 1000) / 48;
    const tr = await page.evaluate((ct) => { const el = document.querySelector("svg.animate-spin"); for (const a of el.getAnimations()) a.currentTime = ct; return getComputedStyle(el).transform; }, ct);
    await page.waitForTimeout(40);
    await page.screenshot({ path: dir + `s${String(i).padStart(2, "0")}.png`, clip });
    const m = tr.startsWith("matrix(") ? tr.slice(7, -1).split(",").map(Number) : null;
    res.stepped.push([i, +ct.toFixed(1), m ? +(Math.atan2(m[1], m[0]) * 180 / Math.PI).toFixed(1) : tr]);
  }
  await page.screenshot({ path: OUT + "forced-rest-fullpage.png" });
}
fs.writeFileSync(OUT + "capture.json", JSON.stringify(res, null, 1));
console.log(JSON.stringify({ ...res, liveTs: res.liveTs?.length }, null, 0).slice(0, 6000));
await browser.close();
