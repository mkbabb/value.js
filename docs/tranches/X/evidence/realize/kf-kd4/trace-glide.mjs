// K-D4.r1 diagnostic: CDP performance trace of the portrait/landscape sheet drag (one browser, closed in finally).
import { writeFileSync } from "node:fs";
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg("base", "https://keyframes.babb.dev/").replace(/\/?$/, "/");
const OUT = arg("out", "trace");
const SCENE = arg("scene", "cube");
const [W, H] = arg("vp", "390x844").split("x").map(Number);
const NORAF = process.argv.includes("--norect");
const { chromium } = await import("/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs");
const GPU = process.argv.includes("--gpu");
const browser = await chromium.launch(GPU ? { args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] } : {});
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, hasTouch: true, isMobile: true, reducedMotion: "no-preference", colorScheme: "dark" });
  const page = await ctx.newPage();
  console.log("renderer", await page.evaluate(() => { const gl = document.createElement("canvas").getContext("webgl2"); const x = gl?.getExtension("WEBGL_debug_renderer_info"); return x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : null; }));
  await page.goto(`${BASE}#/${SCENE}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForSelector(".stage-cell", { timeout: 15000 });
  await page.waitForTimeout(3000);
  const hb = await page.locator('[data-slot="sheet-detent-handle"]').first().boundingBox();
  const cdp = await ctx.newCDPSession(page);
  await page.evaluate((norect) => { const cellEl = document.querySelector(".stage-cell"); const S = (window.__g = { t: [], on: true }); const f = (t) => { if (!S.on) return; S.t.push(t); if (!norect) cellEl.getBoundingClientRect(); requestAnimationFrame(f); }; requestAnimationFrame(f); }, NORAF);
  const chunks = [];
  cdp.on("Tracing.dataCollected", (e) => chunks.push(...e.value));
  const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
  await cdp.send("Tracing.start", { transferMode: "ReportEvents", traceConfig: { includedCategories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.frame", "blink", "cc", "viz", "gpu", "benchmark", "toplevel"] } });
  const x = hb.x + hb.width / 2, start = hb.y + hb.height / 2, land = W > H;
  const reach = land ? W * 0.15 : H * 0.3;
  const drag = async (y0, y1) => {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y: y0 }] });
    for (let i = 1; i <= 16; i++) await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: land ? x - ((y0 - y1) * i) / 16 : x, y: land ? y0 : y0 + ((y1 - y0) * i) / 16 }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  };
  await drag(start, start - reach);
  await page.waitForTimeout(1340);
  const ob = await page.locator('[data-slot="sheet-detent-handle"]').first().boundingBox();
  await drag(ob.y + ob.height / 2, ob.y + ob.height / 2 + reach);
  await page.waitForTimeout(1200);
  await cdp.send("Tracing.end");
  await done;
  const t = await page.evaluate(() => { window.__g.on = false; return window.__g.t; });
  writeFileSync(`${OUT}.json`, JSON.stringify({ traceEvents: chunks }));
  writeFileSync(`${OUT}.raf.json`, JSON.stringify(t));
  const d = t.slice(1).map((v, i) => v - t[i]);
  console.log(JSON.stringify({ frames: d.length, big: d.filter((v) => v > 20).map((v) => +v.toFixed(1)) }));
} finally { await browser.close(); }
