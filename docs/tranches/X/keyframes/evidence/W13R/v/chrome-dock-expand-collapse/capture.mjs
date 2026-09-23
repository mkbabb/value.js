// chrome-dock-expand-collapse — frame-by-frame capture (method 3: CDP screencast + per-rAF state log,
// plus a synthetic seek of the CSS projection of --dock-morph-t, 48 steps per direction).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const provenance = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() };
fs.mkdirSync(OUT + "rt", { recursive: true }); fs.mkdirSync(OUT + "seek", { recursive: true });
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.mouse.move(720, 600);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4500);
provenance.renderer = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); });
provenance.hash = await page.evaluate(() => location.hash);
// ---- per-rAF logger
await page.evaluate(() => {
  const dock = document.querySelector('[data-dock-tether="top"] .glass-dock');
  const full = dock.querySelector(".dock-layer--full"), sum = dock.querySelector(".dock-layer--summary"), layers = dock.querySelector(".dock-layers");
  window.__log = []; window.__mark = (m) => window.__log.push({ mark: m, t: performance.now() });
  let last = performance.now();
  const tick = (now) => {
    const cs = getComputedStyle(dock), r = dock.getBoundingClientRect();
    const kids = [...full.children].map((k) => { const s = getComputedStyle(k); const b = k.getBoundingClientRect(); return [ +(+s.opacity).toFixed(3), s.scale, Math.round(b.x * 10) / 10, Math.round(b.width * 10) / 10, s.display === "none" ? "none" : "" ]; });
    const sc = getComputedStyle(sum), fc = getComputedStyle(full), lc = getComputedStyle(layers);
    const anims = document.getAnimations().filter((a) => a.effect?.target && dock.contains(a.effect.target)).map((a) => `${a.constructor.name}:${a.transitionProperty || a.animationName || ""}:${a.playState}`);
    window.__log.push({ t: now, dt: +(now - last).toFixed(1), cls: dock.className.replace(/glass-dock horizontal shape-pill layout-linear |fit-content dock-overflow-wrap dock-inline/g, "").trim(),
      morph: dock.hasAttribute("data-morphing"), mt: dock.style.getPropertyValue("--dock-morph-t"), cpx: dock.style.getPropertyValue("--dock-collapsed-px"), epx: dock.style.getPropertyValue("--dock-expanded-px"),
      x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), scale: cs.scale, filter: cs.filter, radius: cs.borderRadius, layersScale: lc.scale,
      full: [fc.opacity, fc.visibility, full.className.replace("dock-layer dock-layer--full", "").trim()], sum: [sc.opacity, sc.visibility, sum.className.replace("dock-layer dock-layer--summary", "").trim()], kids, anims });
    last = now; requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
// ---- screencast
const cdp = await page.context().newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
const box = await page.locator('[data-dock-tether="top"] .glass-dock').boundingBox();
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
const markers = [];
const mark = async (m) => { const wall = Date.now() / 1000; markers.push({ m, wall }); await page.evaluate((m) => window.__mark(m), m); };
for (const cycle of [1, 2]) {
  await page.waitForTimeout(600);
  await mark(`hover-in-${cycle}`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
  await page.waitForTimeout(2200);
  await mark(`hover-out-${cycle}`);
  await page.mouse.move(720, 600, { steps: 4 });
  await page.waitForTimeout(4200);
}
await cdp.send("Page.stopScreencast");
const log = await page.evaluate(() => window.__log);
fs.writeFileSync(OUT + "rt-log.json", JSON.stringify({ provenance, markers, log }, null, 0));
frames.forEach((f, i) => fs.writeFileSync(`${OUT}rt/f${String(i).padStart(4, "0")}.png`, Buffer.from(f.data, "base64")));
fs.writeFileSync(OUT + "rt-frames.json", JSON.stringify(frames.map((f, i) => ({ i, ts: f.ts }))));
// ---- synthetic seek (the CSS projection of the spring scalar), 48 steps per direction
const clip = { x: 240, y: 20, width: 960, height: 130 };
const N = 48;
// expand direction: dock expanded + hovered; re-arm data-morphing with summary leaving
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
await page.waitForTimeout(1800);
const seekMeta = { expand: [], collapse: [] };
async function seek(dir) {
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const st = await page.evaluate(([t, dir]) => {
      const dock = document.querySelector('[data-dock-tether="top"] .glass-dock');
      const leaving = dock.querySelector(dir === "expand" ? ".dock-layer--summary" : ".dock-layer--full");
      dock.setAttribute("data-morphing", ""); leaving.classList.add("is-leaving"); dock.style.setProperty("--dock-morph-t", String(t));
      return new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => { const cs = getComputedStyle(dock); const r = dock.getBoundingClientRect(); res({ t, cls: dock.className.includes("expanded") ? "expanded" : "collapsed", w: +r.width.toFixed(1), x: +r.x.toFixed(1), scale: cs.scale, filter: cs.filter, kidsOpacity: [...dock.querySelector(".dock-layer--full").children].map((k) => +(+getComputedStyle(k).opacity).toFixed(2)) }); })));
    }, [t, dir]);
    seekMeta[dir].push(st);
    await page.screenshot({ path: `${OUT}seek/${dir}-${String(i).padStart(2, "0")}.png`, clip });
  }
  await page.evaluate((dir) => { const dock = document.querySelector('[data-dock-tether="top"] .glass-dock'); dock.removeAttribute("data-morphing"); dock.style.removeProperty("--dock-morph-t"); dock.querySelector(dir === "expand" ? ".dock-layer--summary" : ".dock-layer--full").classList.remove("is-leaving"); }, dir);
}
await seek("expand");
await page.screenshot({ path: `${OUT}rest-expanded.png`, clip });
await page.mouse.move(720, 600, { steps: 4 });
await page.waitForTimeout(4200);
await page.screenshot({ path: `${OUT}rest-collapsed.png`, clip });
await seek("collapse");
fs.writeFileSync(OUT + "seek-meta.json", JSON.stringify({ provenance: { ...provenance, khead_end: kf("rev-parse --short HEAD"), kdirty_end: kf("status --porcelain").split("\n").filter(Boolean).length }, clip, seekMeta }));
console.log(JSON.stringify({ provenance, frames: frames.length, logFrames: log.length, box }));
await browser.close();
