import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 })).newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
console.log(JSON.stringify(await p.evaluate(() => {
  const c = document.querySelector(".specimen-tile");
  const cs = getComputedStyle(c);
  const rs = getComputedStyle(document.documentElement);
  const row = document.querySelector(".border-card-edge.rounded-card");
  return {
    chipBoxShadow: cs.boxShadow,
    chipBackdrop: cs.backdropFilter,
    chipBg: cs.background.slice(0,90),
    rowBoxShadow: getComputedStyle(row).boxShadow,
    rampBoxShadow: getComputedStyle(document.querySelector("[id^=easing-interval] .h-5")).boxShadow,
    railBoxShadow: getComputedStyle(document.querySelector(".readout-rail")).boxShadow,
    tokens: Object.fromEntries(["--glass-shadow-floating","--glass-blur-floating","--glass-rim-top","--glass-rim-bottom","--glass-cell-backdrop-filter"].map(t=>[t, rs.getPropertyValue(t).trim().slice(0,90)])),
  };
}, null), null, 2));
await b.close();
