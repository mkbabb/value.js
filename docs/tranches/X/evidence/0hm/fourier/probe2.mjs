import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const OUT = "/Users/mkbabb/.dev-logs/x-0hm/seat3/r2";
mkdirSync(OUT, { recursive: true });
const B = "https://fourier.babb.dev";
const out = {};
const raf = (ms) => `(async()=>{const ds=[];let l=performance.now();const lt=[];let po;try{po=new PerformanceObserver(e=>{for(const x of e.getEntries())lt.push(Math.round(x.duration))});po.observe({type:'longtask',buffered:false})}catch{}
await new Promise(r=>{const end=l+${ms};const f=t=>{ds.push(t-l);l=t;t<end?requestAnimationFrame(f):r()};requestAnimationFrame(f)});po&&po.disconnect();ds.sort((a,b)=>a-b);const q=p=>+ds[Math.min(ds.length-1,Math.floor(p*ds.length))].toFixed(1);return {n:ds.length,p50:q(.5),p95:q(.95),max:q(.999),over33:ds.filter(d=>d>33).length,longtasks:lt.slice(0,10)}})()`;
const browser = await chromium.launch({ headless: true });
async function cell(name, opts, fn) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 90)));
  try { out[name] = await fn(page); } catch (e) { out[name] = { err: String(e).slice(0, 200) }; }
  out[name + "_errs"] = errs.length + " :: " + [...new Set(errs.map((e) => e.slice(0, 60)))].join(" | ");
  await ctx.close();
}
try {
  await cell("eq1800", { viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 2, colorScheme: "dark" }, async (p) => {
    await p.goto(B + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    const info = await p.evaluate(async () => {
      const cv = document.querySelector("canvas");
      const dev = await new Promise((r) => { const ro = new ResizeObserver((es) => { const e = es[0]; r(e.devicePixelContentBoxSize?.[0] ? [e.devicePixelContentBoxSize[0].inlineSize, e.contentBoxSize[0].inlineSize] : null); ro.disconnect(); }); ro.observe(cv, { box: "device-pixel-content-box" }); });
      const fonts = [...document.fonts].map((f) => `${f.family}:${f.status}`).slice(0, 14);
      const panel = [...document.querySelectorAll("section,aside,[class*=panel],[class*=card]")].map((e) => { const b = e.getBoundingClientRect(); return [String(e.className).slice(0, 30), b.top | 0, b.bottom | 0, b.left | 0, b.right | 0]; }).filter((x) => x[2] - x[1] > 400).slice(0, 6);
      return { dpr: devicePixelRatio, cvW: cv.width, roDeviceVsCss: dev, fonts, panel };
    });
    info.rafPlaying = await p.evaluate(raf(3000));
    await p.screenshot({ path: OUT + "/eq1800-plot.jpg", type: "jpeg", quality: 60, scale: "css", clip: { x: 20, y: 300, width: 1290, height: 690 } });
    return info;
  });
  await cell("eqLand", { viewport: { width: 844, height: 390 }, deviceScaleFactor: 3, colorScheme: "dark", isMobile: true, hasTouch: true }, async (p) => {
    await p.goto(B + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    return p.evaluate(() => {
      const k = document.querySelector(".katex-display, .katex");
      const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.left | 0, b.right | 0, b.width | 0]; };
      let clipper = k; while (clipper && clipper !== document.body) { const cs = getComputedStyle(clipper); if (cs.overflow !== "visible" && clipper !== k) break; clipper = clipper.parentElement; }
      const btns = [...document.querySelectorAll("button[aria-label]")].map((b) => [b.getAttribute("aria-label").slice(0, 24), r(b)]).filter((x) => x[1][0] < 300).slice(0, 8);
      const legend = [...document.querySelectorAll("li,[class*=legend] *")].map((e) => e.textContent.trim()).filter((t) => /^n=\d+$/.test(t));
      return { katex: r(k), katexScroll: k && [k.scrollWidth, k.clientWidth], clipper: clipper && [String(clipper.className).slice(0, 40), r(clipper)], btns, legend: [...new Set(legend)] };
    });
  });
  await cell("morph1440", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" }, async (p) => {
    await p.goto(B + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    await p.screenshot({ path: OUT + "/morph-sliders.jpg", type: "jpeg", quality: 70, clip: { x: 597, y: 280, width: 683, height: 90 } });
    const sliders = await p.evaluate(() => [...document.querySelectorAll("[role=slider]")].map((s) => { const b = s.getBoundingClientRect(); return [s.getAttribute("aria-valuemin"), s.getAttribute("aria-valuenow"), s.getAttribute("aria-valuemax"), b.left | 0, b.width | 0, b.height | 0, getComputedStyle(s).opacity]; }));
    const btn = p.locator('[aria-label="Morph between the sun and moon shapes"]');
    const pr = p.evaluate(raf(1500));
    await btn.click();
    await p.waitForTimeout(170);
    await p.screenshot({ path: OUT + "/morph-mid.jpg", type: "jpeg", quality: 60, clip: { x: 160, y: 190, width: 420, height: 420 } });
    const r = await pr;
    await p.waitForTimeout(800);
    await p.screenshot({ path: OUT + "/morph-end.jpg", type: "jpeg", quality: 60, clip: { x: 160, y: 190, width: 420, height: 420 } });
    return { sliders, rafDuringMorph: r };
  });
  await cell("dockMob", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "dark", isMobile: true, hasTouch: true }, async (p) => {
    await p.goto(B + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    const trig = p.locator(".app-dock button, .app-dock [role=button]").nth(1);
    const lbl = await trig.getAttribute("aria-label").catch(() => null);
    const pr = p.evaluate(raf(1200));
    await trig.tap().catch(async () => trig.click());
    await p.waitForTimeout(120);
    await p.screenshot({ path: OUT + "/dock-mid.jpg", type: "jpeg", quality: 60, clip: { x: 0, y: 0, width: 390, height: 420 } });
    const r = await pr;
    await p.screenshot({ path: OUT + "/dock-open.jpg", type: "jpeg", quality: 60, clip: { x: 0, y: 0, width: 390, height: 520 } });
    return { lbl, raf: r };
  });
} finally {
  await browser.close();
  writeFileSync(OUT + "/out.json", JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out, null, 1).slice(0, 6000));
}
