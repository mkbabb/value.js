// OA-36 audit seat: palette-scene-actions. Headed Chromium, real GPU.
// Usage: node capture.mjs [theme] [vp]   (defaults: all)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const URL0 = "http://localhost:9000/";
const VJ = "/Users/mkbabb/Programming/value.js";
const head = execSync(`git -C ${VJ} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${VJ} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const now = new Date().toISOString();
const SAVED = (n, colors) => ({ id: `saved-${n}`, name: n === 1 ? "Sunset Harbor" : "Moss & Slate", slug: n === 1 ? "sunset-harbor" : "moss-slate", colors: colors.map((css, i) => ({ css, position: i })), createdAt: now, updatedAt: now, isLocal: true });
const STORE = { version: 1, palettes: [SAVED(1, ["#f97316", "#e11d48", "#7c3aed", "#1e3a8a", "#fde68a"]), SAVED(2, ["#365314", "#65a30d", "#94a3b8", "#334155"])] };
const OWNED = { slug: "owned-one", name: "Owned One", colors: [{ css: "#e11d48", position: 0 }, { css: "#2563eb", position: 1 }, { css: "#facc15", position: 2 }], userSlug: "test-user", voteCount: 3, voted: false, isLocal: false, visibility: "public", tags: ["warm"], versionCount: 2, currentHash: "h2", createdAt: now, updatedAt: now };
const isApi = (u) => { const url = new URL(u); if (/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname)) return false; if (/\.(ts|js|mjs|vue|css|svg|png|woff2|glsl|json)$/.test(url.pathname)) return false; return url.port === "3000" || /(^|\/)(palettes|sessions|colors|users|api)(\/|$)/.test(url.pathname); };
const log = [];
const themes = process.argv[2] ? [process.argv[2]] : ["light", "dark"];
const vps = process.argv[3] ? [process.argv[3]] : ["1440", "390"];
const VP = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
async function shot(page, name) { const p = `${OUT}${name}.png`; await page.waitForTimeout(450); await page.screenshot({ path: p }); log.push({ frame: name + ".png", head, dirty }); }
async function expandDock(page) { const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await page.waitForTimeout(900); } }
async function openTools(page) { await expandDock(page); const t = page.getByRole("button", { name: "Toggle action bar" }); await t.click({ timeout: 4000 }); await page.waitForTimeout(1100); }
async function seats(page) { return page.locator('[data-scene-action]').evaluateAll((els) => els.map((e) => ({ tok: e.getAttribute("data-scene-action"), state: e.getAttribute("data-scene-state") ?? e.getAttribute("data-state"), label: e.querySelector("button")?.getAttribute("aria-label") }))); }
async function dockInfo(page) { return page.evaluate(() => { const d = document.querySelector(".glass-dock"); const r = d?.getBoundingClientRect(); const tb = [...document.querySelectorAll("button")].find((b) => b.getAttribute("aria-label") === "Toggle action bar"); return { dock: r && { x: r.x, y: r.y, w: r.width, h: r.height }, toggleText: tb?.textContent?.trim(), toggleW: tb?.getBoundingClientRect().width, scrollW: document.documentElement.scrollWidth }; }); }
for (const theme of themes) for (const vp of vps) {
  const tag = `${theme}-${vp}`;
  const ctx = await browser.newContext({ viewport: VP[vp], colorScheme: theme, deviceScaleFactor: vp === "390" ? 2 : 1 });
  await ctx.addInitScript(({ theme, store }) => { localStorage.setItem("vueuse-color-scheme", theme); if (!sessionStorage.getItem("__seeded")) { localStorage.setItem("color-palettes", JSON.stringify(store)); sessionStorage.setItem("__seeded", "1"); } localStorage.setItem("palette-user-slug", "test-user"); localStorage.setItem("palette-user-token", "test-user-token"); sessionStorage.setItem("palette-session-token", "test-user-token"); }, { theme, store: STORE });
  const page = await ctx.newPage(); page.setDefaultTimeout(6000); page.setDefaultNavigationTimeout(60000);
  const consoleErr = []; page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleErr.push(m.text().slice(0, 200)); }); page.on("pageerror", (e) => consoleErr.push("PAGEERROR " + e.message.slice(0, 200)));
  let apiMode = "down"; // API down: every API call aborts (network boundary only)
  await page.route(isApi, (route) => {
    const u = new URL(route.request().url()); const m = route.request().method();
    if (apiMode === "down") return route.abort("connectionrefused");
    if (/sessions\/me/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ userSlug: "test-user", slug: "test-user" }) });
    if (/sessions/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "test-user-token", userSlug: "test-user" }) });
    if (/colors\/tags/.test(u.pathname)) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify([{ name: "warm", category: "mood" }, { name: "cool", category: "mood" }]) });
    if (/palettes\/?$/.test(u.pathname) && m === "GET") return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [OWNED], total: 1, limit: 50, offset: 0 }) });
    if (/palettes\/owned-one/.test(u.pathname) && m !== "GET") return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Server exploded", status: 500 }) });
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) });
  });
  const rec = { tag, steps: [] };
  const step = async (name, fn) => { try { const r = await fn(); rec.steps.push({ name, ok: true, r }); } catch (e) { rec.steps.push({ name, ok: false, err: String(e).slice(0, 300) }); try { await shot(page, `${tag}-ERR-${name}`); } catch {} } };
  await page.goto(URL0 + "#/palettes"); await page.waitForTimeout(3500);
  await step("01-palettes-unselected", async () => { await shot(page, `${tag}-01-palettes-unselected`); return dockInfo(page); });
  await step("02-tools-deselected", async () => { await openTools(page); await shot(page, `${tag}-02-tools-deselected`); return { seats: await seats(page), dock: await dockInfo(page) }; });
  await step("02b-back", async () => { await page.getByRole("button", { name: "Back" }).first().click(); await page.waitForTimeout(900); });
  const card = page.getByRole("article", { name: "Palette: Sunset Harbor" });
  await step("03-selected", async () => { await card.getByText("Sunset Harbor", { exact: true }).first().click(); await page.waitForTimeout(1200); await expandDock(page); await shot(page, `${tag}-03-selected-dock-label`); return dockInfo(page); });
  await step("04-palette-verbs", async () => { await openTools(page); await shot(page, `${tag}-04-palette-verbs-saved`); return { seats: await seats(page), dock: await dockInfo(page) }; });
  await step("05-seat-hover", async () => { const b = page.locator('[data-scene-action="palette.publish"] button'); await b.hover(); await page.waitForTimeout(1400); await shot(page, `${tag}-05-seat-hover-publish`); });
  await step("05b-seat-focus", async () => { await page.keyboard.press("Tab"); await page.waitForTimeout(500); await shot(page, `${tag}-05b-seat-focus-kbd`); return page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.outerHTML.slice(0, 120)); });
  await step("06-publish-api-down", async () => { await page.locator('[data-scene-action="palette.publish"] button').click(); await page.waitForTimeout(1200); await shot(page, `${tag}-06a-publish-1s`); await page.waitForTimeout(5000); await shot(page, `${tag}-06-publish-failed-api-down`); return { seats: await seats(page), status: await page.getByRole("status").allTextContents(), alert: await page.getByRole("alert").allTextContents() }; });
  await step("07-export", async () => { const dl = page.waitForEvent("download", { timeout: 4000 }).catch(() => null); await page.locator('[data-scene-action="palette.export"] button').click(); const d = await dl; await page.waitForTimeout(900); await shot(page, `${tag}-07-export-json`); return { download: d?.suggestedFilename() ?? null, status: await page.getByRole("status").allTextContents() }; });
  await step("08-rename", async () => { await page.locator('[data-scene-action="palette.rename"] button').click(); await page.waitForTimeout(1000); await shot(page, `${tag}-08-rename-from-dock`); const f = await page.evaluate(() => ({ tag: document.activeElement?.tagName, ph: document.activeElement?.getAttribute("placeholder") })); await page.keyboard.press("Escape"); await page.waitForTimeout(500); return f; });
  await step("09-deselect", async () => { const back = page.getByRole("button", { name: "Back" }).first(); if (await back.isVisible()) { await back.click(); await page.waitForTimeout(900); } await card.getByText("Sunset Harbor", { exact: true }).first().click(); await page.waitForTimeout(1200); await expandDock(page); await shot(page, `${tag}-09-deselected-label`); return dockInfo(page); });
  await step("09b-deselected-tools", async () => { await openTools(page); await shot(page, `${tag}-09b-deselected-tools-set`); return { seats: await seats(page) }; });
  await step("09c-back", async () => { await page.getByRole("button", { name: "Back" }).first().click(); await page.waitForTimeout(800); });
  await step("10-delete-no-confirm", async () => { const c2 = page.getByRole("article", { name: "Palette: Moss & Slate" }); await c2.getByText("Moss & Slate", { exact: true }).first().click(); await page.waitForTimeout(1000); await openTools(page); await shot(page, `${tag}-10a-delete-armed`); await page.locator('[data-scene-action="palette.delete"] button').click(); await page.waitForTimeout(1500); await shot(page, `${tag}-10b-after-delete`); return { remaining: await page.getByRole("article").count(), dialog: await page.getByRole("dialog").count(), alertdialog: await page.getByRole("alertdialog").count(), dock: await dockInfo(page), seats: await seats(page) }; });
  // Browse: a remote OWNED palette (API up, mutation fails 500) -> the full verb set
  apiMode = "up";
  await step("11-browse-verbs", async () => { await page.goto(URL0 + "#/browse"); await page.reload(); await page.waitForTimeout(4000); await shot(page, `${tag}-11a-browse-loaded`); const oc = page.getByRole("article", { name: "Palette: Owned One" }); await oc.getByText("Owned One", { exact: true }).first().click(); await page.waitForTimeout(1200); await openTools(page); await shot(page, `${tag}-11-browse-remote-owned-verbs`); return { seats: await seats(page), dock: await dockInfo(page) }; });
  await step("12-vote-failed", async () => { await page.locator('[data-scene-action="palette.vote"] button').click(); await page.waitForTimeout(1800); await shot(page, `${tag}-12-vote-failed-500`); return { status: await page.getByRole("status").allTextContents(), alert: await page.getByRole("alert").allTextContents(), seats: await seats(page) }; });
  await step("13-visibility-failed", async () => { await page.locator('[data-scene-action="palette.visibility"] button').click(); await page.waitForTimeout(1800); await shot(page, `${tag}-13-visibility-failed-500`); return { status: await page.getByRole("status").allTextContents() }; });
  await step("14-tags", async () => { await page.locator('[data-scene-action="palette.tags"] button').click(); await page.waitForTimeout(1500); await shot(page, `${tag}-14-tags-from-dock`); const box = await page.getByRole("dialog").first().boundingBox().catch(() => null); const n = await page.getByRole("dialog").count(); await page.keyboard.press("Escape"); await page.waitForTimeout(600); await page.keyboard.press("Escape"); await page.waitForTimeout(600); return { dialogs: n, box }; });
  await step("15-versions", async () => { await page.locator('[data-scene-action="palette.versions"] button').click(); await page.waitForTimeout(1800); await shot(page, `${tag}-15-versions-from-dock`); const n = await page.getByRole("dialog").count(); await page.keyboard.press("Escape"); await page.waitForTimeout(700); const afterEsc1 = await page.getByRole("dialog").count(); await shot(page, `${tag}-15b-versions-after-one-escape`); await page.keyboard.press("Escape"); await page.waitForTimeout(900); return { dialogs: n, afterEsc1, afterEsc2: await page.getByRole("dialog").count() }; });
  await step("16-remix-failed", async () => { await page.locator('[data-scene-action="palette.fork"] button').click(); await page.waitForTimeout(1800); await shot(page, `${tag}-16-remix-failed`); return { status: await page.getByRole("status").allTextContents() }; });
  await step("17-save-remote", async () => { await page.locator('[data-scene-action="palette.save"] button').click(); await page.waitForTimeout(1500); await shot(page, `${tag}-17-save-remote`); return { status: await page.getByRole("status").allTextContents() }; });
  await step("17b-save-twice", async () => { await page.locator('[data-scene-action="palette.save"] button').click(); await page.waitForTimeout(1500); await shot(page, `${tag}-17b-save-twice`); return { ownedCopies: await page.getByRole("article", { name: "Palette: Owned One" }).count(), seats: (await seats(page)).map((x) => x.tok) }; });
  // Browse with API DOWN
  apiMode = "down";
  await step("18-browse-api-down", async () => { await page.reload(); await page.waitForTimeout(3500); await shot(page, `${tag}-18-browse-api-down`); await openTools(page).catch(() => {}); await shot(page, `${tag}-18b-browse-api-down-tools`); return { seats: await seats(page), dock: await dockInfo(page) }; });
  rec.console = [...new Set(consoleErr)].slice(0, 25);
  log.push(rec); writeFileSync(`${OUT}capture-log-${tag}.json`, JSON.stringify({ head, dirty, at: new Date().toISOString(), rec }, null, 1));
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}capture-log-${themes.join("_")}-${vps.join("_")}.json`, JSON.stringify({ head, dirty, at: new Date().toISOString(), log }, null, 1));
console.log(JSON.stringify(log.filter((x) => x.tag).map((r) => ({ tag: r.tag, steps: r.steps.map((s) => [s.name, s.ok, s.ok ? JSON.stringify(s.r ?? null).slice(0, 400) : s.err]) , console: r.console })), null, 1));
