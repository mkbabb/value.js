// U.W-VISUAL INDEPENDENT GATE probe — merged tranche-u build @ :8599 (dpr2).
// Certifies the U-F9 header cures (BR-4 guard, BR-5 rhythm, BR-9 whole-header
// contraction=REAL layout shrink, BR-11 condensed-title legibility floor) +
// the zd3-microchrome riders (dynamic <title>, .scrollbar-thin consumers).
// Emits compact JSON + element-clipped PNGs. Both viewports, both schemes.
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const PORT = 8599;
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/pi/gate";
mkdirSync(OUT, { recursive: true });
const SEED = "oklch(0.62 0.17 28)"; // chromatic brick seed
const base = `http://127.0.0.1:${PORT}/#/?space=oklch&color=${encodeURIComponent(SEED)}`;

const results = { br4: {}, br5: {}, br9: {}, br11: {}, riders: {} };

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist", "--force-device-scale-factor=2"],
});

// ---- measure helpers run in-page ----
const measureAtRest = () => {
  const q = (s) => document.querySelector(s);
  const header = q(".picker-header");
  const title = q(".picker-header .space-trigger");
  const readout = q(".picker-header .readout") || q(".readout");
  const cs = header ? getComputedStyle(header) : null;
  const rootCS = getComputedStyle(document.documentElement);
  const tok = (n) => rootCS.getPropertyValue(n).trim();
  const rectH = (el) => (el ? +el.getBoundingClientRect().height.toFixed(2) : null);
  const titleR = title?.getBoundingClientRect();
  const readoutR = readout?.getBoundingClientRect();
  return {
    hasHeader: !!header,
    condensedClass: header?.classList.contains("is-condensed") ?? null,
    headerH: rectH(header),
    headerPadTop: cs ? cs.paddingTop : null,
    headerPadBottom: cs ? cs.paddingBottom : null,
    headerPosition: cs ? cs.position : null,
    titleFs: title ? +parseFloat(getComputedStyle(title).fontSize).toFixed(3) : null,
    rowGap: cs ? cs.rowGap : null,
    // BR-5: title -> readout vertical gap (readout top - title bottom)
    titleBottom: titleR ? +titleR.bottom.toFixed(2) : null,
    readoutTop: readoutR ? +readoutR.top.toFixed(2) : null,
    seam: (titleR && readoutR) ? +(readoutR.top - titleR.bottom).toFixed(2) : null,
    tokDisplay1: tok("--type-display-1"),
    tokDisplay2: tok("--type-display-2"),
  };
};

// resolve scroll root & attempt condense
const drive = async (page) => {
  return await page.evaluate(async () => {
    const header = document.querySelector(".picker-header");
    const sentinel = document.querySelector(".header-sentinel");
    // resolve scroll root the same way useHeaderCondense does
    let node = sentinel?.parentElement || null;
    let root = null;
    while (node) {
      const oy = getComputedStyle(node).overflowY;
      if (oy === "auto" || oy === "scroll") { root = node; break; }
      node = node.parentElement;
    }
    const info = {
      scrollRoot: root ? (root.className || root.tagName).toString().slice(0, 60) : "VIEWPORT(none)",
      scrollHeight: root ? root.scrollHeight : document.scrollingElement.scrollHeight,
      clientHeight: root ? root.clientHeight : document.scrollingElement.clientHeight,
    };
    info.overflow = info.scrollHeight - info.clientHeight;
    // scroll
    const scroller = root || document.scrollingElement;
    scroller.scrollTo({ top: Math.max(200, info.overflow), behavior: "instant" });
    // also nudge window in case viewport is the root
    window.scrollTo({ top: 400, behavior: "instant" });
    return info;
  });
};

for (const scheme of ["light", "dark"]) {
  for (const [vpName, vp] of [["1440", { width: 1440, height: 900 }], ["390", { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForSelector(".picker-header", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1200); // hydrate + blob settle

    const key = `${scheme}-${vpName}`;

    // ---- AT REST ----
    const rest = await page.evaluate(measureAtRest);
    // element-clipped frame at rest
    const hEl = await page.$(".picker-header");
    if (hEl) await hEl.screenshot({ path: `${OUT}/gate-${key}-rest.png` }).catch(() => {});

    // ---- DRIVE SCROLL -> CONDENSE ----
    const driveInfo = await drive(page);
    // wait for IntersectionObserver + transition
    await page.waitForTimeout(700);
    const condensedClassNow = await page.evaluate(() =>
      document.querySelector(".picker-header")?.classList.contains("is-condensed") ?? false);
    const scrolled = await page.evaluate(measureAtRest);
    const hEl2 = await page.$(".picker-header");
    if (hEl2) await hEl2.screenshot({ path: `${OUT}/gate-${key}-scrolled.png` }).catch(() => {});

    results.br4[key] = { titleFs_rest: rest.titleFs, tokDisplay2: rest.tokDisplay2, position: rest.headerPosition };
    results.br5[key] = { seam: rest.seam, rowGap: rest.rowGap, titleBottom: rest.titleBottom, readoutTop: rest.readoutTop };
    results.br9[key] = {
      scrollRoot: driveInfo.scrollRoot, overflow: driveInfo.overflow,
      condensed: condensedClassNow,
      headerH_rest: rest.headerH, headerH_scrolled: scrolled.headerH,
      headerH_delta: (rest.headerH != null && scrolled.headerH != null) ? +(scrolled.headerH - rest.headerH).toFixed(2) : null,
      padTop_rest: rest.headerPadTop, padTop_scrolled: scrolled.headerPadTop,
      padBottom_rest: rest.headerPadBottom, padBottom_scrolled: scrolled.headerPadBottom,
    };
    results.br11[key] = {
      titleFs_rest: rest.titleFs, titleFs_scrolled: scrolled.titleFs, tokDisplay1: rest.tokDisplay1,
      condensed: condensedClassNow,
    };
    await ctx.close();
  }
}

// ---- RIDERS (single light 1440 ctx) ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const titleInitial = await page.title();
  // drive a color + view change
  await page.goto(`http://127.0.0.1:${PORT}/#/palettes?space=oklch&color=${encodeURIComponent("tomato")}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const titlePalettes = await page.title();
  await page.goto(`http://127.0.0.1:${PORT}/#/gradient?space=oklch&color=${encodeURIComponent("rebeccapurple")}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const titleGradient = await page.title();
  // scrollbar-thin consumers across views
  const countThin = async () => page.evaluate(() =>
    Array.from(document.querySelectorAll(".scrollbar-thin"))
      .filter(el => getComputedStyle(el).scrollbarWidth === "thin").length);
  const thinGradient = await countThin();
  await page.goto(`http://127.0.0.1:${PORT}/#/atmosphere`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const thinAtmosphere = await countThin();
  results.riders = {
    titleInitial, titlePalettes, titleGradient,
    dynamic: new Set([titleInitial, titlePalettes, titleGradient]).size > 1,
    scrollbarThin_gradientView: thinGradient, scrollbarThin_atmosphereView: thinAtmosphere,
    scrollbarThin_total_seen: Math.max(thinGradient, thinAtmosphere),
  };
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/gate-probe-log.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
