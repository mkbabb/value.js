// X-DS fourier pass 15 cure (F15X): AFTER frames + computed reads for DS-F15X-C1 (indeterminate Progress variant),
// C2 (the Easing row's grammar at the DS-F7X-C2 gate) and T1 (the sticky band's rule). Headless real Chrome (§0ei).
// usage: BASE=http://localhost:3135 node f15x-probe.mjs <outDir> <sampleImage>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const IMG = process.argv[3]; const BASE = process.env.BASE ?? "http://localhost:3135";
const out = {};
const hang = () => new Promise(() => {});

const readBars = (p) => p.evaluate(() => [...document.querySelectorAll('[data-slot="progress"]')].map((r) => {
  const f = r.querySelector(".progress-value-fill"); const a = getComputedStyle(r, "::after");
  return { cls: r.className, variant: r.dataset.variant, railBg: getComputedStyle(r).backgroundColor,
    fillClasses: f?.className, fillBg: f && getComputedStyle(f).backgroundColor, fillShadow: f && getComputedStyle(f).boxShadow,
    sweep: a.backgroundImage.slice(0, 120), sweepBlend: a.mixBlendMode, sweepAnim: a.animationName };
}));

const readMorph = (p) => p.evaluate(() => [...document.querySelectorAll(".config-card")].map((c) => {
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  return { card: box(c), durLabel: box(c.querySelector(".control-row-label")), durField: box(c.querySelector(".control-row-field")),
    easeLabel: box(c.querySelector(".config-label")), easeSelect: box(c.querySelector(".config-select")) };
}));
const readBand = (p) => p.evaluate(() => { const s = document.querySelector(".stage-column"); if (!s) return null; const cs = getComputedStyle(s);
  return { position: cs.position, rule: `${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`, bg: cs.backgroundColor }; });

const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of ["light", "dark"]) {
    const ctxOf = (w) => b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    const init = (ctx) => ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const run = async (k, w, fn) => { const ctx = await ctxOf(w); await init(ctx); const p = await ctx.newPage();
      try { await p.mouse.move(0, 0).catch(() => {}); await fn(p); } catch (e) { out[k + "-err"] = e.message.slice(0, 300); } finally { await ctx.close(); } };

    for (const w of [1440]) {
      // C1 — the cold state (at 390 the canvas panel is the inactive tab, so the cell is 1440): no prior result, the compute held open.
      await run(`equation-computing-${theme}-${w}`, w, async (p) => {
        await p.route("**/api/equations/compute", hang);
        await p.goto(BASE + "/equation", { waitUntil: "domcontentloaded", timeout: 90000 });
        await p.locator(".eq-state-bar").first().waitFor({ timeout: 30000 }); await p.waitForTimeout(1200);
        out[`equation-computing-${theme}-${w}`] = await readBars(p);
        await p.screenshot({ path: `${OUT}/equation-computing-${theme}-${w}.png` });
      });
    }
    // C1 — the status pill: a result on screen, then a recompute held open.
    await run(`equation-recompute-${theme}-1440`, 1440, async (p) => {
      await p.goto(BASE + "/equation", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.locator(".eq-card, .katex").first().waitFor({ timeout: 60000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(1500);
      await p.route("**/api/equations/compute", hang);
      await p.getByRole("button", { name: /^compute/i }).first().click();
      await p.locator(".eq-status-bar").first().waitFor({ timeout: 15000 }); await p.waitForTimeout(1200);
      out[`equation-recompute-${theme}-1440`] = await readBars(p);
      await p.screenshot({ path: `${OUT}/equation-recompute-${theme}-1440.png` });
      await p.locator(".eq-status").first().screenshot({ path: `${OUT}/equation-recompute-${theme}-1440-pill.png` });
    });
    // C1 — /visualize: an upload whose compute is held open, so the stage's busy bar shows.
    await run(`visualize-busy-${theme}-1440`, 1440, async (p) => {
      await p.route(/\/compute\/(epicycles|bases)$/, hang);
      await p.goto(BASE + "/visualize", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.getByTestId("image-file-input").setInputFiles(IMG);
      await p.locator(".stage-busy-bar").first().waitFor({ timeout: 60000 }); await p.waitForTimeout(1200);
      out[`visualize-busy-${theme}-1440`] = await readBars(p);
      await p.screenshot({ path: `${OUT}/visualize-busy-${theme}-1440.png` });
    });
    // C2 + T1 — /morph.
    for (const w of [1440, 1024, 390]) {
      const k = `morph-${theme}-${w}`;
      await run(k, w, async (p) => {
        await p.goto(BASE + "/morph", { waitUntil: "domcontentloaded", timeout: 90000 });
        await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(3000);
        await p.screenshot({ path: `${OUT}/${k}-stage.png` });
        await p.locator(".config-card").first().scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
        out[k] = { cards: await readMorph(p), band: await readBand(p) };
        await p.screenshot({ path: `${OUT}/${k}-cards.png` });
        if (w === 390) { await p.locator(".levels-card").scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}/${k}-levels.png` }); }
      });
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f15x-probe.json`, JSON.stringify(out, null, 1)); }
