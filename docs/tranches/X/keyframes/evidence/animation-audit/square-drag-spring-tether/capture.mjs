// Surface square-drag-spring-tether — headed Chromium, real GPU, CDP screencast (method 3:
// rAF/SpringProgress-driven; the loop is useSweepScene's own rAF, no seekable clock) PLUS an
// in-page per-rAF recorder of every layer's state (read-only observation).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
fs.mkdirSync(OUT + "frames", { recursive: true });
for (const f of fs.readdirSync(OUT + "frames")) fs.unlinkSync(OUT + "frames/" + f);

const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/square");
await p.waitForSelector(".demo-box", { timeout: 20000 });
await p.waitForTimeout(2500);
const gpu = await p.evaluate(() => { const gl = document.createElement("canvas").getContext("webgl2"); const e = gl.getExtension("WEBGL_debug_renderer_info"); return gl.getParameter(e.UNMASKED_RENDERER_WEBGL); });

// per-rAF recorder
await p.evaluate(() => {
  const box = document.querySelector(".demo-box");
  const teth = document.querySelector(".square-tether");
  const path = document.querySelector(".square-tether-line");
  const tel = document.querySelector(".square-telemetry");
  const ring = () => getComputedStyle(box, "::before");
  window.__rec = []; window.__on = true;
  let last = 0;
  const tick = (t) => {
    if (!window.__on) return;
    const cs = getComputedStyle(box), ts = getComputedStyle(teth);
    const br = box.getBoundingClientRect();
    const rb = ring();
    window.__rec.push({
      t: +t.toFixed(2), dt: last ? +(t - last).toFixed(2) : 0,
      inline: box.style.transform, ctf: cs.transform, z: cs.zIndex, wc: cs.willChange,
      shadow: cs.boxShadow, tilt: box.style.getPropertyValue("--spring-tilt"),
      mode: box.dataset.squareMode, dragging: box.classList.contains("demo-box--dragging"),
      bx: +(br.x + br.width / 2).toFixed(2), by: +(br.y + br.height / 2).toFixed(2), bw: +br.width.toFixed(2),
      tActive: teth.classList.contains("square-tether--active"), tOp: ts.opacity, tZ: ts.zIndex,
      d: path.getAttribute("d"),
      read: tel.innerText.replace(/\s+/g, " "),
      ringOp: rb.opacity, ringSh: rb.boxShadow, ringContent: rb.content,
      filt: cs.filter, blend: cs.mixBlendMode,
    });
    last = t; requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

const cdp = await p.context().newCDPSession(p);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ ts: f.metadata.timestamp, data: f.data });
  await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await p.waitForTimeout(300);

const box0 = await p.evaluate(() => { const r = document.querySelector(".demo-box").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
const marks = {};
const mark = async (k) => { marks[k] = await p.evaluate(() => performance.now()); };
// gesture 1: press on box, drag diagonally ~150px (106,106) over ~250 ms, hold 500 ms, release, settle 2.2 s
await p.mouse.move(box0.x, box0.y);
await mark("down"); await p.mouse.down();
for (let i = 1; i <= 15; i++) { await p.mouse.move(box0.x + 106 * i / 15, box0.y + 106 * i / 15); await p.waitForTimeout(16); }
await mark("moved");
await p.waitForTimeout(500);
await mark("up"); await p.mouse.up();
await p.waitForTimeout(2200);
await mark("settled1");
// gesture 2: re-grab (at the displaced box) and fling back up-left past centre fast, release immediately
const box1 = await p.evaluate(() => { const r = document.querySelector(".demo-box").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await mark("down2"); await p.mouse.move(box1.x, box1.y); await p.mouse.down();
for (let i = 1; i <= 5; i++) { await p.mouse.move(box1.x - 180 * i / 5, box1.y - 140 * i / 5); await p.waitForTimeout(16); }
await mark("up2"); await p.mouse.up();
await p.waitForTimeout(2200);
await mark("settled2");
await cdp.send("Page.stopScreencast");
const rec = await p.evaluate(() => { window.__on = false; return window.__rec; });

// transport probe: does Play/scrub affect the box after a drag?
const before = await p.evaluate(() => document.querySelector(".demo-box").style.transform);
await p.getByRole("button", { name: "Play animation" }).first().click();
await p.waitForTimeout(700);
const afterPlay = await p.evaluate(() => ({ tf: document.querySelector(".demo-box").style.transform, mode: document.querySelector(".demo-box").dataset.squareMode, anims: document.getAnimations().length, read: document.querySelector(".square-telemetry").innerText.replace(/\s+/g," "), tether: document.querySelector(".square-tether").classList.contains("square-tether--active") }));
await p.screenshot({ path: OUT + "transport-play.png", clip: { x: 518, y: 127, width: 878, height: 646 } });
// drag during playback (takeover)
const box2 = await p.evaluate(() => { const r = document.querySelector(".demo-box").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(box2.x, box2.y); await p.mouse.down();
const takeover = await p.evaluate(() => new Promise(r => requestAnimationFrame(() => r({ tf: document.querySelector(".demo-box").style.transform, mode: document.querySelector(".demo-box").dataset.squareMode }))));
await p.mouse.up(); await p.waitForTimeout(1500);
const playBtn = await p.evaluate(() => [...document.querySelectorAll("button[aria-label]")].map(b => b.getAttribute("aria-label")).filter(l => /play|pause/i.test(l)));
fs.writeFileSync(OUT + "transport.json", JSON.stringify({ before, afterPlay, box2, takeover, playBtn }, null, 1));

fs.writeFileSync(OUT + "rec.json", JSON.stringify({ khead, kdirty, gpu, box0, box1, marks, rec }, null, 0));
const t0 = frames[0]?.ts ?? 0;
frames.forEach((f, i) => fs.writeFileSync(OUT + `frames/f${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
fs.writeFileSync(OUT + "frames/index.json", JSON.stringify(frames.map((f, i) => ({ i, ms: +((f.ts - t0) * 1000).toFixed(1), wall: f.ts })), null, 0));
const dts = rec.map(r => r.dt).filter(x => x > 0);
console.log(JSON.stringify({ khead, kdirty, gpu, frames: frames.length, rafFrames: rec.length, dropped: dts.filter(x => x > 20).length, maxDt: Math.max(...dts), marks, afterPlay, takeover }, null, 1));
await b.close();
