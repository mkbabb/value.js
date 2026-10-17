// X-DS · value · pass 5 cure (critic C5, 2026-10-17) — AFTER frames for the critic's cells:
// the nine routes at 1440 and 390, light and dark, plus the Browse tag-overflow scene (C5-G1).
// Probes: the type of the C5-02/C5-03 heads (both widths), any pane error plate, and any
// page error or console error naming spectrumFieldLuminance (C5-01).
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both
// closed in a finally.   usage: node capture-c5.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "../../pass-04/redispatch-2026-10-16/harness.mjs";

const BASE = process.argv[2] || "http://localhost:9253";
const OUT = import.meta.dirname;
const ROUTES = { picker: "/#/", palettes: "/#/palettes", browse: "/#/browse", extract: "/#/extract",
  mix: "/#/mix", generate: "/#/generate", gradient: "/#/gradient", atmosphere: "/#/atmosphere", blob: "/#/blob" };
const HEADS = /^(No saved palettes yet\.|Start a new palette|Selected|Saved palettes)$/;
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
  const alert = document.querySelector('main [role="alert"]');
  return { heads, alert: alert ? alert.textContent.trim().slice(0, 120) : null };
};

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) for (const [name, route] of Object.entries(ROUTES)) {
    const file = `${name}-${width}-${theme}.png`;
    let page;
    const errors = [];
    try {
      page = await newPage(browser, width, theme);
      page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
      if (name === "browse") await routeBrowseFixture(page);
      await bootRoute(page, BASE + route, { waitArticle: name === "browse" });
      await page.screenshot({ path: path.join(OUT, file) });
      const probe = await page.evaluate(PROBE, HEADS.source);
      if (width === 1440 && name === "browse") {
        await page.locator("[role=article] button").first().click().catch(() => {});
        await page.waitForTimeout(900);
        await page.screenshot({ path: path.join(OUT, `scene-browse-open-1440-${theme}.png`) });
      }
      const luma = errors.filter((e) => /spectrumFieldLuminance/.test(e));
      log({ file, ok: true, ...probe, lumaErrors: luma.length, errors: errors.length });
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 200), errors }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, "capture-c5.json"), JSON.stringify({ base: BASE, results }, null, 1));
}
