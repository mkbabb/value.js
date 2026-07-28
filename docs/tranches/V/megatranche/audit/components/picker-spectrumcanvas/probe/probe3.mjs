import { webkit } from "playwright";
const b = await webkit.launch();

// ---- A. CLEAN camera double-start with a REAL MediaStream (canvas.captureStream) ----
const dctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const dp = await dctx.newPage();
await dp.addInitScript(() => {
  window.__gum = 0; window.__stops = 0; window.__streams = [];
  Object.defineProperty(navigator, "mediaDevices", {
    configurable: true,
    value: {
      getUserMedia: async () => {
        window.__gum++;
        const cv = document.createElement("canvas"); cv.width = 64; cv.height = 48;
        cv.getContext("2d").fillRect(0, 0, 64, 48);
        const s = cv.captureStream(5);
        for (const t of s.getTracks()) { const o = t.stop.bind(t); t.stop = () => { window.__stops++; o(); }; }
        window.__streams.push(s);
        return s;
      },
    },
  });
});
await dp.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await dp.waitForTimeout(2500);
const cam = await dp.evaluate(async () => {
  const root = document.querySelector('[data-o18="extract-k-rail"]').closest(".flex.flex-col.gap-3");
  const btn = [...root.querySelectorAll("button")].find(b => b.title === "Open camera");
  const upl = [...root.querySelectorAll("button")].find(b => b.title === "Upload image");
  const sl = () => [...root.querySelectorAll('[role="slider"]')].map(s => s.getAttribute("aria-disabled") ?? "null");
  const snap = t => ({ t, camDisabled: btn.disabled, uploadDisabled: upl.disabled, sliders: sl(), gum: window.__gum, stops: window.__stops, videos: document.querySelectorAll("video").length, live: window.__streams.map(s => s.getTracks().map(x => x.readyState).join()) });
  const out = [snap("before")];
  btn.click(); await new Promise(r => setTimeout(r, 600)); out.push(snap("after-1st-click"));
  btn.click(); await new Promise(r => setTimeout(r, 600)); out.push(snap("after-2nd-click"));
  btn.click(); await new Promise(r => setTimeout(r, 600)); out.push(snap("after-3rd-click"));
  return out;
});
console.log("=== CAMERA (real MediaStream) ==="); console.log(JSON.stringify(cam, null, 1));

// ---- B. thumb REAL hit width via elementFromPoint sweep (mobile, coarse) ----
const mctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const mp = await mctx.newPage();
await mp.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await mp.waitForTimeout(2500);
const hit = await mp.evaluate(() => {
  const root = document.querySelector('[data-o18="extract-k-rail"]').closest(".flex.flex-col.gap-3");
  const th = root.querySelector('[role="slider"][aria-label="Number of colors"]');
  const r = th.getBoundingClientRect(), cx = r.x + r.width / 2, cy = r.y + r.height / 2;
  let l = cx, rr = cx;
  for (let d = 0; d <= 40; d += 0.5) { const e = document.elementFromPoint(cx - d, cy); if (e === th || th.contains(e)) l = cx - d; else break; }
  for (let d = 0; d <= 40; d += 0.5) { const e = document.elementFromPoint(cx + d, cy); if (e === th || th.contains(e)) rr = cx + d; else break; }
  const at = d => { const e = document.elementFromPoint(cx + d, cy); return e ? e.tagName + "." + String(e.className).split(" ")[0] : "null"; };
  return { boxW: +r.width.toFixed(1), boxH: +r.height.toFixed(1), hitW: +(rr - l).toFixed(1), neighborAtMinus12: at(-12), neighborAtPlus12: at(12) };
});
console.log("=== THUMB HIT WIDTH (mobile/coarse) ==="); console.log(JSON.stringify(hit));

// ---- C. keyboard operability + k=16 label geometry ----
const kb = await dp.evaluate(() => {
  const root = document.querySelector('[data-o18="extract-k-rail"]').closest(".flex.flex-col.gap-3");
  const th = root.querySelector('[role="slider"][aria-label="Number of colors"]');
  th.focus();
  return { focused: document.activeElement === th, before: th.getAttribute("aria-valuenow") };
});
for (let i = 0; i < 11; i++) await dp.keyboard.press("ArrowRight");
await dp.waitForTimeout(500);
const kb2 = await dp.evaluate(() => {
  const root = document.querySelector('[data-o18="extract-k-rail"]').closest(".flex.flex-col.gap-3");
  const th = root.querySelector('[role="slider"][aria-label="Number of colors"]');
  const lab = root.querySelector("label");
  const lr = lab.getBoundingClientRect();
  return { k: th.getAttribute("aria-valuenow"), labelText: lab.textContent.trim(), labelW: +lr.width.toFixed(1), labelScrollW: lab.scrollWidth, clipped: lab.scrollWidth > Math.ceil(lr.width), resetDisabled: [...root.querySelectorAll("button")].find(b => b.title === "Reset").disabled };
});
console.log("=== KEYBOARD + k=16 LABEL ==="); console.log(JSON.stringify({ ...kb, ...kb2 }));
await b.close();
