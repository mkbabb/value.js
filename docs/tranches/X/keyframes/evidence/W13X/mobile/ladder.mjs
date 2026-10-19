// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.mobile · the detent LADDER, served (gh-pages dist), SIM=1 (SHEET-POSITION simulated, instrument-only).
// Per scene route x viewport x theme, at each rung (open = the store's expanded rung; End = the fullest; Home = peek):
//   side/rect   the sheet's anchored side + rect; distinct rungs (A2-KE-L2-3: a degenerate ladder is RED)
//   dock        sheet under the top dock band (A2-KE-L2-3) or the transport (UIA-KF-005)
//   window      the pane's (the region body's) block size at the fullest rung (A2-KE-L2-10, portrait: < 50% of the band is RED)
//   reach       every ribbon control scrolled into the pane's window takes its own tap, at the open rung (UIA-KF-006)
//   subject     spring: the .spring-track clear of the sheet and the top dock at the open rung (UIA-KF-217)
// usage: DIST=<dist> TAG=<tag> THEMES=light,dark VPS=... node ladder.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const ROUTES = (process.env.ROUTES || "cube,amiga,square,easing,spring,sequence").split(",");
const VPS = (process.env.VPS || "360x780,390x844,430x932,844x390,932x430,768x1024").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const TAG = process.env.TAG || "x";
const FRAMES = process.env.FRAMES === "1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const read = (p, scrollEnd) => p.evaluate(async (scrollEnd) => {
  const R = (el) => { const r = el.getBoundingClientRect(); return { t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), r: Math.round(r.right) }; };
  const sheet = [...document.querySelectorAll("[data-slot=sheet-content]")].find((e) => e.getBoundingClientRect().height > 0);
  const docks = [...document.querySelectorAll(".glass-dock")].filter((e) => e.getBoundingClientRect().height > 0).map(R).sort((a, c) => a.t - c.t);
  const out = { ih: innerHeight, sh: document.scrollingElement.scrollHeight, top: docks[0] || null, tr: docks.length > 1 ? docks[docks.length - 1] : null, sheet: null };
  if (!sheet) return out;
  const pane = sheet.querySelector(".controls-pane");
  const rb = sheet.querySelector("#controls-ribbon-target")?.closest(".flex-shrink-0");
  // UIA-KF-006 reach: every ribbon control can be scrolled into the pane's window and then takes its own tap
  let reach = null;
  if (scrollEnd && rb && pane) {
    const btns = [...rb.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 2);
    let ok = 0;
    for (const e of btns) {
      e.scrollIntoView({ block: "nearest" }); await new Promise((r) => setTimeout(r, 60));
      const r = e.getBoundingClientRect(), pr = pane.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const hit = document.elementFromPoint(x, y);
      if (y >= pr.top && y <= pr.bottom && hit && (hit === e || e.contains(hit))) ok++;
    }
    reach = { ok, n: btns.length };
  }
  const rr = rb ? R(rb) : null;
  const sr = R(sheet);
  const track = document.querySelector(".spring-track");
  out.sheet = { side: sheet.dataset.side, ...sr, det: getComputedStyle(sheet).getPropertyValue("--detent-t").trim(),
    win: pane ? Math.round(pane.getBoundingClientRect().height) : 0, reach,
    ribbon: rr ? { ...rr, inView: rr.t >= sr.t && rr.b <= Math.min(sr.b, innerHeight) && rr.b > rr.t } : null };
  if (track) out.track = R(track);
  return out;
}, scrollEnd);
const b = await chromium.launch();
const rows = [];
for (const vpS of VPS) for (const theme of THEMES) {
  const [w, h] = vpS.split("x").map(Number);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, colorScheme: theme, reducedMotion: "reduce" });
  await ctx.addInitScript(() => { const s = document.createElement("style"); s.textContent = "[data-slot=sheet-content]{position:fixed!important}[data-slot=sheet-content][data-side=bottom]{inset-inline:0!important}"; document.addEventListener("DOMContentLoaded", () => document.head.append(s)); });
  const p = await ctx.newPage();
  for (const route of ROUTES) {
    try {
      await p.goto(`${srv.url}/#/${route}`, { waitUntil: "load" }); await sleep(2200);
      const peek0 = await read(p, false);
      const exp = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first();
      if (await exp.count()) { await exp.click({ timeout: 3000 }).catch(() => {}); await sleep(700); }
      const it = p.locator('[data-dock-tether=top] [data-dock-surface-item]:not([aria-disabled=true])').first();
      if (await it.count()) { if ((await it.getAttribute("aria-pressed")) !== "true") await it.click({ timeout: 3000, force: true }).catch(() => {}); await sleep(1200); }
      const open = await read(p, false);
      if (FRAMES && (vpS === "390x844" || vpS === "844x390")) await p.screenshot({ path: `${OUT}frames/ladder-${TAG}-${route}-${vpS}-${theme}-open.png` });
      const reach = await read(p, true);
      const hd = p.locator("[data-slot=sheet-detent-handle]").first();
      let full = null;
      if (await hd.count()) { await hd.focus(); await p.keyboard.press("End"); await sleep(900); full = await read(p, false);
        if (FRAMES && (vpS === "390x844" || vpS === "844x390")) await p.screenshot({ path: `${OUT}frames/ladder-${TAG}-${route}-${vpS}-${theme}-full.png` }); }
      rows.push({ route, vp: vpS, theme, peek0, open, reach, full });
    } catch (e) { rows.push({ route, vp: vpS, theme, error: String(e).slice(0, 160) }); }
  }
  await ctx.close();
}
await b.close(); srv.close?.();
fs.writeFileSync(`${OUT}ladder-${TAG}.json`, JSON.stringify(rows, null, 1));
const red = { L2_3: 0, L2_10: 0, K005: 0, K006: 0, K217: 0 };
const f = (s) => s ? `${s.side}[${s.t},${s.b}|${s.l},${s.r}]` : "-";
for (const r of rows) {
  if (r.error) { console.log("ERR", r.route, r.vp, r.theme, r.error); continue; }
  const P = r.peek0.sheet, O = r.open.sheet, F = r.full?.sheet, topB = r.open.top?.b ?? 0, trT = r.open.tr?.t ?? r.open.ih;
  const land = r.open.ih <= 500 && r.open.ih < 1024;
  const sz = (s) => s ? (s.side === "right" || s.side === "left" ? s.r - s.l : s.b - s.t) : 0;
  const degenerate = P && O && Math.abs(sz(P) - sz(O)) < 8;
  const underDock = [P, O, F].some((s) => s && (s.t < topB - 1 || s.b > trT + 1));
  const l23 = land && (degenerate || underDock || (O && O.side === "bottom")) ? 1 : 0;
  const band = trT - topB;
  const l210 = !land && F && F.win < 0.5 * band ? 1 : 0; // the audit's views are portrait; landscape is L2-3's
  const k005 = [P, O, F].some((s) => s && s.b > trT + 1) ? 1 : 0;
  const rc = r.reach.sheet?.reach; const k006 = rc && rc.ok < rc.n ? 1 : 0;
  const k217 = r.route === "spring" && r.open.track && O && (r.open.track.b > O.t + 1 && O.side === "bottom" || r.open.track.t < topB - 1) ? 1 : 0;
  red.L2_3 += l23; red.L2_10 += l210; red.K005 += k005; red.K006 += k006; red.K217 += k217;
  console.log(`${r.route.padEnd(8)} ${r.vp.padEnd(8)} ${r.theme.padEnd(5)} peek ${f(P)} open ${f(O)} full ${f(F)} | top.b ${topB} tr.t ${trT} win ${F?.win ?? "-"}/${band} reach ${r.reach.sheet?.reach ? `${r.reach.sheet.reach.ok}/${r.reach.sheet.reach.n}` : "-"}${r.open.track ? ` track[${r.open.track.t},${r.open.track.b}]` : ""} docSH ${r.open.sh}/${r.open.ih}${l23 ? " L2-3" : ""}${l210 ? " L2-10" : ""}${k005 ? " 005" : ""}${k006 ? " 006" : ""}${k217 ? " 217" : ""}`);
}
console.log(`ladder ${TAG}: RED L2-3 ${red.L2_3} · L2-10 ${red.L2_10} · UIA-KF-005 ${red.K005} · UIA-KF-006 ${red.K006} · UIA-KF-217 ${red.K217} · rows ${rows.length}`);
