// SS-8 B26 cures — R-2 (SS8-0741): the seed line's ink candidates over its live ground.
// Headless Chromium, one browser, a new context per scheme, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const APP = process.env.APP || "http://localhost:9262/";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/evidence/B26-extract-generate-panes/cures/seed-ink.json";
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
const CANDS = ["var(--muted-foreground)", "var(--ink-muted)", "var(--foreground)", "var(--ink-primary)",
  "color-mix(in oklab, var(--ink-muted), var(--foreground) 61.8%)"];
const out = {};
const browser = await chromium.launch();
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, scheme);
      const page = await ctx.newPage();
      await page.goto(APP + "#/generate", { waitUntil: "domcontentloaded", timeout: 180000 });
      const sel = "[data-generate-plate] p.text-mono-small";
      await page.waitForSelector(sel, { timeout: 90000 });
      await page.waitForTimeout(3000);
      const geo = await page.evaluate((s) => { const e = document.querySelector(s); const r = document.createRange(); r.selectNodeContents(e); const b = r.getBoundingClientRect(); const cs = getComputedStyle(e);
        return { x: b.x, y: b.y, w: b.width, h: b.height, vars: Object.fromEntries(["--muted-foreground", "--ink-muted", "--foreground", "--ink-primary", "--well-bg"].map((v) => [v, cs.getPropertyValue(v).trim()])) }; }, sel);
      await page.evaluate((s) => document.querySelector(s).style.setProperty("color", "transparent", "important"), sel);
      const buf = await page.screenshot({ clip: { x: geo.x, y: geo.y, width: geo.w, height: geo.h } });
      const ground = await page.evaluate(async (b64) => { const bm = await createImageBitmap(await (await fetch("data:image/png;base64," + b64)).blob()); const c = new OffscreenCanvas(bm.width, bm.height); const g = c.getContext("2d"); g.drawImage(bm, 0, 0); const d = g.getImageData(0, 0, bm.width, bm.height).data; let r = 0, gg = 0, bb = 0, n = 0; for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; } return [r / n, gg / n, bb / n]; }, buf.toString("base64"));
      const cands = {};
      for (const c of CANDS) {
        const rgba = await page.evaluate(([s, c]) => { const e = document.querySelector(s); e.style.setProperty("color", c, "important"); const cv = document.createElement("canvas").getContext("2d"); cv.fillStyle = getComputedStyle(e).color; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; }, [sel, c]);
        const ink = [0, 1, 2].map((i) => rgba[i] * rgba[3] + ground[i] * (1 - rgba[3]));
        cands[c] = { ink: ink.map(Math.round), ratio: cr(ink, ground) };
      }
      out[scheme] = { geo, ground: ground.map(Math.round), cands };
      console.log(scheme, JSON.stringify(out[scheme]).slice(0, 900));
    } finally { await ctx.close().catch(() => {}); }
  }
} finally { await browser.close(); }
writeFileSync(OUT, JSON.stringify(out, null, 1));
