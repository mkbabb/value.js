// spring-discrete-view audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
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
  const st = (e, ps) => { if (!e) return null; const s = getComputedStyle(e); return Object.fromEntries(ps.map(p => [p, s[p]])); };
  const card = document.querySelector(".discrete-card");
  const stageCard = card?.closest("[data-tier]") || card?.closest(".glass, [class*=card]");
  const art = document.querySelector(".artifact");
  return {
    dark: document.documentElement.classList.contains("dark"),
    view: card ? "discrete" : "solver",
    card: r(card), cardStyle: st(card, ["display", "opacity", "transform", "borderRadius"]),
    stageCard: r(stageCard), stageCardRadius: stageCard && getComputedStyle(stageCard).borderRadius,
    artifact: art ? [r(art), art.clientHeight, art.scrollHeight, art.scrollWidth > art.clientWidth, art.textContent.length] : null,
    artifactStatus: document.querySelector(".artifact-status")?.textContent.trim(),
    copy: (() => { const e = document.querySelector("[aria-label='Copy the @starting-style artifact']"); return e && [r(e), getComputedStyle(e).borderRadius]; })(),
    accentBtns: [...document.querySelectorAll(".btn-playback-accent")].map(e => e.textContent.trim() + " " + r(e) + " r=" + getComputedStyle(e).borderRadius + " vis=" + (e.getBoundingClientRect().bottom <= innerHeight && e.getBoundingClientRect().top >= 0) + " exp=" + e.getAttribute("aria-expanded")),
    chip: (() => { const e = document.querySelector(".active-preset-chip"); return e && [e.textContent.trim(), r(e), getComputedStyle(e).borderRadius]; })(),
    dock: r(document.querySelector("[aria-label='Select animation']")?.closest(".glass-dock, [class*=dock]")),
    combo: document.querySelector("[aria-label='Select animation']")?.textContent.trim(),
    pane: r(document.querySelector(".controls-pane")),
    kfEditor: r(document.querySelector(".keyframes-section")),
    active: document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.className?.toString().slice(0, 40)),
    hscroll: document.documentElement.scrollWidth > innerWidth,
  };
});
async function fresh(vp, theme, routeMode) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  if (routeMode === "abort") await page.route(/compile\/emit\/entry\.ts/, (rt) => rt.abort());
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
  page.on("response", (r) => { if (r.status() >= 400) errs.push(r.status() + " " + r.url().slice(-80)); });
  await page.goto(`http://localhost:5173/#/spring`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
}
const away = (page, vp) => page.mouse.move(VPS[vp].width - 4, VPS[vp].height / 2);
const toEntry = async (page, run, vp, shotOpen) => {
  const sel = page.getByRole("combobox", { name: "Select animation" }).first();
  await sel.click(); await page.waitForTimeout(600);
  if (shotOpen) await shot(page, run, "01-select-open");
  await page.getByRole("option", { name: /Entry/ }).first().click(); await away(page, vp); await page.waitForTimeout(1400);
};
const inCard = (page) => page.locator(".stage-viewport ~ button.btn-playback-accent, [aria-controls].btn-playback-accent").first();

