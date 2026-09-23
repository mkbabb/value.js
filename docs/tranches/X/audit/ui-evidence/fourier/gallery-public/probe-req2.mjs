// read-only: stub ITEMS-shaped list, log errors, DOM counts over time
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const E = { slug: "amber-fox-spiral-one-0", owner_slug: "amber-fox-12", visibility: "public", content_hash: "c0ffee00", image_slug: "img-a-0", contour_hash: "deadbeef", active_bases: ["fourier-epicycles"], n_harmonics: 64, set_hash: "x", fork_of: null, fork_of_hash: null, fork_count: 0, version_count: 1, title: "A", description: null, tags: [], palette_slug: null, views: 12, likes: 3, tier: "normal", pinned: false, created_at: "2026-09-01T10:00:00Z", updated_at: "2026-09-01T10:00:00Z", deleted_at: null };
await p.route("**/api/visualizations**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items: [E, { ...E, slug: "b", image_slug: "img-b", tier: "featured" }], next_cursor: null, has_more: false }) }));
p.on("pageerror", (e) => console.log("PAGEERR", e.message)); p.on("console", (m) => { if (["error", "warning"].includes(m.type())) console.log("CONSOLE", m.text().slice(0, 300)); });
p.on("request", (r) => { if (r.url().includes("/api/")) console.log("REQ", r.url()); });
await p.goto("http://localhost:3100/gallery", { waitUntil: "networkidle" });
for (const t of [500, 2000, 5000]) { await p.waitForTimeout(t); console.log(t, await p.evaluate(() => ({ cards: document.querySelectorAll(".gallery-card").length, spin: !!document.querySelector(".animate-spin"), loaded: [...document.querySelectorAll("p")].map((x) => x.textContent.trim()).filter((s) => /loaded|No /.test(s)) }))); }
await b.close();
