// controls-advanced-layer audit capture — READ-ONLY; headed Chromium on the real GPU.
// States: advanced entry row (hover/focus), advanced pane (amiga = single-target, full rows),
// blend select open, blend=add (weight hidden), z-index stepped + focus, enabled=off (disabled posture),
// back to controls (focus return), cube = multi-target disabled posture.  1440x900 + 390x844, light + dark.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2];
const log = { ...tree(), when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const st = (e, extra = []) => { if (!e) return null; const c = getComputedStyle(e); const o = { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontSize + "/" + c.fontWeight, op: c.opacity, border: c.borderTopWidth + " " + c.borderTopColor, shadow: c.boxShadow.slice(0, 70) }; for (const k of extra) o[k] = c[k]; return o; };
  const out = { theme: document.documentElement.className.slice(0, 40), hash: location.hash };
  const back = [...document.querySelectorAll("[aria-label='Back to controls']")].find(vis);
  const pane = back?.closest(".panel-content");
  const pc = [...document.querySelectorAll(".controls-pane")].find(vis); out.controlsPane = r(pc);
  if (pc) out.paneScroll = [pc.scrollHeight, pc.clientHeight, pc.scrollTop];
  if (pane) {
    out.adv = r(pane); out.back = st(back); out.header = st(back.parentElement.querySelector("span"));
    const grid = pane.querySelector(".labeled-field-grid"); out.grid = grid ? { box: r(grid), cols: getComputedStyle(grid).gridTemplateColumns } : null;
    out.rows = grid ? [...grid.children].map((row) => {
      const lab = row.querySelector("label, .labeled-field-label");
      const ctl = row.querySelector("[role=combobox], [role=switch], [role=slider], input, [role=group]");
      return { cls: row.className.slice(0, 50), box: r(row), cols: getComputedStyle(row).gridTemplateColumns, label: lab ? { t: lab.textContent.trim(), ...st(lab) } : null,
        disabled: !!row.querySelector("[data-disabled], :disabled, [aria-disabled=true]"), ctl: ctl ? { role: ctl.getAttribute("role") || ctl.tagName, ...st(ctl) } : null };
    }) : [];
    const combo = pane.querySelector("[role=combobox]"); out.select = st(combo);
    const nf = pane.querySelector("input[inputmode], input[role=spinbutton], .number-field input") || pane.querySelector("input");
    if (nf) { out.nfInput = st(nf); out.nfValue = nf.value; let h = nf.parentElement; out.nfHolder = st(h); out.nfHolder2 = st(h?.parentElement); out.nfBtns = [...(h?.querySelectorAll("button") || [])].map(b => ({ t: b.getAttribute("aria-label"), ...st(b) })); }
    const sw = pane.querySelector("[role=switch]"); out.switch = sw ? { checked: sw.getAttribute("aria-checked"), ...st(sw) } : null;
    const sl = pane.querySelector("[role=slider]"); out.slider = sl ? { v: sl.getAttribute("aria-valuenow"), dis: sl.getAttribute("aria-disabled") || sl.getAttribute("data-disabled"), ...st(sl) } : null;
    out.emptyText = pane.innerText.replace(/\s+/g, " ").slice(0, 160);
  }
  const advRow = [...document.querySelectorAll(".controls-pane button")].filter(vis).find(b => b.textContent.trim() === "advanced");
  if (advRow) out.advRow = { expanded: advRow.getAttribute("aria-expanded"), ...st(advRow) };
  const lb = [...document.querySelectorAll("[role=listbox]")].find(vis);
  if (lb) { const content = lb.closest("[data-reka-popper-content-wrapper] > *") || lb.parentElement; const b = content.getBoundingClientRect();
    out.listbox = { ...st(content), clipped: b.right > innerWidth || b.left < 0 || b.bottom > innerHeight + 1 || b.top < 0, items: [...lb.querySelectorAll("[role=option]")].filter(vis).map(o => ({ t: o.textContent.trim().replace(/\s+/g, " ").slice(0, 50), ...st(o), sel: o.getAttribute("aria-selected"), hl: o.hasAttribute("data-highlighted") })) }; }
  const ae = document.activeElement; out.focus = ae ? (ae.getAttribute("aria-label") || ae.tagName) + ":" + (ae.textContent || ae.value || "").trim().slice(0, 24) + " " + JSON.stringify(r(ae)) + " outline=" + getComputedStyle(ae).outlineStyle + "/" + getComputedStyle(ae).boxShadow.slice(0, 40) : null;
  return out;
});
async function fresh(vp, theme, route) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width - 5, VPS[vp].height / 2);
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, clipSel) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); const fr = { frame: p, ...tree(), ...m };
  if (clipSel) { const el = typeof clipSel === "string" ? page.locator(clipSel).filter({ visible: true }).first() : clipSel; const bb = await el.boundingBox().catch(() => null);
    if (bb) { const vp = page.viewportSize(); const x = Math.max(0, bb.x - 12), y = Math.max(0, bb.y - 12); const cp = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + cp, clip: { x, y, width: Math.min(vp.width - x, bb.width + 24), height: Math.min(vp.height - y, bb.height + 24) } }); fr.crop = cp; } }
  run.frames.push(fr);
}
const openDrawer = async (page, vp) => {
  if (vp !== "390") return;
  const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900); }
  const t = page.getByRole("button", { name: "Controls panel" }).first();
  if (await t.count()) { await t.click(); await page.waitForTimeout(1400); }
  await page.mouse.move(5, 300); await page.waitForTimeout(600);
};
const advRow = (page) => page.locator(".controls-pane button", { hasText: /^\s*advanced\s*$/ }).filter({ visible: true }).first();
const back = (page) => page.getByRole("button", { name: "Back to controls" }).filter({ visible: true }).first();
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  const run = { tag, frames: [], errs: {}, notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme, "amiga");
    await openDrawer(page, vp);
    const a = advRow(page); await a.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => { run.notes.advRowScrollFail = true; });
    run.notes.advRowInViewport = await a.evaluate((b) => { const r = b.getBoundingClientRect(); return [Math.round(r.y), innerHeight, !!document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)]; });
    await a.hover({ timeout: 3000 }).catch(() => { run.notes.advRowHoverFail = "pointer cannot reach the advanced row"; }); await page.waitForTimeout(350);
    await shot(page, run, "01-amiga-advanced-row-hover", ".controls-pane");
    await a.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(250);
    run.notes.advRowAfterKbdFocus = await a.evaluate((b) => Math.round(b.getBoundingClientRect().y));
    await shot(page, run, "02-amiga-advanced-row-kbd-focus");
    await page.keyboard.press("Enter"); await page.waitForTimeout(1000); await page.mouse.move(5, 300);
    await shot(page, run, "03-amiga-advanced-pane", ".controls-pane");
    await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(250);
    await shot(page, run, "03b-amiga-back-kbd-focus", ".controls-pane");
    // blend select open
    const combo = page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: /replace|add|accumulate/ }).first();
    await combo.click(); await page.waitForTimeout(700);
    await shot(page, run, "04-amiga-blend-open", "[role=listbox]");
    await page.getByRole("option", { name: /^add/ }).first().click(); await page.waitForTimeout(900);
    await shot(page, run, "05-amiga-blend-add-weight-hidden", ".controls-pane");
    await combo.click(); await page.waitForTimeout(600); await page.getByRole("option", { name: /^replace/ }).first().click(); await page.waitForTimeout(800);
    // z-index: increment twice + focus
    const inc = page.locator(".controls-pane button[aria-label*=ncrease i], .controls-pane button[slot=increment]").filter({ visible: true }).first();
    run.notes.incCount = await inc.count();
    if (run.notes.incCount) { await inc.click(); await inc.click(); await page.waitForTimeout(400); }
    const nfi = page.locator(".controls-pane .labeled-field-grid input").filter({ visible: true }).first();
    await nfi.focus(); await page.waitForTimeout(250);
    await shot(page, run, "06-amiga-zindex-stepped-focus", ".controls-pane");
    // weight drag
    const sl = page.locator(".controls-pane .labeled-field-grid [role=slider]").first(); // standard slider thumb is width 0 / opacity 0 by producer design — not "visible" to Playwright
    if (await sl.count()) { await sl.focus(); for (let i = 0; i < 30; i++) await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(400); await shot(page, run, "07-amiga-weight-070-focus", ".controls-pane"); }
    // enabled off → disabled posture
    const sw = page.locator(".controls-pane .labeled-field-grid [role=switch]").filter({ visible: true }).first();
    await sw.click(); await page.waitForTimeout(700); await page.mouse.move(5, 300);
    await shot(page, run, "08-amiga-enabled-off", ".controls-pane");
    await sw.click(); await page.waitForTimeout(500);
    // back to controls
    await back(page).click(); await page.waitForTimeout(1000);
    await shot(page, run, "09-amiga-back-to-controls", ".controls-pane");
    run.errs.amiga = errs.slice(0, 6); await ctx.close();
    // cube: multi-target → blend + enabled disabled
    const f = await fresh(vp, theme, "cube"); await openDrawer(f.page, vp);
    const a2 = advRow(f.page); await a2.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {}); await a2.click({ timeout: 3000 }).catch(async () => { run.notes.cubeAdvClickFail = true; await a2.focus(); await f.page.keyboard.press("Enter"); }); await f.page.waitForTimeout(1000); await f.page.mouse.move(5, 300);
    await shot(f.page, run, "10-cube-advanced-multitarget", ".controls-pane");
    run.errs.cube = f.errs.slice(0, 6); await f.ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, run.err || "ok", run.frames.length);
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(log.sha, log.dirty);