for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await away(page, vp);
    await shot(page, run, "00-solver-before-flip");
    await toEntry(page, run, vp, true);
    await shot(page, run, "02-entry-visible-rest");
    const btn = inCard(page);
    await btn.scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(300);
    await btn.hover(); await page.waitForTimeout(350); await shot(page, run, "03-dismiss-hover");
    await btn.click(); await page.waitForTimeout(140); await shot(page, run, "04a-dismissing-140ms");
    await away(page, vp); await page.waitForTimeout(900); await shot(page, run, "04b-dismissed-settled");
    await btn.click(); await page.waitForTimeout(140); await shot(page, run, "05a-revealing-140ms");
    await away(page, vp); await page.waitForTimeout(900); await shot(page, run, "05b-revealed-settled");
    // keyboard focus: focus the button then Tab to the copy + artifact region
    await btn.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(250);
    await shot(page, run, "06a-kbd-focus-toggle");
    await page.keyboard.press("Tab"); await page.waitForTimeout(250); await shot(page, run, "06b-kbd-focus-next");
    await page.keyboard.press("Tab"); await page.waitForTimeout(250); await shot(page, run, "06c-kbd-focus-next2");
    // copy button hover + click
    const cp = page.getByRole("button", { name: "Copy the @starting-style artifact" }).first();
    if (await cp.count()) {
      await cp.scrollIntoViewIfNeeded().catch(() => {});
      await cp.hover(); await page.waitForTimeout(400); await shot(page, run, "07a-copy-hover");
      await cp.click(); await page.waitForTimeout(250); await shot(page, run, "07b-copy-clicked");
      run.notes.clipboardLen = await page.evaluate(async () => { try { return (await navigator.clipboard.readText()).length; } catch (e) { return String(e).slice(0, 80); } });
      await away(page, vp);
    }
    // artifact scrolled to the end
    await page.evaluate(() => { const a = document.querySelector(".artifact"); if (a) { a.scrollIntoView({ block: "center" }); a.scrollTop = a.scrollHeight; } });
    await page.waitForTimeout(400); await shot(page, run, "08-artifact-scrolled-end");
    await page.evaluate(() => { const a = document.querySelector(".artifact"); if (a) a.scrollTop = 0; for (const e of document.querySelectorAll("*")) if (e.scrollTop && !e.classList.contains("artifact")) e.scrollTop = 0; });
    // preset change reflected: click "bouncy" in the pane (1440 only — at 390 it's in the sheet)
    if (vp === "390") {
      const h = page.getByRole("button", { name: "Drawer position" }).first();
      if (await h.count()) { await h.click().catch(() => {}); await page.waitForTimeout(1200); await shot(page, run, "09z-sheet-expanded"); run.notes.sheet = true; }
    }
    const bouncy = page.locator(".preset-cell", { hasText: /bouncy/i }).first();
    if (await bouncy.count()) { await bouncy.scrollIntoViewIfNeeded().catch(() => {}); await bouncy.click().catch(e => run.notes.bouncyErr = String(e).slice(0, 120)); await page.waitForTimeout(700); await shot(page, run, "09a-preset-bouncy-in-entry-view"); }
    // the ribbon twin in the pane
    const ok = await page.evaluate(() => { const bs = [...document.querySelectorAll(".btn-playback-accent")].filter(b => !b.hasAttribute("aria-controls")); const b = bs.pop(); if (b) b.scrollIntoView({ block: "center" }); return !!b; });
    run.notes.ribbonTwin = ok; await page.waitForTimeout(500); await shot(page, run, "10a-ribbon-twin-in-pane");
    const twin = page.locator(".btn-playback-accent:not([aria-controls])").last();
    if (await twin.count()) { await twin.hover().catch(() => {}); await page.waitForTimeout(300); await shot(page, run, "10b-ribbon-twin-hover"); await twin.click().catch(() => {}); await page.waitForTimeout(900); await shot(page, run, "10c-ribbon-twin-clicked"); await twin.click().catch(() => {}); await page.waitForTimeout(900); }
    // inline @keyframes editor in the Entry view (whose channel is it?)
    const kf = await page.evaluate(() => { const e = document.querySelector(".keyframes-section"); if (!e) return null; e.scrollIntoView({ block: "center" }); return e.textContent.replace(/\s+/g, " ").slice(0, 200); });
    run.notes.kfEditorText = kf; await page.waitForTimeout(400); await shot(page, run, "11-pane-inline-keyframes-in-entry-view");
    if (vp === "390") { const h = page.getByRole("button", { name: "Drawer position" }).first(); if (await h.count()) { await h.click().catch(() => {}); await page.waitForTimeout(1000); } }
    await page.evaluate(() => { for (const e of document.querySelectorAll("*")) if (e.scrollTop) e.scrollTop = 0; });
    await away(page, vp); await page.waitForTimeout(500);
    // dock Play in the Entry view
    const play = page.getByRole("button", { name: "Play animation" }).first();
    if (await play.count() && await play.isVisible()) { await play.click(); await page.waitForTimeout(250); await shot(page, run, "12a-dock-play-in-entry-250ms"); await page.waitForTimeout(900); await shot(page, run, "12b-dock-play-in-entry-1150ms"); const pz = page.getByRole("button", { name: "Pause animation" }).first(); if (await pz.count() && await pz.isVisible()) await pz.click().catch(() => {}); await page.waitForTimeout(500); }
    // dock Reset in Entry view
    const rst = page.getByRole("button", { name: /Reset/ }).first();
    if (await rst.count() && await rst.isVisible()) { await rst.click().catch(() => {}); await page.waitForTimeout(800); await shot(page, run, "12c-dock-reset-in-entry"); }
    // panel closed
    const cpb = page.getByRole("button", { name: "Controls panel" });
    for (let i = 0; i < await cpb.count(); i++) if (await cpb.nth(i).isVisible()) { await cpb.nth(i).click(); await away(page, vp); await page.waitForTimeout(1400); await shot(page, run, "13-panel-closed"); break; }
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
// artifact-not-ready: abort the compileToEntry emitter module so the dynamic compile never resolves
for (const [vp, theme] of [["1440", "light"], ["1440", "dark"], ["390", "light"], ["390", "dark"]]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== "nr") continue;
  const run = { tag: "notready-" + tag, vp, ...tree(), frames: [], notes: { instrumented: "page.route abort of src/animation/compile/emit/entry.ts" } };
  try {
    const { ctx, page, errs } = await fresh(vp, theme, "abort");
    await toEntry(page, run, vp, false);
    await shot(page, run, "20-artifact-not-ready");
    run.errors = errs; await ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
