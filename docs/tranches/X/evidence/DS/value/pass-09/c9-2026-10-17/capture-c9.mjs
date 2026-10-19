// X-DS · value · pass 9 cure (critic V9C, 2026-10-17) — AFTER frames for the critic's cells: the
// ten routes at 1440 and 390 in light and dark (copied from pass-08's capture-c8.mjs). V9C-01: the
// title probe reads the palettes H1 (now the "My Palettes" pane title). V9C-03: the Not Found cells
// boot through the harness's Jakarta render gate with `allowAlert` (no cold goto), and the plate
// probe reads the action's computed family and whether the page renders Jakarta. Probes:
//   title     — the route's H1s: count, text, whether it is a pane title (.pane-header-title)
//               or App's caption, its font size, and the caption's left edge against the stage
//               card's left edge; how many visible texts in <main> say the route label;
//   notfound  — the detail line's font family, the gap from the header's bottom to the glyph,
//               and the action's font size and height against the detail line's.
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c9.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, rendersJakarta, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9271";
const OUT = import.meta.dirname;
const CELLS = [
  ["picker", "/#/"], ["palettes", "/#/palettes"], ["browse", "/#/browse"], ["extract", "/#/extract"],
  ["mix", "/#/mix"], ["generate", "/#/generate"], ["gradient", "/#/gradient"],
  ["atmosphere", "/#/atmosphere"], ["blob", "/#/blob"], ["notfound", "/#/nope"],
];
const LABELS = { picker: "Home", palettes: "Palettes", browse: "Browse", extract: "Extract", mix: "Mix", generate: "Generate",
  gradient: "Gradient", atmosphere: "Atmosphere", blob: "Blob", notfound: "Not Found" };
const results = [];
const log = (o) => { results.push(o); console.log(JSON.stringify(o)); };

const TITLE = (viewLabel) => {
  const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"; };
  const main = document.querySelector('main[aria-labelledby="route-title"]');
  const h1s = [...document.querySelectorAll("h1")].filter(vis);
  const h1 = h1s[0];
  const label = h1?.textContent.trim() ?? null;
  const stage = document.querySelector(".pane-wrapper--stage .card");
  const sr = stage?.getBoundingClientRect(), hr = h1?.getBoundingClientRect();
  const sayings = label ? [...(main?.querySelectorAll("*") ?? [])].filter((el) => vis(el) && el.children.length === 0 && el.textContent.trim() === label).length : 0;
  return {
    h1Count: h1s.length, label, id: h1?.id ?? null, inMain: !!(main && h1 && main.contains(h1)),
    paneTitle: !!h1?.classList.contains("pane-header-title"), caption: !!h1?.classList.contains("route-title"),
    fontPx: h1 ? parseFloat(getComputedStyle(h1).fontSize) : null, tabindex: h1?.getAttribute("tabindex") ?? null,
    h1Left: hr ? Math.round(hr.left) : null, h1TextAlign: h1 ? getComputedStyle(h1).textAlign : null,
    stageCardLeft: sr ? Math.round(sr.left) : null, labelSaidInMain: sayings,
    // V9C-01: the VIEW's label (VIEW_MAP) said by visible leaves in <main> outside the H1, and
    // which region holds the H1 (stage / inspector / none = App's caption).
    viewLabel, viewLabelOutsideH1: viewLabel ? [...(main?.querySelectorAll("*") ?? [])].filter((el) => vis(el) && el.children.length === 0 && el.textContent.trim() === viewLabel && !h1?.contains(el)).length : 0,
    h1Region: h1?.closest(".pane-wrapper")?.className.match(/pane-wrapper--(\w+)/)?.[1] ?? "none",
  };
};

const NOTFOUND = () => {
  const plate = document.querySelector('.pane-wrapper [role="alert"]');
  const head = document.querySelector(".pane-wrapper .pane-header");
  const glyph = plate?.querySelector("svg");
  const ps = plate ? [...plate.querySelectorAll("p")] : [];
  const detail = ps[1], btn = plate?.querySelector("button");
  const cs = (el) => el && getComputedStyle(el);
  const card = document.querySelector(".pane-wrapper .card")?.getBoundingClientRect();
  return {
    headerBottom: head && Math.round(head.getBoundingClientRect().bottom),
    glyphTop: glyph && Math.round(glyph.getBoundingClientRect().top),
    plateTopPad: plate && cs(plate).paddingTop,
    cardH: card && Math.round(card.height),
    detail: detail && { text: detail.textContent.trim(), family: cs(detail).fontFamily.split(",")[0], px: parseFloat(cs(detail).fontSize) },
    action: btn && { text: btn.textContent.trim(), family: cs(btn).fontFamily.split(",")[0], px: parseFloat(cs(btn).fontSize), weight: cs(btn).fontWeight, h: Math.round(btn.getBoundingClientRect().height) },
  };
};

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) for (const [name, route] of CELLS) {
    const file = `${name}-${width}-${theme}.png`;
    let page;
    try {
      page = await newPage(browser, width, theme);
      if (name === "browse") await routeBrowseFixture(page);
      await bootRoute(page, BASE + route, { allowAlert: name === "notfound" });
      await page.screenshot({ path: path.join(OUT, file) });
      const o = { file, ok: true, title: await page.evaluate(TITLE, LABELS[name]) };
      if (name === "notfound") { o.plate = await page.evaluate(NOTFOUND); o.rendersJakarta = await rendersJakarta(page); }
      log(o);
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 200) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, "capture-c9.json"), JSON.stringify({ base: BASE, results }, null, 1));
}
