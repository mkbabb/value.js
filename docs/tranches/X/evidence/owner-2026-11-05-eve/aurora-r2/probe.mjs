// o1105-r2 aurora lane probe: the adversary-r1 aurora cell VERBATIM (same seeds, waits, oklabStats, diff, d>12 movedFrac),
// pointed at BASE (prod) or a served DIST, plus longer swirl windows (5 s) and a light/dark pass. One browser, ctx per cell, closed in finally.
// Real-GPU witness: headless shell, ANGLE Metal (--use-angle=metal --enable-gpu), run under guarded --cpu-cores 0.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { mkdirSync, writeFileSync } from "node:fs";
import http from "node:http"; import { readFile } from "node:fs/promises"; import path from "node:path";
const RUN = process.env.RUN ?? "r1"; const TAG = process.env.TAG ?? "prod"; const DIST = process.env.DIST; const PORT = 8794;
const COLOR = DIST ? `http://127.0.0.1:${PORT}/` : (process.env.BASE ?? "https://color.babb.dev/");
const DIR = `/Users/mkbabb/.dev-logs/o1105-r2/aurora/runs/${TAG}-${RUN}`; const FR = `${DIR}/frames`; mkdirSync(FR, { recursive: true });
const SHOTS = new Set((process.env.SHOTS ?? "aurora-dark-oklch_0.7_0.15_265_,aurora-dark-oklch_0.7_0.15_30_").split(","));
let srv; if (DIST) { srv = http.createServer(async (q, r) => { let p = decodeURIComponent(q.url.split("?")[0].split("#")[0]); if (p.endsWith("/")) p += "index.html"; const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png" }; try { const b = await readFile(path.join(DIST, p)); r.writeHead(200, { "content-type": T[path.extname(p)] ?? "application/octet-stream" }); r.end(b); } catch { const b = await readFile(path.join(DIST, "index.html")); r.writeHead(200, { "content-type": "text/html" }); r.end(b); } }); await new Promise((ok) => srv.listen(PORT, "127.0.0.1", ok)); }
const out = { run: RUN, tag: TAG, base: COLOR, at: new Date().toISOString(), cells: {} };
const browser = await chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
async function withCtx(opts, fn) {
  const ctx = await browser.newContext({ deviceScaleFactor: 1, ...opts });
  try { const page = await ctx.newPage(); return await fn(page, ctx); }
  catch (e) { return { error: String(e).slice(0, 300) }; }
  finally { await ctx.close(); }
}
// Pixel stats in-page (decode PNGs on an OffscreenCanvas).
const diff = (page, a, b) => page.evaluate(async ([A, B]) => {
  const dec = async (s) => { const i = new Image(); i.src = "data:image/png;base64," + s; await i.decode(); const c = new OffscreenCanvas(128, Math.round(128 * i.height / i.width)); const x = c.getContext("2d"); x.drawImage(i, 0, 0, c.width, c.height); return x.getImageData(0, 0, c.width, c.height).data; };
  const p = await dec(A), q = await dec(B); let s = 0, n = 0, moved = 0;
  for (let k = 0; k < p.length; k += 4) { const d = (Math.abs(p[k] - q[k]) + Math.abs(p[k + 1] - q[k + 1]) + Math.abs(p[k + 2] - q[k + 2])) / 3; s += d; n++; if (d > 12) moved++; }
  return { meanAbs: +(s / n).toFixed(2), movedFrac: +(moved / n).toFixed(3) };
}, [a.toString("base64"), b.toString("base64")]);
const oklabStats = (page, buf) => page.evaluate(async (b64) => {
  const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
  const W = 96, H = Math.round(96 * img.height / img.width); const c = new OffscreenCanvas(W, H); const x = c.getContext("2d"); x.drawImage(img, 0, 0, W, H);
  const d = x.getImageData(0, 0, W, H).data; const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const Ls = [], Cs = []; let hx = 0, hy = 0, nh = 0;
  for (let i = 0; i < d.length; i += 4) {
    const r = lin(d[i]), g = lin(d[i + 1]), bl = lin(d[i + 2]);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * bl), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * bl), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * bl);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    Ls.push(L); const C = Math.hypot(A, B); Cs.push(C); if (C > 0.03) { hx += Math.cos(Math.atan2(B, A)); hy += Math.sin(Math.atan2(B, A)); nh++; }
  }
  const q = (a, p) => { const s = [...a].sort((u, v) => u - v); return +s[Math.floor(p * (s.length - 1))].toFixed(3); };
  const mean = Ls.reduce((u, v) => u + v, 0) / Ls.length; const sd = Math.sqrt(Ls.reduce((u, v) => u + (v - mean) ** 2, 0) / Ls.length);
  return { L_p05: q(Ls, .05), L_p50: q(Ls, .5), L_p95: q(Ls, .95), L_sd: +sd.toFixed(3), C_p50: q(Cs, .5), C_p95: q(Cs, .95), hueMean: +((Math.atan2(hy, hx) * 180 / Math.PI + 360) % 360).toFixed(0), chromaticFrac: +(nh / Ls.length).toFixed(3) };
}, buf.toString("base64"));
try {
  out.cells.aurora = [];
  for (const scheme of ["dark", "light"]) for (const seed of ["default", "oklch(0.7 0.15 30)", "oklch(0.7 0.15 145)", "oklch(0.7 0.15 265)", "oklch(0.6 0.2 330)"]) out.cells.aurora.push(await withCtx({ viewport: { width: 1440, height: 900 }, colorScheme: scheme }, async (page) => {
    await page.goto(seed === "default" ? COLOR : `${COLOR}#/?space=oklch&color=${encodeURIComponent(seed)}`, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(6000);
    const name = `aurora-${scheme}-${seed === "default" ? "default" : seed.replace(/[^0-9a-z.]+/gi, "_")}`;
    const keep = SHOTS.has(name);
    const ui = await page.screenshot(keep ? { path: `${FR}/${name}-ui.png` } : {});
    await page.addStyleTag({ content: "*{visibility:hidden!important}canvas{visibility:visible!important}" }); await page.waitForTimeout(400);
    const field = await page.screenshot(keep ? { path: `${FR}/${name}-field.png` } : {});
    await page.waitForTimeout(1500); const field2 = await page.screenshot();
    await page.waitForTimeout(3500); const field5 = await page.screenshot(keep ? { path: `${FR}/${name}-field-5s.png` } : {});
    return { name, ui: await oklabStats(page, ui), field: await oklabStats(page, field), swirl1500: await diff(page, field, field2), swirl5000: await diff(page, field, field5) };
  }));
} finally { await browser.close(); srv?.close(); }
writeFileSync(`${DIR}/aurora.json`, JSON.stringify(out, null, 1));
for (const c of out.cells.aurora) console.log(c.name, "L_p50", c.field?.L_p50, "L_sd", c.field?.L_sd, "C_p50", c.field?.C_p50, "swirl1500", JSON.stringify(c.swirl1500), "swirl5000", JSON.stringify(c.swirl5000), c.error ?? "");
