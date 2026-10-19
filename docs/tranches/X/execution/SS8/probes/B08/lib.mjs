// SS-8 B08 shared probe helpers. One browser per run (caller), one context per cell.
export const O = "http://localhost:9000";
export const API = /localhost:3000/;
export const EV = new URL("../../evidence/B08-shared-feedback/", import.meta.url).pathname;

const now = new Date().toISOString();
export const mkPal = (name, colors) => ({
  name, slug: name.toLowerCase().replace(/\s+/g, "-"), userSlug: "ss8-probe",
  colors: colors.map((css, position) => ({ css, position })),
  createdAt: now, updatedAt: now, isLocal: false, visibility: "public", published: true, voteCount: 0, tags: [],
});
export const FIXTURE = [mkPal("Audit Alpha", ["#e11d48", "#0ea5e9", "#22c55e"]), mkPal("Audit Beta", ["#f59e0b", "#8b5cf6", "#14b8a6"])];

/** Route the API: mode "abort" | "hang" | "mock" (palettes fixture) | "pass". Returns a counter. */
export async function routeApi(ctx, getMode) {
  const hits = [];
  await ctx.route(API, async (route) => {
    const u = route.request().url();
    const mode = getMode(u);
    hits.push({ t: Date.now(), mode, url: u.replace(/\?.*$/, "") });
    if (mode === "abort") return route.abort();
    if (mode === "hang") return; // never settles
    if (mode === "mock" && /\/palettes(\?|$)/.test(u)) {
      const q = new URL(u).searchParams.get("q");
      const data = FIXTURE.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()));
      return route.fulfill({ json: { data, nextCursor: null, hasMore: false } });
    }
    return route.continue();
  });
  return hits;
}

/** In-page helpers installed as window.__ss8. */
export const PAGE_HELPERS = () => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  const rgba = (css) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const over = (top, bot) => { const a = top[3]; return [0, 1, 2].map((i) => top[i] * a + bot[i] * (1 - a)).concat(1); };
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(3); };
  /** Composite the background stack under el (specified colours; images/blur noted, not painted). */
  const ground = (el) => {
    const stack = []; const notes = [];
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const s = getComputedStyle(n);
      const c = rgba(s.backgroundColor);
      if (s.backgroundImage !== "none") notes.push(n.className.toString().slice(0, 40) + ":bgimg");
      if (s.backdropFilter && s.backdropFilter !== "none") notes.push(n.className.toString().slice(0, 40) + ":backdrop");
      if (c[3] > 0) { stack.push({ c, who: (n.className.toString() || n.tagName).slice(0, 50) }); if (c[3] >= 0.999) break; }
    }
    let g = [255, 255, 255, 1];
    if (!stack.length || stack[stack.length - 1].c[3] < 0.999) g = rgba(getComputedStyle(document.documentElement).backgroundColor || "#fff");
    for (let i = stack.length - 1; i >= 0; i--) g = over(stack[i].c, g);
    return { g: g.map((v) => Math.round(v)), stack: stack.map((x) => x.who + "=" + x.c.map((v) => +v.toFixed(2)).join(",")), notes };
  };
  const ink = (el, prop = "color") => { const gr = ground(el); const c = rgba(getComputedStyle(el)[prop]); const op = +getComputedStyle(el).opacity; const eff = over([c[0], c[1], c[2], c[3] * op], gr.g); return { raw: c.map((v, i) => (i < 3 ? v : +(v * op).toFixed(3))), rect: (() => { const r = el.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; })(), ink: getComputedStyle(el)[prop], eff: eff.map(Math.round), ground: gr.g, cr: cr(eff, gr.g), stack: gr.stack, notes: gr.notes }; };
  const oklch = (css) => { const el = document.createElement("div"); el.style.color = `oklch(from ${css} l c h)`; document.body.append(el); const v = getComputedStyle(el).color; el.remove(); return v; };
  /** Walk the Vue tree from the app root, collecting instances by type name. */
  const findInstances = (name) => {
    const root = document.querySelector("#app").__vue_app__._instance; const out = [];
    const walk = (vn) => { if (!vn) return; if (vn.component) { const i = vn.component; if ((i.type.__name || i.type.name) === name) out.push(i); walk(i.subTree); }
      if (Array.isArray(vn.children)) vn.children.forEach((c) => c && typeof c === "object" && walk(c));
      if (vn.suspense) walk(vn.suspense.activeBranch); };
    walk(root.subTree); return out;
  };
  window.__ss8 = { rgba, over, lum, cr, ground, ink, oklch, findInstances };
};

export async function newCell(browser, { w = 1440, h = 900, scheme = "light", forced, init, reducedMotion } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, forcedColors: forced ?? "none", reducedMotion: reducedMotion ?? "no-preference" });
  ctx.setDefaultNavigationTimeout(120000); ctx.setDefaultTimeout(60000); // the dev server is shared and slow under machine load
  await ctx.addInitScript(PAGE_HELPERS);
  if (init) await ctx.addInitScript(init.fn, init.arg);
  return ctx;
}
export const settle = (page, ms = 3500) => page.waitForTimeout(ms);

/** Mean sRGB of a served-pixel patch (the honest ground: glass, blur and atmosphere included). */
export async function pixelMean(page, clip) {
  const buf = await page.screenshot({ clip: { x: Math.max(0, clip.x), y: Math.max(0, clip.y), width: Math.max(1, clip.width), height: Math.max(1, clip.height) } });
  return page.evaluate(async (b64) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let r = 0, g = 0, b = 0; const n = d.length / 4; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; } return [r / n, g / n, b / n].map(Math.round); }, buf.toString("base64"));
}
const lumN = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
export const crN = (a, b) => { const [x, y] = [lumN(a), lumN(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
export const overN = (top, bot) => [0, 1, 2].map((i) => Math.round(top[i] * top[3] + bot[i] * (1 - top[3])));
/** Served contrast: ink (specified rgba, opacity folded) over a pixel-sampled ground patch. */
export const servedCr = (raw, px) => ({ ground: px, ink: overN(raw, px), cr: crN(overN(raw, px), px) });
