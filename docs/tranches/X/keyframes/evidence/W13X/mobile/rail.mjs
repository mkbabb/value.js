// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.mobile · desktop rail rows, served (gh-pages dist).
//   UIA-KF-007  at 1440x900 on every scene surface the rail is height-bounded: pane bottom <= the menubar top,
//               the ribbon inside the viewport, and a wheel over a taller surface scrolls it.
//   UIA-KF-319  the Keyframes ribbon's actions sit on ONE row (distinct button tops == 1).
// usage: DIST=<dist> TAG=<tag> THEME=light|dark node rail.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./frames/", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const theme = process.env.THEME || "light", TAG = process.env.TAG || "x";
const VPS = (process.env.VPS || "1440x900,1024x768").split(",");
const b = await chromium.launch();
let r007 = 0, r319 = 0;
for (const vp of VPS) for (const route of ["cube", "amiga", "square", "easing", "spring"]) {
  const [w, h] = vp.split("x").map(Number);
  const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: theme, reducedMotion: "reduce" });
  await p.goto(`${srv.url}/#/${route}`, { waitUntil: "load" }); await p.waitForTimeout(2200);
  const items = await p.locator("[data-dock-tether=top] [data-dock-surface-item]:not([aria-disabled=true])").evaluateAll((els) => els.map((e) => e.getAttribute("data-surface") || e.getAttribute("aria-label")));
  for (const s of items) {
    const it = p.locator(`[data-dock-tether=top] [data-dock-surface-item][data-surface="${s}"], [data-dock-tether=top] [data-dock-surface-item][aria-label="${s}"]`).first();
    // a click on a collapsed dock can land before it expands: retry until the dock reports it pressed
    let ok = false;
    for (let k = 0; k < 5 && !ok; k++) {
      if ((await it.getAttribute("aria-pressed")) !== "true") await it.click({ force: true }).catch(() => {});
      await p.waitForTimeout(600); ok = (await it.getAttribute("aria-pressed")) === "true";
    }
    if (!ok) { console.log(`UNSEL ${vp} ${route} ${s}`); r007++; continue; }
    await p.waitForTimeout(600);
    const m = await p.evaluate(() => {
      const vis = (e) => { const r = e.getBoundingClientRect(); return r.height > 2 && getComputedStyle(e).display !== "none"; };
      const wrap = document.querySelector(".controls-pane-wrapper"); if (!wrap || !vis(wrap)) return null;
      const surf = [...document.querySelectorAll(".controls-pane-wrapper .controls-surface")].find(vis);
      const rib = document.querySelector(".controls-pane-wrapper #controls-ribbon-target")?.closest(".flex-shrink-0");
      const docks = [...document.querySelectorAll(".glass-dock")].filter(vis).sort((a, c) => c.getBoundingClientRect().top - a.getBoundingClientRect().top);
      const menuTop = docks[0]?.getBoundingClientRect().top ?? innerHeight;
      const wr = wrap.getBoundingClientRect(), rr = rib?.getBoundingClientRect();
      const btnTops = rib ? [...new Set([...rib.querySelectorAll("button")].filter(vis).map((x) => Math.round(x.getBoundingClientRect().top)))] : [];
      return { wrapB: Math.round(wr.bottom), menuTop: Math.round(menuTop), ih: innerHeight, docSH: document.scrollingElement.scrollHeight,
        ribB: rr ? Math.round(rr.bottom) : null, ribRows: btnTops.length, sel: document.querySelector("[data-dock-surface-item][aria-pressed=true]")?.getAttribute("aria-label"),
        sSH: surf?.scrollHeight ?? 0, sCH: surf?.clientHeight ?? 0, sOv: surf ? getComputedStyle(surf).overflowY : null };
    });
    if (!m) { console.log(`${vp} ${route} ${s}: no rail`); continue; }
    let wheel = "n/a";
    if (m.sSH > m.sCH + 2) {
      const box = await p.locator(".controls-pane-wrapper .controls-surface:visible").first().boundingBox();
      await p.mouse.move(box.x + box.width / 2, box.y + Math.min(box.height / 2, 200)); await p.mouse.wheel(0, 300); await p.waitForTimeout(400);
      const st = await p.evaluate(() => [...document.querySelectorAll(".controls-pane-wrapper .controls-surface")].find((e) => e.getBoundingClientRect().height > 2)?.scrollTop ?? 0);
      wheel = st > 0 ? "scrolls" : "STUCK";
    }
    const bad007 = m.wrapB > m.menuTop + 1 || m.docSH > m.ih || (m.ribB !== null && m.ribB > m.ih) || wheel === "STUCK";
    const bad319 = s === "keyframes" && m.ribRows > 1;
    r007 += bad007 ? 1 : 0; r319 += bad319 ? 1 : 0;
    console.log(`${bad007 || bad319 ? "RED  " : "GREEN"} ${vp} ${theme} #/${route} ${s} rail.b=${m.wrapB} menu.t=${m.menuTop} docSH=${m.docSH}/${m.ih} ribbon.b=${m.ribB} ribRows=${m.ribRows} surface ${m.sSH}/${m.sCH} ${m.sOv} wheel=${wheel}`);
    if (vp === "1440x900" && (s === "keyframes" || route === "spring")) await p.screenshot({ path: `${OUT}rail-${TAG}-${route}-${s}-${theme}.png` });
  }
  await p.close();
}
console.log(`rail-probe ${TAG} ${theme}: UIA-KF-007 RED ${r007} · UIA-KF-319 RED ${r319}`);
await b.close(); process.exit(0);
