// X-DS pass 8 cure probe (DS-F10-C1, C2; G1/G2 re-witness): headless real Chrome (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] || "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const res = {};
// leftmost colourful canvas pixel (CSS px) in a region given as fractions of the canvas
const inkLeft = (canvas, [fx0, fy0, fx1, fy1]) => {
  const ctx = canvas.getContext("2d"); const W = canvas.width, H = canvas.height; const k = W / canvas.getBoundingClientRect().width;
  const x0 = Math.floor(W * fx0), y0 = Math.floor(H * fy0), w = Math.floor(W * (fx1 - fx0)), h = Math.floor(H * (fy1 - fy0));
  const d = ctx.getImageData(x0, y0, w, h).data; let min = Infinity;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; const r = d[i], g = d[i + 1], bb = d[i + 2], a = d[i + 3];
    if (a > 120 && Math.max(r, g, bb) - Math.min(r, g, bb) > 70 && x < min) min = x; }
  return Number.isFinite(min) ? Math.round((x0 + min) / k) : null;
};
for (const theme of ["light", "dark"]) {
  const mk = async (w, h) => { const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme); return [ctx, await ctx.newPage()]; };
  // C1: the Harmonic Levels tile strip's inline end
  let [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  res[`morph-${theme}`] = await p.evaluate(() => { const g = document.querySelector(".grid"); const gr = g.getBoundingClientRect(); const cs = getComputedStyle(g);
    const tiles = [...g.querySelectorAll(".grid-cell")].map((c) => c.getBoundingClientRect()).filter((r) => r.left < gr.right && r.right > gr.left);
    const last = tiles.at(-1); return { grid: [Math.round(gr.left), Math.round(gr.right)], moreEnd: g.hasAttribute("data-more-end"), stripFade: cs.getPropertyValue("--strip-fade-end").trim(), maskImage: cs.maskImage || cs.webkitMaskImage,
      lastTile: last && [Math.round(last.left), Math.round(last.right)], lastTileVisiblePx: last && Math.round(gr.right - last.left) }; });
  await p.locator(".levels-card").first().evaluate((e) => e.scrollIntoView({ block: "center" })); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/morph-${theme}-1440.png` });
  const card = await p.locator(".levels-card").first().boundingBox();
  if (card) await p.screenshot({ path: `${OUT}/crop-strip-end-${theme}-1440.png`, clip: { x: card.x + card.width - 360, y: card.y, width: 360, height: card.height } });
  await ctx.close();
  // C2: the /v stage, the epicycle inset vs the legend's edge, at rest and at the hover scale
  [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "networkidle" }); await p.waitForTimeout(5000);
  await p.screenshot({ path: `${OUT}/v-${theme}-1440.png` });
  const cb = await p.locator("canvas").first().boundingBox();
  // the chain wanders inside its fitted box while it plays: the inset is the minimum over 3 s of frames
  const meas = async () => { let legendLeft = Infinity, epicycleLeft = Infinity, stageInset;
    for (let i = 0; i < 30; i++) { const m = await p.locator("canvas").first().evaluate((c, f) => { const fn = new Function("return " + f)(); return { l: fn(c, [0, 0, 0.3, 0.12]), e: fn(c, [0, 0.45, 0.4, 1]), s: getComputedStyle(c).getPropertyValue("--stage-inset-inline").trim() }; }, inkLeft.toString());
      if (m.l != null) legendLeft = Math.min(legendLeft, m.l); if (m.e != null) epicycleLeft = Math.min(epicycleLeft, m.e); stageInset = m.s; await p.waitForTimeout(100); }
    return { legendLeft, epicycleLeftMin: epicycleLeft, stageInset }; };
  res[`v-rest-${theme}`] = await meas();
  await p.mouse.move(cb.x + cb.width * 0.3, cb.y + cb.height * 0.4); await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/v-hover-left-${theme}-1440.png` });
  for (const [fx, fy] of [[0.1, 0.72], [0.13, 0.75]]) { await p.mouse.move(cb.x + cb.width * fx, cb.y + cb.height * fy); await p.waitForTimeout(900); }
  res[`v-hover-${theme}`] = await meas();
  await p.screenshot({ path: `${OUT}/v-chain-hover-${theme}-1440.png`, clip: { x: cb.x, y: cb.y + cb.height * 0.45, width: cb.width * 0.4, height: cb.height * 0.55 } });
  await p.screenshot({ path: `${OUT}/v-chain-hover-full-${theme}-1440.png` });
  await ctx.close();
  // G1/G2 re-witness: the gallery card dialog (glass DialogDescription), unchanged
  [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.locator(".card-open").first().click().catch(() => {}); await p.waitForTimeout(1500);
  res[`modal-${theme}`] = await p.evaluate(() => { const d = document.querySelector("[role=dialog]"); const s = d && (document.getElementById(d.getAttribute("aria-describedby") ?? "") ?? d.querySelector("[data-slot=description]")); return s && { font: [getComputedStyle(s).fontSize, getComputedStyle(s).fontWeight], color: getComputedStyle(s).color }; });
  await p.screenshot({ path: `${OUT}/modal-${theme}-1440.png` });
  await ctx.close();
}
writeFileSync(`${OUT}/f10-cure-probe.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res, null, 1));
await b.close();
