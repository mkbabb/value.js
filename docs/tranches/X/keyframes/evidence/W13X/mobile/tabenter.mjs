// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.mobile · critic gap: the tab-panel `@keyframes enter` slide at phone and
// tablet widths (the KF.W13V C1-4 capture read 1440 only). Switch Controls -> Keyframes -> Controls from the top dock
// on #/cube and sample, per rAF for 1800 ms, every CSSAnimation named `enter` inside the controls pane plus the entering
// and leaving surfaces' opacity/translate. Judged lawful when the entering panel's first painted frame is opacity 0
// (no flash of the settled panel), the slide settles to opacity 1 / translate none, and no two surfaces are ever both
// fully opaque in the same frame (no double paint).  usage: DIST=<dist> TAG=<tag> THEME=light|dark node tabenter.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const THEME = process.env.THEME || "light", TAG = process.env.TAG || "x";
const VPS = (process.env.VPS || "390x844,360x780,768x1024,1440x900").split(",");
const b = await chromium.launch();
const out = []; let bad = 0;
for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch, colorScheme: THEME });
  if (touch) await ctx.addInitScript(() => { const s = document.createElement("style"); s.textContent = "[data-slot=sheet-content]{position:fixed!important;inset-inline:0!important}"; document.addEventListener("DOMContentLoaded", () => document.head.append(s)); });
  const p = await ctx.newPage();
  await p.goto(`${srv.url}/#/cube`, { waitUntil: "load" }); await p.waitForTimeout(2500);
  for (const surface of ["Keyframes", "Controls"]) {
    const it = p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${surface}"]`).first();
    await p.evaluate(() => {
      window.__tab = [];
      // the panels PAINTED before the press are the LEAVING set; any other panel (new, or force-mounted but
      // hidden until now) is ENTERING
      for (const e of document.querySelectorAll("[role=tabpanel]")) e.__old = e.getBoundingClientRect().height > 0;
      const t0 = performance.now();
      const tick = () => {
        const pane = document.querySelector(touch() ? "[data-slot=sheet-content]" : ".controls-pane-wrapper");
        const anims = document.getAnimations().filter((a) => a.animationName === "enter" && pane?.contains(a.effect?.target));
        const panels = [...(pane?.querySelectorAll("[role=tabpanel]") ?? [])].map((e) => { const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return { old: !!e.__old, h: Math.round(r.height), op: +(+c.opacity).toFixed(3), tr: c.translate, tf: c.transform === "none" ? "none" : c.transform.slice(0, 40), an: c.animationName, st: e.getAttribute("data-state") }; }).filter((x) => x.h > 0);
        window.__tab.push({ t: Math.round(performance.now() - t0), n: anims.length, panels });
        if (performance.now() - t0 < 1800) requestAnimationFrame(tick);
      };
      function touch() { return innerWidth < 1024; }
      requestAnimationFrame(tick);
    });
    for (let k = 0; k < 4; k++) { if ((await it.getAttribute("aria-pressed")) === "true") break; await it.click({ force: true }).catch(() => {}); await p.waitForTimeout(250); }
    await p.waitForTimeout(1900);
    const s = await p.evaluate(() => window.__tab);
    const entering = s.map((f) => ({ t: f.t, p: f.panels.find((x) => !x.old) })).filter((f) => f.p);
    const first = entering[0]?.p;
    const lastIn = entering[entering.length - 1]?.p;
    const doubleOpaque = s.filter((f) => f.panels.filter((x) => x.op >= 0.999).length > 1).length;
    const distinct = new Set(entering.map((f) => `${f.p.op}|${f.p.tf}|${f.p.tr}`)).size;
    const withEnter = entering.filter((f) => f.p.an === "enter");
    const settled = !!lastIn && lastIn.op >= 0.999 && lastIn.tf === "none";
    const verdict = !entering.length ? "NO-ENTER" : first.op <= 0.05 && settled && doubleOpaque === 0 ? "LAWFUL" : "DEFECT";
    if (verdict === "DEFECT") bad++;
    out.push({ vp: vpS, theme: THEME, to: surface, frames: s.length, entering: entering.length, withEnter: withEnter.length, first, lastIn, distinct, doubleOpaque, verdict, trace: entering.slice(0, 20) });
    console.log(`${verdict.padEnd(8)} ${vpS.padEnd(9)} ${THEME} -> ${surface.padEnd(9)} frames ${s.length} entering ${entering.length} (anim enter ${withEnter.length}) first ${first ? `op ${first.op} ${first.tr}/${first.tf}` : "-"} distinct ${distinct} doubleOpaque ${doubleOpaque} settled ${settled}`);
    await p.screenshot({ path: `${OUT}frames/tabenter-${TAG}-${vpS}-${surface}-${THEME}.png` });
  }
  await ctx.close();
}
fs.writeFileSync(`${OUT}tabenter-${TAG}-${THEME}.json`, JSON.stringify(out, null, 1));
console.log(`tabenter ${TAG} ${THEME}: ${bad ? "DEFECT" : "LAWFUL"} (${bad} defect legs of ${out.length})`);
await b.close(); process.exit(0);
