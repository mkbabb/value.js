// Matrix-channel state + focus-ring probe — READ-ONLY; headed Chromium on the real GPU.
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
const trig = (page) => page.evaluate(() => { const t = document.querySelector('[aria-label="Controls tab"]'); if (!t) return null; const c = getComputedStyle(t);
  return { text: t.textContent.trim(), w: Math.round(t.getBoundingClientRect().width), outline: c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor, shadow: c.boxShadow.slice(0, 120), bg: c.backgroundColor, border: c.borderTopWidth + " " + c.borderTopColor, fv: t.matches(":focus-visible"), f: t.matches(":focus"), state: t.getAttribute("data-state"), expanded: t.getAttribute("aria-expanded"),
    options: [...document.querySelectorAll("[role=option]")].map(o => o.textContent.trim() + (o.getAttribute("aria-selected") === "true" ? "*" : "")), channel: (document.querySelector('[aria-label="Select animation"]') || {}).textContent?.trim() }; });
async function fresh(vp, theme, route) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 10); await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
const hoverTop = async (page) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); };
const openTab = async (page) => { await hoverTop(page); await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800); };
const pickChannel = async (page, vp, name) => {
  await page.mouse.move(VPS[vp].width / 2, VPS[vp].height - 40); await page.waitForTimeout(1200);
  const sel = page.getByLabel("Select animation").first(); await sel.click(); await page.waitForTimeout(700);
  await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(1300);
};
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const run = { tag: `${vp}-${theme}`, steps: [] };
  const S = async (page, name) => { const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.steps.push({ frame: p, trig: await trig(page) }); };
  try {
    const { ctx, page, errs } = await fresh(vp, theme, "cube");
    await pickChannel(page, vp, "Matrix");
    await hoverTop(page); await S(page, "11-cube-matrix-expanded");
    await openTab(page); await S(page, "12-cube-matrix-open");
    await page.getByRole("option", { name: "Matrix Controls" }).first().click(); await page.waitForTimeout(1400);
    await hoverTop(page); await S(page, "13-cube-matrix-controls-picked");
    // channel back to Rotations while Matrix Controls selected: does the tab fall back?
    await pickChannel(page, vp, "Rotations");
    await hoverTop(page); await S(page, "14-cube-back-rotations");
    await openTab(page); await S(page, "15-cube-back-rotations-open");
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    // mouse pick focus ring: pick Keyframes with the pointer, then move away inside dock
    await openTab(page); await page.getByRole("option", { name: "Keyframes" }).first().click(); await page.waitForTimeout(1200);
    await hoverTop(page); await S(page, "16-cube-after-pointer-pick-Keyframes");
    run.errs = errs.slice(0, 5); await ctx.close();
    if (vp === "1440" && theme === "light") {
      // keyboard-only: focus reach + open with Enter
      const k = await fresh(vp, theme, "cube");
      for (let i = 0; i < 6; i++) { await k.page.keyboard.press("Tab"); await k.page.waitForTimeout(350); const a = await k.page.evaluate(() => document.activeElement?.getAttribute("aria-label")); if (a === "Controls tab") break; }
      await k.page.waitForTimeout(700); await S(k.page, "17-kbd-focus-trigger");
      await k.page.keyboard.press("Enter"); await k.page.waitForTimeout(800); await S(k.page, "18-kbd-open");
      await k.page.keyboard.press("ArrowDown"); await k.page.keyboard.press("Enter"); await k.page.waitForTimeout(1200); await S(k.page, "19-kbd-picked");
      await k.ctx.close();
    }
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(run.tag, run.err || "ok", run.steps.length);
}
await browser.close(); writeFileSync(OUT + "probe-matrix-log.json", JSON.stringify(log, null, 2)); console.log(sha, dirty);
