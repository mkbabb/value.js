// probe — READ-ONLY: hit-test the ribbon while expanded; find horizontally scrolled ancestors; JS-click path (no Playwright auto-scroll).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const rev = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const CSS = `@keyframes demo {\n 0% { transform: rotate(0deg); }\n 35% { transform: rotate(90deg) scale(1.2); }\n 70% { transform: rotate(200deg) scale(.8); }\n 100% { transform: rotate(360deg); }\n}`;
const browser = await chromium.launch({ headless: false }); const res = { kf: rev(), runs: [] };
for (const [vp, W, H] of (process.argv[2] === "390" ? [["390", 390, 844]] : process.argv[2] === "1440" ? [["1440", 1440, 900]] : [["1440", 1440, 900], ["390", 390, 844]])) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; const r = { tag };
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.mouse.move(W - 5, H / 2); await page.waitForTimeout(3500);
  const jsClick = (sel) => page.evaluate((s) => { const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; }; const e = [...document.querySelectorAll(s)].find(vis); if (e) e.click(); return !!e; }, sel);
  const hover = async () => { const b = await page.locator(".glass-dock").filter({ visible: true }).first().boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
  if (vp === "390") { await hover(); await jsClick("[aria-label='Controls panel']"); await page.waitForTimeout(1400); }
  await hover(); await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800);
  await page.getByRole("option", { name: /^Timeline/ }).first().click(); await page.waitForTimeout(1800);
  if (vp === "390") { r.drawerOpenAfterTab = await page.evaluate(() => !!document.querySelector(".controls-pane-wrapper.controls-pane--open")); if (!r.drawerOpenAfterTab) { await hover(); await jsClick("[aria-label='Controls panel']"); await page.waitForTimeout(1400); } }
  await page.mouse.move(W - 5, 5); await page.waitForTimeout(500);
  // import via JS clicks
  await page.evaluate(() => [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Import" && b.getBoundingClientRect().width > 0)?.click()); await page.waitForTimeout(900);
  if (!(await page.locator("[role=dialog] textarea:not(.ime-text-area)").count())) { await page.screenshot({ path: OUT + `P0-import-fail-${tag}.png` }); r.importFail = await page.evaluate(() => [...document.querySelectorAll("button")].filter(b => /Import/.test(b.textContent)).map(b => [b.textContent.trim(), JSON.stringify(b.getBoundingClientRect())])); console.log(tag, JSON.stringify(r)); await ctx.close(); continue; }
  await page.locator("[role=dialog] textarea:not(.ime-text-area)").first().fill(CSS); await page.evaluate(() => [...document.querySelectorAll("[role=dialog] button")].filter(b => /^Import/.test(b.textContent.trim())).pop()?.click()); await page.waitForTimeout(1800);
  await page.mouse.move(W - 5, 5); await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + `P1-tab-populated-${tag}.png` });
  await jsClick("[aria-label='Expand timeline']"); await page.waitForTimeout(1700); await page.mouse.move(W - 5, 5); await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + `P2-expanded-populated-${tag}.png` });
  r.probe = await page.evaluate(() => {
    const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
    const rr = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
    const desc = (e) => e ? (e.id ? "#" + e.id : "") + "." + (e.className?.baseVal ?? e.className ?? "").toString().split(" ").slice(0, 3).join(".") : null;
    const cell = document.getElementById("timeline-expanded-target");
    const hits = {}; for (const n of ["Snapshot", "Import", "Export", "Add CSS"]) { const b = [...document.querySelectorAll("button")].find(x => x.textContent.trim() === n && vis(x)); if (!b) { hits[n] = null; continue; } const bb = b.getBoundingClientRect(); const top = document.elementFromPoint(bb.x + bb.width / 2, bb.y + bb.height / 2); hits[n] = { box: rr(b), hitSelf: b.contains(top), top: desc(top), inCell: !!(top && cell.contains(top)) }; }
    const hscroll = [...document.querySelectorAll("*")].filter(e => e.scrollLeft > 0).map(e => [desc(e), e.scrollLeft]);
    const pane = document.querySelector(".controls-pane-wrapper"); const ribbon = document.querySelector("#controls-ribbon-target")?.closest(".flex-shrink-0");
    return { hits, hscroll, cell: rr(cell), cellScroll: [cell.scrollHeight, cell.clientHeight, getComputedStyle(cell).overflowY], copies: [...cell.children].map(k => ({ box: rr(k), markers: k.querySelectorAll(".keyframe-marker").length })), pane: rr(pane), paneCs: pane && getComputedStyle(pane).zIndex, cellZ: getComputedStyle(cell).zIndex, ribbon: ribbon ? rr(ribbon) : null, layout: rr(document.querySelector(".controls-layout")), rows: document.querySelector(".controls-layout") && getComputedStyle(document.querySelector(".controls-layout")).gridTemplateRows, cols: null, stageCell: rr(document.querySelector(".stage-cell")), docs: [...document.querySelectorAll(".glass-dock")].filter(vis).map(rr) };
  });
  // select a marker via mouse in the first copy
  const m = page.locator("#timeline-expanded-target .keyframe-marker").nth(1); try { await m.click({ timeout: 4000 }); await page.waitForTimeout(1200); await page.mouse.move(W - 5, 5); await page.waitForTimeout(500); await page.screenshot({ path: OUT + `P3-expanded-selected-${tag}.png` }); r.selectOk = true; } catch (e) { r.selectOk = String(e).slice(0, 160); }
  r.after = await page.evaluate(() => ({ hscroll: [...document.querySelectorAll("*")].filter(e => e.scrollLeft > 0).map(e => [(e.className?.baseVal ?? e.className ?? "").toString().slice(0, 60), e.scrollLeft]), editorInCell: !!document.querySelector("#timeline-expanded-target .monaco-editor"), cellScroll: (() => { const c = document.getElementById("timeline-expanded-target"); return [c.scrollHeight, c.clientHeight]; })() }));
  // Tab walk: does keyboard focus reach copies 2/3 (hidden channels) and does anything scroll?
  const walk = []; await page.evaluate(() => document.querySelector("#timeline-expanded-target [aria-label='Undo']")?.focus());
  for (let i = 0; i < 40; i++) { await page.keyboard.press("Tab"); walk.push(await page.evaluate(() => { const a = document.activeElement; const c = document.getElementById("timeline-expanded-target"); const idx = [...c.children].findIndex(k => k.contains(a)); const b = a.getBoundingClientRect(); return (a.getAttribute("aria-label") || a.textContent.trim().slice(0, 14) || a.tagName) + "@copy" + idx + "@y" + Math.round(b.y) + (b.bottom < 0 || b.top > innerHeight ? "(offscreen)" : ""); })); }
  r.tabWalk = walk; r.afterTab = await page.evaluate(() => { const c = document.getElementById("timeline-expanded-target"); return { cellScrollTop: c.scrollTop, hscroll: [...document.querySelectorAll("*")].filter(e => e.scrollLeft > 0).map(e => [(e.className?.baseVal ?? e.className ?? "").toString().slice(0, 60), e.scrollLeft]) }; });
  await page.screenshot({ path: OUT + `P4-after-tab-walk-${tag}.png` });
  res.runs.push(r); console.log(tag, JSON.stringify(r).slice(0, 2500)); await ctx.close();
}
await browser.close(); writeFileSync(OUT + `probe-log${process.argv[2] ? "-" + process.argv[2] : ""}.json`, JSON.stringify(res, null, 2));
