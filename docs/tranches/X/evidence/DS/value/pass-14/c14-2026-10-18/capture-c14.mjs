// X-DS · value · pass 14 cure (critic V14C, 2026-10-18) — AFTER frames: the ten routes at 1440 and
// 390 in light and dark, plus the critic's cells, each measured:
//   gradient — V14C-01: the authoring stage disclosed; every Bezier control point's screen centre vs
//              the PLOT's viewBox->screen mapping of its (cx, cy), the plot svg vs the wrapper its
//              layers share, and the "1" label vs the plot's top-right -> tune-*;
//              V14C-02: the specimen strip's family headings and tile names (font-size, family,
//              letter-spacing, opacity, case; the name seated under its disc) -> easing-open-*;
//              V14C-03: the readout rail with the stage open (no well) and closed (well) -> tune-*.
//   picker   — V14C-04: the header readout's unit (font-variant-caps, letter-spacing, text) ->
//              about-oklch-* (header and console in one card).
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c14.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9371";
const OUT = import.meta.dirname;
const CELLS = [
  ["picker", "/#/"], ["palettes", "/#/palettes"], ["browse", "/#/browse"], ["extract", "/#/extract"],
  ["mix", "/#/mix"], ["generate", "/#/generate"], ["gradient", "/#/gradient"],
  ["atmosphere", "/#/atmosphere"], ["blob", "/#/blob"], ["notfound", "/#/nope"],
];
const results = [];
const log = (o) => { results.push(o); console.log(JSON.stringify(o)); };

const STRIP = () => {
  const row = [...document.querySelectorAll(".easing-panel .strip-row")].find((r) => r.getBoundingClientRect().height > 0);
  if (!row) return { found: false };
  const st = (el) => { const s = getComputedStyle(el); return { px: s.fontSize, ff: s.fontFamily.split(",")[0], ls: s.letterSpacing, op: s.opacity, color: s.color, tt: s.textTransform }; };
  const eyebrows = [...row.querySelectorAll(".family-eyebrow")];
  const cells = [...row.querySelectorAll(".specimen-cell")];
  const under = cells.map((c) => { const d = c.querySelector(".specimen-tile").getBoundingClientRect(), l = c.querySelector(".tile-label").getBoundingClientRect(); return { id: c.querySelector(".specimen-tile").dataset.specimen, discBottom: d.bottom, labelTop: l.top, under: l.top >= d.bottom - 0.5, insideDisc: !!c.querySelector(".specimen-tile .tile-label") }; });
  const uniq = (a) => [...new Set(a.map((x) => JSON.stringify(x)))].map((x) => JSON.parse(x));
  return {
    found: true, eyebrowText: eyebrows.map((e) => e.textContent), eyebrowStyle: uniq(eyebrows.map(st)),
    labelStyle: uniq(cells.map((c) => { const s = st(c.querySelector(".tile-label")); delete s.color; return s; })),
    cells: cells.length, labelsUnderDisc: under.filter((u) => u.under && !u.insideDisc).length,
    titles: cells.filter((c) => c.querySelector(".specimen-tile").getAttribute("title")).length,
    stripWidth: Math.round(row.getBoundingClientRect().width),
  };
};
const RAIL = () => {
  const rail = [...document.querySelectorAll(".readout-rail")].find((r) => r.getBoundingClientRect().height > 0);
  if (!rail) return { found: false };
  const s = getComputedStyle(rail);
  return { found: true, bg: s.backgroundColor, padding: s.padding, radius: s.borderTopLeftRadius, h: Math.round(rail.getBoundingClientRect().height), classes: rail.className };
};
const TUNE = () => {
  const stage = document.querySelector("#easing-authoring-0");
  const svg = stage?.querySelector('svg[role="img"][aria-label]');
  if (!svg) return { found: false };
  const wrap = svg.closest('[data-slot="easing-picker"] > div');
  const curve = svg.closest('[data-slot="easing-curve"]');
  const ctm = svg.getScreenCTM();
  const sr = svg.getBoundingClientRect(), wr = wrap.getBoundingClientRect(), cr = curve.getBoundingClientRect();
  const map = (x, y) => { const p = new DOMPoint(x, y).matrixTransform(ctm); return { x: p.x, y: p.y }; };
  const handles = [...stage.querySelectorAll('[data-slot="easing-handles"] circle[role="slider"]')].map((c) => {
    const r = c.getBoundingClientRect(), cx = c.cx.baseVal.value, cy = c.cy.baseVal.value, p = map(cx, cy);
    return { label: c.getAttribute("aria-label"), cx, cy, x: Math.round((r.left + r.width / 2) * 10) / 10, y: Math.round((r.top + r.height / 2) * 10) / 10, dx: Math.round(Math.abs(r.left + r.width / 2 - p.x) * 10) / 10, dy: Math.round(Math.abs(r.top + r.height / 2 - p.y) * 10) / 10 };
  });
  const one = [...curve.querySelectorAll(":scope > span")].pop().getBoundingClientRect();
  const c00 = map(0, 1), c11 = map(1, 0);
  return {
    found: true, stageW: Math.round(stage.getBoundingClientRect().width), svgW: Math.round(sr.width), wrapperW: Math.round(wr.width), curveRootW: Math.round(cr.width),
    svgH: Math.round(sr.height), wrapperH: Math.round(wr.height),
    corner00: { x: Math.round(c00.x), y: Math.round(c00.y) }, corner11: { x: Math.round(c11.x), y: Math.round(c11.y) }, handles,
    oneLabel: { right: Math.round(one.right), top: Math.round(one.top), plotRight: Math.round(sr.right), offPlot: Math.round(one.right - sr.right) },
    registered: handles.length === 2 && handles.every((h) => h.dx <= 1 && h.dy <= 1),
  };
};
const UNIT = () => {
  const u = [...document.querySelectorAll(".fig-unit")].find((e) => /deg/.test(e.textContent)) ?? document.querySelector(".fig-unit");
  if (!u) return { found: false };
  const s = getComputedStyle(u);
  return { found: true, text: u.textContent, caps: s.fontVariantCaps, ls: s.letterSpacing, style: s.fontStyle, color: s.color, px: s.fontSize };
};

