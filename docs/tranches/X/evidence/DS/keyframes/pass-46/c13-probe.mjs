// X-DS keyframes pass 13 (critic C13) — falsifier + AFTER frames. Headless real Chrome only (§0ei).
// KF-C13-01  the dock's 4th (facet) item on every scene route: amiga/square/sequence keep the seat (4 items) but it is
//            BLANK — no glyph (no svg), no aria-label, no title, aria-hidden; FAIL if any item wears the dashed
//            circle-dashed glyph. The cube keeps "Matrix: select the Matrix channel" (disabled, Grid3X3); easing/spring
//            keep their live facet.
// KF-C13-G1 / G2  frames only (glass-owned rows cited O-87/O-88).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const SETTLE = 6000;
const ROUTES = ["cube", "amiga", "square", "easing", "spring", "sequence"];
const EXPECT = {
  cube: { title: "Matrix: select the Matrix channel", enabled: false },
  amiga: { title: null, enabled: false, blank: true },
  square: { title: null, enabled: false, blank: true },
  sequence: { title: null, enabled: false, blank: true },
  easing: { title: "Curve", enabled: true },
  spring: { title: "Physics", enabled: true },
};
const rep = { cells: {}, fails: [] };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      try {
        await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        const items = await page.evaluate(() => [...document.querySelectorAll("[data-dock-surface-item]")].map((el) => ({
          label: el.getAttribute("aria-label"), title: el.getAttribute("title"), surface: el.getAttribute("data-surface"),
          disabled: el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true",
          glyph: el.querySelector("svg")?.getAttribute("class") ?? null,
          ariaHidden: el.getAttribute("aria-hidden"),
        })));
        const key = `${route}-${w}-${scheme}`; rep.cells[key] = items;
        const facet = items[3];
        if (items.length) {
          if (items.length !== 4) rep.fails.push(`${key}: ${items.length} items`);
          if (items.some((i) => i.label === "Scene facet")) rep.fails.push(`${key}: 'Scene facet' jargon`);
          if (facet?.disabled && /activity/.test(facet.glyph ?? "")) rep.fails.push(`${key}: generic Activity glyph on the disabled facet`);
          if (items.some((i) => /circle-dashed/.test(i.glyph ?? ""))) rep.fails.push(`${key}: dashed-ring glyph on a dock item`);
          if (EXPECT[route].blank && (facet?.glyph !== null || facet?.label !== null || facet?.ariaHidden !== "true")) rep.fails.push(`${key}: the empty facet seat is not blank ${JSON.stringify(facet)}`);
          const e = EXPECT[route];
          if (facet?.title !== e.title || facet?.disabled === e.enabled) rep.fails.push(`${key}: facet ${JSON.stringify(facet)} != ${JSON.stringify(e)}`);
        }
        await page.screenshot({ path: path.join(OUT, `${route}-${w}-${scheme}.png`) });
        if (items.length) {
          // Expand the collapsed dock by hovering its face (the user's gesture), then frame the expanded dock.
          const face = await page.evaluate(() => { const e = [...document.querySelectorAll(".scene-mini")].find((x) => x.checkVisibility()); const b = e?.getBoundingClientRect(); return b ? { x: b.x + b.width / 2, y: b.y + b.height / 2 } : null; });
          if (face) { await page.mouse.move(face.x, face.y); await page.waitForTimeout(1200); }
          const box = await page.evaluate(() => { const its = [...document.querySelectorAll("[data-dock-surface-item]")].filter((x) => x.checkVisibility());
            let el = its[0]?.parentElement; while (el && el.getBoundingClientRect().width < 200 && el.parentElement) el = el.parentElement;
            const r = (el ?? document.body).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, visible: its.length }; });
          rep.cells[`${key}-expanded-visible`] = box.visible;
          await page.screenshot({ path: path.join(OUT, `dock-${route}-${w}-${scheme}.png`), clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 12), width: Math.min(w - Math.max(0, box.x - 12), box.width + 24), height: box.height + 24 } });
        }
      } finally { await page.close(); }
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c13-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep.fails, null, 1), Object.entries(rep.cells).map(([k, v]) => Array.isArray(v) ? `${k} ${v.length} ${JSON.stringify(v[3] ?? null)}` : `${k} ${v}`).join("\n"));
process.exit(rep.fails.length ? 1 : 0);
