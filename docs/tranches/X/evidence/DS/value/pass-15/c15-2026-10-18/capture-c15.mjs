// X-DS · value · pass 15 cure (critic V15C, 2026-10-18) — AFTER frames: the ten routes at 1440 and
// 390 in light and dark, plus the critic's cells, each measured:
//   gradient — V15C-01: the authoring stage disclosed; the capped plot box's gutters in the stage
//              (left = right at 1440; 390 unchanged) and the handles still on the plot -> tune-*;
//              V15C-02: the open rail's label (text, caption rung, muted ink) beside the pressed
//              toggle -> tune-*;
//              V15C-03: the specimen strip — wrapped lines, every family inside the port, no
//              horizontal overflow at 1440; the one scrolling line kept at 390 -> easing-open-*;
//              V15C-06: the Direction readout's unit -> gradient-*.
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c15.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9381";
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
    let page;
    try {
      page = await newPage(browser, width, theme);
      if (name === "browse") await routeBrowseFixture(page);
      await bootRoute(page, BASE + route, { allowAlert: name === "notfound" });
      await page.screenshot({ path: path.join(OUT, file) });
      const o = { file, ok: true };
      if (name === "gradient") {
        o.direction = await page.evaluate(DIRECTION);
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
      log(o);
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 300) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, process.env.OUTJSON || (process.env.ONLY ? `capture-c15-${process.env.ONLY}.json` : "capture-c15.json")), JSON.stringify({ base: BASE, results }, null, 1));
}
