// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.mobile · the mobile/tablet sheet family, served (gh-pages dist).
// Per scene route x viewport x theme, at rest and with the Controls surface open:
//   docSH   document.scrollingElement.scrollHeight == innerHeight (A2-KE-L2-2's consumer gate)
//   sheet   the sheet rect + computed position; transport rect
//   hit     hit test at the centre of every visible sheet control: returns the control (UIA-KF-005)
//   ribbon  the RibbonBar inside the viewport (UIA-KF-006); scrollers inside the sheet
// SIM=1 injects `[data-slot=sheet-content]{position:fixed;inset-inline:0}` — an INSTRUMENT-ONLY simulation of the
// glass half (SHEET-POSITION, A2-KE-L2-2, BL) so the consumer halves can be read as the audit read them; never product.
// usage: DIST=<dist> TAG=<tag> THEMES=light,dark VPS=390x844,... SIM=0|1 node sheet.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const ROUTES = (process.env.ROUTES || "cube,amiga,square,easing,spring,sequence").split(",");
const VPS = (process.env.VPS || "360x780,390x844,430x932,844x390,768x1024").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const SIM = process.env.SIM === "1";
const TAG = process.env.TAG || "x";
const FRAMES = process.env.FRAMES === "1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch();
const rows = [];
const read = (p) => p.evaluate(() => {
  const R = (el) => { const r = el.getBoundingClientRect(); return { t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), r: Math.round(r.right), h: Math.round(r.height) }; };
  const se = document.scrollingElement;
  const sheet = [...document.querySelectorAll("[data-slot=sheet-content]")].find((e) => e.getBoundingClientRect().height > 0);
  const docks = [...document.querySelectorAll(".glass-dock")].filter((e) => e.getBoundingClientRect().height > 0);
  const transport = docks.sort((a, c) => c.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];
  const out = { ih: innerHeight, iw: innerWidth, sh: se.scrollHeight, sw: se.scrollWidth, sheet: null, transport: transport ? R(transport) : null };
  if (!sheet) return out;
  const sr = sheet.getBoundingClientRect();
  const visTop = Math.max(0, sr.top), visBot = Math.min(innerHeight, sr.bottom);
  const ctrls = [...sheet.querySelectorAll("button, input, [role=slider], [role=switch], [role=combobox], textarea, .cm-content")]
    .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 && getComputedStyle(e).visibility !== "hidden"; });
  let inBand = 0, hitOK = 0, hitBad = [];
  for (const c of ctrls) {
    const r = c.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2;
    if (y < visTop || y > visBot || x < 0 || x > innerWidth) continue;
    // a control scrolled out of its own scroller's clip is not in band
    let clipped = false; for (let a = c.parentElement; a && a !== sheet.parentElement; a = a.parentElement) { const cs = getComputedStyle(a); if (/(auto|scroll|hidden|clip)/.test(cs.overflowY)) { const ar = a.getBoundingClientRect(); if (y < ar.top || y > ar.bottom) { clipped = true; break; } } }
    if (clipped) continue;
    inBand++;
    const hit = document.elementFromPoint(x, y);
    if (hit && (c === hit || c.contains(hit) || hit.contains(c))) hitOK++; else hitBad.push(`${(c.getAttribute("aria-label") || c.textContent || c.tagName).trim().slice(0, 18)}@${Math.round(y)}→${hit?.closest(".glass-dock") ? "DOCK" : hit?.className?.toString().slice(0, 24)}`);
  }
  const scrollers = [...sheet.querySelectorAll("*")].filter((e) => { const cs = getComputedStyle(e); return /(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 1; }).length;
  const ribbon = sheet.querySelector("#controls-ribbon-target")?.closest(".flex-shrink-0");
  const rr = ribbon ? ribbon.getBoundingClientRect() : null;
  out.sheet = { pos: getComputedStyle(sheet).position, ...R(sheet), detent: getComputedStyle(sheet).getPropertyValue("--detent-t").trim(), inBand, hitOK, hitBad: hitBad.slice(0, 6), scrollers,
    ribbon: rr ? { t: Math.round(rr.top), b: Math.round(rr.bottom), inView: rr.top >= 0 && rr.bottom <= innerHeight && rr.height > 0 } : null };
  return out;
});
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number);
  const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch, colorScheme: theme, reducedMotion: "reduce" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  if (SIM) await ctx.addInitScript(() => { const s = document.createElement("style"); s.textContent = "[data-slot=sheet-content]{position:fixed!important;inset-inline:0!important}"; document.addEventListener("DOMContentLoaded", () => document.head.append(s)); });
  const p = await ctx.newPage();
  for (const route of ROUTES) {
    try {
      await p.goto(`${srv.url}/#/${route}`, { waitUntil: "load" }); await sleep(2200);
      const rest = await read(p);
      const exp = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first();
      if (await exp.count()) { await exp.click({ timeout: 3000 }).catch(() => {}); await sleep(700); }
      const it = p.locator('[data-dock-tether=top] [data-dock-surface-item]:not([aria-disabled=true])').first();
      let surf = null;
      if (await it.count()) { surf = await it.getAttribute("aria-label"); if ((await it.getAttribute("aria-pressed")) !== "true") await it.click({ timeout: 3000, force: true }).catch(() => {}); await sleep(1200); }
      const open = await read(p);
      if (FRAMES && (vpS === "390x844" || vpS === "844x390")) await p.screenshot({ path: `${OUT}frames/sheet-${TAG}${SIM ? "-sim" : ""}-${route}-${vpS}-${theme}.png` });
      rows.push({ route, vp: vpS, theme, surf, rest, open });
    } catch (e) { rows.push({ route, vp: vpS, theme, error: String(e).slice(0, 160) }); }
  }
  await ctx.close();
}
await b.close(); srv.close?.();
fs.writeFileSync(`${OUT}sheet-${TAG}${SIM ? "-sim" : ""}.json`, JSON.stringify(rows, null, 1));
let docRed = 0, hitRed = 0, ribRed = 0;
for (const r of rows) {
  if (r.error) { console.log("ERR", r.route, r.vp, r.theme, r.error); continue; }
  const d = [r.rest, r.open].filter((s) => s.sh !== s.ih).length; docRed += d;
  const s = r.open.sheet; const hb = s ? s.inBand - s.hitOK : 0; hitRed += hb ? 1 : 0; const rb = s && s.ribbon && !s.ribbon.inView ? 1 : 0; ribRed += rb;
  console.log(`${r.route.padEnd(8)} ${r.vp.padEnd(8)} ${r.theme.padEnd(5)} docSH rest ${r.rest.sh}/${r.rest.ih} open ${r.open.sh}/${r.open.ih} | sheet ${s ? `${s.pos} [${s.t},${s.b}] det=${s.detent} hit ${s.hitOK}/${s.inBand}${hb ? " " + s.hitBad.join(",") : ""} scr=${s.scrollers} ribbon=${s.ribbon ? `[${s.ribbon.t},${s.ribbon.b}]${s.ribbon.inView ? "" : "OUT"}` : "-"}` : "-"} | tr ${r.open.transport ? `[${r.open.transport.t},${r.open.transport.b}]` : "-"}`);
}
console.log(`sheet-probe ${TAG}${SIM ? " SIM" : ""}: docSH RED ${docRed} states · hit RED ${hitRed} cells · ribbon OUT ${ribRed} cells · rows ${rows.length}`);
process.exit(0);
