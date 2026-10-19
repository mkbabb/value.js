// X-DS keyframes r7 pass 15 (critic C15) — falsifier + AFTER frames. Headless real Chrome only (§0ei).
// KF-C15-01  #/spring Physics presets: the selected tile's outline is SOLID (the selected-specimen grammar);
//            the dashed stroke stays the final-state / target ghost's alone. Hover's outline is solid too.
// KF-C15-02 / -03 / -G1  frames only (owner composition calls; glass-owned O-87/O-88).
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
        if (route === "spring") {
          const cells = await page.evaluate(() => [...document.querySelectorAll(".preset-cell")].map((c) => {
            const s = getComputedStyle(c); return { label: c.textContent.trim().split(/\s+/)[0], state: c.getAttribute("data-state"), style: s.outlineStyle, color: s.outlineColor, bg: s.backgroundColor, visible: c.checkVisibility() };
          }));
          rep.cells[key] = cells;
          const vis = cells.filter((c) => c.visible);
          if (!vis.length) rep.fails.push(`${key}: no visible preset cell`);
          else if (!vis.some((c) => c.state === "on")) rep.fails.push(`${key}: no selected preset`);
          for (const c of vis) if (c.style !== "solid") rep.fails.push(`${key}: ${c.label} (${c.state}) outline ${c.style}`);
          const off = await page.$('.preset-cell[data-state="off"]');
          if (off && (await off.isVisible())) {
            await off.hover(); await page.waitForTimeout(400);
            const hs = await off.evaluate((c) => getComputedStyle(c).outlineStyle);
            rep.cells[`${key}-hover`] = hs; if (hs !== "solid") rep.fails.push(`${key}: hover outline ${hs}`);
            await page.mouse.move(1, 1); await page.waitForTimeout(400);
          }
        }
        await page.screenshot({ path: path.join(OUT, `${name}-${w}-${scheme}.png`) });
        if (route === "spring") {
          const r = await page.evaluate(() => { const c = [...document.querySelectorAll(".preset-cell")].filter((x) => x.checkVisibility()); if (!c.length) return null;
            const g = c[0].parentElement.getBoundingClientRect(); return { x: g.x, y: g.y, width: g.width, height: g.height }; });
          if (r && r.y >= 0 && r.y + r.height <= h) await page.screenshot({ path: path.join(OUT, `crop-spring-presets-${w}-${scheme}.png`), clip: { x: Math.max(0, r.x - 12), y: Math.max(0, r.y - 12), width: Math.min(w - Math.max(0, r.x - 12), r.width + 24), height: Math.min(h - Math.max(0, r.y - 12), r.height + 24) } });
        }
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
fs.writeFileSync(path.join(HERE, "c15-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep.fails, null, 1));
for (const [k, v] of Object.entries(rep.cells)) console.log(k, Array.isArray(v) ? v.map((c) => `${c.label}:${c.state}/${c.style}`).join(" ") : v);
process.exit(rep.fails.length ? 1 : 0);
