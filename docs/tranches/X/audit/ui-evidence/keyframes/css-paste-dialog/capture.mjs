// css-paste-dialog — READ-ONLY capture; headed Chromium on the real GPU. Writes only beside this file.
// Reach: cube → Timeline tab → ribbon Import / Add CSS (CSSPasteDialog x2) ; spring → inline KeyframesEditor → "Add keyframes" (KeyframesAddDialog adapter).
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
  50% { transform: rotate(180deg) scale(1.2); background-color: #10b981; }
  100% { transform: rotate(360deg) scale(1); background-color: #6366f1; }
}`;
const BAD = "@keyframes x { 50% { width: calc( } }";
const measure = (page) => page.evaluate(() => {
  const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const st = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, border: c.borderTopWidth + " " + c.borderTopColor, color: c.color, font: c.fontSize + "/" + c.fontWeight + " " + c.fontFamily.slice(0, 40), pad: c.padding, cls: (e.className?.baseVal ?? e.className ?? "").toString().slice(0, 140) }; };
  const out = { hash: location.hash, dark: document.documentElement.classList.contains("dark"), vw: innerWidth };
  const dlg = [...document.querySelectorAll("[data-slot=dialog-content]")].find(vis);
  if (dlg) {
    out.dialog = { ...st(dlg), maxW: getComputedStyle(dlg).maxWidth, inlineSize: getComputedStyle(dlg).width, overflowY: getComputedStyle(dlg).overflowY, backdrop: getComputedStyle(dlg).backdropFilter };
    out.header = !!dlg.querySelector("[data-slot=dialog-header]");
    out.title = st(dlg.querySelector("[data-slot=dialog-title]")); out.titleText = dlg.querySelector("[data-slot=dialog-title]")?.textContent.trim();
    out.desc = st(dlg.querySelector("[data-slot=dialog-description]")); out.descText = dlg.querySelector("[data-slot=dialog-description]")?.textContent.trim();
    const ta = dlg.querySelector("textarea"); out.textarea = ta ? { ...st(ta), rows: ta.rows, placeholder: ta.placeholder, invalid: ta.getAttribute("aria-invalid"), describedby: ta.getAttribute("aria-describedby"), state: ta.dataset.state, len: ta.value.length, scrollH: ta.scrollHeight, clientH: ta.clientHeight } : null;
    out.buttons = [...dlg.querySelectorAll("button")].filter(vis).map(b => ({ t: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 30), ...st(b), disabled: b.disabled, ariaBusy: b.getAttribute("aria-busy"), loading: b.dataset.loading, emph: b.dataset.emphasis, slot: b.dataset.slot }));
    out.footer = st(dlg.querySelector("[data-slot=dialog-footer]"));
    const err = dlg.querySelector("[role=status]"); out.error = err ? { ...st(err), t: err.textContent.trim() } : null;
    const pb = dlg.querySelector(".progress-bar"); out.progressBar = pb ? { ...st(pb), tf: getComputedStyle(pb).transform, anims: pb.getAnimations().length } : null;
  }
  const ov = [...document.querySelectorAll("[data-slot=dialog-overlay], [data-slot=modal-overlay]")].find(vis); out.overlay = ov ? { bg: getComputedStyle(ov).backgroundColor, bf: getComputedStyle(ov).backdropFilter } : null;
  out.toasts = [...document.querySelectorAll("[data-sonner-toast]")].map(t => ({ t: t.textContent.trim().slice(0, 160), type: t.getAttribute("data-type"), box: r(t), op: getComputedStyle(t).opacity }));
  const tip = [...document.querySelectorAll("[data-slot=tooltip-content], [role=tooltip]")].find(vis); out.tooltip = tip ? { ...st(tip), t: tip.textContent.trim() } : null;
  const ae = document.activeElement; out.focus = ae ? (ae.getAttribute("aria-label") || ae.tagName + ":" + ae.textContent.trim().slice(0, 20)) + " fv=" + ae.matches(":focus-visible") + " outline=" + getComputedStyle(ae).outlineStyle + "/" + getComputedStyle(ae).boxShadow.slice(0, 80) : null;
  out.docOverflowX = [document.documentElement.scrollWidth, innerWidth];
  return out;
});
async function fresh(vp, theme, route) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 240)); });
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
  const opt = page.getByRole("option", { name: /^Timeline/ }).first();
  if (!(await opt.count())) { run.notes.noTimelineOption = true; await page.keyboard.press("Escape"); return false; }
  await opt.click(); await page.waitForTimeout(2000);
  return true;
};
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); const fr = { frame: p, kf: rev(TREE), ...extra, ...m };
  const dl = page.locator("[data-slot=dialog-content]").filter({ visible: true }).first(); const bb = await dl.boundingBox().catch(() => null);
  if (bb) { const vp = page.viewportSize(); const x = Math.max(0, bb.x - 16), y = Math.max(0, bb.y - 16); const cp = `${name}-${run.tag}-crop.png`;
    await page.screenshot({ path: OUT + cp, clip: { x, y, width: Math.min(vp.width - x, bb.width + 32), height: Math.min(vp.height - y, bb.height + 32) } }); fr.crop = cp; }
  run.frames.push(fr);
}
const btn = (page, name) => page.getByRole("button", { name, exact: true }).filter({ visible: true }).first();
const dBtn = (page, re) => page.locator("[data-slot=dialog-content] button").filter({ visible: true }).filter({ hasText: re }).last();
const ta = (page) => page.locator("[data-slot=dialog-content] textarea").filter({ visible: true }).first();
const park = async (page, vp) => { await page.mouse.move(VPS[vp].width - 3, 3); await page.waitForTimeout(300); };
const step = async (run, name, fn) => { try { await fn(); } catch (e) { run.notes["fail:" + name] = String(e).slice(0, 220); } };
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  // ── A. Timeline → Import / Add CSS (CSSPasteDialog) ──
  const run = { tag, frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme, "cube");
    await openDrawer(page, vp);
    if (!(await toTimeline(page, run))) throw new Error("no Timeline tab");
    if (vp === "390") await openDrawer(page, vp);
    await step(run, "import-open", async () => { const b = btn(page, "Import"); await b.scrollIntoViewIfNeeded(); await b.click(); await page.waitForTimeout(1000); await park(page, vp); await shot(page, run, "01-import-open-empty"); });
    await step(run, "typed-focus", async () => { await ta(page).click(); await ta(page).fill("@keyframes spin {\n  from { transform: rotate(0deg); }\n"); await page.waitForTimeout(300); await shot(page, run, "02-import-typed-focus"); });
    await step(run, "parse-error", async () => { await ta(page).fill(BAD); await dBtn(page, /^Import/).click(); await page.waitForTimeout(1500); await park(page, vp); await shot(page, run, "03-import-parse-error"); });
    await step(run, "no-stops", async () => { await ta(page).fill(".box { color: red; }"); await dBtn(page, /^Import/).click(); await page.waitForTimeout(1500); await park(page, vp); await shot(page, run, "04-import-no-stops-error"); });
    await step(run, "long-line", async () => { await ta(page).fill(CSS + "\n" + ".a { animation: demo 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite alternate both; transform-origin: 50% 50%; will-change: transform; }\n".repeat(8)); await page.waitForTimeout(300); await shot(page, run, "05-import-long-draft"); });
    await step(run, "keyboard-focus", async () => { await ta(page).focus(); await page.keyboard.press("Tab"); await page.waitForTimeout(250); await shot(page, run, "06-import-tab-focus"); });
    await step(run, "busy", async () => {
      await ta(page).fill(CSS);
      const cdp = await ctx.newCDPSession(page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: 20 });
      await dBtn(page, /^Import/).click(); await page.waitForTimeout(40);
      await shot(page, run, "07-import-submit-busy");
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 }); await page.waitForTimeout(1200); await park(page, vp);
      await shot(page, run, "08-import-success-closed");
    });
    await step(run, "addcss", async () => { await page.waitForTimeout(2500); const b = btn(page, "Add CSS"); await b.scrollIntoViewIfNeeded(); await b.click(); await page.waitForTimeout(1000); await park(page, vp); await shot(page, run, "09-addcss-open"); await ta(page).fill(BAD); await dBtn(page, /^Add/).click(); await page.waitForTimeout(1300); await shot(page, run, "10-addcss-parse-error"); await ta(page).fill(CSS); await dBtn(page, /^Add/).click(); await page.waitForTimeout(1200); await park(page, vp); await shot(page, run, "11-addcss-merged"); });
    await step(run, "reopen-draft", async () => { await page.waitForTimeout(2500); const b = btn(page, "Import"); await b.scrollIntoViewIfNeeded(); await b.click(); await page.waitForTimeout(900); await ta(page).fill(BAD); await dBtn(page, /^Import/).click(); await page.waitForTimeout(1200); await page.keyboard.press("Escape"); await page.waitForTimeout(700); await b.click(); await page.waitForTimeout(900); await park(page, vp); await shot(page, run, "12-import-reopen-after-error"); await page.keyboard.press("Escape"); });
    run.errs = errs.slice(0, 12); await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, "timeline", run.err || "ok", run.frames.length, JSON.stringify(run.notes).slice(0, 600));
  // ── B. Spring → inline KeyframesEditor → Add keyframes (KeyframesAddDialog) ──
  const srun = { tag, frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme, "spring");
    await openDrawer(page, vp);
    const trig = page.locator('button[aria-label="Add keyframes"]').filter({ visible: true }).first();
    srun.notes.triggerCount = await page.locator('button[aria-label="Add keyframes"]').count();
    await trig.scrollIntoViewIfNeeded(); await trig.hover(); await page.waitForTimeout(900);
    await shot(page, srun, "20-spring-add-trigger-hover");
    await trig.click(); await page.waitForTimeout(1000); await park(page, vp);
    await shot(page, srun, "21-spring-add-open");
    await step(srun, "spring-parse-error", async () => { await ta(page).fill(BAD); await dBtn(page, /Add keyframes/).click(); await page.waitForTimeout(1500); await park(page, vp); await shot(page, srun, "22-spring-add-parse-error"); });
    await step(srun, "spring-submit", async () => { await ta(page).fill("@keyframes more {\n  60% { transform: translateX(40px); }\n}"); await dBtn(page, /Add keyframes/).click(); await page.waitForTimeout(350); await shot(page, srun, "23-spring-add-submit-sweep"); await page.waitForTimeout(1500); await park(page, vp); await shot(page, srun, "24-spring-add-after"); });
    srun.errs = errs.slice(0, 12); await ctx.close();
  } catch (e) { srun.err = String(e).slice(0, 400); }
  log.runs.push(srun); console.log(tag, "spring", srun.err || "ok", srun.frames.length, JSON.stringify(srun.notes).slice(0, 600));
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(JSON.stringify(log.kf), JSON.stringify(log.glass));
