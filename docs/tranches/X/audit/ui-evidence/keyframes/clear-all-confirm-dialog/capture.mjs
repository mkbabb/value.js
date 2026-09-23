// clear-all-confirm-dialog audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const log = { sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const px = (e) => { if (!e) return null; const b = e.getBoundingClientRect(), c = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontFamily.split(",")[0] + " " + c.fontSize + " " + c.fontWeight + " lh" + c.lineHeight, pad: c.padding, outline: c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor, shadow: c.boxShadow.slice(0, 90), cursor: c.cursor, cls: String(e.className?.baseVal ?? e.className).slice(0, 120) }; };
  const dlg = document.querySelector('[data-slot="dialog-content"]');
  const ae = document.activeElement;
  const out = { theme: document.documentElement.className, open: !!dlg, dlgState: dlg?.getAttribute("data-state"), role: dlg?.getAttribute("role"),
    focus: ae ? { tag: ae.tagName, text: (ae.textContent || "").trim().slice(0, 30), aria: ae.getAttribute("aria-label"), fv: ae.matches(":focus-visible"), ...px(ae) } : null };
  if (dlg) {
    const cs = getComputedStyle(dlg);
    out.dialog = { ...px(dlg), backdrop: cs.backdropFilter, gap: cs.gap, display: cs.display, labelledby: dlg.getAttribute("aria-labelledby"), describedby: dlg.getAttribute("aria-describedby") };
    out.title = px(dlg.querySelector('[data-slot="dialog-title"]')) ?? px(dlg.querySelector("h2"));
    out.desc = px(dlg.querySelector('[data-slot="dialog-description"]')) ?? px(dlg.querySelector("p"));
    out.footer = px(dlg.querySelector('[data-slot="dialog-footer"]'));
    out.header = !!dlg.querySelector('[data-slot="dialog-header"]');
    out.buttons = [...dlg.querySelectorAll("button")].map(b => ({ t: b.textContent.trim() || b.getAttribute("aria-label"), slot: b.getAttribute("data-slot"), ...px(b) }));
    const ov = document.querySelector('[data-slot="dialog-overlay"], [data-slot="modal-overlay"], .fixed.inset-0');
    out.overlay = ov ? { slot: ov.getAttribute("data-slot"), ...px(ov), op: getComputedStyle(ov).opacity, backdrop: getComputedStyle(ov).backdropFilter } : null;
  }
  const trig = document.querySelector("[aria-label='@mbabb menu']"); if (trig) out.trigger = { expanded: trig.getAttribute("aria-expanded"), isFocus: trig === ae };
  out.ls = Object.keys(localStorage).length;
  return out;
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/cube`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10);
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, crop = false) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m });
  if (crop) { const b = await page.locator('[data-slot="dialog-content"]').first().boundingBox(); if (b) { const c = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + c, clip: { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 16), width: Math.min(b.width + 32, VPS[run.vp].width), height: b.height + 32 } }); run.frames.push({ frame: c }); } }
}
const hoverDock = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const openDialog = async (page) => { await hoverDock(page); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(700); await page.getByRole("menuitem", { name: /Clear all/ }).click(); await page.waitForTimeout(1000); };
const hoverBtn = async (page, name) => { const b = await page.locator('[data-slot="dialog-content"] button', { hasText: name }).first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(350); } return b; };
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const run = { tag: `${vp}-${theme}`, vp, frames: [] };
  try {
    let { ctx, page, errs } = await fresh(vp, theme);
    await shot(page, run, "00-before");
    await openDialog(page);
    await shot(page, run, "01-open", true);
    await hoverBtn(page, "Cancel"); await shot(page, run, "02-hover-cancel", true);
    await hoverBtn(page, "Clear & reload"); await shot(page, run, "02-hover-confirm", true);
    const x = page.locator('[data-slot="dialog-close"], [data-slot="dialog-content"] button:has(.sr-only)').first();
    if (await x.count()) { const xb = await x.boundingBox(); await page.mouse.move(xb.x + xb.width / 2, xb.y + xb.height / 2); await page.waitForTimeout(350); await shot(page, run, "02-hover-close", true); }
    await page.mouse.move(5, 5);
    // keyboard: Tab cycle
    for (let i = 1; i <= 3; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(250); await shot(page, run, `03-tab${i}`, true); }
    // Escape dismissal + focus return
    await page.keyboard.press("Escape"); await page.waitForTimeout(900); await shot(page, run, "04-after-escape");
    // outside-click dismissal
    await openDialog(page); await page.mouse.click(10, VPS[vp].height / 2); await page.waitForTimeout(900); await shot(page, run, "05-after-outside-click");
    // Cancel
    await openDialog(page); await page.locator('[data-slot="dialog-content"] button', { hasText: "Cancel" }).first().click(); await page.waitForTimeout(900); await shot(page, run, "06-after-cancel");
    // mid-transition frame (entrance)
    await hoverDock(page); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(700); await page.getByRole("menuitem", { name: /Clear all/ }).click(); await page.waitForTimeout(90); await shot(page, run, "07-entrance-90ms"); await page.waitForTimeout(900);
    if (vp === "1440" && theme === "light") {
      // functional: confirm clears storage + reloads (isolated browser context; app tree untouched)
      const before = await page.evaluate(() => Object.keys(localStorage));
      let reloaded = false; page.once("load", () => { reloaded = true; });
      await page.locator('[data-slot="dialog-content"] button', { hasText: "Clear & reload" }).first().click();
      await page.waitForTimeout(4000);
      const after = await page.evaluate(() => Object.keys(localStorage));
      run.confirm = { before, after, reloaded };
      await shot(page, run, "08-after-confirm");
    }
    run.errs = errs; await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length);
}
await browser.close(); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 2)); console.log(sha, dirty);
