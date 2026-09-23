// amiga-scene audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
// Writes only beside this file. Records keyframes.js HEAD sha + dirty count per run.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const log = { ...tree(), when: new Date().toISOString(), runs: [] };
const ONLY = process.argv[2];
const browser = await chromium.launch({ headless: false });
const pose = (page) => page.evaluate(() => { const q = window.__kfAmigaProbe?.pose(); return q && [+q.px.toFixed(3), +q.py.toFixed(3), +q.spin.toFixed(3), +q.ox.toFixed(2), +q.oy.toFixed(2), q.playing]; });
const measure = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const c = document.querySelector(".amiga-canvas");
  const sl = [...document.querySelectorAll(".amiga-canvas [role=slider]")].map(e => e.getAttribute("aria-valuetext"));
  const panel = document.querySelector("[role=tabpanel][data-state=active]");
  const vis = [...document.querySelectorAll("input,[role=combobox]")].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.x < innerWidth && b.y < innerHeight; }).map(e => (e.getAttribute("aria-label") || "") + "=" + (e.value || e.textContent.trim()).slice(0, 20));
  return { dark: document.documentElement.classList.contains("dark"), bodyBg: getComputedStyle(document.body).backgroundColor, canvas: r(c), canvasRadius: c && getComputedStyle(c).borderRadius, canvasOutline: c && getComputedStyle(c).outline.slice(0, 60), panel: r(panel), sliders: sl, controls: vis.slice(0, 14),
    active: document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim().slice(0, 20)), hscroll: document.documentElement.scrollWidth > innerWidth };
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160) + " @" + (m.location()?.url || "").slice(-60)); });
  page.on("response", (r) => { if (r.status() >= 400) errs.push(r.status() + " " + r.url().slice(-80)); });
  await page.goto(`http://localhost:5173/#/amiga`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const po = await pose(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, pose: po, ...m, ...extra });
}
const away = (page, vp) => page.mouse.move(5, VPS[vp].height / 2);
const ballCenter = async (page) => page.evaluate(() => { const c = document.querySelector(".amiga-canvas").getBoundingClientRect(); return { x: c.x + c.width / 2, y: c.y + c.height / 2 }; });
const hoverTopDock = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const hoverTransport = async (page) => { const bb = (await page.getByRole("button", { name: "Reset animation" }).first().boundingBox({ timeout: 2000 }).catch(() => null)) ?? (await page.getByRole("combobox", { name: "Select animation" }).first().boundingBox({ timeout: 2000 }).catch(() => null)) ?? (await page.getByRole("button", { name: /(Play|Pause) animation/ }).first().boundingBox({ timeout: 2000 }).catch(() => null)); if (bb) { await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(800); } };
const clickVisible = async (page, name) => { const bs = page.getByRole("button", { name, exact: true }); const n = await bs.count(); for (let i = 0; i < n; i++) if (await bs.nth(i).isVisible()) { await bs.nth(i).click({ timeout: 3000 }); return true; } return false; };
const ensurePlaying = async (page) => { await hoverTransport(page); return clickVisible(page, "Play animation"); };
const ensurePaused = async (page) => { await hoverTransport(page); return clickVisible(page, "Pause animation"); };
const pickAnim = async (page, name) => { await hoverTransport(page); await page.getByRole("combobox", { name: "Select animation" }).first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name, exact: true }).first().click(); await page.waitForTimeout(800); };
const pickTab = async (page, name) => { await hoverTopDock(page); const c = page.getByRole("combobox", { name: "Controls tab" }).first(); if (!(await c.count())) return false; await c.click(); await page.waitForTimeout(600); const o = page.getByRole("option", { name, exact: true }).first(); if (!(await o.count())) { await page.keyboard.press("Escape"); return false; } await o.click(); await page.waitForTimeout(1000); return true; };
const sample = async (page, n, ms) => { const s = []; for (let i = 0; i < n; i++) { s.push(await pose(page)); await page.waitForTimeout(ms); } return s; };
// linearity of X over a window: mean |second difference| of px, normalized
const curvature = (s) => { const xs = s.map(q => q[0]); let acc = 0, k = 0; for (let i = 2; i < xs.length; i++) { const d1 = xs[i - 1] - xs[i - 2], d2 = xs[i] - xs[i - 1]; if (Math.sign(d1) === Math.sign(d2)) { acc += Math.abs(d2 - d1); k++; } } return +(acc / Math.max(k, 1)).toFixed(4); };

