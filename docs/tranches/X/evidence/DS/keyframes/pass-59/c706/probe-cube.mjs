import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.env.OUT ?? ".";
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  try {
    await page.goto(`http://localhost:5197/#/cube`, { waitUntil: "load" }); await page.addStyleTag({ content: ".cube, .cube-pose, .cube-bob, .idle-hover { transform: none !important; animation: none !important; transition: none !important } .cube { transform: rotateX(-28deg) rotateY(37deg) rotateZ(9deg) !important }" }); if (process.env.NOOUT) await page.addStyleTag({ content: ".cube-side{outline:none !important}" }); await page.waitForTimeout(3500);
    await page.screenshot({ path: `${OUT}/cube-390-${process.env.TAG ?? "x"}.png` });
    await page.screenshot({ path: `${OUT}/cube-390-${process.env.TAG ?? "x"}-crop.png`, clip: { x: 100, y: 250, width: 200, height: 330 } });
    console.log(await page.evaluate(() => getComputedStyle(document.querySelector(".cube-side")).outline));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
