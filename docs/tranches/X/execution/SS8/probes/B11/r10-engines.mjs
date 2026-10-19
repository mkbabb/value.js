// SS8 B11 R-10 — engine reading of `hsl(calc(var(--hue) * 1deg), 100%, 50%)` with `--hue: NaN`
// (exactly the string Vue writes for a NaN number) — chromium or webkit per argv[2]. One browser, one context.
import { chromium, webkit } from "playwright";
const engine = process.argv[2] === "webkit" ? webkit : chromium;
const browser = await engine.launch();
try {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.setContent(`<div id=a style="--hue: NaN; width:40px;height:40px;background:linear-gradient(to right,#fff,hsl(calc(var(--hue) * 1deg),100%,50%))"></div>
  <div id=b style="--hue: NaN; width:40px;height:40px;background-color:hsl(calc(var(--hue) * 1deg),100%,50%)"></div>`);
  const r = await page.evaluate(() => ({ ua: navigator.userAgent.slice(-40), gradient: getComputedStyle(a).backgroundImage, solid: getComputedStyle(b).backgroundColor }));
  const shot = await page.locator("#b").screenshot();
  r.solidPixel = await page.evaluate(async (b64) => { const i = new Image(); i.src = "data:image/png;base64," + b64; await i.decode(); const c = new OffscreenCanvas(i.width, i.height); const x = c.getContext("2d"); x.drawImage(i, 0, 0); return Array.from(x.getImageData(5, 5, 1, 1).data); }, shot.toString("base64"));
  console.log(process.argv[2], JSON.stringify(r));
  await ctx.close();
} finally { await browser.close(); }
