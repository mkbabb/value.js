// X-DS keyframes pass 11 (critic C11) — falsifier + AFTER frames. Headless real Chrome only (§0ei).
// KF-C11-01  no infinite animation runs inside the code well of the inactive (force-mounted, hidden) Keyframes pane
//            on any scene route: FAIL if a running skeleton-breathe (or any infinite animation) targets an element in .code-well
//            while the pane is inactive, or if a Skeleton is mounted in that well at all (it was, at f266ed44). Also tallies every infinite running animation on the page for the census row.
// KF-C11-02 / G1  frames only (cosmetic note; glass-owned rows cited O-87/O-88).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const SETTLE = 6000;
const ROUTES = ["cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = { cells: {}, fails: [] };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      try {
        await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        const cell = await page.evaluate(() => {
          const loops = document.getAnimations().filter((a) => a.playState === "running" && a.effect?.getComputedTiming?.().iterations === Infinity);
          const inWell = loops.filter((a) => a.effect?.target?.closest?.(".code-well"));
          const wells = [...document.querySelectorAll(".code-well")].map((w) => ({
            inactivePane: !!w.closest(".monaco-pane.inactive"),
            busy: !!w.querySelector("[aria-busy='true']"),
            editor: !!w.querySelector(".monaco-editor"),
            skeletons: w.querySelectorAll(".skeleton").length,
          }));
          return {
            loops: loops.length,
            loopNames: [...new Set(loops.map((a) => a.animationName || a.id || "anon"))],
            inWell: inWell.map((a) => a.animationName),
            wells,
          };
        });
        const key = `${route}-${w}-${scheme}`; rep.cells[key] = cell;
        if (cell.wells.some((x) => x.inactivePane && x.skeletons)) rep.fails.push(`${key}: Skeleton mounted in the inactive pane's well`);
        if (cell.inWell.length && cell.wells.some((x) => x.inactivePane)) rep.fails.push(`${key}: well loops ${JSON.stringify(cell.inWell)}`);
        await page.screenshot({ path: path.join(OUT, `${route}-${w}-${scheme}.png`) });
      } finally { await page.close(); }
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c11r-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep.fails), Object.entries(rep.cells).map(([k, v]) => `${k} loops=${v.loops} well=${v.inWell.length} ${v.loopNames.join(",")}`).join("\n"));
process.exit(rep.fails.length ? 1 : 0);
