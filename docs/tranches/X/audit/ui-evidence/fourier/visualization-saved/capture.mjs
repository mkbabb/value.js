// UIA-F visualization-saved — headed Chromium, real GPU. READ-ONLY on the app:
// the saved entity is STUBBED (page.route fulfil) over REAL image + contour assets.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const IMG = "sheer-waiting-salmon-dolphin";
const CH = "55b81b1cdcc15ece3d5ace50c4657ed2f06a69d38af619a61bc956dd68192a65";
const VSLUG = "amber-quiet-river-fox";
const now = new Date().toISOString();
const VIZ = { slug: VSLUG, owner_slug: "calm-bright-owl-lake", visibility: "public", content_hash: "x", image_slug: IMG, contour_hash: CH,
  active_bases: ["fourier-epicycles", "chebyshev"], n_harmonics: 37, set_hash: "y", fork_of: null, fork_count: 0, version_count: 1,
  title: "Golden retriever", description: null, tags: [], views: 12, likes: 3, tier: "featured", pinned: false, created_at: now, updated_at: now,
  contour_settings: { n_harmonics: 37, n_points: 1024 }, animation_settings: { active_bases: ["fourier-epicycles", "chebyshev"], easing: "linear", speed: 1 } };
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const log = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, font: cs.fontSize + " " + cs.fontWeight, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 100) }; };
    const q = (s) => document.querySelector(s);
    const card = q(".cartoon-card");
    return { url: location.pathname, title: document.title, dark: document.documentElement.classList.contains("dark"),
      vtCalls: window.__vt ?? 0, vtNamed: [...document.querySelectorAll("*")].filter((e) => getComputedStyle(e).viewTransitionName !== "none").map((e) => getComputedStyle(e).viewTransitionName),
      spinner: box(q(".animate-spin")), spinnerText: q(".animate-spin")?.nextElementSibling?.textContent?.trim(),
      errCard: box(card), errTexts: card ? [...card.querySelectorAll("p")].map((p) => p.textContent.trim()) : null, errButton: box(card?.querySelector("button")),
      dropBtn: box(q(".drop-target-button")), stage: box(q(".canvas-stage")), canvas: box(q(".canvas-stage canvas")),
      savedIndicator: [...document.querySelectorAll("h1,h2,[data-testid],.viz-title")].map((e) => e.textContent.trim().slice(0, 40)).filter(Boolean).slice(0, 8),
      modal: box(q("[role=dialog]")), scrollW: document.documentElement.scrollWidth, vw: innerWidth };
  });
}
async function shot(page, name, wait = 0) { if (wait) await page.waitForTimeout(wait); await page.screenshot({ path: OUT + name + ".png" }); metrics[name] = await measure(page); }
async function ctxFor(vp, theme, tag) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {}
    window.__vt = 0; const o = document.startViewTransition?.bind(document); if (o) document.startViewTransition = (cb) => { window.__vt++; return o(cb); }; }, theme);
  await ctx.route("**/api/**", async (route) => {
    const u = route.request().url().replace(BASE, "");
    if (/\/api\/visualizations\?/.test(u) || /\/api\/visualizations$/.test(u)) { log.push(`${tag} STUB-LIST ${u}`); return route.fulfill({ json: { items: [VIZ], next_cursor: null, has_more: false } }); }
    if (u.startsWith(`/api/visualizations/${VSLUG}`)) { log.push(`${tag} STUB-GET ${u}`); return route.fulfill({ json: VIZ, headers: { etag: '"stub-1"' } }); }
    log.push(`${tag} ${route.request().method()} ${u}`); return route.continue().catch(() => {});
  });
  return ctx;
}
const push = (page, path) => page.evaluate((p) => document.querySelector("#app").__vue_app__.config.globalProperties.$router.push(p), path);

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`;
  let ctx = await ctxFor(vp, theme, tag); let page = await ctx.newPage();
  page.on("pageerror", (e) => log.push(`${tag} pageerror: ${e.message.slice(0, 160)}`));
  page.on("console", (m) => { if (m.type() === "error") log.push(`${tag} console: ${m.text().slice(0, 160)}`); });
  // A. cold deep-link to a saved visualization
  await page.goto(`${BASE}/v/${VSLUG}`, { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-A1-v-coldload`, 1500);
  await shot(page, `${tag}-A2-v-settled`, 5000);
  // A3. in-app: load /w/<img>, then push /v/<slug> (the documented /w/->/v/ morph)
  await page.goto(`${BASE}/w/${IMG}`, { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-A3-w-loaded`, 5000);
  await push(page, `/v/${VSLUG}`);
  await shot(page, `${tag}-A4-w-to-v-push`, 200);
  await shot(page, `${tag}-A5-w-to-v-settled`, 3000);
  // B. unknown slug (3-word -> 400) and valid-shape unknown (404)
  await page.goto(`${BASE}/v/does-not-exist`, { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-B1-v-does-not-exist`, 2500);
  await page.goto(`${BASE}/v/zzzz-nope-gone-lost`, { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-B2-v-valid-shape-404`, 2500);
  await ctx.close();
  // B3. fresh context: /v/does-not-exist with an empty store
  ctx = await ctxFor(vp, theme, tag + "-fresh"); page = await ctx.newPage();
  await page.goto(`${BASE}/v/does-not-exist`, { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-B3-v-unknown-fresh`, 2500);
  // C. /s/<slug> redirect
  await page.goto(`${BASE}/s/${IMG}`, { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-C1-s-redirect`, 4000);
  // D. gallery card -> modal -> open (the "view-transition from gallery card" path)
  await page.goto(`${BASE}/gallery`, { waitUntil: "networkidle" }).catch(() => {});
  await shot(page, `${tag}-D1-gallery`, 1500);
  const card = page.locator(`[aria-label="Open ${IMG}"]`).first();
  if (await card.count()) {
    await card.click().catch((e) => log.push(`${tag} card click ${e.message.slice(0, 80)}`));
    await shot(page, `${tag}-D2-card-modal`, 1200);
    const cta = page.locator(".callout-btn").first();
    if (await cta.count()) { await cta.click().catch(() => {}); await shot(page, `${tag}-D3-after-open-150ms`, 150); await shot(page, `${tag}-D4-after-open-settled`, 5000); }
    else log.push(`${tag} no CTA`);
  } else log.push(`${tag} no gallery card`);
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
writeFileSync(OUT + "log.txt", log.join("\n"));
await browser.close();
console.log("done", Object.keys(metrics).length);
