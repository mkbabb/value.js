// X-DS · value · pass 12 cure (critic V12C, 2026-10-18) — AFTER frames: the ten routes at 1440 and
// 390 in light and dark, plus the critic's cells, each measured:
//   gradient — V12C-01: Generate's default 5 stops (and 8) authored into the CSS well; the well
//              must not scroll (scrollHeight <= clientHeight + 1, overflow-y visible) and its
//              last text line (the closing ")") must sit inside the well's box -> well5-*, well8-*;
//   blob     — V12C-02: the config well's fold: the last candidate fully inside the port, and
//              whether the port ends on a section head with none of its rows -> blob-*;
//   picker   — V12C-03/04/05: About in lab and LCh: inline-code chips inside <strong> vs <p>
//              (padding-inline + colour), accent chips per Components item, and no "Attributes"
//              heading -> about-<space>-*.
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c12.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9331";
const OUT = import.meta.dirname;
const CELLS = [
  ["picker", "/#/"], ["palettes", "/#/palettes"], ["browse", "/#/browse"], ["extract", "/#/extract"],
  ["mix", "/#/mix"], ["generate", "/#/generate"], ["gradient", "/#/gradient"],
  ["atmosphere", "/#/atmosphere"], ["blob", "/#/blob"], ["notfound", "/#/nope"],
];
const results = [];
const log = (o) => { results.push(o); console.log(JSON.stringify(o)); };
const SEL_ALL = process.platform === "darwin" ? "Meta+A" : "Control+A";
const STOPS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black"];
const grad = (n) => `linear-gradient(90deg, ${STOPS.slice(0, n).map((c, i) => `${c} ${Math.round((100 * i) / (n - 1))}%`).join(", ")})`;

const WELL = () => {
  const ed = [...document.querySelectorAll('[role="textbox"]')].filter((e) => /Gradient CSS/.test(e.getAttribute("aria-label") ?? "")).pop();
  if (!ed) return { found: false };
  const cs = getComputedStyle(ed), r = ed.getBoundingClientRect();
  const range = document.createRange(); range.selectNodeContents(ed);
  const rects = [...range.getClientRects()];
  const lastBottom = rects.length ? Math.max(...rects.map((x) => x.bottom)) : null;
  let scroller = 0;
  for (let p = ed; p; p = p.parentElement) { const o = getComputedStyle(p).overflowY; if (/(auto|scroll)/.test(o) && p.scrollHeight > p.clientHeight + 1) scroller++; }
  return {
    found: true, text: ed.textContent, lines: ed.textContent.split("\n").length,
    scrollHeight: ed.scrollHeight, clientHeight: ed.clientHeight, overflowY: cs.overflowY, maxHeight: cs.maxHeight,
    wellBottom: Math.round(r.bottom), lastTextBottom: lastBottom && Math.round(lastBottom),
    lastLineInside: lastBottom != null && lastBottom <= r.bottom - parseFloat(cs.paddingBottom) + 1,
    overflowingScrollersAround: scroller,
  };
};

const FOLD = () => {
  const body = document.querySelector(".config-console")?.closest("[class*=px-4]");
  const port = body?.parentElement;
  if (!port) return { found: false };
  const pr = port.getBoundingClientRect();
  const cands = [...body.querySelectorAll(".configurator-row, .config-section-title")].map((el) => {
    const r = el.getBoundingClientRect();
    return { head: el.classList.contains("config-section-title"), text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 30), top: r.top - pr.top, bottom: r.bottom - pr.top };
  });
  const inside = cands.filter((c) => c.bottom <= pr.height + 0.5);
  const last = inside[inside.length - 1];
  return {
    found: true, portH: Math.round(pr.height), scrolls: port.scrollHeight > port.clientHeight + 1,
    lastWhole: last && { head: last.head, text: last.text, bottom: Math.round(last.bottom) },
    orphanHead: !!last?.head && port.scrollHeight > port.clientHeight + 1,
    footerMarginTop: getComputedStyle(document.querySelector(".config-action-bar") ?? document.body).marginBlockStart,
  };
};

