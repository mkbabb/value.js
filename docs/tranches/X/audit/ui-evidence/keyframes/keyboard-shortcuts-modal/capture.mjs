// keyboard-shortcuts-modal audit capture — READ-ONLY; headed Chromium on the real GPU.
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
  const px = (e) => { const b = e.getBoundingClientRect(), c = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontFamily.split(",")[0] + " " + c.fontSize + " " + c.fontWeight + " lh" + c.lineHeight, pad: c.padding }; };
  const out = { theme: document.documentElement.className.slice(0, 60), focus: document.activeElement ? (document.activeElement.tagName + "[" + (document.activeElement.getAttribute("role") || "") + "] " + (document.activeElement.getAttribute("aria-label") || document.activeElement.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)) : null };
  const dlg = document.querySelector("[role=dialog]");
  if (!dlg) return out;
  const dc = getComputedStyle(dlg);
  out.dialog = { ...px(dlg), cls: dlg.className.slice(0, 300), backdrop: dc.backdropFilter, shadow: dc.boxShadow.slice(0, 80), overflowY: dc.overflowY, scrollH: dlg.scrollHeight, clientH: dlg.clientHeight, border: dc.border };
  const t = dlg.querySelector("h2"); if (t) out.title = { text: t.textContent.trim(), ...px(t) };
  const d = dlg.querySelector("p"); if (d) out.desc = { text: d.textContent.trim(), ...px(d) };
  const port = dlg.querySelector("[role=region]"); if (port) { const pc = getComputedStyle(port); out.port = { ...px(port), scrollTop: port.scrollTop, scrollH: port.scrollHeight, clientH: port.clientHeight, mask: (pc.maskImage || pc.webkitMaskImage || "").slice(0, 160), tabindex: port.getAttribute("tabindex"), outline: pc.outline, cls: port.className.slice(0, 160) }; }
  out.headings = [...dlg.querySelectorAll("h3")].map(h => ({ text: h.textContent.trim(), ...px(h), position: getComputedStyle(h).position }));
  out.rows = [...dlg.querySelectorAll("dl > div")].map(r => { const dt = r.querySelector("dt"), dd = r.querySelector("dd"); return { label: dt?.textContent.trim(), caps: [...dd.querySelectorAll("kbd")].map(k => k.textContent.trim()), joiners: [...dd.querySelectorAll("span[aria-hidden]")].map(s => s.textContent.trim()), sr: dd.querySelector(".sr-only")?.textContent.trim(), row: px(r), ddW: Math.round(dd.getBoundingClientRect().width), dtW: Math.round(dt.getBoundingClientRect().width), dtLines: Math.round(dt.getBoundingClientRect().height / parseFloat(getComputedStyle(dt).lineHeight || 20)) }; });
  const k = dlg.querySelector("kbd"); if (k) out.kbd = px(k);
  const close = [...dlg.querySelectorAll("button")].map(b => ({ t: (b.textContent || "").trim(), ...px(b) })); out.buttons = close;
  const ov = document.querySelector("[data-state=open].fixed.inset-0, .fixed.inset-0[data-state]"); if (ov) out.overlay = { bg: getComputedStyle(ov).backgroundColor, backdrop: getComputedStyle(ov).backdropFilter };
  // horizontal overflow
  out.docOverflowX = document.documentElement.scrollWidth > innerWidth;
  const r = dlg.getBoundingClientRect(); out.dialogOffscreen = r.left < 0 || r.right > innerWidth || r.top < 0 || r.bottom > innerHeight;
  return out;
});
const tabsState = (page) => page.evaluate(() => [...document.querySelectorAll("[role=tab]")].map(t => (t.textContent || "").trim().slice(0, 14) + ":" + t.getAttribute("aria-selected")).join(" | "));
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
async function shot(page, run, name, full = true) { const m = await measure(page); const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m }); }
async function clip(page, run, name) { const b = await page.locator("[role=dialog]").first().boundingBox(); if (!b) return; const p = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + p, clip: { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 16), width: Math.min(b.width + 32, 9999), height: b.height + 32 } }); run.frames.push({ frame: p }); }
const hoverDock = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
for (const route of ["cube", "square"]) for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  if (route === "square" && theme === "dark") continue;
  const run = { tag: `${route}-${vp}-${theme}`, frames: [] };
  try {
    const { ctx, page, errs } = await fresh(vp, theme, route);
    // reach 1: the menu route
    await hoverDock(page);
    await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(700);
    await page.getByRole("menuitem", { name: /Keyboard shortcuts/ }).click(); await page.waitForTimeout(1000);
    await shot(page, run, "01-open-menu"); await clip(page, run, "01-open-menu");
    // hover a row
    const row = page.locator("[role=dialog] dl > div").nth(2); const rb = await row.boundingBox(); if (rb) { await page.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await page.waitForTimeout(300); await clip(page, run, "02-hover-row"); }
    // keyboard focus: Tab through
    const tabs = [];
    for (let i = 0; i < 3; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(250); tabs.push((await measure(page)).focus); if (i === 0 || i === 1) await clip(page, run, `03-tab${i}`); }
    run.frames.push({ tabOrder: tabs });
    // scrolled mid + bottom
    const port = page.locator("[role=dialog] [role=region]").first();
    if (await port.count()) {
      await port.evaluate((e) => { e.scrollTop = e.scrollHeight / 2; }); await page.waitForTimeout(400); await clip(page, run, "04-scrolled-mid"); run.frames.push({ mid: await measure(page) });
      await port.evaluate((e) => { e.scrollTop = e.scrollHeight; }); await page.waitForTimeout(400); await clip(page, run, "05-scrolled-bottom"); run.frames.push({ bottom: await measure(page) });
      // dialog-level scroll (the `scroll` on DialogContent)
      const dlgScroll = await page.locator("[role=dialog]").first().evaluate((e) => ({ sh: e.scrollHeight, ch: e.clientHeight }));
      run.frames.push({ dlgScroll });
    }
    // registry live behind the scrim? press "3" (Timeline tab) and Space
    const before = await tabsState(page);
    await page.keyboard.press("3"); await page.waitForTimeout(500);
    const after = await tabsState(page);
    run.frames.push({ behindScrim: { before, after } });
    await shot(page, run, "06-after-key3");
    // "?" toggles closed
    await page.keyboard.press("Shift+Slash"); await page.waitForTimeout(700);
    run.frames.push({ afterQuestion: !!(await page.locator("[role=dialog]").count()) });
    // reach 2: press ? anywhere
    await page.mouse.click(VPS[vp].width / 2, 60); await page.waitForTimeout(300);
    await page.keyboard.press("Shift+Slash"); await page.waitForTimeout(1000);
    run.frames.push({ questionOpens: !!(await page.locator("[role=dialog]").count()) });
    await shot(page, run, "07-open-question");
    // Escape closes
    await page.keyboard.press("Escape"); await page.waitForTimeout(700);
    run.frames.push({ afterEsc: !!(await page.locator("[role=dialog]").count()) });
    await shot(page, run, "08-after-escape");
    run.errs = errs; await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.frames.length);
}
await browser.close();
writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
console.log("sha", sha, "dirty", dirty);
