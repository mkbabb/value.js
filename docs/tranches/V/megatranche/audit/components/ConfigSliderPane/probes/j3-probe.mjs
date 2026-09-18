// JUROR-3 consolidated witness. Chromium (WebKit ignores forcedColors — MT-F022 / states.mjs:8).
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;

const ORIGIN = "http://localhost:9000";
const out = {};

// --- shared in-page measurement kit --------------------------------------
const KIT = () => {
  const px = (s) => parseFloat(s) || 0;
  const srgb = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const cv = document.createElement("canvas"); cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  window.__lum = (col) => {
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = col; ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return 0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
  };
  window.__ratio = (a, b) => { const x = window.__lum(a), y = window.__lum(b); const [h, l] = x > y ? [x, y] : [y, x]; return +((h + 0.05) / (l + 0.05)).toFixed(2); };
  window.__px = px;
};

// --- 1. composition + geometry + type + contrast, both schemes -----------
async function compositionArm(browser, scheme) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.addInitScript(KIT);
  await page.goto(`${ORIGIN}/#/blob`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const rect = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const cs = (el, p) => (el ? getComputedStyle(el).getPropertyValue(p).trim() : null);
    const console_ = document.querySelector(".config-console");
    const well = console_;
    const wellBg = cs(well, "background-color");
    const rows = [...document.querySelectorAll(".config-console .configurator-row")];
    const row0 = rows[0];
    const track = document.querySelector(".config-console .slider-track");
    const range = document.querySelector(".config-console .slider-range");
    const thumb = document.querySelector(".config-console [role=slider]");
    const secTitle = document.querySelector(".config-section-title");
    const secHeader = document.querySelector(".config-section-header");
    const label = row0?.querySelector("label");
    const value = row0?.querySelector(".font-mono");
    const scroller = document.querySelector(".pane-scroll-fade");
    const panes = [...document.querySelectorAll("[class*='pane-wrapper']")].map((e) => ({ cls: e.className, ...rect(e) }));
    const main = document.querySelector("main");
    const canvases = [...document.querySelectorAll("canvas")].map((c) => ({ ...rect(c), area: +(c.getBoundingClientRect().width * c.getBoundingClientRect().height).toFixed(0) }));
    const dividerCol = cs(secHeader, "border-bottom-color");
    const typeOf = (el) => el ? { fam: cs(el, "font-family").split(",")[0].replace(/"/g, ""), size: cs(el, "font-size"), weight: cs(el, "font-weight"), tt: cs(el, "text-transform"), ls: cs(el, "letter-spacing"), color: cs(el, "color"), fvn: cs(el, "font-variant-numeric") } : null;
    // reserved-width probe: swap the readout text in place and re-measure
    let widthShift = null;
    if (value) {
      const before = value.getBoundingClientRect().width, txt = value.textContent;
      value.textContent = "3"; const narrow = value.getBoundingClientRect().width;
      value.textContent = "-0.0005"; const wide = value.getBoundingClientRect().width;
      value.textContent = txt;
      widthShift = { shipped: txt, shippedW: +before.toFixed(1), narrowW: +narrow.toFixed(1), widestW: +wide.toFixed(1), swingPx: +(wide - narrow).toFixed(1) };
    }
    return {
      panes, mainRect: rect(main), canvases,
      cardCount: document.querySelectorAll(".config-console, [class*='glass-resting']").length,
      paneAncestry: (() => { const a = []; let e = console_?.parentElement; while (e && a.length < 6) { if (/glass-|card/.test(e.className)) a.push(e.className.slice(0, 70)); e = e.parentElement; } return a; })(),
      rowCount: rows.length,
      rowH: row0 ? +row0.getBoundingClientRect().height.toFixed(2) : null,
      rowMinBlock: cs(row0, "min-block-size"),
      containerW: console_ ? +console_.getBoundingClientRect().width.toFixed(1) : null,
      track: track ? { ...rect(track), bg: cs(track, "background-color"), bgImg: cs(track, "background-image"), border: cs(track, "border-width") } : null,
      range: range ? { ...rect(range), bg: cs(range, "background-color"), bgImg: cs(range, "background-image"), op: cs(range, "opacity") } : null,
      thumb: thumb ? { ...rect(thumb), bg: cs(thumb, "background-color") } : null,
      wellBg,
      contrast: {
        trackVsWell: window.__ratio(cs(track, "background-color"), wellBg),
        labelVsWell: window.__ratio(cs(label, "color"), wellBg),
        valueVsWell: window.__ratio(cs(value, "color"), wellBg),
        secTitleVsWell: window.__ratio(cs(secTitle, "color"), wellBg),
        dividerVsWell: window.__ratio(dividerCol, wellBg),
      },
      type: { secTitle: typeOf(secTitle), rowLabel: typeOf(label), value: typeOf(value) },
      dividers: { sectionHeaders: document.querySelectorAll(".config-section-header").length, actionBars: document.querySelectorAll(".config-action-bar").length },
      scroll: scroller ? { sh: scroller.scrollHeight, ch: scroller.clientHeight, screens: +(scroller.scrollHeight / scroller.clientHeight).toFixed(2), mask: cs(scroller, "mask-image"), wkMask: cs(scroller, "-webkit-mask-image") } : null,
      widthShift,
      variants: [...new Set([...document.querySelectorAll(".config-console .glass-slider")].map((s) => s.dataset.variant))],
      valuetextEmpty: [...document.querySelectorAll(".config-console [role=slider]")].filter((s) => !s.getAttribute("aria-valuetext")).length,
      groupRoles: document.querySelectorAll(".config-console [role=group], .config-console fieldset, .config-console h1,h2,h3,h4,h5,h6").length,
      liveRegions: document.querySelectorAll(".config-console [aria-live], .config-action-bar [aria-live]").length,
    };
  });
  await ctx.close();
  return r;
}

