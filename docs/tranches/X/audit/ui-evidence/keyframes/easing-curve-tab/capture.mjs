// easing-curve-tab — READ-ONLY capture; headed Chromium on the real GPU.
// Reach: #/easing -> top dock 'Controls tab' -> Curve. States per the seat spec.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js", GUI = "/Users/mkbabb/Programming/glass-ui";
const rev = (t) => ({ sha: execSync(`git -C ${t} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${t} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2];
const log = { kf: rev(TREE), glass: rev(GUI), glassConsumed: "7.0.0 (keyframes.js node_modules pin)", when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const st = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontSize + "/" + c.fontWeight + " " + c.fontFamily.split(",")[0], shadow: c.boxShadow.slice(0, 50) }; };
  const pane = [...document.querySelectorAll(".controls-pane")].find(vis);
  const trig = [...document.querySelectorAll("[aria-label='Easing preset']")].find(vis);
  const picker = trig?.closest(".grid") || null;
  const card = trig?.closest("[data-slot=card], .glass-card, [class*=card]");
  const cc = trig?.closest(".panel-content");
  const out = { hash: location.hash, dark: document.documentElement.classList.contains("dark"), pane: r(pane),
    controlsTab: [...document.querySelectorAll("[aria-label='Controls tab']")].filter(vis).map(e => e.textContent.trim().slice(0, 30)),
    sidebarCard: cc ? st(cc.parentElement) : null, cardContent: cc ? st(cc) : null,
    pickerGrid: picker ? { cols: getComputedStyle(picker).gridTemplateColumns, ...st(picker) } : null,
    plotCard: picker ? st(picker.firstElementChild) : null,
    plotSvg: picker ? st(picker.querySelector("svg")) : null,
    presetTrigger: st(trig), presetValue: trig?.textContent.trim().slice(0, 30),
    headings: picker ? [...picker.querySelectorAll("span, label, p, h3, h4")].filter(vis).filter(e => e.children.length === 0 && e.textContent.trim()).slice(0, 8).map(e => ({ t: e.textContent.trim().slice(0, 40), ...st(e), tt: getComputedStyle(e).textTransform, ls: getComputedStyle(e).letterSpacing })) : null,
    literal: (() => { const c = [...document.querySelectorAll("[aria-label='Copy curve literal']")].find(vis); if (!c) return null; const box = c.closest(".glass-card"); return { btn: st(c), box: st(box), text: box?.textContent.trim().slice(0, 60), code: st(box?.querySelector("code, span")) }; })(),
    headerLiteral: (() => { const c = [...document.querySelectorAll("[aria-label='Copy easing literal']")].find(vis); return c ? { btn: st(c), text: c.parentElement?.textContent.trim().slice(0, 60) } : null; })(),
    gap: (() => { const p = [...document.querySelectorAll("p[data-register=code]")].find(vis); return p ? { t: p.textContent.trim().replace(/\s+/g, " "), ...st(p) } : null; })(),
    duration: (() => { const f = [...document.querySelectorAll(".duration-field")].find(vis); if (!f) return null; return { field: st(f), label: st(f.querySelector("label")), labelT: f.querySelector("label")?.textContent.trim(), thumb: st(f.querySelector("[role=slider]")), thumbVal: f.querySelector("[role=slider]")?.getAttribute("aria-valuenow"), track: st(f.querySelector("[data-slot=slider-track], .slider-track, [data-orientation] > span")), range: st(f.querySelector("[data-slot=slider-range], .slider-range")), readout: [...f.querySelectorAll("output, input, [class*=value]")].filter(vis).map(e => e.value ?? e.textContent) }; })(),
    ribbon: (() => { const pl = [...document.querySelectorAll("button.btn-playback")].filter(vis); const eye = [...document.querySelectorAll("[aria-label='Hide ball preview']")].find(vis); const rail = [...document.querySelectorAll(".scrub-rail")].find(vis);
      return { btns: pl.map(b => ({ t: b.textContent.trim(), pressed: b.getAttribute("aria-pressed"), ...st(b) })), eye: eye ? { pressed: eye.getAttribute("aria-pressed"), ...st(eye) } : null, rail: st(rail), ribbonCard: st(rail?.closest("[data-slot=card], .glass-card, [class*=card]")) }; })(),
    playButtons: [...document.querySelectorAll("button")].filter(vis).filter(b => /^Play|^Pause/.test(b.getAttribute("aria-label") || b.textContent.trim())).map(b => (b.getAttribute("aria-label") || b.textContent.trim()) + "@" + r(b)),
    overflow: pane ? [pane.scrollWidth, pane.clientWidth, pane.scrollHeight, pane.clientHeight] : null,
  };
  const ae = document.activeElement; out.focus = ae ? (ae.getAttribute("aria-label") || ae.tagName) + " fv=" + ae.matches(":focus-visible") + " outline=" + getComputedStyle(ae).outlineStyle + "/" + getComputedStyle(ae).boxShadow.slice(0, 60) : null;
  return out;
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/easing`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width - 5, VPS[vp].height / 2); await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
const openDrawer = async (page, vp) => {
  if (vp !== "390") return;
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
const closeDrawer = async (page, vp) => { if (vp !== "390") return; const t = page.getByRole("button", { name: "Controls panel" }).first(); if (await t.count()) { await t.click({ force: true }).catch(() => {}); await page.waitForTimeout(1200); } };
const vis = (page, loc) => loc.filter({ visible: true }).first();
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  const run = { tag, frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    // Reach: top dock 'Controls tab' -> Curve
    { const top = page.locator(".glass-dock").first(); const b = await top.boundingBox().catch(() => null); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900); } }
    const ct = vis(page, page.getByRole("button", { name: "Controls tab" }).or(page.getByRole("combobox", { name: "Controls tab" })));
    if (await ct.count()) { await ct.click(); await page.waitForTimeout(800);
      run.notes.tabOptions = await page.getByRole("option").allTextContents().catch(() => []);
      await shot(page, run, "00-controls-tab-open", false);
      const cur = page.getByRole("option", { name: /Curve/ }).or(page.getByRole("menuitemradio", { name: /Curve/ })).or(page.getByRole("menuitem", { name: /Curve/ })).first();
      if (await cur.count()) { await cur.click(); await page.waitForTimeout(900); } else { run.notes.curve = "no Curve option"; await page.keyboard.press("Escape"); }
    } else run.notes.ct = "no Controls tab control";
    await openDrawer(page, vp);
    await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(400);
    await shot(page, run, "01-curve-rest");
    if (vp === "390") { await page.locator(".controls-pane").filter({ visible: true }).first().evaluate(e => { const s = [e, ...e.querySelectorAll("*")].find(x => x.scrollHeight > x.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(x).overflowY)); if (s) s.scrollTop = s.scrollHeight; }).catch(() => {}); await page.waitForTimeout(500); await shot(page, run, "01b-curve-rest-scrolled"); await page.locator(".controls-pane").filter({ visible: true }).first().evaluate(e => { [e, ...e.querySelectorAll("*")].forEach(x => { if (x.scrollTop) x.scrollTop = 0; }); }).catch(() => {}); }
    // full-panel scroll view on 390: scroll pane to the ribbon
    // preset select
    const trig = vis(page, page.getByRole("combobox", { name: "Easing preset" }));
    await trig.scrollIntoViewIfNeeded().catch(() => {});
    await trig.hover(); await page.waitForTimeout(400); await shot(page, run, "02-preset-hover");
    await trig.click(); await page.waitForTimeout(800); await shot(page, run, "03-preset-open", false);
    const opt = page.getByRole("option", { name: "ease-in-out", exact: true }).first();
    if (await opt.count()) { await opt.click(); await page.waitForTimeout(1200); } else { await page.keyboard.press("Escape"); run.notes.preset = "no ease-in-out option"; }
    await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(300);
    await shot(page, run, "04-preset-picked");
    const cp = vis(page, page.getByRole("button", { name: "Copy curve literal" }));
    await cp.hover(); await page.waitForTimeout(400); await shot(page, run, "05-copy-hover");
    await cp.click(); await page.waitForTimeout(250); await shot(page, run, "06-copy-clicked");
    run.notes.clipboard = await page.evaluate(() => navigator.clipboard.readText().catch(e => "ERR " + e)).catch(() => "n/a");
    // handle drag
    const hs = page.locator("[aria-label='Easing preset']").locator("xpath=ancestor::*[contains(@class,'grid')][1]").locator("svg circle").filter({ visible: true });
    run.notes.handles = await hs.count();
    const h = hs.last(); const hb = await h.boundingBox().catch(() => null);
    if (hb) { await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down(); await page.mouse.move(hb.x + hb.width / 2 - 10, hb.y + hb.height / 2 - 20, { steps: 8 }); await page.waitForTimeout(250); await shot(page, run, "07-handle-drag"); await page.mouse.up(); await page.waitForTimeout(600); }
    // catalogue gap: an engine-native tile
    const bt = vis(page, page.getByRole("button", { name: "ease-in-bounce", exact: true }));
    await closeDrawer(page, vp); run.notes.drawerClosedFrame = true; if (vp === "390") await shot(page, run, "08a-drawer-closed-gallery", false);
    if (await bt.count()) { await bt.scrollIntoViewIfNeeded().catch(() => {}); if (vp === "390") { run.notes.tileReach390 = "drawer overlays gallery; tile clicked via element.click()"; await bt.evaluate(e => e.click()); } else await bt.click({ timeout: 8000 }); await page.waitForTimeout(1200); await page.mouse.move(VPS[vp].width - 5, 5);
      
      await shot(page, run, "08-catalogue-gap"); } else run.notes.gap = "no bounce tile";
    // steps tile
    const stp = vis(page, page.getByRole("button", { name: "steps", exact: true }));
    await closeDrawer(page, vp);
    if (await stp.count()) { await stp.scrollIntoViewIfNeeded().catch(() => {}); if (vp === "390") await stp.evaluate(e => e.click()); else await stp.click({ timeout: 8000 }); await page.waitForTimeout(1200); await page.mouse.move(VPS[vp].width - 5, 5);
      
      await shot(page, run, "09-steps-mode"); }
    // duration: keyboard focus
    const th = page.locator(".duration-field [role=slider]").first();
    if (await th.count()) { await th.scrollIntoViewIfNeeded().catch(() => {}); await th.focus(); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(400); await shot(page, run, "10-duration-focus"); }
    else run.notes.duration = "no duration thumb";
    // ribbon: play, then preview hidden
    const play = vis(page, page.locator("button.btn-playback-accent"));
    run.notes.playReach = await play.evaluate(e => { const r = e.getBoundingClientRect(); const h = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { box: [r.x, r.y, r.width, r.height].map(Math.round), vh: innerHeight, hitIsPlay: !!h && e.contains(h) }; });
    if (!run.notes.playReach.hitIsPlay) { run.notes.ribbon = "ribbon Play not hittable (off-viewport, drawer has no scroller) - states 11-13 not reachable"; throw new Error("ribbon unreachable (recorded)"); }
    await play.scrollIntoViewIfNeeded().catch(() => {}); await play.click(); await page.waitForTimeout(700); await shot(page, run, "11-playing");
    await play.click(); await page.waitForTimeout(300);
    const eye = vis(page, page.getByRole("button", { name: "Hide ball preview" }));
    await eye.hover(); await page.waitForTimeout(500); await shot(page, run, "12-eye-hover");
    await eye.click(); await page.waitForTimeout(700); await page.mouse.move(VPS[vp].width - 5, 5); await shot(page, run, "13-preview-hidden");
    await eye.click(); await page.waitForTimeout(300);
    run.errs = errs.slice(0, 8); await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, run.err || "ok", run.frames.length, JSON.stringify(run.notes));
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(JSON.stringify(log.kf), JSON.stringify(log.glass));
