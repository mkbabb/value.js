// X-DS fourier pass 5 · F5P cure seat (redeploy, 2026-10-17): AFTER frames for the critic's cells, plus the DS-F5P-T1 grid-registration
// measurement on /visualize (the inner .drop-target-grid against the page's .paper-grid, both axes). Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3211"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n, full=false) => p.screenshot({ path: `${OUT}/${n}.png`, fullPage: full }).catch((e) => console.log("shot fail", n, e.message));
try {
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  try {
    await go("/gallery", 4000); await shot(p, `gallery-${k}`);
    await go("/equation", 6000); await shot(p, `equation-${k}`);
    await p.mouse.wheel(0, 900).catch(()=>{}); await p.evaluate(()=>window.scrollBy(0,900)); await p.waitForTimeout(1500); await shot(p, `equation-scroll-${k}`);
    await go("/morph", 5000); await shot(p, `morph-${k}`);
    await go(`/v/${SLUG}`, 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v computing", k));
    if (w === 390) await p.getByRole("tab", { name: "Canvas" }).click({ timeout: 10000 }).catch((e) => console.log("canvas tab", k, e.message));
    await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
    await shot(p, `v-${k}`);
    if (w === 1440) { await p.mouse.move(230, 640); await p.waitForTimeout(1200); await shot(p, `v-hover-${k}`); }
    await go("/visualize", 3000); await shot(p, `visualize-${k}`);
    // DS-F5P-T1: the grid's attachment, and the major-line phase (mod 64 CSS px) inside the stage vs the page outside it,
    // read from an in-memory DPR-2 screenshot (column/row profiles folded on the 64 px major pitch; the darkest
    // offset in light, the strongest-deviation offset in both themes).
    if (w === 1440) o.gridT1 = await (async () => {
      const g = await p.evaluate(() => { const e = document.querySelector(".drop-target-grid"); if (!e) return null; const r = e.getBoundingClientRect();
        return { attachment: getComputedStyle(e).backgroundAttachment, opacity: getComputedStyle(e).opacity, rect: { x: r.x, y: r.y, w: r.width, h: r.height } }; });
      const buf = await p.screenshot({ clip: { x: 0, y: 0, width: 420, height: 900 } });
      const phase = await p.evaluate(async (d) => {
        const img = new Image(); img.src = "data:image/png;base64," + d; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); const s = 2;
        const prof = (x0, x1, y0, y1, byRow) => { const w = x1 - x0, h = y1 - y0, px = x.getImageData(x0, y0, w, h).data, v = [];
          for (let a = 0; a < (byRow ? h : w); a++) { let t = 0; for (let b = 0; b < (byRow ? w : h); b++) { const i = ((byRow ? a : b) * w + (byRow ? b : a)) * 4; t += px[i] + px[i + 1] + px[i + 2]; } v.push(t / (byRow ? w : h)); } return v; };
        const fold = (v, o0) => { const P = 64 * s, acc = new Array(P).fill(0), n = new Array(P).fill(0); v.forEach((t, i) => { const k = (o0 + i) % P; acc[k] += t; n[k]++; });
          const a = acc.map((t, k) => t / n[k]), m = a.reduce((p, q) => p + q) / P; return a.map((t, k) => [k / s, Math.round(Math.abs(m - t) * 10) / 10]).sort((p, q) => q[1] - p[1])[0]; };
        return { rowsOutside: fold(prof(2 * s, 15 * s, 200 * s, 860 * s, true), 200 * s), rowsInside: fold(prof(180 * s, 260 * s, 200 * s, 860 * s, true), 200 * s),
                 colsOutside: fold(prof(40 * s, 420 * s, 4 * s, 14 * s, false), 40 * s), colsInside: fold(prof(40 * s, 420 * s, 300 * s, 360 * s, false), 40 * s) };
      }, buf.toString("base64"));
      return { ...g, majorPhaseCss: phase };
    })();
    o.boxShadows = await p.evaluate(() => [...document.querySelectorAll("*")].filter(e=>{const s=getComputedStyle(e);return s.boxShadow!=="none"&&e.getBoundingClientRect().width>0}).slice(0,40).map(e=>({c:(e.className?.baseVal??e.className)+"",s:getComputedStyle(e).boxShadow.slice(0,200)})));
  } catch (e) { o.err = e.message.slice(0, 300); }
  await ctx.close();
  writeFileSync(`${OUT}/f5p-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }
