// CHALLENGE-D pass 5 — probe D18. Read-only.
//   Q9  the edit overlay in RTL: the hardcoded → against a mirrored flex row
import { chromium } from "playwright";
import { writeFileSync } from "fs";
const HERE = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const BASE = "http://localhost:9000/";
const lab = (i, n) => `lab(${(30 + (55*i)/n).toFixed(1)}% ${(-70 + (150*i)/n).toFixed(1)} ${(80 - (150*i)/n).toFixed(1)})`;
const draft = (n) => Array.from({ length: n }, (_, i) => lab(i, n));
const browser = await chromium.launch();
const R = {};
for (const dir of ["ltr", "rtl"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.addInitScript((c) => {
    localStorage.setItem("color-picker", JSON.stringify({ inputColor: "lab(72% 40 -60)", savedColors: c }));
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
  }, draft(3));
  await page.goto(BASE + "#/palettes", { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.evaluate((d) => { document.documentElement.setAttribute("dir", d); }, dir);
  await page.waitForTimeout(500);
  await page.locator('.swatch-row [data-testid="watercolor-swatch"]').first().hover({ force: true }).catch(()=>{});
  await page.waitForTimeout(400);
  await page.locator('[aria-label^="Edit color"]').first().click({ force: true }).catch(()=>{});
  await page.waitForTimeout(900);
  R[dir] = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    const ov = well.querySelector(".edit-overlay");
    if (!ov) return { overlay: false };
    const o = ov.getBoundingClientRect();
    const row = ov.firstElementChild;
    const items = [...row.children].map((e) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return { tag: e.tagName, variant: e.getAttribute("data-variant"), text: e.textContent.trim(),
               x: +r.x.toFixed(1), w: +r.width.toFixed(1), dir: s.direction, unicodeBidi: s.unicodeBidi };
    });
    const well_r = well.getBoundingClientRect();
    const faces = [...well.querySelectorAll('.swatch-row [data-testid="watercolor-swatch"]')].map((e) => +e.getBoundingClientRect().x.toFixed(1));
    return { overlay: true, dir: getComputedStyle(document.documentElement).direction,
             overlayRect: { x: +o.x.toFixed(1), y: +o.y.toFixed(1), w: +o.width.toFixed(1), h: +o.height.toFixed(1) },
             wellRect: { x: +well_r.x.toFixed(1), w: +well_r.width.toFixed(1) },
             overlayLeftOfWell: +(o.x - well_r.x).toFixed(1),
             transformOrigin: getComputedStyle(ov).transformOrigin,
             insetInline: `left:${getComputedStyle(ov).left} right:${getComputedStyle(ov).right}`,
             rowItems: items, faceXs: faces };
  });
  await page.screenshot({ path: `${HERE}/frames-D14/q9-${dir}-edit-overlay.png`, clip: { x: dir === "rtl" ? 10 : 690, y: 330, width: 740, height: 260 } });
  await ctx.close();
}
await browser.close();
writeFileSync(`${HERE}/probe-D18-pass5.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 2));
