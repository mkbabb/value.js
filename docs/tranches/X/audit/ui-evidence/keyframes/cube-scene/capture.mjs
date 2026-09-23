// cube-scene audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
// Writes only beside this file. Records keyframes.js HEAD sha + dirty count per run.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const log = { ...tree(), when: new Date().toISOString(), runs: [] };
const ONLY = process.argv[2]; // optional "1440-light" etc
const browser = await chromium.launch({ headless: false });

const measure = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const cube = document.querySelector(".cube"), bob = document.querySelector(".cube-bob"), pose = document.querySelector(".cube-pose"), roll = document.querySelector(".idle-hover");
  const orb = roll?.parentElement;
  const tf = (e) => e ? getComputedStyle(e).transform.slice(0, 70) : null;
  const panel = document.querySelector("[role=tabpanel][data-state=active]");
  const lines = [...document.querySelectorAll(".axis-line")].map(e => ({ cls: e.className, op: getComputedStyle(e).opacity }));
  const face = document.querySelector(".cube-side"), num = document.querySelector(".face-numeral");
  return {
    theme: document.documentElement.className.slice(0, 40), dataTheme: document.documentElement.dataset.theme ?? null,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    cube: r(cube), cubeTf: tf(cube), bobTf: tf(bob), poseTf: tf(pose), rollTf: tf(roll), orbTf: tf(orb),
    faceRadius: face ? getComputedStyle(face).borderTopLeftRadius : null, numeral: num ? getComputedStyle(num).color + " " + getComputedStyle(num).fontSize + " " + getComputedStyle(num).fontFamily.split(",")[0] : null,
    panel: r(panel), panelText: panel?.textContent.trim().slice(0, 80),
    tabs: [...document.querySelectorAll("button[role=combobox]")].map(e => (e.getAttribute("aria-label") || "sel") + ":" + e.textContent.trim().slice(0, 18)),
    lines, pp: !!document.querySelector(".ppmycota-cube"),
    active: document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim().slice(0, 20)),
    hscroll: document.documentElement.scrollWidth > innerWidth,
  };
});
async function fresh(vp, theme, touch = false) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme, hasTouch: touch, isMobile: touch });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160) + " @" + (m.location()?.url || "").slice(-60)); });
  await page.goto(`http://localhost:5173/#/cube`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
}
const cubeCenter = async (page) => { const b = await page.locator(".cube").first().boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
const hoverTopDock = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const hoverTransport = async (page) => { const bs = page.getByRole("button", { name: /(Play|Pause) animation/ }); const n = await bs.count(); for (let i = 0; i < n; i++) { const bb = await bs.nth(i).boundingBox(); if (bb && bb.width > 0) { await page.mouse.move(bb.x + bb.width / 2 + 30, bb.y + bb.height / 2); await page.waitForTimeout(900); return; } } };
const pickAnim = async (page, name) => { await hoverTransport(page); await page.getByRole("combobox", { name: "Select animation" }).first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(800); };
const pickTab = async (page, name) => { await hoverTopDock(page); const c = page.getByRole("combobox", { name: "Controls tab" }).first(); if (!(await c.count())) return false; await c.click(); await page.waitForTimeout(600); const o = page.getByRole("option", { name }).first(); if (!(await o.count())) { await page.keyboard.press("Escape"); return false; } await o.click(); await page.waitForTimeout(900); return true; };
const tabOptions = (page) => page.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim()));
const motion = async (page) => { const a = await page.evaluate(() => [".cube", ".cube-bob", ".cube-pose"].map(s => getComputedStyle(document.querySelector(s)).transform)); await page.waitForTimeout(500); const b = await page.evaluate(() => [".cube", ".cube-bob", ".cube-pose"].map(s => getComputedStyle(document.querySelector(s)).transform)); return { cube: a[0] !== b[0], bob: a[1] !== b[1], pose: a[2] !== b[2] }; };
const ensurePlaying = async (page) => { await hoverTransport(page); const p = page.getByRole("button", { name: "Play animation" }).first(); if (await p.count() && await p.isVisible()) { await p.click(); await page.waitForTimeout(700); } };
const ensurePaused = async (page) => { await hoverTransport(page); const p = page.getByRole("button", { name: "Pause animation" }).first(); if (await p.count() && await p.isVisible()) { await p.click(); await page.waitForTimeout(700); } };