async function pickSpace(page, label) {
  const card = page.locator(".about-card");
  await card.evaluate((el) => el.scrollTo(0, 0));
  await card.getByRole("combobox", { name: "Select color space" }).click();
  const lb = page.getByRole("listbox");
  await lb.waitFor();
  await lb.getByRole("option", { name: label, exact: true }).click();
  await lb.waitFor({ state: "hidden" });
  await page.waitForTimeout(1500);
}

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) for (const [name, route] of CELLS.filter(([n]) => !process.env.ONLY || process.env.ONLY.split(",").includes(n))) {
    const file = `${name}-${width}-${theme}.png`;
    if (process.env.FILES && !process.env.FILES.split(",").includes(file)) continue;
    let page;
    try {
      page = await newPage(browser, width, theme);
      if (name === "browse") await routeBrowseFixture(page);
      await bootRoute(page, BASE + route, { allowAlert: name === "notfound" });
      await page.screenshot({ path: path.join(OUT, file) });
      const o = { file, ok: true };
      if (name === "gradient") {
        const head = page.locator("button.interval-head").first();
        if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
        await page.waitForTimeout(800);
        await page.locator(".easing-panel").evaluate((el) => el.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(600);
        o.strip = await page.evaluate(STRIP);
        o.railClosed = await page.evaluate(RAIL);
        await page.screenshot({ path: path.join(OUT, `easing-open-${width}-${theme}.png`) });
        await page.getByRole("button", { name: "Author a custom curve" }).first().click();
        await page.waitForTimeout(1500);
        await page.locator("#easing-authoring-0").evaluate((el) => el.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(800);
        o.tune = await page.evaluate(TUNE);
        o.railOpen = await page.evaluate(RAIL);
        await page.screenshot({ path: path.join(OUT, `tune-${width}-${theme}.png`) });
      }
      if (name === "picker") {
        o.unit = { lab: await page.evaluate(UNIT) };
        await pickSpace(page, "OKLCh");
        o.unit.oklch = await page.evaluate(UNIT);
        o.consoleHue = await page.evaluate(() => [...document.querySelectorAll("main *")].filter((e) => !/^(STYLE|SCRIPT|TITLE)$/.test(e.tagName) && e.childElementCount === 0 && /^-?[\d.]+deg$/.test((e.textContent ?? "").trim())).map((e) => e.textContent.trim()).slice(0, 3));
        await page.locator(".fig-unit", { hasText: "deg" }).first().evaluate((el) => el.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(OUT, `about-oklch-${width}-${theme}.png`) });
      }
      log(o);
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 300) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, process.env.OUTJSON || (process.env.ONLY ? `capture-c14-${process.env.ONLY}.json` : "capture-c14.json")), JSON.stringify({ base: BASE, results }, null, 1));
}
