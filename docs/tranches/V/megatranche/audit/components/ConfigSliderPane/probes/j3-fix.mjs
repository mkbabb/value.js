// JUROR-3 corrective arm: alpha-composited divider contrast, correctly-scoped a11y structure,
// and the /#/atmosphere composition (the pane's OTHER consumer).
import { chromium } from "playwright";
const ORIGIN = "http://localhost:9000";

const KIT = () => {
  const srgb = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const cv = document.createElement("canvas"); cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  // composite `col` over `base` (both CSS colors), then return luminance — the honest
  // treatment for a translucent border. Filling over #000 is what produced the bad numbers.
  window.__lumOver = (col, base) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = base; ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = col; ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return 0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
  };
  window.__ratioOver = (col, base) => {
    const x = window.__lumOver(col, base), y = window.__lumOver(base, base);
    const [h, l] = x > y ? [x, y] : [y, x];
    return +((h + 0.05) / (l + 0.05)).toFixed(2);
  };
};

const run = async (browser, scheme, route) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.addInitScript(KIT);
  await page.goto(`${ORIGIN}/#/${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const cs = (el, p) => (el ? getComputedStyle(el).getPropertyValue(p).trim() : null);
    const rect = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const cons = document.querySelector(".config-console");
    const sh = document.querySelector(".config-section-header");
    const ab = document.querySelector(".config-action-bar");
    const wellBg = cs(cons, "background-color");
    const main = document.querySelector("main");
    const panes = [...document.querySelectorAll("[class*='pane-wrapper']")].map((e) => ({ cls: e.className.split(" ")[1], ...rect(e) }));
    return {
      route: location.hash,
      wellBg,
      sectionBorderRaw: cs(sh, "border-bottom-color"),
      actionBarBorderRaw: cs(ab, "border-top-color"),
      dividerVsWell_composited: sh ? window.__ratioOver(cs(sh, "border-bottom-color"), wellBg) : null,
      actionBarVsWell_composited: ab ? window.__ratioOver(cs(ab, "border-top-color"), cs(ab, "background-color") || wellBg) : null,
      // correctly scoped structure census
      groupsInConsole: cons ? cons.querySelectorAll("[role=group],fieldset").length : null,
      headingsInConsole: cons ? cons.querySelectorAll("h1,h2,h3,h4,h5,h6,[role=heading]").length : null,
      sectionTitleTags: [...document.querySelectorAll(".config-section-title")].map((e) => ({ tag: e.tagName, role: e.getAttribute("role"), id: e.id || null })),
      orphanLabels: cons ? [...cons.querySelectorAll("label")].filter((l) => !l.htmlFor && !l.querySelector("input,select,textarea,[role=slider]")).length : null,
      labelTotal: cons ? cons.querySelectorAll("label").length : null,
      // pause / still control for ambient motion (VC §6)
      pauseControls: [...document.querySelectorAll("button,[role=switch],[role=checkbox]")].filter((b) => /pause|still|stop|motion|animate/i.test((b.textContent || "") + (b.getAttribute("aria-label") || ""))).length,
      panes, mainW: main ? +main.getBoundingClientRect().width.toFixed(1) : null,
      canvases: [...document.querySelectorAll("canvas")].map((c) => rect(c)),
      configConsoleRect: rect(cons),
      rows: document.querySelectorAll(".config-console .configurator-row").length,
      slotRows: document.querySelectorAll(".aurora-row").length,
    };
  });
  await ctx.close();
  return r;
};

const b = await chromium.launch();
const o = {
  blobLight: await run(b, "light", "blob"),
  blobDark: await run(b, "dark", "blob"),
  atmoLight: await run(b, "light", "atmosphere"),
};
await b.close();
console.log(JSON.stringify(o, null, 2));
