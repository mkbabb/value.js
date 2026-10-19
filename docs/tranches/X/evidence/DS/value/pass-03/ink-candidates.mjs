// X-DS value pass 3 (V3C-04) — the scalar range ink measured on what it SITS ON:
// glass's quiet track over the plate. Ground = a painted pixel of the unfilled
// track; each candidate is resolved in place (vars live) and composited at the
// range's own alpha over that ground. Headless real Chrome (§0ei).
import { chromium } from "@playwright/test";
const BASE = process.argv[2] || "http://localhost:9000";
const CANDS = {
  current: "color-mix(in oklab, var(--ink-muted, var(--muted-foreground)), var(--primary) 50%)",
  fg: "var(--foreground)",
  fgPrimary15: "color-mix(in oklab, var(--foreground), var(--primary) 15%)",
  fgPrimary25: "color-mix(in oklab, var(--foreground), var(--primary) 25%)",
  fgPrimary38: "color-mix(in oklab, var(--foreground), var(--primary) 38.2%)",
  fgAccentView38: "color-mix(in oklab, var(--foreground), var(--accent-view) 38.2%)",
  fgAccentView50: "color-mix(in oklab, var(--foreground), var(--accent-view) 50%)",
};
const ONLY = process.argv[3] ? process.argv[3].split(",") : null;
const CELLS = [
  ["extract-owner", "/#/extract?space=lab&color=" + encodeURIComponent("lab(38% 32 24)"), '[data-o18="extract-kc"] .slider-range'],
  ["extract-default", "/#/extract", '[data-o18="extract-kc"] .slider-range'],
  ["atmosphere-default", "/#/atmosphere", ".config-console .configurator-row .slider-range"],
  ["atmosphere-owner", "/#/atmosphere?space=lab&color=" + encodeURIComponent("lab(38% 32 24)"), ".config-console .configurator-row .slider-range"],
  ["gradient-default", "/#/gradient", ".slider-range"],
];
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const browser = await chromium.launch({ channel: "chrome", headless: true });
const rows = [];
for (const theme of ["light", "dark"]) for (const [name, route, sel] of CELLS) {
  if (ONLY && !ONLY.includes(name)) continue;
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, colorScheme: theme });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "load" });
  try { await page.locator(sel).first().waitFor({ timeout: 60000 }); } catch { rows.push({ theme, name, error: "no range" }); await ctx.close(); continue; }
  await page.waitForTimeout(3500);
  const geo = await page.evaluate(({ sel, CANDS }) => {
    const r = document.querySelector(sel); const t = r.closest(".slider-track") ?? r.parentElement;
    r.scrollIntoView({ block: "center" });
    const tb = t.getBoundingClientRect(), rb = r.getBoundingClientRect();
    const alpha = Number((getComputedStyle(r).backgroundColor.match(/\/\s*([0-9.]+)\)/) ?? [0, 1])[1]);
    const probe = document.createElement("span"); r.appendChild(probe);
    const cv = document.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d", { willReadFrequently: true });
    const out = {};
    for (const [k, v] of Object.entries(CANDS)) {
      probe.style.color = v; const c = getComputedStyle(probe).color;
      cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1);
      out[k] = [...cx.getImageData(0, 0, 1, 1).data].slice(0, 3);
    }
    probe.remove();
    return { x: Math.round(tb.right - 6), y: Math.round(tb.top + tb.height / 2), alpha, rangeRight: rb.right, out };
  }, { sel, CANDS });
  const buf = await page.screenshot({ clip: { x: geo.x, y: geo.y, width: 1, height: 1 } });
  const ground = await page.evaluate(async (b64) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const cv = document.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d");
    cx.drawImage(img, 0, 0); return [...cx.getImageData(0, 0, 1, 1).data].slice(0, 3);
  }, buf.toString("base64"));
  const res = { theme, name, ground, alpha: geo.alpha };
  for (const [k, c] of Object.entries(geo.out)) {
    const comp = c.map((v, i) => Math.round(v * geo.alpha + ground[i] * (1 - geo.alpha)));
    res[k] = Number(ratio(comp, ground).toFixed(2));
  }
  rows.push(res); console.log(JSON.stringify(res));
  await ctx.close();
}
await browser.close();
import fs from "node:fs";
if (!ONLY) fs.writeFileSync(import.meta.dirname + "/ink-candidates.jsonl", rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
