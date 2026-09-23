// playback-ribbon-visualizer — headed Chromium, real GPU, served page. Read-only on keyframes.js.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const meta = { start: new Date().toISOString(), khead0: khead() };
for (const d of ["rest", "kbd", "live", "drag", "balldrag", "reverse"]) fs.mkdirSync(OUT + d, { recursive: true });

const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs = [];
p.on("console", m => { if (m.type() === "error" || m.type() === "warning") logs.push(m.type() + ": " + m.text().slice(0, 240)); });
p.on("pageerror", e => logs.push("pageerror: " + e.message.slice(0, 240)));
await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

const R = "#controls-ribbon-target";
const probe = () => p.evaluate((R) => {
  const root = document.querySelector(R);
  const thumb = root.querySelector("[role=slider]");
  const ball = root.querySelector(".visualizer-ball");
  const stage = root.querySelector(".visualizer-stage");
  const tr = thumb.getBoundingClientRect(), br = ball.getBoundingClientRect(), sr = stage.getBoundingClientRect();
  const m = getComputedStyle(ball).transform; // matrix(a,b,c,d,tx,ty)
  const tx = m === "none" ? 0 : +m.match(/matrix\(([^)]+)\)/)[1].split(",")[4];
  const maxX = stage.clientWidth - ball.clientWidth;
  const now = +thumb.getAttribute("aria-valuenow"), max = +thumb.getAttribute("aria-valuemax");
  const btn = [...root.querySelectorAll("button")].find(x => /Play|Pause/.test(x.textContent));
  return { t: performance.now(), thumbCx: tr.left + tr.width / 2, thumbL: tr.left, thumbW: tr.width, valNow: now, valMax: max, valP: now / max,
    ballTx: tx, ballP: maxX ? tx / maxX : null, ballCx: br.left + br.width / 2, btn: btn && btn.textContent.trim(), styleTf: ball.style.transform };
}, R);
const crop = async (path, pad = 12) => {
  const box = await p.evaluate((R) => { const r = document.querySelector(R).closest(".flex-shrink-0").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, R);
  await p.screenshot({ path, clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + 2 * pad, height: box.height + 2 * pad } });
};

// ---- A. REST ----
const rest = await p.evaluate((R) => {
  const root = document.querySelector(R);
  const thumb = root.querySelector("[role=slider]");
  const sroot = thumb.closest("[data-orientation]")?.parentElement?.closest("[data-orientation]") || thumb.closest("[data-orientation]");
  const cs = (el) => { const c = getComputedStyle(el); return { cls: (el.className?.baseVal ?? el.className).toString().slice(0, 120), z: c.zIndex, pos: c.position, tf: c.transform, op: c.opacity, blend: c.mixBlendMode, filter: c.filter, bdf: c.backdropFilter, shadow: c.boxShadow.slice(0, 90), bg: c.backgroundColor, wc: c.willChange, rect: el.getBoundingClientRect().toJSON() }; };
  const stage = root.querySelector(".visualizer-stage");
  const layers = [...stage.children].map(cs);
  const sliderEls = [...root.querySelector(".scrub-rail").querySelectorAll("*")].slice(0, 12).map(e => ({ tag: e.tagName, attrs: [...e.attributes].map(a => a.name + "=" + a.value.slice(0, 60)).filter(a => !a.startsWith("class=") || true).slice(0, 10), op: getComputedStyle(e).opacity, bg: getComputedStyle(e).backgroundColor, rect: e.getBoundingClientRect().toJSON() }));
  return { anims: document.getAnimations().length, animNames: document.getAnimations().slice(0, 10).map(a => a.animationName || a.id || a.constructor.name), layers, sliderEls };
}, R);
fs.writeFileSync(OUT + "rest/state.json", JSON.stringify({ rest, probe: await probe() }, null, 1));
await crop(OUT + "rest/ribbon-rest.png");

// ---- B. PAUSED KEYBOARD SCRUB, stepped: 50 frames × 2% ----
await p.focus(R + " [role=slider]");
const kbd = [];
for (let i = 0; i <= 50; i++) {
  if (i > 0) { await p.keyboard.press("ArrowRight"); await p.keyboard.press("ArrowRight"); }
  await p.waitForTimeout(60);
  const s = await probe(); kbd.push({ i, ...s });
  await crop(OUT + `kbd/f${String(i).padStart(3, "0")}.png`);
}
fs.writeFileSync(OUT + "kbd/samples.json", JSON.stringify(kbd, null, 1));
await p.keyboard.press("Home"); await p.waitForTimeout(150);
const afterHome = await probe();

