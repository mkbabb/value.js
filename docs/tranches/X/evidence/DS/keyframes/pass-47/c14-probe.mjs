// X-DS keyframes pass 14 (critic C14) — falsifier + AFTER frames. Headless real Chrome only (§0ei).
// KF-C14-03  #/easing stage: every .specimen-grid holds at most 3 columns at 1440 (a family per row: each triad
//            fills one row) and exactly 2 at 390 (the KF-C4-06 floor); Standard lays out 3+2.
// KF-C14-02  #/amiga: frames only (the floor's front rule; the unit falsifier is test/demo/scenes/amiga-room.test.ts).
// KF-C14-01 / -04 / -G1  frames only (glass-owned O-87/O-88; -04 an owner composition call).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const SETTLE = 6000;
const ROUTES = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = { cells: {}, fails: [] };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      const name = route || "home";
      try {
        await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        const key = `${name}-${w}-${scheme}`;
        if (route === "easing") {
          const grids = await page.evaluate(() => [...document.querySelectorAll('[data-density="stage"] .specimen-grid')].filter((g) => g.checkVisibility()).map((g) => {
            const tiles = [...g.children].map((t) => t.getBoundingClientRect());
            const cols = new Set(tiles.map((r) => Math.round(r.x))).size;
            const rows = [...new Set(tiles.map((r) => Math.round(r.y)))].map((y) => tiles.filter((r) => Math.round(r.y) === y).length);
            return { family: g.closest(".catalogue-section")?.querySelector(".catalogue-family")?.textContent?.trim() ?? null, n: tiles.length, cols, rows, track: getComputedStyle(g).gridTemplateColumns };
          }));
          rep.cells[key] = grids;
          if (!grids.length) rep.fails.push(`${key}: no stage grid`);
          for (const g of grids) {
            if (w === 1440 && g.cols > 3) rep.fails.push(`${key}: ${g.family} ${g.cols} columns`);
            if (w === 1440 && g.n === 3 && g.rows.length !== 1) rep.fails.push(`${key}: triad ${g.family} not one row ${g.rows}`);
            if (w === 1440 && g.family === "Standard" && g.rows.join("+") !== "3+2") rep.fails.push(`${key}: Standard ${g.rows.join("+")}`);
            if (w === 390 && g.n > 1 && g.cols !== 2) rep.fails.push(`${key}: ${g.family} ${g.cols} columns at 390`);
          }
        }
        await page.screenshot({ path: path.join(OUT, `${name}-${w}-${scheme}.png`) });
        if (route) {
          const face = await page.evaluate(() => { const e = [...document.querySelectorAll(".scene-mini")].find((x) => x.checkVisibility()); const b = e?.getBoundingClientRect(); return b ? { x: b.x + b.width / 2, y: b.y + b.height / 2 } : null; });
          if (face) {
            await page.mouse.move(face.x, face.y); await page.waitForTimeout(1200);
            const box = await page.evaluate(() => { const its = [...document.querySelectorAll("[data-dock-surface-item]")].filter((x) => x.checkVisibility());
              let el = its[0]?.parentElement; while (el && el.getBoundingClientRect().width < 200 && el.parentElement) el = el.parentElement;
              const r = (el ?? document.body).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, visible: its.length }; });
            if (box.visible) await page.screenshot({ path: path.join(OUT, `dock-${name}-${w}-${scheme}.png`), clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 12), width: Math.min(w - Math.max(0, box.x - 12), box.width + 24), height: box.height + 24 } });
          }
        }
      } finally { await page.close(); }
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c14-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep.fails, null, 1));
for (const [k, v] of Object.entries(rep.cells)) console.log(k, v.map((g) => `${g.family}:${g.n}/${g.cols}c/${g.rows.join("+")}`).join(" "));
process.exit(rep.fails.length ? 1 : 0);