const ABOUT = () => {
  const card = document.querySelector(".about-card");
  const md = card?.querySelector(".markdown-body");
  if (!md) return { found: false };
  const chip = (c) => { const s = getComputedStyle(c); return { text: c.textContent, parent: c.parentElement.tagName, pl: s.paddingLeft, color: s.color, px: s.fontSize }; };
  const strongChips = [...md.querySelectorAll("strong > code")].map(chip);
  const proseChips = [...md.querySelectorAll("p > code, li > code")].map(chip);
  const h3s = [...md.querySelectorAll("h3")].map((h) => h.textContent.trim());
  const comp = [...md.querySelectorAll("h3")].find((h) => /^Components?$/.test(h.textContent.trim()));
  let list = comp?.nextElementSibling;
  while (list && !/^(OL|UL)$/.test(list.tagName)) list = list.nextElementSibling;
  const items = list ? [...list.children].map((li) => ({
    text: li.textContent.replace(/\s+/g, " ").trim().slice(0, 110),
    codeChips: li.querySelectorAll("code").length,
    numeralChips: [...li.querySelectorAll("code")].filter((c) => /^[\d.–-]+$/.test(c.textContent.trim())).length,
  })) : [];
  const uniq = (a, k) => [...new Set(a.map((x) => x[k]))];
  return {
    found: true, space: card.querySelector("[data-space-facts]")?.getAttribute("data-space-facts"),
    h3s, hasAttributes: h3s.includes("Attributes"),
    strong: { n: strongChips.length, pl: uniq(strongChips, "pl"), color: uniq(strongChips, "color") },
    prose: { n: proseChips.length, pl: uniq(proseChips, "pl"), color: uniq(proseChips, "color") },
    oneRegister: strongChips.length > 0 && proseChips.length > 0 && strongChips.every((s) => s.pl === proseChips[0].pl && s.color === proseChips[0].color),
    items,
  };
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
async function frameComponents(page, file) {
  // centre the Components list (its head and first items in view) inside the card's own scroller
  await page.locator(".about-card h3", { hasText: /^Components?$/ }).first().evaluate((h) => {
    let l = h.nextElementSibling; while (l && !/^(OL|UL)$/.test(l.tagName)) l = l.nextElementSibling;
    (l ?? h).scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, file) });
}

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
        o.well = {};
        for (const n of [5, 8]) {
          const ed = page.getByRole("textbox", { name: "Gradient CSS" }).last();
          await ed.click();
          await page.keyboard.press(SEL_ALL);
          await page.keyboard.type(grad(n));
          await page.waitForTimeout(1000);
          await page.getByRole("heading", { name: "Gradient" }).last().click();
          await page.waitForTimeout(800);
          const W = await page.evaluate(WELL);
          W.pass = W.found && W.scrollHeight <= W.clientHeight + 1 && W.lastLineInside && W.overflowY === "visible";
          o.well[n] = W;
          await ed.evaluate((el) => el.scrollIntoView({ block: "center" }));
          await page.waitForTimeout(400);
          await page.screenshot({ path: path.join(OUT, `well${n}-${width}-${theme}.png`) });
        }
      }
      if (name === "blob" || name === "atmosphere") o.fold = await page.evaluate(FOLD);
      if (name === "picker") {
        o.about = { lab: await page.evaluate(ABOUT) };
        await frameComponents(page, `about-lab-${width}-${theme}.png`);
        await pickSpace(page, "LCh");
        o.about.lch = await page.evaluate(ABOUT);
        await frameComponents(page, `about-lch-${width}-${theme}.png`);
        await pickSpace(page, "OKLCh");
        o.about.oklch = await page.evaluate(ABOUT);
      }
      log(o);
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 300) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, process.env.ONLY ? `capture-c12-${process.env.ONLY}.json` : "capture-c12.json"), JSON.stringify({ base: BASE, results }, null, 1));
}
