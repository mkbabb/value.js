// transport-dock audit capture — READ-ONLY; headed Chromium on the real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2]; // optional "1440-light" etc.
const log = { sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const px = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  const docks = [...document.querySelectorAll(".glass-dock")]; const d = docks[docks.length - 1];
  const out = { theme: document.documentElement.className.slice(0, 60), vw: innerWidth, vh: innerHeight };
  if (d) {
    const c = getComputedStyle(d);
    out.dock = { ...px(d), bottomGap: Math.round(innerHeight - d.getBoundingClientRect().bottom), radius: c.borderTopLeftRadius, cls: d.className.slice(0, 140), pad: c.padding };
    const live = d.querySelector(".dock-layer:not([inert])") || d;
    out.face = live.getAttribute && live.getAttribute("class");
    out.controls = [...d.querySelectorAll("button, [role=combobox], [data-orientation], .dock-separator, .dock-label")].filter(e => !e.closest("[inert]")).map(e => { const s = getComputedStyle(e); return { tag: e.tagName.toLowerCase(), label: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 24), cls: (e.getAttribute("class") || "").slice(0, 90), ...px(e), radius: s.borderTopLeftRadius, bg: s.backgroundColor, bgi: s.backgroundImage.slice(0, 50), color: s.color, font: s.fontFamily.split(",")[0] + " " + s.fontSize + " " + s.fontWeight, outline: s.outlineStyle + " " + s.outlineWidth + " " + s.outlineColor, shadow: s.boxShadow.slice(0, 70) }; });
  }
  const lb = document.querySelector("[role=listbox]");
  if (lb) { const content = lb.closest("[data-reka-popper-content-wrapper] > *") || lb.parentElement; const cc = getComputedStyle(content);
    out.listbox = { ...px(content), radius: cc.borderTopLeftRadius, bg: cc.backgroundColor, clipped: content.getBoundingClientRect().right > innerWidth || content.getBoundingClientRect().left < 0 || content.getBoundingClientRect().top < 0,
      items: [...lb.querySelectorAll("[role=option]")].map(o => { const s = getComputedStyle(o); const lab = o.querySelector("span span:last-child") || o; const dot = o.querySelector(".progress-dot, [class*=status]"); return { t: o.textContent.trim(), ...px(o), radius: s.borderTopLeftRadius, bg: s.backgroundColor, font: getComputedStyle(lab).fontWeight, sel: o.getAttribute("aria-selected"), hl: o.hasAttribute("data-highlighted"), dot: dot ? { cls: dot.className.slice(0, 60), ...px(dot) } : null }; }) }; }
  const tip = document.querySelector("[role=tooltip]")?.parentElement || document.querySelector("[data-reka-popper-content-wrapper] [data-side]");
  if (tip && !lb) { const s = getComputedStyle(tip); out.tooltip = { text: tip.textContent.trim().slice(0, 40), ...px(tip), radius: s.borderTopLeftRadius, bg: s.backgroundColor, font: s.fontFamily.split(",")[0] + " " + s.fontSize }; }
  const a = document.activeElement; out.focus = a ? (a.getAttribute("aria-label") || a.tagName) + (a.matches(":focus-visible") ? " [fv]" : "") : null;
  if (a && a.closest(".glass-dock")) { const s = getComputedStyle(a); out.focusRing = { outline: s.outlineStyle + " " + s.outlineWidth + " " + s.outlineColor, shadow: s.boxShadow.slice(0, 120) }; }
  out.menubarH = getComputedStyle(document.documentElement).getPropertyValue("--menubar-measured-h");
  return out;
});
async function fresh(vp, theme, route) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(10, 300); await page.waitForTimeout(4200);
  return { ctx, page, errs };
}
const dockBox = async (page) => { const l = page.locator(".glass-dock").last(); return l.boundingBox(); };
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
  // close-up crop of the bottom band
  const b = await dockBox(page); if (b) { const vp = page.viewportSize(); const top = Math.max(0, Math.min(b.y - 260, vp.height - 360)); await page.screenshot({ path: OUT + `crop-${p}`, clip: { x: 0, y: top, width: vp.width, height: vp.height - top } }); }
}
const hoverDock = async (page) => { const b = await dockBox(page); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200); };
const liveRect = (page, name) => page.evaluate((n) => { const d = [...document.querySelectorAll(".glass-dock")].pop(); const e = [...d.querySelectorAll(`[aria-label="${n}"]`)].find(x => !x.closest("[inert]") && x.getBoundingClientRect().width > 0); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, name);
const hoverLabel = async (page, name) => { const b = await liveRect(page, name); if (!b) return false; await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1300); return true; };
const playLabel = (page) => page.evaluate(() => { const d = [...document.querySelectorAll(".glass-dock")].pop(); const b = [...d.querySelectorAll("button[aria-label$='animation']")].find(x => !x.closest("[inert]") && /Play|Pause/.test(x.getAttribute("aria-label"))); return b?.getAttribute("aria-label"); });
const clickPlay = async (page) => { const lab = await playLabel(page); const b = await liveRect(page, lab); if (!b) return; await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(900); };
const clickLabel = async (page, name) => { const b = await liveRect(page, name); if (!b) return false; await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900); return true; };
const runs = [];
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) runs.push([vp, theme]);
for (const [vp, theme] of runs) {
  const run = { tag: `${vp}-${theme}`, frames: [], errs: {} };
  if (ONLY && ONLY !== run.tag) continue;
  try {
    // ── multi-channel: cube ──
    let { ctx, page, errs } = await fresh(vp, theme, "cube");
    await shot(page, run, "01-cube-collapsed", { play: await playLabel(page) });
    await hoverDock(page); await shot(page, run, "02-cube-expanded", { play: await playLabel(page) });
    await page.mouse.move(10, 300); await page.waitForTimeout(5200); await shot(page, run, "01b-cube-collapsed-after-leave", { play: await playLabel(page) });
    await hoverDock(page);
    await clickPlay(page); await shot(page, run, "03-cube-expanded-toggled", { play: await playLabel(page) });
    await hoverLabel(page, "Pause animation") || await hoverLabel(page, "Play animation"); await shot(page, run, "04-cube-tooltip-play");
    await hoverLabel(page, "Select animation"); await shot(page, run, "05-cube-tooltip-select");
    await hoverLabel(page, "Reset animation"); await shot(page, run, "06-cube-tooltip-reset");
    await clickLabel(page, "Select animation");
    await shot(page, run, "07-cube-select-open-paused", { play: await playLabel(page) });
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300); await shot(page, run, "08-cube-select-kbd-highlight");
    await page.keyboard.press("Enter"); await page.waitForTimeout(1200); await shot(page, run, "09-cube-after-pick");
    // playing + select open
    await hoverDock(page); await clickPlay(page);
    await clickLabel(page, "Select animation");
    await shot(page, run, "10-cube-select-open-playing", { play: await playLabel(page) });
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    // keyboard focus walk into the transport
    await page.mouse.move(10, 300); await page.waitForTimeout(4200);
    await page.locator("body").click({ position: { x: 5, y: 5 } }).catch(() => {});
    let found = false; for (let i = 0; i < 60 && !found; i++) { await page.keyboard.press("Tab"); found = await page.evaluate(() => { const a = document.activeElement; const ds = [...document.querySelectorAll(".glass-dock")]; return !!a && ds.length > 1 && ds[ds.length - 1].contains(a); }); }
    await page.waitForTimeout(900); await shot(page, run, "11-cube-kbd-focus", { found });
    if (found) { await page.keyboard.press("Tab"); await page.waitForTimeout(500); await shot(page, run, "12-cube-kbd-focus-next"); }
    // timeline expanded → the collapse-timeline chip
    try {
      await page.getByRole("combobox", { name: "Controls tab" }).first().click(); await page.waitForTimeout(700);
      const opt = page.getByRole("option", { name: /timeline/i }).first(); if (await opt.count()) { await opt.click(); await page.waitForTimeout(900); }
      else await page.keyboard.press("Escape");
      const ex = page.getByRole("button", { name: "Expand timeline" }).filter({ visible: true }).first();
      if (await ex.count()) { await ex.click(); await page.waitForTimeout(1500); await hoverDock(page); await shot(page, run, "13-cube-timeline-expanded"); await hoverLabel(page, "Collapse timeline"); await shot(page, run, "14-cube-tooltip-collapse-timeline"); }
      else run.timelineErr = "no Expand timeline button";
    } catch (e) { run.timelineErr = String(e).slice(0, 200); }
    run.errs.cube = errs; await ctx.close();
    // ── amiga, spring: select open ──
    for (const s of ["amiga", "spring"]) {
      ({ ctx, page, errs } = await fresh(vp, theme, s));
      await shot(page, run, `20-${s}-collapsed`, { play: await playLabel(page) });
      await hoverDock(page); await shot(page, run, `21-${s}-expanded`, { play: await playLabel(page) });
      await clickLabel(page, "Select animation");
      await shot(page, run, `22-${s}-select-open`, { play: await playLabel(page) });
      run.errs[s] = errs; await ctx.close();
    }
    // ── single-channel scenes ──
    for (const s of ["square", "easing", "sequence"]) {
      ({ ctx, page, errs } = await fresh(vp, theme, s));
      await shot(page, run, `30-${s}-collapsed`, { play: await playLabel(page) });
      await hoverDock(page); await shot(page, run, `31-${s}-expanded`, { play: await playLabel(page) });
      if (s === "square") { await page.mouse.move(10, 300); await page.waitForTimeout(5200); await shot(page, run, `30b-${s}-collapsed-after-leave`); await hoverDock(page); }
      await clickPlay(page); await shot(page, run, `32-${s}-toggled`, { play: await playLabel(page) });
      run.errs[s] = errs; await ctx.close();
    }
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length, run.timelineErr || "");
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(sha, dirty);
