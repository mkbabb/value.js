// SS-8 B26-extract-generate-panes — shared probe helpers. Headless Playwright Chromium (default shell).
// One browser per run; a new context per cell; the caller closes everything in finally.
import { chromium, webkit } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
export { chromium, webkit };
export const APP = process.env.APP || "http://localhost:9000/";
export const EV = "/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/evidence/B26-extract-generate-panes/";
mkdirSync(EV, { recursive: true });
export const save = (name, obj) => writeFileSync(EV + name, JSON.stringify(obj, null, 1));

export async function newCell(browser, { w = 1440, h = 900, scheme = "light", mobile = false, hasTouch = false, forcedColors = "none", dsf = 1, permissions = [] } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, isMobile: mobile, hasTouch, forcedColors, deviceScaleFactor: dsf, permissions });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, scheme);
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 300)); });
  page.on("pageerror", (e) => errs.push("pageerror: " + (e.message || "").slice(0, 300)));
  return { ctx, page, errs };
}

export async function goto(page, route, settle = 6000) {
  // Vite may answer 504 "Outdated Optimize Dep" while re-optimizing; a reload cures it (up to 3 tries).
  for (let i = 0; ; i++) {
    try {
      if (i === 0) await page.goto(APP + "#/" + route, { waitUntil: "domcontentloaded", timeout: 180000 });
      else await page.reload({ waitUntil: "domcontentloaded", timeout: 180000 });
      await page.waitForFunction((r) => [...document.querySelectorAll("h1,h2,h3")].some((h) => h.textContent.trim().toLowerCase() === r), route, { timeout: 60000 });
      break;
    } catch (e) { if (i >= 2) { const hs = await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 24)).join("|") + " body:" + document.body.innerText.slice(0, 160)).catch(() => "?"); throw new Error(String(e.message).slice(0, 120) + " :: " + hs); } }
  }
  await page.waitForTimeout(settle);
}

/** Build a test PNG in-page (four quadrants + a hue ramp band), return a Buffer. */
export async function makePng(page) {
  const b64 = await page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = 320; c.height = 240;
    const g = c.getContext("2d");
    const q = ["#1e3a8a", "#e11d48", "#fde68a", "#16a34a"];
    q.forEach((col, i) => { g.fillStyle = col; g.fillRect((i % 2) * 160, Math.floor(i / 2) * 120, 160, 120); });
    for (let x = 0; x < 320; x++) { g.fillStyle = `hsl(${x * 360 / 320} 80% 55%)`; g.fillRect(x, 100, 1, 40); }
    return c.toDataURL("image/png").split(",")[1];
  });
  return Buffer.from(b64, "base64");
}

/** Load the PNG through the drop zone's own file chooser. */
export async function loadImage(page, buf) {
  const [fc] = await Promise.all([
    page.waitForEvent("filechooser", { timeout: 20000 }),
    page.locator("text=Upload image").first().click(),
  ]);
  const t0 = Date.now();
  await fc.setFiles({ name: "ss8-b26.png", mimeType: "image/png", buffer: buf });
  await page.waitForFunction(() => /% of the image/.test(document.body.innerText), null, { timeout: 60000 });
  return Date.now() - t0;
}

/** Mean RGB of a page-region screenshot, decoded in-page. */
export async function meanRgb(page, clip) {
  const buf = await page.screenshot({ clip });
  return page.evaluate(async (b64) => {
    const blob = await (await fetch("data:image/png;base64," + b64)).blob();
    const bm = await createImageBitmap(blob);
    const c = new OffscreenCanvas(bm.width, bm.height); const g = c.getContext("2d"); g.drawImage(bm, 0, 0);
    const d = g.getImageData(0, 0, bm.width, bm.height).data; let r = 0, gg = 0, b = 0, n = 0, nonBlank = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; n++; if (d[i + 3] > 0 && (d[i] + d[i + 1] + d[i + 2]) > 30) nonBlank++; }
    return { r: r / n, g: gg / n, b: b / n, n, nonBlank };
  }, buf.toString("base64"));
}

/** Resolve any CSS colour to sRGB 0..255 via a 1x1 canvas. */
export const resolveColorFn = `(css) => { const c = new OffscreenCanvas(1,1); const g = c.getContext("2d"); g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0,0,1,1); const d = g.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255]; }`;

export function lum([r, g, b]) {
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
export function contrast(a, b) { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); }
export function oklchChroma([r, g, b]) {
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const [R, G, B] = [f(r), f(g), f(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return +Math.hypot(A, Bb).toFixed(4);
}

export async function runCells(browser, cells, out) {
  for (const [name, opts, fn] of cells) {
    const { ctx, page, errs } = await newCell(browser, opts);
    const t0 = Date.now();
    try { out[name] = await Promise.race([fn(page, ctx), new Promise((_, rej) => setTimeout(() => rej(new Error("cell timeout 300s")), 300000))]); }
    catch (e) { out[name] = { error: String(e.message || e).slice(0, 400) }; }
    finally { if (out[name]) { out[name].errs = errs.slice(0, 8); out[name].ms = Date.now() - t0; } await ctx.close().catch(() => {}); }
    console.log(name, JSON.stringify(out[name]).slice(0, 220));
  }
}
