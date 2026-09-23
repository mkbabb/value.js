// timeline-panel — main capture (served page, headed Chromium, real GPU).
// Phases: A enter (screencast, real time) · B rest · C snapshots · D scrub 51 frames (keyboard, the
// timeline's own clock via scrub) · E transport play wiring (sampled) · F diamond select metric-swap
// (paused CSSTransition seek) · G hover preview · H expand/collapse (screencast).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const prov = () => ({ khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() });
const log = { prov0: prov() };
const mk = (d) => { fs.mkdirSync(OUT + d, { recursive: true }); return OUT + d + "/"; };
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const cdp = await page.context().newCDPSession(page);
// three KeyframeTimeline instances mount (one per channel, two display:none) — always address the VISIBLE one.
await page.addInitScript(() => { window.__v = (sel) => [...document.querySelectorAll(sel)].find((e) => e.checkVisibility()); });
async function screencast(dir, ms, action) {
  const D = mk(dir); const frames = [];
  const h = (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); };
  cdp.on("Page.screencastFrame", h);
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
  await page.waitForTimeout(150);
  const t0 = Date.now() / 1000; await action(); await page.waitForTimeout(ms);
  await cdp.send("Page.stopScreencast"); cdp.off("Page.screencastFrame", h);
  const idx = frames.map((f, i) => { const file = `f${String(i).padStart(3, "0")}.png`; fs.writeFileSync(D + file, Buffer.from(f.data, "base64")); return { i, file, label: `${Math.round((f.ts - t0) * 1000)}ms` }; });
  fs.writeFileSync(D + "index.json", JSON.stringify(idx)); return idx.length;
}
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(5000);
log.renderer = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); });
// ---- A: enter, real-time screencast (first ever Timeline open: async chunk + animate-in)
await page.evaluate(() => { window.__anims = []; document.addEventListener("animationstart", (e) => window.__anims.push({ t: performance.now(), name: e.animationName, cls: String(e.target.className).slice(0, 90) }), true); });
await page.mouse.move(720, 70); await page.waitForTimeout(700);
await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
log.A_frames = await screencast("A-enter", 1200, async () => { await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); });
log.A_animstarts = await page.evaluate(() => window.__anims);
await page.mouse.move(1300, 850); await page.waitForTimeout(900);
// ---- B: rest
const geo = () => page.evaluate(() => {
  const r = (el) => el && [...["x", "y", "width", "height"].map((k) => Math.round(el.getBoundingClientRect()[k]))];
  const st = __v(".timeline-preview-stage"); const subj = st?.firstElementChild; const ph = __v(".timeline-track")?.querySelector(".bg-primary.w-0\\.5");
  const btn = (l) => { const b = __v(`[aria-label="${l}"]`); if (!b) return null; const c = getComputedStyle(b); return { disabled: b.disabled, op: c.opacity, color: c.color, ev: c.pointerEvents }; };
  return { stage: r(st), subj: r(subj), subjT: subj && getComputedStyle(subj).transform.slice(0, 80), subjStyle: subj?.getAttribute("style")?.slice(0, 160), playhead: ph?.style.left, diamonds: [...__v('.timeline-track').querySelectorAll('[role=slider]')].map((d) => d.style.left),
    undo: btn("Undo"), redo: btn("Redo"), expanded: !!document.querySelector("#timeline-expanded-target .timeline-track"),
    sceneT: getComputedStyle(document.querySelector('.cube:not([data-timeline-preview-subject])') || document.body).transform.slice(0, 80),
    anims: document.getAnimations().map((a) => `${a.constructor.name}:${a.animationName || a.transitionProperty || a.id || "-"}:${a.playState}:${String(a.effect?.target?.className ?? "").slice(0, 30)}`).slice(0, 25) };
});
log.B_rest = await geo();
await page.screenshot({ path: OUT + "B-rest-full.png" });
const PANE = { x: 66, y: 60, width: 416, height: 540 };
await page.screenshot({ path: OUT + "B-rest-pane.png", clip: PANE });
// ---- C: snapshots at 0, 50, 100 (scene playing, so three distinct poses)
const track = page.locator(".timeline-track:visible");
const snap = async () => { await page.getByRole("button", { name: /^Snapshot$/ }).click(); await page.waitForTimeout(700); };
await snap();
await track.focus(); await page.keyboard.press("End"); await page.waitForTimeout(1300); await snap();
await track.focus(); await page.keyboard.press("Home"); for (let i = 0; i < 5; i++) await page.keyboard.press("PageUp"); await page.waitForTimeout(1300); await snap();
await page.mouse.move(1300, 850); await page.waitForTimeout(1500);
log.C_after = await geo();
log.C_kfs = await page.evaluate(() => [...__v('.timeline-track').querySelectorAll('[role=slider]')].map((d) => d.getAttribute("aria-valuetext") || d.getAttribute("aria-label")));
await page.screenshot({ path: OUT + "C-after-snapshots-full.png" });
// ---- D: scrub frame by frame (51 frames, 0..100% step 2, keyboard on the rail = the engine's scrub)
{ const D = mk("D-scrub"); const idx = []; await track.focus(); await page.keyboard.press("Home"); await page.waitForTimeout(300);
  const clip = await page.evaluate(() => { const a = __v(".timeline-preview-stage").getBoundingClientRect(); const b = __v(".timeline-track").getBoundingClientRect(); return { x: Math.floor(a.x) - 4, y: Math.floor(a.y) - 4, width: Math.ceil(a.width) + 8, height: Math.ceil(b.bottom - a.y) + 8 }; });
  log.D_clip = clip; log.D_rows = [];
  for (let i = 0; i <= 50; i++) {
    if (i > 0) { await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); }
    await page.waitForTimeout(90);
    const file = `f${String(i).padStart(3, "0")}.png`; await page.screenshot({ path: D + file, clip });
    const g = await page.evaluate(() => { const s = __v(".timeline-preview-stage")?.firstElementChild; const ph = __v(".timeline-track")?.querySelector(".bg-primary.w-0\\.5"); return { t: getComputedStyle(s).transform.slice(0, 60), inline: (s.style.transform || "").slice(0, 70), ph: ph?.style.left }; });
    log.D_rows.push({ i, ...g }); idx.push({ i, file, label: `${i * 2}% ph=${g.ph}` });
  }
  fs.writeFileSync(D + "index.json", JSON.stringify(idx)); }
