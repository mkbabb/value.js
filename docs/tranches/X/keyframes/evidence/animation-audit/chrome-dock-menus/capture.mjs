// chrome-dock-menus — frame-by-frame audit (method 1: WAAPI/CSS; timeline frozen via
// CDP Animation.setPlaybackRate(0) BEFORE the open/close gesture, then every
// document.getAnimations() entry seeked to N evenly spaced times).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => ({
  head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(),
  dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(),
  at: new Date().toISOString(),
});
const ONLY = process.argv[2];
const N = 48;
const results = {};

const raf2 = `new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`;

async function fresh(b, hash = "") {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
  await p.goto("http://localhost:5173/" + hash, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send("Animation.enable");
  return { p, cdp, errors };
}
async function expandDock(p) {
  await p.mouse.move(720, 71);
  await p.waitForTimeout(1300);
  return p.evaluate(() => document.querySelector('[data-dock-tether="top"] .glass-dock').className);
}
async function dockBox(p) {
  return p.evaluate(() => document.querySelector('[data-dock-tether="top"] .glass-dock').getBoundingClientRect().toJSON());
}

// Snapshot all running animations into window.__anims (finite ones only).
async function listAnims(p) {
  return p.evaluate(() => {
    const d = (el) => {
      if (!el) return "?";
      const t = el.nodeType === 1 ? el : el.parentElement;
      const c = (t.getAttribute("class") || "").split(/\s+/).slice(0, 4).join(".");
      return `${t.tagName.toLowerCase()}${t.id ? "#" + t.id : ""}.${c}[${t.getAttribute("data-state") || ""}${t.getAttribute("role") ? " role=" + t.getAttribute("role") : ""}${t.getAttribute("aria-label") ? " al=" + t.getAttribute("aria-label").slice(0, 20) : ""}]`;
    };
    const all = document.getAnimations();
    window.__anims = all.filter((a) => Number.isFinite(a.effect?.getComputedTiming().endTime));
    return all.map((a) => {
      const ct = a.effect?.getComputedTiming() || {};
      return {
        kind: a.constructor.name,
        name: a.animationName || a.transitionProperty || a.id || "",
        target: d(a.effect?.target) + (a.effect?.pseudoElement || ""),
        duration: ct.duration, delay: ct.delay, endTime: ct.endTime, easing: (ct.easing || "").slice(0, 60),
        iterations: ct.iterations, currentTime: a.currentTime, playState: a.playState,
      };
    });
  });
}
async function seekAll(p, t) {
  await p.evaluate(async (t) => {
    for (const a of window.__anims || []) {
      const e = a.effect.getComputedTiming().endTime;
      try { a.currentTime = Math.min(t, e - 0.01); } catch {}
    }
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, t);
}
async function sample(p, sel) {
  return p.evaluate((sel) => {
    const pick = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { st: el.getAttribute("data-state"), side: el.getAttribute("data-side"), op: cs.opacity, scale: cs.scale, tr: cs.translate, tf: cs.transform === "none" ? "none" : cs.transform.slice(0, 50), filter: cs.filter, z: cs.zIndex, blend: cs.mixBlendMode, bdf: cs.backdropFilter.slice(0, 40), x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    };
    const content = sel.content ? [...document.querySelectorAll(sel.content)].filter((e) => e.isConnected).at(-1) : null;
    const wrap = content?.closest("[data-reka-popper-content-wrapper]");
    const dock = document.querySelector('[data-dock-tether="top"] .glass-dock');
    const overlay = sel.overlay ? document.querySelector(sel.overlay) : null;
    return { content: pick(content), wrapZ: wrap ? getComputedStyle(wrap).zIndex : null, overlay: pick(overlay), dock: dock.className.includes("collapsed") ? "collapsed" : "expanded", dockW: +dock.getBoundingClientRect().width.toFixed(1), extra: sel.extra ? [...document.querySelectorAll(sel.extra)].map(pick) : null };
  }, sel);
}
function unionClip(a, b, m = 24) {
  const x = Math.max(0, Math.min(a.x, b.x) - m), y = Math.max(0, Math.min(a.y, b.y) - m);
  const r = Math.min(1440, Math.max(a.x + a.width, b.x + b.width) + m), bt = Math.min(900, Math.max(a.y + a.height, b.y + b.height) + m);
  return { x: Math.floor(x), y: Math.floor(y), width: Math.ceil(r - x), height: Math.ceil(bt - y) };
}

// One phase (open or close): freeze, act, list, seek N frames, screenshot each.
async function phase(p, cdp, name, act, sel, clipFn) {
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 0 });
  await act();
  await p.waitForTimeout(300);
  const anims = await listAnims(p);
  const finite = anims.filter((a) => Number.isFinite(a.endTime));
  const T = Math.min(3000, Math.max(0, ...finite.map((a) => a.endTime)));
  // determine clip at mid + end
  await seekAll(p, T * 0.999);
  const clip = await clipFn();
  const dir = `${OUT}${name}`;
  fs.mkdirSync(dir, { recursive: true });
  const frames = [];
  for (let i = 0; i < N; i++) {
    const t = (T * i) / (N - 1);
    await seekAll(p, t);
    const s = await sample(p, sel);
    const file = `${dir}/f${String(i).padStart(2, "0")}.png`;
    await p.screenshot({ path: file, clip, animations: "allow" });
    frames.push({ i, t: +t.toFixed(1), ...s });
  }
  // let it finish
  await p.evaluate(() => { for (const a of window.__anims || []) try { a.finish(); } catch {} });
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
  await p.waitForTimeout(600);
  return { T, clip, anims, frames, k: khead() };
}

