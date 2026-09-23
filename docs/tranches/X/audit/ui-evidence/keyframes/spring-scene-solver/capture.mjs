// spring-scene-solver audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
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
const measure = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
  const cs = (sel, props) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return Object.fromEntries(props.map(p => [p, s[p]])); };
  const rail = document.querySelector(".spring-rail");
  return {
    dark: document.documentElement.classList.contains("dark"), bodyBg: getComputedStyle(document.body).backgroundColor,
    stage: r(document.querySelector(".spring-target")), stageRadius: cs(".spring-target", ["borderRadius", "backgroundColor"]),
    state: document.querySelector(".status-badge")?.textContent.trim(), x: document.querySelector(".spring-readout-primary")?.textContent.trim(),
    railNow: rail?.getAttribute("aria-valuenow"), derbyLanes: document.querySelectorAll(".derby-lane").length,
    presetCells: [...document.querySelectorAll(".preset-cell")].map(e => { const b = e.getBoundingClientRect(); return e.textContent.trim().replace(/\s+/g, " ") + " h" + Math.round(b.height) + " r=" + getComputedStyle(e).borderRadius + " st=" + e.getAttribute("data-state"); }),
    heatReadout: (() => { const e = document.querySelector(".spring-heatmap-section .text-mono-caption"); return e && [e.textContent.trim(), getComputedStyle(e).textTransform]; })(),
    kfSection: r(document.querySelector(".keyframes-section")), kfScroll: (() => { const e = document.querySelector(".keyframes-editor-scroll"); return e && [e.clientHeight, e.scrollHeight]; })(),
    ribbonBtns: [...document.querySelectorAll(".btn-playback")].map(e => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 16) + " " + r(e) + " r=" + getComputedStyle(e).borderRadius),
    pane: (() => { const e = document.querySelector(".controls-pane"); return e && [r(e), e.scrollHeight]; })(),
    active: document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.className?.toString().slice(0, 40)),
    hscroll: document.documentElement.scrollWidth > innerWidth,
  };
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
  page.on("response", (r) => { if (r.status() >= 400) errs.push(r.status() + " " + r.url().slice(-80)); });
  await page.goto(`http://localhost:5173/#/spring`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
}
const away = (page, vp) => page.mouse.move(VPS[vp].width - 4, VPS[vp].height / 2);
const railBox = (page) => page.locator(".spring-rail").boundingBox();
const reveal = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (e) e.scrollIntoView({ block: "center" }); return !!e; }, sel);
const clickVisible = async (page, name) => { const bs = page.getByRole("button", { name, exact: true }); const n = await bs.count(); for (let i = 0; i < n; i++) if (await bs.nth(i).isVisible()) { await bs.nth(i).click({ timeout: 3000 }); return true; } return false; };