// ---- C. LIVE PLAY: in-page rAF sampler + CDP screencast, 11 s ----
const cdp = await p.context().newCDPSession(p);
const frames = []; let fi = 0;
cdp.on("Page.screencastFrame", async (f) => {
  const n = fi++; fs.writeFileSync(OUT + `live/s${String(n).padStart(4, "0")}.jpg`, Buffer.from(f.data, "base64"));
  frames.push({ n, ts: f.metadata.timestamp }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});
await p.evaluate((R) => {
  window.__S = []; const root = document.querySelector(R);
  const thumb = root.querySelector("[role=slider]"), ball = root.querySelector(".visualizer-ball"), stage = root.querySelector(".visualizer-stage");
  const btn = [...root.querySelectorAll("button")].find(x => /Play|Pause/.test(x.textContent));
  const loop = (ts) => { const tr = thumb.getBoundingClientRect(); const m = ball.style.transform.match(/translateX\(([-\d.e]+)px\)/);
    window.__S.push([ts, tr.left + tr.width / 2, +thumb.getAttribute("aria-valuenow"), m ? +m[1] : null, stage.clientWidth - ball.clientWidth, btn.textContent.trim()]);
    if (window.__S.length < 2000) requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}, R);
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 80, everyNthFrame: 1 });
const playBtn = p.locator(R + " button", { hasText: /^\s*Play/ }).first();
await p.waitForTimeout(300);
const tPlay = await p.evaluate(() => performance.now());
await playBtn.click();
await p.waitForTimeout(11000);
await cdp.send("Page.stopScreencast");
const live = await p.evaluate(() => window.__S);
fs.writeFileSync(OUT + "live/raf.json", JSON.stringify({ tPlay, cols: ["ts", "thumbCx", "valNow", "ballTx", "maxX", "btn"], rows: live }));
fs.writeFileSync(OUT + "live/frames.json", JSON.stringify(frames));
const liveAnims = await p.evaluate(() => document.getAnimations().map(a => ({ n: a.animationName || a.transitionProperty || a.id, s: a.playState, tgt: (a.effect?.target?.className?.toString?.() || "").slice(0, 60) })).slice(0, 20));
fs.writeFileSync(OUT + "live/getAnimations.json", JSON.stringify(liveAnims, null, 1));
await crop(OUT + "live/ribbon-playing.png");

// ---- D. POINTER DRAG on the scrubber WHILE PLAYING, then paused ----
const railBox = await p.locator(R + " .scrub-rail").boundingBox();
const y = railBox.y + railBox.height / 2, x0 = railBox.x + 20, x1 = railBox.x + railBox.width - 20;
const drag = [];
await p.mouse.move(x0, y); await p.mouse.down();
for (let i = 0; i <= 30; i++) {
  await p.mouse.move(x0 + (x1 - x0) * i / 30, y); await p.waitForTimeout(50);
  drag.push({ i, phase: "drag-playing", ...(await probe()) }); await crop(OUT + `drag/f${String(i).padStart(3, "0")}.png`);
}
await p.mouse.up(); await p.waitForTimeout(400);
drag.push({ phase: "after-release-400ms", ...(await probe()) });
await crop(OUT + "drag/f031-after-release.png");
// pause, then drag paused
await p.locator(R + " button", { hasText: /^\s*Pause/ }).first().click(); await p.waitForTimeout(300);
const pausedA = await probe(); await p.waitForTimeout(500); const pausedB = await probe();
drag.push({ phase: "paused-A", ...pausedA }, { phase: "paused-B+500ms", ...pausedB });
await p.mouse.move(x1, y); await p.mouse.down();
for (let i = 0; i <= 20; i++) {
  await p.mouse.move(x1 - (x1 - x0) * i / 20, y); await p.waitForTimeout(50);
  drag.push({ i: 32 + i, phase: "drag-paused", ...(await probe()) }); await crop(OUT + `drag/f${String(32 + i).padStart(3, "0")}.png`);
}
await p.mouse.up(); await p.waitForTimeout(300);
drag.push({ phase: "paused-after-release", ...(await probe()) });
fs.writeFileSync(OUT + "drag/samples.json", JSON.stringify(drag, null, 1));

// ---- E. DRAG THE BALL (twin → thumb) paused ----
const bb = await p.locator(R + " .visualizer-ball").boundingBox();
const sb = await p.locator(R + " .visualizer-stage").boundingBox();
const bd = [];
await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.mouse.down();
for (let i = 0; i <= 20; i++) {
  await p.mouse.move(sb.x + bb.width / 2 + (sb.width - bb.width) * i / 20, bb.y + bb.height / 2); await p.waitForTimeout(50);
  bd.push({ i, ...(await probe()) }); await crop(OUT + `balldrag/f${String(i).padStart(3, "0")}.png`);
}
await p.mouse.up(); await p.waitForTimeout(1200);
bd.push({ phase: "after-release-1200ms", ...(await probe()) }); await crop(OUT + "balldrag/f021-after-release.png");
fs.writeFileSync(OUT + "balldrag/samples.json", JSON.stringify(bd, null, 1));

// ---- F. REVERSE glyph + mapping ----
await p.keyboard.press("Escape").catch(() => {});
const rv = [];
rv.push({ phase: "before", ...(await probe()) }); await crop(OUT + "reverse/r0-before.png");
await p.locator(R + " button", { hasText: "Reverse" }).first().click(); await p.waitForTimeout(400);
rv.push({ phase: "reversed", ...(await probe()), pressed: await p.locator(R + " button", { hasText: "Reverse" }).first().getAttribute("aria-pressed") }); await crop(OUT + "reverse/r1-reversed.png");
await p.locator(R + " button", { hasText: /^\s*Play/ }).first().click();
for (let i = 0; i < 6; i++) { await p.waitForTimeout(250); rv.push({ phase: "rev-play-" + i, ...(await probe()) }); await crop(OUT + `reverse/r${2 + i}-play.png`); }
fs.writeFileSync(OUT + "reverse/samples.json", JSON.stringify(rv, null, 1));

meta.khead1 = khead(); meta.end = new Date().toISOString(); meta.afterHome = afterHome; meta.logs = logs.slice(0, 40);
fs.writeFileSync(OUT + "meta.json", JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta, null, 1));
await b.close();
