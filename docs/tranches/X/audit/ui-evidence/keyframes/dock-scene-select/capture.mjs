// dock-scene-select audit capture — READ-ONLY; headed Chromium on the real GPU.
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
  const px = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  const trig = document.querySelector('[aria-label="Scene"][role=combobox]');
  const lb = document.querySelector("[role=listbox]");
  const out = { theme: document.documentElement.className, vw: innerWidth };
  if (trig) { const c = getComputedStyle(trig); out.trigger = { ...px(trig), radius: c.borderTopLeftRadius, font: c.fontFamily.split(",")[0] + " " + c.fontSize + " " + c.fontWeight, color: c.color, bg: c.backgroundColor, expanded: trig.getAttribute("aria-expanded"), text: trig.textContent.trim() }; }
  if (lb) {
    const content = lb.closest("[data-reka-popper-content-wrapper] > *") || lb.parentElement;
    const cc = getComputedStyle(content), lc = getComputedStyle(lb);
    out.listbox = { ...px(lb), radius: lc.borderTopLeftRadius, contentCls: content.className.slice(0, 220), content: { ...px(content), radius: cc.borderTopLeftRadius, bg: cc.backgroundColor, backdrop: cc.backdropFilter, shadow: cc.boxShadow.slice(0, 80), pad: cc.padding, overflowY: cc.overflowY },
      items: [...lb.querySelectorAll("[role=option]")].map(o => { const c = getComputedStyle(o); const g = o.querySelector("svg"); const lab = o.querySelector("span span:last-child") || o; const lc2 = getComputedStyle(lab);
        return { t: o.textContent.trim(), ...px(o), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: lc2.fontFamily.split(",")[0] + " " + lc2.fontSize + " " + lc2.fontWeight, pad: c.paddingLeft + "/" + c.paddingRight, state: o.getAttribute("data-state"), hl: o.hasAttribute("data-highlighted"), sel: o.getAttribute("aria-selected"), glyph: g ? { ...px(g), color: getComputedStyle(g).color, raster: !!g.querySelector("image") } : null, indicator: !!o.querySelector("[aria-hidden] span span, [aria-hidden] > span") }; }) };
    const t = trig && trig.getBoundingClientRect(), b = content.getBoundingClientRect();
    if (t) out.offsetFromTrigger = { dy: Math.round(b.y - t.bottom), dxLeft: Math.round(b.x - t.x), triggerW: Math.round(t.width), contentW: Math.round(b.width) };
    out.clippedViewport = b.right > innerWidth || b.left < 0 || b.bottom > innerHeight;
  }
  const d = document.querySelector(".glass-dock"); if (d) out.dock = { ...px(d), radius: getComputedStyle(d).borderTopLeftRadius, cls: d.className.slice(0, 120) };
  out.focus = document.activeElement ? (document.activeElement.getAttribute("aria-label") || document.activeElement.getAttribute("role") || document.activeElement.tagName) + ":" + (document.activeElement.textContent || "").trim().slice(0, 20) : null;
  out.hash = location.hash;
  return out;
});
async function fresh(vp, theme, route) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = []; const reqs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  page.on("request", (r) => { const u = r.url(); if (/Scene\.vue|scenes\//.test(u)) reqs.push({ t: Date.now(), u: u.replace(/^https?:\/\/[^/]+/, "").slice(0, 120) }); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10);
  await page.waitForTimeout(3500);
  return { ctx, page, errs, reqs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
}
const hover = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const openSel = async (page) => { await hover(page); await page.getByRole("combobox", { name: "Scene" }).first().click(); await page.waitForTimeout(800); };
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const run = { tag: `${vp}-${theme}`, frames: [] };
  try {
    // 1: open listbox from HOME (Home current)
    let { ctx, page, errs, reqs } = await fresh(vp, theme, "");
    await openSel(page); await shot(page, run, "01-open-home-current");
    // 2: hover warm-prefetch — hover each non-home row, record network
    const before = reqs.length; const warm = [];
    for (const name of ["Amiga", "Square", "Easing", "Spring", "Sequence"]) {
      const opt = page.getByRole("option", { name }).first(); const b = await opt.boundingBox();
      if (!b) { warm.push({ name, box: null }); continue; }
      const n0 = reqs.length; await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(450);
      warm.push({ name, newReqs: reqs.slice(n0).map(r => r.u) });
      if (name === "Easing") await shot(page, run, "02-hover-easing-warm");
    }
    run.warm = { before, warm };
    // 3: keyboard nav — ArrowDown highlights (does it warm?)
    const n1 = reqs.length; await page.keyboard.press("ArrowUp"); await page.waitForTimeout(300); await page.keyboard.press("ArrowUp"); await page.waitForTimeout(300);
    await shot(page, run, "03-keyboard-highlight", { kbdReqs: reqs.slice(n1).map(r => r.u) });
    // 4: select Cube via click — does navigation occur?
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    await openSel(page); await page.getByRole("option", { name: "Cube" }).first().click(); await page.waitForTimeout(2500);
    await shot(page, run, "04-after-pick-cube");
    run.homeErrs = errs; await ctx.close();
    // 5: open listbox on a scene route (current item selected = Spring)
    ({ ctx, page, errs, reqs } = await fresh(vp, theme, "spring"));
    await openSel(page); await shot(page, run, "05-open-spring-current");
    // hover-state on trigger itself (closed)
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    const tb = await page.getByRole("combobox", { name: "Scene" }).first().boundingBox();
    if (tb) { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.waitForTimeout(400); await shot(page, run, "06-trigger-hover-spring"); }
    // keyboard: focus trigger via Tab from body, open with Enter
    await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10); await page.waitForTimeout(3600);
    await page.keyboard.press("Tab"); await page.waitForTimeout(900); await shot(page, run, "07-kbd-focus-trigger");
    await page.keyboard.press("Enter"); await page.waitForTimeout(800); await shot(page, run, "08-kbd-open");
    run.springErrs = errs; await ctx.close();
    // 9: open on amiga (raster glyph), close-up
    ({ ctx, page, errs, reqs } = await fresh(vp, theme, "amiga"));
    await openSel(page);
    const lb = page.locator("[role=listbox]").first(); const lbb = await lb.boundingBox();
    if (lbb) { const pad = 24; await page.screenshot({ path: OUT + `09-closeup-amiga-${run.tag}.png`, clip: { x: Math.max(0, lbb.x - pad), y: Math.max(0, lbb.y - 80), width: Math.min(VPS[vp].width - Math.max(0, lbb.x - pad), lbb.width + 2 * pad), height: lbb.height + 110 } }); run.frames.push({ frame: `09-closeup-amiga-${run.tag}.png`, ...(await measure(page)) }); }
    run.amigaErrs = errs; await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length);
}
await browser.close(); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 2)); console.log(sha, dirty);
