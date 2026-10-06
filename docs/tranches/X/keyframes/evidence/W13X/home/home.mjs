// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.home · Home hero, scene-loading skeleton, toasts and copy, served (READ-ONLY falsifier)
// Rows: toasts (critic gap · A2-KE-X-9 · UIA-KF-059 · 100 · 218 · 220) · copy (KFA-63 · 124 · 178 · 179 · 180 · UIA-KF-298 · 301)
//       skeleton (A2-KE-X-10 · UIA-KF-124 · 234 · 231 · KFA-205) · typing dots (KFA-200)
// Usage: BASE=http://localhost:5271 RUN=before-r1 [CFG=dlmt] node home.mjs   (one GREEN/RED/NOTE line per row x config)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import pngjs from "/Users/mkbabb/Programming/keyframes.js/node_modules/pngjs/lib/png.js";
const { PNG } = pngjs;
// mean luminance (0-255) of a clip of a PNG buffer
const meanL = (buf, x0, y0, x1, y1) => { const png = PNG.sync.read(buf); let s = 0, n = 0; for (let y = Math.max(0, Math.round(y0)); y < Math.min(png.height, Math.round(y1)); y++) for (let x = Math.max(0, Math.round(x0)); x < Math.min(png.width, Math.round(x1)); x++) { const i = (y * png.width + x) * 4; s += 0.2126 * png.data[i] + 0.7152 * png.data[i + 1] + 0.0722 * png.data[i + 2]; n++; } return n ? s / n : NaN; };
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5271"; const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = (id, bad, msg) => console.log(`${bad ? "RED  " : "GREEN"} ${id} ${msg}`);
const N = (id, msg) => console.log(`NOTE  ${id} ${msg}`);
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
async function page(route, w, h, theme, prm = "no-preference") {
  const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, reducedMotion: prm, isMobile: touch, hasTouch: touch, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); await p.goto(`${BASE}/#/${route}`); await sleep(3500);
  return { ctx, p };
}
// relative luminance + contrast of two css rgb()/oklch-resolved colours, read through a canvas
const LUM = `(() => { const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d", { willReadFrequently: true });
  const rgba = (c) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = c; g.fillRect(0, 0, 1, 1); const d = g.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = ([r, gg, bb]) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(bb);
  window.__rgba = rgba; window.__cr = (a, c) => { const x = L(rgba(a)), y = L(rgba(c)); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }; })()`;
// the app's own glass toast module instance: the URL the page already loaded (same URL => same singleton)
async function raise(p, opts) {
  return p.evaluate(async (o) => { const u = performance.getEntriesByType("resource").map((e) => e.name).find((n) => /glass-ui_toast\.js/.test(n));
    if (!u) return "no-toast-module"; const m = await import(u); m.toast(o); return "ok"; }, opts);
}
const toastRead = (p) => p.evaluate(() => { const dock = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, r: r.right, b: r.bottom }; };
  const top = dock("[data-dock-tether=top] .glass-dock"), bot = dock("[data-dock-tether=bottom] .glass-dock");
  const hit = (a, c) => c && a.x < c.r && a.r > c.x && a.y < c.b && a.b > c.y;
  return [...document.querySelectorAll('[data-slot="toast"], [data-sonner-toast]')].map((t) => { const r = t.getBoundingClientRect(); const cs = getComputedStyle(t);
    const desc = t.querySelector('[data-description], .text-small, [class*="opacity-90"]'); const btns = [...t.querySelectorAll("button")]; const close = btns.find((x) => /close|dismiss/i.test(x.getAttribute("aria-label") || "") || x.hasAttribute("toast-close")) || null;
    const cr = close?.getBoundingClientRect(); const box = { x: r.x, y: r.y, r: r.right, b: r.bottom };
    return { slot: t.getAttribute("data-slot") || "sonner", tone: t.getAttribute("data-tone") || t.className.match(/\b(success|destructive|info|warning)\b/)?.[0] || null, bg: cs.backgroundColor, fg: cs.color,
      descColor: desc ? getComputedStyle(desc).color : null, x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
      overTop: hit(box, top), overBottom: hit(box, bot), close: !!close, closeOut: cr ? (cr.x < r.x - 0.5 || cr.y < r.y - 0.5 || cr.right > r.right + 0.5 || cr.bottom > r.bottom + 0.5) : null }; }); });
