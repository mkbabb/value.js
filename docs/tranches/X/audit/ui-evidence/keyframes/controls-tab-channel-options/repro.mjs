// Isolated repros for this seat's BROKEN candidates — READ-ONLY. 1440 light.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const browser = await chromium.launch({ headless: false }); const res = { sha, dirty, when: new Date().toISOString() };
const fresh = async () => { const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" }); const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.mouse.move(1435, 450); await page.waitForTimeout(3500); return { ctx, page }; };
const play = (page) => page.evaluate(() => [...document.querySelectorAll("#controls-ribbon-target button")].map(b => b.textContent.trim()).join("|"));
const err = (page) => page.evaluate(() => [...document.querySelectorAll(".controls-pane [aria-invalid=true]")].filter(e => e.getBoundingClientRect().width).map(e => e.value));
// 1: Escape leak from an open Select
{ const { ctx, page } = await fresh(); const r = { before: await play(page) };
  const ez = page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: /ease/ }).first();
  await ez.click(); await page.waitForTimeout(600); r.open = await play(page);
  await page.keyboard.press("Escape"); await page.waitForTimeout(600); r.afterEscape = await play(page); r.listboxOpen = await page.locator("[role=listbox]").filter({ visible: true }).count();
  await page.screenshot({ path: OUT + "R1-escape-from-select-stops-playback-1440-light.png" });
  // same with direction LabeledSelect
  const pb = page.locator("#controls-ribbon-target button").first(); if ((await play(page)).startsWith("Play")) { await pb.click(); await page.waitForTimeout(700); }
  r.before2 = await play(page); const d = page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: /alternate/ }).first(); await d.click(); await page.waitForTimeout(500); await page.keyboard.press("Escape"); await page.waitForTimeout(600); r.afterEscape2 = await play(page);
  // Escape with focus in an input (no popover)
  if ((await play(page)).startsWith("Play")) { await pb.click(); await page.waitForTimeout(700); }
  r.before3 = await play(page); await page.locator(".controls-pane input").filter({ visible: true }).nth(1).focus(); await page.keyboard.press("Escape"); await page.waitForTimeout(600); r.afterEscapeInInput = await play(page);
  res.escape = r; await ctx.close(); }
// 2: stale invalid state
{ const { ctx, page } = await fresh(); const r = {}; const inp = page.locator(".controls-pane input").filter({ visible: true }).first();
  await inp.fill("abc"); await inp.press("Enter"); await page.waitForTimeout(400); r.afterAbc = await err(page);
  await inp.fill("5s"); await inp.press("Enter"); await page.waitForTimeout(400); r.afterRestoreSame = await err(page);
  await page.screenshot({ path: OUT + "R2-invalid-sticks-after-restoring-5s-1440-light.png" });
  await inp.fill("4s"); await inp.press("Enter"); await page.waitForTimeout(400); r.afterDifferent4s = await err(page);
  await inp.fill("abc"); await inp.press("Tab"); await page.waitForTimeout(400); r.abcBlur = await err(page); r.abcBlurValue = await inp.inputValue();
  res.invalid = r; await ctx.close(); }
// 3: pencil peek mutates easing; selected indicator on open select
{ const { ctx, page } = await fresh(); const r = {}; const val = () => page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: /ease|cubic|linear|steps/ }).first().textContent();
  r.before = (await val()).trim(); await page.getByRole("button", { name: "Edit easing curve" }).filter({ visible: true }).first().click(); await page.waitForTimeout(800);
  await page.getByRole("button", { name: /back to controls/i }).filter({ visible: true }).first().click(); await page.waitForTimeout(800); r.afterPeekBack = (await val()).trim();
  const ez = page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: /ease|cubic/ }).first(); await ez.click(); await page.waitForTimeout(600);
  r.selectedItem = await page.evaluate(() => { const o = [...document.querySelectorAll("[role=option][aria-selected=true]")].find(e => e.getBoundingClientRect().width); if (!o) return null; const c = getComputedStyle(o); const ind = [...o.querySelectorAll("*")].filter(e => e.getBoundingClientRect().width > 0 && e.tagName !== "SPAN" && e.tagName !== "path").map(e => e.tagName + "." + e.getAttribute("class")?.slice(0, 40)); return { t: o.textContent.trim().slice(0, 30), bg: c.backgroundColor, fw: getComputedStyle(o.querySelector("[data-register=code]") || o).fontWeight, state: o.getAttribute("data-state"), kids: ind, html: o.outerHTML.slice(0, 600) }; });
  await page.screenshot({ path: OUT + "R3-after-pencil-peek-select-open-1440-light.png" });
  res.pencil = r; await ctx.close(); }
await browser.close(); writeFileSync(OUT + "repro-log.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 1));
