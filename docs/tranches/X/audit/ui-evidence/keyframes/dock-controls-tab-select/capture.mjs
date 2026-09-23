// dock-controls-tab-select audit capture — READ-ONLY; headed Chromium on the real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2]; // optional vp filter
const log = { sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const px = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  const out = { theme: document.documentElement.className, hash: location.hash };
  const trig = document.querySelector('[aria-label="Controls tab"]');
  if (trig) { const c = getComputedStyle(trig); out.trigger = { ...px(trig), radius: c.borderTopLeftRadius, font: c.fontFamily.split(",")[0] + " " + c.fontSize + " " + c.fontWeight, color: c.color, bg: c.backgroundColor, expanded: trig.getAttribute("aria-expanded"), text: trig.textContent.trim(), cls: trig.className.slice(0, 160) }; }
  else out.trigger = null;
  const lb = document.querySelector("[role=listbox]");
  if (lb) {
    const content = lb.closest("[data-reka-popper-content-wrapper] > *") || lb.parentElement;
    const cc = getComputedStyle(content);
    out.listbox = { ...px(content), radius: cc.borderTopLeftRadius, bg: cc.backgroundColor, pad: cc.padding, label: lb.getAttribute("aria-labelledby"),
      items: [...lb.querySelectorAll("[role=option]")].map(o => { const c = getComputedStyle(o); const labs = [...o.querySelectorAll("span")].filter(s => s.children.length === 0 && s.textContent.trim()); const lab = labs.at(-1) || o; const lc = getComputedStyle(lab); const ind = o.querySelector(':scope > [aria-hidden="true"] span');
        return { t: o.textContent.trim(), ...px(o), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, weight: lc.fontWeight, size: lc.fontSize, padL: c.paddingLeft, state: o.getAttribute("data-state"), hl: o.hasAttribute("data-highlighted"), sel: o.getAttribute("aria-selected"), indicatorPainted: !!(ind && ind.getBoundingClientRect().width > 0), indicatorBg: ind ? getComputedStyle(ind).backgroundColor : null }; }) };
    const t = trig && trig.getBoundingClientRect(), b = content.getBoundingClientRect();
    if (t) out.offset = { dy: Math.round(b.y - t.bottom), dx: Math.round(b.x - t.x), triggerW: Math.round(t.width), contentW: Math.round(b.width) };
    out.clipped = b.right > innerWidth || b.left < 0 || b.bottom > innerHeight || b.top < 0;
  }
  const d = document.querySelector(".glass-dock"); if (d) { const r = d.getBoundingClientRect(); out.dock = { ...px(d), radius: getComputedStyle(d).borderTopLeftRadius, overflowCtrls: [...d.querySelectorAll("button,[role=combobox]")].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > r.right + 1 || b.left < r.left - 1); }).map(e => e.getAttribute("aria-label")) }; }
  // what the panel shows (tab switch effect)
  const heads = [...document.querySelectorAll("[role=tab][aria-selected=true], [data-surface], h2, h3")].filter(e => e.getBoundingClientRect().width > 0).map(e => (e.getAttribute("data-surface") || "") + ":" + e.textContent.trim().replace(/\s+/g, " ").slice(0, 30)).slice(0, 8);
  out.panelHeads = heads;
  const sa = document.querySelector('[aria-label="Select animation"]'); out.channel = sa ? sa.textContent.trim() : null;
  out.focus = document.activeElement ? (document.activeElement.getAttribute("aria-label") || document.activeElement.getAttribute("role") || document.activeElement.tagName) + ":" + (document.activeElement.textContent || "").trim().slice(0, 24) : null;
  return out;
});
async function fresh(vp, theme, route) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10);
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
}
const hover = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const openTab = async (page) => { await hover(page); await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800); };
const vps = ONLY ? [ONLY] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const run = { tag: `${vp}-${theme}`, frames: [], errs: {} };
  try {
    for (const sc of ["cube", "amiga", "square", "easing", "spring"]) {
      const { ctx, page, errs } = await fresh(vp, theme, sc);
      await hover(page); await shot(page, run, `01-${sc}-expanded`);
      await openTab(page); await shot(page, run, `02-${sc}-open-current`);
      if (sc === "cube") {
        // hover a non-current row
        const opt = page.getByRole("option", { name: "Timeline" }).first(); const ob = await opt.boundingBox();
        if (ob) { await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2); await page.waitForTimeout(400); await shot(page, run, `03-${sc}-row-hover`); }
        // keyboard
        await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300); await shot(page, run, `04-${sc}-kbd-arrow`);
      }
      // pick the LAST tab (scene facet for easing/spring; Timeline otherwise) and reopen: bold moves?
      const opts = page.getByRole("option"); const n = await opts.count();
      const last = opts.nth(n - 1); const lastName = (await last.textContent()).trim();
      await last.click(); await page.waitForTimeout(1300);
      await hover(page); await shot(page, run, `05-${sc}-after-pick-${lastName.replace(/\s+/g, "")}`);
      await openTab(page); await shot(page, run, `06-${sc}-reopen-current-${lastName.replace(/\s+/g, "")}`);
      await page.keyboard.press("Escape"); await page.waitForTimeout(400);
      if (sc === "cube") {
        // Matrix channel selected: + Matrix Controls
        const sel = page.getByLabel("Select animation").first();
        if (await sel.isVisible().catch(() => false)) {
          await sel.click(); await page.waitForTimeout(600);
          const m = page.getByRole("option", { name: "Matrix" }).first();
          if (await m.count()) { await m.click(); await page.waitForTimeout(1200); }
          else { await page.keyboard.press("Escape"); run.errs.noMatrix = true; }
          await openTab(page); await shot(page, run, `07-cube-matrix-open`);
          const mc = page.getByRole("option", { name: "Matrix Controls" }).first();
          if (await mc.count()) { await mc.click(); await page.waitForTimeout(1300); await hover(page); await shot(page, run, `08-cube-matrix-after-pick-MatrixControls`); await openTab(page); await shot(page, run, `09-cube-matrix-reopen`); await page.keyboard.press("Escape"); await page.waitForTimeout(300); }
          // switch channel back while Matrix Controls selected — what does the tab fall back to?
          await sel.click().catch(() => {}); await page.waitForTimeout(600);
          const r = page.getByRole("option", { name: /Rotation/ }).first();
          if (await r.count()) { await r.click(); await page.waitForTimeout(1300); await hover(page); await shot(page, run, `10-cube-back-to-rotations`); }
        } else run.errs.noChannelSelect = true;
      }
      run.errs[sc] = errs.slice(0, 5); await ctx.close();
    }
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length);
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(sha, dirty);
