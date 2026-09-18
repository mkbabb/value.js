import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/shots";
const IMG = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/probe.png";
const R = {};
async function open(page) {
  await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
  await page.waitForTimeout(2500);
  if (!page.url().includes("extract")) { await page.goto("http://localhost:9000/#/extract"); await page.waitForTimeout(2500); }
  await page.setInputFiles("input[type=file]", IMG);
  await page.waitForTimeout(1800);
  await page.locator('[role=button][aria-label*="sample colors"]').click({ position: { x: 20, y: 20 } });
  await page.waitForTimeout(900);
}
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1512, height: 806 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push({ msg: e.message, stack: (e.stack || "").split("\n").slice(0, 5).join(" | ") }));
await open(page);

R.loadedImage = await page.evaluate(() => {
  const cv = document.querySelector("canvas.eyedropper-canvas");
  const c2 = document.createElement("canvas"); c2.width = cv.width; c2.height = cv.height;
  const x2 = c2.getContext("2d"); x2.drawImage(cv, 0, 0);
  const g = (x, y) => { const d = x2.getImageData(x, y, 1, 1).data; return d[0]+","+d[1]+","+d[2]; };
  return { wh: [cv.width, cv.height], p16_16: g(16,16), p48_16: g(48,16), p16_48: g(16,48), p48_48: g(48,48) };
});
const rects = await page.evaluate(() => {
  const cv = document.querySelector("canvas.eyedropper-canvas"), vp = document.querySelector('[style*="touch-action"]');
  const cb = cv.getBoundingClientRect(), vb = vp.getBoundingClientRect();
  return { cb: { x: cb.x, y: cb.y, w: cb.width }, vb: { x: vb.x, y: vb.y, w: vb.width, h: vb.height, bottom: vb.bottom }, n: cv.width, scale: cb.width / cv.width };
});
R.rects = rects;
const samples = [];
for (const t of [[16,16],[48,16],[16,48],[48,48],[0,0],[63,63],[31,31],[32,32]]) {
  const x = rects.cb.x + (t[0]+0.5)*rects.scale, y = rects.cb.y + (t[1]+0.5)*rects.scale;
  await page.mouse.move(x, y); await page.waitForTimeout(90);
  const got = await page.evaluate(() => {
    const s = document.querySelector(".z-popover span.text-mono-small");
    const dot = document.querySelector(".z-popover .watercolor-swatch");
    return { text: s && s.innerText, title: s && s.getAttribute("title"), scrollW: s && s.scrollWidth, clientW: s && s.clientWidth, dotBg: dot ? getComputedStyle(dot).backgroundColor : null };
  });
  samples.push({ ix: t[0], iy: t[1], ...got });
}
R.samples = samples;
R.readoutTruncation = await page.evaluate(() => {
  const s = document.querySelector(".z-popover span.text-mono-small");
  return { full: s.textContent.trim(), fullLen: s.textContent.trim().length, scrollWidth: s.scrollWidth, clientWidth: s.clientWidth, clippedPx: s.scrollWidth - s.clientWidth, hasTitle: s.hasAttribute("title"), classes: s.className, color: getComputedStyle(s).color };
});
R.keyboard = await page.evaluate(() => {
  const root = document.querySelector(".z-popover.glass-floating");
  const btn = root.querySelector('button[title="Close eyedropper"]');
  let inertAncestor = null, hiddenAncestor = null;
  for (let e = btn; e; e = e.parentElement) {
    if (e.hasAttribute && e.hasAttribute("inert")) inertAncestor = e.tagName + "." + String(e.getAttribute("class")).slice(0,40);
    if (e.getAttribute && e.getAttribute("aria-hidden") === "true") hiddenAncestor = e.tagName + "." + String(e.getAttribute("class")).slice(0,40);
  }
  const f = [...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')];
  return { btnTabIndex: btn.tabIndex, inertAncestor, hiddenAncestor, totalFocusables: f.length,
    focusablesInOverlay: f.filter(e=>e.closest(".z-popover")).length,
    outsideSample: f.filter(e=>!e.closest(".z-popover")).map(e=>e.tagName+"|"+String(e.getAttribute("aria-label")||e.getAttribute("title")||e.innerText||"").trim().slice(0,24)).slice(0,12) };
});
R.pinCycle = await (async () => {
  const p = (ix, iy) => ({ x: rects.cb.x + (ix+0.5)*rects.scale, y: rects.cb.y + (iy+0.5)*rects.scale });
  const read = () => page.evaluate(() => ({
    text: (document.querySelector(".z-popover span.text-mono-small")||{}).innerText,
    btns: [...document.querySelectorAll(".z-popover button")].map(b=>b.getAttribute("title")),
    loupePinned: !!document.querySelector(".loupe.loupe-pinned"),
    loupeNonAlpha: (() => { const lc = document.querySelector(".loupe canvas"); if (!lc) return null; const d = lc.getContext("2d").getImageData(0,0,lc.width,lc.height).data; let n=0; for (let i=3;i<d.length;i+=4) if (d[i]>0) n++; return n; })(),
  }));
  const out = {}; const a = p(16,16), b = p(48,48);
  await page.mouse.move(a.x, a.y); await page.waitForTimeout(150); out.hoverA = await read();
  await page.mouse.click(a.x, a.y); await page.waitForTimeout(400); out.click1_pinA = await read();
  await page.mouse.click(b.x, b.y); await page.waitForTimeout(400); out.click2_atB = await read();
  await page.mouse.click(b.x, b.y); await page.waitForTimeout(400); out.click3_atB = await read();
  return out;
})();
R.zoom200 = await (async () => {
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await page.waitForTimeout(1000);
  const g = await page.evaluate(() => {
    const root = document.querySelector(".z-popover.glass-floating");
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const vp = document.querySelector('[style*="touch-action"]');
    const rr = root && root.getBoundingClientRect(), cb = cv && cv.getBoundingClientRect(), vb = vp && vp.getBoundingClientRect();
    const s = document.querySelector(".z-popover span.text-mono-small");
    return { overlay: rr && { x:+rr.x.toFixed(1), y:+rr.y.toFixed(1), w:+rr.width.toFixed(1), h:+rr.height.toFixed(1), bottom:+rr.bottom.toFixed(1) },
      canvas: cb && { y:+cb.y.toFixed(1), w:+cb.width.toFixed(1), h:+cb.height.toFixed(1), bottom:+cb.bottom.toFixed(1) },
      vpBottom: vb && +vb.bottom.toFixed(1), innerH: innerHeight, innerW: innerWidth,
      readoutClippedPx: s ? s.scrollWidth - s.clientWidth : null, readoutText: s && s.innerText,
      docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  await page.screenshot({ path: OUT + "/zoom200.png" });
  await page.evaluate(() => { document.documentElement.style.zoom = ""; });
  return g;
})();
R.pageErrors = errs;
await browser.close();
{
  const b2 = await webkit.launch();
  const c2 = await b2.newContext({ viewport: { width: 1512, height: 806 }, deviceScaleFactor: 2, colorScheme: "light", reducedMotion: "reduce" });
  const p2 = await c2.newPage();
  await open(p2);
  R.prm = await p2.evaluate(() => {
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const dot = document.querySelector(".z-popover .watercolor-swatch");
    const cs = getComputedStyle(cv);
    if (dot) { dot.classList.remove("w-7","h-7"); dot.classList.add("swatch-pulse"); }
    const ds = dot ? getComputedStyle(dot) : null;
    return { prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
      canvasTransitionDuration: cs.transitionDuration, canvasTransitionProperty: cs.transitionProperty,
      durationFastVar: getComputedStyle(document.documentElement).getPropertyValue("--duration-fast"),
      swatchAnimationName: ds && ds.animationName, swatchAnimationDuration: ds && ds.animationDuration,
      swatchW: ds && ds.width, swatchH: ds && ds.height };
  });
  await b2.close();
}
fs.writeFileSync(OUT + "/resultsB.json", JSON.stringify(R, null, 1));
console.log("DONE");
