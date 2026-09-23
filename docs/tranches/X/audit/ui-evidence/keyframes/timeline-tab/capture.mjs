// timeline-tab — READ-ONLY capture; headed Chromium on the real GPU. Writes only beside this file.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js", GUI = "/Users/mkbabb/Programming/glass-ui";
const rev = (t) => ({ sha: execSync(`git -C ${t} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${t} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2];
const log = { kf: rev(TREE), glass: rev(GUI), when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const CSS = `@keyframes demo {
  0% { transform: rotate(0deg) scale(1); background-color: #e11d48; }
  35% { transform: rotate(90deg) scale(1.2); background-color: #f59e0b; }
  70% { transform: rotate(200deg) scale(0.8); background-color: #10b981; }
  100% { transform: rotate(360deg) scale(1); background-color: #6366f1; }
}`;
const measure = (page) => page.evaluate(() => {
  const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const st = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, border: c.borderTopWidth + " " + c.borderTopColor, color: c.color, font: c.fontSize + "/" + c.fontWeight, cls: (e.className?.baseVal ?? e.className ?? "").toString().slice(0, 120) }; };
  const out = { hash: location.hash, dark: document.documentElement.classList.contains("dark") };
  const q = (s) => [...document.querySelectorAll(s)].find(vis);
  out.pane = st(q(".controls-pane"));
  out.track = st(q(".timeline-track"));
  out.stage = st(q(".timeline-preview-stage"));
  out.stageChild = (() => { const s = q(".timeline-preview-stage"); const c = s?.firstElementChild; return c ? { box: r(c), bg: getComputedStyle(c).backgroundColor, tf: getComputedStyle(c).transform.slice(0, 60) } : null; })();
  out.markers = [...document.querySelectorAll(".keyframe-marker")].filter(vis).map(m => ({ l: m.getAttribute("aria-label"), box: r(m), sel: m.dataset.state }));
  out.carets = [...document.querySelectorAll(".timeline-caret-readout")].filter(vis).map(c => ({ t: c.textContent.trim(), box: r(c) }));
  out.ticks = [...document.querySelectorAll(".timeline-tick-label")].filter(vis).map(c => c.textContent.trim());
  out.panRow = st(q(".timeline-pan-row"));
  const btn = (n) => { const b = [...document.querySelectorAll("button")].filter(vis).find(b => (b.getAttribute("aria-label") || b.textContent.trim()) === n); return b ? { ...st(b), disabled: b.disabled, tone: b.dataset.tone, emph: b.dataset.emphasis } : null; };
  out.buttons = Object.fromEntries(["Undo", "Redo", "Clear all keyframes", "Expand timeline", "Collapse timeline", "Remove keyframe", "Snapshot", "Import", "Export", "Add CSS", "Retry"].map(n => [n, btn(n)]).filter(([, v]) => v));
  out.label = st(q('input[aria-label="Keyframe label"]'));
  out.emptyText = [...document.querySelectorAll(".controls-pane p")].filter(vis).map(p => p.textContent.trim().replace(/\s+/g, " ").slice(0, 120));
  out.errors = [...document.querySelectorAll('[role="status"]')].filter(vis).map(e => e.textContent.trim().slice(0, 160));
  const ed = q(".card-content:has(.timeline-preview-stage) .monaco-editor"); out.editor = st(ed); out.editorWell = ed ? st(ed.closest("[class*=rounded]")) : null;
  out.editorText = ed ? [...ed.querySelectorAll(".view-line")].map(l => l.textContent).join(" | ").slice(0, 200) : null;
  const tip = q("[data-slot=tooltip-content], [role=tooltip]"); out.tooltip = tip ? { ...st(tip), t: tip.textContent.trim().replace(/\s+/g, " ").slice(0, 200), img: !!tip.querySelector("img") } : null;
  const dlg = q("[data-slot=dialog-content], [role=dialog]"); out.dialog = dlg ? { ...st(dlg), t: dlg.textContent.trim().replace(/\s+/g, " ").slice(0, 200) } : null;
  out.toasts = [...document.querySelectorAll("[data-sonner-toast]")].map(t => ({ t: t.textContent.trim().slice(0, 140), type: t.getAttribute("data-type") }));
  const ae = document.activeElement; out.focus = ae ? (ae.getAttribute("aria-label") || ae.tagName) + " fv=" + ae.matches(":focus-visible") : null;
  const pane = q(".controls-pane"); out.paneOverflowX = pane ? [pane.scrollWidth, pane.clientWidth] : null;
  out.docOverflowX = [document.documentElement.scrollWidth, innerWidth];
  return out;
});
async function fresh(vp, theme, route = "cube") {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width - 5, VPS[vp].height / 2); await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
const hoverDock = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const openDrawer = async (page, vp) => {
  if (vp !== "390") return;
  await hoverDock(page);
  const t = page.getByRole("button", { name: "Controls panel" }).first();
  if (await t.count()) { await t.click(); await page.waitForTimeout(1400); }
  await page.mouse.move(5, 300); await page.waitForTimeout(600);
};
const toTimeline = async (page, run) => {
  await hoverDock(page);
  const trig = page.locator('[aria-label="Controls tab"]').first();
  if (!(await trig.count())) { run.notes.noTab = true; return false; }
  await trig.click(); await page.waitForTimeout(800);
  run.notes.options = (await page.getByRole("option").allTextContents()).map(s => s.trim().slice(0, 30));
  const opt = page.getByRole("option", { name: /^Timeline/ }).first();
  if (!(await opt.count())) { run.notes.noTimelineOption = true; await page.keyboard.press("Escape"); return false; }
  await opt.click(); await page.waitForTimeout(2000);
  return true;
};
async function shot(page, run, name, crop = true) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); const fr = { frame: p, kf: rev(TREE), ...m };
  if (crop) { const el = page.locator(".controls-pane").filter({ visible: true }).first(); const bb = await el.boundingBox().catch(() => null);
    if (bb) { const vp = page.viewportSize(); const x = Math.max(0, bb.x - 12), y = Math.max(0, bb.y - 12); const cp = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + cp, clip: { x, y, width: Math.min(vp.width - x, bb.width + 24), height: Math.min(vp.height - y, bb.height + 24) } }); fr.crop = cp; } }
  run.frames.push(fr);
}
const btn = (page, name) => page.getByRole("button", { name, exact: true }).filter({ visible: true }).first();
const step = async (run, name, fn) => { try { await fn(); } catch (e) { run.notes["fail:" + name] = String(e).slice(0, 200); } };
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  const run = { tag, frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await openDrawer(page, vp);
    if (!(await toTimeline(page, run))) throw new Error("no Timeline tab");
    const park = async () => { await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(500); };
    await park(); await shot(page, run, "01-empty");
    if (vp === "390") { run.notes.snapshotY = await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Snapshot"); return b ? Math.round(b.getBoundingClientRect().y) : null; });
      // collapsed drawer leaves the ribbon below the fold (probe-drawer.json): continue the 390 walk in the expanded cell, where the ribbon is in view
      await btn(page, "Expand timeline").click(); await page.waitForTimeout(2500); await park(); await shot(page, run, "01b-expanded-empty-390walk"); }
    await step(run, "ribbon", async () => { const s = btn(page, "Snapshot"); await s.scrollIntoViewIfNeeded(); await s.hover(); await page.waitForTimeout(400); await shot(page, run, "02-ribbon-hover-snapshot"); });
    await step(run, "export-empty", async () => { await btn(page, "Export").click(); await page.waitForTimeout(900); await shot(page, run, "03-export-empty-toast"); await page.waitForTimeout(3000); });
    await step(run, "snapshot", async () => { await btn(page, "Snapshot").click(); await page.waitForTimeout(1500); await park(); await shot(page, run, "04-single-keyframe"); });
    await step(run, "import", async () => {
      await btn(page, "Import").click(); await page.waitForTimeout(900);
      await shot(page, run, "05-import-dialog", false);
      await page.locator('textarea[aria-label="Import CSS @keyframes"]').fill(CSS); await page.waitForTimeout(300);
      await page.locator("[role=dialog] button", { hasText: /^Import/ }).last().click(); await page.waitForTimeout(2000);
      await park(); await shot(page, run, "06-populated");
    });
    await step(run, "scroll-top", async () => { const t = page.locator(".timeline-track").filter({ visible: true }).first(); await t.scrollIntoViewIfNeeded(); await park(); await shot(page, run, "07-populated-track-in-view"); });
    await step(run, "hover", async () => {
      const m = page.locator(".keyframe-marker").filter({ visible: true }).nth(1); await m.hover(); await page.waitForTimeout(600);
      await shot(page, run, "08-hover-preview-early", false); await page.waitForTimeout(2500); await m.hover(); await page.waitForTimeout(300);
      await shot(page, run, "09-hover-preview", false);
    });
    await step(run, "select", async () => {
      await page.locator(".keyframe-marker").filter({ visible: true }).nth(1).click(); await page.waitForTimeout(1200); await park();
      await shot(page, run, "10-selected");
      const lbl = page.locator('input[aria-label="Keyframe label"]').filter({ visible: true }).first();
      await lbl.scrollIntoViewIfNeeded(); await lbl.click(); await lbl.fill("Quarter turn"); await page.waitForTimeout(400);
      await shot(page, run, "11-selected-label-focus");
      const ed = page.locator(".card-content:has(.timeline-preview-stage) .monaco-editor").filter({ visible: true }).first(); await ed.scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
      await shot(page, run, "12-selected-css-editor");
    });
    await step(run, "css-error", async () => {
      const vl = page.locator(".card-content:has(.timeline-preview-stage) .monaco-editor .view-lines").filter({ visible: true }).first(); const b = await vl.boundingBox();
      await page.mouse.click(b.x + 80, b.y + 8); await page.waitForTimeout(300); await page.keyboard.press("End");
      await page.keyboard.type(" color: oklch(", { delay: 25 }); await page.waitForTimeout(1200);
      await shot(page, run, "13-css-editor-error");
      await page.keyboard.press("Meta+a"); await page.keyboard.type("transform: rotate(90deg) scale(1.2);\nbackground-color: #f59e0b;", { delay: 5 }); await page.waitForTimeout(1200);
    });
    await step(run, "build-error", async () => {
      const vl = page.locator(".card-content:has(.timeline-preview-stage) .monaco-editor .view-lines").filter({ visible: true }).first(); const b = await vl.boundingBox();
      await page.mouse.click(b.x + 80, b.y + 8); await page.waitForTimeout(300); await page.keyboard.press("Meta+a");
      await page.keyboard.type("transform: translateX(1em) rotate(1turn) skew(3deg);\nfilter: blur(2px);", { delay: 5 }); await page.waitForTimeout(1500);
      await shot(page, run, "14-after-heterogeneous-edit");
      run.notes.buildErrorShown = await page.locator("text=Animation could not be built").count();
    });
    await step(run, "remove-undo-redo", async () => {
      const rm = btn(page, "Remove keyframe"); await rm.scrollIntoViewIfNeeded(); await rm.hover(); await page.waitForTimeout(400);
      await shot(page, run, "15-hover-remove"); await rm.click(); await page.waitForTimeout(900);
      const u = btn(page, "Undo"); await u.scrollIntoViewIfNeeded(); await park(); await shot(page, run, "16-after-remove");
      await u.click(); await page.waitForTimeout(900); await park(); await shot(page, run, "17-after-undo");
      await btn(page, "Redo").click(); await page.waitForTimeout(900); await park(); await shot(page, run, "18-after-redo");
      await btn(page, "Undo").click(); await page.waitForTimeout(600);
    });
    await step(run, "zoom", async () => {
      const t = page.locator(".timeline-track").filter({ visible: true }).first(); await t.focus(); for (let i = 0; i < 3; i++) await page.keyboard.press("+"); await page.waitForTimeout(600);
      await shot(page, run, "19-zoomed-focus"); for (let i = 0; i < 3; i++) await page.keyboard.press("-"); await page.waitForTimeout(300);
    });
    if (vp !== "390") await step(run, "expand", async () => { await btn(page, "Expand timeline").click(); await page.waitForTimeout(1200); await park(); await shot(page, run, "20-expanded"); await btn(page, "Collapse timeline").click(); await page.waitForTimeout(800); });
    await step(run, "export", async () => { await btn(page, "Export").click(); await page.waitForTimeout(900); run.notes.exportClip = await page.evaluate(() => navigator.clipboard.readText().then(t => t.slice(0, 200)).catch(e => "ERR " + e)); await shot(page, run, "21-export-toast"); await page.waitForTimeout(3000); });
    await step(run, "addcss", async () => {
      await btn(page, "Add CSS").click(); await page.waitForTimeout(900);
      await page.locator('textarea[aria-label="Add CSS @keyframes"]').fill("@keyframes x { 50% { width: calc( } }"); await page.locator("[role=dialog] button", { hasText: /^Add/ }).last().click(); await page.waitForTimeout(1200);
      await shot(page, run, "22-addcss-dialog-error", false); await page.keyboard.press("Escape"); await page.waitForTimeout(700);
    });
    await step(run, "clear", async () => { const c = btn(page, "Clear all keyframes"); await c.scrollIntoViewIfNeeded(); await c.hover(); await page.waitForTimeout(600); await shot(page, run, "23-hover-clear", false); await c.click(); await page.waitForTimeout(1000); await park(); await shot(page, run, "24-after-clear-all"); });
    run.errs = errs.slice(0, 12); await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, run.err || "ok", run.frames.length, JSON.stringify(run.notes).slice(0, 700));
}
// cohesion sweep: timeline tab across scenes (1440 light)
if (!ONLY) { const run = { tag: "scenes", frames: [], notes: {} };
  for (const sc of ["amiga", "square", "easing", "spring"]) { try { const { ctx, page } = await fresh("1440", "light", sc); const sub = { frames: [], notes: {}, tag: `${sc}-1440-light` };
    const ok = await toTimeline(page, sub); await page.mouse.move(1435, 5); await page.waitForTimeout(600); await shot(page, sub, `30-${sc}-timeline`); run.notes[sc] = { ok, ...sub.notes }; run.frames.push(...sub.frames); await ctx.close(); } catch (e) { run.notes[sc] = String(e).slice(0, 200); } }
  log.runs.push(run); console.log("scenes", JSON.stringify(run.notes).slice(0, 900)); }
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(JSON.stringify(log.kf), JSON.stringify(log.glass));
