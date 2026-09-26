// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.amiga · the Amiga scene's served predicates (READ-ONLY falsifier)
// Rows: KFA-20 64 66 67 68 125 126 127 130 194 195 196 · UIA-KF-023 024 194 195 196 197 198 291.
// Usage: BASE=http://localhost:5214 RUN=before-r1 node amiga.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run";
const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5214";
const CFGS = (process.env.CFGS || "1440x900-light,1440x900-dark,390x844-light,390x844-dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const r3 = (v) => Math.round(v * 1000) / 1000;
const rows = [];
const b = await chromium.launch({ headless: false });

// per-rAF sampler of the dev probe for `ms`
const sample = (ms) => new Promise((res) => {
  const out = []; const t0 = performance.now(); let last = t0;
  const f = (t) => { const p = window.__kfAmigaProbe?.pose(); if (p) out.push({ t: t - t0, dt: t - last, ...p }); last = t; if (t - t0 < ms) requestAnimationFrame(f); else res(out); };
  requestAnimationFrame(f);
});
const distinct = (s, k) => new Set(s.map((e) => e[k].toFixed(4))).size;
const apexes = (s) => { const a = []; for (let i = 1; i < s.length - 1; i++) if (s[i].py >= s[i - 1].py && s[i].py > s[i + 1].py) a.push(r3(s[i].py)); return a; };
// pixel stats of a PNG buffer, decoded in-page (no deps): red-ball bbox + raw RGBA for diffs
const pixels = async (p, buf) => p.evaluate(async (b64) => {
  const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode();
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data;
  let minY = 1e9, maxY = -1, minX = 1e9, maxX = -1, n = 0;
  for (let y = 0; y < c.height; y++) for (let i = 0; i < c.width; i++) { const o = (y * c.width + i) * 4; const r = d[o], g = d[o + 1], bl = d[o + 2];
    if (r > 140 && r - g > 60 && r - bl > 50) { n++; if (y < minY) minY = y; if (y > maxY) maxY = y; if (i < minX) minX = i; if (i > maxX) maxX = i; } }
  const lum = []; if (maxY >= 0) for (let y = minY; y <= maxY; y++) for (let i = minX; i <= maxX; i++) { const o = (y * c.width + i) * 4; lum.push(0.2126 * d[o] + 0.7152 * d[o + 1] + 0.0722 * d[o + 2]); }
  lum.sort((a, b) => a - b); const white95 = lum.length ? Math.round(lum[Math.floor(lum.length * 0.95)]) : 0, white99 = lum.length ? Math.round(lum[Math.floor(lum.length * 0.995)]) : 0;
  return { white95, white99, w: c.width, h: c.height, red: n, cx: (minX + maxX) / 2, bottom: maxY, ballH: maxY >= 0 ? maxY - minY + 1 : 0, ballW: maxX >= 0 ? maxX - minX + 1 : 0 };
}, buf.toString("base64"));
const diffFrac = async (p, a, bb) => p.evaluate(async ([A, B]) => {
  const dec = async (s) => { const img = new Image(); img.src = `data:image/png;base64,${s}`; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
  const da = await dec(A), db = await dec(B); let n = 0; for (let o = 0; o < da.length; o += 4) if (Math.abs(da[o] - db[o]) + Math.abs(da[o + 1] - db[o + 1]) + Math.abs(da[o + 2] - db[o + 2]) > 36) n++;
  return +(n / (da.length / 4)).toFixed(4);
}, [a.toString("base64"), bb.toString("base64")]);
const shadowDelta = async (p, buf, ball) => p.evaluate(async ([s, bb]) => {
  const img = new Image(); img.src = `data:image/png;base64,${s}`; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
  const L = (x0, y0, w, h) => { const d = x.getImageData(Math.max(0, x0), Math.max(0, y0), w, h).data; let t = 0; for (let o = 0; o < d.length; o += 4) t += 0.2126 * d[o] + 0.7152 * d[o + 1] + 0.0722 * d[o + 2]; return t / (d.length / 4); };
  const cx = Math.round(bb.cx), top = Math.round(bb.bottom + bb.h * 0.9), w = Math.max(8, Math.round(bb.w * 0.6)), h = Math.max(6, Math.round(bb.h * 0.6));
  return +(L(cx - (w >> 1), top, w, h) - L(cx - (w >> 1) - Math.round(bb.w * 3), top, w, h)).toFixed(1);
}, [buf.toString("base64"), ball]);

for (const cfg of CFGS) {
  const [vp, theme] = cfg.split("-"); const [w, h] = vp.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch, colorScheme: theme });
  await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__a")) { localStorage.clear(); sessionStorage.setItem("__a", "1"); } localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); const row = { cfg };
  try {
    await p.goto(`${BASE}/#/amiga`); await p.waitForFunction(() => !!window.__kfAmigaProbe, null, { timeout: 30000 }); await sleep(2500);
    const cv = p.locator("canvas.amiga-canvas").first(); const box = await cv.boundingBox();
    row.canvas = { w: Math.round(box.width), h: Math.round(box.height), top: Math.round(box.y), bottom: Math.round(box.y + box.height), vh: h };
    Object.assign(row, await p.evaluate(() => { const c = document.querySelector("canvas.amiga-canvas"); const cs = getComputedStyle(c); const s = [...c.querySelectorAll("[role=slider]")];
      return { roundedCard: c.classList.contains("rounded-card"), radius: cs.borderTopLeftRadius, hairline: cs.boxShadow, sliders: s.length, slidersFocusable: s.filter((e) => e.tabIndex >= 0).length, readouts: c.querySelectorAll("[role=status],output,[role=img]").length }; }));
    // UIA-KF-024: a real Tab walk to the subject, then the painted indicator
    let hit = false; for (let i = 0; i < 60 && !hit; i++) { await p.keyboard.press("Tab"); hit = await p.evaluate(() => document.activeElement?.classList?.contains("amiga-canvas")); }
    row.focus = hit ? await p.evaluate(() => { const cs = getComputedStyle(document.activeElement); return { outline: `${cs.outlineStyle} ${cs.outlineWidth}`, shadow: cs.boxShadow, visible: document.activeElement.matches(":focus-visible") }; }) : "unreached";
    if (hit) await p.screenshot({ path: `${FR}${cfg}-focus.jpg`, type: "jpeg", quality: 70 });
    // rest the stage: Reset, then settle
    const click = async (label) => { const l = p.locator(`[aria-label="${label}"]:visible`).first(); if (await l.count()) { await l.click({ timeout: 4000 }); return true; } return false; };
    const s0 = await p.evaluate(sample, 200); row.bootPlaying = s0.at(-1)?.playing ?? null;
    if (row.bootPlaying) await click("Pause animation");
    await click("Reset animation"); await sleep(2500);
    const shotA = await p.screenshot({ clip: box }); fs.writeFileSync(`${FR}${cfg}-rest.png`, shotA);
    const px0 = await pixels(p, shotA); row.ballFrac = +(px0.ballH / px0.h).toFixed(3); row.ball = { h: px0.ballH, w: px0.ballW, white95: px0.white95, white995: px0.white99 };
    row.restPose = await p.evaluate(() => window.__kfAmigaProbe.pose());
    // KFA-66 / KFA-127: play and trace
    await click("Play animation"); const play = await p.evaluate(sample, 3400);
    row.apexes = apexes(play.filter((e) => e.t > 500)); row.longFrames = play.filter((e) => e.dt > 20).length; row.frames = play.length;
    row.minPy = r3(Math.min(...play.map((e) => e.py)));
    await p.screenshot({ path: `${FR}${cfg}-playing.jpg`, type: "jpeg", quality: 70 });
    // UIA-KF-023 / KFA-68: Reset while playing
    await click("Reset animation"); const rs = await p.evaluate(sample, 2500); const rl = rs.at(-1);
    row.afterReset = { px: r3(rl.px), py: r3(rl.py), spin: r3(rl.spin), playing: rl.playing };
    // KFA-126: Pause mid-flight
    await click("Play animation"); await sleep(1100); await click("Pause animation"); const ps = await p.evaluate(sample, 2500); const pl = ps.at(-1);
    row.afterPause = { px: r3(pl.px), py: r3(pl.py), spin: r3(pl.spin), playing: pl.playing, moved: distinct(ps, "py") };
    await click("Reset animation"); await sleep(1500);
    // KFA-195/UIA-KF-195/KFA-67: the contact shadow under the rested ball vs the floor beside it (luma delta)
    const shotR = await p.screenshot({ clip: box }); const pr = await pixels(p, shotR);
    row.shadowDelta = pr.ballH ? await shadowDelta(p, shotR, { cx: pr.cx, bottom: pr.bottom, w: pr.ballW, h: pr.ballH }) : null;
    // KFA-20: one ArrowRight — how many distinct yaw values are painted on the way
    await cv.focus(); await sleep(200);
    const kp = p.evaluate(sample, 900); await p.keyboard.press("ArrowRight"); const ks = await kp;
    row.nudge = { distinctYaw: distinct(ks, "oy"), end: r3(ks.at(-1).oy) };
    await p.keyboard.press("ArrowRight"); await p.keyboard.press("ArrowDown"); await sleep(900);
    // KFA-130: Home — how many distinct attitudes on the way back
    const hp = p.evaluate(sample, 900); await p.keyboard.press("Home"); const hs = await hp;
    row.home = { distinctPitch: distinct(hs, "ox"), distinctYaw: distinct(hs, "oy"), end: [r3(hs.at(-1).ox), r3(hs.at(-1).oy)] };
    // UIA-KF-197: a drag that misses the ball, then Home + Reset: is the room view back?
    await sleep(800); const before = await p.screenshot({ clip: box });
    const sx = box.x + box.width * 0.12, sy = box.y + box.height * 0.2;
    await p.mouse.move(sx, sy); await p.mouse.down(); for (let i = 1; i <= 12; i++) { await p.mouse.move(sx + i * 18, sy + i * 4); await sleep(16); } await p.mouse.up();
    await sleep(600); const moved = await p.screenshot({ clip: box });
    await cv.focus(); await p.keyboard.press("Home"); await click("Reset animation"); await sleep(2500);
    const back = await p.screenshot({ clip: box }); fs.writeFileSync(`${FR}${cfg}-after-miss-home.png`, back);
    row.missDrag = { movedDiff: await diffFrac(p, before, moved), restoredDiff: await diffFrac(p, before, back) };
    // UIA-KF-198 (390 only): what the "Controls panel" toggle does to the stage
    if (touch) { const t = p.locator('[aria-label*="Controls panel" i]:visible').first(); row.panelToggle = (await t.count()) ? "present" : "absent"; }
  } catch (e) { row.error = String(e).slice(0, 200); }
  rows.push(row); console.log(JSON.stringify(row));
  await ctx.close();
}
fs.writeFileSync(`${OUT}${RUN}.json`, JSON.stringify(rows, null, 1));
await b.close();