// --- 2. forced colors (Chromium honours it) ------------------------------
async function forcedArm(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
  const page = await ctx.newPage();
  await page.addInitScript(KIT);
  await page.goto(`${ORIGIN}/#/blob`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2500);
  const before = await page.evaluate(() => {
    const cs = (el, p) => (el ? getComputedStyle(el).getPropertyValue(p).trim() : null);
    const t = document.querySelector(".config-console .slider-track");
    const rg = document.querySelector(".config-console .slider-range");
    const w = document.querySelector(".config-console");
    const sh = document.querySelector(".config-section-header");
    return {
      forcedActive: matchMedia("(forced-colors: active)").matches,
      trackBg: cs(t, "background-color"), wellBg: cs(w, "background-color"),
      trackEqualsWell: cs(t, "background-color") === cs(w, "background-color"),
      trackBorderW: cs(t, "border-width"),
      rangeBg: cs(rg, "background-color"), rangeW: rg ? +rg.getBoundingClientRect().width.toFixed(1) : null,
      trackW: t ? +t.getBoundingClientRect().width.toFixed(1) : null,
      dividerColor: cs(sh, "border-bottom-color"),
      trackVsWell: window.__ratio(cs(t, "background-color"), cs(w, "background-color")),
    };
  });
  // focus the first config thumb, then read the focus indicator
  await page.evaluate(() => document.querySelector(".config-console [role=slider]")?.focus());
  await page.waitForTimeout(300);
  const focus = await page.evaluate(() => {
    const ae = document.activeElement;
    const c = getComputedStyle(ae);
    return { tag: ae.tagName, label: ae.getAttribute("aria-label"), outlineStyle: c.outlineStyle, outlineWidth: c.outlineWidth, outlineColor: c.outlineColor, boxShadow: c.boxShadow, forcedAdjust: c.forcedColorAdjust };
  });
  await page.screenshot({ path: resolve(HERE, "j3-forced-blob.png") });
  await ctx.close();
  return { ...before, focus };
}

