// share-popover audit capture — READ-ONLY; headed Chromium on the real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const BASE = "http://localhost:5173";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2]; const ONLYT = process.argv[3];
const log = { sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const px = (e) => { const b = e.getBoundingClientRect(), c = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontFamily.split(",")[0] + " " + c.fontSize + " " + c.fontWeight, pad: c.padding, border: c.borderTopWidth + " " + c.borderTopColor, shadow: c.boxShadow.slice(0, 60), backdrop: c.backdropFilter }; };
  const out = { hash: location.hash, theme: document.documentElement.className.slice(0, 40) };
  const ae = document.activeElement; out.focus = ae ? (ae.tagName + ":" + (ae.getAttribute("aria-label") || ae.getAttribute("title") || ae.getAttribute("role") || "")) : null;
  const trig = document.querySelector("[aria-label='Share animation']"); if (trig) out.trigger = { ...px(trig), expanded: trig.getAttribute("aria-expanded"), cls: trig.className.slice(0, 200) };
  const menu = document.querySelector("[role=menu]"); if (menu) out.menu = px(menu);
  const row = document.querySelector("[role=menuitem]"); if (row) out.shareRow = { ...px(row), hl: row.hasAttribute("data-highlighted") };
  const fi = document.querySelector("input[aria-label='Share URL or hash to load']"); const dlg = fi && fi.closest("[role=dialog]"); 
  if (dlg) {
    out.popover = { ...px(dlg), cls: dlg.className.slice(0, 200) };
    const inp = dlg.querySelector("input"); out.input = { ...px(inp), value: inp.value.slice(0, 40), placeholder: inp.placeholder, invalid: inp.getAttribute("aria-invalid"), cls: inp.className.slice(0, 160) };
    out.buttons = [...dlg.querySelectorAll("button")].map(b => ({ title: b.title, disabled: b.disabled, ...px(b) }));
    const r = dlg.getBoundingClientRect(); out.popClipped = r.right > innerWidth || r.left < 0 || r.bottom > innerHeight || r.top < 0;
  }
  out.toasts = [...document.querySelectorAll("[data-sonner-toast]")].map(t => ({ type: t.getAttribute("data-type"), text: t.textContent.trim().replace(/\s+/g, " ").slice(0, 90), ...px(t) }));
  const tl = document.querySelector("[data-sonner-toaster]"); if (tl) out.toaster = { pos: tl.getAttribute("data-y-position") + "/" + tl.getAttribute("data-x-position"), cls: tl.className.slice(0, 80) };
  return out;
});
async function fresh(vp, theme, route = "cube") {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ":" + m.text().slice(0, 200)); });
  await page.goto(`${BASE}/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10);
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) { const m = await measure(page); const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra }); return m; }
async function crop(page, run, name) {
  const d = page.locator("[role=dialog]:has(input[aria-label='Share URL or hash to load'])").first(); const m = page.locator("[role=menu]").first();
  const boxes = [await d.boundingBox().catch(() => null), await m.boundingBox().catch(() => null)].filter(Boolean);
  if (!boxes.length) return;
  const x0 = Math.min(...boxes.map(b => b.x)), y0 = Math.min(...boxes.map(b => b.y)), x1 = Math.max(...boxes.map(b => b.x + b.width)), y1 = Math.max(...boxes.map(b => b.y + b.height));
  const vp = page.viewportSize(); const x = Math.max(0, x0 - 16), y = Math.max(0, y0 - 16);
  const p = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + p, clip: { x, y, width: Math.min(vp.width - x, x1 - x0 + 32), height: Math.min(vp.height - y, y1 - y0 + 32) } }); run.frames.push({ frame: p });
}
const hover = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const openMenu = async (page) => { await hover(page); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800); };
const openShare = async (page) => { await openMenu(page); await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(900); };
const field = (page) => page.getByLabel("Share URL or hash to load").first();
const vps = ONLY ? [ONLY] : ["1440", "390"];
for (const vp of vps) for (const theme of (ONLYT ? [ONLYT] : ["light", "dark"])) {
  const run = { tag: `${vp}-${theme}`, frames: [], errs: {} };
  try {
    let { ctx, page, errs } = await fresh(vp, theme, "cube");
    // 00 menu open, share trigger at rest; hover the trigger
    await openMenu(page); await shot(page, run, "00-menu-open"); await crop(page, run, "00-menu-open");
    const tb = await page.locator("[aria-label='Share animation']").first().boundingBox();
    if (tb) { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.waitForTimeout(500); await crop(page, run, "00b-trigger-hover"); }
    // 01 open popover (empty field, Load disabled, field focused)
    await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(900);
    await shot(page, run, "01-popover-open"); await crop(page, run, "01-popover-open");
    // 01b keyboard tab through the actions
    await page.keyboard.press("Tab"); await page.waitForTimeout(250); await crop(page, run, "01b-tab1");
    await page.keyboard.press("Tab"); await page.waitForTimeout(250); await crop(page, run, "01c-tab2");
    // 02 copy -> copied toast
    await page.locator("[role=dialog] button[title='Copy share link']").first().click(); await page.waitForTimeout(700);
    const clip = await page.evaluate(() => navigator.clipboard.readText().catch(e => "ERR:" + e));
    await shot(page, run, "02-copied-toast", { clipboard: clip.slice(0, 120), clipLen: clip.length });
    await page.screenshot({ path: OUT + `02f-copied-toast-FULLPAGE-${run.tag}.png`, fullPage: true }); run.frames.push({ frame: `02f-copied-toast-FULLPAGE-${run.tag}.png`, docH: await page.evaluate(() => document.documentElement.scrollHeight) });
    await page.waitForTimeout(4500); await shot(page, run, "02b-after-copy-settle");
    await ctx.close(); run.errs.a = errs.slice(0, 8);
    // 03 restore success: land on amiga, paste the cube link
    ({ ctx, page, errs } = await fresh(vp, theme, "amiga"));
    await openShare(page); await field(page).fill(clip); await page.waitForTimeout(300);
    await shot(page, run, "03a-pasted"); await crop(page, run, "03a-pasted");
    await page.keyboard.press("Enter"); await page.waitForTimeout(1500);
    await shot(page, run, "03-restore-success");
    await page.screenshot({ path: OUT + `03f-restore-success-FULLPAGE-${run.tag}.png`, fullPage: true }); run.frames.push({ frame: `03f-restore-success-FULLPAGE-${run.tag}.png` });
    run.frames.push({ afterRestore: await page.evaluate(() => ({ menuOpen: !!document.querySelector("[role=menu]"), bodyPE: getComputedStyle(document.body).pointerEvents, focus: document.activeElement?.className?.slice?.(0, 60) })) });
    await page.keyboard.press("Escape"); await page.waitForTimeout(600); await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    try { await openShare(page); await crop(page, run, "03b-reopen-after-success"); run.frames.push({ fieldAfterSuccess: await field(page).inputValue() }); } catch (e) { run.frames.push({ reopenFail: String(e).slice(0, 120) }); }
    await page.keyboard.press("Escape"); await page.keyboard.press("Escape"); await ctx.close(); run.errs.b = errs.slice(0, 8);
    // 04 error: no state in URL
    ({ ctx, page, errs } = await fresh(vp, theme, "cube"));
    await openShare(page); await field(page).fill(`${BASE}/#/cube`); await page.keyboard.press("Enter"); await page.waitForTimeout(900);
    await shot(page, run, "04-error-no-state"); await crop(page, run, "04-error-no-state");
    // 05 error: invalid state (clicking the load arrow this time)
    await field(page).fill("@@not-base64@@"); await page.locator("[role=dialog] button[title='Load shared state']").first().click(); await page.waitForTimeout(900);
    await shot(page, run, "05-error-invalid"); await crop(page, run, "05-error-invalid"); await page.screenshot({ path: OUT + `05f-error-invalid-FULLPAGE-${run.tag}.png`, fullPage: true });
    // 05b click the toast: popover must stay open (toaster guard)
    const t = page.locator("[data-sonner-toast]").first(); if (await t.count()) { await t.click({ force: true }).catch(() => {}); await page.waitForTimeout(500); await shot(page, run, "05b-toast-clicked"); }
    // 06 probe: valid base64 JSON that is not a state object ("123") -> what does it say?
    if (!(await field(page).count())) { await page.keyboard.press("Escape").catch(() => {}); await openShare(page); }
    await field(page).fill("MTIz"); await page.keyboard.press("Enter"); await page.waitForTimeout(900);
    await shot(page, run, "06-probe-nonstate-json"); await page.screenshot({ path: OUT + `06f-probe-nonstate-json-FULLPAGE-${run.tag}.png`, fullPage: true });
    await ctx.close(); run.errs.c = errs.slice(0, 8);
    // 07 deep link ?state= on load (cube link loaded fresh; expect cube + cleaned URL)
    ({ ctx, page, errs } = await fresh(vp, theme, "amiga"));
    const u = new URL(clip); await page.goto(`${BASE}/${u.hash}`, { waitUntil: "networkidle" }); await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(3500);
    await shot(page, run, "07-deeplink-restore", { requested: u.hash.slice(0, 60) });
    await ctx.close(); run.errs.d = errs.slice(0, 8);
    // 08 deep link with garbage state
    ({ ctx, page, errs } = await fresh(vp, theme, "cube"));
    await page.goto(`${BASE}/#/amiga?state=%40%40garbage`, { waitUntil: "networkidle" }); await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(3500);
    await shot(page, run, "08-deeplink-garbage");
    await ctx.close(); run.errs.e = errs.slice(0, 8);
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length);
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}${ONLYT ? "-" + ONLYT : ""}.json`, JSON.stringify(log, null, 2)); console.log(sha, dirty);
