// mbabb-menu audit capture — READ-ONLY; headed Chromium on the real GPU.
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
  const menu = document.querySelector("[role=menu]");
  const px = (e) => { const b = e.getBoundingClientRect(), c = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontFamily.split(",")[0] + " " + c.fontSize + " " + c.fontWeight, cursor: c.cursor, pad: c.padding }; };
  const out = { theme: document.documentElement.className, focus: document.activeElement ? (document.activeElement.getAttribute("role") + ":" + (document.activeElement.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)) : null };
  if (menu) {
    out.menu = { ...px(menu), cls: menu.className, shadow: getComputedStyle(menu).boxShadow.slice(0, 80), backdrop: getComputedStyle(menu).backdropFilter };
    out.items = [...menu.children].map(e => ({ role: e.getAttribute("role"), checked: e.getAttribute("aria-checked"), hl: e.hasAttribute("data-highlighted"), text: e.textContent.trim().replace(/\s+/g, " ").slice(0, 60), ...px(e), kids: [...e.querySelectorAll("button,a,span.text-small,p,img,[data-slot],.ppmycota-logo-sm")].slice(0, 8).map(k => ({ tag: k.tagName, cls: (k.className?.baseVal ?? k.className).slice(0, 60), ...px(k) })) }));
  }
  const dlg = document.querySelector("[role=dialog],[role=alertdialog]");
  if (dlg) out.dialog = { ...px(dlg), text: dlg.textContent.trim().replace(/\s+/g, " ").slice(0, 200), buttons: [...dlg.querySelectorAll("button")].map(b => ({ t: b.textContent.trim(), ...px(b) })) };
  const img = document.querySelector("[role=menu] img"); out.avatarLoaded = img ? img.complete && img.naturalWidth > 0 : "no-img";
  const trig = document.querySelector("[aria-label='@mbabb menu']"); if (trig) out.trigger = { ...px(trig), expanded: trig.getAttribute("aria-expanded") };
  return out;
});
async function fresh(vp, theme, route = "cube") {
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
async function shot(page, run, name) { const m = await measure(page); const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m }); }
async function clip(page, run, name) { const m = await page.locator("[role=menu]").first().boundingBox(); if (!m) return; const p = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + p, clip: { x: Math.max(0, m.x - 12), y: Math.max(0, m.y - 60), width: m.width + 24, height: m.height + 72 } }); run.frames.push({ frame: p }); }
const hover = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const openMenu = async (page) => { await hover(page); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800); };
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const run = { tag: `${vp}-${theme}`, frames: [] };
  try {
    let { ctx, page, errs } = await fresh(vp, theme);
    await openMenu(page);
    await shot(page, run, "01-open"); await clip(page, run, "01-open");
    // hover each row
    const rows = page.locator("[role=menu] > [role=menuitem], [role=menu] > [role=menuitemcheckbox]");
    const n = await rows.count();
    for (let i = 0; i < n; i++) { const b = await rows.nth(i).boundingBox(); await page.mouse.move(b.x + b.width * 0.7, b.y + b.height / 2); await page.waitForTimeout(250); if (i === 0 || i === 3 || i === 4) await clip(page, run, `02-hover-row${i}`); }
    // label hover
    const lab = page.locator("[role=menu] [role=group], [role=menu] > div").last(); const lb = await lab.boundingBox(); if (lb) { await page.mouse.move(lb.x + lb.width * 0.6, lb.y + lb.height / 2); await page.waitForTimeout(250); await clip(page, run, "02-hover-label"); }
    // keyboard focus via arrows
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(200); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250); await clip(page, run, "03-kbd-arrow"); run.frames.push({ kbd: await measure(page) });
    // ppmycota toggle
    const pp = page.getByRole("menuitemcheckbox").first();
    const before = await pp.getAttribute("aria-checked");
    await pp.click(); await page.waitForTimeout(600); await clip(page, run, `04-pp-${await pp.getAttribute("aria-checked")}`);
    run.frames.push({ ppBefore: before, ppAfter: await pp.getAttribute("aria-checked") });
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    await shot(page, run, "05-closed-after-pp");
    await openMenu(page); await clip(page, run, "06-reopen");
    const pp2 = page.getByRole("menuitemcheckbox").first(); await pp2.click(); await page.waitForTimeout(600); await clip(page, run, `06-pp-${await pp2.getAttribute("aria-checked")}`);
    // shortcuts dialog
    await page.getByRole("menuitem", { name: /Keyboard shortcuts/ }).click(); await page.waitForTimeout(900); await shot(page, run, "07-shortcuts-dialog");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    // clear-all dialog
    await openMenu(page); await page.getByRole("menuitem", { name: /Clear all/ }).click(); await page.waitForTimeout(900); await shot(page, run, "08-clear-dialog");
    await page.keyboard.press("Escape"); await page.waitForTimeout(600); await shot(page, run, "09-after-escape");
    // theme toggle from the menu
    await openMenu(page); const t = page.locator("[role=menu] button").nth(1); const tb = await t.boundingBox(); run.frames.push({ themeBtn: tb });
    await page.getByRole("menuitem", { name: /Dark mode/ }).click(); await page.waitForTimeout(700); await clip(page, run, "10-darkrow-rowclick"); run.frames.push({ afterRowClick: await measure(page) });
    await t.click(); await page.waitForTimeout(900); await clip(page, run, "10-darkrow-btnclick"); run.frames.push({ afterBtnClick: await measure(page) });
    // share row click
    await page.getByRole("menuitem", { name: /Share/ }).click(); await page.waitForTimeout(700); await shot(page, run, "11-share-rowclick");
    const sb = page.locator("[role=menu] button").first(); if (await sb.count()) { await sb.click(); await page.waitForTimeout(900); await shot(page, run, "12-share-btnclick"); }
    run.errs = errs; await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length);
}
await browser.close(); writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 2)); console.log(sha, dirty);
