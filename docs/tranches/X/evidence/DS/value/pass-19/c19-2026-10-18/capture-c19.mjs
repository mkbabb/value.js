// X-DS · value · pass 19 cure (critic V19C, 2026-10-18; copied from pass 18 c18, same cells and paint gate) — AFTER frames: the ten routes at 1440 and
// 390 in light and dark, plus the critic's cells, each measured:
//   every cell — V16C-01: the shot is taken only after harness.paintGate passes (the first pane
//              card's box holds edges; on the bead routes, hiding the bead's canvas changes its box).
//              A cell that fails is retried (up to 3 attempts, a new context each), and its paint
//              reading and attempt count are in the manifest. pass 15's two invalid frames
//              (atmosphere-1440-light, picker-390-dark) are re-shot here under that gate;
//   gradient — V16C-02: the wrapped strip is one grid: the family heads' x positions per column
//              (shared down the strip) -> easing-open-*;
//              V16C-03: the head glyph's unit-square frame (a hairline rect, no fill) -> gradient-*.
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c19.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, paintGate, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9481";
const OUT = import.meta.dirname;
const CELLS = [
  ["picker", "/#/"], ["palettes", "/#/palettes"], ["browse", "/#/browse"], ["extract", "/#/extract"],
  ["mix", "/#/mix"], ["generate", "/#/generate"], ["gradient", "/#/gradient"],
  ["atmosphere", "/#/atmosphere"], ["blob", "/#/blob"], ["notfound", "/#/nope"],
];
// Where the hero bead is seated: the picker route at every width, and the routes that show the
// picker pane beside their own at 1440 (the critic's palettes-*, mix-*, blob-* cells). At 390 those
// routes show their own pane alone, so there is no bead in view to gate.
const HERO = new Set(["palettes", "mix", "blob"]);
const seatsBead = (name, width) => name === "picker" || (width >= 1024 && HERO.has(name));
const RESHOOT = [];
const results = [];
const log = (o) => { results.push(o); console.log(JSON.stringify(o)); };