for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    run.notes.loadPose = await pose(page);
    await shot(page, run, "00-load-idle");
    await hoverTopDock(page); await shot(page, run, "01-top-dock-hover");
    await away(page, vp); await page.waitForTimeout(500);
    await hoverTransport(page); await page.getByRole("combobox", { name: "Select animation" }).first().click(); await page.waitForTimeout(700);
    await shot(page, run, "02-channel-select-open"); await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    // PLAY — Bouncing X NOT yet selected in the panel (its authored LINEAR easing is intact)
    run.notes.playClicked = await ensurePlaying(page); await away(page, vp);
    run.notes.xBeforeSelect = await sample(page, 24, 60); run.notes.xCurvBefore = curvature(run.notes.xBeforeSelect);
    await shot(page, run, "03a-playing-spin-selected");
    // select Bouncing X, then Bouncing Y (ChannelOptions onMounted re-applies the stored default easing)
    await pickAnim(page, "Bouncing X"); await away(page, vp); await page.waitForTimeout(300);
    run.notes.xAfterSelect = await sample(page, 24, 60); run.notes.xCurvAfter = curvature(run.notes.xAfterSelect);
    await shot(page, run, "03b-playing-bouncingX-selected");
    await pickAnim(page, "Bouncing Y"); await away(page, vp); await page.waitForTimeout(300);
    await shot(page, run, "03c-playing-bouncingY-selected");
    // PAUSE mid-flight
    run.notes.pauseClicked = await ensurePaused(page); await away(page, vp);
    run.notes.afterPause = await sample(page, 8, 100);
    await shot(page, run, "04-paused-midflight");
    // RESET (stop) → settle to home
    await ensurePlaying(page); await away(page, vp); await page.waitForTimeout(900);
    await hoverTransport(page); run.notes.resetPre = await pose(page);
    await clickVisible(page, "Reset animation"); await page.waitForTimeout(60); await shot(page, run, "05a-reset-settle-60ms");
    run.notes.resetSamples = await sample(page, 10, 80);
    await shot(page, run, "05b-reset-settled-900ms");
    await page.waitForTimeout(800); await away(page, vp); await shot(page, run, "05c-reset-rest");
    // DRAG-spin the ball (at rest, centred), then the decay glide
    const c = await ballCenter(page); await page.mouse.move(c.x, c.y); await page.mouse.down();
    for (let k = 1; k <= 8; k++) { await page.mouse.move(c.x + k * 14, c.y + k * 5); await page.waitForTimeout(16); }
    await shot(page, run, "06a-drag-spin-mid"); await page.mouse.up();
    await page.waitForTimeout(120); await shot(page, run, "06b-glide-120ms");
    await page.waitForTimeout(1800); await shot(page, run, "06c-glide-settled");
    // keyboard: focus the subject, nudge, fine nudge, Home
    await page.locator(".amiga-canvas").focus(); await page.waitForTimeout(300); await shot(page, run, "07a-kbd-focus");
    await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowUp"); await page.waitForTimeout(400);
    await shot(page, run, "07b-kbd-arrows-yaw45-pitch-22");
    await page.keyboard.press("Shift+ArrowLeft"); await page.waitForTimeout(300); run.notes.afterFine = (await measure(page)).sliders;
    await page.keyboard.press("Home"); await page.waitForTimeout(700); await shot(page, run, "07c-kbd-home");
    // keyframes + timeline surfaces (the separate-pane idiom)
    await page.locator("body").click({ position: { x: 3, y: 3 } }).catch(() => {});
    if (await pickTab(page, "Keyframes")) { await away(page, vp); await page.waitForTimeout(600); await shot(page, run, "08-keyframes-tab"); }
    if (await pickTab(page, "Timeline")) { await away(page, vp); await page.waitForTimeout(600); await shot(page, run, "09-timeline-tab"); }
    await pickTab(page, "Controls");
    // panel closed → full-bleed subject
    await hoverTopDock(page); if (await clickVisible(page, "Controls panel")) { await page.waitForTimeout(1200); await away(page, vp); await page.waitForTimeout(1500); await shot(page, run, "10-panel-closed-fullbleed"); }
    await away(page, vp); await page.waitForTimeout(300); run.notes.collapsedTransport = await page.evaluate(() => [...document.querySelectorAll("button,[role=combobox]")].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.y > innerHeight - 160; }).map(e => { const b = e.getBoundingClientRect(); return (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 24) + " " + [b.x, b.y, b.width, b.height].map(Math.round).join(","); }));
    await hoverTransport(page); await shot(page, run, "11a-fullbleed-transport-hover");
    run.notes.play11 = await clickVisible(page, "Play animation"); await away(page, vp); await page.waitForTimeout(1200); await shot(page, run, "11b-fullbleed-playing");
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
