// sequence-scene audit capture — READ-ONLY on the app tree; headed Chromium, real GPU.
// Writes only beside this file. Records keyframes.js HEAD sha + dirty count per run.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const log = { ...tree(), when: new Date().toISOString(), runs: [] };
const ONLY = process.argv[2];
const browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const cx = (e) => { const b = e.getBoundingClientRect(); return Math.round(b.x + b.width / 2); };
  const card = document.querySelector(".seq-target");
  const rows = [...document.querySelectorAll(".seq-row")].map(row => { const h = row.querySelector(".seq-handle"), b = row.querySelector(".seq-ball"); const cs = getComputedStyle(b); return { handleCx: cx(h), ballCx: cx(b), ballP: b.style.getPropertyValue("--ball-p"), scale: cs.scale, op: (+cs.opacity).toFixed(2), label: row.querySelector(".seq-row-label")?.textContent.trim().replace(/\s+/g, " ") }; });
  const sb = document.querySelector(".scrub-ball");
  const vis = e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.x < innerWidth && b.y < innerHeight && b.x + b.width > 0; };
  return { dark: document.documentElement.classList.contains("dark"), bodyBg: getComputedStyle(document.body).backgroundColor,
    card: r(card), cardRadius: card && getComputedStyle(card).borderRadius, cardScroll: card && [card.scrollHeight, card.clientHeight],
    stageRadius: getComputedStyle(document.querySelector(".seq-stage")).borderRadius,
    badge: (() => { const s = document.querySelector("[role=status].status-badge"); return s && { text: s.textContent.trim(), r: r(s), radius: getComputedStyle(s).borderRadius }; })(),
    metric: document.querySelector(".seq-target .readout-accent")?.textContent.trim().replace(/\s+/g, " "),
    timecode: document.querySelector(".seq-timecode")?.textContent.trim(),
    scrubBall: r(sb), rows,
    controlsTab: !!document.querySelector("[aria-label='Controls tab']"),
    visibleControls: [...document.querySelectorAll("button,[role=combobox],[role=slider],[role=tab]")].filter(vis).map(e => (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 24))),
    active: document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("aria-label") || ""), hscroll: document.documentElement.scrollWidth > innerWidth };
});
async function fresh(vp, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160) + " @" + (m.location()?.url || "").slice(-60)); });
  page.on("response", (r) => { if (r.status() >= 400) errs.push(r.status() + " " + r.url().slice(-80)); });
  await page.goto(`http://localhost:5173/#/sequence`, { waitUntil: "networkidle" });
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}, clip) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p, ...(clip ? { clip } : {}) }); run.frames.push({ frame: p, ...m, ...extra });
}
const away = (page, vp) => page.mouse.move(5, VPS[vp].height - 5);
const clickVisible = async (page, name) => { const bs = page.getByRole("button", { name, exact: true }); const n = await bs.count(); for (let i = 0; i < n; i++) if (await bs.nth(i).isVisible()) { const bb = await bs.nth(i).boundingBox(); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(700); const bb2 = await bs.nth(i).boundingBox(); await page.mouse.click(bb2.x + bb2.width / 2, bb2.y + bb2.height / 2); return [bb, bb2].map(b => b && [Math.round(b.x), Math.round(b.y)]); } return false; };
const box = async (page, sel) => page.locator(sel).first().boundingBox();

