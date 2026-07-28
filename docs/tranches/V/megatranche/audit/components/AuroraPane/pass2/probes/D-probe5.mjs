import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const trig = await p.evaluate(() => {
  const t = document.querySelector("[aria-label='Palette harmony']");
  return { cls: t.className, cs: { fs: getComputedStyle(t).fontSize, fstyle: getComputedStyle(t).fontStyle, ff: getComputedStyle(t).fontFamily.split(",")[0] } };
});
await p.click("[aria-label='Palette harmony']");
await p.waitForTimeout(700);
const dot = await p.evaluate(() => {
  const sel = document.querySelector("[role='option'][aria-selected='true']");
  const d = sel.querySelector("span[class*='rounded-pill']");
  const content = document.querySelector("[role='listbox']");
  const g = (e) => { const c = getComputedStyle(e); return { bg: c.backgroundColor, color: c.color }; };
  const r = d.getBoundingClientRect();
  return { dot: g(d), dotRect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
           row: g(sel), content: g(content),
           accent: getComputedStyle(document.documentElement).getPropertyValue("--glass-accent"),
           selDot: getComputedStyle(document.documentElement).getPropertyValue("--select-dot-color") };
});
console.log(JSON.stringify({ trig, dot }, null, 1));
await p.screenshot({ path: "D-dot-crop.png", clip: { x: 320, y: 300, width: 220, height: 120 } });
await b.close();
