import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence";
const DOC_RE = /\/assets\/docs\/[a-z-]+\.md/;

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.route(DOC_RE, (r) => r.abort("failed"));
await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(9000);

// ---- 1. OCCLUSION PROOF -----------------------------------------------
const occlusion = await page.evaluate(() => {
  const eb = document.querySelector(".vj-error-boundary");
  const [svg, msg, detail, btn] = [...eb.children];
  const cs = (el) => { const s = getComputedStyle(el); return { position: s.position, zIndex: s.zIndex, isolation: s.isolation, mixBlendMode: s.mixBlendMode }; };
  const centre = (el) => { const r = el.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; };
  const hit = (el) => { const [x, y] = centre(el); const t = document.elementFromPoint(x, y); return t ? (t.tagName.toLowerCase() + "." + (t.getAttribute("class") || "").split(" ").slice(0, 2).join(".")) : null; };
  const canvas = document.querySelector(".atmosphere-canvas");
  return {
    canvasStyle: cs(canvas),
    canvasRect: (() => { const r = canvas.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })(),
    canvasDomIndexInLayout: [...canvas.parentElement.children].indexOf(canvas),
    boundaryStyle: cs(eb),
    mainStyle: cs(document.querySelector("main")),
    paneMainIsPositioned: getComputedStyle(document.querySelector("main")).position,
    // what shell.css gives the element the boundary REPLACES:
    childStyles: { svg: cs(svg), msg: cs(msg), detail: cs(detail), button: cs(btn) },
    hitTest: { svg: hit(svg), msg: hit(msg), detail: hit(detail), button: hit(btn) },
  };
});

