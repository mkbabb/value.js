// CHALLENGE-D pass 2 — probe 3: does the well's separation survive a
// user-chosen ambient? Plus the save-button's real rendered ring, the
// device-pixel dependence of the 1.5px hairline, and the 200 %-zoom arm.
import { webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const OUT = new URL("./probe-D7.json", import.meta.url).pathname;
const FRAMES = new URL("./frames-D4/", import.meta.url).pathname;
mkdirSync(FRAMES, { recursive: true });

const FIVE = ["rgb(226 87 31)", "rgb(31 119 226)", "rgb(52 168 83)", "rgb(234 179 8)", "rgb(147 51 234)"];
const seed = (input, saved) =>
    `localStorage.setItem("color-picker", JSON.stringify({inputColor:${JSON.stringify(input)},savedColors:${JSON.stringify(saved)}}));localStorage.setItem("color-palettes",JSON.stringify({version:1,palettes:[]}))`;

const SCRIPT = `
(() => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 4;
  const g = cv.getContext("2d", { willReadFrequently: true });
  function rgba(css, onto) { g.clearRect(0,0,4,4); if (onto) { g.fillStyle = onto; g.fillRect(0,0,4,4); }
    g.fillStyle = css; g.fillRect(0,0,4,4); const d = g.getImageData(2,2,1,1).data;
    return { r:d[0], g:d[1], b:d[2], a:+(d[3]/255).toFixed(3) }; }
  const lum=(c)=>{const f=[c.r,c.g,c.b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
    return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2];};
  const ratio=(a,b)=>{const x=lum(a),y=lum(b);const[hi,lo]=x>y?[x,y]:[y,x];return +(((hi+0.05)/(lo+0.05)).toFixed(2));};
  const dE=(a,b)=>Math.round(Math.sqrt((a.r-b.r)**2+(a.g-b.g)**2+(a.b-b.b)**2));

  const well=document.querySelector(".dashed-well"); const wcs=getComputedStyle(well);
  const fill=rgba(wcs.backgroundColor);
  const card=well.closest("[class*=glass-], .card");
  const plateOnWhite = card ? rgba(getComputedStyle(card).backgroundColor,"rgb(255,255,255)") : null;
  const ghost=document.querySelector(".add-slot-ghost .watercolor-ghost-stroke");
  const btn=well.querySelector("button");
  return {
    dpr: devicePixelRatio, viewport:{w:innerWidth,h:innerHeight},
    inputColorStored: JSON.parse(localStorage.getItem("color-picker")).inputColor,
    groundSeed: getComputedStyle(document.documentElement).getPropertyValue("--ground-seed").trim(),
    borderWidthUsed: wcs.borderTopWidth,
    wellFill: fill, plateOnWhite,
    wellVsPlateRatio: plateOnWhite ? ratio(fill, plateOnWhite) : null,
    wellVsPlateRgbDistance: plateOnWhite ? dE(fill, plateOnWhite) : null,
    edgeOnFillRatio: ratio(rgba(wcs.borderTopColor, wcs.backgroundColor), fill),
    ghost: ghost ? { border: getComputedStyle(ghost).borderTopColor, width: getComputedStyle(ghost).borderTopWidth,
      ratioVsFill: ratio(rgba(getComputedStyle(ghost).borderTopColor, wcs.backgroundColor), fill) } : null,
    saveBtn: btn ? { rect:(r=>({w:+r.width.toFixed(1),h:+r.height.toFixed(1)}))(btn.getBoundingClientRect()),
      borderWidth:getComputedStyle(btn).borderTopWidth, borderColor:getComputedStyle(btn).borderTopColor,
      boxShadow:getComputedStyle(btn).boxShadow, outline:getComputedStyle(btn).outline,
      bg:getComputedStyle(btn).backgroundColor, accName:btn.getAttribute("aria-label")||btn.textContent.trim(),
      classList: btn.className.toString() } : null,
    wellRect:(r=>({x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}))(well.getBoundingClientRect()),
    rowRect:(r=>({w:+r.width.toFixed(1),h:+r.height.toFixed(1)}))(well.querySelector(".swatch-row").getBoundingClientRect()),
    rowChildX:[...well.querySelector(".swatch-row").children].map(c=>+c.getBoundingClientRect().x.toFixed(1)),
    rowChildY:[...well.querySelector(".swatch-row").children].map(c=>+c.getBoundingClientRect().y.toFixed(1)),
    overflowsParent: (() => { const p = well.parentElement.getBoundingClientRect(), w = well.getBoundingClientRect();
      return w.right > p.right + 0.5 || w.bottom > p.bottom + 0.5; })(),
  };
})()
`;

const results = {};
const b = await webkit.launch();

async function run(name, { input, saved, viewport, dsf, dark }) {
    const ctx = await b.newContext({ viewport, deviceScaleFactor: dsf ?? 1, colorScheme: dark ? "dark" : "light" });
    const page = await ctx.newPage();
    await page.addInitScript(seed(input, saved));
    await page.goto(ORIGIN + "/#/palettes");
    await page.waitForSelector(".dashed-well");
    await page.waitForTimeout(2200);
    results[name] = await page.evaluate(SCRIPT);
    await page.screenshot({ path: FRAMES + name + ".png" });
    await ctx.close();
}

// A — the seeded orange (the reference used by every other probe)
await run("a-orange-1440-dpr1", { input: "rgb(226 87 31)", saved: FIVE, viewport: { width: 1440, height: 900 } });
// B — a pale warm beige ~ the well's own tone: does the fixture survive?
await run("b-beige-1440-dpr1", { input: "rgb(233 225 217)", saved: ["rgb(233 225 217)"], viewport: { width: 1440, height: 900 } });
// C — same, dark scheme
await run("c-beige-1440-dark", { input: "rgb(233 225 217)", saved: ["rgb(233 225 217)"], viewport: { width: 1440, height: 900 }, dark: true });
// D — DPR 2: does the authored 1.5px hairline survive device pixels?
await run("d-orange-1440-dpr2", { input: "rgb(226 87 31)", saved: FIVE, viewport: { width: 1440, height: 900 }, dsf: 2 });
// E — 200 % zoom equivalent: CSS viewport halved at dpr 2
await run("e-zoom200-720-dpr2", { input: "rgb(226 87 31)", saved: FIVE, viewport: { width: 720, height: 450 }, dsf: 2 });
// F — 400 % zoom equivalent (the constitution's named arm)
await run("f-zoom400-360-dpr4", { input: "rgb(226 87 31)", saved: FIVE, viewport: { width: 360, height: 225 }, dsf: 4 });

await b.close();
writeFileSync(OUT, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
