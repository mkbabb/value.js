// toasts audit capture — READ-ONLY on the app tree; headed Chromium on the real GPU.
// usage: node capture.mjs [1440|390] [light|dark]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const BASE = "http://localhost:5173";
const rev = () => { const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length; return `${sha}+${dirty}dirty`; };
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2], ONLYT = process.argv[3];
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const px = (e) => { if (!e) return null; const b = e.getBoundingClientRect(), c = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: c.borderTopLeftRadius, bg: c.backgroundColor, color: c.color, font: c.fontFamily.split(",")[0] + " " + c.fontSize + "/" + c.lineHeight + " " + c.fontWeight, pad: c.padding, border: c.borderTopWidth + " " + c.borderTopColor, shadow: c.boxShadow.slice(0, 90), backdrop: c.backdropFilter, opacity: c.opacity, z: c.zIndex }; };
  const tl = document.querySelector("[data-sonner-toaster]");
  const sec = tl && tl.closest("section");
  const dock = document.querySelector(".glass-dock");
  const out = { hash: location.hash.slice(0, 50), htmlClass: document.documentElement.className.slice(0, 60), toaster: tl ? { ...px(tl), pos: tl.getAttribute("data-y-position") + "/" + tl.getAttribute("data-x-position"), theme: tl.getAttribute("data-sonner-theme"), expanded: tl.getAttribute("data-expanded"), parent: tl.parentElement?.tagName, sectionLabel: sec?.getAttribute("aria-label"), ariaLive: sec?.getAttribute("aria-live") || tl.getAttribute("aria-live"), cssVars: { offset: getComputedStyle(tl).getPropertyValue("--offset-bottom") || getComputedStyle(tl).getPropertyValue("--offset"), width: getComputedStyle(tl).getPropertyValue("--width"), gap: getComputedStyle(tl).getPropertyValue("--gap") } } : null, dock: px(dock) };
  out.toasts = [...document.querySelectorAll("[data-sonner-toast]")].map(t => ({ type: t.getAttribute("data-type"), front: t.getAttribute("data-front"), visible: t.getAttribute("data-visible"), expanded: t.getAttribute("data-expanded"), text: t.textContent.trim().replace(/\s+/g, " ").slice(0, 100), icon: !!t.querySelector("[data-icon]"), iconHTML: (t.querySelector("[data-icon]")?.innerHTML || "").slice(0, 60), close: !!t.querySelector("[data-close-button]"), action: [...t.querySelectorAll("button")].map(b => ({ text: b.textContent.trim(), ...px(b) })), title: px(t.querySelector("[data-title]")), desc: px(t.querySelector("[data-description]")), overlapsDock: (() => { if (!dock) return null; const a = t.getBoundingClientRect(), d = dock.getBoundingClientRect(); return !(a.right < d.left || a.left > d.right || a.bottom < d.top || a.top > d.bottom); })(), ...px(t) }));
  const pane = document.querySelector(".controls-pane"); out.pane = px(pane);
  return out;
});
async function fresh(vp, theme, route = "cube", initExtra = null) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  if (initExtra) await ctx.addInitScript(initExtra);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200)); });
  await page.goto(`${BASE}/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width - 5, VPS[vp].height / 2); await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, run, name) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); const fr = { frame: p, tree: rev(), ...m };
  const boxes = await page.locator("[data-sonner-toast]").evaluateAll(els => els.map(e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; }).filter(b => b.w > 0));
  if (boxes.length) { const vp = page.viewportSize(); const x0 = Math.max(0, Math.min(...boxes.map(b => b.x)) - 24), y0 = Math.max(0, Math.min(...boxes.map(b => b.y)) - 24); const x1 = Math.min(vp.width, Math.max(...boxes.map(b => b.x + b.w)) + 24), y1 = Math.min(vp.height, Math.max(...boxes.map(b => b.y + b.h)) + 24);
    const cp = `${name}-${run.tag}-crop.png`; await page.screenshot({ path: OUT + cp, clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } }); fr.crop = cp; }
  run.frames.push(fr); return m;
}
const hoverDock = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const toKeyframes = async (page, vp) => {
  await hoverDock(page);
  await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800);
  await page.getByRole("option", { name: /^Keyframes/ }).first().click(); await page.waitForTimeout(2500);
  if (vp === "390") { await hoverDock(page); const t = page.getByRole("button", { name: "Controls panel" }).first(); if (await t.count()) { await t.click(); await page.waitForTimeout(1400); } }
  await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(500);
};
const rbtn = (page, name) => page.getByRole("button", { name, exact: true }).filter({ visible: true }).first();
const clickR = async (page, name) => { const b = rbtn(page, name); await b.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {}); await b.click({ timeout: 5000 }); };
const openShare = async (page) => { await hoverDock(page); await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800); await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(900); };
const clearToasts = async (page) => { await page.waitForTimeout(5200); };
const vps = ONLY ? [ONLY] : ["1440", "390"];
const summary = [];
for (const vp of vps) for (const theme of (ONLYT ? [ONLYT] : ["light", "dark"])) {
  const run = { tag: `${vp}-${theme}`, frames: [], notes: {}, errs: {} };
  const step = async (label, fn) => { try { await fn(); } catch (e) { run.notes[label] = "FAIL: " + String(e).split("\n")[0].slice(0, 200); } };
  let ctx, page, errs;
  ({ ctx, page, errs } = await fresh(vp, theme, "cube"));
  await step("toKeyframes", () => toKeyframes(page, vp));
  // 01 success — ribbon Copy
  await step("success-copy", async () => { await clickR(page, "Copy"); await page.waitForTimeout(700); await page.mouse.move(VPS[vp].width / 2, 5); await shot(page, run, "01-success-copy"); });
  await clearToasts(page);
  // 02 success — Format
  await step("success-format", async () => { await clickR(page, "Format"); await page.waitForTimeout(1200); await shot(page, run, "02-success-format"); });
  await clearToasts(page);
  // 03 stacked — Copy, Format, Copy, Export CSS in rapid succession (collapsed), then hover (expanded)
  await step("stacked", async () => {
    await clickR(page, "Copy"); await page.waitForTimeout(150); await clickR(page, "Format"); await page.waitForTimeout(500); await clickR(page, "Export CSS").catch(() => {}); await page.waitForTimeout(300); await clickR(page, "Copy"); await page.waitForTimeout(700);
    await page.mouse.move(VPS[vp].width / 2, 5); await page.waitForTimeout(200); await shot(page, run, "03-stacked-collapsed");
    const t = page.locator("[data-sonner-toast]").first(); const bb = await t.boundingBox(); if (bb) { await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(700); await shot(page, run, "04-stacked-hover-expanded"); }
  });
  await page.mouse.move(VPS[vp].width / 2, 5); await clearToasts(page);
  // 05 error-with-action — break the buffer, then Format (prettier refuses → "Could not format CSS" + Retry)
  await step("error-format", async () => {
    const vl = page.locator(".monaco-pane .monaco-editor .view-lines").filter({ visible: true }).first(); const eb = await vl.boundingBox();
    await page.mouse.click(eb.x + 40, eb.y + 10); await page.keyboard.press("Meta+ArrowDown"); await page.keyboard.type("\n@keyframes { {{ ;; ", { delay: 10 }); await page.waitForTimeout(1500);
    await clickR(page, "Format"); await page.waitForTimeout(1200); await page.mouse.move(VPS[vp].width / 2, 5); await shot(page, run, "05-error-format-action");
  });
  run.errs.a = errs.slice(0, 8); await ctx.close();
  // 06 error — Share load with a bad hash
  ({ ctx, page, errs } = await fresh(vp, theme, "cube"));
  await step("error-share", async () => { await openShare(page); const f = page.getByLabel("Share URL or hash to load").first(); await f.fill("@@not-base64@@"); await page.keyboard.press("Enter"); await page.waitForTimeout(800); await shot(page, run, "06-error-share-invalid"); });
  await step("error-share-nostate", async () => { const f = page.getByLabel("Share URL or hash to load").first(); await f.fill(`${BASE}/#/cube`); await page.keyboard.press("Enter"); await page.waitForTimeout(800); await shot(page, run, "07-error-share-nostate-stacked"); });
  run.errs.b = errs.slice(0, 8); await ctx.close();
  // 08 info — clipboard write refused → "URL updated — copy from address bar"
  ({ ctx, page, errs } = await fresh(vp, theme, "cube", () => { try { Object.defineProperty(navigator.clipboard, "writeText", { value: () => Promise.reject(new Error("denied (audit instrument)")) }); } catch {} }));
  await step("info-share", async () => { await openShare(page); await page.locator("[role=dialog] button[title='Copy share link']").first().click(); await page.waitForTimeout(900); await page.mouse.move(VPS[vp].width / 2, 5); await shot(page, run, "08-info-clipboard-fallback"); run.notes.hashAfterInfo = await page.evaluate(() => location.hash.slice(0, 60)); });
  // 09 success — share copy link (dialog closes) for the long-title case
  run.errs.c = errs.slice(0, 8); await ctx.close();
  // 10 invalid keyframe offset in the spring inline editor
  ({ ctx, page, errs } = await fresh(vp, theme, "spring"));
  await step("offset-invalid", async () => {
    const inp = page.locator(".keyframes-section input[aria-label=Offset]").nth(1);
    await inp.scrollIntoViewIfNeeded({ timeout: 4000 }); await inp.click(); await inp.fill("500%"); await page.keyboard.press("Enter"); await page.waitForTimeout(900);
    run.notes.offsetField = await inp.evaluate(e => ({ invalid: e.getAttribute("aria-invalid"), describedby: e.getAttribute("aria-describedby"), msg: e.getAttribute("aria-describedby") ? document.getElementById(e.getAttribute("aria-describedby"))?.textContent.trim() : null }));
    await shot(page, run, "10-spring-offset-invalid");
  });
  run.errs.d = errs.slice(0, 8); await ctx.close();
  writeFileSync(OUT + `capture-log-${run.tag}.json`, JSON.stringify(run, null, 1));
  summary.push({ tag: run.tag, notes: run.notes, frames: run.frames.map(f => ({ f: f.frame, toasts: f.toasts.map(t => `${t.type}:${t.text}@${t.x},${t.y} ${t.w}x${t.h} r${t.radius} bg${t.bg} dock${t.overlapsDock}`), toaster: f.toaster && f.toaster.pos })) });
}
console.log(JSON.stringify(summary, null, 1));
await browser.close();