// ---- E: transport play/pause wiring. Park scrub at 50%, then sample while the transport plays.
await track.focus(); await page.keyboard.press("Home"); for (let i = 0; i < 5; i++) await page.keyboard.press("PageUp");
await page.mouse.move(1300, 850); await page.waitForTimeout(500);
const sample = async (label, n = 30) => { const rows = []; for (let i = 0; i < n; i++) { rows.push(await page.evaluate(() => { const s = __v(".timeline-preview-stage")?.firstElementChild; const ph = __v(".timeline-track")?.querySelector(".bg-primary.w-0\\.5"); const sc = document.querySelector('.cube:not([data-timeline-preview-subject])'); return [ph?.style.left, (s?.style.transform || "").slice(0, 44), getComputedStyle(sc).transform.slice(0, 44)]; })); await page.waitForTimeout(100); } return { label, distinctPlayhead: new Set(rows.map((r) => r[0])).size, distinctPreview: new Set(rows.map((r) => r[1])).size, distinctScene: new Set(rows.map((r) => r[2])).size, first: rows[0], last: rows.at(-1) }; };
log.E_transportLabels = await page.evaluate(() => [...document.querySelectorAll('[aria-label$="animation"]')].map((b) => b.getAttribute("aria-label")));
log.E_before = await sample("as-left");
const pp = page.locator('[aria-label="Pause animation"], [aria-label="Play animation"]').first();
log.E_btn1 = await pp.getAttribute("aria-label"); await pp.click({ force: true }); await page.waitForTimeout(600); await page.mouse.move(1300, 850);
log.E_after1 = await sample("after-toggle-1");
const pp2 = page.locator('[aria-label="Pause animation"], [aria-label="Play animation"]').first();
log.E_btn2 = await pp2.getAttribute("aria-label"); await pp2.click({ force: true }); await page.waitForTimeout(600); await page.mouse.move(1300, 850);
log.E_after2 = await sample("after-toggle-2");
{ const D = mk("E-play"); const idx = []; const clip = log.D_clip; for (let i = 0; i < 24; i++) { const file = `f${String(i).padStart(3, "0")}.png`; await page.screenshot({ path: D + file, clip }); idx.push({ i, file, label: `${i * 125}ms playing` }); await page.waitForTimeout(125); } fs.writeFileSync(D + "index.json", JSON.stringify(idx)); }
log.E_raf = await page.evaluate(() => new Promise((res) => { const d = []; let last = performance.now(); const t0 = last; const f = (t) => { d.push(t - last); last = t; if (t - t0 < 3000) requestAnimationFrame(f); else res({ n: d.length, over20: d.filter((x) => x > 20).length, max: Math.round(Math.max(...d)) }); }; requestAnimationFrame(f); }));
log.E_label = await page.locator('[aria-label="Pause animation"], [aria-label="Play animation"]').first().getAttribute("aria-label");
// ---- F: click a diamond -> metric-swap Transition (pause + seek)
await page.evaluate(() => { window.__tr = null; });
const dia = page.locator('.timeline-track:visible [role=slider]').nth(1);
await dia.click({ force: true });
log.F_found = await page.evaluate(() => new Promise((res) => { let n = 0; const tick = () => { const as = document.getAnimations().filter((a) => a.constructor.name === "CSSTransition" && a.effect?.target?.closest?.(".timeline-preview-stage") === null && a.effect?.target?.querySelector?.('[aria-label="Keyframe label"]')); if (as.length) { as.forEach((a) => a.pause()); window.__tr = as; res(as.map((a) => `${a.transitionProperty}:${a.effect.getComputedTiming().duration}:${a.effect.getComputedTiming().easing}`)); } else if (++n < 60) requestAnimationFrame(tick); else res("none-found:" + document.getAnimations().map((a) => a.constructor.name + ":" + (a.transitionProperty || a.animationName)).join(",")); }; tick(); }));
{ const D = mk("F-metric-swap"); const idx = []; const N = 24;
  const clip = await page.evaluate(() => { const e = document.querySelector('[aria-label="Keyframe label"]')?.closest(".flex.flex-col.gap-3"); const r = (e || document.body).getBoundingClientRect(); return { x: Math.max(0, Math.floor(r.x) - 10), y: Math.max(0, Math.floor(r.y) - 20), width: Math.ceil(r.width) + 20, height: Math.min(420, Math.ceil(r.height) + 40) }; });
  log.F_clip = clip;
  if (Array.isArray(log.F_found)) for (let i = 0; i <= N; i++) { const s = await page.evaluate((i) => { const as = window.__tr; const d = as[0].effect.getComputedTiming().duration; as.forEach((a) => (a.currentTime = (d * i) / 24)); const t = as[0].effect.target; const c = getComputedStyle(t); return `${c.opacity}|${c.transform.slice(0, 40)}`; }, i); await page.waitForTimeout(60); const file = `f${String(i).padStart(3, "0")}.png`; await page.screenshot({ path: D + file, clip }); idx.push({ i, file, label: s }); }
  if (Array.isArray(log.F_found)) await page.evaluate(() => window.__tr.forEach((a) => a.play()));
  fs.writeFileSync(D + "index.json", JSON.stringify(idx)); }
