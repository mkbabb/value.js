// SS-8 · batch B07-pane-shell · engine-specific witness (WebKit arm; Chromium arm as cross-check).
// Run: ~/.claude/guard/guarded --exclusive webkit --timeout 20 -- node <this> webkit
//      ~/.claude/guard/guarded --timeout 20 -- node <this> chromium
// One browser per run, one context per cell, closed in finally.
import { chromium, webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ENGINE = process.argv[2] === "chromium" ? "chromium" : "webkit";
const BASE = "http://localhost:9000/#";
const EV = new URL("../../evidence/B07-pane-shell/", import.meta.url).pathname;
mkdirSync(EV, { recursive: true });
const result = { engine: ENGINE, cells: {} };

const ARITH = () => {
  const d = document.createElement("div"); document.body.appendChild(d);
  const cs = () => getComputedStyle(d).scale;
  d.style.setProperty("scale", "calc(tan(atan2(var(--type-heading), var(--type-display-1))))"); const atanScale = cs();
  d.style.setProperty("scale", "calc(var(--type-heading) / var(--type-display-1))"); const divScale = cs();
  d.style.setProperty("scale", "calc(24px / 48px)"); const divLiteral = cs();
  d.style.setProperty("scale", "calc(tan(atan2(24px, 48px)))"); const atanLiteral = cs();
  const root = getComputedStyle(document.documentElement);
  const r = { vw: innerWidth, atanScale, atanLiteral, divScale, divLiteral, divSupported: CSS.supports("scale", "calc(1px / 2px)"),
    contrastColorSupported: CSS.supports("color", "contrast-color(red)"),
    typeHeadingPx: (() => { d.style.fontSize = "var(--type-heading)"; return getComputedStyle(d).fontSize; })(),
    typeDisplay1Px: (() => { d.style.fontSize = "var(--type-display-1)"; return getComputedStyle(d).fontSize; })(),
    ua: navigator.userAgent };
  d.remove(); return r;
};

const TITLES = () => [...document.querySelectorAll(".pane-header")].map((h) => {
  const t = h.querySelector(".pane-header-title"), cs = getComputedStyle(t), bs = getComputedStyle(h, "::before");
  return { title: t.textContent.trim().slice(0, 24), fs: cs.fontSize, transform: cs.transform, scale: cs.scale, condensed: h.dataset.condensed ?? null, veilDisplay: bs.display, top: Math.round(h.getBoundingClientRect().top) };
});

const b = await (ENGINE === "webkit" ? webkit : chromium).launch();
try {
  // 1 — arithmetic cells (PH-1 engine attribution, D-15 pole, the division cure)
  result.cells.arith = [];
  for (const w of [390, 768, 1024, 1280, 1300, 1440, 1512]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    try { const p = await ctx.newPage(); await p.goto(BASE + "/", { waitUntil: "load", timeout: 45000 }); await p.waitForTimeout(2500); result.cells.arith.push(await p.evaluate(ARITH)); }
    finally { await ctx.close(); }
  }

  // 2 — rendered title/veil under scroll and at zoom-200%-equivalent viewports (PH-1 consequence, D-15, PH-3)
  result.cells.render = [];
  for (const [w, h, dsf, r] of [[1440, 900, 1, "/"], [1440, 900, 1, "/gradient"], [1280, 720, 1, "/gradient"], [1024, 768, 1, "/"], [720, 450, 2, "/gradient"], [768, 491, 2, "/gradient"]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
    try {
      const p = await ctx.newPage(); await p.goto(BASE + r, { waitUntil: "load", timeout: 45000 }); await p.waitForTimeout(3500);
      const rows = [];
      for (const y of [0, 64, 120, 300]) {
        await p.evaluate((y) => { document.scrollingElement.scrollTop = y; for (const port of document.querySelectorAll(".pane-scroll-fade")) port.scrollTop = y; }, y);
        await p.waitForTimeout(400);
        rows.push({ y, titles: await p.evaluate(TITLES) });
      }
      result.cells.render.push({ vp: `${w}x${h}@${dsf}`, route: r, rows });
      if (w === 768) await p.screenshot({ path: `${EV}${ENGINE}-zoom200eq-768-gradient-y300.png` });
    } finally { await ctx.close(); }
  }

  // 3 — is backdrop-filter live in this headless build? (D-3 legibility limb)
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const p = await ctx.newPage(); await p.goto(BASE + "/", { waitUntil: "load", timeout: 45000 }); await p.waitForTimeout(4000);
      // a fixed probe pane over high-frequency content: a striped backdrop we author, so the input is known
      await p.evaluate(() => {
        const s = document.createElement("div"); s.id = "ss8-stripes";
        Object.assign(s.style, { position: "fixed", left: "100px", top: "100px", width: "400px", height: "160px", zIndex: 2147483000,
          background: "repeating-linear-gradient(90deg, #000 0 4px, #fff 4px 8px)" });
        const o = document.createElement("div"); o.id = "ss8-probe";
        Object.assign(o.style, { position: "fixed", left: "150px", top: "120px", width: "300px", height: "120px", zIndex: 2147483001, background: "transparent" });
        document.body.append(s, o);
      });
      const clip = { x: 150, y: 120, width: 300, height: 120 };
      const shot = async (bf) => { await p.evaluate((bf) => { const o = document.getElementById("ss8-probe"); o.style.backdropFilter = bf; o.style.webkitBackdropFilter = bf; }, bf); await p.waitForTimeout(400); return (await p.screenshot({ clip })).toString("base64"); };
      const none = await shot("none"), blur = await shot("blur(16px)");
      const applied = await p.evaluate(() => { const s = getComputedStyle(document.getElementById("ss8-probe")); return s.backdropFilter || s.webkitBackdropFilter; });
      const stats = await p.evaluate(async ([a, c]) => {
        const dec = async (b64) => { const bm = await createImageBitmap(await (await fetch("data:image/png;base64," + b64)).blob()); const cv = new OffscreenCanvas(bm.width, bm.height); const x = cv.getContext("2d"); x.drawImage(bm, 0, 0); return x.getImageData(0, 0, bm.width, bm.height).data; };
        const A = await dec(a), C = await dec(c);
        let delta = 0, n = 0, varA = 0, varC = 0, mA = 0, mC = 0;
        for (let i = 0; i < A.length; i += 4) { const la = (A[i] + A[i + 1] + A[i + 2]) / 3, lc = (C[i] + C[i + 1] + C[i + 2]) / 3; delta += Math.abs(la - lc); mA += la; mC += lc; n++; }
        mA /= n; mC /= n;
        for (let i = 0; i < A.length; i += 4) { const la = (A[i] + A[i + 1] + A[i + 2]) / 3, lc = (C[i] + C[i + 1] + C[i + 2]) / 3; varA += (la - mA) ** 2; varC += (lc - mC) ** 2; }
        return { meanAbsLumaDelta: +(delta / n).toFixed(2), stdNone: +Math.sqrt(varA / n).toFixed(2), stdBlur: +Math.sqrt(varC / n).toFixed(2), px: n };
      }, [none, blur]);
      writeFileSync(`${EV}${ENGINE}-backdrop-none.png`, Buffer.from(none, "base64"));
      writeFileSync(`${EV}${ENGINE}-backdrop-blur16.png`, Buffer.from(blur, "base64"));
      result.cells.backdrop = { computedBackdrop: applied, ...stats, note: "stripes 4px b/w under a transparent probe; live blur collapses luma std toward 0" };
    } finally { await ctx.close(); }
  }
} finally {
  await b.close();
  writeFileSync(`${EV}${ENGINE}-engine.json`, JSON.stringify(result, null, 1));
}
console.log("done", ENGINE);
