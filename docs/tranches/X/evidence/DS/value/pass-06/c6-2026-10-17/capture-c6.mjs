// X-DS · value · pass 6 cure (critic V6C, 2026-10-17) — AFTER frames for the critic's cells:
// the companion hosts (palettes, browse, generate, gradient, extract) and Mix, 1440 and 390,
// light and dark; plus the draft well once a colour lands (palettes-new). Probes the type of
// the empty statement under its label at every host (V6C-01) and the well's label row: its
// string, its count's text, title, tabular-nums and its baseline offset from the label (V6C-02).
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both
// closed in a finally.   usage: node capture-c6.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "../../pass-04/redispatch-2026-10-16/harness.mjs";

const BASE = process.argv[2] || "http://localhost:9263";
const OUT = import.meta.dirname;
const ROUTES = { palettes: "/#/palettes", browse: "/#/browse", generate: "/#/generate",
  gradient: "/#/gradient", extract: "/#/extract", mix: "/#/mix" };
const HEADS = /^(No saved palettes yet\.|Start a new palette|Current palette|Current Palette|Saved palettes|My Palettes)$/;
const results = [];
const log = (o) => { results.push(o); console.log(JSON.stringify(o)); };

const PROBE = (src) => {
  const re = new RegExp(src);
  const heads = [];
  for (const el of document.querySelectorAll(".pane-wrapper *")) {
    if (el.children.length) continue;
    const t = (el.textContent || "").trim();
    const r = el.getBoundingClientRect();
    if (!(r.width > 0 && r.height > 0) || !re.test(t)) continue;
    const cs = getComputedStyle(el);
    heads.push({ t, ff: cs.fontFamily.split(",")[0], fs: cs.fontSize, fw: cs.fontWeight, top: Math.round(r.top) });
  }
  const row = document.querySelector("[data-well-label-row]");
  let well = null;
  if (row) {
    const [label, count] = row.children;
    const lr = label?.getBoundingClientRect(), cr = count?.getBoundingClientRect();
    well = { label: label?.textContent.trim(), count: count ? { text: count.textContent.trim(), title: count.title,
      numeric: getComputedStyle(count).fontVariantNumeric, gapPx: Math.round(cr.left - lr.right),
      rowRightGapPx: Math.round(row.getBoundingClientRect().right - cr.right) } : null };
  }
  const alert = document.querySelector('main [role="alert"]');
  return { heads, well, alert: alert ? alert.textContent.trim().slice(0, 120) : null };
};

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) {
    for (const [name, route] of [...Object.entries(ROUTES), ["palettes-new", "/#/palettes"]]) {
      const file = `${name}-${width}-${theme}.png`;
      let page;
      try {
        page = await newPage(browser, width, theme);
        if (name === "browse") await routeBrowseFixture(page);
        await bootRoute(page, BASE + route, { waitArticle: name === "browse" });
        if (name === "palettes-new") {
          await page.locator("[data-well-label-row]").first().click();
          await page.waitForTimeout(1200);
        }
        await page.screenshot({ path: path.join(OUT, file) });
        log({ file, ok: true, ...(await page.evaluate(PROBE, HEADS.source)) });
      } catch (e) { log({ file, ok: false, e: String(e).slice(0, 200) }); }
      finally { try { await page?.context().close(); } catch {} }
    }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, "capture-c6.json"), JSON.stringify({ base: BASE, results }, null, 1));
}
