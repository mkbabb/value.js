// X·§0ht.a11y falsifier on a live origin (prod): at touch 390/430 and mouse 390, both schemes,
// the a11y tree holds a "Colors of <name>" button whose aria-expanded flips with the card's own verb,
// and every Featured card's accessible name includes "Featured" (and the badge word is in its subtree).
// One browser per run, a context per cell, closed in finally.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "https://color.babb.dev";
const TAG = process.argv[2] || "r";
const OUT = process.env.HOME + "/.dev-logs/x-0ht-a11y/" + TAG;
fs.mkdirSync(OUT, { recursive: true });
const cells = [["touch390", 390, 844, true], ["touch430", 430, 932, true], ["mouse390", 390, 844, false]];
const out = [];
const browser = await chromium.launch();
try {
  for (const [tag, w, h, touch] of cells) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch, colorScheme: scheme });
    const r = { tag, scheme };
    try {
      await ctx.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", s); } catch {} }, scheme);
      const page = await ctx.newPage();
      await page.goto(`${BASE}/#/browse`, { waitUntil: "load", timeout: 60000 });
      await page.waitForSelector(".palette-card [data-palette-name]", { timeout: 30000 });
      await page.waitForTimeout(2000);
      const main = page.locator("main").first();
      const featured = main.getByRole("article").filter({ has: page.locator(".featured-badge") });
      r.featured = [];
      for (const c of await featured.all()) {
        const snap = await c.ariaSnapshot();
        const [head, ...body] = snap.split("\n");
        r.featured.push({ head, nameHas: /Featured/.test(head), bodyHas: body.join("\n").includes("Featured") });
      }
      const card = featured.first();
      const nm = (await card.locator("[data-palette-name]").textContent()).trim();
      const disclose = card.getByRole("button", { name: `Colors of ${nm}` });
      r.card = nm;
      r.discloseCount = await disclose.count();
      const ae = async () => (r.discloseCount ? await disclose.getAttribute("aria-expanded") : null);
      r.ae0 = await ae();
      const name = card.locator("[data-palette-name]");
      await name.scrollIntoViewIfNeeded();
      touch ? await name.tap() : await name.click();
      await page.waitForTimeout(1200);
      r.open = await card.locator("[data-palette-swatches]").isVisible();
      r.ae1 = await ae();
      touch ? await name.tap() : await name.click();
      await page.waitForTimeout(1200);
      r.ae2 = await ae();
      r.ok = r.featured.length > 0 && r.featured.every((f) => f.nameHas && f.bodyHas) && r.discloseCount === 1 && r.ae0 === "false" && r.ae1 === "true" && r.ae2 === "false";
    } catch (e) { r.error = String(e).slice(0, 300); r.ok = false; }
    finally { await ctx.close(); }
    out.push(r);
  }
} finally {
  await browser.close();
  fs.writeFileSync(`${OUT}/fals.json`, JSON.stringify(out, null, 1));
}
console.log(JSON.stringify({ tag: TAG, base: BASE, verdict: out.every((r) => r.ok) ? "GREEN" : "RED" }));
for (const r of out) console.log(r.tag, r.scheme, r.card, `n=${r.featured?.length}`, `name=${r.featured?.every((f) => f.nameHas)}`, `body=${r.featured?.every((f) => f.bodyHas)}`, `disclose=${r.discloseCount}`, `ae=${r.ae0}/${r.ae1}/${r.ae2}`, `open=${r.open}`, r.error || "");
