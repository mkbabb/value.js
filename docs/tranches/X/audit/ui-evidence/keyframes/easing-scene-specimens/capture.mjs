// easing-scene-specimens audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
// Writes only beside this file. Records keyframes.js HEAD sha + dirty count per run.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const FAMILIES = ["Standard", "Sine", "Quad", "Cubic", "Expo", "Circ", "Back", "Bounce", "Steps", "All"];
const log = { ...tree(), when: new Date().toISOString(), runs: [] };
const ONLY = process.argv[2];
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const grid = document.querySelector(".specimen-tile")?.parentElement, drawer = document.querySelector(".specimen-drawer");
  const tiles = [...document.querySelectorAll(".specimen-tile")];
  const onTile = document.querySelector(".specimen-tile[data-state=on]");
  const vis = tiles.filter(t => { const b = t.getBoundingClientRect(), d = drawer.getBoundingClientRect(); return b.left >= d.left - 1 && b.right <= d.right + 1; }).length;
  const balls = [...document.querySelectorAll(".tile-ball")].slice(0, 3).map(b => b.style.transform);
  const drw = document.querySelector(".glass-drawer");
  return {
    theme: document.documentElement.className.slice(0, 40), bodyBg: getComputedStyle(document.body).backgroundColor,
    name: document.querySelector(".specimen-name")?.textContent.trim(), literal: document.querySelector(".literal-text")?.textContent.trim(),
    tiles: tiles.length, tilesFullyVisible: vis, onTile: onTile?.textContent.trim(), gridDisplay: grid && getComputedStyle(grid).display, grid: r(grid), drawer: r(drawer),
    drawerScroll: drawer && [drawer.scrollLeft, drawer.scrollWidth, drawer.clientWidth], balls,
    gapCaption: [...document.querySelectorAll("p")].find(p => /engine-native/.test(p.textContent))?.textContent.trim().slice(0, 80) ?? null,
    previewBall: !!document.querySelector(".animation-visualizer, [class*=visualizer]"),
    active: document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim().slice(0, 24)),
    sheet: r(drw), hscroll: document.documentElement.scrollWidth > innerWidth,
    copyLabel: [...document.querySelectorAll("button")].filter(b => /Cop(y|ied)/.test(b.getAttribute("aria-label") || "")).map(b => b.getAttribute("aria-label")),
  };
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160) + " @" + (m.location()?.url || "").slice(-60)); });
  page.on("requestfailed", (q) => errs.push("reqfail " + q.url().slice(-80)));
  page.on("response", (q) => { if (q.status() >= 400) errs.push(q.status() + " " + q.url().slice(-80)); });
  await page.goto(`http://localhost:5173/#/easing`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
}
async function crop(page, run, name, sel, pad = 8) {
  const b = await page.locator(sel).first().boundingBox(); if (!b) return;
  const vp = page.viewportSize(); const x = Math.max(0, b.x - pad), y = Math.max(0, b.y - pad);
  const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p, clip: { x, y, width: Math.min(vp.width - x, b.width + 2 * pad), height: Math.min(vp.height - y, b.height + 2 * pad) } });
  run.frames.push({ frame: p, crop: sel });
}
const park = (page, vp) => page.mouse.move(5, VPS[vp].height / 2);
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await park(page, vp); await shot(page, run, "00-load");
    await crop(page, run, "00c-card-crop", ".easing-target");
    if (vp === "1440") await crop(page, run, "00d-sidebar-crop", ".panel-content", 16);
    // play: the dock transport
    const play = page.getByRole("button", { name: "Play animation" }).first();
    await play.click(); await page.waitForTimeout(450); await park(page, vp);
    await shot(page, run, "01-playing-midsweep");
    await page.waitForTimeout(900); await shot(page, run, "01b-playing-later");
    const pause = page.getByRole("button", { name: "Pause animation" }).first(); if (await pause.count()) await pause.click();
    await page.waitForTimeout(400);
    // drawer scrolled to its end (the row tail)
    run.notes.drawerScrollMax = await page.evaluate(() => { const d = document.querySelector(".specimen-drawer"); d.scrollLeft = d.scrollWidth; d.scrollTop = d.scrollHeight; return [d.scrollLeft, d.scrollTop]; });
    await page.waitForTimeout(500); await shot(page, run, "02-drawer-scrolled-end");
    await page.evaluate(() => { const d = document.querySelector(".specimen-drawer"); d.scrollLeft = 0; d.scrollTop = 0; });
    // each family filter
    for (const [i, f] of FAMILIES.entries()) {
      await page.getByRole("group", { name: "Filter curves by family" }).getByRole("radio", { name: f, exact: true }).or(page.getByRole("group", { name: "Filter curves by family" }).getByRole("button", { name: f, exact: true })).first().click();
      await page.waitForTimeout(600); await park(page, vp);
      await shot(page, run, `03${String(i).padStart(2, "0")}-filter-${f.toLowerCase()}`);
    }
    // tile hover + keyboard focus
    const t3 = page.locator(".specimen-tile").nth(2); const tb = await t3.boundingBox();
    if (tb) { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.waitForTimeout(500); await crop(page, run, "04-tile-hover-crop", ".specimen-drawer", 4); }
    await park(page, vp);
    await page.locator(".specimen-tile").nth(1).focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(400);
    await shot(page, run, "05-tile-kbd-focus");
    await page.keyboard.press("Enter"); await page.waitForTimeout(600); await shot(page, run, "05b-tile-kbd-select");
    // engine-native (bounce) + steps selections
    for (const nm of ["ease-in-bounce", "steps"]) {
      await page.locator(`.specimen-tile:has-text("${nm}")`).first().click(); await page.waitForTimeout(800); await park(page, vp);
      await shot(page, run, `06-select-${nm}`);
    }
    // copy easing literal
    await page.getByRole("button", { name: "Copy easing literal" }).first().click(); await page.waitForTimeout(250);
    run.notes.clipboard = await page.evaluate(() => navigator.clipboard.readText().catch(e => "ERR " + e));
    await shot(page, run, "07-copy-literal-copied"); await crop(page, run, "07c-copy-literal-crop", ".gallery-header", 8);
    await page.waitForTimeout(2200); await crop(page, run, "07d-copy-literal-reverted-crop", ".gallery-header", 8);
    // 390: expand the editor drawer (the editor-card stage)
    if (vp === "390") {
      const cp = page.getByRole("button", { name: "Controls panel" }).first();
      await cp.click(); await page.waitForTimeout(1400); await park(page, vp);
      await shot(page, run, "08-390-editor-drawer-expanded");
      run.notes.drawerInner = await page.evaluate(() => { const d = document.querySelector(".glass-drawer"); const sc = [...d.querySelectorAll("*")].find(e => e.scrollHeight > e.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(e).overflowY)); if (sc) { sc.scrollTop = sc.scrollHeight; return [sc.className.slice(0, 60), sc.scrollHeight, sc.clientHeight]; } return null; });
      await page.waitForTimeout(500); await shot(page, run, "08b-390-editor-drawer-scrolled");
    }
    // ball preview hidden vs shown
    const hide = page.getByRole("button", { name: "Hide ball preview" }).first();
    await hide.scrollIntoViewIfNeeded(); await hide.click(); await page.waitForTimeout(600); await park(page, vp);
    run.notes.hiddenPressed = await hide.getAttribute("aria-pressed");
    await shot(page, run, "09-preview-hidden");
    await hide.click(); await page.waitForTimeout(600); run.notes.shownPressed = await hide.getAttribute("aria-pressed");
    await shot(page, run, "09b-preview-shown-again");
    // keyboard walk (first 6 tabs from body)
    await page.evaluate(() => document.activeElement?.blur()); await park(page, vp);
    for (let k = 1; k <= 6; k++) { await page.keyboard.press("Tab"); await page.waitForTimeout(200); }
    await shot(page, run, "10-kbd-tab6");
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
