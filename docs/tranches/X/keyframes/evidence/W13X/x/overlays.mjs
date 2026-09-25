// SERVED MODEL: claude-opus-5-5 — KF.W13X.x · addendum (b): the overlays read on EVERY scene (AUDIT-2 read them on /cube only),
// at 360/390/430/844x390/768x1024/1024x768, both themes. READ-ONLY. Usage: BASE=http://localhost:5194 THEMES=dark TAG=dark-run1 node overlays.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const FR = OUT + "frames/"; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5194";
const ROUTES = (process.env.ROUTES || "home,cube,amiga,square,easing,spring,sequence").split(",");
const VPS = (process.env.VPS || "360x780,390x844,430x932,844x390,768x1024,1024x768").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const SHOTS = new Set((process.env.SHOTS || "390x844,844x390,768x1024").split(","));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ov = () => { const vw = innerWidth, vh = innerHeight; const out = [];
  for (const e of document.querySelectorAll("[role=dialog]:not([data-slot=sheet-content]),[role=alertdialog],[role=listbox],[role=menu],[data-slot=popover-content]")) {
    const s = getComputedStyle(e); if (s.display === "none" || s.visibility === "hidden") continue; const r = e.getBoundingClientRect(); if (!r.width) continue;
    const kids = [...e.querySelectorAll("[role=menuitem],[role=option],button,a[href],input")].filter((k) => k.getBoundingClientRect().width > 0);
    const small = kids.filter((k) => { const q = k.getBoundingClientRect(); return q.height < 24 || q.width < 24; }).length;
    const clippedKids = kids.filter((k) => { const q = k.getBoundingClientRect(); return q.bottom > vh || q.top < 0 || q.right > vw || q.left < 0; }).length;
    out.push({ role: e.getAttribute("role") || e.getAttribute("data-slot"), w: +r.width.toFixed(1), h: +r.height.toFixed(1), gutL: +r.left.toFixed(1), gutR: +(vw - r.right).toFixed(1), gutT: +r.top.toFixed(1), gutB: +(vh - r.bottom).toFixed(1), scrolls: e.scrollHeight > e.clientHeight + 2, kids: kids.length, small, clippedKids }); }
  return out; };
const rows = [];
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const expand = async () => { const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click({ timeout: 3000 }).catch(() => {}); await sleep(800); } };
  const menu = async () => { await expand(); await p.locator('[aria-label="@mbabb menu"]:visible').first().click({ timeout: 3000 }); await sleep(700); };
  const STEPS = {
    "o6-channel-select": null,
    "o1-scene-select": async () => { await expand(); await p.locator('[data-dock-tether=top] [role=combobox][aria-label="Scene"]').first().click({ timeout: 3000 }); },
    "o2-mbabb-menu": menu,
    "o3-shortcuts": async () => { await menu(); await p.getByRole("menuitem", { name: /Keyboard shortcuts/ }).click({ timeout: 3000 }); },
    "o4-share": async () => { await menu(); await p.getByRole("menuitem", { name: /Share/ }).click({ timeout: 3000 }); },
    "o5-clear-confirm": async () => { await menu(); await p.getByRole("menuitem", { name: /Clear all/ }).click({ timeout: 3000 }); },
    "o6-channel-select-x": async () => { const bb = p.locator('[data-dock-tether=bottom] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bb.count()) { await bb.click({ timeout: 3000 }).catch(() => {}); await sleep(800); } if (!(await p.locator('[aria-label="Select animation"]:visible').count())) throw new Error("ABSENT: no visible channel select on this route"); await p.locator('[aria-label="Select animation"]:visible').first().click({ timeout: 3000 }); },
  };
  STEPS["o6-channel-select"] = STEPS["o6-channel-select-x"]; delete STEPS["o6-channel-select-x"];
  for (const route of ROUTES) {
    await p.goto(`${BASE}/#/${route === "home" ? "" : route}`); await p.evaluate((t) => { try { localStorage.clear(); localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme); await p.reload(); await sleep(3200);
    for (const [name, fn] of Object.entries(STEPS)) {
      try { try { await fn(); } catch (e1) { if (String(e1).includes("ABSENT")) throw e1; for (let i = 0; i < 2; i++) { await p.keyboard.press("Escape").catch(() => {}); await sleep(400); } await fn(); } await sleep(900); const o = await p.evaluate(ov);
        const tag = `${name}-${route}-${vpS}-${theme}`; if (SHOTS.has(vpS)) await p.screenshot({ path: `${FR}${tag}.jpg`, type: "jpeg", quality: 65 });
        rows.push({ step: name, route, vp: vpS, theme, overlays: o, frame: SHOTS.has(vpS) ? `frames/${tag}.jpg` : null });
      } catch (e) { rows.push({ step: name, route, vp: vpS, theme, error: String(e).split("\n")[0].slice(0, 160) }); }
      for (let i = 0; i < 2; i++) { await p.keyboard.press("Escape").catch(() => {}); await sleep(350); }
    }
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}overlays-${process.env.TAG || "run1"}.json`, JSON.stringify(rows, null, 1));
const flag = (o) => o.gutL < 8 || o.gutR < 8 || o.gutT < 0 || o.gutB < 0 || o.clippedKids > 0;
console.log("states", rows.length, "errors", rows.filter((r) => r.error).length, "flagged", rows.filter((r) => r.overlays?.some(flag)).length, "empty", rows.filter((r) => r.overlays && !r.overlays.length).length);
for (const r of rows) if (r.error || !r.overlays.length || r.overlays.some(flag)) console.log(r.step, r.route, r.vp, r.theme, r.error || JSON.stringify(r.overlays.map((o) => [o.role, o.w, o.h, o.gutL, o.gutR, o.gutT, o.gutB, o.clippedKids, o.scrolls ? "SCROLL" : ""])));
