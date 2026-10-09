// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4shell · the home start screen, served (READ-ONLY measurement)
// Rows: UIA-KF-065 (390: deck/hint printed on the cube) · UIA-KF-121 (390: dead upper band) · UIA-KF-066 (a drag never dismisses the start screen) · UIA-KF-123 (after a drag the copy names a list that is not shown)
// Usage: BASE=http://localhost:5393 RUN=before-r1 node shell.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import os from "node:os";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5393"; const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = (id, bad, msg) => console.log(`${bad ? "RED  " : "GREEN"} ${id} ${msg}`);
console.log(`load ${os.loadavg()[0].toFixed(2)} · ${RUN}`);
const b = await chromium.launch({ channel: "chrome", headless: true });
const read = (p) => p.evaluate(() => {
  const vis = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width && r.height && s.visibility !== "hidden" && +s.opacity > 0.05 ? [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(1)) : null; };
  const cube = document.querySelector(".cube"); const faces = [...document.querySelectorAll(".cube .face, .cube > *")];
  let cb = null; for (const f of [cube, ...faces]) { const r = f?.getBoundingClientRect(); if (!r || !r.width) continue; cb = cb ? [Math.min(cb[0], r.x), Math.min(cb[1], r.y), Math.max(cb[2], r.right), Math.max(cb[3], r.bottom)] : [r.x, r.y, r.right, r.bottom]; }
  const dockTop = document.querySelector("[data-dock-tether=top]")?.getBoundingClientRect();
  const dockBot = document.querySelector("[data-dock-tether=bottom]")?.getBoundingClientRect();
  const list = document.querySelector('[data-dock-tether=bottom] [aria-label="Select animation"]');
  return { hero: !!document.querySelector(".hero-band"), h1: vis(document.querySelector(".hero-display")), deck: vis(document.querySelector(".hero-deck")), hint: vis(document.querySelector(".hero-hint")),
    deckText: document.querySelector(".hero-deck")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
    cube: cb && [cb[0], cb[1], cb[2] - cb[0], cb[3] - cb[1]].map((v) => +v.toFixed(1)), dockTopBottom: dockTop ? +dockTop.bottom.toFixed(1) : null, dockBotTop: dockBot ? +dockBot.top.toFixed(1) : null,
    listShown: !!vis(list), H: innerHeight }; });
const inter = (a, c) => { if (!a || !c) return 0; const w = Math.min(a[0] + a[2], c[0] + c[2]) - Math.max(a[0], c[0]); const h = Math.min(a[1] + a[3], c[1] + c[3]) - Math.max(a[1], c[1]); return w > 0 && h > 0 ? +(w * h).toFixed(0) : 0; };
// the largest vertical band between the top dock and the bottom dock that holds none of h1 · cube · deck · hint
const deadBand = (s) => { const top = s.dockTopBottom ?? 0, bot = s.dockBotTop ?? s.H; const iv = [s.h1, s.cube, s.deck, s.hint].filter(Boolean).map((r) => [Math.max(top, r[1]), Math.min(bot, r[1] + r[3])]).sort((a, c) => a[0] - c[0]);
  let y = top, gap = 0; for (const [a, c] of iv) { if (a > y) gap = Math.max(gap, a - y); y = Math.max(y, c); } gap = Math.max(gap, bot - y); return +gap.toFixed(0); };
for (const [w, h, theme] of [[390, 844, "light"], [390, 844, "dark"], [1440, 900, "light"]]) {
  const cfg = `${w}x${h}-${theme}`; const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: touch, hasTouch: touch });
  const p = await ctx.newPage(); await p.goto(`${BASE}/#/`); await sleep(6000);
  const s = await read(p); await p.screenshot({ path: `${FR}home-${cfg}.png` });
  if (w < 1024) {
    const ov = inter(s.deck, s.cube) + inter(s.hint, s.cube);
    R("UIA-KF-065", ov > 0, `${cfg} deck ∩ cube + hint ∩ cube = ${ov} px² (deck ${JSON.stringify(s.deck)} hint ${JSON.stringify(s.hint)} cube ${JSON.stringify(s.cube)})`);
    const g = deadBand(s);
    R("UIA-KF-121", g > 0.25 * h, `${cfg} largest empty band between the docks ${g} px (bound ${0.25 * h}) · h1 ${JSON.stringify(s.h1)}`);
  }
  // the drag the hint names: press the cube's centre and drag 140 px
  const c = s.cube; const x = c[0] + c[2] / 2, y = c[1] + c[3] / 2;
  if (touch) { const cdp = await ctx.newCDPSession(p); const tp = (type, xx) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x: xx, y }] });
    await tp("touchStart", x); for (let i = 1; i <= 10; i++) { await tp("touchMove", x + i * 14); await sleep(16); } await tp("touchEnd", x + 140); }
  else { await p.mouse.move(x, y); await p.mouse.down(); for (let i = 1; i <= 10; i++) { await p.mouse.move(x + i * 14, y); await sleep(16); } await p.mouse.up(); }
  await sleep(1500);
  const d = await read(p); await p.screenshot({ path: `${FR}home-after-drag-${cfg}.png` });
  R("UIA-KF-066", d.hero, `${cfg} after a cube drag the start screen is ${d.hero ? "STILL UP" : "dismissed"} · hash ${await p.evaluate(() => location.hash)}`);
  R("UIA-KF-123", d.hero && /list/.test(d.deckText ?? "") && !d.listShown, `${cfg} after the drag: copy names the list ${/list/.test(d.deckText ?? "")} · hero ${d.hero} · list shown ${d.listShown}`);
  await ctx.close();
}
await b.close();
console.log(`load ${os.loadavg()[0].toFixed(2)} (end)`);