for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY !== tag) continue;
  const run = { tag, vp, ...tree(), frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await page.waitForTimeout(250); await shot(page, run, "00a-boot-250ms");
    await page.waitForTimeout(3200); await away(page, vp);
    await shot(page, run, "00b-storyboard-rest");
    // card crop (the storyboard card)
    const cb = await box(page, ".seq-target"); if (cb) await shot(page, run, "00c-card-crop", {}, { x: Math.max(0, cb.x - 12), y: Math.max(0, cb.y - 12), width: Math.min(VPS[vp].width - Math.max(0, cb.x - 12), cb.width + 24), height: Math.min(VPS[vp].height - Math.max(0, cb.y - 12), cb.height + 24) });
    // header crop — the clock Metric, reel/reset, badge
    const hb = await box(page, ".seq-target > div"); if (hb) await shot(page, run, "01-header-metric-crop", {}, { x: hb.x, y: hb.y, width: hb.width, height: hb.height });
    // top dock hover — there is no Controls tab / panel toggle
    const db = await box(page, ".glass-dock"); if (db) { await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2); await page.waitForTimeout(1100); }
    await shot(page, run, "02-top-dock-hover-no-controls");
    await away(page, vp); await page.waitForTimeout(500);
    // PLAY from the transport dock
    run.notes.play = await clickVisible(page, "Play animation"); await away(page, vp);
    await page.waitForTimeout(650); await shot(page, run, "03a-playing-650ms");
    await page.waitForTimeout(700); await shot(page, run, "03b-playing-1350ms");
    await page.waitForTimeout(1800); await shot(page, run, "03c-played-end");
    // REEL
    await page.getByRole("button", { name: /Play the reel/ }).click();
    await page.waitForTimeout(300); await shot(page, run, "04a-reel-300ms");
    await page.waitForTimeout(600); await shot(page, run, "04b-reel-900ms");
    await page.waitForTimeout(3000); await shot(page, run, "04c-reel-done");
    // ROW RE-TIME drag (row 3) — pointer
    const h3 = await box(page, ".seq-row:nth-child(3) .seq-handle");
    if (h3) {
      const x0 = h3.x + h3.width / 2, y0 = h3.y + h3.height / 2; const dx = vp === "1440" ? 180 : 70;
      await page.mouse.move(x0, y0); await page.waitForTimeout(300); await shot(page, run, "05a-row3-handle-hover");
      await page.mouse.down(); for (let i = 1; i <= 10; i++) { await page.mouse.move(x0 + dx * i / 10, y0); await page.waitForTimeout(30); }
      await shot(page, run, "05b-row3-drag-mid");
      await page.mouse.up(); await away(page, vp); await page.waitForTimeout(400); await shot(page, run, "05c-row3-retimed");
    }
    // ROW handle keyboard focus (row 2) + arrow nudge
    await page.keyboard.press("Shift"); await page.locator(".seq-row:nth-child(2) .seq-handle").focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(300);
    await shot(page, run, "05d-row2-kbd-focus-nudged");
    // RESET rows
    await page.getByRole("button", { name: /Reset the storyboard rows/ }).click(); await away(page, vp); await page.waitForTimeout(700);
    await shot(page, run, "06-reset-default-stagger");
    // MASTER SCRUBBER drag
    const sr = await box(page, ".seq-scrub");
    if (sr) {
      const y = sr.y + sr.height / 2; await page.mouse.move(sr.x + 4, y); await page.mouse.down();
      for (let i = 1; i <= 12; i++) { await page.mouse.move(sr.x + sr.width * 0.55 * i / 12, y); await page.waitForTimeout(30); }
      await shot(page, run, "07a-scrub-drag-mid");
      for (let i = 1; i <= 8; i++) { await page.mouse.move(sr.x + sr.width * (0.55 - 0.25 * i / 8), y); await page.waitForTimeout(30); }
      await shot(page, run, "07b-scrub-dragback");
      for (let i = 1; i <= 10; i++) { await page.mouse.move(sr.x + sr.width * (0.3 + 0.75 * i / 10), y); await page.waitForTimeout(30); }
      await page.mouse.up(); await away(page, vp); await page.waitForTimeout(400);
      await shot(page, run, "07c-scrub-end-p1");
    }
    await page.keyboard.press("Shift"); await page.locator(".seq-scrub").focus(); await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(200); await shot(page, run, "07d-scrub-kbd-focus");
    await page.keyboard.up("ArrowRight"); await page.locator("body").click({ position: { x: 5, y: VPS[vp].height - 5 } }).catch(() => {});
    // hover the reel button (title tooltip / hover state)
    const rb = await box(page, "button[aria-label^='Play the reel']"); if (rb) { await page.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await page.waitForTimeout(900); await shot(page, run, "08-reel-button-hover"); }
    run.notes.errs = errs; await ctx.close();
  } catch (e) { run.error = String(e).slice(0, 400); }
  log.runs.push(run); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 1));
}
await browser.close();