await page.waitForTimeout(800);
log.F_after = await geo();
await page.screenshot({ path: OUT + "F-selected-full.png" });
// ---- G: hover preview on a diamond (html2canvas capture) + rail hover
await page.locator('.timeline-track:visible [role=slider]').nth(2).hover({ force: true }); await page.waitForTimeout(2500);
await page.screenshot({ path: OUT + "G-hover-diamond.png", clip: { x: 0, y: 0, width: 720, height: 600 } });
log.G = await page.evaluate(() => { const img = document.querySelector('[role=tooltip] img, [data-reka-popper-content-wrapper] img'); const tip = document.querySelector('[role=tooltip], [data-reka-popper-content-wrapper]'); return { tip: tip?.innerText?.slice(0, 120), img: img && { w: img.naturalWidth, h: img.naturalHeight, src: img.src.slice(0, 30) } }; });
const tb = await track.boundingBox(); await page.mouse.move(tb.x + tb.width * 0.3, tb.y + tb.height - 6); await page.waitForTimeout(1200);
await page.screenshot({ path: OUT + "G-hover-rail.png", clip: { x: 0, y: 0, width: 720, height: 600 } });
await page.mouse.move(1300, 850); await page.waitForTimeout(600);
// ---- H: expand / collapse (real-time screencast), with animationstart log
await page.evaluate(() => (window.__anims = []));
log.H_expand_frames = await screencast("H-expand", 1200, async () => { await page.getByRole("button", { name: "Expand timeline" }).click(); });
log.H_expand_anims = await page.evaluate(() => window.__anims);
await page.mouse.move(1300, 450); await page.waitForTimeout(600);
log.H_expanded = await geo();
await page.screenshot({ path: OUT + "H-expanded-full.png" });
await page.evaluate(() => (window.__anims = []));
log.H_collapse_frames = await screencast("H-collapse", 1200, async () => { await page.getByRole("button", { name: "Collapse timeline" }).first().click(); });
log.H_collapse_anims = await page.evaluate(() => window.__anims);
await page.waitForTimeout(600);
log.H_collapsed = await geo();
await page.screenshot({ path: OUT + "H-collapsed-full.png" });
log.prov1 = prov();
fs.writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
console.log("done");
await browser.close();
