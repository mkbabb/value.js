// keyframes-tab-css-editor — READ-ONLY capture; headed Chromium on the real GPU.
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
  const st = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, border: c.borderTopWidth + " " + c.borderTopColor, color: c.color, font: c.fontSize + "/" + c.fontWeight + " " + c.fontFamily.split(",")[0], shadow: c.boxShadow.slice(0, 80), cls: (e.className?.baseVal ?? e.className ?? "").toString().slice(0, 140) }; };
  const out = { hash: location.hash, dark: document.documentElement.classList.contains("dark") };
  const pane = [...document.querySelectorAll(".controls-pane")].find(vis); out.pane = st(pane);
  const mp = [...document.querySelectorAll(".monaco-pane")].find(vis); out.monacoPane = st(mp);
  const ed = [...document.querySelectorAll(".monaco-editor")].find(vis);
  out.editor = st(ed); out.editorCard = ed ? st(ed.parentElement?.parentElement) : null;
  out.editorAria = ed ? ed.querySelector("textarea")?.getAttribute("aria-label") : null;
  out.monacoFont = ed ? getComputedStyle(ed.querySelector(".view-lines") || ed).fontFamily.split(",")[0] + " " + getComputedStyle(ed.querySelector(".view-lines") || ed).fontSize : null;
  out.monacoBg = ed ? getComputedStyle(ed.querySelector(".monaco-editor-background") || ed).backgroundColor : null;
  out.lines = ed ? ed.querySelectorAll(".view-line").length : 0;
  out.firstLines = ed ? [...ed.querySelectorAll(".view-line")].slice(0, 4).map(l => l.textContent.slice(0, 60)) : null;
  const trig = document.querySelector('[aria-label="Controls tab"]'); out.tabTrigger = trig ? { t: trig.textContent.trim(), ...st(trig) } : null;
  const ribbon = document.querySelector("#controls-ribbon-target")?.closest("[class*=card], .glass-card, div"); 
  const rb = [...document.querySelectorAll("button")].filter(vis).filter(b => /^(Copy|Format|Export CSS|Apply CSS)$/.test(b.textContent.trim()));
  out.ribbonButtons = rb.map(b => ({ t: b.textContent.trim(), ...st(b) }));
  if (rb[0]) { let c = rb[0].parentElement; for (let i = 0; i < 4 && c; i++) { if (getComputedStyle(c).borderTopLeftRadius !== "0px") break; c = c.parentElement; } out.ribbonCard = st(c); }
  out.skeleton = !!document.querySelector(".monaco-pane [aria-busy=true]");
  out.toasts = [...document.querySelectorAll("[data-sonner-toast]")].map(t => ({ t: t.textContent.trim().slice(0, 140), type: t.getAttribute("data-type"), ...st(t) }));
  const ae = document.activeElement; out.focus = ae ? (ae.getAttribute("aria-label") || ae.tagName) + ":" + (ae.textContent || "").trim().slice(0, 20) + " fv=" + ae.matches(":focus-visible") + " outline=" + getComputedStyle(ae).outlineStyle + " " + getComputedStyle(ae).outlineColor + "/" + getComputedStyle(ae).boxShadow.slice(0, 60) : null;
  const ov = pane ? [pane.scrollWidth, pane.clientWidth] : null; out.paneOverflowX = ov;
  out.docOverflowX = [document.documentElement.scrollWidth, innerWidth];
  const sc = [...document.querySelectorAll(".monaco-pane")].find(vis)?.closest("[class*=overflow-y], [class*=scroll]"); out.scroller = sc ? [sc.scrollHeight, sc.clientHeight, sc.className.slice(0,80)] : null;
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
const toKeyframes = async (page, run) => {
  await hoverDock(page);
  const trig = page.locator('[aria-label="Controls tab"]').first();
  if (!(await trig.count())) { run.notes.noTab = true; return false; }
  await trig.click(); await page.waitForTimeout(800);
  run.notes.options = (await page.getByRole("option").allTextContents()).map(s => s.trim().slice(0, 30));
  const opt = page.getByRole("option", { name: /^Keyframes/ }).first();
  if (!(await opt.count())) { run.notes.noKeyframesOption = true; await page.keyboard.press("Escape"); return false; }
  await opt.click(); await page.waitForTimeout(2500);
  return true;
};
async function shot(page, run, name, crop = true) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); const fr = { frame: p, kf: rev(TREE), ...m };
  if (crop) { const el = page.locator(".controls-pane").filter({ visible: true }).first(); const bb = await el.boundingBox().catch(() => null);
    if (bb) { const vp = page.viewportSize(); const x = Math.max(0, bb.x - 12), y = Math.max(0, bb.y - 12); const cp = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + cp, clip: { x, y, width: Math.min(vp.width - x, bb.width + 24), height: Math.min(vp.height - y, bb.height + 24) } }); fr.crop = cp; } }
  run.frames.push(fr);
}
const rbtn = (page, name) => page.getByRole("button", { name, exact: true }).filter({ visible: true }).first();
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  const run = { tag, frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    if (!(await toKeyframes(page, run))) throw new Error("no Keyframes tab");
    if (vp === "390") { await page.mouse.move(5, 300); await page.waitForTimeout(500); await shot(page, run, "00-drawer-peek"); await openDrawer(page, vp);
      const eb0 = await page.locator(".monaco-pane .monaco-editor").filter({ visible: true }).first().boundingBox().catch(() => null); run.notes.editorTopAfterOpen = eb0 && Math.round(eb0.y);
      if (!eb0 || eb0.y > 500) { const h = page.locator(".glass-drawer-handle").first(); const hb = await h.boundingBox().catch(() => null);
        if (hb) { await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down(); await page.mouse.move(hb.x + hb.width / 2, 80, { steps: 12 }); await page.mouse.up(); await page.waitForTimeout(1400); run.notes.dragged = true; } } }
    await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(600);
    await shot(page, run, "01-keyframes-rest");
    // scroll to ribbon (desktop pane may scroll)
    const copy = rbtn(page, "Copy"); await copy.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(400); await shot(page, run, "02-ribbon-in-view");
    for (const n of ["Copy", "Format", "Export CSS", "Apply CSS"]) { const b = rbtn(page, n); if (await b.count()) { await b.hover(); await page.waitForTimeout(350); if (n === "Format") await shot(page, run, "03-hover-format"); } }
    // keyboard focus ring on a ribbon button
    await copy.focus().catch(() => {}); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
    await shot(page, run, "04-focus-copy");
    await copy.click(); await page.waitForTimeout(700); await shot(page, run, "05-copy-toast");
    run.notes.clip = await page.evaluate(() => navigator.clipboard.readText().then(t => t.slice(0, 120)).catch(e => "ERR " + e));
    await page.waitForTimeout(3500);
    await rbtn(page, "Format").click(); await page.waitForTimeout(1500); await shot(page, run, "06-format-toast");
    await page.waitForTimeout(3500);
    await rbtn(page, "Export CSS").click(); await page.waitForTimeout(1500); await shot(page, run, "07-export-toast");
    run.notes.exportClip = await page.evaluate(() => navigator.clipboard.readText().then(t => t.slice(0, 160)).catch(e => "ERR " + e));
    await page.waitForTimeout(3500);
    await rbtn(page, "Apply CSS").click(); await page.waitForTimeout(1500); await shot(page, run, "08-apply-active");
    run.notes.applyPressed = await rbtn(page, "Apply CSS").getAttribute("aria-pressed");
    await rbtn(page, "Apply CSS").click(); await page.waitForTimeout(800);
    // editor focus + parse error
    const ed = page.locator(".monaco-pane .monaco-editor .view-lines").filter({ visible: true }).first();
    const eb = await ed.boundingBox().catch(() => null);
    if (eb) {
      await page.mouse.click(eb.x + eb.width - 10, eb.y + 12); await page.waitForTimeout(400);
      await shot(page, run, "09-editor-focused");
      await page.keyboard.press("Meta+ArrowDown"); await page.keyboard.press("End");
      await page.keyboard.type("\n}}} @@ nope {", { delay: 20 }); await page.waitForTimeout(250);
      await shot(page, run, "10-parse-error-shake", false);
      await page.waitForTimeout(1200); await shot(page, run, "11-parse-error-toast");
      await page.keyboard.press("Meta+z"); await page.keyboard.press("Meta+z"); await page.keyboard.press("Meta+z");
      await page.waitForTimeout(1500); await shot(page, run, "12-after-undo-parsed");
      // mid-edit format rejection
      await page.keyboard.press("Meta+ArrowDown"); await page.keyboard.type("\n.x {", { delay: 20 }); await page.waitForTimeout(300);
      await page.keyboard.press("Shift+Alt+KeyF"); await page.waitForTimeout(1500); await shot(page, run, "13-format-reject");
    } else run.notes.noEditor = true;
    run.errs = errs.slice(0, 10); await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, run.err || "ok", run.frames.length, JSON.stringify(run.notes).slice(0, 600));
}
// cohesion sweep: which scenes expose a Keyframes tab (1440 light only)
if (!ONLY) { const run = { tag: "scenes-1440-light", frames: [], notes: {} };
  for (const sc of ["amiga", "square", "easing", "spring"]) { try { const { ctx, page } = await fresh("1440", "light", sc); const sub = { frames: [], notes: {}, tag: `${sc}-1440-light` };
    const ok = await toKeyframes(page, sub); await page.mouse.move(1435, 5); await page.waitForTimeout(600); await shot(page, sub, `20-${sc}-keyframes`); run.notes[sc] = { ok, ...sub.notes }; run.frames.push(...sub.frames); await ctx.close(); } catch (e) { run.notes[sc] = String(e).slice(0, 200); } }
  log.runs.push(run); console.log("scenes", JSON.stringify(run.notes).slice(0, 900)); }
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(JSON.stringify(log.kf), JSON.stringify(log.glass));
