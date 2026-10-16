// X-DS value pass 5 (critic P5C, 2026-10-16) — cure probe + AFTER frames for the critic's cells.
// P5C-01: the collapsed dock seal — what feeds the tile's fill, and the glass rim stack.
// P5C-02: the light Palettes ramp, Pole A (today's resolver) vs Pole B (a cooler light fan,
//         injected at the three root tokens only, at Pole A's own measured contrast; nothing ships).
// P5C-03: Extract's idle instrument face — the outline register vs the old filled slab (BEFORE
//         injected in-page at the one component's classes).
// Headless real Chrome only (§0ei). usage: node probe-p5c.mjs [--base http://localhost:9000]
import fs from "node:fs"; import path from "node:path";
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { bootRoute, newPage, routeBrowseFixture } from "../../pass-04/p4r-2026-10-15/harness.mjs";
const args = process.argv.slice(2);
const BASE = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:9000";
const DIR = import.meta.dirname; const CROPS = path.join(DIR, "crops");
const out = { p5c01: {}, p5c02: {}, p5c03: {}, frames: [] };
const helpers = () => {
  window.__rgb = (css) => { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.fillStyle = css; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data]; };
  window.__lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  window.__ratio = (a, b) => { const x = window.__lum(a), y = window.__lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  // OKLCh -> sRGB (unclamped) for the Pole B solve.
  window.__ok2rgb = (L, C, h) => { const a = C * Math.cos(h * Math.PI / 180), b = C * Math.sin(h * Math.PI / 180);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
    return lin; };
  window.__maxC = (L, h) => { let lo = 0, hi = 0.4; for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; window.__ok2rgb(L, mid, h).every((v) => v >= -1e-6 && v <= 1 + 1e-6) ? (lo = mid) : (hi = mid); } return lo; };
  window.__linLum = (lin) => 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  // Pole B stop: start at the plate's L, walk L away from the plate (darker on a light plate)
  // at the hue's max chroma until the stop clears `target` against the sampled plate pixel.
  window.__solve = (h, plateRgb, target, Lstart) => { const Yp = window.__lum(plateRgb);
    for (let L = Lstart; L > 0.05; L -= 0.0025) { const C = window.__maxC(L, h); const Y = window.__linLum(window.__ok2rgb(L, C, h));
      const r = (Math.max(Y, Yp) + 0.05) / (Math.min(Y, Yp) + 0.05); if (r >= target) return { L: +L.toFixed(3), C: +C.toFixed(3), h, ratio: +r.toFixed(2), css: `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${h})` }; }
    return null; };
};
async function plateUnder(page, loc) {
  const box = await loc.boundingBox();
  await loc.evaluate((e) => (e.style.visibility = "hidden"));
  const shot = await page.screenshot({ clip: box });
  await loc.evaluate((e) => (e.style.visibility = ""));
  return page.evaluate(async (b64) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data; let R = 0, G = 0, B = 0, n = 0;
    for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; n++; } return [R / n, G / n, B / n].map(Math.round); }, shot.toString("base64"));
}
const shoot = async (page, name) => { await page.screenshot({ path: path.join(DIR, `${name}.png`) }); out.frames.push(name); };
let browser;
try {
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const ONLY02 = args.includes("--only-p02");
  for (const theme of ONLY02 ? [] : ["light", "dark"]) {
    // ── P5C-01: the collapsed seal (gradient-stop + card-open cells)
    {
      const page = await newPage(browser, 1440, theme);
      try {
        await bootRoute(page, BASE + "/#/gradient");
        await page.locator("main [role=slider]").first().click();
        await page.waitForTimeout(1500);
        await shoot(page, `gradient-stop-1440-${theme}`);
        out.p5c01[theme] = await page.evaluate(() => {
          const dock = document.querySelector(".glass-dock"); const seal = document.querySelector(".dock-seal");
          const wax = document.querySelector(".dock-seal-wax"); const root = getComputedStyle(document.documentElement);
          const fills = wax ? [...wax.querySelectorAll("*")].concat(wax).map((e) => { const cs = getComputedStyle(e); return { tag: e.tagName.toLowerCase(), cls: String(e.className?.baseVal ?? e.className).slice(0, 60), bg: cs.backgroundColor, fill: cs.fill, filter: cs.filter.slice(0, 60), shadow: cs.boxShadow.slice(0, 120) }; }).filter((f) => f.bg !== "rgba(0, 0, 0, 0)" || (f.fill && f.fill !== "rgb(0, 0, 0)")) : [];
          const sealSrc = seal ? seal.outerHTML : "";
          return {
            dockClass: dock?.className, dockShadow: dock && getComputedStyle(dock).boxShadow,
            sealPresent: !!seal, sealVisible: !!seal && seal.getBoundingClientRect().width > 0,
            sealUsesDockRing: /--dock-ring/.test(sealSrc), sealUsesAccentView: /accent-view/.test(sealSrc),
            sealInk: seal && getComputedStyle(seal).color,
            accentLive: root.getPropertyValue("--accent-live").trim(), accentView: root.getPropertyValue("--accent-view").trim(),
            waxFills: fills.slice(0, 6),
            waxDataColor: wax?.getAttribute("style") || null,
          };
        });
        const db = await page.locator(".glass-dock").first().boundingBox();
        if (db) await page.screenshot({ path: path.join(CROPS, `dock-collapsed-1440-${theme}.png`), clip: { x: db.x - 40, y: Math.max(0, db.y - 20), width: db.width + 80, height: db.height + 40 } });
      } catch (e) { out.p5c01[theme] = { error: String(e).slice(0, 300) }; } finally { await page.context().close(); }
    }
    {
      const page = await newPage(browser, 1440, theme);
      try {
        await routeBrowseFixture(page);
        await bootRoute(page, BASE + "/#/browse", { waitArticle: true });
        await page.getByRole("article").first().getByRole("button", { name: /expand|details|show/i }).first().click();
        await page.waitForTimeout(1200);
        await shoot(page, `card-open-1440-${theme}`);
      } catch (e) { out.frames.push(`card-open-1440-${theme} FAIL ${String(e).slice(0, 160)}`); } finally { await page.context().close(); }
    }
    // ── P5C-03: Extract's idle instrument face, both widths
    for (const width of [1440, 390]) {
      const page = await newPage(browser, width, theme);
      try {
        await bootRoute(page, BASE + "/#/extract");
        await page.evaluate(helpers);
        await shoot(page, `extract-${width}-${theme}`);
        const ghost = page.locator('[data-slot="shadow-palette"]').filter({ visible: true }).first();
        await ghost.scrollIntoViewIfNeeded();
        const measure = () => ghost.evaluate((g) => { const c = g.querySelectorAll('[data-slot="shadow-palette-cell"]'); const gs = getComputedStyle(g); const cs = c[1] && getComputedStyle(c[1]);
          return { cells: c.length, ground: gs.backgroundColor, edge: gs.borderTopColor + " " + gs.borderTopWidth, cellFill: cs?.backgroundColor, seam: cs ? cs.borderInlineStartWidth + " " + cs.borderInlineStartColor : null, h: Math.round(g.getBoundingClientRect().height) }; });
        const card = await ghost.evaluate((e) => { const c = e.closest('[data-slot="card"]') || e.parentElement; const r = c.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
        const clip = { x: Math.max(0, card.x), y: Math.max(0, card.y), width: Math.min(card.width, width - Math.max(0, card.x)), height: Math.min(card.height, 1400) };
        const after = await measure();
        await page.screenshot({ path: path.join(CROPS, `extract-card-after-${width}-${theme}.png`), clip, fullPage: true });
        await page.addStyleTag({ content: `[data-slot="shadow-palette"]{background-color:var(--well-bg)} [data-slot="shadow-palette"]>div:first-child{gap:1px} [data-slot="shadow-palette-cell"]{background:var(--skeleton-ink)!important;border-inline-start:0!important}` });
        await page.waitForTimeout(200);
        const before = await measure();
        await page.screenshot({ path: path.join(CROPS, `extract-card-before-${width}-${theme}.png`), clip, fullPage: true });
        out.p5c03[`${width}-${theme}`] = { before, after };
      } catch (e) { out.p5c03[`${width}-${theme}`] = { error: String(e).slice(0, 300) }; } finally { await page.context().close(); }
    }
  }
  // ── P5C-02: light only — Pole A (today) vs Pole B (cooler light fan), title + menu entry
  for (const width of [1440, 390]) {
    const page = await newPage(browser, width, "light");
    try {
      await bootRoute(page, BASE + "/#/palettes");
      await page.evaluate(helpers);
      const title = page.locator(".palettes-ramp-text").first();
      await title.scrollIntoViewIfNeeded();
      const plate = await plateUnder(page, title);
      const box = await title.boundingBox();
      const clip = { x: Math.max(0, box.x - 120), y: box.y - 12, width: Math.min(width - Math.max(0, box.x - 120), box.width + 200), height: box.height + 24 };
      const poleA = await page.evaluate((p) => [0, 1, 2].map((i) => { const css = getComputedStyle(document.querySelector(".palettes-ramp-text")).getPropertyValue(`--palettes-ramp-${i}`).trim(); return { css, ratio: +window.__ratio(window.__rgb(css), p).toFixed(2) }; }), plate);
      await page.screenshot({ path: path.join(CROPS, `palettes-title-poleA-${width}-light.png`), clip });
      // Pole B: hues re-centred cool (violet 300, rose 350, coral 30), each held at Pole A's lowest ratio.
      const target = Math.min(...poleA.map((s) => s.ratio));
      const poleB = await page.evaluate(([p, t]) => { const Lp = 0.75; return [300, 350, 30].map((h) => window.__solve(h, p, t, Lp)); }, [plate, target]);
      await page.evaluate((stops) => { const r = document.querySelector(".palettes-ramp-text").style; stops.forEach((s, i) => s && r.setProperty(`--palettes-ramp-${i}`, s.css)); }, poleB);
      await page.waitForTimeout(150);
      await page.screenshot({ path: path.join(CROPS, `palettes-title-poleB-${width}-light.png`), clip });
      out.p5c02[`title-${width}`] = { plate, poleA, target, poleB };
      if (width === 1440) {
        await page.evaluate(() => [0, 1, 2].forEach((i) => document.querySelector(".palettes-ramp-text").style.removeProperty(`--palettes-ramp-${i}`)));
        await page.locator(".glass-dock [role=combobox], .glass-dock button[aria-haspopup]").first().click();
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(DIR, "view-menu-1440-light.png") }); out.frames.push("view-menu-1440-light (Pole A)");
        const entry = page.locator('[role="option"] .palettes-ramp-text').first();
        const eb = await entry.boundingBox();
        const mplate = await plateUnder(page, entry);
        const menuA = await page.evaluate((p) => { const cs = getComputedStyle(document.querySelector('[role="option"] .palettes-ramp-text')); return [0, 1, 2].map((i) => { const css = cs.getPropertyValue(`--palettes-ramp-${i}`).trim(); return { css, ratio: +window.__ratio(window.__rgb(css), p).toFixed(2) }; }); }, mplate);
        const mclip = { x: eb.x - 40, y: eb.y - 14, width: 220, height: eb.height + 28 };
        await page.screenshot({ path: path.join(CROPS, `view-menu-entry-poleA-1440-light.png`), clip: mclip });
        const mt = Math.min(...menuA.map((s) => s.ratio));
        const menuB = await page.evaluate(([p, t]) => [300, 350, 30].map((h) => window.__solve(h, p, t, 0.8)), [mplate, mt]);
        await page.evaluate((stops) => { const el = document.querySelector('[role="option"] .palettes-ramp-text'); stops.forEach((s, i) => s && el.style.setProperty(`--palettes-ramp-${i}`, s.css)); }, menuB);
        await page.waitForTimeout(150);
        await page.screenshot({ path: path.join(CROPS, `view-menu-entry-poleB-1440-light.png`), clip: mclip });
        out.p5c02.menu = { plate: mplate, poleA: menuA, target: mt, poleB: menuB };
      }
    } catch (e) { out.p5c02[`err-${width}`] = String(e).slice(0, 300); } finally { await page.context().close(); }
  }
  for (const theme of ONLY02 ? [] : ["dark"]) {
    const page = await newPage(browser, 1440, theme);
    try { await bootRoute(page, BASE + "/#/"); await page.locator(".glass-dock [role=combobox], .glass-dock button[aria-haspopup]").first().click(); await page.waitForTimeout(800); await shoot(page, `view-menu-1440-${theme}`); }
    catch (e) { out.frames.push(`view-menu-1440-${theme} FAIL ${String(e).slice(0, 160)}`); } finally { await page.context().close(); }
  }
} finally { await browser?.close(); }
const OUTF = path.join(DIR, "probe-p5c.json");
if (args.includes("--only-p02") && fs.existsSync(OUTF)) { const prev = JSON.parse(fs.readFileSync(OUTF, "utf8")); prev.p5c02 = out.p5c02; prev.frames = prev.frames.filter((f) => !f.startsWith("view-menu-1440-light")).concat(out.frames); fs.writeFileSync(OUTF, JSON.stringify(prev, null, 1)); }
else fs.writeFileSync(OUTF, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
