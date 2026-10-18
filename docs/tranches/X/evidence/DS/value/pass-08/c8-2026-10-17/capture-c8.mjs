// X-DS · value · pass 8 cure (critic V8C, 2026-10-17) — AFTER frames for the critic's cells:
// every route the caption sat on (V8C-01) plus /#/nope (V8C-02/-03), at 1440 and 390 in light
// and dark. Probes:
//   title     — the route's H1s: count, text, whether it is a pane title (.pane-header-title)
//               or App's caption, its font size, and the caption's left edge against the stage
//               card's left edge; how many visible texts in <main> say the route label;
//   notfound  — the detail line's font family, the gap from the header's bottom to the glyph,
//               and the action's font size and height against the detail line's.
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c8.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "../../pass-04/redispatch-2026-10-16/harness.mjs";

const BASE = process.argv[2] || "http://localhost:9263";
const OUT = import.meta.dirname;
const CELLS = [
  ["picker", "/#/"], ["palettes", "/#/palettes"], ["browse", "/#/browse"], ["extract", "/#/extract"],
  ["mix", "/#/mix"], ["generate", "/#/generate"], ["gradient", "/#/gradient"],
  ["atmosphere", "/#/atmosphere"], ["blob", "/#/blob"], ["notfound", "/#/nope"],
];
const results = [];
const log = (o) => { results.push(o); console.log(JSON.stringify(o)); };

const TITLE = () => {
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
    action: btn && { text: btn.textContent.trim(), px: parseFloat(cs(btn).fontSize), h: Math.round(btn.getBoundingClientRect().height) },
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
      if (name === "notfound") { await page.goto(BASE + route, { waitUntil: "load", timeout: 300_000 }); await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 }); await page.waitForTimeout(5000); }
      else await bootRoute(page, BASE + route);
      await page.screenshot({ path: path.join(OUT, file) });
      const o = { file, ok: true, title: await page.evaluate(TITLE) };
      if (name === "notfound") o.plate = await page.evaluate(NOTFOUND);
      log(o);
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 200) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, "capture-c8.json"), JSON.stringify({ base: BASE, results }, null, 1));
}
