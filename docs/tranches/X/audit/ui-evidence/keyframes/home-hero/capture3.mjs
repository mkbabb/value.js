// Pass 3: fresh context per probe; URL + hero timeline for list-click and cube-drag; steady collapsed transport.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const log = { sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const bad = [];
  page.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url()); });
  await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  return { ctx, page, bad };
}
const st = (page) => page.evaluate(() => ({ url: location.hash, hero: !!document.querySelector(".hero-band"), lb: !!document.querySelector("[role=listbox]"), opts: [...document.querySelectorAll("[role=option]")].map(o => o.textContent.trim()) }));
for (const [vp, theme] of [["d", "light"], ["m", "light"], ["d", "dark"], ["m", "dark"]]) {
  const tag = `${vp === "d" ? "1440" : "390"}-${theme}`; const run = { tag };
  try {
    let { ctx, page, bad } = await fresh(vp, theme); run.bad = bad;
    const sel = page.getByLabel("Select animation").first();
    await sel.click(); run.list = [];
    for (const t of [100, 400, 1000, 2000]) { await page.waitForTimeout(t - (run.list.at(-1)?.t || 0)); run.list.push({ t, ...(await st(page)) }); if (t === 400) await page.screenshot({ path: OUT + `11-home-list-400ms-${tag}.png` }); }
    await page.screenshot({ path: OUT + `11-home-list-2000ms-${tag}.png` });
    await ctx.close();
    ({ ctx, page } = await fresh(vp, theme));
    const box = await page.evaluate(() => { const els = [...document.querySelectorAll(".scene-host *")].filter(e => { const b = e.getBoundingClientRect(); return b.width > 80 && b.width < 420 && b.height > 80; }); const e = els[0]; if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, cls: String(e.className).slice(0, 60) }; });
    run.box = box;
    if (box) {
      await page.mouse.move(box.x, box.y); await page.mouse.down();
      for (let i = 1; i <= 20; i++) { await page.mouse.move(box.x + i * 10, box.y + i * 3); await page.waitForTimeout(16); }
      run.midDrag = await st(page); await page.screenshot({ path: OUT + `12-mid-cube-drag-${tag}.png` });
      await page.mouse.up(); await page.waitForTimeout(600); run.drag600 = await st(page);
      await page.waitForTimeout(3000); run.drag3600 = await st(page);
      await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(2500);
      await page.screenshot({ path: OUT + `13-after-cube-drag-steady-${tag}.png` });
      run.transport = await page.evaluate(() => [...document.querySelectorAll("button")].filter(b => /animation/i.test(b.getAttribute("aria-label") || "") && b.getBoundingClientRect().width > 0).map(b => { const r = b.getBoundingClientRect(); return b.getAttribute("aria-label") + " " + Math.round(r.x) + "," + Math.round(r.y) + " " + Math.round(r.width) + "x" + Math.round(r.height); }));
    }
    await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 300); }
  log.runs.push(run); console.log(JSON.stringify(run));
}
await browser.close(); writeFileSync(OUT + "capture3-log.json", JSON.stringify(log, null, 2)); console.log(sha, dirty);
