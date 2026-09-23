// spring-physics-tab audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
// Writes only beside this file. Records keyframes.js HEAD sha + dirty count per run.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const log = { ...tree(), when: new Date().toISOString(), runs: [] };
const LOGF = "capture-log" + (process.argv[2] ? "-" + process.argv[2] : "") + ".json";
const ONLY = process.argv[2];
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
  const ae = document.activeElement;
  return {
    dark: document.documentElement.classList.contains("dark"),
    presetCells: [...document.querySelectorAll(".preset-cell")].map(e => { const b = e.getBoundingClientRect(); return e.textContent.trim().replace(/\s+/g, " ") + " " + Math.round(b.width) + "x" + Math.round(b.height) + " r=" + getComputedStyle(e).borderRadius + " st=" + e.getAttribute("data-state"); }),
    presetGroup: (() => { const e = document.querySelector(".preset-grid"); return e && { r: r(e), radius: getComputedStyle(e).borderRadius, bg: getComputedStyle(e).backgroundColor, bf: getComputedStyle(e).backdropFilter, pad: getComputedStyle(e).padding }; })(),
    heatReadout: [...document.querySelectorAll(".spring-heatmap-section .text-mono-caption, .spring-heatmap-section [class*=readout]")].slice(0, 3).map(e => e.textContent.trim().replace(/\s+/g, " ")),
    kfSection: r(document.querySelector(".keyframes-section")),
    kfScroll: (() => { const e = document.querySelector(".keyframes-editor-scroll"); return e && [e.clientHeight, e.scrollHeight, e.scrollTop, getComputedStyle(e).borderRadius]; })(),
    offsetInputs: [...document.querySelectorAll(".keyframes-section input[aria-label=Offset]")].map(e => e.value + " " + r(e)[2] + "w r=" + getComputedStyle(e).borderRadius + " inv=" + e.getAttribute("aria-invalid")),
    offsetErr: [...document.querySelectorAll(".keyframes-section [id^=keyframe-offset-error]")].map(e => e.textContent.trim()),
    toasts: [...document.querySelectorAll("[data-sonner-toast]")].map(e => e.textContent.trim().slice(0, 120)),
    dialog: [...document.querySelectorAll("[role=dialog]")].filter(e => e.getBoundingClientRect().width > 0).map(e => e.textContent.trim().replace(/\s+/g, " ").slice(0, 160) + " " + r(e) + " r=" + getComputedStyle(e).borderRadius),
    panes: [...document.querySelectorAll(".monaco-pane, .keyframes-section, .spring-heatmap-section, [role=tabpanel]")].map(e => e.className.toString().slice(0, 40) + " " + r(e) + " vis=" + (e.getBoundingClientRect().height > 0 && getComputedStyle(e).visibility)),
    tabSel: document.querySelector("[aria-label='Controls tab']")?.textContent.trim(),
    active: ae?.tagName + " " + (ae?.getAttribute("aria-label") || ae?.getAttribute("role") || ae?.className?.toString().slice(0, 40)),
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
async function shot(page, run, name, extra = {}, clip) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p, ...(clip ? { clip } : {}) }); run.frames.push({ frame: p, ...run.treeNow, ...m, ...extra });
}
const away = (page, vp) => page.mouse.move(vp === "390" ? 385 : VPS[vp].width - 4, vp === "390" ? 200 : VPS[vp].height / 2);
const reveal = (page, sel, block = "center") => page.evaluate(([s, b]) => { const e = document.querySelector(s); if (e) e.scrollIntoView({ block: b }); return !!e; }, [sel, block]);
const box = async (page, sel) => page.locator(sel).first().boundingBox();
const clipOf = (b, vp, pad = 12) => { if (!b || b.y + b.height < 0 || b.y > VPS[vp].height || b.width < 1) return undefined; const x = Math.max(0, b.x - pad), y = Math.max(0, b.y - pad); return { x, y, width: Math.min(VPS[vp].width - x, b.width + 2 * pad), height: Math.min(VPS[vp].height - y, b.height + 2 * pad) }; };
async function openDock(page, vp) {
  await page.mouse.move(VPS[vp].width / 2, vp === "390" ? 52 : 70); await page.waitForTimeout(900);
  const c = page.getByRole("combobox", { name: "Controls tab" });
  const b = await c.boundingBox({ timeout: 4000 }).catch(() => null); if (b) await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.waitForTimeout(500);
}
async function pickTab(page, vp, name) {
  await openDock(page, vp);
  await page.getByRole("combobox", { name: "Controls tab" }).click({ timeout: 4000 });
  await page.waitForTimeout(600);
  await page.getByRole("option", { name }).click({ timeout: 4000 });
  await page.waitForTimeout(1600);
}

