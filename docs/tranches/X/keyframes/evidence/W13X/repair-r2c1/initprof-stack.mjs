// SERVED MODEL: claude-opus-5-5 — Repair 1 (C1r2-3) copy of r4init/initprof.mjs + SEED_KF=1 (both scenes' stored control = Keyframes, so the editor is SHOWN on both sides of the swap) + STACK=1 prints the first monaco sample's call stack (to the first non-monaco frame). Original header: X.KF.W13X.r4init · KFA-76 heavy-scene-init / KFA-81 stall: the swap's first destination frame vs the first vendor-three / vendor-monaco self-time sample, and each swap long-animation-frame's JS self time (CPU profile samples inside the frame). READ-ONLY probe; derived from r4shell/swapprof.mjs.
// Usage: BASE=http://localhost:5397 TO=amiga [COLD=1] [SEL=.amiga-canvas] node initprof.mjs
// Clock alignment: the profile's timestamps are TimeTicks, the page's are performance.now(); a named marker function busy-runs 4 ms at a recorded
// performance.now() right after Profiler.start, and its first sample gives the offset (resolution = the 250 us sampling interval).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import os from "node:os";
const BASE = process.env.BASE || "http://localhost:5397"; const TO = process.env.TO || "amiga"; const COLD = !!process.env.COLD;
const SEL = process.env.SEL || (TO === "amiga" ? ".amiga-canvas" : `[data-scene="${TO}"], .scene-root`);
const WINDOW = Number(process.env.WINDOW || 4000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  if (process.env.SEED_KF) await p.addInitScript(() => { try { localStorage.setItem("animation-groups-control-options-store", JSON.stringify({ _storeTimestamp: Date.now(), cube: { selectedControl: "keyframes" }, amiga: { selectedControl: "keyframes" } })); } catch {} });
  const pageErrors = []; p.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));
  await p.addInitScript(([sel, cold]) => {
    window.__loaf = []; window.__dest = null; window.__armed = cold;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 50) window.__loaf.push({ start: e.startTime, dur: e.duration, renderStart: e.renderStart, blocking: e.blockingDuration, scripts: (e.scripts || []).filter((s) => s.duration > 5).map((s) => `${s.invoker.slice(0, 40)} ${(s.sourceURL || "").replace(/^.*\/\/[^/]+/, "").replace(/\?.*$/, "").slice(-50)} ${Math.round(s.duration)}`) }); }).observe({ type: "long-animation-frame", buffered: true });
    // The first destination frame: the destination subject enters the DOM (insertion), the next rAF is the frame that renders it,
    // and a message posted from that rAF runs after that frame's paint (the after-next-paint idiom).
    const watch = () => new MutationObserver((_, mo) => {
      if (!window.__armed || window.__dest) return; const el = document.querySelector(sel); if (!el) return;
      const ins = performance.now(); window.__dest = { ins };
      requestAnimationFrame((raf) => { window.__dest.raf = raf; const ch = new MessageChannel(); ch.port1.onmessage = () => { window.__dest.painted = performance.now(); }; ch.port2.postMessage(0); });
      mo.disconnect();
    }).observe(document, { childList: true, subtree: true });
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch); else watch();
    window.__kfMarker = function __kfR4initMarker() { const t0 = performance.now(); while (performance.now() - t0 < 4); return t0; };
  }, [SEL, COLD]);
  const cdp = await ctx.newCDPSession(p); await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 250 });
  let t0;
  if (COLD) {
    // Cold entry: the profile spans a reload of #/TO; the marker runs on the OLD document, so the reload's clock is re-based by timeOrigin.
    await p.goto(`${BASE}/#/`); await sleep(1500); await p.goto(`${BASE}/#/${TO}`); await sleep(500);
    await cdp.send("Profiler.start"); const mk = await p.evaluate(() => ({ at: window.__kfMarker(), origin: performance.timeOrigin }));
    await p.reload(); t0 = { mk, origin: await p.evaluate(() => performance.timeOrigin) };
    await sleep(WINDOW);
  } else {
    await p.goto(`${BASE}/#/cube`); await sleep(6000); await p.evaluate(() => { window.__loaf.length = 0; });
    await cdp.send("Profiler.start"); const mk = await p.evaluate(() => ({ at: window.__kfMarker(), origin: performance.timeOrigin }));
    const swapAt = await p.evaluate((t) => { window.__armed = true; const at = performance.now(); location.hash = `#/${t}`; return at; }, TO);
    t0 = { mk, origin: mk.origin, swapAt }; await sleep(WINDOW);
  }
  const { profile } = await cdp.send("Profiler.stop");
  const loaf = await p.evaluate(() => window.__loaf); const dest = await p.evaluate(() => window.__dest);
  // Sample timestamps (ms, profile clock).
  const nodes = new Map(profile.nodes.map((n) => [n.id, n])); let ts = profile.startTime; const samples = [];
  for (let i = 0; i < profile.samples.length; i++) { ts += profile.timeDeltas[i]; const cf = nodes.get(profile.samples[i]).callFrame; samples.push({ id: profile.samples[i], t: ts / 1000, url: (cf.url || "").replace(/^.*\/\/[^/]+/, "").replace(/\?.*$/, ""), fn: cf.functionName, d: (profile.timeDeltas[i + 1] ?? 250) / 1000 }); }
  const parent = new Map(); for (const n of profile.nodes) for (const c of n.children || []) parent.set(c, n.id);
  const stackOf = (id) => { const out = []; for (let k = id; k != null; k = parent.get(k)) { const cf = nodes.get(k).callFrame; if (cf.url || cf.functionName) out.push(`${cf.functionName || "(anon)"}@${(cf.url || "").split("/").pop()}:${cf.lineNumber}:${cf.columnNumber}`); } return out; };
  const mark = samples.find((s) => s.fn === "__kfR4initMarker"); if (!mark) throw new Error("marker not sampled");
  // page clock (this document) = profile clock - offset.
  const offset = mark.t - t0.mk.at + (t0.origin - t0.mk.origin);
  const toPage = (t) => t - offset;
  const swapStart = COLD ? 0 : t0.swapAt;
  const after = samples.filter((s) => toPage(s.t) >= swapStart);
  const first = (re) => { const s = after.find((x) => re.test(x.url)); return s ? toPage(s.t) : null; };
  if (process.env.STACK) { const fm = after.filter((x) => /vendor-monaco|monaco-editor/.test(x.url)).slice(0, 3); for (const s of fm) console.log(`STACK +${Math.round(toPage(s.t) - (COLD ? 0 : t0.swapAt))}: ` + stackOf(s.id).slice(0, 40).join(" < ")); }
  const firstThree = first(/vendor-three|\/three\.module|\/three\//); const firstMonaco = first(/vendor-monaco|monaco-editor/);
  const selfIn = (a, z) => { const m = new Map(); let js = 0; for (const s of after) { const t = toPage(s.t); if (t < a || t > z || !s.url) continue; js += s.d; const f = s.url.split("/").pop().replace(/-[A-Za-z0-9_-]{8}\.js$/, ""); m.set(f, (m.get(f) || 0) + s.d); } return { js, top: [...m].sort((x, y) => y[1] - x[1]).slice(0, 5).map(([k, v]) => `${k} ${v.toFixed(1)}`).join(", ") }; };
  const swapLoaf = loaf.filter((e) => e.start + e.dur >= swapStart).map((e) => ({ start: Math.round(e.start - swapStart), dur: Math.round(e.dur), ...(() => { const r = selfIn(e.start, e.start + e.dur); return { jsSelf: Math.round(r.js), top: r.top }; })(), scripts: e.scripts }));
  const maxSelf = swapLoaf.reduce((m, e) => Math.max(m, e.jsSelf), 0);
  const rel = (v) => (v == null ? "none" : Math.round(v - swapStart));
  // The destination frame's paint: the end of the long-animation-frame whose span holds the destination's rAF (its rendering update
  // closes that frame), else the after-next-paint message (an upper bound: a task queued from the same rAF may run before it).
  const destFrame = dest?.raf == null ? null : loaf.find((e) => e.start <= dest.raf + 0.5 && dest.raf <= e.start + e.dur);
  const painted = destFrame ? destFrame.start + destFrame.dur : (dest?.painted ?? null);
  if (process.env.DEBUG) for (const re of [/vendor-three|three\.module/, /vendor-monaco|monaco-editor/]) console.log(`first samples ${re}: ` + after.filter((x) => re.test(x.url)).slice(0, 6).map((x) => `+${Math.round(toPage(x.t) - swapStart)} ${x.fn || "(anon)"}:${x.url.split("/").pop()}`).join(" | "));
  const orderOk = (v) => (v == null ? "n/a(no sample)" : painted == null ? "RED(no dest frame)" : painted <= v ? "GREEN" : "RED");
  console.log(`${COLD ? "cold #/" : "swap cube->"}${TO} · load ${os.loadavg()[0].toFixed(2)} · pageerrors ${pageErrors.length}${pageErrors.length ? " " + JSON.stringify(pageErrors) : ""}`);
  console.log(`dest(${SEL}) inserted +${rel(dest?.ins)} ms · rAF +${rel(dest?.raf)} · painted +${rel(painted)} ms (${destFrame ? "end of the destination's LoAF" : "after-next-paint message"}; message +${rel(dest?.painted)})`);
  console.log(`first vendor-three sample +${rel(firstThree)} ms -> paint-before-three ${orderOk(firstThree)} · first vendor-monaco sample +${rel(firstMonaco)} ms -> paint-before-monaco ${orderOk(firstMonaco)}`);
  console.log(`swap LoAF>50: ${swapLoaf.length} · max JS self ${maxSelf} ms -> ${maxSelf <= 200 ? "GREEN" : "RED"} (<= 200)`);
  for (const e of swapLoaf) console.log(`  +${e.start} dur ${e.dur} jsSelf ${e.jsSelf} [${e.top}] ${JSON.stringify(e.scripts)}`);
  const winSelf = selfIn(swapStart, swapStart + WINDOW); console.log(`window JS self ${winSelf.js.toFixed(1)} ms [${winSelf.top}] · marker offset resolution 0.25 ms`);
} finally { await b.close(); }