for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await away(page, vp);
    await shot(page, run, "00-load-rest");
    // rail hover
    let rb = await railBox(page); await page.mouse.move(rb.x + rb.width * 0.5, rb.y + rb.height / 2); await page.waitForTimeout(400);
    await shot(page, run, "01-rail-hover");
    // tap the rail at 70% → chase mid-flight + settled
    await page.mouse.click(rb.x + rb.width * 0.7, rb.y + rb.height / 2); await page.waitForTimeout(140);
    await shot(page, run, "02a-rail-tap-tracking-140ms");
    await away(page, vp); await page.waitForTimeout(2200);
    await shot(page, run, "02b-rail-tap-settled");
    // derby (double-click rail)
    rb = await railBox(page); await page.mouse.dblclick(rb.x + rb.width * 0.3, rb.y + rb.height / 2);
    await page.waitForTimeout(450); await shot(page, run, "03a-derby-active-450ms");
    await page.waitForTimeout(500); await shot(page, run, "03b-derby-active-950ms");
    await away(page, vp); await page.waitForTimeout(2200); await shot(page, run, "03c-derby-exit-rest");
    // keyboard focus on the rail
    await page.locator(".spring-rail").focus(); await page.keyboard.press("End"); await page.waitForTimeout(1800);
    await shot(page, run, "04-kbd-focus-rail-end");
    await page.locator("body").click({ position: { x: 2, y: VPS[vp].height - 2 } }).catch(() => {});
    // 390: open the sheet (drawer position) before panel states
    if (vp === "390") {
      const h = page.getByRole("button", { name: "Drawer position" }).first();
      if (await h.count()) { await h.click().catch(() => {}); await page.waitForTimeout(1200); await shot(page, run, "05z-sheet-expanded"); run.notes.sheetClick = true; }
    }
    // panel: presets
    await reveal(page, ".preset-grid"); await page.waitForTimeout(500); await away(page, vp);
    await shot(page, run, "05-panel-presets-smooth-selected");
    const bouncy = page.locator(".preset-cell", { hasText: "bouncy" }).first();
    await bouncy.hover(); await page.waitForTimeout(350); await shot(page, run, "06a-preset-bouncy-hover");
    await bouncy.click(); await page.waitForTimeout(600); await away(page, vp); await shot(page, run, "06b-preset-bouncy-selected");
    // inline keyframes editor
    await reveal(page, ".keyframes-section"); await page.waitForTimeout(500); await shot(page, run, "07-inline-keyframes-editor");
    // the standard ribbon + Re-seat
    const ok = await reveal(page, ".btn-playback"); await page.waitForTimeout(500); run.notes.ribbonFound = ok;
    await page.evaluate(() => { const b = [...document.querySelectorAll(".btn-playback")].pop(); b?.scrollIntoView({ block: "end" }); }); await page.waitForTimeout(400);
    await shot(page, run, "08-ribbon-transport-reseat");
    // Play in the ribbon
    const play = page.locator(".btn-playback", { hasText: /^\s*Play/ }).first();
    if (await play.count()) { await play.click().catch(e => run.notes.playErr = String(e).slice(0, 200)); await page.waitForTimeout(700); await shot(page, run, "09-ribbon-playing"); }
    const pause = page.locator(".btn-playback", { hasText: /Pause/ }).first();
    if (await pause.count()) { await pause.click().catch(() => {}); await page.waitForTimeout(300); }
    // Re-seat
    const rs = page.locator(".btn-playback", { hasText: "Re-seat" }).first();
    if (await rs.count()) { await rs.hover(); await page.waitForTimeout(300); await shot(page, run, "10a-reseat-hover"); await rs.click(); await page.waitForTimeout(160); await shot(page, run, "10b-reseat-clicked-160ms"); }
    await page.waitForTimeout(1800);
    // back to top of stage: at 390 collapse the sheet
    if (vp === "390") { const h = page.getByRole("button", { name: "Drawer position" }).first(); if (await h.count()) { await h.click().catch(() => {}); await page.waitForTimeout(1000); } }
    await page.evaluate(() => { for (const e of document.querySelectorAll("*")) if (e.scrollTop) e.scrollTop = 0; });
    await away(page, vp); await page.waitForTimeout(600); await shot(page, run, "10c-after-reset-scroll");
    // dock channel select (Sweep)
    const sel = page.getByRole("combobox", { name: "Select animation" }).first();
    if (await sel.count()) { await sel.click().catch(() => {}); await page.waitForTimeout(700); await shot(page, run, "11-channel-select-open"); await page.keyboard.press("Escape"); await page.waitForTimeout(400); }
    // dock transport play (stage playing)
    if (await clickVisible(page, "Play animation")) { await away(page, vp); await page.waitForTimeout(700); await shot(page, run, "12-dock-play-sweeping"); await clickVisible(page, "Pause animation"); }
    // panel closed
    { const b = await page.locator(".glass-dock").first().boundingBox().catch(() => null); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); await shot(page, run, "12b-top-dock-hover"); } }
    if (await clickVisible(page, "Controls panel")) { await away(page, vp); await page.waitForTimeout(1500); await shot(page, run, "13-panel-closed"); }
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
