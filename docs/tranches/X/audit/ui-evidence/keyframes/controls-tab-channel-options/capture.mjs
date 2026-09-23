// controls-tab-channel-options audit capture — READ-ONLY; headed Chromium on the real GPU.
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
  const st = (e, extra = []) => { if (!e) return null; const c = getComputedStyle(e); const o = { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontSize + "/" + c.fontWeight + " " + c.fontFamily.split(",")[0], shadow: c.boxShadow.slice(0, 90), border: c.borderTopWidth + " " + c.borderTopColor }; for (const k of extra) o[k] = c[k]; return o; };
  const pane = [...document.querySelectorAll(".controls-pane")].find(vis);
  const panel = pane && [...pane.querySelectorAll("[role=tabpanel][data-state=active]")].find(vis);
  const card = panel && panel.querySelector(".glass, [class*=card], [data-slot=card]") ;
  const cardEl = panel ? panel.firstElementChild?.firstElementChild : null;
  const out = { theme: document.documentElement.className.slice(0, 40), hash: location.hash, pane: r(pane), paneScroll: pane ? [pane.scrollHeight, pane.clientHeight] : null };
  if (panel) {
    out.card = st(cardEl);
    const labels = [...panel.querySelectorAll("label")].filter(vis);
    out.labels = labels.map(l => ({ t: l.textContent.trim(), color: getComputedStyle(l).color, font: getComputedStyle(l).fontSize + "/" + getComputedStyle(l).fontWeight }));
    out.inputs = [...panel.querySelectorAll("input")].filter(vis).map(i => { const h = i.parentElement; return { v: i.value, inp: st(i), holder: st(h) }; });
    out.combos = [...panel.querySelectorAll("[role=combobox]")].filter(vis).map(c => ({ t: c.textContent.trim().slice(0, 20), ...st(c) }));
    out.buttons = [...panel.querySelectorAll("button:not([role=combobox])")].filter(vis).map(b => ({ t: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 24), ...st(b) }));
    out.errText = [...panel.querySelectorAll("[role=alert], [aria-invalid=true], [data-invalid]")].filter(vis).map(e => e.tagName + ":" + (e.textContent || e.value || "").trim().slice(0, 60));
  }
  const rt = document.getElementById("controls-ribbon-target");
  if (rt && vis(rt)) {
    const rc = rt.closest("[class*=card], .glass") || rt.parentElement?.parentElement;
    out.ribbon = { target: r(rt), card: st(rt.parentElement?.parentElement), buttons: [...rt.querySelectorAll("button")].filter(vis).map(b => ({ t: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 24), ...st(b) })),
      slider: st(rt.querySelector("[role=slider]")), sliderTrack: st(rt.querySelector("[data-slot=slider-track], .slider-track, [data-orientation] > span")), balls: [...rt.querySelectorAll(".progress-ball, .progress-rail")].map(e => st(e)) };
  }
  const lb = [...document.querySelectorAll("[role=listbox]")].find(vis);
  if (lb) {
    const content = lb.closest("[data-reka-popper-content-wrapper] > *") || lb.parentElement;
    const b = content.getBoundingClientRect();
    out.listbox = { ...st(content), clipped: b.right > innerWidth || b.left < 0 || b.bottom > innerHeight + 1 || b.top < 0, scroll: [lb.scrollHeight, lb.clientHeight],
      groups: [...lb.querySelectorAll("[role=group]")].length, separators: [...content.querySelectorAll("[role=separator], [data-slot=select-separator]")].length,
      heads: [...content.querySelectorAll("[role=group] > div:first-child, [data-slot=select-label]")].filter(vis).slice(0, 3).map(e => ({ t: e.textContent.trim(), ...st(e, ["textTransform", "letterSpacing"]) })),
      items: [...lb.querySelectorAll("[role=option]")].filter(vis).slice(0, 6).map(o => ({ t: o.textContent.trim().slice(0, 40), ...st(o), hl: o.hasAttribute("data-highlighted"), sel: o.getAttribute("aria-selected") })) };
  }
  const drawer = [...document.querySelectorAll(".controls-drawer-content")].find(vis); if (drawer) out.drawer = st(drawer);
  const tdock = [...document.querySelectorAll(".glass-dock")].filter(vis).map(d => r(d)); out.docks = tdock;
  out.focus = document.activeElement ? (document.activeElement.getAttribute("aria-label") || document.activeElement.tagName) + ":" + (document.activeElement.textContent || document.activeElement.value || "").trim().slice(0, 24) : null;
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
  if (clipSel) { const el = page.locator(clipSel).filter({ visible: true }).first(); const bb = await el.boundingBox().catch(() => null);
    if (bb) { const vp = page.viewportSize(); const x = Math.max(0, bb.x - 12), y = Math.max(0, bb.y - 12); const cp = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + cp, clip: { x, y, width: Math.min(vp.width - x, bb.width + 24), height: Math.min(vp.height - y, bb.height + 24) } }); fr.crop = cp; } }
  run.frames.push(fr);
}
const combo = (page, re) => page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: re }).first();
const openDrawer = async (page, vp) => {
  if (vp !== "390") return;
  const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900); }
  const t = page.getByRole("button", { name: "Controls panel" }).first();
  if (await t.count()) { await t.click(); await page.waitForTimeout(1400); }
  await page.mouse.move(5, 300); await page.waitForTimeout(600);
};
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  const run = { tag, frames: [], errs: {}, notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme, "cube");
    if (vp === "390") await shot(page, run, "00-cube-drawer-peek");
    await openDrawer(page, vp);
    await shot(page, run, "01-cube-controls-default", ".controls-pane");
    // easing select open
    const ez = combo(page, /ease/); await ez.scrollIntoViewIfNeeded().catch(() => {}); await ez.click(); await page.waitForTimeout(700);
    await shot(page, run, "02-cube-easing-select-open", "[role=listbox]");
    const opt = page.getByRole("option").nth(3); const ob = await opt.boundingBox().catch(() => null);
    if (ob) { await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2); await page.waitForTimeout(350); await shot(page, run, "03-cube-easing-item-hover"); }
    await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250); await shot(page, run, "04-cube-easing-kbd");
    // scroll listbox to bottom to see later groups
    await page.evaluate(() => { const lb = [...document.querySelectorAll("[role=listbox]")].find(e => e.getBoundingClientRect().width); const v = lb?.closest("[data-reka-select-viewport]") || lb; if (v) v.scrollTop = v.scrollHeight / 2; }); await page.waitForTimeout(300);
    await shot(page, run, "05-cube-easing-scrolled-mid");
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    // direction select open
    const dir = combo(page, /alternate|normal|reverse/); await dir.click(); await page.waitForTimeout(600);
    await shot(page, run, "06-cube-direction-open", "[role=listbox]"); await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    // focus ring on duration input via keyboard
    await page.keyboard.press("Escape").catch(() => {}); const inp = page.locator(".controls-pane input").filter({ visible: true }).first();
    await inp.focus(); await page.waitForTimeout(250); await shot(page, run, "07-cube-duration-focus", ".controls-pane");
    // invalid duration
    await inp.fill("abc"); await inp.press("Enter"); await page.waitForTimeout(500);
    await shot(page, run, "08-cube-duration-invalid", ".controls-pane");
    await inp.fill("5s"); await inp.press("Enter"); await page.waitForTimeout(400);
    // pencil → detail editor
    const pen = page.getByRole("button", { name: "Edit easing curve" }).filter({ visible: true }).first();
    if (await pen.count()) { if (!(await pen.click({ timeout: 5000 }).then(() => true).catch(() => false))) run.notes.pencilBlocked = true; await page.waitForTimeout(900); await shot(page, run, "09-cube-easing-detail-editor", ".controls-pane"); await page.keyboard.press("Escape"); await page.waitForTimeout(300);
      const back = page.getByRole("button", { name: /back|done|close/i }).filter({ visible: true }).first(); if (await back.count()) { await back.click({ timeout: 4000 }).catch(() => { run.notes.backBlocked = true; }); await page.waitForTimeout(700); } }
    const adv = page.locator(".controls-pane button", { hasText: "advanced" }).filter({ visible: true }).first();
    if (await adv.count()) { if (!(await adv.click({ timeout: 5000 }).then(() => true).catch(() => false))) run.notes.advancedBlocked = true; await page.waitForTimeout(800); await shot(page, run, "10-cube-advanced", ".controls-pane"); const bk = page.getByRole("button", { name: "Back to controls" }).filter({ visible: true }).first(); if (await bk.count()) { await bk.click({ timeout: 4000 }).catch(() => { run.notes.advBackBlocked = true; }); await page.waitForTimeout(600); } }
    // ribbon hover on buttons
    const rev = page.locator("#controls-ribbon-target button", { hasText: "Reverse" }).filter({ visible: true }).first();
    if (await rev.count()) { await rev.scrollIntoViewIfNeeded().catch(() => {}); await rev.hover({ timeout: 5000 }).catch(() => { run.notes.reverseBlocked = true; }); await page.waitForTimeout(400); await shot(page, run, "11-cube-ribbon-reverse-hover", "#controls-ribbon-target"); }
    run.errs.cube = errs.slice(0, 6); await ctx.close();
    for (const sc of ["amiga", "square", "easing", "spring"]) {
      const f = await fresh(vp, theme, sc); await openDrawer(f.page, vp);
      await shot(f.page, run, `12-${sc}-controls-default`, ".controls-pane");
      run.errs[sc] = f.errs.slice(0, 6); await f.ctx.close();
    }
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, run.err || "ok", run.frames.length);
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(log.sha, log.dirty);
