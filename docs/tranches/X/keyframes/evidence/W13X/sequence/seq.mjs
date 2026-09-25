// SERVED MODEL: claude-opus-5-5 — KF.W13X.sequence · the Sequence scene, served. READ-ONLY probe.
// Usage: BASE=http://localhost:5199 TAG=after RUN=1 [VPS=..] [THEMES=..] [TIMING=1] node seq.mjs  → <TAG>-r<RUN>.json
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { PNG } from "/Users/mkbabb/Programming/keyframes.js/node_modules/pngjs/lib/png.js";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const FR = OUT + "frames/"; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5199";
const TAG = process.env.TAG || "before"; const RUN = process.env.RUN || "1";
const VPS = (process.env.VPS || "1440x900,390x844").split(","); const THEMES = (process.env.THEMES || "light,dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const rows = [];
// Static read of the stage: timing marks on the stage, playhead/axis geometry, header, plate, rails, balls.
const measure = () => {
  const R = (e) => { const r = e.getBoundingClientRect(); return { x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), r: +r.right.toFixed(1), b: +r.bottom.toFixed(1) }; };
  const card = document.querySelector(".seq-target"); if (!card) return { err: "no .seq-target" };
  const stage = card.querySelector(".seq-stage");
  const o = { vw: innerWidth, card: R(card) };
  o.axes = card.querySelectorAll(".seq-axis").length; o.playheads = card.querySelectorAll(".seq-playhead-track").length;
  o.msLabels = [...card.querySelectorAll(".seq-stage *")].filter((e) => e.children.length === 0 && /\d+\s*ms/.test(e.textContent || "")).length;
  o.inlineEditors = card.querySelectorAll('[role="slider"]').length;
  const tracks = [...card.querySelectorAll(".seq-track")]; o.track = tracks[0] ? R(tracks[0]) : null;
  const ph = card.querySelector(".seq-playhead-track"); const rowsEl = card.querySelector(".seq-rows"); const axis = card.querySelector(".seq-axis");
  if (ph) { o.playhead = R(ph); o.rowsBlock = R(rowsEl); o.phCoversRows = o.playhead.y <= o.rowsBlock.y + 1 && o.playhead.b >= o.rowsBlock.b - 1; o.phWidthMinusTrack = +(o.playhead.w - o.track.w).toFixed(1);
    const head = card.querySelector(".seq-playhead"); const hr = head.getBoundingClientRect(); const headTop = hr.top - 3;
    o.phOverLabels = axis ? [...axis.querySelectorAll("*")].filter((e) => e.children.length === 0 && (e.textContent || "").trim()).filter((e) => { const r = e.getBoundingClientRect(); return hr.left + 5 > r.left && hr.left - 5 < r.right && headTop < r.bottom && hr.bottom > r.top; }).map((e) => e.textContent.trim()) : []; }
  const hdr = card.firstElementChild; o.header = R(hdr); const h2 = hdr.querySelector("h2");
  // Lines = distinct row bands among the header's visible leaf boxes (title, readout, reel).
  const tops = [...hdr.querySelectorAll("h2, [data-readout], button")].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0).map((r) => (r.top + r.bottom) / 2).sort((a, c) => a - c);
  o.headerLines = tops.reduce((n, t, i) => (i && t - tops[i - 1] > 12 ? n + 1 : n), tops.length ? 1 : 0);
  o.badge = !!hdr.querySelector('[role="status"]'); o.headerText = (hdr.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
  const ss = getComputedStyle(stage); o.plate = { radius: ss.borderTopLeftRadius, border: ss.borderTopWidth + " " + ss.borderTopStyle, bg: ss.backgroundImage.slice(0, 40) };
  const rail = card.querySelector(".seq-track .progress-rail"); o.railBg = rail ? getComputedStyle(rail).backgroundColor : null;
  const balls = [...card.querySelectorAll(".seq-ball")];
  o.balls = balls.map((e, i) => { const r = e.getBoundingClientRect(); const t = tracks[i].getBoundingClientRect(); const row = tracks[i].closest(".seq-row");
    return { i, cx: +((r.left + r.right) / 2 - t.left).toFixed(1), tw: +t.width.toFixed(1), rs: +getComputedStyle(row).getPropertyValue("--row-start"), p: +(e.style.getPropertyValue("--ball-p") || 0) }; });
  o.docSH = document.scrollingElement.scrollHeight; o.vh = innerHeight;
  return o;
};
// Clicks hover first and let the transport dock settle: a collapsed dock expands under the press, and the
// press-origin guard then refuses a pointerup that lands on the neighbour (observed; routed to .transport).
// Per-rAF sampler: every ball's centre (relative to its track), --ball-p, card rect, busy + status + transport verb.
const sample = (ms) => new Promise((res) => {
  const card = document.querySelector(".seq-target"); const balls = [...card.querySelectorAll(".seq-ball")]; const tracks = [...card.querySelectorAll(".seq-track")];
  const verb = () => [...document.querySelectorAll("button[aria-label]")].map((e) => e.getAttribute("aria-label")).find((l) => /^(Play|Pause) animation/.test(l)) || null;
  const t0 = performance.now(); const s = [];
  const step = () => { const cr = card.getBoundingClientRect();
    s.push({ t: Math.round(performance.now() - t0), cx: +cr.left.toFixed(1), cy: +cr.top.toFixed(1), ch: +cr.height.toFixed(1), cardR: +cr.right.toFixed(1),
      b: balls.map((e, i) => { const r = e.getBoundingClientRect(); return [+((r.left + r.right) / 2 - tracks[i].getBoundingClientRect().left).toFixed(1), +(+(e.style.getPropertyValue("--ball-p") || 0)).toFixed(4), +r.right.toFixed(1)]; }),
      busy: card.querySelector('[aria-busy="true"]') ? 1 : 0, clk: parseInt((card.querySelector("[data-readout=primary]")?.textContent || "").replace(/\D+/g, ""), 10), st: (card.querySelector('[role="status"]')?.textContent || "").trim(), v: verb(), pow: card.querySelector(".is-powering-on") ? 1 : 0 });
    if (performance.now() - t0 < ms) requestAnimationFrame(step); else res(s); };
  requestAnimationFrame(step); });
