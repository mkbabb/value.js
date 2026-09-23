// Pass 2: home-list open (no Play), drag ON the cube, 404 origin, URL after Play.
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
for (const theme of ["light", "dark"]) for (const vp of ["d", "m"]) {
  const tag = `${vp === "d" ? "1440" : "390"}-${theme}`; const run = { tag };
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const bad = [];
  page.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url()); });
  await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  // home list open
  const sel = page.getByLabel("Select animation").first();
  await sel.click(); await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + `08-home-list-open-${tag}.png` });
  run.homeOptions = await page.evaluate(() => [...document.querySelectorAll("[role=option],[role=menuitem]")].map(o => o.textContent.trim()));
  // pick the second option if any
  const opt = page.getByRole("option").nth(1);
  if (await opt.isVisible().catch(() => false)) { await opt.click(); await page.waitForTimeout(1200); run.urlAfterPick = page.url(); run.heroAfterPick = await page.evaluate(() => !!document.querySelector(".hero-band")); await page.screenshot({ path: OUT + `09-home-after-pick-${tag}.png` }); }
  else await page.keyboard.press("Escape");
  // fresh: drag on the cube face centre
  await page.goto("about:blank"); await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  const box = await page.evaluate(() => { const c = document.querySelector(".scene-host [class*=cube], .scene-host .cube, .scene-host"); const els = [...document.querySelectorAll(".scene-host *")].filter(e => { const b = e.getBoundingClientRect(); return b.width > 80 && b.width < 400 && b.height > 80; }); const b = (els[0] || c).getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, cls: String((els[0] || c).className).slice(0, 80) }; });
  run.dragBox = box;
  await page.mouse.move(box.x, box.y); await page.mouse.down();
  for (let i = 1; i <= 20; i++) { await page.mouse.move(box.x + i * 10, box.y + i * 3); await page.waitForTimeout(16); }
  await page.mouse.up(); await page.waitForTimeout(1500);
  run.heroAfterCubeDrag = await page.evaluate(() => !!document.querySelector(".hero-band")); run.urlAfterDrag = page.url();
  await page.screenshot({ path: OUT + `10-after-cube-drag-${tag}.png` });
  // play -> URL
  const play = page.getByRole("button", { name: /Play animation/ }).first();
  await play.click(); await page.waitForTimeout(1500); run.urlAfterPlay = page.url();
  run.bad = bad; log.runs.push(run); console.log(JSON.stringify(run));
  await ctx.close();
}
await browser.close(); writeFileSync(OUT + "capture2-log.json", JSON.stringify(log, null, 2)); console.log(sha, dirty);
