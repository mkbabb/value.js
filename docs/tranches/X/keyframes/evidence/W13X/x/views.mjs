// SERVED MODEL: claude-opus-5-5 — KF.W13X.x · addendum (b): the views AUDIT-2 never read at phone/tablet size, both themes.
// READ-ONLY. Injects AUDIT-2's own instrument (audit-2/keyframes-L2/probe/measure.js, immutable) plus an overlay reader.
// Usage: BASE=http://localhost:5194 THEMES=light VPS=390x844 RUN=1 node views.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const FR = OUT + "frames/"; fs.mkdirSync(FR, { recursive: true });
const measureSrc = fs.readFileSync("/Users/mkbabb/Programming/value.js/docs/tranches/X/audit/audit-2/keyframes-L2/probe/measure.js", "utf8");
const BASE = process.env.BASE || "http://localhost:5194";
const VPS = (process.env.VPS || "360x780,390x844,430x932,844x390,768x1024,1024x768").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const ONLY = process.env.VIEWS ? process.env.VIEWS.split(",") : null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ov = () => { const vw = innerWidth, vh = innerHeight; const out = [];
  for (const e of document.querySelectorAll("[role=dialog]:not([data-slot=sheet-content]),[role=alertdialog],[role=listbox],[role=menu],[data-slot=popover-content],[data-sonner-toast],[data-slot^=toast],ol[data-sonner-toaster] li")) {
    const s = getComputedStyle(e); if (s.display === "none" || s.visibility === "hidden") continue; const r = e.getBoundingClientRect(); if (!r.width) continue;
    out.push({ role: e.getAttribute("role") || e.getAttribute("data-slot") || e.tagName, w: +r.width.toFixed(1), h: +r.height.toFixed(1), gutL: +r.left.toFixed(1), gutR: +(vw - r.right).toFixed(1), gutT: +r.top.toFixed(1), gutB: +(vh - r.bottom).toFixed(1), sh: e.scrollHeight, ch: e.clientHeight, ovY: s.overflowY }); }
  const se = document.scrollingElement; return { ov: out, docSH: se.scrollHeight, ih: vh, docSW: se.scrollWidth, vw }; };
const rows = [];
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  await ctx.addInitScript(measureSrc);
  const p = await ctx.newPage();
  const go = async (route) => { await p.unroute("**/*").catch(() => {}); await p.goto(`${BASE}/#/${route}`); await p.evaluate((t) => { try { localStorage.clear(); sessionStorage.clear(); localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme); await p.reload(); await sleep(3200); };
  const expand = async () => { const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click({ timeout: 3000 }).catch(() => {}); await sleep(800); } };
  const surface = async (l) => { await expand(); if ((await p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${l}"]`).first().getAttribute("aria-pressed")) === "true") return; await p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${l}"]`).first().click({ timeout: 3000, force: true }); await sleep(1300); };
  const press = async (l) => { const x = p.locator(`[aria-label="${l}"]:visible, button:visible:has-text("${l}")`).first(); await x.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {}); await x.click({ timeout: 3000 }); await sleep(1100); };
  const pickAnim = async (name) => { await p.locator('[aria-label="Select animation"]:visible').first().click({ timeout: 3000 }); await sleep(700); await p.getByRole("option", { name: new RegExp(`^${name}`) }).first().click({ timeout: 3000 }); await sleep(1300); };
  const rec = async (view, route) => { const tag = `${view}-${vpS}-${theme}`; await p.screenshot({ path: `${FR}${tag}.jpg`, type: "jpeg", quality: 70 });
    const m = await p.evaluate((s) => window.__kfMeasure(s), view); const o = await p.evaluate(ov);
    rows.push({ view, route, vp: vpS, theme, frame: `frames/${tag}.jpg`, docSH: o.docSH, ih: o.ih, docSW: o.docSW, vw: o.vw, overlays: o.ov, pastEdgeCount: m.pastEdgeCount, pastEdge: (m.pastEdge || []).slice(0, 5), tinyCount: m.tinyCount, tinyText: (m.tinyText || []).slice(0, 5), smallTargets: m.smallTargets, occludedTargets: m.occludedTargets }); };
  const VIEWS = {
    "v1-timeline-expanded": async () => { await go("cube"); await surface("Timeline"); await press("Expand timeline"); return "cube"; },
    "v2-css-paste-add": async () => { await go("cube"); await surface("Timeline"); await press("Add CSS"); return "cube"; },
    "v2b-css-paste-import": async () => { await go("cube"); await surface("Timeline"); await press("Import"); return "cube"; },
    "v4-timing-detail": async () => { await go("cube"); await surface("Controls"); await press("Edit easing curve"); return "cube"; },
    "v5-matrix-facet": async () => { await go("cube"); await pickAnim("Matrix"); await expand(); const it = p.locator("[data-dock-tether=top] [data-dock-surface-item]:not([disabled]):not([aria-disabled=true])").last(); await it.click({ timeout: 3000, force: true }); await sleep(1400); return "cube"; },
    "v6-spring-entry": async () => { await go("spring"); await pickAnim("Entry"); return "spring"; },
    "v6b-spring-entry-controls": async () => { await go("spring"); await pickAnim("Entry"); await surface("Controls"); return "spring"; },
    "v7-toast": async () => { await go("cube"); await surface("Timeline"); await press("Snapshot"); await sleep(200); return "cube"; },
    "v8-skeleton": async () => { await p.goto(`${BASE}/#/`); await sleep(2500); await p.route(/\/scenes\/amiga\//, async (r) => { await sleep(6000); await r.continue().catch(() => {}); }); await p.goto(`${BASE}/#/amiga`); await sleep(1500); return "amiga"; },
  };
  for (const [view, fn] of Object.entries(VIEWS)) { if (ONLY && !ONLY.includes(view)) continue;
    try { const route = await fn(); await rec(view, route); } catch (e) { rows.push({ view, vp: vpS, theme, error: String(e).split("\n")[0].slice(0, 220) }); }
    await p.unroute("**/*").catch(() => {}); await p.unrouteAll({ behavior: "ignoreErrors" }).catch(() => {}); }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}views-${process.env.TAG || "run1"}.json`, JSON.stringify(rows, null, 1));
for (const r of rows) console.log(r.view, r.vp, r.theme, r.error ? "ERR " + r.error : `docSH ${r.docSH}/${r.ih} docSW ${r.docSW}/${r.vw} past ${r.pastEdgeCount} small ${r.smallTargets} occl ${r.occludedTargets} tiny ${r.tinyCount} ov ${JSON.stringify(r.overlays.map((o) => [o.role, o.w, o.h, o.gutL, o.gutR, o.gutT, o.gutB, o.sh > o.ch + 2 ? "SCROLL" : ""]))}`);