const stats = (s) => { const out = { plateauMs: 0, maxJumpPx: 0, backJumpPx: 0, maxOverCardPx: -1e9 };
  for (let k = 0; k < 5; k++) { let run = 0, t0 = null;
    for (let i = 1; i < s.length; i++) { const [x1, p1, r1] = s[i].b[k], [x0, p0] = s[i - 1].b[k]; const dx = x1 - x0;
      out.maxJumpPx = Math.max(out.maxJumpPx, Math.abs(dx)); out.backJumpPx = Math.min(out.backJumpPx, dx); out.maxOverCardPx = Math.max(out.maxOverCardPx, r1 - s[i].cardR);
      if (Math.abs(p1 - p0) < 1e-4 && p1 > 0.05 && p1 < 0.95) { if (t0 === null) t0 = s[i - 1].t; out.plateauMs = Math.max(out.plateauMs, s[i].t - t0); } else t0 = null; } }
  for (const k of Object.keys(out)) out[k] = +out[k].toFixed(1); return out; };
const click = async (p, re) => { const loc = p.locator("button[aria-label]").filter({ has: p.locator(":scope") }); const n = await p.locator("button[aria-label]").count();
  for (let i = 0; i < n; i++) { const e = p.locator("button[aria-label]").nth(i); const l = await e.getAttribute("aria-label"); if (re.test(l || "") && (await e.isVisible())) { await e.hover({ timeout: 4000 }); await sleep(450); await e.click({ timeout: 4000 }); return l; } } return null; };