for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    run.notes.autoplayMotion = await motion(page);
    await shot(page, run, "00-load-autoplay");
    await ensurePaused(page); run.notes.pausedMotion = await motion(page);
    await page.mouse.move(5, VPS[vp].height / 2); await page.waitForTimeout(400);
    await shot(page, run, "01-idle-paused");
    // hover on the cube while idle (the .graph:hover path)
    let c = await cubeCenter(page); await page.mouse.move(c.x, c.y); await page.waitForTimeout(900);
    run.notes.hoverIdleMotion = await motion(page); await shot(page, run, "02-idle-hover-cube");
    await page.mouse.move(5, VPS[vp].height / 2);
    // channel select open
    await page.getByRole("combobox", { name: "Select animation" }).first().click(); await page.waitForTimeout(700);
    await shot(page, run, "03-channel-select-open"); await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    for (const [i, ch] of ["Rotations", "Matrix", "Hover"].entries()) {
      await pickAnim(page, ch); await ensurePlaying(page); await page.mouse.move(5, VPS[vp].height / 2); await page.waitForTimeout(900);
      run.notes["motion-" + ch] = await motion(page);
      await shot(page, run, `04${"abc"[i]}-playing-${ch.toLowerCase()}`);
      if (ch === "Matrix") {
        await hoverTopDock(page); const cc = page.getByRole("combobox", { name: "Controls tab" }).first();
        if (await cc.count()) { await cc.click(); await page.waitForTimeout(600); run.notes.tabsWithMatrix = await tabOptions(page); await shot(page, run, "05a-controls-tab-open-matrix"); await page.keyboard.press("Escape"); await page.waitForTimeout(300); }
        if (await pickTab(page, "Matrix Controls")) { await page.mouse.move(5, VPS[vp].height / 2); await page.waitForTimeout(500); run.notes.motionOnMatrixControls = await motion(page); await shot(page, run, "05b-matrix-controls-surface"); const g = await page.locator(".matrix-grid:visible").first().boundingBox(); if (g) await page.screenshot({ path: OUT + `05b-matrix-grid-crop-${run.tag}.png`, clip: { x: g.x - 12, y: g.y - 12, width: g.width + 24, height: g.height + 60 } }); const cell = page.locator(".matrix-grid:visible input").nth(5); if (await cell.count()) { const cb = await cell.boundingBox(); run.notes.cellHit = await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); const grids = [...document.querySelectorAll(".matrix-grid")]; const vis = grids.filter(g => g.getBoundingClientRect().width > 0); const inp = vis[0].querySelectorAll("input")[5]; const cs = getComputedStyle(inp); return { grids: grids.length, visibleGrids: vis.length, hitTag: e?.tagName, hitCls: String(e?.className).slice(0, 90), isInput: e === inp, inputRect: [inp.offsetWidth, inp.offsetHeight], inputRadius: cs.borderTopLeftRadius, inputFont: cs.fontSize, labelPE: getComputedStyle(inp.nextElementSibling).pointerEvents, labelFont: getComputedStyle(inp.nextElementSibling).fontSize, cellRadius: getComputedStyle(inp.parentElement).borderTopLeftRadius }; }, [cb.x + cb.width / 2, cb.y + cb.height / 2]); await page.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2); await page.waitForTimeout(400); run.notes.cellFocus = await page.evaluate(() => ({ tag: document.activeElement?.tagName, inGrid: !!document.activeElement?.closest(".matrix-grid") })); await shot(page, run, "05b2-matrix-cell-focus"); if (g) await page.screenshot({ path: OUT + `05b2-matrix-cell-focus-crop-${run.tag}.png`, clip: { x: g.x - 12, y: g.y - 12, width: g.width + 24, height: g.height + 60 } }); } }
        if (await pickTab(page, "Keyframes")) { await page.mouse.move(5, VPS[vp].height / 2); await page.waitForTimeout(500); run.notes.motionOnKeyframes = await motion(page); await shot(page, run, "05c-keyframes-surface-matrix"); }
        if (await pickTab(page, "Timeline")) { await page.mouse.move(5, VPS[vp].height / 2); await page.waitForTimeout(500); run.notes.motionOnTimeline = await motion(page); await shot(page, run, "05d-timeline-surface-matrix"); }
        await pickTab(page, "Controls");
      }
    }
    await pickAnim(page, "Rotations"); await ensurePaused(page);
    // orbital drag + inertia
    c = await cubeCenter(page); await page.mouse.move(c.x, c.y); await page.mouse.down();
    for (let k = 1; k <= 8; k++) { await page.mouse.move(c.x + k * 18, c.y + k * 6); await page.waitForTimeout(16); }
    await shot(page, run, "06a-orbit-drag-mid"); await page.mouse.up();
    await page.waitForTimeout(80); await shot(page, run, "06b-orbit-inertia-80ms");
    const t1 = (await measure(page)).orbTf; await page.waitForTimeout(1500);
    await shot(page, run, "06c-orbit-settled-1580ms"); run.notes.inertiaMoved = t1 !== (await measure(page)).orbTf;
    // wheel on cube (scale / translate)
    await page.mouse.move(c.x, c.y); await page.mouse.wheel(0, -300); await page.waitForTimeout(600); await shot(page, run, "06d-wheel-up");
    // axis lock: hold X
    await page.mouse.move(5, VPS[vp].height / 2); await page.keyboard.down("x"); await page.waitForTimeout(400); await shot(page, run, "07a-axis-x-armed");
    c = await cubeCenter(page); await page.mouse.move(c.x, c.y); await page.mouse.down(); for (let k = 1; k <= 6; k++) { await page.mouse.move(c.x + k * 20, c.y + k * 20); await page.waitForTimeout(16); } await page.mouse.up();
    await page.waitForTimeout(300); await shot(page, run, "07b-axis-x-drag"); await page.keyboard.up("x"); await page.waitForTimeout(300);
    await page.keyboard.down("y"); await page.waitForTimeout(400); await shot(page, run, "07c-axis-y-armed"); await page.keyboard.up("y");
    await page.keyboard.down("z"); await page.waitForTimeout(400); await shot(page, run, "07d-axis-z-armed"); await page.keyboard.up("z"); await page.waitForTimeout(300);
    // double-tap roll egg
    c = await cubeCenter(page); await page.mouse.click(c.x, c.y); await page.waitForTimeout(90); await page.mouse.click(c.x, c.y); await page.waitForTimeout(400);
    await shot(page, run, "08a-roll-mid"); await page.waitForTimeout(1200); await shot(page, run, "08b-roll-settled");
    // ppmycota on
    await hoverTopDock(page); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(700);
    await page.getByRole("menuitemcheckbox", { name: /ppmycota/ }).first().click().catch(async () => { await page.getByRole("menuitem", { name: /ppmycota/ }).first().click(); });
    await page.waitForTimeout(900); await page.keyboard.press("Escape"); await page.mouse.move(5, VPS[vp].height / 2); await page.waitForTimeout(600);
    await shot(page, run, "09a-ppmycota-on");
    await ensurePlaying(page); await page.waitForTimeout(800); await shot(page, run, "09b-ppmycota-playing"); await ensurePaused(page);
    // panel closed → full-bleed stage
    await hoverTopDock(page); const tog = page.getByRole("button", { name: "Controls panel" }).first();
    if (await tog.count()) { await tog.click(); await page.waitForTimeout(1200); await page.mouse.move(5, VPS[vp].height / 2); await page.waitForTimeout(1500); await shot(page, run, "10-panel-closed-fullbleed"); }
    // keyboard focus walk (first 4 tabs)
    for (let k = 1; k <= 4; k++) { await page.keyboard.press("Tab"); await page.waitForTimeout(250); }
    await shot(page, run, "11-kbd-tab4");
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
// 390 touch: tap, one-finger orbit, two-finger pinch via CDP
if (!ONLY || ONLY === "390-touch") for (const theme of ["light"]) {
  const run = { tag: `390touch-${theme}`, vp: "390", ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh("390", theme, true);
    await shot(page, run, "12a-touch-load");
    const cdp = await ctx.newCDPSession(page);
    const c = await cubeCenter(page);
    const tp = (pts) => pts.map(([x, y], id) => ({ x, y, id }));
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: tp([[c.x, c.y]]) });
    for (let k = 1; k <= 8; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: tp([[c.x + k * 12, c.y + k * 4]]) }); await page.waitForTimeout(16); }
    await shot(page, run, "12b-touch-orbit-mid");
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await page.waitForTimeout(1500);
    await shot(page, run, "12c-touch-orbit-settled");
    const before = (await measure(page)).orbTf;
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: tp([[c.x - 30, c.y], [c.x + 30, c.y]]) });
    for (let k = 1; k <= 10; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: tp([[c.x - 30 - k * 8, c.y], [c.x + 30 + k * 8, c.y]]) }); await page.waitForTimeout(16); }
    await shot(page, run, "12d-touch-pinch-out-mid");
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await page.waitForTimeout(800);
    await shot(page, run, "12e-touch-pinch-settled"); run.notes.pinchChanged = before !== (await measure(page)).orbTf;
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
