// X-DS value pass 4 (critic P4R, 2026-10-15) — cure probe: P4R-01 the Palettes title ramp
// (stops, chroma, contrast vs the plate behind the title) and P4R-04 Extract's empty card
// (the ghost strip's tone vs the well; the verb's ink). Before = the old formula injected
// in-page at the one token (P4R-04); P4R-01's before is the critic's probe-p4r.json.
// Headless real Chrome only (§0ei). usage: node probe-p4r-cure.mjs [--base http://localhost:9176]
import fs from "node:fs"; import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";
const args = process.argv.slice(2);
const BASE = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:9176";
const DIR = import.meta.dirname; fs.mkdirSync(path.join(DIR, "crops"), { recursive: true });
const out = {}; let browser;
const toOklch = () => {
  // Resolve any CSS colour to oklch numbers via a canvas-free route: computed style on a probe.
  window.__ok = (css) => { const s = document.createElement("span"); s.style.color = `oklch(from ${css} l c h)`; document.body.appendChild(s); const v = getComputedStyle(s).color; s.remove(); return v; };
  window.__rgb = (css) => { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.fillStyle = css; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data]; };
  window.__lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  window.__ratio = (a, b) => { const x = window.__lum(a), y = window.__lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
};
try {
  browser = await chromium.launch({ channel: "chrome", headless: true });
  for (const theme of ["light", "dark"]) {
    for (const width of [1440, 390]) {
      const page = await newPage(browser, width, theme);
      await bootRoute(page, BASE + "/#/palettes");
      await page.evaluate(toOklch);
      const title = page.locator(".palettes-ramp-text").first();
      await title.scrollIntoViewIfNeeded();
      const box = await title.boundingBox();
      // The plate under the title: shoot the title with the text hidden, sample its middle.
      await title.evaluate((e) => (e.style.visibility = "hidden"));
      const plateShot = await page.screenshot({ clip: { x: box.x, y: box.y, width: box.width, height: box.height } });
      await title.evaluate((e) => (e.style.visibility = ""));
      const plateB64 = plateShot.toString("base64");
      const r = await page.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, img.width, img.height).data; let R = 0, G = 0, B = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; n++; }
        const plate = [R / n, G / n, B / n].map(Math.round);
        const rs = getComputedStyle(document.querySelector(".palettes-ramp-text"));
        const stops = [0, 1, 2].map((i) => rs.getPropertyValue(`--palettes-ramp-${i}`).trim());
        return { plate, bg: rs.backgroundImage, stops: stops.map((s) => ({ css: s, oklch: window.__ok(s), ratio: +window.__ratio(window.__rgb(s), plate).toFixed(2) })) };
      }, plateB64);
      out[`palettes-${width}-${theme}`] = r;
      await page.screenshot({ path: path.join(DIR, "crops", `palettes-title-${width}-${theme}.png`), clip: { x: Math.max(0, box.x - 120), y: box.y - 12, width: Math.min(width - Math.max(0, box.x - 120), box.width + 200), height: box.height + 24 } });
      await page.context().close();

      const ex = await newPage(browser, width, theme);
      await bootRoute(ex, BASE + "/#/extract");
      await ex.evaluate(toOklch);
      const strip = ex.locator('[data-slot="shadow-palette"]').first();
      await strip.scrollIntoViewIfNeeded();
      const measure = () => ex.evaluate(() => {
        const seg = document.querySelector('[data-slot="shadow-palette"] .shadow-seg');
        const verb = [...document.querySelectorAll("span")].find((s) => s.textContent.trim() === "Upload image");
        const label = [...document.querySelectorAll("main label, main span")].find((s) => s.textContent.trim() === "Colors");
        const well = getComputedStyle(seg.closest(".skeleton-ink-register") || seg.parentElement);
        const segBg = getComputedStyle(seg).backgroundColor;
        const wellBg = well.getPropertyValue("--well-bg").trim();
        return {
          seg: window.__ok(segBg), well: window.__ok(wellBg),
          segVsWell: +window.__ratio(window.__rgb(segBg), window.__rgb(wellBg)).toFixed(3),
          verb: verb && window.__ok(getComputedStyle(verb).color),
          glyph: verb && window.__ok(getComputedStyle(verb.previousElementSibling).color),
          colorsLabel: label && window.__ok(getComputedStyle(label).color),
        };
      });
      const after = await measure();
      const sbox = await ex.locator('[data-slot="shadow-palette"]').first().evaluate((e) => { const c = e.closest(".card") || e.parentElement.parentElement; const r = c.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
      const clip = { x: Math.max(0, sbox.x), y: Math.max(0, sbox.y), width: Math.min(sbox.width, width - Math.max(0, sbox.x)), height: Math.min(sbox.height, 1400) };
      await ex.screenshot({ path: path.join(DIR, "crops", `extract-card-after-${width}-${theme}.png`), clip });
      // BEFORE: the old pole (foreground) and the old column ink, at the one token / class.
      await ex.evaluate(() => {
        document.querySelectorAll(".skeleton-ink-register").forEach((e) => e.style.setProperty("--skeleton-ink-pole", "var(--foreground)"));
        const verb = [...document.querySelectorAll("span")].find((s) => s.textContent.trim() === "Upload image");
        verb?.classList.remove("text-foreground"); verb?.parentElement.classList.add("plate-ink");
      });
      const before = await measure();
      await ex.screenshot({ path: path.join(DIR, "crops", `extract-card-before-${width}-${theme}.png`), clip });
      out[`extract-${width}-${theme}`] = { before, after };
      await ex.context().close();
    }
  }
} finally { await browser?.close(); }
fs.writeFileSync(path.join(DIR, "probe-p4r-cure.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
