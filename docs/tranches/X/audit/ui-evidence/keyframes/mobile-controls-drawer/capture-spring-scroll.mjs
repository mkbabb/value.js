// spring facet (Physics) inside the mobile drawer: scroll reach + preset-pill radii. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const sha = execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/keyframes.js status --porcelain").toString().trim().split("\n").filter(Boolean).length;
const browser = await chromium.launch({ headless: false });
const res = { sha, dirty, runs: {} };
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.mouse.move(5, 200); await page.waitForTimeout(4200);
  const b = await page.evaluate(() => { const r = document.querySelector(".glass-dock").getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  await page.mouse.click(b[0], b[1]); await page.waitForTimeout(1100);
  const t = await page.evaluate(() => { const e = [...document.querySelectorAll("[aria-label='Controls panel']")].find(x => x.getBoundingClientRect().width > 0); const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  await page.mouse.click(t[0], t[1]); await page.waitForTimeout(1400); await page.mouse.move(5, 250); await page.waitForTimeout(800);
  const steps = [];
  for (const [i, frac] of [["a", 0.5], ["b", 1]]) {
    await page.evaluate((f) => { const p = document.querySelector(".glass-drawer .controls-pane"); p.scrollTop = (p.scrollHeight - p.clientHeight) * f; }, frac); await page.waitForTimeout(700);
    const m = await page.evaluate(() => { const p = document.querySelector(".glass-drawer .controls-pane"); const px = (e) => { const r = e.getBoundingClientRect(); return { t: (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 40), y: Math.round(r.y), b: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height), r: getComputedStyle(e).borderTopLeftRadius, cls: (e.getAttribute("class") || "").slice(0, 90) }; };
      return { scrollTop: Math.round(p.scrollTop), max: p.scrollHeight - p.clientHeight, paneBottom: Math.round(p.getBoundingClientRect().bottom), vh: innerHeight,
        presets: [...p.querySelectorAll("button, [role=radio], [role=option]")].filter(e => /smooth|snappy|bouncy|gentle/i.test(e.textContent)).map(px),
        sliders: [...p.querySelectorAll("[role=slider]")].map(px), lastVisible: [...p.querySelectorAll("button,[role=slider],input,[role=radio]")].filter(e => e.getBoundingClientRect().bottom <= innerHeight).map(px).slice(-2), offscreen: [...p.querySelectorAll("button,[role=slider],input,[role=radio]")].filter(e => e.getBoundingClientRect().top >= innerHeight && e.getBoundingClientRect().width > 0).map(px) }; });
    steps.push(m); await page.screenshot({ path: OUT + `26${i}-spring-physics-scrolled-${frac}-390-${theme}.png` });
  }
  res.runs[theme] = steps; await ctx.close();
}
writeFileSync(OUT + "capture-spring-scroll.json", JSON.stringify(res, null, 1));
console.log(JSON.stringify(res).slice(0, 4000));
await browser.close();
