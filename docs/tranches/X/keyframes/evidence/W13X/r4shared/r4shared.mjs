// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4shared · served predicates for the R-4 "shared seats" row.
//   S1 A2-KE-L1-18 — the Square's box holds two role=status read-outs and no inert role=slider; an ArrowRight moves "x".
//   S2 A2-KE-L1-18 — Amiga's canvas holds the same two read-outs; a Meta+ArrowLeft is not swallowed.
//   S3 .stage-field-x — the idiom rules a closing line: two background layers, no scene border patch, the right-edge column inked.
//   S4 A2-KE-L2-14 — the ppmycota link's target is >= 44 px wide and the row's height.
//   S5 A2-KE-L1-15 (c) — one #rainbow-gradient, and the same node survives a scene switch.
//   S6 UIA-KF-064 — Sequence renders no status badge; the Square's badge is not stretched (< 100 px).
//   S7 the page boots every scene with no page error (the directory moves broke no import).
// Usage: BASE=http://localhost:5495 RUN=after-r1 THEME=light node r4shared.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import os from "node:os";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run"; const THEME = process.env.THEME || "light";
const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5495";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const loadStart = os.loadavg()[0].toFixed(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: THEME });
await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__m")) { localStorage.clear(); sessionStorage.setItem("__m", "1"); } localStorage.setItem("vueuse-color-scheme", t); } catch {} }, THEME);
const p = await ctx.newPage();
const errors = []; p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
const rec = { run: RUN, theme: THEME, base: BASE, loadStart };
const go = async (hash, sel) => { await p.goto(`${BASE}/#/${hash}`, { timeout: 120000 }); await p.waitForSelector(sel, { timeout: 90000 }); await sleep(2500); };

// --- S1 · S3 · S6 — /square
await go("square", ".demo-box");
const axes = (sel) => p.evaluate((sel) => {
  const host = document.querySelector(sel);
  const st = [...host.querySelectorAll('[role="status"]')];
  return { sliders: host.querySelectorAll('[role="slider"]').length, readouts: st.map((e) => e.textContent.trim()),
    hidden: st.every((e) => { const r = e.getBoundingClientRect(); return r.width <= 1 && r.height <= 1; }),
    help: (document.getElementById(host.getAttribute("aria-describedby"))?.textContent ?? "").trim().length };
}, sel);
rec.squareRest = await axes(".demo-box");
await p.focus(".demo-box"); await p.keyboard.press("ArrowRight"); await sleep(1500);
rec.squareNudged = await axes(".demo-box");
await p.keyboard.press("Home"); await sleep(1500);
rec.field = await p.evaluate(() => {
  const el = document.querySelector(".square-field.stage-field-x"); const cs = getComputedStyle(el);
  return { layers: (cs.backgroundImage.match(/gradient\(/g) ?? []).length, borderEnd: cs.borderInlineEndWidth, box: el.getBoundingClientRect().toJSON() };
});
{ // the field's right-edge column against the column one pixel inside it (both sampled mid-height, away from the y rules)
  const { x, y, width, height } = rec.field.box;
  const shot = await p.screenshot({ clip: { x: Math.round(x + width) - 3, y: Math.round(y + height * 0.37), width: 3, height: 1 } });
  fs.writeFileSync(`${FR}field-edge-${THEME}.png`, shot);
  rec.fieldEdgePng = shot.toString("base64");
}
rec.squareBadge = await p.evaluate(() => [...document.querySelectorAll(".status-badge")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => Math.round(e.getBoundingClientRect().width)));
await p.screenshot({ path: `${FR}square-1440-${THEME}.png` });

// --- S5 — the paint server across a scene switch
rec.gradientBefore = await p.evaluate(() => { const g = document.querySelectorAll("#rainbow-gradient"); if (g[0]) g[0].__r4 = 1; return g.length; });
await p.evaluate(() => { location.hash = "#/sequence"; });
await p.waitForSelector("[data-scene-stage-header]", { timeout: 90000 }); await sleep(3500);
rec.gradientAfter = await p.evaluate(() => { const g = document.querySelectorAll("#rainbow-gradient"); return { count: g.length, sameNode: g[0]?.__r4 === 1 }; });
// --- S6 — /sequence
rec.sequenceBadges = await p.evaluate(() => document.querySelectorAll(".status-badge").length);
await p.screenshot({ path: `${FR}sequence-1440-${THEME}.png` });

// --- S2 — /amiga
await go("amiga", "canvas.amiga-canvas");
rec.amiga = await axes("canvas.amiga-canvas");
rec.amigaChord = await p.evaluate(() => {
  const c = document.querySelector("canvas.amiga-canvas");
  const chord = new KeyboardEvent("keydown", { key: "ArrowLeft", metaKey: true, bubbles: true, cancelable: true });
  c.dispatchEvent(chord);
  const bare = new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true });
  c.dispatchEvent(bare);
  return { chordSwallowed: chord.defaultPrevented, bareHandled: bare.defaultPrevented };
});
await sleep(1200);
rec.amigaNudged = (await axes("canvas.amiga-canvas")).readouts;
await p.screenshot({ path: `${FR}amiga-1440-${THEME}.png` });

