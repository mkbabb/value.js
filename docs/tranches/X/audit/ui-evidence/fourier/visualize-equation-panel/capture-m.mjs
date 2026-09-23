// 390x844 pass. The Σ control is not reachable by touch at 390 (see probe-mobile*.log), so after
// recording that, the panel is opened by an INSTRUMENTED element.click() on [aria-label=Equation]
// purely to judge the panel's own rendering at 390. No API writes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const slug = readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const out = {};
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const tag = `m-${theme}`; const log = (out[tag] = []);
  await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2000);
  await page.getByRole("tab", { name: /canvas/i }).first().click(); await page.waitForTimeout(1500);
  const exp = await page.locator(".controls-dock-anchor [aria-label='Expand dock']").first().boundingBox();
  await page.touchscreen.tap(exp.x + 8, exp.y + exp.height / 2); await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + `${tag}-0-dock-expanded-500ms.png`, clip: { x: 0, y: 120, width: 390, height: 110 } });
  log.push("hit@Σ", await page.evaluate(() => { const e = document.querySelector("[aria-label='Equation']"); const b = e.getBoundingClientRect(); const h = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2); return [Math.round(b.x), h?.closest("[aria-label]")?.getAttribute("aria-label") ?? h?.className?.toString().slice(0, 40)]; }));
  await page.evaluate(() => document.querySelector("[aria-label='Equation']").click());
  await page.locator(".eq-panel").waitFor({ timeout: 8000 }); await page.waitForTimeout(1800);
  const m = () => page.evaluate(() => { const p = document.querySelector(".eq-panel"); const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
    return { panel: r(p), pills: [...p.querySelectorAll(".notation-pill")].map(r), close: r(p.querySelector("[aria-label='Close equation panel']")), num: r(p.querySelector(".inline-number input")), track: r(p.querySelector(".slider-track-host")), katex: r(p.querySelector(".eq-katex")), katexDisp: (() => { const k = p.querySelector(".katex-display"); return k && [k.scrollWidth, k.clientWidth]; })(), dock: r(document.querySelector(".controls-dock-anchor .glass-dock")), epiLabel: r([...document.querySelectorAll(".canvas-container *")].find((e) => e.childElementCount === 0 && /Epicycles/.test(e.textContent))), vw: innerWidth, sw: document.documentElement.scrollWidth }; });
  await page.screenshot({ path: OUT + `${tag}-1-open.png` }); log.push("open", await m());
  const tr = await page.locator(".eq-panel .slider-track-host").boundingBox();
  await page.touchscreen.tap(tr.x + tr.width * 0.75, tr.y + tr.height / 2); await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT + `${tag}-2-terms-scrubbed.png` }); log.push("scrubbed", await m(), await page.locator(".eq-panel [role=slider]").getAttribute("aria-valuenow"));
  await page.locator(".eq-panel .notation-pill").nth(1).tap(); await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT + `${tag}-3-notation-exp.png` }); log.push("exp", await m());
  await page.locator("[aria-label='Close equation panel']").tap(); await page.waitForTimeout(700);
  log.push("closed", await page.locator(".eq-panel").count());
  await ctx.close();
}
writeFileSync(OUT + "metrics-m.json", JSON.stringify(out, null, 1)); await browser.close(); console.log(JSON.stringify(out));
