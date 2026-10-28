import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`;
  for (const [n, r] of Object.entries({ equation: "/equation", v: `/v/${SLUG}`, visualize: "/visualize" })) {
    if (n === "visualize" && w === 390 && theme === "dark") continue;
    const p = await page(theme, w);
    await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0);
    await p.waitForTimeout(4500);
    await p.screenshot({ path: `${OUT}/${n}-${k}.png` });
    if (n === "equation") {
      await p.mouse.wheel(0, 700); await p.waitForTimeout(1500);
      await p.screenshot({ path: `${OUT}/${n}-scroll-${k}.png` });
    }
    if (n === "v" && w === 390) {
      await p.mouse.wheel(0, 900); await p.waitForTimeout(1500);
      await p.screenshot({ path: `${OUT}/${n}-scroll-${k}.png` });
    }
    if (n === "v" && w === 1440 && theme === "light") {
      // open the dock nav menu
      const trig = p.locator(".app-dock button, .glass-dock button").nth(1);
      await trig.click().catch(() => {}); await p.waitForTimeout(800);
      await p.screenshot({ path: `${OUT}/dock-menu-${k}.png` });
      await p.keyboard.press("Escape");
      // edit mode (pencil)
      const pen = p.locator('button[aria-label*="dit" i]').first();
      await pen.click().catch(() => {}); await p.waitForTimeout(1500);
      await p.screenshot({ path: `${OUT}/v-edit-${k}.png` });
    }
    await p.context().close();
  }
}
// measure NotFoundCard padding + morph sticky band
for (const theme of ["light"]) {
  const p = await page(theme, 1440);
  await p.goto(BASE + "/no-such-route", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
  res.notfound = await p.evaluate(() => { const h = [...document.querySelectorAll("h1,h2,h3")].find(e => /not found/i.test(e.textContent)); let c = h; while (c && !/card/.test(c.className)) c = c.parentElement; const cs = c && getComputedStyle(c); return c && { cls: c.className, pad: cs.padding, w: c.getBoundingClientRect().width, shadow: cs.boxShadow, h1: getComputedStyle(h).fontSize + " " + getComputedStyle(h).fontWeight + " " + getComputedStyle(h).fontFamily }; });
  const q = await page(theme, 390);
  await q.goto(BASE + "/morph", { waitUntil: "networkidle" }); await q.waitForTimeout(2000); await q.mouse.wheel(0, 900); await q.waitForTimeout(1200);
  res.morphBand = await q.evaluate(() => { const s = document.querySelector(".stage-column"); const cs = getComputedStyle(s); const rd = (sel) => { const e = document.querySelector(sel); if (!e) return null; const c = getComputedStyle(e); return { fs: c.fontSize, fw: c.fontWeight, ff: c.fontFamily.slice(0,40) }; }; return { pos: cs.position, bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0,80), bb: cs.borderBottom, shadow: cs.boxShadow, rect: s.getBoundingClientRect().toJSON(), html: s.outerHTML.slice(0, 400) }; });
  res.readings = await q.evaluate(() => [...document.querySelectorAll(".stage-column *")].filter(e => /PHASE|TOTAL/i.test(e.textContent) && e.children.length === 0).map(e => ({ t: e.textContent.trim(), cls: e.className, fs: getComputedStyle(e).fontSize, fw: getComputedStyle(e).fontWeight })));
}
console.log(JSON.stringify(res, null, 1));
await b.close();