// Live: rAF deltas over 3 s around a real open/close, + dock-hold test with the
// pointer resting on the portalled content for 4 s.
async function live(p, openAct, closeAct, sel, name) {
  await p.evaluate(() => { window.__d = []; let last = performance.now(); const f = (t) => { window.__d.push(t - last); last = t; if (window.__d.length < 400) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await p.waitForTimeout(300);
  await openAct();
  await p.waitForTimeout(600);
  // move pointer onto the content (off the dock)
  const cb = await p.evaluate((sel) => { const e = [...document.querySelectorAll(sel.content)].at(-1); return e ? e.getBoundingClientRect().toJSON() : null; }, sel);
  if (cb) await p.mouse.move(cb.x + cb.width / 2, cb.y + cb.height - 12, { steps: 6 });
  const hold = [];
  const dir = `${OUT}${name}/live`; fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < 18; i++) { // 4.5 s
    const s = await sample(p, sel);
    hold.push({ ms: i * 250, dock: s.dock, dockW: s.dockW, contentState: s.content?.st ?? null, cx: s.content?.x, cy: s.content?.y });
    if (i % 4 === 0) await p.screenshot({ path: `${dir}/hold-${String(i * 250).padStart(4, "0")}ms.png`, clip: { x: 0, y: 0, width: 1440, height: 520 } });
    await p.waitForTimeout(250);
  }
  await closeAct();
  await p.waitForTimeout(800);
  const d = await p.evaluate(() => window.__d.slice(1));
  const over = d.filter((x) => x > 20);
  return { hold, rafFrames: d.length, rafOver20: over.length, rafMax: +Math.max(...d).toFixed(1), rafOverList: over.slice(0, 12).map((x) => +x.toFixed(1)) };
}

const b = await chromium.launch({ headless: false });
const SEL_POP = { content: ".glass-reveal[data-state]" };
const esc = (p) => async () => p.keyboard.press("Escape");

const cases = {
  "scene-select": { hash: "", trig: '[data-dock-tether="top"] .glass-dock [aria-label="Scene"][role=combobox], [data-dock-tether="top"] .glass-dock button[aria-label="Scene"]:not([inert] *)' },
  "controls-select": { hash: "#/cube", trig: '[aria-label="Controls tab"]' },
  "mbabb-menu": { hash: "", trig: '[aria-label="@mbabb menu"]' },
  "share-popover": { hash: "", trig: '[data-dock-tether="top"] .glass-dock [aria-label="Share animation"]' },
  "shortcuts-modal": { hash: "", trig: '[aria-label="Show keyboard shortcuts"]', dialog: true },
};

for (const [name, c] of Object.entries(cases)) {
  if (ONLY && ONLY !== name) continue;
  const { p, cdp, errors } = await fresh(b, c.hash);
  const r = { k0: khead(), dockAfterHover: await expandDock(p) };
  const trig = p.locator(c.trig).first();
  r.trigFound = await trig.count();
  if (!r.trigFound) { results[name] = r; await p.close(); continue; }
  const sel = c.dialog ? { content: '[role=dialog]', overlay: ".fixed.inset-0.z-overlay" } : SEL_POP;
  const clipFn = async () => {
    if (c.dialog) return { x: 0, y: 0, width: 1440, height: 900 };
    const cb = await p.evaluate((s) => { const e = [...document.querySelectorAll(s)].at(-1); return e ? e.getBoundingClientRect().toJSON() : null; }, sel.content);
    return unionClip(await dockBox(p), cb || (await dockBox(p)), 40);
  };
  r.open = await phase(p, cdp, `${name}/open`, () => trig.click(), sel, clipFn);
  r.close = await phase(p, cdp, `${name}/close`, esc(p), sel, async () => r.open.clip);
  r.errors = errors;
  // post-capture state of the dock (did the frozen-timeline capture leave it usable?)
  r.postCapture = await p.evaluate(() => { const d = document.querySelector('[data-dock-tether="top"] .glass-dock'); return d.className; });
  await p.close();
  // live pass on a FRESH page (no frozen-timeline residue)
  const L = await fresh(b, c.hash);
  await expandDock(L.p);
  const trig2 = L.p.locator(c.trig).first();
  try { r.live = await live(L.p, () => trig2.click({ timeout: 5000 }), esc(L.p), sel, name); } catch (e) { r.live = { error: String(e).slice(0, 300) }; }
  r.liveErrors = L.errors;
  results[name] = r;
  await L.p.close();
}

// Menu-nested: Share-from-menu and Clear-all dialog
for (const name of ["mbabb-share", "clear-all-dialog"]) {
  if (ONLY && ONLY !== name) continue;
  const { p, cdp, errors } = await fresh(b);
  const r = { k0: khead(), dockAfterHover: await expandDock(p) };
  await p.locator('[aria-label="@mbabb menu"]').click();
  await p.waitForTimeout(900);
  if (name === "mbabb-share") {
    const sel = { content: ".glass-reveal[data-state]", extra: ".glass-reveal[data-state]" };
    const trig = p.locator('[role=menu] [aria-label="Share animation"]').first();
    r.trigFound = await trig.count();
    const clipFn = async () => {
      const bs = await p.evaluate(() => [...document.querySelectorAll(".glass-reveal[data-state]")].map((e) => e.getBoundingClientRect().toJSON()));
      let u = await dockBox(p); for (const x of bs) u = unionClip(u, x, 0); return unionClip(u, u, 30);
    };
    r.open = await phase(p, cdp, `${name}/open`, () => trig.click(), sel, clipFn);
    r.close = await phase(p, cdp, `${name}/close`, esc(p), sel, async () => r.open.clip);
  } else {
    const sel = { content: "[role=dialog]", overlay: ".fixed.inset-0.z-overlay", extra: ".glass-reveal[data-state]" };
    const full = async () => ({ x: 0, y: 0, width: 1440, height: 900 });
    r.open = await phase(p, cdp, `${name}/open`, () => p.locator('[role=menuitem]:has-text("Clear all")').click(), sel, full);
    r.close = await phase(p, cdp, `${name}/close`, () => p.locator('[role=dialog] button:has-text("Cancel")').click(), sel, full);
    r.after = await sample(p, sel);
  }
  r.errors = errors;
  results[name] = r;
  await p.close();
}

// DarkModeToggle icon swap (dock) — light→dark and back.
if (!ONLY || ONLY === "darkmode-toggle") {
  const { p, cdp, errors } = await fresh(b);
  const r = { k0: khead(), dockAfterHover: await expandDock(p) };
  const t = p.locator('[data-dock-tether="top"] .glass-dock button[aria-label*="mode"]').first();
  const sel = { content: '[data-dock-tether="top"] .glass-dock button[aria-label*="mode"]', extra: '[data-dock-tether="top"] .glass-dock button[aria-label*="mode"] svg' };
  const clipFn = async () => unionClip(await dockBox(p), await dockBox(p), 30);
  r.toDark = await phase(p, cdp, "darkmode-toggle/to-dark", () => t.click(), sel, clipFn);
  await p.waitForTimeout(800);
  r.toLight = await phase(p, cdp, "darkmode-toggle/to-light", () => t.click(), sel, clipFn);
  r.errors = errors;
  results["darkmode-toggle"] = r;
  await p.close();
}
await b.close();
const f = `${OUT}capture${ONLY ? "-" + ONLY : ""}.json`;
fs.writeFileSync(f, JSON.stringify(results, null, 1));
console.log("wrote", f);
