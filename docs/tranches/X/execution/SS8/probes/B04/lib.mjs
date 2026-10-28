// SS-8 B04 shared probe helpers. One browser per run; callers open one context per cell
// and close context + browser in finally. Nothing here launches a browser.
import { writeFileSync, mkdirSync } from "node:fs";

export const O = "http://localhost:9000";
export const API = "http://localhost:3000";
export const EV = new URL("../../evidence/B04-dock-profile-menus/", import.meta.url).pathname;
mkdirSync(EV, { recursive: true });

export function out(name, obj) {
  writeFileSync(EV + name, JSON.stringify(obj, null, 1));
  console.log(name, JSON.stringify(obj).slice(0, 600));
}

/** Seed storage before any page script: scheme + optional identity. */
export async function seed(ctx, { dark = false, slug, token, admin } = {}) {
  await ctx.addInitScript(({ dark, slug, token, admin }) => {
    try {
      localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
      if (slug) localStorage.setItem("palette-user-slug", slug);
      if (token) localStorage.setItem("palette-user-token", token);
      if (admin) localStorage.setItem("palette-admin-token", admin);
    } catch {}
  }, { dark, slug, token, admin: admin ?? null });
}

/** In-page helper kit: colour → sRGB via canvas, WCAG contrast, ground sampling. */
export async function kit(page) {
  await page.evaluate(() => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    const rgba = (css) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const cr = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    // computed colour with its alpha resolved: rgba via canvas of a 1px pixel painted over `ground`
    const over = (fg, ground) => { const a = fg[3]; return [0, 1, 2].map((i) => Math.round(fg[i] * a + ground[i] * (1 - a))); };
    const insts = (name) => { const acc = []; const seen = new Set();
      const walk = (v) => { if (!v || typeof v !== "object" || seen.has(v)) return; seen.add(v);
        if (v.component) { if (v.component.type.__name === name) acc.push(v.component); walk(v.component.subTree); }
        if (Array.isArray(v.children)) v.children.forEach(walk);
        if (v.suspense) walk(v.suspense.activeBranch); };
      walk(document.querySelector("#app").__vue_app__._instance.subTree); return acc; };
    window.__b04 = { rgba, lum, cr, over, insts };
  });
}

/** Screenshot the viewport with all text/glyph ink made transparent, decode it in-page,
 *  and return the median RGB under each rect (the composited GROUND behind the ink). */
export async function grounds(page, rects) {
  const h = await page.addStyleTag({ content: "*{color:transparent!important;-webkit-text-fill-color:transparent!important;caret-color:transparent!important;text-decoration-color:transparent!important} svg *{fill:transparent!important;stroke:transparent!important}" });
  await page.waitForTimeout(120);
  const png = (await page.screenshot({ animations: "disabled", caret: "hide" })).toString("base64");
  await h.evaluate((n) => n.remove());
  return page.evaluate(async ({ png, rects }) => {
    const img = new Image(); img.src = "data:image/png;base64," + png; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(img, 0, 0);
    const dpr = img.width / innerWidth;
    return rects.map((r) => {
      if (!r || r.width < 1 || r.height < 1) return null;
      const d = x.getImageData(Math.round(r.x * dpr), Math.round(r.y * dpr), Math.max(1, Math.round(r.width * dpr)), Math.max(1, Math.round(r.height * dpr))).data;
      const ch = [[], [], []];
      for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) ch[k].push(d[i + k]);
      return ch.map((a) => { a.sort((p, q) => p - q); return a[a.length >> 1]; });
    });
  }, { png, rects });
}

/** Contrast of each element's computed ink against the ground actually painted under it. */
export async function inkContrast(page, selectorOrHandles) {
  const els = await page.evaluate((sel) => {
    const list = typeof sel === "string" ? [...document.querySelectorAll(sel)] : [];
    return list.filter((e) => e.getClientRects().length && !e.closest("[inert]") && getComputedStyle(e).visibility !== "hidden").map((e, i) => {
      e.setAttribute("data-b04-ink", String(i));
      const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
      return { i, text: (e.innerText || e.getAttribute("aria-label") || "").trim().slice(0, 40), color: cs.color, fontSize: cs.fontSize, fontWeight: cs.fontWeight, opacity: cs.opacity, rect: { x: r.x, y: r.y, width: r.width, height: r.height } };
    });
  }, selectorOrHandles);
  const g = await grounds(page, els.map((e) => e.rect));
  return page.evaluate(({ els, g }) => els.map((e, k) => {
    if (!g[k]) return { ...e, ratio: null };
    const fg = window.__b04.rgba(e.color); const ink = window.__b04.over(fg, g[k]);
    return { ...e, ground: g[k], ink, ratio: +window.__b04.cr(ink, g[k]).toFixed(2) };
  }), { els, g });
}

export const rectOf = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }, sel);

export async function boot(page, hash = "#/", wait = 2500) {
  const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 240)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 240)); });
  await page.goto(O + "/" + hash, { waitUntil: "load" });
  await page.waitForSelector(".glass-dock, [class*=dock]", { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(wait);
  await kit(page);
  return errs;
}

/** Create a real user session on the live dev API (one per run). */
export async function realSession() {
  const r = await fetch(API + "/sessions", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
  return r.json();
}
