import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const cases = [
  ["oklch(0.6 0.25 30)", "high chroma"],
  ["oklch(0.6 0.08 30)", "at floor"],
  ["oklch(0.6 0.02 30)", "below floor"],
  ["oklch(0.6 0 30)",    "zero chroma"],
  ["rgb(128 128 128)",   "achromatic"],
];
const rows = [];
for (const [color, label] of cases) {
  const space = color.startsWith("rgb") ? "rgb" : "oklch";
  await p.goto(`http://localhost:9000/#/?space=${space}&color=${encodeURIComponent(color)}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  const r = await p.evaluate(() => {
    const wrap = document.querySelector(".markdown-wrapper");
    const plate = document.querySelector(".about-card");
    const cv = document.createElement("canvas"); cv.width=cv.height=1;
    const ctx = cv.getContext("2d",{willReadFrequently:true});
    const px = (css, ground="#fff") => { ctx.fillStyle=ground; ctx.fillRect(0,0,1,1); ctx.fillStyle=css; ctx.fillRect(0,0,1,1); const d=ctx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2]]; };
    const lum = ([r,g,bl]) => { const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(bl); };
    const contrast=(a,bb)=>{const L1=lum(a),L2=lum(bb);const hi=Math.max(L1,L2),lo=Math.min(L1,L2);return +((hi+0.05)/(lo+0.05)).toFixed(3);};
    const plateBg = px(getComputedStyle(plate).backgroundColor);

    // A: what ships today (JS composable)
    const jsVal = getComputedStyle(wrap).getPropertyValue("--md-color-h2").trim();

    // B: the pure-CSS transposition, using the repo's own utils.css:79 idiom
    const probe = document.createElement("div");
    probe.style.setProperty("--x", "oklch(from var(--accent-live) l max(c, 0.08) h)");
    probe.style.color = "var(--x)";
    document.documentElement.appendChild(probe);
    const cssVal = getComputedStyle(probe).color;
    probe.remove();

    return {
      cssSupportsRelativeMax: CSS.supports("color", "oklch(from red l max(c, 0.08) h)"),
      jsVal, cssVal,
      jsRGB: px(jsVal), cssRGB: px(cssVal),
      jsContrastVsPlate: contrast(px(jsVal), plateBg),
      cssContrastVsPlate: contrast(px(cssVal), plateBg),
    };
  });
  const dR = Math.max(...[0,1,2].map(i=>Math.abs(r.jsRGB[i]-r.cssRGB[i])));
  rows.push({ label, input: color, ...r, maxChannelDelta: dR, contrastDelta: +(r.cssContrastVsPlate - r.jsContrastVsPlate).toFixed(3) });
}
console.log(JSON.stringify(rows, null, 2));
await b.close();
