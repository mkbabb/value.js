// X-DS · value · pass 10 cure (critic V10C, 2026-10-17) — AFTER frames for the critic's cells: the
// ten routes at 1440 and 390 in light and dark (copied from pass-09's capture-c9.mjs), plus:
//   gradient  — V10C-01: the CSS well's text and the rail's computed background-image, both read
//               for the ` in <space> [<hue> hue]` clause; then the Hue method is driven to
//               "Longer" by authoring `linear-gradient(90deg in oklch longer hue, …)` into the
//               well (the parse applies the clause to the model), and the well/rail re-read;
//   about     — V10C-02: on Home, the About card's "Components" list: per item its text, how many
//               KaTeX \text runs it carries (0 = the prose is prose), its line count, the item's
//               body family (the frames of the list are probe-v10c02.mjs's).
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c10.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, rendersJakarta, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9291";
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


const ABOUT = () => {
  const heads = [...document.querySelectorAll("h3")].filter((h) => h.textContent.trim().startsWith("Component"));
  const h = heads[0];
  let list = h?.nextElementSibling;
  while (list && !/^(OL|UL)$/.test(list.tagName)) list = list.nextElementSibling;
  if (!list) return { found: false };
  const r = list.getBoundingClientRect();
  const items = [...list.children].map((li) => {
    const lh = parseFloat(getComputedStyle(li).lineHeight) || 24;
    const p = li.querySelector("p") ?? li;
    // the value line: the paragraph after the bold label (or the label's own line)
    const ps = [...li.querySelectorAll("p")];
    const valueLine = ps.find((x) => x.querySelector(".katex")) ?? ps[0] ?? li;
    const rects = [...valueLine.getClientRects()];
    return {
      text: valueLine.textContent.replace(/\s+/g, " ").trim().slice(0, 120),
      katexTextRuns: li.querySelectorAll(".katex .text").length,
      katexCount: li.querySelectorAll(".katex").length,
      valueLines: Math.round(valueLine.getBoundingClientRect().height / (parseFloat(getComputedStyle(valueLine).lineHeight) || lh)),
      family: getComputedStyle(valueLine).fontFamily.split(",")[0],
    };
  });
  return { found: true, heading: h.textContent.trim(), box: { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }, items };
};

const GRADIENT = () => {
  const ed = [...document.querySelectorAll('[role="textbox"]')].filter((e) => /Gradient CSS/.test(e.getAttribute("aria-label") ?? "")).pop();
  const rail = document.querySelector("[data-stop-id]")?.parentElement?.closest("[style*=gradient], [class*=bar], [data-testid]") ?? null;
  const railImg = [...document.querySelectorAll("*")].map((e) => getComputedStyle(e).backgroundImage).find((b) => /^linear-gradient\(90deg/.test(b) && document.querySelector("[data-stop-id]")) ?? null;
  return { well: ed?.textContent.trim() ?? null, railHead: railImg ? railImg.slice(0, 60) : null };
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
      const o = { file, ok: true, title: await page.evaluate(TITLE, LABELS[name]) };
      if (name === "gradient") {
        o.gradient = { before: await page.evaluate(GRADIENT) };
        const ed = page.getByRole("textbox", { name: "Gradient CSS" }).last();
        await ed.click();
        await page.keyboard.press(process.platform === "darwin" ? "Meta+A" : "Control+A");
        await page.keyboard.type("linear-gradient(90deg in oklch longer hue, oklch(75% 0.15 145deg) 0%, oklch(65% 0.18 265deg) 100%)");
        await page.waitForTimeout(1200);
        await page.getByRole("heading", { name: "Gradient" }).last().click();
        await page.waitForTimeout(800);
        o.gradient.afterLonger = await page.evaluate(GRADIENT);
        o.gradient.hueSelect = await page.evaluate(() => [...document.querySelectorAll("button[role=combobox]")].map((b) => b.textContent.trim()).filter(Boolean));
        await page.screenshot({ path: path.join(OUT, `gradient-longer-${width}-${theme}.png`) });
      }
      if (name === "picker") {
        o.about = await page.evaluate(ABOUT);
        // the list clip is probe-v10c02.mjs (the list sits in a nested scroller)
      }
      if (name === "notfound") { o.plate = await page.evaluate(NOTFOUND); o.rendersJakarta = await rendersJakarta(page); }
      log(o);
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 200) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, process.env.ONLY ? `capture-c10-${process.env.ONLY}.json` : "capture-c10.json"), JSON.stringify({ base: BASE, results }, null, 1));
}
