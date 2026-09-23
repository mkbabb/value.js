// OA-36 probe: seat focus ring, row overflow at 390, verdict race (read-only; API routed at the network boundary)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const VJ = "/Users/mkbabb/Programming/value.js";
const head = execSync(`git -C ${VJ} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${VJ} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const now = new Date().toISOString();
const OWNED = { slug: "owned-one", name: "Owned One", colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }, { css: "#facc15", position: 2 }], userSlug: "test-user", voteCount: 3, voted: false, isLocal: false, visibility: "public", tags: ["warm"], versionCount: 2, currentHash: "h2", createdAt: now, updatedAt: now };
const isApi = (u) => { const url = new URL(u); if (/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname)) return false; if (/\.(ts|js|mjs|vue|css|svg|png|woff2|glsl|json)$/.test(url.pathname)) return false; return url.port === "3000" || /(^|\/)(palettes|sessions|colors|users|api)(\/|$)/.test(url.pathname); };
const browser = await chromium.launch({ headless: false });
const res = { head, dirty };
for (const vp of [{ width: 390, height: 844, tag: "390" }, { width: 1440, height: 900, tag: "1440" }]) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: "light", deviceScaleFactor: 2, hasTouch: vp.width === 390 });
  await ctx.addInitScript(() => { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("palette-user-slug", "test-user"); localStorage.setItem("palette-user-token", "test-user-token"); sessionStorage.setItem("palette-session-token", "test-user-token"); });
  const page = await ctx.newPage(); page.setDefaultTimeout(6000); page.setDefaultNavigationTimeout(60000);
  await page.route(isApi, (route) => { const u = new URL(route.request().url()); const m = route.request().method();
    if (/sessions/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "test-user-token", userSlug: "test-user", slug: "test-user" }) });
    if (/palettes\/?$/.test(u.pathname) && m === "GET") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [OWNED], total: 1, limit: 50, offset: 0 }) });
    if (/palettes\/owned-one/.test(u.pathname) && m !== "GET") return new Promise((r) => setTimeout(r, 150)).then(() => route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Server exploded", status: 500 }) }));
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) }); });
  await page.goto("http://localhost:9000/#/browse"); await page.waitForTimeout(4000);
  const card = page.getByRole("article", { name: "Palette: Owned One" });
  await card.getByText("Owned One", { exact: true }).first().click(); await page.waitForTimeout(1000);
  const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await page.waitForTimeout(900); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${OUT}probe-${vp.tag}-pre-toggle.png` }); await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(1500);
  const r = {};
  r.row = await page.evaluate(() => { const row = document.querySelector('[data-testid="scene-action-row"]'); const dock = document.querySelector(".glass-dock"); const sc = [...document.querySelectorAll(".glass-dock *")].filter((e) => e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX !== "visible").map((e) => ({ cls: e.className.toString().slice(0, 60), sw: e.scrollWidth, cw: e.clientWidth, ox: getComputedStyle(e).overflowX })); const seats = [...document.querySelectorAll("[data-scene-action] button")].map((b) => { const q = b.getBoundingClientRect(); return { l: b.getAttribute("aria-label"), x: Math.round(q.x), w: Math.round(q.width), h: Math.round(q.height), visible: q.x >= (dock.getBoundingClientRect().x) && q.right <= dock.getBoundingClientRect().right }; }); const back = [...document.querySelectorAll("button")].find((b) => b.getAttribute("aria-label") === "Back"); const br = back ? back.getBoundingClientRect() : {}; const fs = document.querySelector("[data-scene-action] button"); return { nSeats: document.querySelectorAll("[data-scene-action]").length, dock: dock.getBoundingClientRect().toJSON(), rowW: row?.getBoundingClientRect().width, scrollers: sc, seats, back: back ? { x: br.x, w: br.width, h: br.height, cls: back.className.slice(0, 80), radius: getComputedStyle(back).borderRadius } : null, seatCls: fs?.className, seatRadius: fs ? getComputedStyle(fs).borderRadius : null }; });
  await page.screenshot({ path: `${OUT}probe-${vp.tag}-row.png` });
  // keyboard: focus the first seat
  await page.locator(".glass-dock button").first().focus(); await page.keyboard.press("Tab"); await page.waitForTimeout(600);
  r.focused = await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { l: a.getAttribute("aria-label"), outline: cs.outlineStyle + " " + cs.outlineWidth, shadow: cs.boxShadow.slice(0, 120) }; });
  await page.screenshot({ path: `${OUT}probe-${vp.tag}-seat-focus.png`, clip: { x: 0, y: 0, width: vp.width, height: 200 } });
  // verdict race: vote then visibility 1.0s later
  await page.locator('[data-scene-action="palette.vote"] button').click({ force: true });
  const t0 = Date.now(); const seen = [];
  let clicked = false;
  while (Date.now() - t0 < 5000) { const s = await page.getByRole("status").allTextContents(); seen.push([Date.now() - t0, s.filter((x) => /failed/i.test(x)).join("|")]); if (!clicked && Date.now() - t0 > 1000) { await page.locator('[data-scene-action="palette.visibility"] button').click({ force: true }); clicked = true; seen.push([Date.now() - t0, "CLICK visibility"]); } await page.waitForTimeout(150); }
  r.race = seen.filter((x, i, a) => i === 0 || x[1] !== a[i - 1][1]);
  res[vp.tag] = r;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(res, null, 1));
import("node:fs").then((fs) => fs.writeFileSync(`${OUT}probe-log.json`, JSON.stringify(res, null, 1)));
