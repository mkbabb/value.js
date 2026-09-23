// controls-timing-function-detail — READ-ONLY capture; headed Chromium on the real GPU.
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
const measure = (page) => page.evaluate(() => {
  const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const st = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontSize + "/" + c.fontWeight + " " + c.fontFamily.split(",")[0], lh: c.lineHeight }; };
  const row = [...document.querySelectorAll(".panel-row--detail")].find(vis);
  const out = { hash: location.hash, dark: document.documentElement.classList.contains("dark"), row: row ? { cls: row.className, ...st(row) } : null, pane: r([...document.querySelectorAll(".controls-pane")].find(vis)) };
  const active = row && row.classList.contains("panel-row--active");
  if (row && active) {
    const h3 = row.querySelector("h3"); out.title = { t: h3?.textContent.trim(), ...st(h3) };
    const note = h3?.parentElement?.querySelector("p"); out.note = note ? { t: note.textContent.trim(), ...st(note) } : null;
    const back = row.querySelector('[aria-label="back to controls"]'); out.back = back ? st(back) : null;
    const picker = row.querySelector("[data-curve-clipped], [class*=easing-picker], [aria-label='Easing curve editor']") ;
    out.picker = picker ? { tag: picker.tagName, cls: (picker.className?.baseVal ?? picker.className).toString().slice(0, 120), ...st(picker) } : null;
    out.svgs = [...row.querySelectorAll("svg")].filter(vis).filter(s => s.getBoundingClientRect().width > 30).map(s => ({ vb: s.getAttribute("viewBox"), ...st(s), parent: st(s.parentElement) }));
    out.tabs = [...row.querySelectorAll("[role=tab], [role=radio]")].filter(vis).map(t => ({ t: t.textContent.trim(), sel: t.getAttribute("aria-selected") ?? t.getAttribute("aria-checked"), ...st(t) }));
    out.combos = [...row.querySelectorAll("[role=combobox]")].filter(vis).map(c => ({ t: c.textContent.trim().slice(0, 24), ...st(c) }));
    out.buttons = [...row.querySelectorAll("button:not([role=combobox]):not([role=tab])")].filter(vis).map(b => ({ t: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 30), ...st(b) }));
    out.inputs = [...row.querySelectorAll("input")].filter(vis).map(i => ({ v: i.value, type: i.type, aria: i.getAttribute("aria-label"), ...st(i), holder: st(i.parentElement) }));
    out.texts = [...row.querySelectorAll("code, output, [class*=readout], label, [class*=label]")].filter(vis).slice(0, 10).map(e => ({ tag: e.tagName, t: e.textContent.trim().slice(0, 50), ...st(e) }));
    out.handles = [...row.querySelectorAll("circle, [data-press-armed], [class*=handle]")].filter(vis).length;
    out.overflow = row ? [row.scrollWidth, row.clientWidth, row.scrollHeight, row.clientHeight] : null;
  }
  const lbl = [...document.querySelectorAll("label")].find(l => vis(l) && l.textContent.trim() === "easing"); out.easingLabel = lbl ? { cls: lbl.className, ...st(lbl) } : null;
  const pen = [...document.querySelectorAll('[aria-label="Edit easing curve"]')].find(vis); out.pencil = pen ? { inert: !!pen.closest("[inert]"), ...st(pen) } : null;
  const ae = document.activeElement; out.focus = ae ? (ae.getAttribute("aria-label") || ae.tagName) + ":" + (ae.textContent || "").trim().slice(0, 20) + " fv=" + ae.matches(":focus-visible") + " outline=" + getComputedStyle(ae).outlineStyle + "/" + getComputedStyle(ae).boxShadow.slice(0, 60) : null;
  const sel = [...document.querySelectorAll(".controls-pane [role=combobox]")].find(c => vis(c) && /ease|bezier|steps|bounce/i.test(c.textContent)); out.easingSelect = sel ? sel.textContent.trim().slice(0, 30) : null;
  return out;
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/cube`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width - 5, VPS[vp].height / 2); await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
const openDrawer = async (page, vp) => {
  if (vp !== "390") return;
  const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900); }
  const t = page.getByRole("button", { name: "Controls panel" }).first();
  if (await t.count()) { await t.click(); await page.waitForTimeout(1400); }
  await page.mouse.move(5, 300); await page.waitForTimeout(600);
};
async function shot(page, run, name, crop = true) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); const fr = { frame: p, kf: rev(TREE), ...m };
  if (crop) { const el = page.locator(".controls-pane").filter({ visible: true }).first(); const bb = await el.boundingBox().catch(() => null);
    if (bb) { const vp = page.viewportSize(); const x = Math.max(0, bb.x - 12), y = Math.max(0, bb.y - 12); const cp = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + cp, clip: { x, y, width: Math.min(vp.width - x, bb.width + 24), height: Math.min(vp.height - y, bb.height + 24) } }); fr.crop = cp; } }
  run.frames.push(fr);
}
const pencil = (page) => page.getByRole("button", { name: "Edit easing curve" }).filter({ visible: true }).first();
const back = (page) => page.getByRole("button", { name: "back to controls" }).filter({ visible: true }).first();
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  const run = { tag, frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await openDrawer(page, vp);
    await shot(page, run, "01-controls-rest");
    const pen = pencil(page); await pen.scrollIntoViewIfNeeded().catch(() => {});
    await pen.hover(); await page.waitForTimeout(500); await shot(page, run, "02-pencil-hover");
    await pen.click(); await page.waitForTimeout(1200);
    await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(400);
    await shot(page, run, "03-detail-converted-from");
    // handle drag (authoring) — does the "from" notice survive an edit?
    const hs = page.locator(".panel-row--detail.panel-row--active svg circle").filter({ visible: true });
    run.notes.handleCount = await hs.count();
    const h = hs.last(); const hb = await h.boundingBox().catch(() => null);
    if (hb) { await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down(); await page.mouse.move(hb.x + hb.width / 2 - 15, hb.y + hb.height / 2 - 25, { steps: 8 }); await page.waitForTimeout(250); await shot(page, run, "04-handle-dragging"); await page.mouse.up(); await page.waitForTimeout(700); await shot(page, run, "05-after-drag"); }
    else run.notes.drag = "no handle box";
    // steps mode via the picker's segmented control
    const stepsTab = page.locator(".panel-row--detail.panel-row--active").getByRole("tab", { name: /steps/i }).or(page.locator(".panel-row--detail.panel-row--active").getByRole("radio", { name: /steps/i })).first();
    if (await stepsTab.count() && await stepsTab.isVisible()) { await stepsTab.click(); await page.waitForTimeout(1300); await shot(page, run, "06-steps-mode"); }
    else run.notes.steps = "no visible steps tab/radio in the picker";
    // keyboard: focus-visible on back
    await back(page).focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(350);
    await shot(page, run, "07-back-focus-visible");
    await page.keyboard.press("Enter"); await page.waitForTimeout(1100);
    await shot(page, run, "08-returned-to-controls");
    // reopen on a stored literal — no "from" notice
    await pencil(page).click(); await page.waitForTimeout(1100); await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(300);
    await shot(page, run, "09-reopen-literal");
    await back(page).click(); await page.waitForTimeout(900);
    // departure: an engine-native name
    const combo = page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: /bezier|steps|ease/ }).first();
    await combo.click(); await page.waitForTimeout(700);
    const opt = page.getByRole("option", { name: /bounce/i }).first();
    if (await opt.count()) { await opt.scrollIntoViewIfNeeded().catch(() => {}); run.notes.departName = (await opt.textContent()).trim().slice(0, 40); await opt.click(); await page.waitForTimeout(900);
      await pencil(page).click(); await page.waitForTimeout(1200); await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(300);
      await shot(page, run, "10-departure-engine-native"); }
    else { run.notes.depart = "no bounce option"; await page.keyboard.press("Escape"); }
    run.errs = errs.slice(0, 8); await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, run.err || "ok", run.frames.length, JSON.stringify(run.notes));
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(JSON.stringify(log.kf), JSON.stringify(log.glass));