for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} }; run.treeNow = tree();
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await away(page, vp);
    if (vp === "390") {
      await shot(page, run, "00p-drawer-peek");
      await page.mouse.move(195, 52); await page.waitForTimeout(900);
      await page.getByRole("button", { name: "Controls panel" }).first().click().catch(e => run.notes.drawerErr = String(e).slice(0, 200));
      await page.waitForTimeout(1500);
      run.notes.drawer = await page.evaluate(() => { const d = document.querySelector(".glass-drawer"); const r = d?.getBoundingClientRect(); return r && [Math.round(r.y), Math.round(r.height)]; });
    }
    await reveal(page, ".labeled-field-grid", "start"); await page.waitForTimeout(400); await away(page, vp);
    await shot(page, run, "00-physics-tab-rest");
    // dock: Controls tab select open (shows Physics among the triad)
    await openDock(page, vp);
    await page.getByRole("combobox", { name: "Controls tab" }).click({ timeout: 4000 }).catch(e => run.notes.tabSelErr = String(e).slice(0, 160));
    await page.waitForTimeout(700); await shot(page, run, "01-dock-controls-tab-select-open");
    await page.keyboard.press("Escape"); await page.waitForTimeout(500); await away(page, vp);
    // sliders: hover + keyboard
    const sl = page.locator(".labeled-field-grid .slider-track").first();
    const sb = await sl.boundingBox();
    if (sb) { await page.mouse.move(sb.x + sb.width * 0.3, sb.y + sb.height / 2); await page.waitForTimeout(400); await shot(page, run, "02a-response-slider-hover"); }
    await page.locator(".labeled-field-grid [role=slider]").first().focus().catch(() => {});
    for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(500); await away(page, vp);
    await shot(page, run, "02b-response-slider-kbd-focus-none-preset");
    await reveal(page, ".preset-grid"); await page.waitForTimeout(300);
    await shot(page, run, "03-no-preset-active-crop", {}, clipOf(await box(page, ".preset-grid"), vp));
    // heatmap hover + keyboard
    await reveal(page, ".spring-heatmap-section"); await page.waitForTimeout(300);
    const hb = await box(page, ".spring-heatmap-section svg, .spring-heatmap-section canvas, .spring-heatmap-section [role=slider], .spring-heatmap-section [role=application], .spring-heatmap-section [tabindex]");
    run.notes.heatBox = hb;
    if (hb) { await page.mouse.move(hb.x + hb.width * 0.75, hb.y + hb.height * 0.7); await page.waitForTimeout(500); await shot(page, run, "04a-heatmap-hover-cell"); }
    const hf = page.locator(".spring-heatmap-section [tabindex='0']").first();
    if (await hf.count()) { await hf.focus(); await page.keyboard.press("ArrowUp"); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(500); await away(page, vp); await shot(page, run, "04b-heatmap-kbd-focus-arrow"); run.notes.heatFocus = await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 200)); }
    // presets
    await reveal(page, ".preset-grid"); await page.waitForTimeout(300);
    await page.locator(".preset-cell", { hasText: "smooth" }).first().click(); await page.waitForTimeout(500); await away(page, vp);
    await shot(page, run, "05a-preset-smooth-selected");
    const bouncy = page.locator(".preset-cell", { hasText: "bouncy" }).first();
    await bouncy.hover(); await page.waitForTimeout(350);
    await shot(page, run, "05b-preset-bouncy-hover-crop", {}, clipOf(await box(page, ".preset-grid"), vp));
    await bouncy.click(); await page.waitForTimeout(600); await away(page, vp);
    await shot(page, run, "05c-preset-bouncy-selected-crop", {}, clipOf(await box(page, ".preset-grid"), vp));
    await page.keyboard.press("ArrowRight"); await page.waitForTimeout(500);
    await shot(page, run, "05d-preset-kbd-arrow-focus-crop", {}, clipOf(await box(page, ".preset-grid"), vp));
    // inline editor
    await reveal(page, ".keyframes-section", "start"); await page.waitForTimeout(500); await away(page, vp);
    await shot(page, run, "06a-inline-editor-top");
    await page.evaluate(() => { const e = document.querySelector(".keyframes-editor-scroll"); if (e) e.scrollTop = e.scrollHeight; }); await page.waitForTimeout(400);
    await reveal(page, ".keyframes-section", "end"); await page.waitForTimeout(400);
    await shot(page, run, "06b-inline-editor-scrolled-footer");
    await page.evaluate(() => { const e = document.querySelector(".keyframes-editor-scroll"); if (e) e.scrollTop = 0; }); await page.waitForTimeout(300);
    await reveal(page, ".keyframes-section", "start"); await page.waitForTimeout(300);
    // card hover
    const card = page.locator(".keyframes-section [aria-label^='Keyframe at']").nth(1);
    if (await card.count()) { await card.scrollIntoViewIfNeeded(); await card.hover(); await page.waitForTimeout(400); await shot(page, run, "06c-keyframe-card-hover"); }
    // invalid offset
    const off = page.locator(".keyframes-section input[aria-label=Offset]").nth(1);
    if (await off.count()) { await off.scrollIntoViewIfNeeded(); await off.click(); await off.fill("abc"); await page.keyboard.press("Enter"); await page.waitForTimeout(700); await shot(page, run, "07-invalid-offset"); await off.fill("25%"); await page.keyboard.press("Enter"); await page.waitForTimeout(400); }
    // toolbar focus + add dialog
    const addB = page.getByRole("button", { name: "Add keyframes", exact: true }).first();
    await addB.scrollIntoViewIfNeeded().catch(() => {}); await addB.focus().catch(() => {}); await page.waitForTimeout(400);
    await shot(page, run, "08a-toolbar-kbd-focus-add");
    await addB.click().catch(e => run.notes.addErr = String(e).slice(0, 160)); await page.waitForTimeout(900);
    await shot(page, run, "08b-add-keyframes-dialog-open");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    const apply = page.getByRole("button", { name: "Apply the keyframes as a CSS animation" }).first();
    await apply.hover().catch(() => {}); await page.waitForTimeout(700);
    await shot(page, run, "09a-apply-hover-tooltip");
    await apply.click().catch(e => run.notes.applyErr = String(e).slice(0, 160)); await page.waitForTimeout(900);
    await shot(page, run, "09b-apply-clicked");
    // offsets slider drag
    const fs = page.locator(".keyframes-section [role=slider]").nth(1);
    if (await fs.count()) { await fs.focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(500); await shot(page, run, "09c-offsets-slider-kbd-retime"); }
    // re-sample
    await reveal(page, ".keyframes-section", "start"); await page.waitForTimeout(300);
    const rs = page.locator(".reseed-btn").first();
    await rs.hover(); await page.waitForTimeout(700); await shot(page, run, "10a-resample-hover");
    await rs.click(); await page.waitForTimeout(700); await away(page, vp); await shot(page, run, "10b-resample-clicked");
    // tab switching — cohesion with the Keyframes tab
    for (const [n, name] of [["11a", "Keyframes"], ["11b", "Controls"], ["11c", "Timeline"], ["11d", "Physics"]]) {
      try { await pickTab(page, vp, name); await away(page, vp); await page.waitForTimeout(500); await shot(page, run, `${n}-tab-${name.toLowerCase()}`); }
      catch (e) { run.notes["tab" + name] = String(e).slice(0, 200); await page.keyboard.press("Escape"); }
    }
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  delete run.treeNow;
  log.runs.push(run); writeFileSync(OUT + LOGF, JSON.stringify(log, null, 1));
}
await browser.close();
