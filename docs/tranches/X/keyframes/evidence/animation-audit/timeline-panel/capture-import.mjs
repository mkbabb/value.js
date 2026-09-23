// timeline-panel — capture-import: isolate the preview/transport wiring from the snapshot-build failure.
// Import a VALID @keyframes (space-syntax colours) through the Import dialog, then (I1) scrub frame by
// frame (51 frames) and (I2) play the transport and sample the timeline over 3 s.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const log = { prov0: { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() } };
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { window.__v = (sel) => [...document.querySelectorAll(sel)].find((e) => e.checkVisibility()); });
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(5000);
await page.mouse.move(720, 70); await page.waitForTimeout(700);
await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); await page.waitForTimeout(1500);
await page.getByRole("button", { name: /^Import$/ }).first().click(); await page.waitForTimeout(700);
const CSS = "@keyframes spin { 0% { transform: rotateX(0deg) rotateY(0deg); opacity: 1; } 50% { transform: rotateX(90deg) rotateY(45deg); opacity: 0.4; } 100% { transform: rotateX(180deg) rotateY(90deg); opacity: 1; } }";
await page.locator("[role=dialog] textarea").fill(CSS); await page.waitForTimeout(300);
await page.locator("[role=dialog]").getByRole("button", { name: /^Import$/ }).click(); await page.waitForTimeout(1500);
await page.mouse.move(1300, 850); await page.waitForTimeout(800);
const probe = () => page.evaluate(() => { const st = __v(".timeline-preview-stage"); let inst = st.__vueParentComponent; while (inst && !inst.setupState?.scrub) inst = inst.parent; const S = inst.setupState; const a = S.animation; const s = st.firstElementChild; const ph = __v(".timeline-track")?.querySelector(".bg-primary.w-0\\.5");
  return { hasAnim: !!a, err: S.buildError, targetIsSubject: a?.targets?.[0] === s, paused: a?.paused, playing: a?.playing?.() ?? null, t: a?.t, ph: ph?.style.left, inl: (s.style.transform || "").slice(0, 60), op: getComputedStyle(s).opacity, n: S.state.keyframes.length }; });
log.afterImport = await probe();
await page.screenshot({ path: OUT + "I0-after-import-full.png" });
const track = page.locator(".timeline-track:visible");
{ const D = fs.mkdirSync(OUT + "I1-scrub", { recursive: true }) && OUT + "I1-scrub/"; const idx = []; log.I1 = [];
  await track.focus(); await page.keyboard.press("Home"); await page.waitForTimeout(300);
  const clip = await page.evaluate(() => { const a = __v(".timeline-preview-stage").getBoundingClientRect(); const b = __v(".timeline-track").getBoundingClientRect(); return { x: Math.floor(a.x) - 4, y: Math.floor(a.y) - 4, width: Math.ceil(a.width) + 8, height: Math.ceil(b.bottom - a.y) + 8 }; });
  for (let i = 0; i <= 50; i++) { if (i > 0) { await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); } await page.waitForTimeout(90);
    const file = `f${String(i).padStart(3, "0")}.png`; await page.screenshot({ path: OUT + "I1-scrub/" + file, clip }); const g = await probe(); log.I1.push({ i, ph: g.ph, inl: g.inl, op: g.op }); idx.push({ i, file, label: `${i * 2}% op=${(+g.op).toFixed(2)}` }); }
  fs.writeFileSync(OUT + "I1-scrub/index.json", JSON.stringify(idx)); log.clip = clip; }
// I2: transport play — does the timeline follow?
await track.focus(); await page.keyboard.press("Home"); await page.mouse.move(1300, 850); await page.waitForTimeout(400);
log.I2_label0 = await page.locator('[aria-label="Pause animation"]:visible, [aria-label="Play animation"]:visible').first().getAttribute("aria-label");
const samp = async () => { const r = []; for (let i = 0; i < 30; i++) { r.push(await probe()); await page.waitForTimeout(100); } return { distinctPh: new Set(r.map((x) => x.ph)).size, distinctInl: new Set(r.map((x) => x.inl)).size, first: r[0], last: r.at(-1) }; };
log.I2_state0 = await samp();
for (let k = 1; k <= 2; k++) { const b = page.locator('[aria-label="Pause animation"]:visible, [aria-label="Play animation"]:visible').first(); const lab = await b.getAttribute("aria-label"); await b.click(); await page.waitForTimeout(500); await page.mouse.move(1300, 850);
  log[`I2_click${k}`] = { clicked: lab, now: await page.locator('[aria-label="Pause animation"]:visible, [aria-label="Play animation"]:visible').first().getAttribute("aria-label"), s: await samp() }; }
// the Space key (keyboard transport)
await page.mouse.click(1300, 300); await page.keyboard.press("Space"); await page.waitForTimeout(400); log.I2_space = await samp();
log.errs = errs; log.prov1 = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length };
fs.writeFileSync(OUT + "capture-import-log.json", JSON.stringify(log, null, 1));
await browser.close(); console.log("done");
