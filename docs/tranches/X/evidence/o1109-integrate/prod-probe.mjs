// o1109 colour prod reading: per cell, (1) page height across unnamed -> named -> unnamed colours (name-height),
// (2) a /palettes hop paused at its first frame and seeked 0-700 ms: dock-band hits (o1109c),
// (3) the About caption's darkest-region contrast (dark only, o11's reading) and the plate ink, (4) frames.
// usage: node prod-probe.mjs <base> <outdir>
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const [base, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const CELLS = [[360, 800], [390, 844], [430, 932], [820, 1180], [1440, 900]];
const rows = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const [w, h] of CELLS) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    try {
      const page = await ctx.newPage();
      const row = { w, scheme };
      const heights = [];
      for (const c of ["oklch(0.62 0.13 200)", "rebeccapurple", "oklch(0.62 0.13 201)"]) {
        await page.goto(`${base}/#/?color=${encodeURIComponent(c)}`, { waitUntil: "load", timeout: 60000 });
        await page.waitForSelector(".glass-dock", { timeout: 30000 });
        await page.waitForTimeout(2500);
        heights.push(await page.evaluate(() => [document.documentElement.scrollHeight, Math.round(document.querySelector(".pane-header")?.getBoundingClientRect().height ?? -1)]));
      }
      row.heights = heights;
      row.ink = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ink-primary").trim());
      await page.screenshot({ path: `${out}/${w}-${scheme}-home.png` });
      await page.evaluate(() => (location.hash = "#/palettes"));
      const caught = await page.waitForFunction(() => {
        if (!document.querySelector(".pane-wrapper > .vj-enter-enter-to")) return false;
        const a = document.getAnimations().filter((x) => x.timeline === document.timeline && x.effect?.target instanceof Element && !x.effect.target.closest("nav"));
        a.forEach((x) => x.pause()); window.__p = a; return true;
      }, null, { polling: "raf", timeout: 15000 }).then(() => true, () => false);
      row.swapCaught = caught;
      row.bandHits = await page.evaluate(() => {
        const a = window.__p ?? []; const nav = document.querySelector('nav[aria-label="Application navigation"]').getBoundingClientRect(); let hits = 0, at = null;
        for (let t = 0; t <= 700; t += 20) { a.forEach((x) => (x.currentTime = t));
          for (let i = 0; i < 20; i++) for (let j = 0; j < 5; j++) { const el = document.elementFromPoint(nav.left + ((i + .5) / 20) * nav.width, nav.top + ((j + .5) / 5) * nav.height); if (el?.closest(".pane-container, .pane-wrapper, .pane-main")) { hits++; at ??= t; } } }
        return { hits, at };
      });
      await page.evaluate(() => window.__p?.forEach((x) => (x.currentTime = 260)));
      await page.screenshot({ path: `${out}/${w}-${scheme}-palettes-t260.png`, clip: { x: 0, y: 0, width: w, height: Math.min(h, 400) } });
      await page.evaluate(() => window.__p?.forEach((x) => x.play()));
      rows.push(row);
      console.log(JSON.stringify(row));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${out}/rows.json`, JSON.stringify(rows, null, 1));
const bad = rows.filter((r) => !r.swapCaught || r.bandHits.hits > 0 || new Set(r.heights.map((x) => x.join(","))).size > 1);
console.log(bad.length ? `VERDICT RED ${bad.length}/${rows.length}` : `VERDICT GREEN 0/${rows.length}`);
