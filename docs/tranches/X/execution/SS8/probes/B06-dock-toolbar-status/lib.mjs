// SERVED MODEL: claude-opus-5-5 — SS-8 B06 shared probe helpers (no browser launched here).
import fs from "node:fs";
import path from "node:path";

export const BASE = process.env.BASE ?? "http://localhost:9000";
export const EV = "/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/evidence/B06-dock-toolbar-status";
fs.mkdirSync(EV, { recursive: true });

export function writeJson(name, data) {
  fs.writeFileSync(path.join(EV, name), JSON.stringify(data, null, 2) + "\n");
}

/** Cold-boot a hash route and wait for the dock plus a settle window. */
export async function boot(page, hash = "#/", settle = 3000) {
  await page.goto(BASE + "/" + hash, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.locator(".glass-dock").first().waitFor({ state: "visible", timeout: 90000 });
  await page.waitForTimeout(settle);
}

/** Rest the pointer on the dock plate's inline-start padding (holds an idle dock open). */
export async function restOnDock(page) {
  const box = await page.locator(".glass-dock").first().boundingBox();
  if (box) await page.mouse.move(box.x + 3, box.y + box.height / 2);
}

/** Expand a collapsed (idle) dock with a real click, settle, then rest the pointer on it. */
export async function ensureExpanded(page) {
  const c = page.locator(".glass-dock.collapsed");
  if (await c.count()) { await c.first().click(); await page.waitForTimeout(900); }
  await restOnDock(page);
}

export async function scheme(page) {
  return page.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));
}

/**
 * RENDERED contrast of an element's ink against the pixels actually painted
 * behind it (backdrop-filter composite included): screenshot the element's box
 * with its ink forced transparent (ground), resolve the ink (colour alpha x
 * opacity chain) and composite it over every ground pixel. Returns WCAG ratios.
 * `prop` = "color" (text / currentColor icons). Transitions are frozen first.
 */
export async function renderedContrast(page, locator, { pad = 0, shot } = {}) {
  const h = await locator.elementHandle();
  if (!h) return null;
  await page.addStyleTag({ content: "[data-ss8-freeze],[data-ss8-freeze] *{transition:none!important}" });
  await h.evaluate((el) => el.setAttribute("data-ss8-freeze", ""));
  await page.waitForTimeout(80);
  const box = await h.boundingBox();
  if (!box || box.width < 1) return null;
  const ink = await h.evaluate((el) => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const draw = (ground, css) => { ctx.fillStyle = ground; ctx.fillRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); return ctx.getImageData(0, 0, 1, 1).data; };
    const css = getComputedStyle(el).color;
    const b = draw("#000", css), w = draw("#fff", css);
    const a = 1 - (w[0] - b[0]) / 255;
    let op = 1; for (let n = el; n; n = n.parentElement) op *= Number(getComputedStyle(n).opacity);
    return { css, rgb: a > 0 ? [b[0] / a, b[1] / a, b[2] / a] : [0, 0, 0], alpha: a, opacityChain: op };
  });
  const clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + 2 * pad, height: box.height + 2 * pad };
  if (shot) await page.screenshot({ path: shot, clip });
  await page.addStyleTag({ content: "[data-ss8-hide],[data-ss8-hide] *{color:transparent!important;-webkit-text-fill-color:transparent!important;transition:none!important}" });
  await h.evaluate((el) => el.setAttribute("data-ss8-hide", ""));
  await page.waitForTimeout(80);
  const buf = await page.screenshot({ clip });
  await h.evaluate((el) => el.removeAttribute("data-ss8-hide"));
  const stats = await page.evaluate(async ({ b64, ink }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const a = ink.alpha * ink.opacityChain;
    const ratios = [], gl = [];
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const ir = a * ink.rgb[0] + (1 - a) * r, ig = a * ink.rgb[1] + (1 - a) * g, ib = a * ink.rgb[2] + (1 - a) * b;
      const l1 = L(ir, ig, ib), l2 = L(r, g, b);
      ratios.push((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)); gl.push(l2);
    }
    ratios.sort((p, q) => p - q); gl.sort((p, q) => p - q);
    const q = (arr, f) => arr[Math.min(arr.length - 1, Math.floor(f * arr.length))];
    return { px: ratios.length, min: q(ratios, 0), p10: q(ratios, 0.1), median: q(ratios, 0.5), groundLumMin: gl[0], groundLumMax: gl[gl.length - 1] };
  }, { b64: buf.toString("base64"), ink });
  const r3 = (v) => Math.round(v * 1000) / 1000;
  return { ink: { css: ink.css, effAlpha: r3(ink.alpha * ink.opacityChain) }, box: { w: r3(box.width), h: r3(box.height) }, min: r3(stats.min), p10: r3(stats.p10), median: r3(stats.median), groundLum: [r3(stats.groundLumMin), r3(stats.groundLumMax)], px: stats.px };
}

/** Resolve a CSS colour to sRGB 0-255 + alpha in page. */
export async function resolveColor(page, css) {
  return page.evaluate((css) => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const ctx = cv.getContext("2d");
    const draw = (g) => { ctx.fillStyle = g; ctx.fillRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data]; };
    const b = draw("#000"), w = draw("#fff"); const a = 1 - (w[0] - b[0]) / 255;
    return a > 0 ? [b[0] / a, b[1] / a, b[2] / a, a] : [0, 0, 0, 0];
  }, css);
}

/** sRGB 0-255 -> OKLab. */
export function oklab([r, g, b]) {
  const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  const R = lin(r), G = lin(g), B = lin(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
