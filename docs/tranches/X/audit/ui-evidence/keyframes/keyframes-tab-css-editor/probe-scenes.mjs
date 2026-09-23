// probe-scenes — READ-ONLY: which scenes expose the Keyframes tab, and what each renders (1440 light).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const rev = () => execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim() + "+" + execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const browser = await chromium.launch({ headless: false }); const res = { kf: rev(), scenes: {} };
for (const sc of ["amiga", "square", "easing", "spring"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
  const page = await ctx.newPage(); const o = {};
  await page.goto(`http://localhost:5173/#/${sc}`, { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100);
  const trig = page.locator('[aria-label="Controls tab"]').first(); o.hasTab = await trig.count();
  if (o.hasTab) { await trig.click(); await page.waitForTimeout(700); o.options = (await page.getByRole("option").allTextContents()).map(s => s.trim().slice(0, 30));
    const opt = page.getByRole("option", { name: /^Keyframes/ }).first();
    if (await opt.count()) { await opt.click(); await page.waitForTimeout(2500); } else await page.keyboard.press("Escape"); }
  await page.mouse.move(1435, 5); await page.waitForTimeout(600);
  o.m = await page.evaluate(() => { const vis = e => e && e.getBoundingClientRect().height > 0; const r = e => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
    return { editors: [...document.querySelectorAll(".monaco-editor")].filter(vis).map(e => ({ box: r(e), inPane: !!e.closest(".controls-pane"), aria: e.closest("[aria-label]")?.getAttribute("aria-label") })),
      ribbon: [...document.querySelectorAll("button")].filter(vis).filter(x => /^(Copy|Format|Export CSS|Apply CSS)$/.test(x.textContent.trim())).map(x => x.textContent.trim()),
      codeOutsidePane: [...document.querySelectorAll("pre, code, textarea, [contenteditable=true]")].filter(vis).filter(e => !e.closest(".controls-pane")).map(e => ({ tag: e.tagName, box: r(e), t: e.textContent.trim().slice(0, 60) })).slice(0, 6) }; });
  await page.screenshot({ path: OUT + `20-${sc}-keyframes-1440-light.png` });
  res.scenes[sc] = o; await ctx.close();
}
await browser.close(); writeFileSync(OUT + "probe-scenes-log.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res).slice(0, 3000));
