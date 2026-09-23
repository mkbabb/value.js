// read-only probe: 390 — does the toast occlude the dock's controls, and how does a real stack lay out on mobile?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const theme of ["light", "dark"]) {
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => { Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new DOMException("denied", "NotAllowedError")) }, configurable: true }); });
const p = await ctx.newPage();
await p.route("**/api/sessions", (r) => r.request().method() !== "POST" ? r.continue() : r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ user_slug: "jasper-newt-of-rampant", token: "t", session_id: "a" }) }));
await p.route("**/api/admin/verify", (r) => r.fulfill({ status: 403, contentType: "application/problem+json", body: JSON.stringify({ title: "Forbidden", status: 403 }) }));
await p.goto("http://localhost:3100/gallery?admin=bad", { waitUntil: "domcontentloaded" });
await p.waitForSelector("[data-slot=toast]"); await p.waitForTimeout(600);
const occl = await p.evaluate(() => [...document.querySelectorAll(".app-dock button, .app-dock a, [role=tablist] [role=tab]")].map((e) => { const r = e.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
  return (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 16)) + " -> " + (e.contains(hit) ? "REACHABLE" : "BLOCKED by " + (hit?.closest("[data-slot=toast]") ? "toast" : hit?.tagName)); }));
console.log(theme, "occlusion", JSON.stringify(occl));
const t0 = Date.now();
const loginBtn = p.getByRole("button", { name: "Log in", exact: true });
try { await loginBtn.click({ timeout: 1500 }); console.log("login click ok", Date.now() - t0); } catch (e) { console.log("login click BLOCKED within 1.5s:", e.message.split("\n").find((l) => /intercepts|obscur|toast/i.test(l)) || e.message.slice(0, 120)); }
// fire a real stack by dispatching clicks directly (bypassing occlusion) — generate, copy-fail, logout
await p.evaluate(() => document.querySelector('[aria-label="Log in"]')?.click()); await p.waitForTimeout(250);
await p.evaluate(() => document.querySelector('[aria-label="Generate a new slug"]')?.click()); await p.waitForTimeout(400);
await p.evaluate(() => document.querySelector('[aria-label="Copy your slug"]')?.click()); await p.waitForTimeout(300);
await p.evaluate(() => document.querySelector('[aria-label="Log out"]')?.click()); await p.waitForTimeout(700);
await p.screenshot({ path: `${OUT}m-${theme}-3c-stacked-real.png` });
console.log(theme, "stack", JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("[data-slot=toast]")].map((t) => { const r = t.getBoundingClientRect(); return [t.dataset.tone, Math.round(r.y), Math.round(r.height), t.textContent.trim().slice(0, 40)]; }))));
await ctx.close(); }
await b.close();
