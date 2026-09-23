// Probe: logged OUT but IndexedDB holds drafts (drafts are browser-local, draftStorage.ts:97) — what does the Drafts tab show?
// Also: publish from logged-out (ensureUser -> register POST, stubbed). No backend writes: every non-GET /api stubbed.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = "http://localhost:3100"; const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const page = await ctx.newPage(); const posts = [];
await page.route("**/api/**", (r) => { const q = r.request(); if (q.method() === "GET") return r.continue(); posts.push(q.method() + " " + new URL(q.url()).pathname);
  r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ slug: "published-stub-1", user_slug: "anon-1", token: "t" }) }); });
await page.goto(BASE + "/gallery", { waitUntil: "domcontentloaded" });
await page.evaluate(() => new Promise((res) => { const r = indexedDB.open("fourier-drafts", 2);
  r.onupgradeneeded = () => { const s = r.result.createObjectStore("drafts", { keyPath: "imageSlug" }); s.createIndex("by-visualization-slug", "visualizationSlug", { unique: false }); };
  r.onsuccess = () => { const tx = r.result.transaction("drafts", "readwrite"); tx.objectStore("drafts").put({ imageSlug: "img-amber-fox-spiral", contour: { contour_hash: "d" }, contourSettings: { n_harmonics: 64 }, animationSettings: { active_bases: [] }, savedSnapshots: [], lastOpenedAt: new Date().toISOString() }); tx.oncomplete = () => { r.result.close(); res(); }; }; }));
await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(1500);
await page.getByRole("tab", { name: "Drafts" }).click(); await page.waitForTimeout(800);
await page.screenshot({ path: OUT + "d-light-5-loggedout-with-local-drafts.png" });
const rows = await page.locator(".draft-item").count();
const loginText = await page.locator("text=Log in").count();
writeFileSync(OUT + "probe-loggedout.json", JSON.stringify({ rows, loginVisible: loginText, posts }, null, 1));
await browser.close(); console.log(rows, loginText, posts);
