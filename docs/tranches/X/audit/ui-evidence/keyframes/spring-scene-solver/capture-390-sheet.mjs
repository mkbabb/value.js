// 390 supplement: expand the controls sheet, then capture presets / inline editor / ribbon / Re-seat inside it.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const log = { ...tree(), when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) {
  const run = { tag: `390-${theme}`, ...tree(), frames: [], notes: {} };
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  try {
    await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
    const h = page.locator("[aria-label='Drawer position']").first();
    run.notes.handle = await h.evaluate(e => ({ tag: e.tagName, role: e.getAttribute("role"), vnow: e.getAttribute("aria-valuenow"), vtext: e.getAttribute("aria-valuetext"), keys: e.getAttribute("aria-keyshortcuts") })).catch(e => String(e).slice(0, 100));
    const hb = await h.boundingBox();
    // drag the handle to the top
    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down();
    for (let k = 1; k <= 12; k++) { await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2 - k * 50); await page.waitForTimeout(16); }
    await page.mouse.up(); await page.waitForTimeout(1200);
    run.notes.afterDrag = await h.evaluate(e => [e.getAttribute("aria-valuenow"), e.getAttribute("aria-valuetext"), Math.round(e.getBoundingClientRect().y)]);
    const pane = () => page.evaluate(() => { const e = document.querySelector(".controls-pane"); const b = e.getBoundingClientRect(); return [Math.round(b.y), Math.round(b.height), e.scrollTop, e.scrollHeight]; });
    run.notes.paneExpanded = await pane();
    await page.screenshot({ path: OUT + `20-sheet-expanded-390-${theme}.png` }); run.frames.push(`20-sheet-expanded-390-${theme}.png`);
    // wheel within sheet to presets, editor, ribbon
    const scrollTo = async (sel) => page.evaluate((s) => { const p = document.querySelector(".controls-pane"); const e = document.querySelector(s); if (!p || !e) return null; p.scrollTop += e.getBoundingClientRect().top - p.getBoundingClientRect().top - 40; return p.scrollTop; }, sel);
    run.notes.s1 = await scrollTo(".preset-grid"); await page.waitForTimeout(500);
    await page.screenshot({ path: OUT + `21-sheet-presets-390-${theme}.png` }); run.frames.push(`21-sheet-presets-390-${theme}.png`);
    run.notes.s2 = await scrollTo(".keyframes-section"); await page.waitForTimeout(500);
    await page.screenshot({ path: OUT + `22-sheet-inline-editor-390-${theme}.png` }); run.frames.push(`22-sheet-inline-editor-390-${theme}.png`);
    run.notes.s3 = await page.evaluate(() => { const p = document.querySelector(".controls-pane"); p.scrollTop = p.scrollHeight; return [p.scrollTop, p.scrollHeight, p.clientHeight]; }); await page.waitForTimeout(600);
    run.notes.ribbon = await page.evaluate(() => [...document.querySelectorAll(".btn-playback")].map(b => { const r = b.getBoundingClientRect(); return b.textContent.trim().slice(0, 10) + " " + [r.x, r.y, r.width, r.height].map(Math.round) + " r=" + getComputedStyle(b).borderRadius; }));
    await page.screenshot({ path: OUT + `23-sheet-ribbon-390-${theme}.png` }); run.frames.push(`23-sheet-ribbon-390-${theme}.png`);
    const rs = page.locator(".btn-playback", { hasText: "Re-seat" }).first();
    const vis = await rs.evaluate(e => { const r = e.getBoundingClientRect(); return r.y < innerHeight && r.bottom > 0; });
    run.notes.reseatInViewport = vis;
    if (vis) { await rs.click({ timeout: 4000 }).catch(e => run.notes.reseatErr = String(e).slice(0, 120)); await page.waitForTimeout(160); await page.screenshot({ path: OUT + `24-sheet-reseat-clicked-390-${theme}.png` }); run.frames.push(`24-sheet-reseat-clicked-390-${theme}.png`); }
  } catch (e) { run.fatal = String(e).slice(0, 800); }
  await ctx.close(); log.runs.push(run); writeFileSync(OUT + "capture-390-sheet-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
