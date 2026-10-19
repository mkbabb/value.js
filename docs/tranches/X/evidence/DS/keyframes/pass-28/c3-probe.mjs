// X-DS keyframes r6 pass 3 cure (critic C3) — AFTER probe. Headless real Chrome only (§0ei).
// KF-C3-01: #/sequence — lane 1 sits one rhythm gap under the title row; no band above lane 1 /
//           under lane 5 larger than the lane gap (the free height goes into the pitch).
// KF-C3-04: #/spring — the partner readout (velocity) sits a fixed gap after position, on its row.
// KF-C3-03: #/spring — the rail's quarter ticks' computed background (the census reading).
// KF-C3-05: frames for every scene at 1440 and 390, light and dark, from the served tree.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const FRAMES = process.env.FRAMES !== "0";
const ROUTES = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { sequence: {}, spring: {}, fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
      const page = await ctx.newPage();
      for (const r of ROUTES) {
        await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        const cell = `${r || "home"}-${w}-${scheme}`;
        if (r === "sequence") {
          const m = await page.evaluate(() => {
            const card = document.querySelector(".seq-target"); const head = card.querySelector("[data-scene-stage-header]");
            const rows = [...card.querySelectorAll(".seq-row")].map((e) => e.getBoundingClientRect());
            const cr = card.getBoundingClientRect(); const hr = head.getBoundingClientRect();
            const gaps = rows.slice(1).map((b, i) => b.top - rows[i].bottom);
            return { titleBottom: hr.bottom, lane1Top: rows[0].top, lane5Bottom: rows.at(-1).bottom, cardBottom: cr.bottom,
              above: rows[0].top - hr.bottom, below: cr.bottom - rows.at(-1).bottom, gap: gaps[0], laneH: rows[0].height,
              rowGap: getComputedStyle(card.querySelector(".seq-rows")).rowGap };
          });
          report.sequence[cell] = m;
          if (m.above > 32) fail("KF-C3-01", cell, `band above lane 1 = ${m.above.toFixed(1)}`);
          if (m.below > Math.max(48, m.gap + 32)) fail("KF-C3-01", cell, `band under lane 5 = ${m.below.toFixed(1)} (gap ${m.gap.toFixed(1)})`);
        }
        if (r === "spring") {
          const m = await page.evaluate(() => {
            const prim = document.querySelector("[data-readout=primary]").closest(".stage-readout").getBoundingClientRect();
            const sec = document.querySelector(".spring-readout-secondary").closest(".stage-readout").getBoundingClientRect();
            const title = document.querySelector("[data-scene-stage-header] h2").getBoundingClientRect();
            const tr = document.querySelector(".spring-track.stage-field-x");
            return { title: { x: title.left, bottom: title.bottom }, primary: { x: prim.left, right: prim.right, y: prim.top, bottom: prim.bottom },
              secondary: { x: sec.left, y: sec.top, bottom: sec.bottom }, gapX: sec.left - prim.right,
              ticks: tr ? getComputedStyle(tr).backgroundImage : null };
          });
          report.spring[cell] = m;
          if (!(m.gapX > 0 && m.gapX <= 32)) fail("KF-C3-04", cell, `partner gap ${m.gapX.toFixed(1)}`);
          if (Math.abs(m.primary.x - m.title.x) > 1) fail("KF-C3-04", cell, `primary x ${m.primary.x} vs title ${m.title.x}`);
        }
        if (FRAMES) await page.screenshot({ path: path.join(OUT, `${cell}.png`) });
      }
      await ctx.close();
    }
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, process.env.JSON ?? "c3-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ fails: report.fails, seq: Object.fromEntries(Object.entries(report.sequence).map(([k, v]) => [k, [v.above, v.gap, v.below].map((n) => Math.round(n))])), spring: Object.fromEntries(Object.entries(report.spring).map(([k, v]) => [k, Math.round(v.gapX)])), ticks: Object.values(report.spring)[0]?.ticks }, null, 1));
