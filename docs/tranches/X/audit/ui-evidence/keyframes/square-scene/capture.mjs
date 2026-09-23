// square-scene audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
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
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const box = document.querySelector(".demo-box"), stage = document.querySelector(".square-stage");
  const badge = document.querySelector(".square-telemetry .status-badge");
  const cs = (e, p) => e ? getComputedStyle(e)[p] : null;
  const panel = document.querySelector("[role=tabpanel][data-state=active]");
  return {
    dark: document.documentElement.classList.contains("dark"), bodyBg: cs(document.body, "backgroundColor"),
    box: r(box), boxTf: cs(box, "transform")?.slice(0, 70), boxRadius: cs(box, "borderTopLeftRadius"), boxFont: box ? cs(box, "fontSize") + " " + cs(box, "fontFamily").split(",")[0] : null, boxBg: cs(box, "backgroundColor"), boxInk: cs(box, "color"), mode: box?.dataset.squareMode,
    stage: r(stage), stageRadius: cs(stage, "borderTopLeftRadius"), stageBg: cs(stage, "backgroundColor"), stageBorder: cs(stage, "borderTopColor") + " " + cs(stage, "borderTopWidth"),
    badge: badge ? { text: badge.textContent.trim(), rect: r(badge), radius: cs(badge, "borderTopLeftRadius"), bg: cs(badge, "backgroundColor"), color: cs(badge, "color") } : null,
    telemetry: r(document.querySelector(".square-telemetry")), legend: r(document.querySelector(".square-legend")),
    legendText: [...document.querySelectorAll(".square-legend span")].map(s => s.textContent.trim()),
    readout: [...document.querySelectorAll(".square-telemetry-axes span")].map(s => s.textContent.trim()).join(" "),
    tether: cs(document.querySelector(".square-tether"), "opacity"),
    sliders: [...document.querySelectorAll(".demo-box [role=slider]")].map(s => s.getAttribute("aria-valuetext")),
    panel: r(panel), panelText: panel?.textContent.trim().replace(/\s+/g, " ").slice(0, 120),
    tabs: [...document.querySelectorAll("button[role=combobox]")].map(e => (e.getAttribute("aria-label") || "sel") + ":" + e.textContent.trim().slice(0, 18)),
    active: document.activeElement?.tagName + " " + (document.activeElement?.className?.toString().slice(0, 40)),
    hscroll: document.documentElement.scrollWidth > innerWidth,
  };
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + " " + m.text().slice(0, 160)); });
  await page.goto(`http://localhost:5173/#/square`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) { const m = await measure(page); const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra }); }
const center = async (page) => { const b = await page.locator(".demo-box").first().boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
const park = (page, vp) => page.mouse.move(3, VPS[vp].height / 2);
const hoverTopDock = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const hoverTransport = async (page) => { const bs = page.getByRole("button", { name: /(Play|Pause) animation/ }); const n = await bs.count(); for (let i = 0; i < n; i++) { const bb = await bs.nth(i).boundingBox(); if (bb && bb.width > 0) { await page.mouse.move(bb.x + bb.width / 2 + 30, bb.y + bb.height / 2); await page.waitForTimeout(900); return true; } } return false; };
const tabOptions = (page) => page.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim()));
const pickTab = async (page, name) => { await hoverTopDock(page); const c = page.getByRole("combobox", { name: "Controls tab" }).first(); if (!(await c.count())) return false; await c.click(); await page.waitForTimeout(600); const o = page.getByRole("option", { name }).first(); if (!(await o.count())) { await page.keyboard.press("Escape"); return false; } await o.click(); await page.waitForTimeout(900); return true; };

