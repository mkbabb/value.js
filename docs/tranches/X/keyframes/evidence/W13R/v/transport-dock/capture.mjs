// transport-dock — frame-by-frame capture on the SERVED page, headed Chromium, real GPU.
// Part RT  (method 3): CDP screencast everyNthFrame 1 + a per-rAF state log across rest → hover-expand → idle-collapse (x2),
//                      Reset twist, Play/Pause swap, Select open, plus 3 s of idle rAF deltas.
// Part STEP(method 2): the library clock (rAF timestamp) frozen + stepped 16.667 ms per frame via clock-shim.js,
//                      a screenshot + a state sample per step for: expand morph (48), collapse morph (48),
//                      Reset twist (36), Pause→Play glyph swap (24), Select open (36).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const prov = () => ({ khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() });
const P0 = prov();
for (const d of ["rt", "step"]) fs.mkdirSync(OUT + d, { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await ctx.addInitScript({ path: OUT + "clock-shim.js" });
const page = await ctx.newPage();
await page.mouse.move(1300, 200);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(5000);
P0.renderer = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); });
P0.hash = await page.evaluate(() => location.hash);
// ---------- shared in-page sampler
await page.evaluate(() => {
  const host = document.querySelector('[data-dock-tether="bottom"]'); const dock = host.querySelector(".glass-dock");
  const full = dock.querySelector(".dock-layer--full"), sum = dock.querySelector(".dock-layer--summary");
  const r1 = (v) => Math.round(v * 10) / 10;
  window.__sample = () => {
    const cs = getComputedStyle(dock), r = dock.getBoundingClientRect();
    const play = (face) => { const b = face.querySelector("button"); if (!b) return null; const br = b.getBoundingClientRect(); const s = getComputedStyle(b); return { x: r1(br.x), cx: r1(br.x + br.width / 2), w: r1(br.width), op: +(+s.opacity).toFixed(3), sc: s.scale, tf: s.transform === "none" ? "" : s.transform, glyph: b.querySelector("svg")?.getAttribute("class")?.match(/lucide-(\w+)/)?.[1] ?? "" }; };
    const resetHost = full.querySelector('[aria-label="Reset animation"] span');
    const rb = resetHost?.getBoundingClientRect();
    const lb = document.querySelector('[role="listbox"]'); const lbw = lb?.closest("[data-reka-popper-content-wrapper]") ?? lb?.parentElement;
    const dots = lb ? [...lb.querySelectorAll(".progress-dot")].map((d) => d.style.getPropertyValue("--dot-p")) : null;
    return { t: performance.now(), cls: dock.className.replace(/glass-dock horizontal shape-pill layout-linear |fit-content |dock-inline|dock-scroll-x /g, "").trim(),
      morph: dock.hasAttribute("data-morphing"), mt: dock.style.getPropertyValue("--dock-morph-t"), cpx: dock.style.getPropertyValue("--dock-collapsed-px"), epx: dock.style.getPropertyValue("--dock-expanded-px"),
      x: r1(r.x), w: r1(r.width), h: r1(r.height), dscale: cs.scale, dtf: cs.transform === "none" ? "" : cs.transform,
      full: [+(+getComputedStyle(full).opacity).toFixed(3), getComputedStyle(full).visibility, full.className.replace("dock-layer dock-layer--full", "").trim()],
      sum: [+(+getComputedStyle(sum).opacity).toFixed(3), getComputedStyle(sum).visibility, sum.className.replace("dock-layer dock-layer--summary", "").trim()],
      kids: [...full.children].map((k) => { const s = getComputedStyle(k); return [+(+s.opacity).toFixed(2), s.scale]; }),
      clip: getComputedStyle(full).clipPath !== "none" ? getComputedStyle(full).clipPath : "",
      playF: play(full), playS: play(sum), sumLabel: sum.querySelector("span.dock-label")?.textContent?.trim() ?? null,
      reset: resetHost ? { inl: resetHost.style.transform, comp: getComputedStyle(resetHost).transform, x: r1(rb.x), w: r1(rb.width) } : null,
      lb: lb ? { op: getComputedStyle(lbw).opacity, tf: getComputedStyle(lbw).transform, anims: lbw.getAnimations({ subtree: true }).map((a) => (a.animationName || a.transitionProperty) + ":" + a.playState + ":" + Math.round(a.currentTime ?? -1)), dots } : null,
      anims: document.getAnimations().filter((a) => a.effect?.target && host.contains(a.effect.target)).map((a) => `${a.constructor.name}:${a.animationName || a.transitionProperty}:${a.playState}`) };
  };
  window.__log = []; window.__mark = (m) => window.__log.push({ mark: m, t: performance.now(), wall: Date.now() });
  let last = performance.now();
  const tick = (now) => { if (!window.__clock.manual) { const s = window.__sample(); s.dt = +(now - last).toFixed(1); window.__log.push(s); } last = now; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
const dockBox = async () => page.locator('[data-dock-tether="bottom"] .glass-dock').boundingBox();
const mark = (m) => page.evaluate((m) => window.__mark(m), m);
const b0 = await dockBox();
const hoverDock = async () => { const b = await dockBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 }); };
const away = () => page.mouse.move(1300, 200, { steps: 4 });
// ================= PART RT =================
const cdp = await ctx.newCDPSession(page);
const frames = []; const markers = [];
cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
const M = async (m) => { markers.push({ m, wall: Date.now() / 1000 }); await mark(m); };
await M("rest-idle-3s"); await page.waitForTimeout(3000);
await M("rest-wait-more"); await page.waitForTimeout(2000);
for (const c of [1, 2]) {
  await M(`hover-in-${c}`); await hoverDock(); await page.waitForTimeout(1500);
  await M(`hover-out-${c}`); await away(); await page.waitForTimeout(5000);
}
await M("hover-for-reset"); await hoverDock(); await page.waitForTimeout(1200);
await M("click-reset"); await page.locator('[data-dock-tether="bottom"] [aria-label="Reset animation"]').click(); await page.waitForTimeout(1200);
await M("click-play-1"); await page.locator('[data-dock-tether="bottom"] .dock-layer--full button').first().click(); await page.waitForTimeout(1200);
await M("click-play-2"); await page.locator('[data-dock-tether="bottom"] .dock-layer--full button').first().click(); await page.waitForTimeout(1200);
await M("open-select"); await page.locator('[data-dock-tether="bottom"] [aria-label="Select animation"]').click(); await page.waitForTimeout(1500);
await M("select-escape"); await page.keyboard.press("Escape"); await page.waitForTimeout(1000);
await M("end-rt");
await cdp.send("Page.stopScreencast");
const log = await page.evaluate(() => { const l = window.__log; window.__log = []; return l; });
fs.writeFileSync(OUT + "rt-log.json", JSON.stringify({ prov: P0, markers, log }));
frames.forEach((f, i) => fs.writeFileSync(`${OUT}rt/f${String(i).padStart(4, "0")}.png`, Buffer.from(f.data, "base64")));
fs.writeFileSync(OUT + "rt-frames.json", JSON.stringify(frames.map((f, i) => ({ i, ts: f.ts }))));
// ================= PART STEP =================
const DOCK_CLIP = { x: 460, y: 740, width: 520, height: 110 };
const RESET_CLIP = { x: 790, y: 770, width: 60, height: 46 };
const SEL_CLIP = { x: 440, y: 330, width: 560, height: 510 };
const stepMeta = {};
async function stepSeq(name, n, clip, action) {
  stepMeta[name] = [];
  await page.evaluate(() => window.__clock.freeze());
  await page.waitForTimeout(80);
  if (action) await action();
  for (let i = 0; i < n; i++) {
    const s = await page.evaluate(() => { window.__clock.step(1000 / 60); return new Promise((res) => setTimeout(() => res(window.__sample()), 30)); });
    s.i = i; stepMeta[name].push(s);
    await page.screenshot({ path: `${OUT}step/${name}-${String(i).padStart(2, "0")}.png`, clip });
  }
  await page.evaluate(() => window.__clock.thaw());
}
// dock must be collapsed before the expand seq
await away(); await page.waitForTimeout(4500);
await page.screenshot({ path: `${OUT}step/rest-before-expand.png`, clip: DOCK_CLIP });
stepMeta.pre = await page.evaluate(() => window.__sample());
await stepSeq("expand", 48, DOCK_CLIP, hoverDock);
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}step/rest-expanded.png`, clip: DOCK_CLIP });
// collapse: freeze, leave, let the real 3600 ms timer fire while frozen, then step
await stepSeq("collapse", 48, DOCK_CLIP, async () => { await away(); await page.waitForTimeout(3900); });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}step/rest-collapsed.png`, clip: DOCK_CLIP });
// reset twist (expand first, real time)
await hoverDock(); await page.waitForTimeout(1500);
await stepSeq("twist", 36, RESET_CLIP, () => page.locator('[data-dock-tether="bottom"] [aria-label="Reset animation"]').click());
await page.waitForTimeout(400);
// play glyph swap (currently playing? toggle)
await stepSeq("glyph", 24, DOCK_CLIP, () => page.locator('[data-dock-tether="bottom"] .dock-layer--full button').first().click());
await page.waitForTimeout(400);
await page.locator('[data-dock-tether="bottom"] .dock-layer--full button').first().click(); // restore playing
await page.waitForTimeout(600);
await stepSeq("select", 36, SEL_CLIP, () => page.locator('[data-dock-tether="bottom"] [aria-label="Select animation"]').click());
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}step/select-open-rest.png`, clip: SEL_CLIP });
// progress-dot liveness while open (real time)
const dotsA = await page.evaluate(() => window.__sample().lb); await page.waitForTimeout(700); const dotsB = await page.evaluate(() => window.__sample().lb);
await page.screenshot({ path: `${OUT}step/select-open-rest-b.png`, clip: SEL_CLIP });
await page.keyboard.press("Escape"); await page.waitForTimeout(600);
// collapsed-face play actuation (does the collapsed mirror work + glyph swap + does play hold its seat)
await away(); await page.waitForTimeout(4500);
const collapsedPlay = await page.evaluate(() => window.__sample());
await page.screenshot({ path: `${OUT}step/collapsed-before-press.png`, clip: DOCK_CLIP });
await stepSeq("cpress", 36, DOCK_CLIP, async () => { const b = await page.locator('[data-dock-tether="bottom"] .dock-layer--summary button').boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(150); await page.mouse.down(); await page.mouse.up(); });
fs.writeFileSync(OUT + "step-meta.json", JSON.stringify({ prov: P0, prov_end: prov(), clips: { DOCK_CLIP, RESET_CLIP, SEL_CLIP }, dotsA, dotsB, collapsedPlay, stepMeta }));
console.log(JSON.stringify({ P0, end: prov(), rtFrames: frames.length, rtLog: log.length, b0 }));
await browser.close();
