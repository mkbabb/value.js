import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/ErrorBoundary/evidence";
const DOC_RE = /\/assets\/docs\/[a-z-]+\.md/;

const relLum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const cr = (a, b) => { const [x, y] = [relLum(a), relLum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
// decode the clipped PNG inside the browser (no node image dep available)
async function meanPng(page, buf) {
  return page.evaluate(async (b64) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    let R = 0, G = 0, B = 0, n = 0;
    for (let i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; n++; }
    return [Math.round(R / n), Math.round(G / n), Math.round(B / n)];
  }, buf.toString("base64"));
}

const results = {};

// ---------- A. CONTRAST over the raw ambient field (both schemes) ----------
for (const scheme of ["light", "dark"]) {
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.route(DOC_RE, (r) => r.abort("failed"));
  await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(9000);
  // lift the plate above the canvas so the real composited relation is measurable
  await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = "relative"; });
  await page.waitForTimeout(300);
  const boxes = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    const [svg, msg, detail, btn] = [...eb.children];
    const g = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; };
    const toRgb = (c) => { const cv = document.createElement("canvas"); cv.width = cv.height = 1; const x = cv.getContext("2d"); x.fillStyle = c; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    return { msg: g(msg), detail: g(detail), svg: g(svg), btn: g(btn), msgInk: toRgb(getComputedStyle(msg).color), detailInk: toRgb(getComputedStyle(detail).color), iconInk: toRgb(getComputedStyle(svg).color) };
  });
  // hide the ink, screenshot the exact boxes => the true composited backdrop
  await page.evaluate(() => { const eb = document.querySelector(".vj-error-boundary"); [...eb.children].forEach((c) => (c.style.visibility = "hidden")); });
  await page.waitForTimeout(250);
  const bgMsg = await meanPng(page, await page.screenshot({ clip: boxes.msg }));
  const bgDetail = await meanPng(page, await page.screenshot({ clip: boxes.detail }));
  const bgIcon = await meanPng(page, await page.screenshot({ clip: boxes.svg }));
  results[`contrast_${scheme}`] = {
    messageInk: boxes.msgInk, messageBackdrop: bgMsg, messageContrast: +cr(boxes.msgInk, bgMsg).toFixed(2),
    detailInk: boxes.detailInk, detailBackdrop: bgDetail, detailContrast: +cr(boxes.detailInk, bgDetail).toFixed(2),
    iconInk: boxes.iconInk, iconBackdrop: bgIcon, iconContrast: +cr(boxes.iconInk, bgIcon).toFixed(2),
    detailFontPx: 16.4, floorSmallText: 4.5, floorNonText: 3.0,
  };
  await b.close();
}

// ---------- B. SHORT VIEWPORT (200% zoom equivalent) OVERFLOW ----------
{
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.route(DOC_RE, (r) => r.abort("failed"));
  await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(9000);
  await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = "relative"; });
  await page.setViewportSize({ width: 720, height: 450 }); // == 200% browser zoom on a 1440x900 screen
  await page.waitForTimeout(1200);
  const zoomState = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    if (!eb) return { boundaryGone: true };
    eb.children[2].textContent = "TypeError: Cannot read properties of undefined (reading 'toFixed') at readoutReservation (readoutReservation.ts:118:24) at renderComponentRoot (vue.js:6521:16) at ReactiveEffect.componentUpdateFn (vue.js:7663:46)";
    const r = eb.getBoundingClientRect(); const btn = eb.children[3].getBoundingClientRect(); const main = document.querySelector("main").getBoundingClientRect();
    return { ebRect: { y: +r.y.toFixed(1), h: +r.height.toFixed(1), bottom: +r.bottom.toFixed(1) }, ebScrollH: eb.scrollHeight, ebClientH: eb.clientHeight, overflowStyle: getComputedStyle(eb).overflow, buttonBottom: +btn.bottom.toFixed(1), mainBottom: +main.bottom.toFixed(1), winH: window.innerHeight, docScrollH: document.documentElement.scrollHeight, buttonBelowViewport: btn.bottom > window.innerHeight, buttonBelowMain: btn.bottom > main.bottom, pageCanScroll: document.documentElement.scrollHeight > window.innerHeight };
  });
  await page.screenshot({ path: `${OUT}/EB10-zoom200-long-detail-clip.png` });
  results.zoom200 = zoomState;
  await b.close();
}

// ---------- C. MOBILE caught frame (390) + a11y tree ----------
{
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.route(DOC_RE, (r) => r.abort("failed"));
  await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(8000);
  // drive the mobile pane switcher onto the second (About) pane
  const switched = await page.evaluate(() => {
    const host = document.querySelector(".dock-mobile-panes");
    if (!host) return { hostFound: false };
    const btns = [...host.querySelectorAll("button")];
    if (btns.length < 2) return { hostFound: true, buttons: btns.length };
    btns[btns.length - 1].click();
    return { hostFound: true, buttons: btns.length, clicked: btns[btns.length - 1].textContent.trim() };
  });
  await page.waitForTimeout(4000);
  const st = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    return { boundary: !!eb, rect: eb ? (() => { const r = eb.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })() : null, position: eb ? getComputedStyle(eb).position : null, text: eb ? eb.textContent.replace(/\s+/g, " ").trim() : null, winH: window.innerHeight };
  });
  await page.screenshot({ path: `${OUT}/EB11-caught-mobile-390-light.png` });
  const a11y = st.boundary ? await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    return { role: eb.getAttribute("role"), ariaLive: eb.getAttribute("aria-live"), ariaLabel: eb.getAttribute("aria-label"), ariaLabelledby: eb.getAttribute("aria-labelledby"), tabindex: eb.getAttribute("tabindex"), headingsInside: eb.querySelectorAll("h1,h2,h3,h4,h5,h6").length, isActive: document.activeElement === eb, tabbables: [...eb.querySelectorAll("button,a[href],input,[tabindex]")].map((e) => e.tagName.toLowerCase() + ":" + (e.textContent || "").trim().slice(0, 20)) };
  }) : null;
  results.mobile = { switched, state: st, a11y };
  await b.close();
}

fs.writeFileSync(`${OUT}/EB-probe3.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