const STRIP = () => {
  const row = [...document.querySelectorAll(".easing-panel .strip-row")].find((r) => r.getBoundingClientRect().height > 0);
  if (!row) return { found: false };
  const port = row.closest(".fading-scroll") ?? row.parentElement;
  const pr = port.getBoundingClientRect(), rr = row.getBoundingClientRect();
  const fams = [...row.querySelectorAll(".strip-family")];
  const tops = [...new Set(fams.map((f) => Math.round(f.getBoundingClientRect().top)))];
  const inPort = fams.filter((f) => { const r = f.getBoundingClientRect(); return r.left >= pr.left - 0.5 && r.right <= pr.right + 0.5; }).length;
  const lineStarts = fams.filter((f, i) => i > 0 && Math.round(f.getBoundingClientRect().top) !== Math.round(fams[i - 1].getBoundingClientRect().top)).length;
  const s = getComputedStyle(row);
  return {
    found: true, families: fams.length, lines: tops.length, familiesInPort: inPort, lineStartsAfterFirst: lineStarts,
    portW: Math.round(pr.width), stripW: Math.round(rr.width), stripH: Math.round(rr.height),
    portScrollW: port.scrollWidth, portClientW: port.clientWidth, overflowsX: port.scrollWidth > port.clientWidth + 1,
    wrap: s.flexWrap, overflow: s.overflow, names: row.querySelectorAll(".tile-label").length,
    eyebrows: [...row.querySelectorAll(".family-eyebrow")].map((e) => e.textContent),
    display: s.display, columns: s.gridTemplateColumns,
    // V16C-02: each family head's x in the port, and the distinct x set (one per grid column).
    heads: fams.map((f) => [f.querySelector(".family-eyebrow").textContent, Math.round(f.querySelector(".family-eyebrow").getBoundingClientRect().left - pr.left)]),
    headColumns: [...new Set(fams.map((f) => Math.round(f.querySelector(".family-eyebrow").getBoundingClientRect().left - pr.left)))].sort((a, b) => a - b),
    hairlines: [...new Set(fams.slice(1).map((f) => { const b = getComputedStyle(f, "::before"); return b.content === "none" ? null : Math.round(f.getBoundingClientRect().left - pr.left + parseFloat(b.left)); }).filter((x) => x !== null && x > 0))].sort((a, b) => a - b),
  };
};
const RAIL = () => {
  const rail = [...document.querySelectorAll(".readout-rail")].find((r) => r.getBoundingClientRect().height > 0);
  if (!rail) return { found: false };
  const s = getComputedStyle(rail);
  const cap = rail.querySelector(".rail-caption");
  const btn = rail.querySelector('[aria-label="Author a custom curve"]');
  const cs = cap && getComputedStyle(cap);
  return {
    found: true, bg: s.backgroundColor, padding: s.padding, h: Math.round(rail.getBoundingClientRect().height),
    literal: rail.querySelector("code")?.textContent ?? null,
    caption: cap ? { text: cap.textContent, px: cs.fontSize, color: cs.color, ariaHidden: cap.getAttribute("aria-hidden"),
      sameRow: Math.abs(cap.getBoundingClientRect().top + cap.getBoundingClientRect().height / 2 - (btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2)) <= 2 } : null,
    togglePressed: btn?.getAttribute("aria-expanded"),
  };
};
const TUNE = () => {
  const stage = document.querySelector("#easing-authoring-0");
  const svg = stage?.querySelector("svg[aria-label]");
  if (!svg) return { found: false };
  const picker = stage.querySelector('[data-slot="easing-picker"]');
  const wrap = svg.closest('[data-slot="easing-picker"] > div');
  const pr = picker.getBoundingClientRect(), ps = getComputedStyle(picker);
  const contentL = pr.left + parseFloat(ps.borderLeftWidth) + parseFloat(ps.paddingLeft);
  const contentR = pr.right - parseFloat(ps.borderRightWidth) - parseFloat(ps.paddingRight);
  const wr = wrap.getBoundingClientRect(), sr = svg.getBoundingClientRect();
  const ctm = svg.getScreenCTM();
  const handles = [...stage.querySelectorAll('[data-slot="easing-handles"] circle[role="slider"]')].map((c) => {
    const r = c.getBoundingClientRect(), p = new DOMPoint(c.cx.baseVal.value, c.cy.baseVal.value).matrixTransform(ctm);
    return { dx: Math.round(Math.abs(r.left + r.width / 2 - p.x) * 10) / 10, dy: Math.round(Math.abs(r.top + r.height / 2 - p.y) * 10) / 10 };
  });
  return {
    found: true, stageW: Math.round(pr.width), contentW: Math.round(contentR - contentL), wrapperW: Math.round(wr.width), svgW: Math.round(sr.width),
    gutterL: Math.round(wr.left - contentL), gutterR: Math.round(contentR - wr.right), handles,
    registered: handles.length === 2 && handles.every((h) => h.dx <= 1 && h.dy <= 1),
  };
};
const GLYPH = () => {
  const svg = document.querySelector("button.interval-head svg.head-glyph");
  if (!svg) return { found: false };
  const rect = svg.querySelector("rect.head-glyph-frame"), cs = rect && getComputedStyle(rect);
  return { found: true, name: svg.closest("button").textContent.replace(/\s+/g, " ").trim(), frame: !!rect,
    stroke: cs?.stroke ?? null, fill: cs?.fill ?? null, strokeWidth: cs?.strokeWidth ?? null,
    cardEdge: getComputedStyle(document.documentElement).getPropertyValue("--card-edge").trim() };
};
const DIRECTION = () => {
  const lab = [...document.querySelectorAll("main label")].find((l) => /^(Direction|From)$/.test(l.textContent.trim()));
  const v = lab?.parentElement?.querySelector("span");
  const css = [...document.querySelectorAll("main code, main pre")].map((e) => (e.textContent.match(/\d+deg/) || [])[0]).find(Boolean) ?? null;
  return { found: !!v, readout: v?.textContent.trim() ?? null, cssLiteral: css };
};

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) for (const [name, route] of CELLS.filter(([n]) => !process.env.ONLY || process.env.ONLY.split(",").includes(n))) {
    const file = `${name}-${width}-${theme}.png`;
    let lastErr = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
    let page;
    try {
      page = await newPage(browser, width, theme);
      if (name === "browse") await routeBrowseFixture(page);
      await bootRoute(page, BASE + route, { allowAlert: name === "notfound" });
      const paint = await paintGate(page, { hero: seatsBead(name, width) });
      await page.screenshot({ path: path.join(OUT, file) });
      const o = { file, ok: true, attempt, paint, reshot: false };
      if (name === "gradient") {
        o.direction = await page.evaluate(DIRECTION);
        o.glyph = await page.evaluate(GLYPH);
        const head = page.locator("button.interval-head").first();
        if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
        await page.waitForTimeout(800);
        await page.locator(".easing-panel").evaluate((el) => el.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(600);
        o.strip = await page.evaluate(STRIP);
        await page.screenshot({ path: path.join(OUT, `easing-open-${width}-${theme}.png`) });
        await page.getByRole("button", { name: "Author a custom curve" }).first().click();
        await page.waitForTimeout(1500);
        await page.locator("#easing-authoring-0").evaluate((el) => el.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(800);
        o.tune = await page.evaluate(TUNE);
        await page.screenshot({ path: path.join(OUT, `tune-${width}-${theme}.png`) });
      }
      log(o);
      lastErr = null;
      break;
    } catch (e) { lastErr = String(e).slice(0, 300); console.log(JSON.stringify({ file, attempt, retry: lastErr })); }
    finally { try { await page?.context().close(); } catch {} }
    }
    if (lastErr) log({ file, ok: false, e: lastErr });
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, process.env.OUTJSON || (process.env.ONLY ? `capture-c19-${process.env.ONLY}.json` : "capture-c19.json")), JSON.stringify({ base: BASE, results }, null, 1));
}