// --- S4 — the @mbabb menu's ppmycota row
await go("cube", ".cube-pose");
await p.hover('[data-dock-tether="top"] .glass-dock').catch(() => {}); await sleep(1200);
await p.locator('button[aria-label*="mbabb" i], [data-mbabb-trigger]').first().click({ timeout: 20000 }).catch((e) => (rec.menuOpenError = String(e.message).slice(0, 160)));
await sleep(1200);
rec.link = await p.evaluate(() => {
  const a = document.querySelector('a[aria-label="ppmycota.com"]'); if (!a) return null;
  const row = a.closest('[role="menuitemcheckbox"]'); const r = a.getBoundingClientRect(); const rr = row.getBoundingClientRect();
  return { w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, rowH: Math.round(rr.height * 10) / 10, glyph: Math.round(a.querySelector("svg").getBoundingClientRect().width) };
});
await p.screenshot({ path: `${FR}menu-1440-${THEME}.png` });
await p.keyboard.press("Escape");

// --- S7 — every scene boots
for (const [hash, sel] of [["", ".cube-pose"], ["easing", "[data-scene-stage-header]"], ["spring", "[data-scene-stage-header]"]]) await go(hash, sel);
rec.pageErrors = errors;
rec.loadEnd = os.loadavg()[0].toFixed(2);

// --- the verdicts
const edge = rec.fieldEdgePng; delete rec.fieldEdgePng;
const px = await p.evaluate(async (b64) => { const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = 1; const g = c.getContext("2d"); g.drawImage(img, 0, 0); return [...Array(img.width)].map((_, i) => [...g.getImageData(i, 0, 1, 1).data].slice(0, 3)); }, edge);
rec.fieldEdgePx = px; // device px, left to right, ending on the field's last column
const dist = (a, c) => Math.abs(a[0] - c[0]) + Math.abs(a[1] - c[1]) + Math.abs(a[2] - c[2]);
rec.verdict = {
  S1: rec.squareRest.sliders === 0 && rec.squareRest.readouts.join("|") === "x 0.00|y 0.00" && rec.squareRest.hidden && rec.squareRest.help > 20 && rec.squareNudged.readouts.join("|") === "x 0.25|y 0.00",
  S2: rec.amiga.sliders === 0 && rec.amiga.readouts.length === 2 && rec.amiga.help > 20 && rec.amigaChord.chordSwallowed === false && rec.amigaChord.bareHandled === true,
  S3: rec.field.layers === 2 && rec.field.borderEnd === "0px" && dist(px[px.length - 1], px[0]) > 12,
  S4: !!rec.link && rec.link.w >= 44 && rec.link.h >= rec.link.rowH - 1 && rec.link.glyph === 16,
  S5: rec.gradientBefore === 1 && rec.gradientAfter.count === 1 && rec.gradientAfter.sameNode === true,
  S6: rec.sequenceBadges === 0 && rec.squareBadge.length === 1 && rec.squareBadge[0] < 100,
  S7: errors.length === 0,
};
fs.writeFileSync(`${OUT}${RUN}-${THEME}.json`, JSON.stringify(rec, null, 1));
console.log(JSON.stringify({ run: RUN, load: `${loadStart}->${rec.loadEnd}`, verdict: rec.verdict, link: rec.link, field: { layers: rec.field.layers, borderEnd: rec.field.borderEnd, px }, squareRest: rec.squareRest, squareNudged: rec.squareNudged.readouts, amiga: rec.amiga, amigaChord: rec.amigaChord, gradient: [rec.gradientBefore, rec.gradientAfter], badges: [rec.squareBadge, rec.sequenceBadges], errors, menuOpenError: rec.menuOpenError }));
await b.close();