const png = (buf) => PNG.sync.read(buf);
const diffPx = (a, c) => { const A = png(a), C = png(c); if (A.width !== C.width || A.height !== C.height) return "size"; let n = 0, any = 0; for (let i = 0; i < A.data.length; i += 4) { const d = Math.abs(A.data[i] - C.data[i]) + Math.abs(A.data[i + 1] - C.data[i + 1]) + Math.abs(A.data[i + 2] - C.data[i + 2]); if (d > 0) any++; if (d > 24) n++; } return { gt24: n, any }; };
for (const theme of process.env.ONLYNAV ? [] : THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); const row = { vp: vpS, theme }; const tag = `${TAG}-${vpS}-${theme}-r${RUN}`;
  try {
    await p.goto(`${BASE}/#/sequence`); await p.waitForSelector(".seq-target .seq-ball", { timeout: 60000 });
    if (process.env.TIMING && vpS === "1440x900" && theme === "light") { // KFA-161: end-of-boot fill vs rest, same pixels
      try { await p.waitForSelector(".is-powering-on", { timeout: 3000 });
        await p.evaluate(() => { for (const a of document.getAnimations()) { try { a.finish(); } catch {} } });
        const st = p.locator(".seq-stage"); const A = await st.screenshot(); const stillOn = await p.evaluate(() => !!document.querySelector(".is-powering-on"));
        await p.waitForFunction(() => !document.querySelector(".is-powering-on"), null, { timeout: 5000 }); await sleep(300); const C = await st.screenshot();
        row.bootRaster = { stillOnAtA: stillOn, diffPx: diffPx(A, C) }; } catch (e) { row.bootRaster = { err: String(e).slice(0, 120) }; } }
    await sleep(2200);
    row.rest = await p.evaluate(measure); await p.screenshot({ path: `${FR}${tag}-rest.jpg`, type: "jpeg", quality: 70 });
    // Play from 0 through the natural end (KFA-47 plateau, UIA-KF-211 card shift, UIA-KF-214 end positions).
    await click(p, /^Play animation/); const play = await p.evaluate(sample, 2700); row.play = stats(play);
    row.play.cardYSpread = +(Math.max(...play.map((x) => x.cy)) - Math.min(...play.map((x) => x.cy))).toFixed(1); row.play.cardHSpread = +(Math.max(...play.map((x) => x.ch)) - Math.min(...play.map((x) => x.ch))).toFixed(1);
    row.play.row1p = play.filter((_, i) => i % 3 === 0).map((x) => x.b[0][1]).slice(0, 60);
    row.end = await p.evaluate(measure); await p.screenshot({ path: `${FR}${tag}-end.jpg`, type: "jpeg", quality: 70 });
    if (process.env.TIMING && vpS === "1440x900") {
      await click(p, /^Play animation/); const fresh = await p.evaluate(sample, 400); row.freshFromEnd = stats(fresh); await sleep(600); await click(p, /^Pause animation/); await sleep(400); // KFA-160
      row.midBeforeReel = await p.evaluate(measure);
      await click(p, /Play the reel/); const reel = await p.evaluate(sample, 3200); row.reelMid = stats(reel); row.reelMid.busyFrames = reel.filter((x) => x.busy).length; // KFA-48/107/108
      row.reelMid.endVsBefore = (await p.evaluate(measure)).balls.map((x, i) => +(x.cx - row.midBeforeReel.balls[i].cx).toFixed(1));
      await p.screenshot({ path: `${FR}${tag}-after-reel.jpg`, type: "jpeg", quality: 70 });
      // KFA-162 / KFA-220: reel fired while the master plays.
      await click(p, /^Reset animation/); await sleep(400); await click(p, /^Play animation/); await sleep(250);
      await click(p, /Play the reel/); const rp = await p.evaluate(sample, 3400);
      row.reelWhilePlaying = { statusDuringReel: [...new Set(rp.filter((x) => x.busy).map((x) => x.st))], busyFrames: rp.filter((x) => x.busy).length, verbAfter: rp[rp.length - 1].v };
      { const k = rp.findIndex((x, i) => i > 0 && rp[i - 1].busy && !x.busy); const at = k >= 0 ? rp[k] : null; const later = at ? rp.find((x) => x.t >= at.t + 300) : null;
        Object.assign(row.reelWhilePlaying, { clockDuringReel: [...new Set(rp.filter((x) => x.busy).map((x) => x.clk))].slice(0, 4), verbAtSettle: at?.v ?? null, clockAtSettle: at?.clk ?? null, clock300msLater: later?.clk ?? null, resumed: !!(at && later && later.clk > at.clk) }); }
    }
  } catch (e) { row.err = String(e).slice(0, 200); }
  rows.push(row); console.log(JSON.stringify({ vp: vpS, theme, err: row.err, rest: row.rest && { axes: row.rest.axes, playheads: row.rest.playheads, msLabels: row.rest.msLabels } }));
  await ctx.close();
}
// KFA-106 / KFA-190: arrive from #/cube through the dock's scene select; the card's x per frame vs the boot.
if (process.env.TIMING) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" }); const p = await ctx.newPage(); const nav = { vp: "1440x900", theme: "light", scenario: "cube->sequence" };
  try { await p.goto(`${BASE}/#/cube`); await sleep(3500);
    // The scene change the dock's select performs is a route change; drive the route (the select's own
    // trigger is ambiguous under two "Scene" buttons at this width), so the measured swap is the same.
    const t0 = Date.now(); await p.evaluate(() => { location.hash = "#/sequence"; });
    const s = await p.evaluate(() => new Promise((res) => { const s = []; const t0 = performance.now(); const step = () => { const c = document.querySelector(".seq-target"); const sk = document.querySelector("[data-scene-skeleton], .scene-skeleton, [aria-busy='true']");
      s.push({ t: Math.round(performance.now() - t0), x: c ? +c.getBoundingClientRect().left.toFixed(1) : null, w: c ? +c.getBoundingClientRect().width.toFixed(1) : null, pow: document.querySelector(".is-powering-on") ? 1 : 0 });
      if (performance.now() - t0 < 2500) requestAnimationFrame(step); else res(s); }; requestAnimationFrame(step); }));
    const withCard = s.filter((x) => x.x !== null); const moving = withCard.filter((x, i) => i > 0 && Math.abs(x.x - withCard[i - 1].x) > 0.5);
    nav.firstCardT = withCard[0]?.t ?? null; nav.xFirst = withCard[0]?.x ?? null; nav.xLast = withCard[withCard.length - 1]?.x ?? null; nav.movingFrames = moving.length; nav.movingWhileBoot = moving.filter((x) => x.pow).length; nav.lastMoveT = moving.length ? moving[moving.length - 1].t : null; nav.clickMs = Date.now() - t0;
  } catch (e) { nav.err = String(e).slice(0, 200); }
  rows.push(nav); console.log(JSON.stringify(nav)); await ctx.close();
}
fs.writeFileSync(`${OUT}${TAG}-r${RUN}.json`, JSON.stringify(rows, null, 1)); await b.close(); console.log("wrote", `${TAG}-r${RUN}.json`);
