// FRESH CONFIRM seat — read-only re-measure of /morph findings (no mutations to app state beyond UI clicks).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const out = {};
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const [tag, vp, mobile] of [["d", { width: 1440, height: 900 }, false], ["m", { width: 390, height: 844 }, true]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3100/morph", { waitUntil: "networkidle" }); await page.waitForTimeout(1500);
  const vis = mobile ? ".mobile-info" : ".desktop-info";
  const snap = await page.evaluate((vis) => {
    const r = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
    const cs = (e, ...k) => { const s = getComputedStyle(e); return Object.fromEntries(k.map((x) => [x, s[x]])); };
    const chip = document.querySelector(vis + " .glass-chip");
    const cells = [...document.querySelectorAll(".grid-cell")];
    const grid = document.querySelector(".grid");
    const nf = document.querySelector(".number-field__input, .num-field input");
    const trig = document.querySelector("[data-slot='select-trigger'], button[role='combobox']");
    const ml = document.querySelector(vis + " .metric__label"), mv = document.querySelector(vis + " .metric__value");
    return {
      chip: { ...r(chip), ...cs(chip, "backgroundColor", "backgroundImage", "color", "borderRadius") },
      cell0: { ...r(cells[0]), ...cs(cells[0], "borderRadius") }, cells: cells.length,
      activeCell: cells.findIndex((c) => c.classList.contains("active")),
      grid: { sw: grid.scrollWidth, cw: grid.clientWidth, sbw: getComputedStyle(grid).scrollbarWidth },
      nf: nf && { ...r(nf), ...cs(nf, "borderRadius") },
      trig: trig && { ...r(trig), ...cs(trig, "fontSize", "borderRadius") },
      cardTitle: cs(document.querySelector(".config-card-title"), "fontSize", "fontWeight"),
      label: cs(document.querySelector(".config-label"), "fontSize", "fontWeight"),
      metric: ml && { label: cs(ml, "fontSize", "textTransform"), value: cs(mv, "fontSize") },
      card0y: Math.round(document.querySelector(".config-card").getBoundingClientRect().y),
      stage: r(document.querySelector(".morph-button")),
    };
  }, vis);
  // mid-morph sample
  const mid = await page.evaluate((vis) => new Promise((res) => {
    document.querySelector(".morph-button").click();
    setTimeout(() => {
      const chip = document.querySelector(vis + " .glass-chip"); const s = getComputedStyle(chip);
      const ctrl = document.querySelector(".controls-section");
      res({ t: chip.textContent.trim(), bgImg: s.backgroundImage, bg: s.backgroundColor, color: s.color,
        chipW: Math.round(chip.getBoundingClientRect().width),
        card0y: Math.round(document.querySelector(".config-card").getBoundingClientRect().y),
        disabledInControls: ctrl.querySelectorAll(":disabled,[data-disabled]").length,
        stageDisabled: document.querySelector(".morph-button").disabled });
    }, 60);
  }), vis);
  const chipBox = snap.chip;
  await page.screenshot({ path: new URL(`./${tag}-mid-chip.png`, import.meta.url).pathname, clip: { x: Math.max(0, chipBox.x - 8), y: Math.max(0, chipBox.y - 8), width: 140, height: chipBox.h + 16 } });
  await page.waitForTimeout(900);
  await page.screenshot({ path: new URL(`./${tag}-idle-chip.png`, import.meta.url).pathname, clip: { x: Math.max(0, chipBox.x - 8), y: Math.max(0, chipBox.y - 8), width: 140, height: chipBox.h + 16 } });
  out[tag] = { snap, mid };
  await ctx.close();
}
await browser.close();
writeFileSync(new URL("./probe-confirm.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