const CFGS = { d: [1440, 900, "light"], k: [1440, 900, "dark"], m: [390, 844, "dark"], l: [390, 844, "light"], t: [1024, 768, "light"] };
const RUNCFG = (process.env.CFG || "dkmlt").split("").map((k) => CFGS[k]);
for (const [w, h, theme] of RUNCFG) {
  const cfg = `${w}x${h}-${theme}`;
  // ── TOASTS: the critic gap, captured and judged (X-9 · 059 · 100 · 218 · 220) ──
  let { ctx, p } = await page("cube", w, h, theme);
  await p.evaluate(LUM);
  const raised = [];
  for (const [tone, title] of [["success", "Keyframe captured at 40%"], ["destructive", "Invalid shared state"], ["info", "URL updated"]])
    raised.push(await raise(p, { title, tone, description: `${tone} description line`, duration: 20000 }));
  await sleep(900);
  const ts = await toastRead(p);
  await p.screenshot({ path: `${FR}toasts-${cfg}.png` });
  if (!ts.length) N("TOAST", `${cfg} no toast rendered (raise: ${raised.join(",")})`);
  else {
    R("UIA-KF-059", ts.some((t) => t.slot !== "toast"), `${cfg} toast roots ${JSON.stringify([...new Set(ts.map((t) => t.slot))])} (glass primitive = 'toast')`);
    const bgs = new Set(ts.map((t) => t.bg)); R("UIA-KF-100", bgs.size < Math.min(3, ts.length), `${cfg} tones ${JSON.stringify(ts.map((t) => t.tone))} · distinct plate colours ${bgs.size}/${ts.length}`);
    const crs = await p.evaluate((ts) => { const body = getComputedStyle(document.body).backgroundColor; const over = (c, g) => { const [r, gg, bb, a] = window.__rgba(c), [R, G, B] = window.__rgba(g); return `rgb(${Math.round(r * a + R * (1 - a))}, ${Math.round(gg * a + G * (1 - a))}, ${Math.round(bb * a + B * (1 - a))})`; };
      return ts.map((t) => { if (!t.descColor) return null; const plate = over(t.bg, body); return +window.__cr(over(t.descColor, plate), plate).toFixed(2); }); }, ts);
    R("UIA-KF-218", crs.some((c) => c == null || c < 4.5), `${cfg} description contrast ${JSON.stringify(crs)}`);
    R("UIA-KF-220", ts.some((t) => !t.close), `${cfg} close control per toast ${JSON.stringify(ts.map((t) => t.close))}`);
    const over = ts.filter((t) => t.overTop || t.overBottom).length, out = ts.filter((t) => t.closeOut).length;
    R("A2-KE-X-9", over > 0 || out > 0, `${cfg} toasts over a dock ${over}/${ts.length} (top ${ts.filter((t) => t.overTop).length} · transport ${ts.filter((t) => t.overBottom).length}) · close outside the plate ${out} · boxes ${JSON.stringify(ts.map((t) => [t.x, t.y, t.w, t.h]))}`);
  }
  await ctx.close();
  // ── COPY: the copy button's confirmation (KFA-63 · 124 · 178 · 179 · 180 · UIA-KF-298 · 301) ──
  ({ ctx, p } = await page("easing", w, h, theme));
  const btn = p.locator('button:has(.clipboard-stack)').first();
  if (!(await btn.count())) N("COPY", `${cfg} no copy button on #/easing`);
  else {
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    const arm = () => p.evaluate(() => { const bt = document.querySelector('button[aria-label="Copy easing literal"], button[aria-label="Copied to clipboard"]');
      const [clip, chk] = bt.querySelectorAll(".clipboard-stack > svg"); const s = []; window.__s = s; const t0 = performance.now(); window.__t0 = t0;
      const tick = () => { s.push({ t: +(performance.now() - t0).toFixed(1), chk: +getComputedStyle(chk).opacity, clip: +getComputedStyle(clip).opacity, chkIn: chk.style.opacity, clipIn: clip.style.opacity,
        label: bt.getAttribute("aria-label"), sc: getComputedStyle(chk).transform }); if (performance.now() - t0 < 3200) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    // first click (cold): KFA-180 · KFA-63 · UIA-KF-298 · KFA-178 · KFA-179
    await arm(); await btn.click(); await sleep(3400);
    const s1 = await p.evaluate(() => window.__s);
    const firstMove = s1.find((x) => x.chk > 0.01);
    R("KFA-180", !firstMove || firstMove.chk >= 0.9, `${cfg} first painted check frame opacity ${firstMove?.chk} at ${firstMove?.t} ms`);
    const at = (ms) => s1.reduce((a, x) => (Math.abs(x.t - ms) < Math.abs(a.t - ms) ? x : a), s1[0]);
    const held = [600, 1000].map((ms) => at(ms).chk);
    R("KFA-63", held.some((o) => o < 0.9) || at(3100).label !== "Copy easing literal", `${cfg} check opacity @600/1000 ms ${JSON.stringify(held)} · label @3100 ms '${at(3100).label}' · check @3100 ${at(3100).chk}`);
    R("UIA-KF-298", at(80).chk > 0.9 && at(80).clip > 0.9 || held.some((o) => o < 0.9), `${cfg} @80 ms check ${at(80).chk} clip ${at(80).clip} · check held ${JSON.stringify(held)}`);
    const inl = s1.flatMap((x) => [x.chkIn, x.clipIn]).filter((v) => v !== "").map(Number);
    R("KFA-178", inl.some((v) => v > 1 || v < 0), `${cfg} inline opacity range [${Math.min(...inl, 1)}, ${Math.max(...inl, 0)}] over ${inl.length} writes`);
    const clipDuring = [600, 1000].map((ms) => at(ms).clip);
    R("KFA-179", clipDuring.some((o) => o > 0.1), `${cfg} clipboard opacity during the copied window ${JSON.stringify(clipDuring)}`);
    await p.screenshot({ path: `${FR}copy-rest-${cfg}.png` });
    // UIA-KF-301 · the confirmation tooltip's surface (hover, click, read)
    await sleep(2600); await btn.hover(); await sleep(700);
    await p.evaluate(() => { const hits = []; window.__tip = hits; const t0 = performance.now(); const tick = () => { for (const e of document.querySelectorAll("[data-reka-popper-content-wrapper] *, [role=tooltip]")) {
        if (e.closest(".sr-only") || e.children.length) continue; if (/copied/i.test(e.textContent || "")) { let o = 1, x = e; while (x && x !== document.body) { o *= +getComputedStyle(x).opacity; x = x.parentElement; } hits.push({ t: +(performance.now() - t0).toFixed(0), text: e.textContent.trim(), o: +o.toFixed(3) }); } }
      if (performance.now() - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    await btn.click(); await sleep(150); await p.screenshot({ path: `${FR}copy-tooltip-${cfg}.png` }); await sleep(900);
    const tipHits = await p.evaluate(() => window.__tip);
    await p.mouse.move(2, 2); await sleep(1500); await btn.hover(); await sleep(900);
    const tip = await p.evaluate(() => { const c = document.querySelector('[data-slot="tooltip-content"]'); if (!c) return null; let e = c, bg = null;
      while (e && e !== document.body) { const v = getComputedStyle(e).backgroundColor; if (!/rgba\(0, 0, 0, 0\)|transparent/.test(v)) { bg = v; break; } e = e.parentElement; } return { text: c.textContent.trim(), bg }; });
    await p.screenshot({ path: `${FR}copy-rehover-${cfg}.png` });
    R("UIA-KF-301", !tip || !tip.bg || /copied/i.test(tip.text), `${cfg} re-hover 2.4 s after the copy: tooltip '${tip?.text}' on surface ${tip?.bg} · 'Copied' frames right after the click ${tipHits.length}`);
    // KFA-124 · a second click during the pulse restarts the feedback
    await sleep(2500); await arm(); await btn.click(); await sleep(80); const c2 = await p.evaluate(() => performance.now() - window.__t0); await btn.click(); await sleep(700);
    const s2 = await p.evaluate(() => window.__s); const k = s2.findIndex((x) => x.t > c2);
    const m = s2.findIndex((x, i) => i >= k && x.chk < 0.5); const rise = m >= 0 && s2.slice(m).some((x) => x.chk >= 0.9);
    R("KFA-124", !rise, `${cfg} second click @${c2.toFixed(0)} ms: after it the check dips to ${m >= 0 ? s2[m].chk + " @" + s2[m].t + " ms" : "never < 0.5"} and re-enters to >= 0.9: ${rise}`);
  }
  await ctx.close();
  // ── SKELETON: the scene-loading fallback, amiga chunk held (A2-KE-X-10 · UIA-KF-124 · 234 · 231 · KFA-205) ──
  ({ ctx, p } = await page("", w, h, theme));
  await p.route(/\/scenes\/amiga\//, async (r) => { await sleep(6000); await r.continue().catch(() => {}); });
  await p.goto(`${BASE}/#/amiga`); await sleep(1500);
  await p.evaluate(LUM);
  const sk = await p.evaluate(() => { const root = document.querySelector(".scene-skeleton"); if (!root) return null;
    const body = getComputedStyle(document.body).backgroundColor; const over = (c) => { const [r, g, b, a] = window.__rgba(c), [R, G, B] = window.__rgba(body); return `rgb(${Math.round(r * a + R * (1 - a))}, ${Math.round(g * a + G * (1 - a))}, ${Math.round(b * a + B * (1 - a))})`; };
    const plate = root.querySelector(".scene-skeleton__plate") || root; const sheen = root.querySelector('[data-slot="skeleton"], .scene-skeleton__sheen');
    const pc = getComputedStyle(plate), sc = sheen ? getComputedStyle(sheen) : null; const pr = plate.getBoundingClientRect(), sr = sheen?.getBoundingClientRect();
    const dock = (sel) => { const e = document.querySelector(sel); return e ? e.getBoundingClientRect() : null; }; const hit = (a, c) => c && a.x < c.right && a.right > c.x && a.y < c.bottom && a.bottom > c.y;
    const ring = [pc.borderTopColor, (pc.boxShadow.match(/(rgba?|oklch|oklab|color)\([^)]*\)/) || [null])[0], pc.outlineColor].filter(Boolean);
    return { plateCard: plate.getAttribute("data-slot") === "card" || /glass/.test(plate.className), plateBg: pc.backgroundColor, plateAlpha: window.__rgba(pc.backgroundColor)[3],
      bw: parseFloat(pc.borderTopWidth) || 0, ringCR: Math.max(1, ...ring.map((c) => window.__cr(over(c), body))), fillCR: Math.max(window.__cr(over(pc.backgroundColor), body), sc ? window.__cr(over(sc.backgroundColor), body) : 1),
      sheenCover: sr ? (sr.width * sr.height) / Math.max(1, pr.width * pr.height) : 0, sheenAlpha: sc ? window.__rgba(sc.backgroundColor)[3] : 0,
      box: [pr.x, pr.y, pr.width, pr.height].map((v) => +v.toFixed(1)), overTop: !!hit(pr, dock("[data-dock-tether=top] .glass-dock")), overBottom: !!hit(pr, dock("[data-dock-tether=bottom] .glass-dock")) }; });
  const shot = await p.screenshot({ path: `${FR}skeleton-${cfg}.png` });
  let dL = NaN; if (sk) { const [x, y, ww, hh] = sk.box; const inside = meanL(shot, x + 8, y + 8, x + ww - 8, y + hh - 8); const ground = meanL(shot, 0, y + 8, Math.max(1, x - 6), y + hh - 8); dL = inside - ground; }
  if (!sk) { N("KFA-205", `${cfg} no .scene-skeleton while the amiga chunk is held`); }
  else {
    R("A2-KE-X-10", !(Math.abs(dL) >= 8), `${cfg} skeleton region vs the ground beside it: mean luminance delta ${dL.toFixed(1)} levels (visible >= 8) · box ${JSON.stringify(sk.box)}`);
    R("KFA-205", !(Math.abs(dL) >= 8), `${cfg} a loading indicator is painted while the chunk loads: ${Math.abs(dL) >= 8}`);
    R("UIA-KF-124", sk.plateCard && sk.plateAlpha >= 0.3, `${cfg} plate is a glass card ${sk.plateCard} · plate fill ${sk.plateBg} (alpha ${sk.plateAlpha.toFixed(2)})`);
    R("UIA-KF-234", sk.sheenCover >= 0.95 && sk.sheenAlpha >= 0.5, `${cfg} sheen covers ${(sk.sheenCover * 100).toFixed(1)} % of the plate at alpha ${sk.sheenAlpha.toFixed(2)}`);
    if (w < 1024) R("UIA-KF-231", sk.overTop || sk.overBottom, `${cfg} skeleton box ${JSON.stringify(sk.box)} over top dock ${sk.overTop} · over transport ${sk.overBottom}`);
  }
  await ctx.close();
  // ── TYPING DOTS: one step quantum for the march (KFA-200) ──
  if (w === 1440 && theme === "light") {
    ({ ctx, p } = await page("", w, h, theme));
    const ch = await p.evaluate(() => new Promise((res) => { const d = [...document.querySelectorAll(".typing-dot")]; if (!d.length) return res(null); const prev = d.map(() => null); const frames = []; const t0 = performance.now();
      const tick = () => { const now = performance.now() - t0; const changed = d.map((e, i) => { const o = getComputedStyle(e).opacity; const c = prev[i] != null && o !== prev[i]; prev[i] = o; return c; });
        if (changed.some(Boolean)) frames.push({ t: +now.toFixed(1), who: changed.map((c, i) => (c ? i : -1)).filter((i) => i >= 0) }); if (now < 4800) requestAnimationFrame(tick); else res(frames); }; requestAnimationFrame(tick); }));
    if (!ch) N("KFA-200", `${cfg} no .typing-dot on home`);
    else { const multi = ch.filter((f) => f.who.length > 1).length; const ticks = 4800 / 150;
      N("KFA-200/KFA-28", `${cfg} served dot opacity changes: the WAAPI lane bakes steps(4) into linear ramps (KFA-28), so the step quantum is unreadable on the page; KFA-200 is judged by test/demo/instrument/typing-dots-quantum.test.ts. distinct change frames ${ch.length} over 4.8 s (one shared 150 ms grid = ${ticks}) · frames where >1 dot steps together ${multi}`); }
    await ctx.close();
  }
}
await b.close();
