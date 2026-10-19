import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.cwd();
const BASE = "http://localhost:5173/";
const b = await chromium.launch({ channel: "chrome", headless: true });
const KEY = "animation-groups-control-options-store";
const info = {};
for (const scheme of ["light","dark"]) {
  // desktop: dock expanded + select menu
  let ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  let p = await ctx.newPage();
  await p.goto(`${BASE}#/cube`); await p.waitForTimeout(5000);
  const dock = p.locator(".glass-dock").first();
  await dock.hover().catch(()=>{}); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}/dock-hover-1440-${scheme}.png` });
  await dock.click().catch(()=>{}); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}/dock-click-1440-${scheme}.png` });
  const trig = p.locator('[aria-label="Select animation"]').first();
  if (await trig.count()) { await trig.click({force:true}).catch(e=>info.trigErr=String(e).slice(0,200)); await p.waitForTimeout(1200); await p.screenshot({ path: `${OUT}/dock-select-1440-${scheme}.png` }); }
  await p.keyboard.press("Escape"); await p.waitForTimeout(500);
  // bottom transport pill hover
  await p.mouse.move(720, 792); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}/transport-hover-1440-${scheme}.png` });
  // keyboard shortcuts modal
  await p.mouse.move(100,850); await p.keyboard.press("?"); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${OUT}/shortcuts-1440-${scheme}.png` });
  await ctx.close();
  // mobile
  ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
  p = await ctx.newPage();
  await p.goto(`${BASE}#/cube`); await p.waitForTimeout(5000);
  // try opening the sheet to full: press the sheet's header / drag
  const sheet = p.locator("[role=dialog], .glass-sheet, .glass-drawer").first();
  info[`sheet-${scheme}`] = await sheet.count();
  // drag up from y=735 to 150
  await p.mouse.move(195, 770); await p.mouse.down(); await p.mouse.move(195, 500, {steps:10}); await p.mouse.move(195, 150, {steps:10}); await p.mouse.up();
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/cube-sheet-390-${scheme}.png` });
  // keyframes surface at 390
  await p.evaluate(([k]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s.cube = { ...(s.cube??{}), selectedControl: "keyframes" }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY]);
  await p.reload(); await p.waitForTimeout(5000);
  await p.mouse.move(195, 770); await p.mouse.down(); await p.mouse.move(195, 500, {steps:10}); await p.mouse.move(195, 150, {steps:10}); await p.mouse.up();
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/keyframes-sheet-390-${scheme}.png` });
  await p.evaluate(([k]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s.cube = { ...(s.cube??{}), selectedControl: "timeline" }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY]);
  await p.reload(); await p.waitForTimeout(5000);
  await p.mouse.move(195, 770); await p.mouse.down(); await p.mouse.move(195, 500, {steps:10}); await p.mouse.move(195, 150, {steps:10}); await p.mouse.up();
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/timeline-sheet-390-${scheme}.png` });
  await ctx.close();
}
console.log(JSON.stringify(info));
await b.close();
