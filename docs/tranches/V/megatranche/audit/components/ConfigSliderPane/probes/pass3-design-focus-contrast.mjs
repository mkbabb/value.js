import { chromium } from "playwright";
const b = await chromium.launch();
const out = {};
for (const scheme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/blob", { waitUntil: "networkidle" });
  await p.waitForTimeout(3200);
  await p.evaluate(() => document.querySelector('.config-console [role="slider"]').focus());
  await p.keyboard.press("Tab"); await p.keyboard.press("Shift+Tab");
  await p.waitForTimeout(250);
  out[scheme] = await p.evaluate(() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    const rgb = (col, over) => { cx.clearRect(0,0,1,1); cx.fillStyle = over; cx.fillRect(0,0,1,1); cx.fillStyle = col; cx.fillRect(0,0,1,1); const d = cx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2]]; };
    const Lc=(c)=>{const s=c/255;return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4)};
    const lum=(n)=>0.2126*Lc(n[0])+0.7152*Lc(n[1])+0.0722*Lc(n[2]);
    const cr=(A,B)=>{const a=lum(A),bb=lum(B);const hi=Math.max(a,bb),lo=Math.min(a,bb);return +((hi+0.05)/(lo+0.05)).toFixed(2)};
    const t = document.querySelector('.config-console [role="slider"]');
    const track = document.querySelector('.config-console .slider-track');
    const well = document.querySelector('.console-well');
    const ringCol = getComputedStyle(t).boxShadow.match(/^(color\([^)]*\)|rgba?\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\))/)[0];
    const trackBg = getComputedStyle(track).backgroundColor;
    const wellBg = getComputedStyle(well).backgroundColor;
    const trackSolid = rgb(trackBg, "#808080");
    const wellSolid = rgb(wellBg, "#808080");
    const ringOverTrack = rgb(ringCol, trackBg);
    const ringOverWell = rgb(ringCol, wellBg);
    const thumbBorder = getComputedStyle(t).borderColor;
    return {
      ringColor: ringCol, trackBg, wellBg,
      trackSolid, wellSolid, ringOverTrack, ringOverWell,
      focusRingVsTrack: cr(ringOverTrack, trackSolid),
      focusRingVsWell: cr(ringOverWell, wellSolid),
      thumbBorderVsTrack: cr(rgb(thumbBorder, trackBg), trackSolid),
      trackVsWell: cr(trackSolid, wellSolid),
      projectRecipeUsed: getComputedStyle(t).boxShadow.includes("255, 255, 255, 0.92") || getComputedStyle(t).boxShadow.includes("0, 0, 0, 0.85"),
    };
  });
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await b.close();