// --- 3. focus visibility in ordinary light -------------------------------
async function focusArm(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.addInitScript(KIT);
  await page.goto(`${ORIGIN}/#/blob`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => document.querySelector(".config-console [role=slider]")?.focus());
  await page.waitForTimeout(250);
  const r = await page.evaluate(() => {
    const ae = document.activeElement; const c = getComputedStyle(ae);
    return { label: ae.getAttribute("aria-label"), outlineStyle: c.outlineStyle, outlineWidth: c.outlineWidth, boxShadow: c.boxShadow.slice(0, 160), w: +ae.getBoundingClientRect().width.toFixed(1), h: +ae.getBoundingClientRect().height.toFixed(1) };
  });
  await ctx.close();
  return r;
}

// --- 4. motion + drag performance ----------------------------------------
async function perfArm(browser, reduced) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", ...(reduced ? { reducedMotion: "reduce" } : {}) });
  const page = await ctx.newPage();
  await page.addInitScript(() => { window.__raf = 0; const o = requestAnimationFrame; window.requestAnimationFrame = function (cb) { window.__raf++; return o.call(window, cb); }; });
  await page.goto(`${ORIGIN}/#/blob`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(3000);
  const a = await page.evaluate(() => window.__raf);
  await page.waitForTimeout(2000);
  const rafRate = ((await page.evaluate(() => window.__raf)) - a) / 2;
  // drag latency: 40 ArrowRight on the first config thumb, dispatch -> mutation
  const lat = await page.evaluate(async () => {
    const th = document.querySelector(".config-console [role=slider]");
    th.focus();
    const host = document.querySelector(".config-console");
    const samples = [];
    for (let i = 0; i < 40; i++) {
      const t0 = performance.now();
      const done = new Promise((res) => { const mo = new MutationObserver(() => { mo.disconnect(); res(performance.now() - t0); }); mo.observe(host, { subtree: true, childList: true, characterData: true, attributes: true }); setTimeout(() => { mo.disconnect(); res(-1); }, 200); });
      th.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      const d = await done; if (d > 0) samples.push(d);
      await new Promise((r) => setTimeout(r, 16));
    }
    samples.sort((x, y) => x - y);
    return { n: samples.length, median: +samples[Math.floor(samples.length / 2)].toFixed(2), p95: +samples[Math.floor(samples.length * 0.95)].toFixed(2), max: +samples[samples.length - 1].toFixed(2) };
  });
  const anims = await page.evaluate(() => ({ running: document.getAnimations().filter((a) => a.playState === "running").length, inPane: document.querySelector(".config-console") ? document.querySelector(".config-console").getAnimations({ subtree: true }).length : -1 }));
  await ctx.close();
  return { rafPerSec: +rafRate.toFixed(1), lat, anims };
}

// --- 5. narrow arm: what does /#/blob show at 390 and at 720 (200% zoom)? -
async function narrowArm(browser, w, h, dsf) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/#/blob`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => ({
    url: location.hash,
    rows: document.querySelectorAll(".config-console .configurator-row").length,
    consolePresent: !!document.querySelector(".config-console"),
    toggleText: [...document.querySelectorAll("button,[role=tab],[role=radio]")].map((b) => (b.textContent || "").trim()).filter((t) => /picker|blob/i.test(t)),
    pressed: [...document.querySelectorAll("[aria-pressed],[aria-selected],[data-state]")].filter((e) => /picker|blob/i.test(e.textContent || "")).map((e) => ({ t: (e.textContent || "").trim().slice(0, 20), p: e.getAttribute("aria-pressed"), s: e.getAttribute("aria-selected"), d: e.getAttribute("data-state") })),
  }));
  await ctx.close();
  return r;
}

const browser = await chromium.launch();
out.light = await compositionArm(browser, "light");
out.dark = await compositionArm(browser, "dark");
out.forced = await forcedArm(browser);
out.focusLight = await focusArm(browser);
out.motion = await perfArm(browser, false);
out.motionReduced = await perfArm(browser, true);
out.narrow390 = await narrowArm(browser, 390, 844, 3);
out.zoom200 = await narrowArm(browser, 720, 450, 2);
await browser.close();
writeFileSync(resolve(HERE, "j3-out.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
