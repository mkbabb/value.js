// CHALLENGE-D pass 2 — exact rendered-contrast probe.
// Resolves every colour through a canvas 2D context so oklab()/oklch()/color()
// serialisations become real sRGB bytes before any ratio is computed.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const OUT = new URL("./probe-D6.json", import.meta.url).pathname;
const FIVE = ["rgb(226 87 31)", "rgb(31 119 226)", "rgb(52 168 83)", "rgb(234 179 8)", "rgb(147 51 234)"];
const seed = (saved) => `localStorage.setItem("color-picker", JSON.stringify({inputColor:${JSON.stringify(saved[0])},savedColors:${JSON.stringify(saved)}}));localStorage.setItem("color-palettes",JSON.stringify({version:1,palettes:[]}))`;

const SCRIPT = `
(() => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 4;
  const g = cv.getContext("2d", { willReadFrequently: true });
  // resolve any CSS colour (incl. oklab/oklch/color()) to premultiplied sRGB bytes
  function rgba(css, onto) {
    g.clearRect(0,0,4,4);
    if (onto) { g.fillStyle = onto; g.fillRect(0,0,4,4); }
    g.fillStyle = css; g.fillRect(0,0,4,4);
    const d = g.getImageData(2,2,1,1).data;
    return { r: d[0], g: d[1], b: d[2], a: +(d[3]/255).toFixed(4) };
  }
  const lum = (c) => { const f=[c.r,c.g,c.b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
    return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2]; };
  const ratio = (a,b) => { const x=lum(a),y=lum(b); const [hi,lo]=x>y?[x,y]:[y,x]; return +(((hi+0.05)/(lo+0.05)).toFixed(2)); };

  const well = document.querySelector(".dashed-well");
  const wcs = getComputedStyle(well);
  const fill = rgba(wcs.backgroundColor);                       // opaque well tone-step
  const edgeOnFill = rgba(wcs.borderTopColor, wcs.backgroundColor);

  const label = [...well.querySelectorAll("span")].find(s => /Current Palette|Start a new/.test(s.textContent));
  const count = [...well.querySelectorAll("span")].find(s => /^\\d+ colors?$/.test(s.textContent.trim()));
  const chip  = well.querySelector(".api-offline-chip");
  const ghostStroke = document.querySelector(".add-slot-ghost .watercolor-ghost-stroke");
  const input = well.querySelector("input");
  const btn   = well.querySelector("button");

  const inkOn = (el) => el ? rgba(getComputedStyle(el).color) : null;

  const out = {
    scheme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    wellFill: fill,
    wellFillCss: wcs.backgroundColor,
    edge: { raw: wcs.borderTopColor, width: wcs.borderTopWidth, style: wcs.borderTopStyle,
            compositedOnFill: edgeOnFill, ratioVsFill: ratio(edgeOnFill, fill) },
    label: label ? { text: label.textContent.trim(), ink: inkOn(label), size: getComputedStyle(label).fontSize,
                     weight: getComputedStyle(label).fontWeight, family: getComputedStyle(label).fontFamily.split(",")[0],
                     ratioVsFill: ratio(inkOn(label), fill) } : null,
    count: count ? { text: count.textContent.trim(), ink: inkOn(count), size: getComputedStyle(count).fontSize,
                     family: getComputedStyle(count).fontFamily.split(",")[0], ratioVsFill: ratio(inkOn(count), fill) } : null,
    chip: chip ? { text: chip.textContent.trim(), ink: inkOn(chip), size: getComputedStyle(chip).fontSize,
                   bg: rgba(getComputedStyle(chip).backgroundColor, wcs.backgroundColor),
                   ratioVsChipBg: ratio(inkOn(chip), rgba(getComputedStyle(chip).backgroundColor, wcs.backgroundColor)),
                   role: chip.getAttribute("role") } : null,
    ghostStroke: ghostStroke ? { border: getComputedStyle(ghostStroke).borderTopColor,
                   width: getComputedStyle(ghostStroke).borderTopWidth,
                   compositedOnFill: rgba(getComputedStyle(ghostStroke).borderTopColor, wcs.backgroundColor),
                   ratioVsFill: ratio(rgba(getComputedStyle(ghostStroke).borderTopColor, wcs.backgroundColor), fill) } : null,
    inputBorder: input ? { color: getComputedStyle(input.closest("[class*=input], div") || input).borderTopColor } : null,
    saveBtnBorder: btn ? { color: getComputedStyle(btn).borderTopColor, width: getComputedStyle(btn).borderTopWidth,
                   compositedOnFill: rgba(getComputedStyle(btn).borderTopColor, wcs.backgroundColor),
                   ratioVsFill: ratio(rgba(getComputedStyle(btn).borderTopColor, wcs.backgroundColor), fill) } : null,
    // the plate the well sits on — is the tone-step itself perceptible?
    plate: (() => {
      const card = well.closest("[class*=glass-], .card");
      if (!card) return null;
      const cbg = getComputedStyle(card).backgroundColor;
      const onWhite = rgba(cbg, "rgb(255,255,255)");
      return { css: cbg, compositedOnWhite: onWhite, wellVsPlate: ratio(fill, onWhite) };
    })(),
  };
  return out;
})()
`;

const results = {};
const b = await webkit.launch();
for (const dark of [false, true]) {
    for (const [name, saved] of [["five", FIVE], ["empty", []]]) {
        const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: dark ? "dark" : "light" });
        const page = await ctx.newPage();
        await page.addInitScript(seed(saved.length ? saved : ["rgb(226 87 31)"]).replace(/savedColors:\[[^\]]*\]/, saved.length ? `savedColors:${JSON.stringify(saved)}` : "savedColors:[]"));
        await page.goto(ORIGIN + "/#/palettes");
        await page.waitForSelector(".dashed-well");
        await page.waitForTimeout(2000);
        results[`${name}-${dark ? "dark" : "light"}`] = await page.evaluate(SCRIPT);
        await ctx.close();
    }
}
await b.close();
writeFileSync(OUT, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
