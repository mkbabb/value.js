// SS8 B11 shared harness. The live dev app at :9000 is driven headless; the
// dev API corpus is EMPTY (GET :3000/palettes -> data:[]; /colors/tags -> []),
// so GET /palettes, GET /colors/tags, PATCH /palettes/:slug and POST .../flag
// are answered in-context by page.route (no write reaches the shared dev DB).
import { chromium } from "playwright";
export const OWNER = "probe-owner";
const NOW = "2026-10-19T00:00:00.000Z";
const pal = (n, user, extra = {}) => ({
  name: `Probe Palette ${n}`, slug: `probe-palette-${n}`, userSlug: user,
  colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }, { css: "#facc15", position: 2 }],
  createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: n, visibility: "public",
  tier: "standard", published: true, tags: [], currentHash: `h${n}`, ...extra,
});
export const PALETTES = [pal(1, "gallery"), pal(2, OWNER), pal(3, "gallery"), pal(4, OWNER)];
export const TAGS = [
  ["warm", "mood"], ["cool", "mood"], ["calm", "mood"], ["bold", "mood"],
  ["pastel", "style"], ["neon", "style"], ["earthy", "style"], ["retro", "style"],
  ["web", "use"], ["print", "use"], ["brand", "use"],
].map(([name, category], i) => ({ id: `t${i}`, name, category }));
const isApi = (url) => !/\/(@fs|@id|@vite|node_modules|src)\//.test(url.pathname) && !/\.\w+$/.test(url.pathname);
export async function mockApi(page, opt = {}) {
  const log = opt.log ?? [];
  await page.route((u) => isApi(u) && /(^|\/)palettes(\/|$)/.test(u.pathname), async (route) => {
    const req = route.request(); const m = req.method(); const p = new URL(req.url()).pathname;
    log.push(`${m} ${p}`);
    if (m === "POST" && /\/flag$/.test(p)) {
      await new Promise((r) => setTimeout(r, opt.flagDelay ?? 400));
      return route.fulfill({ status: opt.flagStatus ?? 200, contentType: "application/json", body: JSON.stringify(opt.flagStatus >= 400 ? { type: "x", title: "Probe failure", status: opt.flagStatus } : { ok: true }) }).catch(() => {});
    }
    if (m === "PATCH") {
      const slug = decodeURIComponent(p.split("/").pop()); const body = JSON.parse(req.postData() || "{}");
      const base = PALETTES.find((x) => x.slug === slug) ?? PALETTES[0];
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ...base, ...body }) });
    }
    if (m === "GET" && /palettes$/.test(p)) {
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: opt.palettes ?? PALETTES, nextCursor: null, hasMore: false }) });
    }
    return route.fallback();
  });
  if (!opt.liveTags) await page.route((u) => isApi(u) && /\/colors\/tags$/.test(u.pathname), async (route) => {
    log.push("GET /colors/tags");
    if (opt.tagsDelay) await new Promise((r) => setTimeout(r, opt.tagsDelay));
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) }).catch(() => {});
  });
  return log;
}
export async function withBrowser(fn, launch = {}) {
  const browser = await chromium.launch(launch);
  try { return await fn(browser); } finally { await browser.close(); }
}
export async function cell(browser, ctxOpt, fn) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...ctxOpt });
  await ctx.addInitScript((o) => { try { localStorage.setItem("palette-user-slug", o); } catch {} }, OWNER);
  try { const page = await ctx.newPage(); return await fn(page, ctx); } finally { await ctx.close(); }
}
export async function gotoBrowse(page) {
  await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
  await page.getByRole("article").first().waitFor({ timeout: 15000 });
  await page.waitForTimeout(600);
}
export async function cardMenu(page, n) {
  const card = page.getByRole("article", { name: `Palette: Probe Palette ${n}` });
  await card.getByRole("button", { name: "Palette menu" }).click();
  await page.getByRole("menu").waitFor();
}
export const EV = new URL("../../evidence/B11-browse-search-dialogs/", import.meta.url).pathname;

// --- pixel + colour helpers (PNG decoded in-page; no node image dependency) ---
export async function pixels(page, buf, rect) {
  // returns {w,h,data:number[]} RGBA of the screenshot region (device pixels)
  return page.evaluate(async ({ b64, rect }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const r = rect ?? { x: 0, y: 0, w: img.width, h: img.height };
    return { w: r.w, h: r.h, data: Array.from(x.getImageData(r.x, r.y, r.w, r.h).data) };
  }, { b64: buf.toString("base64"), rect });
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
export const oklabL = ([r, g, b]) => {
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
};
export const rgbOf = (css) => (css.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
export const desc = () => {
  const e = document.activeElement;
  if (!e || e === document.body) return "BODY";
  return `${e.tagName.toLowerCase()}${e.getAttribute("role") ? "[role=" + e.getAttribute("role") + "]" : ""}"${(e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 40)}"`;
};
