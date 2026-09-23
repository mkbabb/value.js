// css-paste-dialog — 390 timeline reach probe (READ-ONLY). Why does the ribbon Import not take a real click at 390?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const theme = process.argv[2] || "light"; const out = { sha, dirty, theme, steps: [] };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: theme });
await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const hoverDock = async () => { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const openDrawer = async () => { await hoverDock(); const t = page.getByRole("button", { name: "Controls panel" }).first(); if (await t.count()) { await t.click(); await page.waitForTimeout(1400); } await page.mouse.move(5, 300); await page.waitForTimeout(600); };
await openDrawer(); await hoverDock();
await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800);
await page.getByRole("option", { name: /^Timeline/ }).first().click(); await page.waitForTimeout(2000);
await openDrawer();
await page.screenshot({ path: OUT + `30-390-timeline-drawer-390-${theme}.png` });
const imp = page.getByRole("button", { name: "Import", exact: true }).filter({ visible: true }).first();
out.box = await imp.boundingBox(); await (async()=>{})();
out.hit = await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Import" && b.getBoundingClientRect().width > 0); if (!b) return null; const r = b.getBoundingClientRect(); const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { btn: [r.x, r.y, r.width, r.height].map(Math.round), top: e ? e.tagName + "." + String(e.className).slice(0, 80) : null, inside: b.contains(e) }; });
// Expand the sheet from peek: drag its grab handle to the top, then retry.
const tryExpand = async () => { const h = await page.evaluate(() => { const c = [...document.querySelectorAll("[data-slot*=handle], [class*=handle], [aria-label*=resize i], [aria-label*=drag i]")].find(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.y > 400; }); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, tag: c.tagName + "." + String(c.className).slice(0, 60) + " " + (c.getAttribute("aria-label") || "") }; }); out.handle = h; if (!h) return; await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(h.x, 120, { steps: 12 }); await page.mouse.up(); await page.waitForTimeout(1200);
  const h2 = await page.evaluate(() => { const c = document.querySelector(".glass-drawer-handle"); const r = c.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }); out.handle2 = h2; await page.mouse.move(h2.x, h2.y); await page.mouse.down(); await page.mouse.move(h2.x, 20, { steps: 12 }); await page.mouse.up(); await page.waitForTimeout(1200); out.boxAfter2 = await imp.boundingBox();
  await page.mouse.move(195, 700); for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 250); await page.waitForTimeout(200); } await page.waitForTimeout(600); out.boxAfterWheel = await imp.boundingBox();
  out.scrollers = await page.evaluate(() => [...document.querySelectorAll("*")].filter(e => { const c = getComputedStyle(e); return /auto|scroll/.test(c.overflowY) && e.scrollHeight > e.clientHeight + 4 && e.getBoundingClientRect().width > 0; }).map(e => ({ el: e.tagName + "." + String(e.className).slice(0, 60), sh: e.scrollHeight, ch: e.clientHeight, st: e.scrollTop, box: [e.getBoundingClientRect().y, e.getBoundingClientRect().height].map(Math.round) })));
};
out.boxBefore = await imp.boundingBox();
try { await imp.scrollIntoViewIfNeeded({ timeout: 4000 }); await imp.click({ timeout: 5000 }); out.realClick = "ok"; } catch (e) { out.realClick = String(e).replace(/\u001b\[\d+m/g, "").slice(0, 1400); }
await page.waitForTimeout(1000);
if (out.realClick !== "ok") { await tryExpand(); await page.screenshot({ path: OUT + `32-390-sheet-expanded-390-${theme}.png` }); out.boxExpanded = await imp.boundingBox(); try { await imp.scrollIntoViewIfNeeded({ timeout: 4000 }); await imp.click({ timeout: 5000 }); out.clickAfterExpand = "ok"; } catch (e) { out.clickAfterExpand = String(e).replace(/\u001b\[\d+m/g, "").split("\n").slice(-3).join(" | "); } await page.waitForTimeout(1000);
  if (out.clickAfterExpand !== "ok") { await imp.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(1200); out.keyboardOpen = await page.locator("[data-slot=dialog-content]").filter({ visible: true }).count(); }
  const ta = page.locator("[data-slot=dialog-content] textarea").filter({ visible: true }).first();
  if (await ta.count()) { await page.screenshot({ path: OUT + `33-390-import-open-empty-390-${theme}.png` }); await ta.click(); await ta.fill("@keyframes spin {\n  from { transform: rotate(0deg); }\n"); await page.waitForTimeout(400); out.taFont = await ta.evaluate(e => getComputedStyle(e).fontSize); await page.screenshot({ path: OUT + `34-390-import-typed-focus-390-${theme}.png` }); await ta.fill("@keyframes x { 50% { width: calc( } }"); await page.locator("[data-slot=dialog-content] button").filter({ hasText: /^Import/ }).last().click(); await page.waitForTimeout(1400); await page.screenshot({ path: OUT + `35-390-import-parse-error-390-${theme}.png` }); out.dlg = await page.evaluate(() => { const d = [...document.querySelectorAll("[data-slot=dialog-content]")].find(e => e.getBoundingClientRect().width > 0); const r = d.getBoundingClientRect(); const er = d.querySelector("[role=status]"); return { box: [r.x, r.y, r.width, r.height].map(Math.round), err: er && { t: er.textContent.trim(), h: Math.round(er.getBoundingClientRect().height), fs: getComputedStyle(er).fontSize } }; }); } }
out.dialogAfterReal = await page.locator("[data-slot=dialog-content]").filter({ visible: true }).count();
await page.screenshot({ path: OUT + `31-390-after-real-click-390-${theme}.png` });
writeFileSync(OUT + `probe-390-${theme}.json`, JSON.stringify(out, null, 2)); console.log(JSON.stringify(out, null, 1).slice(0, 2500));
await browser.close();
