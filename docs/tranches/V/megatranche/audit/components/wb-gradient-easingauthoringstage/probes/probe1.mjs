import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] || "/tmp/out";
fs.mkdirSync(OUT, { recursive: true });

const MEASURE = () => {
  const q = (s, r = document) => r.querySelector(s);
  const stage = q(".easing-authoring");
  if (!stage) return { error: "no .easing-authoring" };
  const picker = q('[data-testid="easing-picker"]', stage);
  const card = q(".glass-card", stage);
  const svg = q("svg", stage);
  const rect = (e) => (e ? (({ x, y, width, height }) => ({ x: +x.toFixed(2), y: +y.toFixed(2), w: +width.toFixed(2), h: +height.toFixed(2) }))(e.getBoundingClientRect()) : null);
  const cs = (e, props) => {
    if (!e) return null;
    const c = getComputedStyle(e);
    const o = {};
    for (const p of props) o[p] = c.getPropertyValue(p);
    return o;
  };
  let letterbox = null;
  if (svg) {
    const vb = svg.viewBox.baseVal;
    const r = svg.getBoundingClientRect();
    const s = Math.min(r.width / vb.width, r.height / vb.height);
    const drawnW = vb.width * s, drawnH = vb.height * s;
    letterbox = {
      viewBox: svg.getAttribute("viewBox"),
      vbRatio_h_over_w: +(vb.height / vb.width).toFixed(4),
      elementBox: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
      drawnInk: { w: +drawnW.toFixed(2), h: +drawnH.toFixed(2) },
      deadPx: +(r.width * r.height - drawnW * drawnH).toFixed(0),
      deadPct: +(100 * (1 - (drawnW * drawnH) / (r.width * r.height))).toFixed(1),
      role: svg.getAttribute("role"),
      inlineStyle: svg.getAttribute("style"),
    };
  }
  const census = {
    "svg[role='img']": document.querySelectorAll(".easing-authoring svg[role='img']").length,
    "svg[role='group']": document.querySelectorAll(".easing-authoring svg[role='group']").length,
    ".glass-card": document.querySelectorAll(".easing-authoring .glass-card").length,
    "picker": document.querySelectorAll('.easing-authoring [data-testid="easing-picker"]').length,
    "readout": document.querySelectorAll('.easing-authoring [data-testid="easing-readout"]').length,
    "stagesInDoc": document.querySelectorAll(".easing-authoring").length,
    "pickersInDoc": document.querySelectorAll('[data-testid="easing-picker"]').length,
  };
  return {
    stageStyleAttr: stage.getAttribute("style"),
    vbRatioVar: getComputedStyle(stage).getPropertyValue("--vb-ratio"),
    rects: { stage: rect(stage), picker: rect(picker), card: rect(card), svg: rect(svg) },
    pickerCS: cs(picker, ["grid-template-columns", "gap"]),
    cardCS: cs(card, ["background-color", "border-color", "border-width", "box-shadow", "backdrop-filter", "border-radius", "padding"]),
    svgCS: cs(svg, ["inline-size", "block-size", "aspect-ratio", "margin-inline-start", "margin-inline-end", "transition-property", "width", "height", "container-type"]),
    letterbox,
    census,
    gutterRight: card && svg ? +(card.getBoundingClientRect().right - svg.getBoundingClientRect().right).toFixed(2) : null,
    gutterLeft: card && svg ? +(svg.getBoundingClientRect().left - card.getBoundingClientRect().left).toFixed(2) : null,
    docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    cqAncestor: (() => {
      let e = svg?.parentElement, out = [];
      while (e && out.length < 12) {
        const ct = getComputedStyle(e).containerType;
        if (ct && ct !== "normal") out.push({ tag: e.tagName + "." + String(e.className).slice(0, 40), containerType: ct, w: +e.getBoundingClientRect().width.toFixed(1) });
        e = e.parentElement;
      }
      return out;
    })(),
  };
};

async function openStage(page) {
  await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
  await page.waitForTimeout(2500);
  const tune = page.locator('button[aria-label="Author a custom curve"]').first();
  await tune.waitFor({ state: "visible", timeout: 15000 });
  await tune.click();
  await page.waitForTimeout(700);
}

const runs = [
  { name: "d-light", vp: { width: 1440, height: 900 }, media: { colorScheme: "light" } },
  { name: "d-dark", vp: { width: 1440, height: 900 }, media: { colorScheme: "dark" } },
  { name: "m-light", vp: { width: 390, height: 844 }, media: { colorScheme: "light" } },
  { name: "m-dark", vp: { width: 390, height: 844 }, media: { colorScheme: "dark" } },
  { name: "w320", vp: { width: 320, height: 800 }, media: { colorScheme: "light" } },
  { name: "zoom200", vp: { width: 720, height: 450 }, media: { colorScheme: "light" } },
  { name: "forced-colors", vp: { width: 1440, height: 900 }, media: { colorScheme: "light", forcedColors: "active" } },
  { name: "reduced-motion", vp: { width: 1440, height: 900 }, media: { colorScheme: "light", reducedMotion: "reduce" } },
  { name: "rtl", vp: { width: 1440, height: 900 }, media: { colorScheme: "light" }, rtl: true },
];

const browser = await chromium.launch();
const results = {};
for (const r of runs) {
  const ctx = await browser.newContext({ viewport: r.vp, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.emulateMedia(r.media);
  if (r.rtl) await page.addInitScript(() => { document.documentElement.setAttribute("dir", "rtl"); });
  try {
    await openStage(page);
    if (r.rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(300); }
    results[r.name] = await page.evaluate(MEASURE);
    const stage = page.locator(".easing-authoring").first();
    await stage.screenshot({ path: `${OUT}/${r.name}-stage.png` });
    const row = page.locator('[id^="easing-interval-"]').first();
    await row.screenshot({ path: `${OUT}/${r.name}-row.png` }).catch(() => {});
  } catch (e) {
    results[r.name] = { error: String(e).slice(0, 400) };
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${OUT}/measure.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
