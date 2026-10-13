// X-DS fourier pass 2 (critic F2R) — AFTER cells for the cure. Headless real Chrome only (§0ei).
// usage: node f2r-cure-probe.mjs OUT BASE
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { mkdirSync, writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3127";
const SLUG = "plush-evening-olive-squid";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const measure = () => {
  const vis = (e) => e.getClientRects().length > 0;
  const box = (e) => { const r = e.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  const out = {};
  // C1: the notation glyph ink vs its label's ink
  out.notation = [...document.querySelectorAll(".notation-group [role=radio]")].map((it) => ({
    label: it.textContent.trim().slice(-6), state: it.dataset.state,
    labelInk: getComputedStyle(it).color,
    glyphInk: it.querySelector(".katex") ? getComputedStyle(it.querySelector(".katex")).color : null }));
  // C2: layer captions
  out.layers = [...document.querySelectorAll(".configurator-layer-heading")].filter(vis).map((h) => h.textContent.trim().replace(/\s+/g, " "));
  // C3/C4: the empty stage
  const stage = document.querySelector(".configurator-stage"), zone = document.querySelector(".drop-zone");
  if (zone) {
    out.stage = { ...box(stage), radius: getComputedStyle(stage).borderRadius };
    out.zone = { ...box(zone), radius: getComputedStyle(zone).borderRadius, border: getComputedStyle(zone).borderStyle };
    out.zoneItems = [...zone.children].filter(vis).map((e) => { const cs = getComputedStyle(e); return { t: e.textContent.trim().slice(0, 28), emphasis: e.dataset.emphasis ?? null, size: cs.fontSize, ink: cs.color, ...box(e) }; });
  }
  const err = document.querySelector(".stage-error-actions");
  if (err) out.errActions = [...err.children].map((e) => ({ t: e.textContent.trim(), emphasis: e.dataset.emphasis, size: getComputedStyle(e).fontSize }));
  // C5: the legend rule vs the plot
  const leg = document.querySelector(".legend-overlay--column");
  if (leg) out.legend = { legend: box(leg), plot: box(leg.parentElement) };
  // C6: preset rows
  const pg = document.querySelector(".preset-group");
  if (pg) { const rows = {}; for (const c of pg.children) { const k = Math.round(c.getBoundingClientRect().top); rows[k] = (rows[k] ?? 0) + 1; } out.presetRows = Object.values(rows); }
  return out;
};
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  // /equation after Compute
  let p = await page(theme, w);
  await p.goto(BASE + "/equation", { waitUntil: "networkidle" }).catch(() => {});
  const compute = p.getByRole("button", { name: "Compute" });
  await compute.waitFor({ timeout: 60000 }).catch(() => {});
  for (let i = 0; i < 120 && !(await compute.isEnabled().catch(() => false)); i++) await p.waitForTimeout(500);
  await compute.click().catch(() => {});
  await p.waitForTimeout(6000);
  res[`equation-${theme}-${w}`] = await p.evaluate(measure);
  await p.screenshot({ path: `${OUT}/equation-${theme}-${w}.png` });
  const ng = p.locator(".notation-group").first();
  if (w === 1440 && (await ng.isVisible().catch(() => false))) await ng.screenshot({ path: `${OUT}/notation-${theme}-1440.png` });
  if (w === 390) {
    const pg = p.locator(".preset-group").first();
    if (await pg.isVisible().catch(() => false)) { await pg.scrollIntoViewIfNeeded(); await pg.screenshot({ path: `${OUT}/presets-${theme}-390.png` }); }
  }
  await p.context().close();
  for (const [n, r] of Object.entries({ w: "/w", v: `/v/${SLUG}`, "v-error": "/v/no-such-slug-zz" })) {
    p = await page(theme, w);
    await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
    await p.waitForTimeout(n === "v" ? 6000 : 3000);
    res[`${n}-${theme}-${w}`] = await p.evaluate(measure);
    await p.screenshot({ path: `${OUT}/${n}-${theme}-${w}.png` });
    await p.context().close();
  }
}
writeFileSync(`${OUT}/f2r-cure-probe-after.json`, JSON.stringify(res, null, 1));
await b.close();
