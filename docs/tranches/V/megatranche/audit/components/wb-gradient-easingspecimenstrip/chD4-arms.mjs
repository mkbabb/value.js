// CHALLENGE-D pass 4 — viewport / zoom arms + evidence frames. Read-only.
import { chromium } from "playwright";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/shots";

// width/height are CSS px after zoom; dsf emulates the device pixel ratio that
// browser zoom produces on a 1440x900 physical desktop.
const ARMS = [
  { name: "desk-1440", w: 1440, h: 900, dsf: 2, zoom: "100%" },
  { name: "zoom-200", w: 720, h: 450, dsf: 4, zoom: "200% (1440x900 physical)" },
  { name: "zoom-400", w: 360, h: 225, dsf: 8, zoom: "400% (1440x900 physical)" },
  { name: "mobile-390", w: 390, h: 844, dsf: 3, zoom: "100%" },
  { name: "mobile-320", w: 320, h: 568, dsf: 3, zoom: "100%" },
];

const rows = [];
for (const a of ARMS) {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: a.w, height: a.h }, deviceScaleFactor: a.dsf, colorScheme: "light" });
  const p = await c.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await p.waitForTimeout(3200);
  const m = await p.evaluate(() => {
    const port = document.querySelector(".specimen-strip");
    if (!port) return { present: false };
    const pr = port.getBoundingClientRect();
    const tiles = [...document.querySelectorAll(".specimen-tile")];
    const rects = tiles.map((t) => t.getBoundingClientRect());
    const full = rects.filter((r) => r.left >= pr.left - 0.5 && r.right <= pr.right + 0.5).length;
    const part = rects.filter((r) => r.right > pr.left && r.left < pr.right).length;
    const head = document.querySelector(".interval-head");
    const card = head && head.parentElement.getBoundingClientRect();
    return {
      present: true,
      portW: +pr.width.toFixed(1), portH: +pr.height.toFixed(1),
      scrollW: port.scrollWidth, clientW: port.clientWidth,
      tiles: tiles.length, fullyVisible: full, partlyVisible: part,
      offPortPct: +(100 * (1 - full / tiles.length)).toFixed(1),
      tile0: { w: +rects[0].width.toFixed(2), h: +rects[0].height.toFixed(2) },
      cardW: card ? +card.width.toFixed(1) : null,
      docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tileFontPx: getComputedStyle(document.querySelector(".tile-label")).fontSize,
      eyebrowFontPx: getComputedStyle(document.querySelector(".family-eyebrow")).fontSize,
    };
  });
  rows.push({ arm: a.name, zoom: a.zoom, viewport: `${a.w}x${a.h}@${a.dsf}x`, ...m });
  if (m.present) {
    await p.locator(".specimen-strip").first().screenshot({ path: `${OUT}/chD4-strip-${a.name}.png` });
  }
  await b.close();
}

// Evidence frames: the tuned row (radius register) and a 6x tile closeup.
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
await p.evaluate(() => [...document.querySelectorAll("button")].find((x) => x.getAttribute("aria-label") === "Author a custom curve")?.click());
await p.waitForTimeout(1400);
const head = p.locator(".interval-head").first();
const card = p.locator(".interval-head").first().locator("xpath=..");
await card.screenshot({ path: `${OUT}/chD4-row-tuned-radius-register.png` });
// stadium tile closeup: ease-in-out-sine ("in-out")
await p.locator('[data-specimen="ease-in-out-sine"]').first().screenshot({ path: `${OUT}/chD4-tile-inout-stadium.png` });
await p.locator('[data-specimen="steps"]').first().screenshot({ path: `${OUT}/chD4-tile-steps-label.png` });
const dark = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3, colorScheme: "dark" });
const pd = await dark.newPage();
await pd.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await pd.waitForTimeout(3200);
await pd.locator(".specimen-strip").first().screenshot({ path: `${OUT}/chD4-strip-dark-3x.png` });
await b.close();

console.log(JSON.stringify(rows, null, 1));
