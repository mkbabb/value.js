// square-scene probe2 — keyboard focus ring via real Tab; Escape after playback+takeover. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(); const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false }); const out = { sha, dirty };
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  const st = () => page.evaluate(() => { const bx = document.querySelector(".square-stage .demo-box"); const cs = getComputedStyle(bx); return { focused: document.activeElement === bx, fv: bx.matches(":focus-visible"), boxShadow: cs.boxShadow.slice(0, 160), outline: cs.outlineStyle + " " + cs.outlineWidth, ringVar: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-shadow").trim().slice(0, 100), badge: document.querySelector(".square-telemetry .status-badge")?.textContent.trim(), tether: getComputedStyle(document.querySelector(".square-tether")).opacity, bg: cs.backgroundColor, tf: cs.transform.slice(0, 50), mode: bx.dataset.squareMode }; });
  let n = 0; while (n < 40) { await page.keyboard.press("Tab"); n++; if (await page.evaluate(() => document.activeElement?.classList.contains("demo-box"))) break; }
  out[theme + "-tabsToBox"] = n; await page.waitForTimeout(300); out[theme + "-focus"] = await st();
  await page.screenshot({ path: OUT + `q1-tab-focus-box-1440-${theme}.png` });
  if (theme === "light") {
    const bb = await page.locator(".square-stage .demo-box").boundingBox(); await page.screenshot({ path: OUT + `q1-tab-focus-box-crop-1440-${theme}.png`, clip: { x: bb.x - 30, y: bb.y - 30, width: bb.width + 60, height: bb.height + 60 } });
    // play, then takeover, settle, then press Escape
    await page.keyboard.press("Space"); await page.waitForTimeout(1500); out.afterSpace = await st();
    const c = { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 };
    const bb2 = await page.locator(".square-stage .demo-box").boundingBox(); const c2 = { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height / 2 };
    await page.mouse.move(c2.x, c2.y); await page.mouse.down(); for (let k = 1; k <= 6; k++) { await page.mouse.move(c2.x - k * 10, c2.y + k * 6); await page.waitForTimeout(16); } await page.mouse.up(); await page.waitForTimeout(2200);
    out.afterTakeover = await st(); await page.mouse.move(3, 450);
    await page.keyboard.press("Escape"); await page.waitForTimeout(600); out.afterEscape600 = await st(); await page.waitForTimeout(4000); out.afterEscape4600 = await st();
    await page.screenshot({ path: OUT + "q2-after-escape-stuck-tracking-1440-light.png" });
    await page.locator(".square-stage .demo-box").focus(); await page.keyboard.press("Home"); await page.waitForTimeout(2500); out.afterHome = await st();
    await page.screenshot({ path: OUT + "q3-after-home-1440-light.png" });
  }
  await ctx.close();
}
writeFileSync(OUT + "probe2.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1)); await b.close();
