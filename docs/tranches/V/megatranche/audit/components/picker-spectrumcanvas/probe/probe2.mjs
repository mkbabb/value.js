import { webkit } from "playwright";
const b = await webkit.launch();

// ---- A. MOBILE geometry + WCAG 2.5.8 spacing test ----
const mctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" });
const mp = await mctx.newPage();
await mp.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await mp.waitForTimeout(2500);
const mobile = await mp.evaluate(() => {
  const rail = document.querySelector('[data-o18="extract-k-rail"]');
  const root = rail.closest(".flex.flex-col.gap-3");
  const T = [...root.querySelectorAll('button,[role="slider"],a,input')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
  const m = T.map(e => { const r = e.getBoundingClientRect(); return { name: e.getAttribute("aria-label") || e.getAttribute("title") || e.tagName, x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), cx: +(r.x + r.width/2).toFixed(1), cy: +(r.y + r.height/2).toFixed(1) }; });
  // WCAG 2.5.8 spacing exception: 24px-dia circle on an undersized target must not
  // intersect ANOTHER TARGET (its bounding box) nor another undersized target's circle.
  const under = m.filter(t => t.w < 24 || t.h < 24);
  const viol = [];
  for (const u of under) for (const o of m) {
    if (o === u) continue;
    // circle radius 12 centered at u center vs o's bounding box
    const dx = Math.max(o.x - u.cx, 0, u.cx - (o.x + o.w));
    const dy = Math.max(o.y - u.cy, 0, u.cy - (o.y + o.h));
    const d = Math.hypot(dx, dy);
    if (d < 12) viol.push({ target: u.name, intersects: o.name, dist: +d.toFixed(1) });
  }
  const thumbCS = (() => { const t = root.querySelector('[role="slider"]'); const c = getComputedStyle(t); return { w: c.width, h: c.height, minW: c.minWidth, before: getComputedStyle(t, "::before").content, cls: t.className.toString() }; })();
  return { targets: m, under, viol, thumbCS, coarse: matchMedia("(pointer: coarse)").matches };
});
console.log("=== MOBILE ==="); console.log(JSON.stringify(mobile, null, 1));

// ---- B. camera double-start: is the Camera button enabled while cameraActive? ----
const dctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const dp = await dctx.newPage();
await dp.addInitScript(() => {
  window.__gum = 0; window.__stops = 0;
  const fakeTrack = () => ({ stop() { window.__stops++; }, kind: "video", readyState: "live" });
  Object.defineProperty(navigator, "mediaDevices", {
    configurable: true,
    value: { getUserMedia: async () => { window.__gum++; const tracks = [fakeTrack()]; return { getTracks: () => tracks, id: "stream" + window.__gum }; } },
  });
});
await dp.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await dp.waitForTimeout(2500);
const cam = await dp.evaluate(async () => {
  const rail = document.querySelector('[data-o18="extract-k-rail"]');
  const root = rail.closest(".flex.flex-col.gap-3");
  const btn = [...root.querySelectorAll("button")].find(b => b.title === "Open camera");
  const snap = () => { const sl = [...root.querySelectorAll('[role="slider"]')]; return { camDisabled: btn.disabled, camAria: btn.getAttribute("aria-disabled"), sliderDisabled: sl.map(s => ({ ariaDisabled: s.getAttribute("aria-disabled"), dataDisabled: s.hasAttribute("data-disabled"), tabindex: s.getAttribute("tabindex") })), gum: window.__gum, stops: window.__stops }; };
  const before = snap();
  btn.click();
  await new Promise(r => setTimeout(r, 400));
  const afterFirst = snap();
  btn.click();
  await new Promise(r => setTimeout(r, 400));
  const afterSecond = snap();
  return { before, afterFirst, afterSecond, videos: document.querySelectorAll("video").length };
});
console.log("=== CAMERA DOUBLE-START ==="); console.log(JSON.stringify(cam, null, 1));

// ---- C. Reset disabled with no image while k is mutable ----
const rst = await dp.evaluate(() => {
  const rail = document.querySelector('[data-o18="extract-k-rail"]');
  const root = rail.closest(".flex.flex-col.gap-3");
  const reset = [...root.querySelectorAll("button")].find(b => b.title === "Reset");
  const k = root.querySelector('[role="slider"][aria-label="Number of colors"]');
  return { resetDisabled: reset.disabled, kValueNow: k.getAttribute("aria-valuenow"), kTabindex: k.getAttribute("tabindex") };
});
console.log("=== RESET GATE ==="); console.log(JSON.stringify(rst));
await b.close();
