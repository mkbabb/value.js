// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r3res2d · §0fj 4: the cube Matrix pane's title after the pane is scrolled to its end (served probe)
// usage: BASE=http://localhost:5394 RUN=before-r1 VPS=844x390,1440x900,390x844 THEMES=light,dark node probe.mjs
// Headless real Chrome (§0ei). On #/cube: select the Matrix animation, open the "Matrix Controls" surface,
// read the panel title ("Transform matrix", the ConfiguratorLayer label) and the tabpanel's labelling
// heading at rest; then scroll EVERY scrollable ancestor of the matrix grid to its end and read again.
// "Visible" = a non-empty box inside the viewport AND inside every overflow-clipping ancestor's box.
// Pass (per cell): titleVis after the scroll-to-end.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { loadavg } from "node:os";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run";
const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5394";
const VPS = (process.env.VPS || "844x390,1440x900,390x844").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
const read = () => {
  const grid = [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0);
  if (!grid) return { open: false };
  const panel = grid.closest("[role=tabpanel]");
  const vis = (e) => {
    if (!e) return false;
    const r = e.getBoundingClientRect(); if (!(r.width > 0 && r.height > 0)) return false;
    let t = Math.max(r.top, 0), b = Math.min(r.bottom, innerHeight), l = Math.max(r.left, 0), rt = Math.min(r.right, innerWidth);
    for (let a = e.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (/(auto|scroll|hidden|clip)/.test(s.overflowY + s.overflowX)) { const q = a.getBoundingClientRect(); t = Math.max(t, q.top); b = Math.min(b, q.bottom); l = Math.max(l, q.left); rt = Math.min(rt, q.right); }
    }
    return b - t >= Math.min(8, r.height) && rt - l > 0;
  };
  const title = [...(panel ?? grid.parentElement).querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent.trim() === "Transform matrix");
  const id = panel?.getAttribute("aria-labelledby"); const head = id && document.getElementById(id);
  const hosts = []; for (let a = grid.parentElement; a; a = a.parentElement) { const s = getComputedStyle(a); if (/(auto|scroll)/.test(s.overflowY) && a.scrollHeight > a.clientHeight + 1) hosts.push({ cls: String(a.className).slice(0, 60), sh: a.scrollHeight, ch: a.clientHeight, st: Math.round(a.scrollTop) }); }
  const tr = title?.getBoundingClientRect();
  const bx = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return [q.left, q.top, q.width, q.height].map(Math.round); };
  const frame = grid.closest(".pane-frame");
  const boxes = { frame: bx(frame), ribbon: bx(frame?.lastElementChild), header: bx(title?.closest("[data-slot=configurator-layer-header]")), grid: bx(grid), param: bx(grid.parentElement.querySelector(".param-row") ?? grid.closest("[data-slot=configurator-layer]")?.querySelector(".param-row")) };
  return { open: true, boxes, titleVis: vis(title), titleBox: tr ? [Math.round(tr.top), Math.round(tr.bottom)] : null, headVis: vis(head), headText: head?.textContent.trim().slice(0, 40) ?? null, hosts };
};
const toEnd = () => { const grid = [...document.querySelectorAll(".matrix-grid")].find((g) => g.getBoundingClientRect().width > 0); for (let a = grid.parentElement; a; a = a.parentElement) { const s = getComputedStyle(a); if (/(auto|scroll)/.test(s.overflowY)) a.scrollTop = a.scrollHeight; } document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight; };
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of THEMES) for (const vpS of VPS) {
    const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch, colorScheme: theme });
    await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__m")) { localStorage.clear(); sessionStorage.setItem("__m", "1"); } localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const p = await ctx.newPage(); const tag = `${vpS}-${theme}`; const errs = [];
    p.on("pageerror", (e) => errs.push(String(e.message ?? e).slice(0, 160)));
    const r = { vp: vpS, theme, load1: loadavg()[0].toFixed(2) };
    try {
      await p.goto(`${BASE}/#/cube`); await p.waitForSelector(".cube-pose", { timeout: 30000 }); await sleep(3000);
      // the transport dock rests collapsed (its trigger is inert until expanded): expand every collapsed dock first
      // the transport dock rests collapsed (its trigger is inert until expanded): expand it by its summary control (DOM click; the pill is animating)
      await p.evaluate(() => document.querySelector('[data-dock-tether=bottom] .glass-dock.collapsed [aria-label="Expand dock"]')?.click()); await sleep(800);
      await p.locator(`[aria-label="Channel to edit"] >> visible=true`).first().click({ timeout: 5000 }); await sleep(700);
      await p.getByRole("option", { name: /^Matrix/ }).first().click({ timeout: 5000 }); await sleep(1200);
      await p.evaluate(() => document.querySelector('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]')?.click()); await sleep(800);
      r.surfaceItems = await p.evaluate(() => [...document.querySelectorAll('[data-dock-surface-item]')].filter((e) => e.getBoundingClientRect().width > 0).map((e) => e.getAttribute("aria-label")));
      await p.evaluate(() => [...document.querySelectorAll('[data-dock-surface-item]')].find((e) => e.getBoundingClientRect().width > 0 && /^Matrix/.test(e.getAttribute("aria-label") ?? ""))?.click()); await sleep(1800);
      r.rest = await p.evaluate(read); if (!r.rest.open) throw new Error("facet did not open");
      await p.screenshot({ path: `${FR}${tag}-rest.jpg`, type: "jpeg", quality: 70 });
      await p.evaluate(toEnd); await sleep(600);
      r.end = await p.evaluate(read);
      await p.screenshot({ path: `${FR}${tag}-end.jpg`, type: "jpeg", quality: 70 });
      r.verdict = r.end.titleVis ? "IN-VIEW" : "SCROLLED-OUT";
    } catch (e) { r.error = String(e.message ?? e).slice(0, 200); }
    r.pageerrors = errs; rows.push(r);
    await ctx.close();
  }
} finally {
  await b.close();
}
fs.writeFileSync(`${OUT}${RUN}.json`, JSON.stringify(rows, null, 1));
for (const r of rows) console.log(r.error ? `${r.vp} ${r.theme} ERROR ${r.error}` : `${r.vp} ${r.theme} load=${r.load1} rest.title=${r.rest.titleVis}${JSON.stringify(r.rest.titleBox)} end.title=${r.end.titleVis}${JSON.stringify(r.end.titleBox)} head=${r.rest.headVis}/${r.end.headVis}"${r.end.headText}" hosts=${JSON.stringify(r.end.hosts)} rest.boxes=${JSON.stringify(r.rest.boxes)} errs=${r.pageerrors.length} → ${r.verdict}`);