// ---- 2. CURE TEST: does position:relative alone restore the ink? -------
await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = "relative"; });
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/EB8-cure-test-position-relative.png` });
await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = ""; });
await page.waitForTimeout(200);

// ---- 3. LTR vs RTL icon gap ------------------------------------------
const ltr = await page.evaluate(() => {
  const btn = document.querySelector(".vj-error-boundary button");
  const svg = btn.querySelector("svg");
  const br = btn.getBoundingClientRect(), sr = svg.getBoundingClientRect();
  const s = getComputedStyle(svg);
  const label = [...btn.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
  const range = document.createRange(); range.selectNodeContents(btn);
  return { btn: { x: +br.x.toFixed(1), w: +br.width.toFixed(1) }, svg: { x: +sr.x.toFixed(1), w: +sr.width.toFixed(1) }, marginLeft: s.marginLeft, marginRight: s.marginRight, btnPadLeft: getComputedStyle(btn).paddingLeft, btnPadRight: getComputedStyle(btn).paddingRight, dir: document.documentElement.dir || "ltr" };
});
await page.evaluate(() => { document.documentElement.dir = "rtl"; });
await page.waitForTimeout(300);
const rtl = await page.evaluate(() => {
  const btn = document.querySelector(".vj-error-boundary button");
  const svg = btn.querySelector("svg");
  const br = btn.getBoundingClientRect(), sr = svg.getBoundingClientRect();
  const s = getComputedStyle(svg);
  return { btn: { x: +br.x.toFixed(1), w: +br.width.toFixed(1) }, svg: { x: +sr.x.toFixed(1), w: +sr.width.toFixed(1) }, marginLeft: s.marginLeft, marginRight: s.marginRight, btnPadLeft: getComputedStyle(btn).paddingLeft, btnPadRight: getComputedStyle(btn).paddingRight, gapIconToLabelEdge: null, dir: "rtl" };
});
await page.evaluate(() => { document.documentElement.dir = "ltr"; });

// ---- 4. LONG DETAIL OVERFLOW ------------------------------------------
const overflow = await page.evaluate(() => {
  const eb = document.querySelector(".vj-error-boundary");
  const detail = eb.children[2];
  const before = { ebH: eb.getBoundingClientRect().height, contentH: eb.scrollHeight, detailH: detail.getBoundingClientRect().height };
  detail.textContent = "TypeError: Cannot read properties of undefined (reading 'toFixed') at ColorComponentDisplay.readoutReservation (http://localhost:9000/demo/picker/display/ColorComponentDisplay/readoutReservation.ts:118:24) at renderComponentRoot (http://localhost:9000/node_modules/.vite/deps/vue.js:6521:16) at ReactiveEffect.componentUpdateFn [as fn] (http://localhost:9000/node_modules/.vite/deps/vue.js:7663:46)";
  const r = eb.getBoundingClientRect();
  const btn = eb.children[3].getBoundingClientRect();
  const main = document.querySelector("main").getBoundingClientRect();
  return {
    before,
    after: { ebRectH: +r.height.toFixed(1), ebScrollH: eb.scrollHeight, ebClientH: eb.clientHeight, detailH: +detail.getBoundingClientRect().height.toFixed(1), buttonBottom: +btn.bottom.toFixed(1), mainBottom: +main.bottom.toFixed(1), winH: window.innerHeight, overflowStyle: getComputedStyle(eb).overflow, contentExceedsBox: eb.scrollHeight > eb.clientHeight, docScrollH: document.documentElement.scrollHeight },
  };
});
await page.screenshot({ path: `${OUT}/EB9-long-detail-overflow.png` });

// ---- 5. CONTRAST of detail line vs the raw aurora it sits on -----------
await page.evaluate(() => { document.querySelector(".vj-error-boundary").children[2].textContent = "Importing a module script failed."; });
await page.waitForTimeout(200);
const contrast = await page.evaluate(async () => {
  const eb = document.querySelector(".vj-error-boundary");
  const detail = eb.children[2];
  const msg = eb.children[1];
  const toRgb = (cssColor) => { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.fillStyle = cssColor; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); };
  const rel = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const cr = (a, b) => { const [x, y] = [rel(a), rel(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  // sample the aurora canvas pixels behind the detail line
  const canvas = document.querySelector(".atmosphere-canvas");
  const dr = detail.getBoundingClientRect();
  const bmp = await createImageBitmap(canvas);
  const sx = bmp.width / canvas.getBoundingClientRect().width, sy = bmp.height / canvas.getBoundingClientRect().height;
  const off = new OffscreenCanvas(bmp.width, bmp.height); const octx = off.getContext("2d"); octx.drawImage(bmp, 0, 0);
  const px = octx.getImageData(Math.round(dr.x * sx), Math.round(dr.y * sy), Math.max(1, Math.round(dr.width * sx)), Math.max(1, Math.round(dr.height * sy))).data;
  let R = 0, G = 0, B = 0, n = 0;
  for (let i = 0; i < px.length; i += 4) { R += px[i]; G += px[i + 1]; B += px[i + 2]; n++; }
  const bg = [Math.round(R / n), Math.round(G / n), Math.round(B / n)];
  const inkMuted = toRgb(getComputedStyle(detail).color);
  const fg = toRgb(getComputedStyle(msg).color);
  return { detailInkRgb: inkMuted, messageInkRgb: fg, auroraMeanRgb: bg, detailContrastVsAurora: +cr(inkMuted, bg).toFixed(2), messageContrastVsAurora: +cr(fg, bg).toFixed(2), samplePx: n };
});

// ---- 6. WHOLE-APP BRICK: try every route after the catch ---------------
const brick = [];
for (const route of ["#/palettes", "#/browse", "#/extract", "#/mix", "#/generate", "#/gradient", "#/atmosphere", "#/blob", "#/admin/users"]) {
  await page.evaluate((h) => { window.location.hash = h; }, route);
  await page.waitForTimeout(700);
  brick.push(await page.evaluate((h) => ({ route: h, hash: location.hash, boundaryStillUp: !!document.querySelector(".vj-error-boundary"), paneContainer: !!document.querySelector(".pane-container") }), route));
}

const out = { occlusion, ltr, rtl, overflow, contrast, brick };
fs.writeFileSync(`${OUT}/EB-probe2.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await b.close();
