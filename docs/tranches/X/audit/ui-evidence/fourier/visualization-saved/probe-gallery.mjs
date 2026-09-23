// Probe: gallery card (stubbed list over real assets) -> modal -> "open in visualizer"; is a View Transition opened? where does it land?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = "http://localhost:3100"; const OUT = new URL(".", import.meta.url).pathname;
const IMG = "sheer-waiting-salmon-dolphin", CH = "55b81b1cdcc15ece3d5ace50c4657ed2f06a69d38af619a61bc956dd68192a65", VSLUG = "amber-quiet-river-fox";
const now = new Date().toISOString();
const VIZ = { slug: VSLUG, owner_slug: "calm-bright-owl-lake", visibility: "public", content_hash: "x", image_slug: IMG, contour_hash: CH, active_bases: ["fourier-epicycles"], n_harmonics: 37, set_hash: "y", fork_of: null, fork_count: 0, version_count: 1, title: "Golden retriever", tags: [], views: 12, likes: 3, tier: process.env.TIER || "featured", pinned: false, created_at: now, updated_at: now, deleted_at: null };
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const log = [];
for (const [vp, size] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`;
  const ctx = await b.newContext({ viewport: size, deviceScaleFactor: 2, colorScheme: theme, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} window.__vt = 0; const o = document.startViewTransition?.bind(document); if (o) document.startViewTransition = (cb) => { window.__vt++; return o(cb); }; }, theme);
  await ctx.route("**/api/**", async (r) => { const u = r.request().url().replace(BASE, "");
    if (/\/api\/visualizations(\?|$)/.test(u)) { log.push(`${tag} STUB-LIST ${u}`); return r.fulfill({ json: { items: [VIZ], next_cursor: null, has_more: false } }); }
    if (u.startsWith(`/api/visualizations/${VSLUG}`)) { log.push(`${tag} STUB-GET ${u}`); return r.fulfill({ json: VIZ, headers: { etag: '"s1"' } }); }
    return r.continue().catch(() => {}); });
  const p = await ctx.newPage(); p.on("pageerror", (e) => log.push(`${tag} pageerror ${e.message.slice(0, 120)}`));
  await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(4000);
  await p.screenshot({ path: `${OUT}${tag}-D1${process.env.TIER ? "n" : "b"}-gallery-card.png` });
  const info = await p.evaluate(() => [...document.querySelectorAll("[role=button],button,a")].filter(e => /Open |sheer/.test(e.getAttribute("aria-label") || "")).map(e => e.getAttribute("aria-label")));
  log.push(`${tag} cards ${JSON.stringify(info)}`);
  const card = p.locator(`[aria-label="Open ${IMG}"]`).first();
  if (await card.count()) { await card.click(); await p.waitForTimeout(1200); await p.screenshot({ path: `${OUT}${tag}-D2${process.env.TIER ? "n" : "b"}-card-modal.png` });
    const cta = p.locator(".callout-btn").first();
    if (await cta.count()) { await cta.click(); await p.waitForTimeout(120); await p.screenshot({ path: `${OUT}${tag}-D3${process.env.TIER ? "n" : "b"}-open-120ms.png` }); await p.waitForTimeout(5000); await p.screenshot({ path: `${OUT}${tag}-D4${process.env.TIER ? "n" : "b"}-open-settled.png` });
      log.push(`${tag} landed ${await p.evaluate(() => location.pathname + " vt=" + window.__vt)}`); } else log.push(`${tag} no cta`);
  }
  await ctx.close();
}
await b.close(); console.log(log.join("\n"));
