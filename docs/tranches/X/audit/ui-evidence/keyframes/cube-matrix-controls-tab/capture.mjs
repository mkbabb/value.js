// cube-matrix-controls-tab — READ-ONLY capture; headed Chromium on the real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const GUI = "/Users/mkbabb/Programming/glass-ui";
const rev = (t) => ({ sha: execSync(`git -C ${t} rev-parse --short HEAD`).toString().trim(),
  dirty: execSync(`git -C ${t} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const log = { kf: rev(TREE), glass: rev(GUI), when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); const c = getComputedStyle(el);
    return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, bg: c.backgroundColor, shadow: c.boxShadow.slice(0, 90), font: c.fontSize + " " + c.fontWeight + " " + c.fontFamily.slice(0, 24), color: c.color, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 140) }; };
  const grids = [...document.querySelectorAll(".matrix-grid")]; const grid = grids.find(g => g.getBoundingClientRect().width > 0);
  const cells = grid ? [...grid.children] : [];
  const inputs = grid ? [...grid.querySelectorAll("input")] : [];
  const panel = grid?.closest('[role=tabpanel]');
  const card = grid?.closest(".card, [class*=card]");
  const slider = grid?.parentElement?.querySelector('[role=slider]');
  const ribbonBtns = [...document.querySelectorAll("button")].filter(b => /Reset|Free|Fixed/.test(b.textContent.trim()) && b.textContent.trim().length < 12);
  const transport = document.querySelector('[aria-label="Select animation"]');
  const cube = document.querySelector(".cube");
  const drawer = document.querySelector(".glass-drawer");
  const labels = grid ? [...grid.querySelectorAll(".matrix-axis-label")].slice(0, 2).map(r) : [];
  return { gridCount: grids.length, visibleGrids: grids.filter(g => g.getBoundingClientRect().width > 0).length, cell0: r(cells[0]), input0: r(inputs[0]), inputVals: inputs.map(i => i.value), labels,
    panel: r(panel), panelLabel: panel?.getAttribute("aria-label") || panel?.getAttribute("aria-labelledby"), card: r(card),
    slider: r(slider), sliderAria: slider ? { min: slider.getAttribute("aria-valuemin"), max: slider.getAttribute("aria-valuemax"), now: slider.getAttribute("aria-valuenow"), label: slider.getAttribute("aria-label") } : null,
    sliderTrack: r(slider?.closest('[data-orientation]')), ribbon: ribbonBtns.map(b => ({ ...r(b), text: b.textContent.trim(), pressed: b.getAttribute("aria-pressed") })),
    transport: r(transport), cubeTransform: cube ? getComputedStyle(cube).transform.slice(0, 160) : null,
    drawer: drawer ? { ...r(drawer), snap: drawer.getAttribute("data-glass-drawer-snap") || drawer.getAttribute("data-snap") } : null,
    active: document.activeElement?.tagName + ":" + (document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim().slice(0, 20)),
    stored: (() => { try { return JSON.stringify(JSON.parse(localStorage.getItem("animationGroupsControlOptions") || "null")?.cube?.matrixOptions ?? null); } catch { return "n/a"; } })() };
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/cube`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10); await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
const hoverTop = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000); };
const pickChannel = async (page, vp, name) => {
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 40); await page.waitForTimeout(1200);
  await page.getByLabel("Select animation").first().click(); await page.waitForTimeout(700);
  await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(1300);
};
const reach = async (page, vp) => {
  await pickChannel(page, vp, "Matrix");
  await hoverTop(page); await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800);
  await page.getByRole("option", { name: "Matrix Controls" }).first().click(); await page.waitForTimeout(1400);
};
const expandDrawer = async (page) => {
  const h = page.locator(".glass-drawer-handle").first();
  if (!(await h.count())) return "no-handle";
  const b = await h.boundingBox(); if (!b) return "no-box";
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down();
  for (let i = 1; i <= 12; i++) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2 - i * 40); await page.waitForTimeout(16); }
  await page.mouse.up(); await page.waitForTimeout(1200); return "dragged";
};
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const run = { tag: `${vp}-${theme}`, steps: [] };
  const S = async (page, name, extra) => { const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.steps.push({ frame: p, m: await measure(page), ...(extra || {}) }); };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await reach(page, vp);
    await page.mouse.move(VPS[vp].width - 20, VPS[vp].height / 2); await page.waitForTimeout(600);
    await S(page, "01-rest");
    if (vp === "390") { run.drawer = await expandDrawer(page); await S(page, "02-drawer-expanded"); }
    // cell focus + edit: Tx cell (index 12)
    const cells = page.locator(".matrix-grid >> visible=true").first().locator("input");
    await cells.nth(12).click(); await page.waitForTimeout(700);
    await S(page, "03-cell-Tx-focused");
    await cells.nth(12).fill("80"); await page.keyboard.press("Tab"); await page.waitForTimeout(1200);
    await S(page, "04-cell-Tx-80-committed");
    // slider drag on selected cell (Tx after tab moves focus → selection stays at 12?)
    const thumb = page.locator(".matrix-grid >> visible=true").first().locator("xpath=..").locator("[role=slider]").first();
    if (await thumb.count()) { const tb = await thumb.boundingBox(); if (tb) { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.mouse.down(); await page.mouse.move(tb.x + tb.width / 2 + 60, tb.y + tb.height / 2, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(900); } }
    await S(page, "05-slider-dragged");
    // Fixed/Free toggle — before/after, does anything change?
    const before = await measure(page);
    const tog = page.getByRole("button", { name: /^(Free|Fixed)$/ }).first();
    await tog.hover(); await page.waitForTimeout(500); await S(page, "06-toggle-hover");
    await tog.click(); await page.waitForTimeout(900);
    await S(page, "07-toggle-flipped", { toggleDiff: { vals: JSON.stringify(before.inputVals) === JSON.stringify((await measure(page)).inputVals) ? "grid-unchanged" : "grid-changed" } });
    // edit a cell in the flipped mode — does the lock mode alter the edit?
    await cells.nth(0).click(); await cells.nth(0).fill("1.5"); await page.keyboard.press("Tab"); await page.waitForTimeout(1200);
    await S(page, "08-flipped-edit-Sx-1.5");
    // Reset
    await page.getByRole("button", { name: /Reset/ }).first().click(); await page.waitForTimeout(1300);
    await S(page, "09-after-reset");
    // keyboard focus-visible on the ribbon
    await page.getByRole("button", { name: /Reset/ }).first().focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(500);
    await S(page, "10-ribbon-focus-visible");
    run.errs = errs.slice(0, 8); await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.steps.length);
}
await browser.close(); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 2)); console.log(JSON.stringify(log.kf), JSON.stringify(log.glass));