for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await park(page, vp); await page.waitForTimeout(300);
    await shot(page, run, "00-idle-box");
    let c = await center(page); await page.mouse.move(c.x, c.y); await page.waitForTimeout(500);
    await shot(page, run, "01-idle-hover-box");
    // 2-axis spring drag
    await page.mouse.down();
    const dx = vp === "1440" ? 14 : 7, dy = vp === "1440" ? -9 : -6;
    for (let k = 1; k <= 12; k++) { await page.mouse.move(c.x + k * dx, c.y + k * dy); await page.waitForTimeout(16); }
    await page.waitForTimeout(60); await shot(page, run, "02a-drag-mid");
    for (let k = 12; k <= 24; k++) { await page.mouse.move(c.x + k * dx, c.y + k * -dy * 0.2); await page.waitForTimeout(16); }
    await shot(page, run, "02b-drag-far-corner");
    await page.mouse.up(); await page.waitForTimeout(90); await shot(page, run, "02c-release-overshoot");
    await page.waitForTimeout(2200); await park(page, vp); await page.waitForTimeout(300);
    await shot(page, run, "03-settled-tumble-hint");
    // double-tap tumble
    c = await center(page); await page.mouse.click(c.x, c.y); await page.waitForTimeout(90); await page.mouse.click(c.x, c.y);
    await page.waitForTimeout(350); await shot(page, run, "04a-tumble-mid"); await page.waitForTimeout(2200); await park(page, vp); await shot(page, run, "04b-tumble-settled");
    await ctx.close();
    // keyboard nudge in a fresh context (tour hint discloses on first KEYBOARD settle)
    const f2 = await fresh(vp, theme); const p2 = f2.page;
    await p2.locator(".demo-box").first().focus(); await p2.waitForTimeout(300);
    await shot(p2, run, "05a-kbd-focus");
    await p2.keyboard.press("ArrowRight"); await p2.waitForTimeout(120); await shot(p2, run, "05b-kbd-nudge-right-mid");
    await p2.keyboard.press("ArrowUp"); await p2.keyboard.press("ArrowUp"); await p2.waitForTimeout(2200); await shot(p2, run, "05c-kbd-nudged-settled-tour-hint");
    await p2.keyboard.press("End"); await p2.waitForTimeout(2200); await shot(p2, run, "05d-kbd-end-far-corner");
    await p2.keyboard.press("c"); await p2.waitForTimeout(700); await shot(p2, run, "05e-kbd-c-envelope-tour-mid");
    await p2.waitForTimeout(3500); await p2.keyboard.press("Home"); await p2.waitForTimeout(2200); await shot(p2, run, "05f-kbd-home");
    // playback tour
    const hv = await hoverTransport(p2); run.notes.transportFound = hv;
    const play = p2.getByRole("button", { name: "Play animation" }).first();
    if (await play.count() && await play.isVisible()) { await play.click(); await p2.waitForTimeout(900); await park(p2, vp); await shot(p2, run, "06a-playback-tour"); await p2.waitForTimeout(1300); await shot(p2, run, "06b-playback-tour-later");
      // drag takeover during playback
      c = await center(p2); await p2.mouse.move(c.x, c.y); await p2.mouse.down(); for (let k = 1; k <= 6; k++) { await p2.mouse.move(c.x - k * 10, c.y + k * 6); await p2.waitForTimeout(16); } await shot(p2, run, "06c-drag-takeover-from-playback"); await p2.mouse.up(); await p2.waitForTimeout(1800); await park(p2, vp); await shot(p2, run, "06d-after-takeover");
    }
    // controls tab options + each panel surface
    await hoverTopDock(p2); const cc = p2.getByRole("combobox", { name: "Controls tab" }).first();
    if (await cc.count()) { await cc.click(); await p2.waitForTimeout(600); run.notes.tabOptions = await tabOptions(p2); await shot(p2, run, "07a-controls-tab-open"); await p2.keyboard.press("Escape"); await p2.waitForTimeout(300);
      for (const [i, t] of (run.notes.tabOptions || []).entries()) { if (await pickTab(p2, t)) { await park(p2, vp); await p2.waitForTimeout(500); await shot(p2, run, `07${"bcdefgh"[i]}-tab-${t.toLowerCase().replace(/\W+/g, "-")}`); } }
      await pickTab(p2, (run.notes.tabOptions || [])[0] || "Controls");
    }
    run.errors = [...errs, ...f2.errs]; await f2.ctx.close();
  } catch (e) { run.fatal = String(e).slice(0, 1500); }
  log.runs.push(run); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
