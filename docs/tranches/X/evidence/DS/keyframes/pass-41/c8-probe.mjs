// X-DS keyframes r7 pass 8 — the cure seat's served falsifier for KF-C8r-01 and -02, plus the AFTER frames. Headless real Chrome only (§0ei).
// KF-C8r-01  the Keyframes well's line numbers take --muted-foreground, the active number the structure ink, the indent guides --border (no stock teal/navy/#D3D3D3/#858585/#404040).
// KF-C8r-02  the Square readout pairs stand 1.5rem apart (Spring's gap-x-6); inside a pair the label sits 0.5rem from its value.
// KF-C8r-03  (refused as an owner layout ruling) frames only: square at 390.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const rep = { cells: {}, fails: [] };
const fail = (id, cell, why) => rep.fails.push(`${id} ${cell}: ${why}`);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const painted = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const open = async (ctx, route, surface) => {
  const page = await ctx.newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  if (surface) await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, route, surface]);
  await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE); await painted(page);
  return page;
};
const STOCK = ["rgb(35, 120, 147)", "rgb(11, 33, 108)", "rgb(211, 211, 211)", "rgb(133, 133, 133)", "rgb(64, 64, 64)", "rgb(198, 198, 198)", "rgb(112, 112, 112)"];
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    const cell = (n) => `${n}-${w}-${scheme}`;
    let page = await open(ctx, "square", "controls");
    let m = await page.evaluate(() => {
      const rows = [...document.querySelectorAll(".square-telemetry-axes .stage-readout")];
      const R = (e) => e.getBoundingClientRect();
      const [a, b] = rows; const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return { pairGap: +((R(b).left - R(a).right) / rem).toFixed(3), innerGap: +((R(a.lastElementChild).left - R(a.firstElementChild).right) / rem).toFixed(3),
        plate: [Math.round(R(document.querySelector(".square-stage")).top), Math.round(R(document.querySelector(".square-stage")).bottom)], field: Math.round(R(document.querySelector(".square-field")).width) };
    });
    rep.cells[cell("square")] = m;
    if (Math.abs(m.pairGap - 1.5) > 0.02 || Math.abs(m.innerGap - 0.5) > 0.02) fail("KF-C8r-02", cell("square"), JSON.stringify(m));
    await page.screenshot({ path: path.join(OUT, `${cell("square")}.png`) }); await page.close();
    page = await open(ctx, "spring");
    await page.screenshot({ path: path.join(OUT, `${cell("spring")}.png`) }); await page.close();
    if (w === 1440) {
      page = await open(ctx, "square", "keyframes");
      await page.waitForSelector(".monaco-editor .line-numbers", { timeout: 15000 }).catch(() => {});
      await page.evaluate(() => { const e = document.querySelector(".monaco-editor textarea"); e?.focus(); });
      await painted(page);
      m = await page.evaluate(() => {
        const ink = (css) => { const p = document.createElement("div"); p.style.color = css; document.body.appendChild(p); const c = getComputedStyle(p).color; p.remove(); return c; };
        const nums = [...document.querySelectorAll(".monaco-editor .line-numbers")];
        const guides = [...document.querySelectorAll(".monaco-editor .core-guide")];
        const gcol = (g) => { const cs = getComputedStyle(g); return cs.boxShadow !== "none" ? cs.boxShadow.match(/rgba?\([^)]*\)/)?.[0] : cs.backgroundColor; };
        return { want: { numeral: ink("var(--muted-foreground)"), rule: ink("var(--border)") },
          numerals: [...new Set(nums.filter((n) => !n.classList.contains("active-line-number")).map((n) => getComputedStyle(n).color))],
          active: [...new Set(nums.filter((n) => n.classList.contains("active-line-number")).map((n) => getComputedStyle(n).color))],
          guides: [...new Set(guides.map(gcol))], nNums: nums.length, nGuides: guides.length };
      });
      rep.cells[cell("square-keyframes")] = m;
      const all = [...m.numerals, ...m.active, ...m.guides];
      if (!m.nNums || all.some((c) => STOCK.includes(c)) || !m.numerals.every((c) => c.startsWith(m.want.numeral.replace(/\)$/, "")))) fail("KF-C8r-01", cell("square-keyframes"), JSON.stringify(m));
      await page.screenshot({ path: path.join(OUT, `${cell("square-keyframes")}.png`) }); await page.close();
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c8-probe.json"), JSON.stringify(rep, null, 1));
console.log(JSON.stringify(rep, null, 1));
