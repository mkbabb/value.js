// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.matrix · the Matrix Controls facet's served predicates (READ-ONLY falsifier)
// Rows: UIA-KF-028 047 063 102 106 159 161 162 260 263 264 265 266 267 · KFA-138 · A2-KE-X-7.
// Usage: BASE=http://localhost:5196 RUN=before-r1 VPS=1440x900,390x844 THEMES=light,dark node matrix.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run";
const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5196";
const VPS = (process.env.VPS || "1440x900,1024x768,768x1024,430x932,390x844,360x780,844x390").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
const b = await chromium.launch({ headless: false });
// In-page reader. Cells = `.matrix-grid > *`; each holds one <input> and one `.matrix-axis-label` (kept across the cure).
const read = () => {
  const vw = innerWidth, vh = innerHeight;
  const grid = [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0); if (!grid) return { open: false };
  const panel = grid.closest("[role=tabpanel]");
  const content = grid.closest(".card-content") || grid.closest(".card") || panel;
  const R = (e) => e.getBoundingClientRect();
  const cells = [...grid.children];
  const inter = (a, c) => Math.max(0, Math.min(a.right, c.right) - Math.max(a.left, c.left)) * Math.max(0, Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top));
  let overlap = 0, inView = 0, small = 0; const labels = [];
  for (const c of cells) {
    const i = c.querySelector("input"), l = c.querySelector(".matrix-axis-label"); if (!i) continue;
    const ri = R(i); if (ri.top >= 0 && ri.bottom <= vh && ri.left >= 0 && ri.right <= vw) inView++;
    // clipped by a scroll ancestor counts as not visible
    if (Math.min(ri.width, ri.height) < 24) small++;
    if (l) { const rl = R(l); labels.push(l.textContent.replace(/\s+/g, "")); if (rl.width * rl.height > 0 && inter(ri, rl) > 0.25 * rl.width * rl.height) overlap++; }
  }
  const i0 = cells[0]?.querySelector("input"); const r0 = i0 ? R(i0) : { width: 0, height: 0 };
  const rad = i0 ? parseFloat(getComputedStyle(i0).borderTopLeftRadius) : 0;
  const slider = panel?.querySelector("[role=slider]");
  const nameOf = (e) => { if (!e) return ""; if (e.getAttribute("aria-label")) return e.getAttribute("aria-label"); const lb = e.getAttribute("aria-labelledby"); return lb ? lb.split(/\s+/).map((id) => document.getElementById(id)?.textContent.trim() || "").join(" ").trim() : ""; };
  const panelName = nameOf(panel);
  const out = panel ? [...panel.querySelectorAll("output")].map((o) => o.textContent.trim()).filter(Boolean) : [];
  const ribbon = [...document.querySelectorAll("button")].filter((e) => R(e).width > 0 && /^(Free|Fixed)$/.test(e.textContent.trim()));
  const stage = document.querySelector(".stage-cell"); const rs = stage ? R(stage) : null;
  const sw = slider?.closest("[data-slot=slider], .slider-root, [data-orientation]") || slider?.parentElement;
  return {
    open: true, cells: cells.length, overlap, uniqueLabels: new Set(labels).size, labels: labels.join(" "),
    inView, small, inputW: +r0.width.toFixed(1), inputH: +r0.height.toFixed(1), inputRadius: rad,
    disc: rad >= r0.height / 2 - 1 && Math.abs(r0.width - r0.height) < 4,
    bogusAttrs: i0 ? ["start", "end", "step"].filter((a) => i0.hasAttribute(a)).length : -1,
    gridFill: +(R(grid).width / R(content).width).toFixed(3),
    sliderFill: sw ? +(R(slider.closest("[data-slot=slider]") || sw).width / R(content).width).toFixed(3) : 0,
    sliderName: nameOf(slider), readout: out.join(" / "), panelName, fixedToggle: ribbon.length,
    stageHalfW: rs ? Math.round(rs.width / 2) : null, stageHalfH: rs ? Math.round(rs.height / 2) : null,
    sheetCard: !!grid.closest(".card") && !!grid.closest("[data-slot=sheet-content], [role=dialog]"),
  };
};
const cellStyle = (ix) => { const c = [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0).children[ix]; const i = c.querySelector("input"); const s = (e) => { const g = getComputedStyle(e); return [g.backgroundColor, g.borderTopColor, g.boxShadow, g.outlineStyle].join("|"); }; return s(c) + "#" + s(i) + "#" + (c.getAttribute("aria-current") || i.getAttribute("aria-current") || ""); };
const bounds = () => { const s = [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0).closest("[role=tabpanel]").querySelector("[role=slider]"); return s ? [+s.getAttribute("aria-valuemin"), +s.getAttribute("aria-valuemax")] : null; };
const poseDistinct = (ms) => new Promise((res) => { const s = new Set(); const t0 = performance.now(); const f = () => { const e = document.querySelector(".cube-pose"); if (e) s.add(getComputedStyle(e).transform); if (performance.now() - t0 < ms) requestAnimationFrame(f); else res(s.size); }; requestAnimationFrame(f); });
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch, colorScheme: theme });
  await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__m")) { localStorage.clear(); sessionStorage.setItem("__m", "1"); } localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); const tag = `${vpS}-${theme}`;
  try {
    await p.goto(`${BASE}/#/cube`); await p.waitForSelector(".cube-pose", { timeout: 20000 }); await sleep(3000);
    await p.locator('[aria-label="Select animation"]:visible').first().click({ timeout: 5000 }); await sleep(700);
    await p.getByRole("option", { name: /^Matrix/ }).first().click({ timeout: 5000 }); await sleep(1200);
    const pose = await p.evaluate(poseDistinct, 1500);
    const ex = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await ex.count()) { await ex.click({ timeout: 3000 }).catch(() => {}); await sleep(800); }
    await p.evaluate(() => [...document.querySelectorAll('[data-dock-surface-item][aria-label="Matrix Controls"]')].find((e) => e.getBoundingClientRect().width > 0)?.click()); await sleep(1800);
    const m = await p.evaluate(read); if (!m.open) throw new Error("facet did not open");
    await p.screenshot({ path: `${FR}${tag}-rest.jpg`, type: "jpeg", quality: 70 });
    await p.evaluate(() => [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0).closest(".card").scrollIntoView({ block: "end" })); await sleep(500);
    m.inViewScrolled = (await p.evaluate(read)).inView;
    await p.screenshot({ path: `${FR}${tag}-scrolled.jpg`, type: "jpeg", quality: 70 });
    const tap = (ix) => p.evaluate((ix) => { const i = [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0).children[ix].querySelector("input"); i.focus(); i.click(); }, ix);
    await tap(5); await sleep(300);
    const bnd = {}; for (const ix of [3, 1, 12, 15]) { await tap(ix); await sleep(250); bnd[ix] = await p.evaluate(bounds); }
    await tap(5); await sleep(250);
    const selName = await p.evaluate(read);
    await p.evaluate(() => document.activeElement?.blur?.()); await sleep(900);
    const sel5 = await p.evaluate(cellStyle, 5), sel6 = await p.evaluate(cellStyle, 6);
    const ctxVis = await p.evaluate(() => { const g = [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0); const pn = g?.closest("[role=tabpanel]"); const id = pn?.getAttribute("aria-labelledby"); const hd = id && document.getElementById(id); const r = hd?.getBoundingClientRect(); const headVis = !!(r && r.width > 0 && r.bottom > 0 && r.top < innerHeight); const dockLbl = [...document.querySelectorAll("[data-dock-tether=top] *")].some((e) => e.children.length === 0 && /Matrix/.test(e.textContent) && e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden"); const title = pn ? [...pn.querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent.trim() === "Transform matrix") : null; const tr = title?.getBoundingClientRect(); const titleVis = !!(tr && tr.width > 0 && tr.bottom > 0 && tr.top < innerHeight); return { headVis, dockLbl, titleVis }; });
    await p.screenshot({ path: `${FR}${tag}-selected.jpg`, type: "jpeg", quality: 70 });
    rows.push({ vp: vpS, theme, pose, ...m, bounds: bnd, selSliderName: selName.sliderName, selReadout: selName.readout, selDistinct: sel5 !== sel6, sel5, sel6, ...ctxVis });
  } catch (e) { rows.push({ vp: vpS, theme, error: String(e).slice(0, 200) }); }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}${RUN}.json`, JSON.stringify(rows, null, 1));
for (const r of rows) console.log(r.error ? `${r.vp} ${r.theme} ERROR ${r.error}` : `${r.vp} ${r.theme} pose=${r.pose} fixed=${r.fixedToggle} overlap=${r.overlap} uniq=${r.uniqueLabels} disc=${r.disc} bogus=${r.bogusAttrs} inView=${r.inView}/16 scrolled=${r.inViewScrolled}/16 small=${r.small} gridFill=${r.gridFill} sliderFill=${r.sliderFill} panelName="${r.panelName}" slider="${r.selSliderName}" readout="${r.selReadout}" sel=${r.selDistinct} P=${JSON.stringify(r.bounds[3])} K=${JSON.stringify(r.bounds[1])} T=${JSON.stringify(r.bounds[12])}/${r.stageHalfW} W=${JSON.stringify(r.bounds[15])} title=${r.titleVis} sheetCard=${r.sheetCard}`);
