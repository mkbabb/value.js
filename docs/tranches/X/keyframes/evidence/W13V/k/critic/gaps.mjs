// SERVED MODEL: claude-opus-5-5
// KF.W13V Repair 1 · C1-4 (G-W13V-k3) — the four critic gaps `.k` left uncaptured, captured on the served
// page (headed, 1440x900), each sampled per rAF with frames at fixed offsets:
//   A. the tab-panel `@keyframes enter` slide (cube: switch dock surface Controls -> Keyframes)
//   B. tooltips (hover the transport's Play/Pause button — a glass <Tooltip>; the [role=tooltip] content)
//   C. toasts (Mod+S = Copy CSS on the Keyframes surface; glass's [data-slot=toast])
//   D. the matrix-editor cell + reset tweens (cube, Matrix channel -> Matrix Controls; one cell nudged by
//      ArrowUp, then Reset; `.cube-pose` transform per rAF)
// Usage: node gaps.mjs <baseUrl> <runTag>
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const base = (process.argv[2] || "http://localhost:5173/").replace(/#.*$/, "");
const tag = process.argv[3] || "run1";
const OUT = new URL("./gaps/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const out = {};
// sample(selector, props, ms): per-rAF [t, ...props] of the FIRST visible match, started now
const sample = (sel, ms) => p.evaluate(([sel, ms]) => new Promise((res) => {
    const rows = []; const t0 = performance.now(); const ids = new Map();
    const f = () => {
        const el = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().width > 0);
        if (el) { const cs = getComputedStyle(el); rows.push([+(performance.now() - t0).toFixed(0), +(+cs.opacity).toFixed(3), cs.transform.slice(0, 48), el.getAnimations().map((a) => a.animationName || a.constructor.name).join("|"), el.getAttribute("data-state"), cs.scale, cs.translate, (ids.has(el) ? ids : ids.set(el, "node" + ids.size)).get(el)]); }
        else rows.push([+(performance.now() - t0).toFixed(0), null]);
        if (performance.now() - t0 < ms) requestAnimationFrame(f); else res(rows);
    };
    requestAnimationFrame(f);
}), [sel, ms]);
const summarize = (rows) => { const vis = rows.filter((r) => r[1] !== null); const ops = vis.map((r) => r[1]); const tf = new Set(vis.map((r) => r[2])); return { frames: rows.length, present: vis.length, firstPresentMs: vis[0]?.[0] ?? null, opacityMin: ops.length ? Math.min(...ops) : null, opacityMax: ops.length ? Math.max(...ops) : null, distinctTransforms: tf.size, anims: [...new Set(vis.map((r) => r[3]).filter(Boolean))], states: [...new Set(vis.map((r) => r[4]))], scales: [...new Set(vis.map((r) => r[5]))].slice(0, 6), translates: [...new Set(vis.map((r) => r[6]))].slice(0, 6), ids: [...new Set(vis.map((r) => r[7]))] }; };
const shot = (name) => p.screenshot({ path: `${OUT}${tag}-${name}.png` });
const item = (label) => p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${label}"]`);
const openItem = async (label) => { await p.locator("[data-dock-tether=top]").hover({ force: true }); await p.waitForTimeout(1300); await item(label).click(); };

await p.goto(base + "#/cube", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);

// B — tooltip (first, on the fresh page: the transport is expanded at load)
{ const pt = await p.evaluate(() => { const e = [...document.querySelectorAll('button[aria-label="Pause animation"], button[aria-label="Play animation"]')].find((x) => { const b = x.getBoundingClientRect(); return b.width && x.contains(document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)); }); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
  out.B_target = pt;
  const s = sample('[data-slot="tooltip-content"]', 4000); if (pt) { await p.mouse.move(pt.x - 40, pt.y - 40); await p.mouse.move(pt.x, pt.y, { steps: 6 }); } const rows = await s; out.B_tooltip = summarize(rows); out.B_rows = rows.filter((r, i) => i % 8 === 0).slice(0, 12); await shot("B-tooltip-shown"); }

await p.mouse.move(720, 450); await p.waitForTimeout(800);

// A — tab-panel enter
await openItem("Controls"); await p.waitForTimeout(900);
{ const s = sample('[data-state="active"][role="tabpanel"]', 400); await item("Keyframes").click(); const rows = await s; out.A_tabPanelEnter = summarize(rows); out.A_rows = rows.slice(0, 12); await p.waitForTimeout(60); await shot("A-tabpanel-after"); }

// C — toast from Copy CSS (Mod+S on the Keyframes surface)
await openItem("Keyframes"); await p.waitForTimeout(900);
await p.locator("body").click({ position: { x: 720, y: 450 } }).catch(() => {});
{ const s = sample('[data-slot="toast"]', 1200); await p.keyboard.press(process.platform === "darwin" ? "Meta+s" : "Control+s"); const rows = await s; out.C_toastIn = summarize(rows); out.C_rows = rows.filter((r, i) => i % 6 === 0).slice(0, 14); await shot("C-toast-in");
  const box = await p.evaluate(() => { const t = document.querySelector('[data-slot="toast"]'); if (!t) return null; const r = t.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), text: t.textContent.trim().slice(0, 60) }; }); out.C_toastBox = box;
  const s2 = sample('[data-slot="toast"]', 6500); const rows2 = await s2; const gone = rows2.findIndex((r) => r[1] === null); out.C_toastOut = { ...summarize(rows2), goneAtMs: gone >= 0 ? rows2[gone][0] : null, lastPresent: rows2.filter((r) => r[1] !== null).slice(-4) }; }

// D — matrix-editor: select the Matrix channel, open Matrix Controls, nudge a cell, then Reset
out.D = {};
{ await p.mouse.move(10, 890); await p.waitForTimeout(600);
  // the Matrix channel is picked from the transport's channel list (the bottom dock's combobox)
  const trig = p.locator("[data-dock-tether=bottom] [role=combobox]").first();
  await p.locator("[data-dock-tether=bottom]").hover({ force: true }); await p.waitForTimeout(1300);
  if (await trig.isVisible().catch(() => false)) { await trig.click(); await p.waitForTimeout(600); const opt = p.getByRole("option").filter({ hasText: /^\s*Matrix\s*$/ }).first(); out.D.matrixOption = await opt.count(); if (await opt.count()) { await opt.click(); await p.waitForTimeout(1200); } }
  out.D.channelNamed = (await trig.textContent().catch(() => null))?.trim() ?? null;
  const mc = item("Matrix Controls");
  out.D.matrixControlsItem = await mc.count();
  if (await mc.count()) { await openItem("Matrix Controls"); await p.waitForTimeout(900); }
  const cells = p.locator('[role="slider"]:visible');
  out.D.sliders = await cells.count();
  const cell = p.locator('.controls-pane--open [role="slider"]').nth(1);
  if (await cell.count()) {
    await cell.focus();
    const s = sample(".cube-pose", 700); await p.keyboard.press("ArrowUp"); await p.keyboard.press("ArrowUp"); await p.keyboard.press("ArrowUp"); const rows = await s; out.D.cellNudge = summarize(rows); await shot("D-cell-nudged");
    const reset = p.locator('.controls-pane--open button:visible', { hasText: /reset/i }).first();
    out.D.resetButton = await reset.count();
    if (await reset.count()) { const s2 = sample(".cube-pose", 900); await reset.click(); const rows2 = await s2; out.D.reset = summarize(rows2); out.D.resetRows = rows2.filter((r, i) => i % 6 === 0).slice(0, 12); await shot("D-after-reset"); }
  }
}
console.log(JSON.stringify(out, null, 0));
await b.close();
