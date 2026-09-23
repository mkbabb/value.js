// X audit seat: tag-edit-popover. Headed Chromium, real GPU. READ-ONLY on the app.
// Usage: node capture.mjs [theme] [vp]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const URL0 = "http://localhost:9000/";
const VJ = "/Users/mkbabb/Programming/value.js";
const head = execSync(`git -C ${VJ} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${VJ} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const now = new Date().toISOString();
let OWNED = { slug: "owned-one", name: "Owned One", colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }, { css: "#facc15", position: 2 }], userSlug: "test-user", voteCount: 3, voted: false, isLocal: false, visibility: "public", tags: ["warm"], versionCount: 2, currentHash: "h2", createdAt: now, updatedAt: now };
const TAGS = [["warm","mood"],["cool","mood"],["pastel","style"],["neon","style"],["earthy","theme"],["ocean","theme"],["retro","era"],["minimal","style"],["autumn","season"],["vibrant","mood"]].map(([name, category]) => ({ name, category }));
const isApi = (u) => { const url = new URL(u); if (/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname)) return false; if (/\.(ts|js|mjs|vue|css|svg|png|woff2|glsl|json)$/.test(url.pathname)) return false; return url.port === "3000" || /(^|\/)(palettes|sessions|colors|users|api)(\/|$)/.test(url.pathname); };
const themes = process.argv[2] ? [process.argv[2]] : ["light", "dark"];
const vps = process.argv[3] ? [process.argv[3]] : ["1440", "390"];
const VP = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const frames = [];
async function shot(page, name, state, extra) { const p = `${OUT}${name}.png`; await page.waitForTimeout(450); await page.screenshot({ path: p }); frames.push({ file: name + ".png", state, head, dirty, ...(extra ? { extra } : {}) }); }
const popMetrics = (page) => page.evaluate(() => {
  const d = [...document.querySelectorAll('[role="dialog"]')].find((e) => /Tags/.test(e.textContent || ""));
  if (!d) return null; const r = d.getBoundingClientRect(); const cs = getComputedStyle(d);
  const cb = [...d.querySelectorAll('button[role="checkbox"]')].map((b) => { const c = getComputedStyle(b); const br = b.getBoundingClientRect(); return { state: b.getAttribute("data-state") ?? b.getAttribute("aria-checked"), radius: c.borderRadius, w: br.width, h: br.height }; });
  const rows = [...d.querySelectorAll("label")].map((l) => { const br = l.getBoundingClientRect(); return { h: br.height, radius: getComputedStyle(l).borderRadius, font: getComputedStyle(l).fontSize }; });
  const lbl = d.querySelector(".section-label"); const scroller = d.querySelector(".overflow-y-auto");
  return { box: { x: r.x, y: r.y, w: r.width, h: r.height }, radius: cs.borderRadius, bg: cs.backgroundColor, backdrop: cs.backdropFilter, cls: d.className.slice(0, 200), ariaLabel: d.getAttribute("aria-label"), labelledby: d.getAttribute("aria-labelledby"), label: lbl && { font: getComputedStyle(lbl).font, txt: lbl.textContent }, rows: rows.slice(0, 3), nRows: rows.length, cb: cb.slice(0, 4), scroll: scroller && { sh: scroller.scrollHeight, ch: scroller.clientHeight }, errText: d.querySelector('[role="alert"],[role="status"]')?.textContent ?? null, text: d.innerText.slice(0, 300), focus: document.activeElement?.outerHTML.slice(0, 140) };
});
const tagsOnCard = (page) => page.getByRole("article", { name: "Palette: Owned One" }).evaluate((a) => a.innerText.replace(/\s+/g, " ").slice(0, 200)).catch(() => null);
for (const theme of themes) for (const vp of vps) {
  const tag = `${vp}-${theme}`;
  OWNED = { ...OWNED, tags: ["warm"] };
  const ctx = await browser.newContext({ viewport: VP[vp], colorScheme: theme, deviceScaleFactor: vp === "390" ? 2 : 1 });
  await ctx.addInitScript(({ theme }) => { localStorage.setItem("vueuse-color-scheme", theme); localStorage.setItem("palette-user-slug", "test-user"); localStorage.setItem("palette-user-token", "test-user-token"); sessionStorage.setItem("palette-session-token", "test-user-token"); }, { theme });
  const page = await ctx.newPage(); page.setDefaultTimeout(6000); page.setDefaultNavigationTimeout(60000);
  const consoleErr = []; page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleErr.push(m.text().slice(0, 200)); }); page.on("pageerror", (e) => consoleErr.push("PAGEERROR " + e.message.slice(0, 200)));
  let tagsMode = "ok"; let patchMode = "ok"; const patches = [];
  await page.route(isApi, async (route) => {
    const u = new URL(route.request().url()); const m = route.request().method();
    if (/sessions\/me/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ userSlug: "test-user", slug: "test-user" }) });
    if (/sessions/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "test-user-token", userSlug: "test-user" }) });
    if (/tags/.test(u.pathname) && m === "GET") {
      if (tagsMode === "slow") await new Promise((r) => setTimeout(r, 4000));
      if (tagsMode === "down") return route.abort("connectionrefused");
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(tagsMode === "empty" ? [] : TAGS) });
    }
    if (/palettes\/?$/.test(u.pathname) && m === "GET") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [OWNED], total: 1, limit: 50, offset: 0 }) });
    if (/palettes\/owned-one/.test(u.pathname) && m === "PATCH") {
      let body = null; try { body = route.request().postDataJSON(); } catch {}
      patches.push({ mode: patchMode, body, ifMatch: route.request().headers()["if-match"] });
      if (patchMode === "fail") return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Server exploded", status: 500 }) });
      OWNED = { ...OWNED, ...(body || {}), updatedAt: new Date().toISOString() };
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(OWNED) });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) });
  });
  const rec = { tag, steps: [] };
  const step = async (name, fn) => { try { const r = await fn(); rec.steps.push({ name, ok: true, r }); } catch (e) { rec.steps.push({ name, ok: false, err: String(e).slice(0, 300) }); try { await shot(page, `${tag}-ERR-${name}`, "error"); } catch {} } };
  const card = () => page.getByRole("article", { name: "Palette: Owned One" });
  const openViaMenu = async () => { await card().scrollIntoViewIfNeeded(); const trig = card().locator("button.dropdown-menu__trigger, button[aria-haspopup='menu']").first(); await trig.click(); await page.waitForTimeout(700); await page.getByRole("menuitem", { name: /Edit Tags/i }).click(); await page.waitForTimeout(1300); };
  const close = async () => { await page.keyboard.press("Escape"); await page.waitForTimeout(700); };
  await page.goto(URL0 + "#/browse"); await page.waitForTimeout(4500);
  await step("00-browse", async () => { await shot(page, `${tag}-00-browse-rest`, "browse loaded, before open"); return tagsOnCard(page); });
  await step("01-menu", async () => { await card().scrollIntoViewIfNeeded(); const trig = card().locator("button.dropdown-menu__trigger, button[aria-haspopup='menu']").first(); await trig.click(); await page.waitForTimeout(700); await shot(page, `${tag}-01-card-menu-edit-tags-item`, "card menu open (the reach)"); await close(); });
  await step("02-open", async () => { await openViaMenu(); await shot(page, `${tag}-02-open`, "open (current tag: warm)"); return popMetrics(page); });
  await step("03-hover", async () => { await page.locator('[role="dialog"] label').nth(2).hover(); await page.waitForTimeout(500); await shot(page, `${tag}-03-row-hover`, "open, row hover"); });
  await step("04-add", async () => { await page.locator('[role="dialog"] label').filter({ hasText: "cool" }).click(); await page.waitForTimeout(1300); await shot(page, `${tag}-04-tag-added`, "tag added (cool)"); return { pop: await popMetrics(page), patches: patches.slice(-1) }; });
  await step("05-remove", async () => { await page.locator('[role="dialog"] label').filter({ hasText: "warm" }).click(); await page.waitForTimeout(1300); await shot(page, `${tag}-05-tag-removed`, "tag removed (warm)"); return { pop: await popMetrics(page), patches: patches.slice(-1) }; });
  await step("06-kbd", async () => { await page.keyboard.press("Tab"); await page.waitForTimeout(300); await page.keyboard.press("Tab"); await page.waitForTimeout(400); await shot(page, `${tag}-06-keyboard-focus`, "keyboard focus in list"); return page.evaluate(() => document.activeElement?.outerHTML.slice(0, 160)); });
  await step("07-scrolled", async () => { await page.locator('[role="dialog"] .overflow-y-auto').evaluate((e) => (e.scrollTop = 999)); await page.waitForTimeout(400); await shot(page, `${tag}-07-list-scrolled`, "catalog scrolled to end"); });
  await step("08-closed-card", async () => { await close(); await shot(page, `${tag}-08-closed-card-reflects`, "closed; card reflects new tags"); return tagsOnCard(page); });
  await step("09-save-fail", async () => { patchMode = "fail"; await openViaMenu(); await page.locator('[role="dialog"] label').filter({ hasText: "pastel" }).click(); await page.waitForTimeout(1500); await shot(page, `${tag}-09-save-failed-open`, "tag added, PATCH 500 (popover open)"); const m = await popMetrics(page); await close(); await shot(page, `${tag}-10-save-failed-closed`, "after failed save, popover closed"); return { pop: m, card: await tagsOnCard(page), alerts: await page.locator('[role="status"],[role="alert"]').allTextContents() }; });
  // Fresh context state for catalog states: reload so the loaded guard resets.
  await step("11-loading", async () => { patchMode = "ok"; tagsMode = "slow"; await page.reload(); await page.waitForTimeout(800); await openViaMenu().catch(() => {}); await page.waitForTimeout(200); await shot(page, `${tag}-11-catalog-loading`, "catalog loading (4s delay)"); await page.waitForTimeout(4200); await close(); });
  await step("12-catalog-down", async () => { tagsMode = "down"; await page.reload(); await page.waitForTimeout(4500); await openViaMenu(); await shot(page, `${tag}-12-catalog-unreachable`, "catalog GET refused"); const m = await popMetrics(page); await close(); return { pop: m, alerts: await page.locator('[role="status"],[role="alert"]').allTextContents() }; });
  await step("13-catalog-empty", async () => { tagsMode = "empty"; await page.reload(); await page.waitForTimeout(4500); await openViaMenu(); await shot(page, `${tag}-13-catalog-empty`, "catalog empty"); await close(); });
  if (vp === "1440" && theme === "light") await step("14-dock", async () => { tagsMode = "ok"; await page.reload(); await page.waitForTimeout(4500); await card().getByText("Owned One", { exact: true }).first().click(); await page.waitForTimeout(1200); const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await page.waitForTimeout(900); } await page.getByRole("button", { name: "Toggle action bar" }).click(); await page.waitForTimeout(1100); await page.locator('[data-scene-action="palette.tags"] button').click(); await page.waitForTimeout(1400); await shot(page, `${tag}-14-open-from-dock`, "open via dock tags verb"); return popMetrics(page); });
  rec.patches = patches; rec.console = [...new Set(consoleErr)].slice(0, 20);
  writeFileSync(`${OUT}log-${tag}.json`, JSON.stringify({ head, dirty, at: new Date().toISOString(), rec }, null, 1));
  console.log(JSON.stringify({ tag, steps: rec.steps.map((s) => [s.name, s.ok, s.ok ? JSON.stringify(s.r ?? null).slice(0, 700) : s.err]), patches, console: rec.console }, null, 1));
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}manifest-${themes.join("_")}-${vps.join("_")}.json`, JSON.stringify({ seat: "tag-edit-popover", base: URL0, head, dirty, frames }, null, 1));
