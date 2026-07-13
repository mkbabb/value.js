// U.W-VISUAL GATE probe #2 — BR-9/BR-11 whole-header contraction under REAL
// scroll (short viewports that force card/page overflow, matching the lane's
// 390x520 frames) + BR-5 one-law rhythm (rowGap) at rest. Both schemes.
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const PORT = 8599;
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/pi/gate";
mkdirSync(OUT, { recursive: true });
const SEED = "oklch(0.62 0.17 28)";
const base = `http://127.0.0.1:${PORT}/#/?space=oklch&color=${encodeURIComponent(SEED)}`;

const measure = () => {
  const q = (s) => document.querySelector(s);
  const header = q(".picker-header");
  const title = q(".picker-header .space-trigger");
  const readout = q(".picker-header .readout") || q(".readout");
  const cs = header ? getComputedStyle(header) : null;
  const rectH = (el) => (el ? +el.getBoundingClientRect().height.toFixed(2) : null);
  const tr = title?.getBoundingClientRect(), rr = readout?.getBoundingClientRect();
  return {
    condensed: header?.classList.contains("is-condensed") ?? null,
    headerH: rectH(header),
    padTop: cs?.paddingTop, padBottom: cs?.paddingBottom,
    position: cs?.position, rowGap: cs?.rowGap,
    titleFs: title ? +parseFloat(getComputedStyle(title).fontSize).toFixed(3) : null,
    seam: (tr && rr) ? +(rr.top - tr.bottom).toFixed(2) : null,
  };
};

const forceScroll = () => {
  const sentinel = document.querySelector(".header-sentinel");
  let node = sentinel?.parentElement || null, root = null;
  while (node) { const oy = getComputedStyle(node).overflowY; if (oy === "auto" || oy === "scroll") { root = node; break; } node = node.parentElement; }
  const se = document.scrollingElement;
  const info = {
    root: root ? (root.className || root.tagName).slice(0, 40) : "VIEWPORT",
    rootOverflow: root ? root.scrollHeight - root.clientHeight : null,
    pageOverflow: se.scrollHeight - se.clientHeight,
  };
  const scroller = root || se;
  scroller.scrollTo({ top: 10_000, behavior: "instant" });
  window.scrollTo({ top: 10_000, behavior: "instant" });
  info.scrolledTop = scroller.scrollTop;
  return info;
};

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist", "--force-device-scale-factor=2"],
});

const results = {};
for (const scheme of ["light", "dark"]) {
  for (const [name, vp] of [["1440x640", { width: 1440, height: 640 }], ["390x520", { width: 390, height: 520 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForSelector(".picker-header", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1200);
    const key = `${scheme}-${name}`;

    const rest = await page.evaluate(measure);
    const hEl = await page.$(".picker-header");
    if (hEl) await hEl.screenshot({ path: `${OUT}/c-${key}-rest.png` }).catch(() => {});

    const si = await page.evaluate(forceScroll);
    // poll for condense up to ~2s (IntersectionObserver + sufficiency gate + transition)
    let condensed = false;
    for (let i = 0; i < 8; i++) {
      await page.waitForTimeout(250);
      condensed = await page.evaluate(() => document.querySelector(".picker-header")?.classList.contains("is-condensed") ?? false);
      if (condensed) break;
    }
    await page.waitForTimeout(400); // let the transition settle
    const scrolled = await page.evaluate(measure);
    const hEl2 = await page.$(".picker-header");
    if (hEl2) await hEl2.screenshot({ path: `${OUT}/c-${key}-scrolled.png` }).catch(() => {});

    results[key] = {
      scroll: si,
      condensed_class: scrolled.condensed,
      position: rest.position,
      rowGap: rest.rowGap,
      seam_rest: rest.seam,
      headerH_rest: rest.headerH, headerH_scrolled: scrolled.headerH,
      headerH_delta: (rest.headerH != null && scrolled.headerH != null) ? +(scrolled.headerH - rest.headerH).toFixed(2) : null,
      padTop_rest: rest.padTop, padTop_scrolled: scrolled.padTop,
      titleFs_rest: rest.titleFs, titleFs_scrolled: scrolled.titleFs,
    };
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}/gate-probe2-log.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
