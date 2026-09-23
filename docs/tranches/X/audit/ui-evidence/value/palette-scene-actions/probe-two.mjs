// OA-36 probe: two panes, two selected cards -> which entity does the dock bind? (read-only; API routed)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const VJ = "/Users/mkbabb/Programming/value.js";
const head = execSync(`git -C ${VJ} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${VJ} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const now = new Date().toISOString();
const STORE = { version: 1, palettes: [{ id: "saved-1", name: "Sunset Harbor", slug: "sunset-harbor", colors: ["#f97316", "#e11d48", "#7c3aed"].map((css, i) => ({ css, position: i })), createdAt: now, updatedAt: now, isLocal: true }] };
const OWNED = { slug: "owned-one", name: "Owned One", colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }], userSlug: "test-user", voteCount: 3, voted: false, isLocal: false, visibility: "public", tags: [], versionCount: 2, createdAt: now, updatedAt: now };
const isApi = (u) => { const url = new URL(u); if (/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname)) return false; if (/\.(ts|js|mjs|vue|css|svg|png|woff2|glsl|json)$/.test(url.pathname)) return false; return url.port === "3000" || /(^|\/)(palettes|sessions|colors|users|api)(\/|$)/.test(url.pathname); };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await ctx.addInitScript((store) => { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("color-palettes", JSON.stringify(store)); localStorage.setItem("palette-user-slug", "test-user"); localStorage.setItem("palette-user-token", "test-user-token"); sessionStorage.setItem("palette-session-token", "test-user-token"); }, STORE);
const page = await ctx.newPage(); page.setDefaultTimeout(6000); page.setDefaultNavigationTimeout(60000);
await page.route(isApi, (route) => { const u = new URL(route.request().url()); const m = route.request().method();
  if (/sessions/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "test-user-token", userSlug: "test-user", slug: "test-user" }) });
  if (/palettes\/?$/.test(u.pathname) && m === "GET") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [OWNED], total: 1, limit: 50, offset: 0 }) });
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) }); });
await page.goto("http://localhost:9000/#/browse"); await page.waitForTimeout(4000);
const label = () => page.evaluate(() => [...document.querySelectorAll("button")].find((b) => b.getAttribute("aria-label") === "Toggle action bar")?.textContent?.trim());
const r = { head, dirty };
await page.getByRole("article", { name: "Palette: Owned One" }).getByText("Owned One", { exact: true }).first().click(); await page.waitForTimeout(900);
const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await page.waitForTimeout(900); }
r.afterFirst = await label();
await page.getByRole("article", { name: "Palette: Sunset Harbor" }).getByText("Sunset Harbor", { exact: true }).first().click(); await page.waitForTimeout(1200);
if (await c.count()) { await c.first().click(); await page.waitForTimeout(900); }
r.afterSecond = await label();
r.selectedCards = await page.locator(".palette-card[data-selected]").count();
await page.mouse.move(10, 880); await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}probe-two-selected-1440.png` });
await page.getByRole("article", { name: "Palette: Sunset Harbor" }).getByText("Sunset Harbor", { exact: true }).first().click(); await page.waitForTimeout(1200);
if (await c.count()) { await c.first().click(); await page.waitForTimeout(900); }
r.afterDeselectSecond = await label();
await page.mouse.move(10, 880); await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}probe-two-after-deselect-1440.png` });
await browser.close();
writeFileSync(`${OUT}probe-two-log.json`, JSON.stringify(r, null, 1)); console.log(JSON.stringify(r));
