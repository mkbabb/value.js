// X-DS value pass 5 — measurements for the V5C cure. Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = "http://localhost:9000";
const OUT = process.argv[2] ?? ".";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
const lum = (c) => { const m = c.match(/[\d.]+/g).map(Number); const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]); };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  const page = await ctx.newPage(); page.setDefaultTimeout(60000);
  const go = async (r) => { await page.goto(BASE + "/#" + r, { waitUntil: "load", timeout: 180000 }); await page.waitForTimeout(6000); };
  const r = (res[theme] = {});
  // V5C-01: the header veil box vs the first row.
  for (const route of ["/browse", "/extract", "/mix", "/gradient"]) {
    await go(route);
    r[`veil${route}`] = await page.evaluate(() => {
      const h = [...document.querySelectorAll("main .pane-header")].find((e) => getComputedStyle(e, "::before").display !== "none");
      if (!h) return "no unseated header";
      const hb = h.getBoundingClientRect(); const cs = getComputedStyle(h, "::before");
      return { headerBottom: Math.round(hb.bottom), inset: cs.inset, beforeBottom: Math.round(hb.bottom - (parseFloat(cs.bottom) || 0)) };
    });
  }
  // V5C-04 / V5C-01 browse: the filter trigger.
  await go("/browse");
  r.filterTrigger = await page.evaluate(() => { const b = document.querySelector('button[aria-label^="Filters"]'); const cs = getComputedStyle(b); return { bg: cs.backgroundColor, shadow: cs.boxShadow.slice(0, 80), border: cs.borderColor }; });
  r.searchTop = await page.evaluate(() => Math.round(document.querySelector(".search-seated")?.getBoundingClientRect().top ?? -1));
  // V5C-02 / V5C-03 / V5C-05: the filter popover.
  await page.getByRole("button", { name: /^Filters/ }).first().click(); await page.waitForTimeout(900);
  r.filterPopover = await page.evaluate(() => {
    const p = document.querySelector('[role=dialog].glass-floating'); const cs = getComputedStyle(p);
    const labels = [...p.querySelectorAll("label")].map((l) => ({ t: l.textContent.trim(), ff: getComputedStyle(l).fontFamily.split(",")[0], tt: getComputedStyle(l).textTransform, c: getComputedStyle(l).color }));
    const chips = [...p.querySelectorAll('[role=radio], button[aria-pressed], [data-state]')].filter((e) => /Popular|Most forked|Featured/.test(e.textContent)).map((e) => ({ t: e.textContent.trim(), c: getComputedStyle(e).color }));
    const input = p.querySelector('input[aria-label="Search by CSS color"]');
    const ics = getComputedStyle(input.closest(".field-control") ?? input);
    const btn = [...p.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
    return { fg: cs.getPropertyValue("--foreground"), mfg: cs.getPropertyValue("--muted-foreground"), labels, chips, inputBg: ics.backgroundColor, searchBtnBg: btn ? getComputedStyle(btn).backgroundColor : null };
  });
  await page.keyboard.press("Escape");
  // V5C-02: the gradient type menu descriptions.
  await go("/gradient");
  await page.locator("main [role=combobox]").first().click(); await page.waitForTimeout(900);
  r.gradientMenu = await page.evaluate(() => [...document.querySelectorAll("[role=option] span.text-micro")].map((s) => ({ t: s.textContent.trim(), c: getComputedStyle(s).color })));
  await page.keyboard.press("Escape");
  // V5C-05: the stop Position field.
  await page.locator("main [role=slider], main button[aria-label*=stop i]").first().click().catch(() => {}); await page.waitForTimeout(900);
  r.stopField = await page.evaluate(() => { const i = document.querySelector('[data-testid="gradient-stop-position"]'); if (!i) return null; const f = i.closest(".field-control") ?? i; return { bg: getComputedStyle(f).backgroundColor, border: getComputedStyle(f).borderColor }; });
  // V5C-07: extract action row alignment.
  await go("/extract");
  r.extractAlign = await page.evaluate(() => {
    const cam = [...document.querySelectorAll("button")].find((b) => /camera/i.test(b.textContent)); const svg = cam?.querySelector("svg");
    const lab = [...document.querySelectorAll("label")].find((l) => l.textContent.trim() === "Colors");
    return { cameraGlyphX: Math.round(svg?.getBoundingClientRect().left ?? -1), colorsLabelX: Math.round(lab?.getBoundingClientRect().left ?? -1) };
  });
  // V5C-09: scalar tracks on /blob.
  await go("/blob");
  r.blobTracks = await page.evaluate(() => [...document.querySelectorAll(".config-console .glass-slider")].slice(0, 3).map((s) => { const t = s.querySelector('[data-slot*=track], [class*=track]'); const rg = s.querySelector('[data-slot*=range], [class*=range]'); return { slider: Math.round(s.getBoundingClientRect().height), track: t ? +t.getBoundingClientRect().height.toFixed(1) : null, range: rg ? getComputedStyle(rg).backgroundColor : null }; }));
  r.blobHeadRule = await page.evaluate(() => { const h = document.querySelector(".config-section-title"); return h ? getComputedStyle(h).borderBottomWidth + " / parent " + getComputedStyle(h.parentElement).borderBottomWidth : null; });
  // V5C-10: stage vs companion heights.
  for (const route of ["/generate", "/browse"]) {
    await go(route);
    r[`heights${route}`] = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll(".pane-wrapper")].map((w) => [w.dataset.pane, Math.round(w.getBoundingClientRect().height)])));
  }
  await ctx.close();
}
// V5C-06: generate title at 390.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light" });
  const page = await ctx.newPage(); await page.goto(BASE + "/#/generate", { timeout: 180000 }); await page.waitForTimeout(6000);
  res.generateName390 = await page.evaluate(() => { const i = document.querySelector('input[aria-label="Palette name"]'); const cs = getComputedStyle(i); return { box: Math.round(i.getBoundingClientRect().width), scroll: i.scrollWidth, textOverflow: cs.textOverflow, overflow: cs.overflow }; });
  await page.screenshot({ path: `${OUT}/generate-row-390-light.png`, clip: { x: 0, y: 0, width: 390, height: 400 } }).catch(() => {});
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}/probe-v5c.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
