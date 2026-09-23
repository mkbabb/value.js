// easing-scene-specimens 390 editor-card stage supplement — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const browser = await chromium.launch({ headless: false });
const res = { ...tree(), runs: [] };
const geo = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  return { drawer: r(document.querySelector(".glass-drawer")), snap: document.querySelector(".glass-drawer")?.getAttribute("data-glass-drawer-snap-points"),
    cp: [...document.querySelectorAll("button")].filter(b => b.getAttribute("aria-label") === "Controls panel").map(b => [vis(b), r(b), b.getAttribute("aria-expanded"), b.getAttribute("aria-pressed")]),
    handle: r(document.querySelector("[data-glass-drawer-handle], .glass-drawer-handle, [class*=handle]")), handleCls: document.querySelector("[data-glass-drawer-handle], .glass-drawer-handle, [class*=handle]")?.className?.toString().slice(0, 60),
    transport: r([...document.querySelectorAll("button")].find(b => /Play animation/.test(b.getAttribute("aria-label") || "") && vis(b))),
    picker: r(document.querySelector(".panel-content")), ribbon: r([...document.querySelectorAll("button")].find(b => b.getAttribute("aria-label") === "Hide ball preview")) };
});
for (const theme of ["light", "dark"]) {
  const run = { theme, ...tree(), notes: {}, frames: [] };
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  run.notes.g0 = await geo(page);
  const cp = page.getByRole("button", { name: "Controls panel" }).first();
  try { await cp.click({ timeout: 4000 }); run.notes.via = "controls-panel"; } catch {
    const h = run.notes.g0.handle; if (h) { await page.mouse.move(h[0] + h[2] / 2, h[1] + h[3] / 2); await page.mouse.down(); for (let k = 1; k <= 12; k++) { await page.mouse.move(h[0] + h[2] / 2, h[1] - k * 45); await page.waitForTimeout(16); } await page.mouse.up(); run.notes.via = "drag-handle"; }
  }
  await page.waitForTimeout(1500); run.notes.g1 = await geo(page);
  await page.screenshot({ path: OUT + `08-390-editor-drawer-expanded-390-${theme}.png` }); run.frames.push("08-390-editor-drawer-expanded-390-" + theme);
  run.notes.inner = await page.evaluate(() => { const d = document.querySelector(".glass-drawer"); const sc = [...d.querySelectorAll("*")].find(e => e.scrollHeight > e.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(e).overflowY)); if (sc) { sc.scrollTop = sc.scrollHeight; return [sc.className.toString().slice(0, 60), sc.scrollHeight, sc.clientHeight]; } return null; });
  await page.waitForTimeout(600); await page.screenshot({ path: OUT + `08b-390-editor-drawer-scrolled-390-${theme}.png` });
  const hide = page.getByRole("button", { name: "Hide ball preview" }).first();
  try { await hide.click({ timeout: 4000 }); await page.waitForTimeout(600); run.notes.hidden = await hide.getAttribute("aria-pressed"); await page.screenshot({ path: OUT + `09-preview-hidden-390-${theme}.png` }); await hide.click(); await page.waitForTimeout(500); await page.screenshot({ path: OUT + `09b-preview-shown-again-390-${theme}.png` }); } catch (e) { run.notes.hideErr = String(e).slice(0, 200); }
  // collapse back and walk keyboard
  await page.keyboard.press("Escape"); await page.waitForTimeout(800); run.notes.g2 = await geo(page);
  await page.screenshot({ path: OUT + `08c-390-after-escape-390-${theme}.png` });
  run.errs = errs; res.runs.push(run); await ctx.close();
}
writeFileSync(OUT + "capture390-log.json", JSON.stringify(res, null, 1));
await browser.close();
