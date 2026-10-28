// SS-8 B16-palette-dialogs — shared probe helpers. Headless Playwright Chromium (default shell).
// One browser per run; a new context per cell; everything closed in finally by the caller.
import { chromium, webkit } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
export { chromium, webkit };
export const APP = "http://localhost:9000/";
export const EV = "/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/evidence/B16-palette-dialogs/";
mkdirSync(EV, { recursive: true });
export const save = (name, obj) => writeFileSync(EV + name, JSON.stringify(obj, null, 1));

const NOW = "2026-10-01T00:00:00.000Z";
export const OWNER = "brave-quiet-amber-fox";
export function wallPalette(over = {}) {
  return {
    name: "Harbor dusk", slug: "harbor-dusk-ss8", userSlug: OWNER,
    colors: [{ css: "#1e3a8a", position: 0 }, { css: "#38bdf8", position: 1 }, { css: "#fde68a", position: 2 }, { css: "#e11d48", position: 3 }],
    createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 3, visibility: "public", tier: "standard",
    published: true, versionCount: 3, currentHash: "payload-3", ...over,
  };
}
export function versions(slug = "harbor-dusk-ss8", n = 3) {
  return Array.from({ length: n }, (_, i) => {
    const r = n - i;
    return { hash: `rel-${r}`, payloadHash: `payload-${r}`, revisionNo: r, name: r === 1 ? "Harbor dawn" : "Harbor dusk",
      colors: [{ css: `oklch(0.${4 + r} 0.12 ${60 * r})`, position: 0 }, { css: "#38bdf8", position: 1 }, { css: "#fde68a", position: 2 }],
      parentHash: r > 1 ? `rel-${r - 1}` : null, forkedFromHash: null, authorSlug: OWNER, paletteSlug: slug,
      createdAt: new Date(Date.parse(NOW) - i * 3600e3).toISOString() };
  });
}

const isApi = (u) => {
  const url = new URL(u);
  if (url.hostname === "localhost" && url.port === "9000") return false;
  return url.port === "3000" || url.pathname.startsWith("/api/");
};

/** Mock the palette API: the wall, versions (with optional per-slug delay), sessions. */
export async function mockApi(ctx, { wall = [wallPalette()], versionDelay = {}, versionsFor = {}, log = [] } = {}) {
  await ctx.route((u) => isApi(u.href), async (route) => {
    const url = new URL(route.request().url());
    const p = url.pathname.replace(/^\/api/, "");
    log.push({ t: Date.now(), m: route.request().method(), p: p + url.search });
    const json = (body, status = 200) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
    let m;
    if ((m = p.match(/^\/palettes\/([^/]+)\/versions$/))) {
      const slug = decodeURIComponent(m[1]);
      const d = versionDelay[slug] ?? 0;
      if (d) await new Promise((r) => setTimeout(r, d));
      const data = versionsFor[slug] ?? versions(slug);
      return json({ data, total: data.length, limit: 20, offset: 0 }).catch(() => {});
    }
    if (p === "/palettes" || p === "/palettes/") return json({ data: wall, nextCursor: null, hasMore: false });
    if ((m = p.match(/^\/palettes\/([^/]+)$/))) { const w = wall.find((x) => x.slug === decodeURIComponent(m[1])); return w ? json(w) : json({ error: "not found" }, 404); }
    if (p === "/" || p === "") return json({ status: "ok", service: "palette-api" });
    if (p.startsWith("/tags")) return json({ data: [] });
    if (p.startsWith("/sessions")) return json({ slug: OWNER, userSlug: OWNER });
    // No write ever reaches the shared dev API: every non-GET is answered here.
    if (route.request().method() !== "GET") return json({ ok: true });
    return route.continue();
  });
}

export async function newCell(browser, { w = 1440, h = 900, scheme = "light", mobile = false, hasTouch = false, reducedMotion = "no-preference", forcedColors = "none", seed = null, slug = OWNER } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, isMobile: mobile, hasTouch, reducedMotion, forcedColors, deviceScaleFactor: 1 });
  await ctx.addInitScript(([t, s, sl]) => { try {
    localStorage.setItem("vueuse-color-scheme", t);
    if (sl) localStorage.setItem("palette-user-slug", sl); else localStorage.removeItem("palette-user-slug");
    if (s && !sessionStorage.getItem("ss8-seeded")) { localStorage.setItem("color-palettes", s); sessionStorage.setItem("ss8-seeded", "1"); }
  } catch {} }, [scheme, seed, slug]);
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 300)); });
  page.on("pageerror", (e) => errs.push("pageerror: " + (e.stack || e.message).slice(0, 600)));
  return { ctx, page, errs };
}

export async function gotoPalettes(page) {
  await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);
}
