// CHALLENGE-D pass 4 — (a) the drawn curve stage inside the disclosed well,
// (b) the type inventory of the whole interval card, (c) an independent
// re-verification of the pass-2 BLOCKER on a third cold run. Read-only.
import { chromium } from "playwright";

const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
await p.evaluate(() => [...document.querySelectorAll("button")].find((x) => x.getAttribute("aria-label") === "Author a custom curve")?.click());
await p.waitForTimeout(1500);

const stage = await p.evaluate(() => {
  const svg = document.querySelector(".easing-authoring svg[role='img']");
  if (!svg) return null;
  const sr = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  const kids = [...svg.querySelectorAll("*")].map((e) => {
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, cls: (e.getAttribute("class") || "").slice(0, 30), w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: +(r.left - sr.left).toFixed(1) };
  }).filter((k) => k.w > 20 && k.h > 20);
  const well = document.querySelector(".easing-authoring .glass-card").getBoundingClientRect();
  return {
    wellBox: { w: +well.width.toFixed(1), h: +well.height.toFixed(1) },
    svgBox: { w: +sr.width.toFixed(1), h: +sr.height.toFixed(1) },
    viewBox: { x: vb.x, y: vb.y, w: vb.width, h: vb.height },
    svgCss: { inlineSize: getComputedStyle(svg).inlineSize, aspect: getComputedStyle(svg).aspectRatio },
    kids,
    // the plot square = viewBox minus the producer's VIEW_PAD on each side
    plotFractionOfViewBox: null,
  };
});

const type = await p.evaluate(() => {
  const head = document.querySelector(".interval-head");
  const card = head.parentElement;
  const rows = [];
  const walk = (el) => {
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (direct) {
      const cs = getComputedStyle(el);
      rows.push({
        text: el.textContent.trim().slice(0, 22),
        px: cs.fontSize, weight: cs.fontWeight,
        family: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
        transform: cs.textTransform, color: cs.color,
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 46),
      });
    }
    for (const k of el.children) walk(k);
  };
  walk(card);
  const sizes = [...new Set(rows.map((r) => r.px))].sort((a, b) => parseFloat(a) - parseFloat(b));
  const fams = [...new Set(rows.map((r) => r.family))];
  return { rows: rows.slice(0, 40), distinctSizes: sizes, distinctFamilies: fams, count: rows.length };
});
await b.close();

// (c) BLOCKER re-verification, cold context, third engine run
const results = [];
for (const id of ["ease-in-out-back", "ease-out-quad"]) {
  const bb = await chromium.launch();
  const cc = await bb.newContext({ viewport: { width: 1440, height: 900 } });
  const pp = await cc.newPage();
  const errs = [];
  pp.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
  await pp.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await pp.waitForTimeout(3200);
  const before = await pp.evaluate(() => ({ tiles: document.querySelectorAll(".specimen-tile").length, rows: document.querySelectorAll(".interval-head").length }));
  await pp.locator(`[data-specimen="${id}"]`).first().click({ force: true });
  await pp.waitForTimeout(1200);
  const after = await pp.evaluate(() => ({
    tiles: document.querySelectorAll(".specimen-tile").length,
    rows: document.querySelectorAll(".interval-head").length,
    body: document.body.innerText.replace(/\s+/g, " ").slice(0, 90),
  }));
  results.push({ id, before, after, survived: after.tiles > 0, pageErrors: errs });
  await bb.close();
}

console.log(JSON.stringify({ stage, type, crash: results }, null, 1));
