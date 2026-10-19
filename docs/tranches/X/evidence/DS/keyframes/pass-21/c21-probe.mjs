// X-DS keyframes r3 pass 2 (critic C21) — AFTER probe for the C21 cure. Headless real Chrome only (§0ei).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "after");
const BASE = "http://localhost:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const rep = {};
const safe = async (k, fn) => { try { await fn(); } catch (e) { rep[k] = "ERR " + e.message.split("\n")[0]; } };
const crop = async (page, name, loc, pad = 12) => { const b = await loc.boundingBox(); if (!b) { await page.screenshot({ path: path.join(OUT, `${name}.png`) }); return; } await page.screenshot({ path: path.join(OUT, `${name}.png`), clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); };
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    // KF-C21-01 — the easing tiles vs the spring preset cells.
    for (const [r, sel] of [["easing", ".specimen-tile"], ["spring", ".preset-cell"]]) {
      await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      rep[`tiles-${scheme}-${r}`] = await page.evaluate((sel) => [...document.querySelectorAll(sel)].filter((t) => t.dataset.state === "on").concat([...document.querySelectorAll(sel)].slice(0, 2)).map((t) => { const c = getComputedStyle(t); return { state: t.dataset.state, bg: c.backgroundColor, bgi: c.backgroundImage.slice(0, 60), shadow: c.boxShadow.slice(0, 80), border: `${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor}`, radius: c.borderTopLeftRadius, outline: `${c.outlineWidth} ${c.outlineStyle}` }; }), sel);
      if (r === "easing") { const t = page.locator(".specimen-tile").first(); const bb = await t.boundingBox(); await page.screenshot({ path: path.join(OUT, `crop-easing-tiles-${scheme}.png`), clip: { x: bb.x - 12, y: bb.y - 12, width: 790, height: bb.height + 24 } }); await page.screenshot({ path: path.join(OUT, `easing-1440-${scheme}.png`) }); }
    }
    // KF-C21-03 — the Stagger header.
    await safe(`seq-${scheme}`, async () => {
      await page.goto(`${BASE}#/sequence`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      // the header row = the nearest ancestor of the Reel that also holds the section label
      rep[`stagger-header-${scheme}`] = await page.evaluate(() => { const reel = document.querySelector('button[aria-label^="Reel"]'); let row = reel; while (row && !row.querySelector(".configurator-section-label")) row = row.parentElement; if (!row) return null; row.setAttribute("data-c21-row", ""); return [...row.querySelectorAll("button,[data-slot=separator],[role=separator],[role=none][data-orientation]")].filter((b) => b.getBoundingClientRect().width > 0).map((b) => ({ tag: b.tagName, label: b.getAttribute("aria-label"), text: b.textContent.trim(), orient: b.getAttribute("data-orientation") || b.getAttribute("aria-orientation"), x: Math.round(b.getBoundingClientRect().x) })); });
      const hdr = page.locator("[data-c21-row]").first();
      await crop(page, `stagger-header-1440-${scheme}`, hdr, 16);
    });
    // KF-C21-04 — the layer row vs the live quiet verbs (#/cube).
    await safe(`layer-${scheme}`, async () => {
      await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      rep[`layer-row-${scheme}`] = await page.evaluate(() => { const btns = [...document.querySelectorAll(".pane-frame button")]; const layer = btns.find((b) => b.querySelector("span")?.textContent.trim() === "layer"); const ink = (e) => e && getComputedStyle(e).color; const verb = (t) => btns.find((b) => b.textContent.trim().startsWith(t)); return { layerLabel: ink(layer?.querySelector("span")), layerValue: ink(layer?.querySelectorAll("span")[1]), layerValueText: layer?.querySelectorAll("span")[1]?.textContent.trim(), reverse: ink(verb("Reverse")), preview: ink(verb("Preview")) }; });
      const layer = page.locator(".pane-frame button", { hasText: "single-target only" }).first();
      await crop(page, `layer-row-cube-1440-${scheme}`, layer.locator("xpath=../.."), 12);
      // KF-C21-01 — the cube's easing popover reuses the catalogue at data-density=menu.
      await page.locator('.pane-frame button[aria-haspopup]').first().click(); await page.waitForTimeout(900);
      rep[`popover-tiles-${scheme}`] = await page.evaluate(() => [...document.querySelectorAll('[data-density="menu"] .specimen-tile')].slice(0, 2).map((t) => { const c = getComputedStyle(t); return { state: t.dataset.state, bgi: c.backgroundImage.slice(0, 40), shadow: c.boxShadow.slice(0, 40), border: c.borderTopWidth + " " + c.borderTopStyle }; }));
      await page.screenshot({ path: path.join(OUT, `cube-easing-popover-${scheme}.png`) });
      await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    });
    await ctx.close();
  }
  // KF-C21-02 — the stage title vs the sheet's section label at 390.
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    for (const r of ["spring", "easing", "sequence", "square"]) {
      await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      rep[`title-390-${scheme}-${r}`] = await page.evaluate(() => { const t = document.querySelector("[data-scene-stage-header] h2"); const ls = [...document.querySelectorAll(".configurator-section-label")].filter((e) => e.getBoundingClientRect().height > 0); const f = (e) => e && { text: e.textContent.trim().slice(0, 24), size: getComputedStyle(e).fontSize, family: getComputedStyle(e).fontFamily.split(",")[0], weight: getComputedStyle(e).fontWeight, w: Math.round(e.getBoundingClientRect().width) }; return { title: f(t), label: f(ls[0]) }; });
      await page.screenshot({ path: path.join(OUT, `${r}-390-${scheme}.png`) });
    }
    await ctx.close();
  }
  for (const r of ["spring", "easing", "sequence", "square"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" }); const page = await ctx.newPage();
    await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3000);
    rep[`title-1440-${r}`] = await page.evaluate(() => { const t = document.querySelector("[data-scene-stage-header] h2"); const l = [...document.querySelectorAll(".configurator-section-label")].find((e) => e.getBoundingClientRect().height > 0); return { title: t && getComputedStyle(t).fontSize, label: l && getComputedStyle(l).fontSize }; });
    await ctx.close();
  }
} finally { await browser.close(); fs.writeFileSync(path.join(OUT, "c21-probe.json"), JSON.stringify(rep, null, 1)); console.log(JSON.stringify(rep, null, 1)); }
