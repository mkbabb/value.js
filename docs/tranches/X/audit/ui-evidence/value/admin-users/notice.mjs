// Supplemental: the mutation-failure notice + the 390 toolbar wrap, on a MOCKED
// roster whose slugs do not exist on the server; every non-GET admin request is
// aborted in the browser (blockedbyclient) — nothing reaches the API.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const BASE = "http://localhost:9000";
const repo = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const USERS = [
  { slug: "audit-mock-quiet-ember-fox-zz01", createdAt: "2026-09-20T00:00:00Z", paletteCount: 2 },
  { slug: "audit-mock-empty-owl-zz02", createdAt: "2026-09-19T00:00:00Z", paletteCount: 0 },
];
const res = { sha, dirty, runs: {} };
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const [tag, w, h, theme] of [["1440", 1440, 900, "light"], ["390", 390, 844, "dark"]]) {
  const key = `${tag}-${theme}`; const r = (res.runs[key] = { blocked: [], errors: [] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: w < 500 ? 2 : 1 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("palette-admin-token", "dev"); } catch {} }, theme);
  await ctx.route(/localhost:3000\/admin\//, (route) => {
    const m = route.request().method();
    if (m === "GET" || m === "OPTIONS") return route.fallback();
    r.blocked.push(`${m} ${route.request().url()}`);
    return route.abort("blockedbyclient");
  });
  await ctx.route(/localhost:3000\/admin\/users\?/, (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: USERS.length }) }));
  try {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/admin/users`, { waitUntil: "commit", timeout: 180000 });
    await page.waitForSelector("[data-admin-notice='users'] ~ div, [data-admin-notice='users']", { timeout: 180000 });
    await page.waitForTimeout(2500);
    await page.getByRole("button", { name: /^Delete user audit-mock-empty-owl-zz02/ }).click();
    await page.waitForTimeout(800);
    await page.locator("[role=dialog] button", { hasText: "Delete user" }).click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, `${key}-19-mutation-error-notice.png`) });
    r.notice = await page.evaluate(() => { const n = document.querySelector("[data-admin-notice='users'] [role=status]"); if (!n) return null; const b = n.getBoundingClientRect(); const s = getComputedStyle(n); return { text: n.textContent.trim(), w: Math.round(b.width), h: Math.round(b.height), radius: s.borderRadius, bg: s.backgroundColor, font: s.fontFamily.slice(0, 40) }; });
  } catch (e) { r.errors.push(String(e).slice(0, 300)); }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(OUT, "meta-notice.json"), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
