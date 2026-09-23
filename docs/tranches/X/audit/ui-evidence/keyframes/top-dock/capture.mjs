// top-dock audit capture — READ-ONLY; headed Chromium on the real GPU. Fresh context per scene.
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
  const d = document.querySelector(".glass-dock"); if (!d) return { dock: null };
  const cs = getComputedStyle(d), r = d.getBoundingClientRect();
  const full = d.querySelector(".dock-layer--full") || d;
  const kids = [...full.children].filter(e => e.getBoundingClientRect().width > 0);
  const rows = new Set(kids.map(e => Math.round(e.getBoundingClientRect().top)));
  const ctrls = [...d.querySelectorAll("button,[role=combobox]")].filter(e => e.getBoundingClientRect().width > 0).map(e => {
    const b = e.getBoundingClientRect(), c = getComputedStyle(e);
    return { name: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20), text: e.textContent.trim().slice(0, 24), x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, font: c.fontFamily.split(",")[0] + " " + c.fontSize + " " + c.fontWeight, bg: c.backgroundColor, pressed: e.getAttribute("aria-pressed"), overflowsDock: b.right > r.right + 1 || b.left < r.left - 1 || b.bottom > r.bottom + 1 };
  });
  const seps = [...d.querySelectorAll(".dock-separator")].map(s => getComputedStyle(s).display);
  return { dock: { cls: d.className, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderTopLeftRadius, bg: cs.backgroundColor }, rows: rows.size, seps, ctrls,
    popup: [...document.querySelectorAll("[role=listbox],[role=menu]")].map(p => { const b = p.getBoundingClientRect(), c = getComputedStyle(p); return { role: p.getAttribute("role"), x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, items: [...p.querySelectorAll("[role=option],[role=menuitem]")].map(o => o.textContent.trim().replace(/\s+/g, " ").slice(0, 40)) }; }),
    focus: document.activeElement ? (document.activeElement.getAttribute("aria-label") || document.activeElement.tagName) : null,
    theme: document.documentElement.className };
});
async function fresh(vp, theme, route, touch = false) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, hasTouch: touch, isMobile: touch });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10);
  await page.waitForTimeout(4000);
  return { ctx, page, errs };
}
async function shot(page, run, name) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m });
}
const hover = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const run = { tag: `${vp}-${theme}`, frames: [] };
  try {
    // HOME
    let { ctx, page, errs } = await fresh(vp, theme, "");
    await shot(page, run, "01-collapsed-home");
    await hover(page); await shot(page, run, "02-expanded-home");
    await page.getByRole("combobox", { name: "Scene" }).first().click(); await page.waitForTimeout(700);
    await shot(page, run, "03-scene-select-open-home");
    await page.keyboard.press("Escape"); await page.waitForTimeout(300);
    run.homeErrs = errs; await ctx.close();
    // CUBE (scene active, controls tab + panel toggle)
    ({ ctx, page, errs } = await fresh(vp, theme, "cube"));
    await shot(page, run, "04-collapsed-cube");
    await hover(page); await shot(page, run, "05-expanded-cube");
    const tab = page.getByRole("combobox", { name: "Controls tab" }).first();
    if (await tab.count()) { await tab.click(); await page.waitForTimeout(700); await shot(page, run, "06-controls-tab-open-cube"); await page.keyboard.press("Escape"); await page.waitForTimeout(400); }
    await hover(page);
    const tog = page.getByRole("button", { name: "Controls panel" }).first();
    if (await tog.count()) { await tog.click(); await page.waitForTimeout(1200); await hover(page); await shot(page, run, "07-panel-closed-cube"); await tog.click(); await page.waitForTimeout(900); }
    await hover(page);
    const mb = page.getByRole("button", { name: "@mbabb menu" }).first();
    if (await mb.count()) { await mb.click(); await page.waitForTimeout(700); await shot(page, run, "08-mbabb-menu-open-cube"); await page.keyboard.press("Escape"); await page.waitForTimeout(300); }
    // hover state on a control
    await hover(page); const t2 = page.getByRole("combobox", { name: "Scene" }).first(); const tb = await t2.boundingBox(); if (tb) { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.waitForTimeout(400); await shot(page, run, "09-hover-scene-trigger-cube"); }
    run.cubeErrs = errs; await ctx.close();
    // keyboard focus on collapsed face
    ({ ctx, page, errs } = await fresh(vp, theme, "amiga"));
    await page.keyboard.press("Tab"); await page.waitForTimeout(900); await shot(page, run, "10-kbd-tab1-amiga");
    await page.keyboard.press("Tab"); await page.waitForTimeout(600); await shot(page, run, "11-kbd-tab2-amiga");
    await ctx.close();
    // other scenes expanded (cohesion across scenes)
    for (const sc of ["easing", "sequence"]) {
      ({ ctx, page, errs } = await fresh(vp, theme, sc));
      await hover(page); await shot(page, run, `12-expanded-${sc}`); await ctx.close();
    }
    // idle re-collapse after hover leaves
    ({ ctx, page, errs } = await fresh(vp, theme, "spring"));
    await hover(page); await shot(page, run, "13-expanded-spring");
    await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10); await page.waitForTimeout(3600); await shot(page, run, "14-recollapsed-spring");
    await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length);
}
// 390 touch: tap to expand
for (const theme of ["light"]) {
  const run = { tag: `390touch-${theme}`, frames: [] };
  try {
    const { ctx, page, errs } = await fresh("390", theme, "cube", true);
    await shot(page, run, "15-touch-collapsed-cube");
    const b = await page.locator(".glass-dock").first().boundingBox(); await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200);
    await shot(page, run, "16-touch-tap-expanded-cube"); run.errs = errs; await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok");
}
await browser.close(); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 2)); console.log(sha, dirty);
