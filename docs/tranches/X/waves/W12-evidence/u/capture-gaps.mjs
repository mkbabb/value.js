// SERVED MODEL: claude-opus-5-5
// X.W12.u1 — the §0ca critic coverage gaps that no audit instrument covers, and the probes
// that resolve the 4 UNRESOLVED UIA-V rows. Served dev page (:9000); :3000 reads are
// fulfilled from fixtures (no DB write). Usage: node capture-gaps.mjs <leg> [leg...]
// Legs: browse-delete · versions-drawer · u464 · dock-idle · dock-engage · flag-fail
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const REPO = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${REPO} rev-parse --short HEAD`).toString().trim();
const legs = process.argv.slice(2);
const NOW = "2026-09-20T12:00:00.000Z";
const R = (slug, name, colors, extra = {}) => ({ slug, name, userSlug: "ada", colors: colors.map((css, position) => ({ css, position })),
  createdAt: NOW, updatedAt: NOW, isLocal: false, visibility: "public", published: true, tier: "standard", voteCount: 3, voted: false, tags: [], versionCount: 3, ...extra });
const FIXTURE = [
  R("sunset-coast-a1", "Sunset Coast", ["#ff6b35", "#f7c59f", "#efefd0", "#004e89", "#1a659e"], { userSlug: "someone" }),
  R("forest-floor-b2", "Forest Floor", ["#2d4a22", "#5b7c3a", "#a3b18a", "#dad7cd"], { currentHash: "p2" }),
  R("neon-arcade-c3", "Neon Arcade", ["oklch(0.7 0.3 330)", "oklch(0.8 0.2 190)", "#111111", "#7f5af0"], { userSlug: "someone" }),
];
const VERSIONS = [0, 1, 2].map((d) => ({ hash: `h${d}`, name: "Forest Floor", colors: FIXTURE[1].colors, parentHash: d ? `h${d - 1}` : null, forkedFromHash: null,
  payloadHash: `p${d}`, authorSlug: "ada", paletteSlug: "forest-floor-b2", createdAt: `2026-09-1${d}T10:00:00.000Z`, rootHash: "h0", depth: d }));
const isApi = (u) => u.port === "3000" || /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(u.pathname) && !/\.\w+$/.test(u.pathname) && !/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(u.pathname);
async function stub(page) {
  await page.route(isApi, (route) => {
    const u = new URL(route.request().url()); const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (/\/flag$/.test(u.pathname)) return new Promise((r) => setTimeout(r, 1500)).then(() => j({ error: "u1 fixture: server refused" }, 400));
    if (/\/palettes\/[^/]+\/versions/.test(u.pathname)) return j({ data: VERSIONS, total: 3, limit: 20, offset: 0 });
    if (u.pathname === "/palettes") return j({ data: FIXTURE, nextCursor: null, hasMore: false, total: FIXTURE.length });
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false });
  });
}
const VPS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
const log = [];
async function open(vp, theme, hash, { admin = false, user = false, api = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600, isMobile: vp.w < 600 });
  await ctx.addInitScript(([t, a, us]) => { try { if (sessionStorage.getItem("__u1")) return; sessionStorage.setItem("__u1", "1"); localStorage.clear();
    localStorage.setItem("vueuse-color-scheme", t); if (a) localStorage.setItem("palette-admin-token", "dev");
    if (us) { localStorage.setItem("palette-user-slug", "ada"); localStorage.setItem("palette-user-token", "u1-fixture"); } } catch {} }, [theme, admin, user]);
  const page = await ctx.newPage();
  if (api) await stub(page);
  await page.goto(`${BASE}/${hash}`, { waitUntil: "domcontentloaded", timeout: 180000 });
  await page.locator("main").first().waitFor({ timeout: 180000 });
  await page.waitForTimeout(2500);
  return { ctx, page };
}
async function shot(page, name, extra = {}) {
  await page.screenshot({ path: `${OUT}${name}.png`, timeout: 30000 }).catch(async () => {
    const cdp = await page.context().newCDPSession(page); const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
    writeFileSync(`${OUT}${name}.png`, Buffer.from(data, "base64")); });
  log.push({ frame: `${name}.png`, head: sha, ...extra }); console.log("captured", name);
}
const card = (page, name) => page.locator(`[role="article"][aria-label="Palette: ${name}"]`).first();
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

for (const leg of legs) {
  if (leg === "browse-delete") for (const vp of VPS) for (const theme of ["light", "dark"]) {
    const { ctx, page } = await open(vp, theme, "#/browse", { admin: true });
    await card(page, "Sunset Coast").getByRole("button", { name: "Palette menu" }).click(); await page.waitForTimeout(700);
    await page.getByRole("menuitem", { name: /Delete \(admin\)/ }).click(); await page.waitForTimeout(900);
    const m = await page.evaluate(() => { const d = document.querySelector('[role="dialog"], [role="alertdialog"]'); if (!d) return null; const s = getComputedStyle(d); const r = d.getBoundingClientRect();
      return { role: d.getAttribute("role"), title: d.querySelector("h2")?.textContent?.trim(), text: d.innerText.replace(/\s+/g, " ").slice(0, 200), bg: s.backgroundColor, radius: s.borderRadius, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y),
        buttons: [...d.querySelectorAll("button")].map((b) => ({ t: b.textContent.trim(), emphasis: b.dataset.emphasis, tone: b.dataset.tone, bg: getComputedStyle(b).backgroundColor, color: getComputedStyle(b).color })),
        focused: document.activeElement?.textContent?.trim().slice(0, 30), scrollW: document.documentElement.scrollWidth }; });
    await shot(page, `browse-delete-confirm__${vp.tag}__${theme}`, { leg, vp: vp.tag, theme, dialog: m });
    await page.keyboard.press("Tab"); await page.waitForTimeout(300);
    await shot(page, `browse-delete-confirm-tab__${vp.tag}__${theme}`, { leg, vp: vp.tag, theme, focused: await page.evaluate(() => document.activeElement?.textContent?.trim()) });
    await ctx.close();
  }
  if (leg === "versions-drawer") for (const theme of ["light", "dark"]) {
    const vp = VPS.find((v) => v.tag === (process.env.VP ?? "1440"));
    const { ctx, page } = await open(vp, theme, "#/browse", { user: true });
    await card(page, "Forest Floor").getByRole("button", { name: "Palette menu" }).click(); await page.waitForTimeout(700);
    await page.getByRole("menuitem", { name: /Versions/ }).click(); await page.waitForTimeout(1500);
    const m = await page.evaluate(() => { const d = document.querySelector('[role="dialog"]'); if (!d) return null; const chain = []; let e = d;
      for (let i = 0; e && i < 3; i++, e = e.parentElement) { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); chain.push({ tag: e.tagName, cls: String(e.className).slice(0, 160), bg: s.backgroundColor, bgImg: s.backgroundImage.slice(0, 120), backdrop: s.backdropFilter, x: Math.round(r.x), w: Math.round(r.width), mask: s.maskImage?.slice(0, 80) }); }
      const ov = document.querySelector('[data-slot="dialog-overlay"], .dialog-overlay, [data-reka-dialog-overlay]'); const os = ov && getComputedStyle(ov);
      const rows = [...d.querySelectorAll(".group")].map((r) => ({ head: r.innerText.split("\n")[0], current: /\(current\)/.test(r.innerText), revert: [...r.querySelectorAll("button")].some((x) => /revert/i.test(x.getAttribute("aria-label") || x.textContent)), revertOpacity: [...r.querySelectorAll("button")].map((x) => getComputedStyle(x).opacity)[0] ?? null }));
      return { rows, content: chain, overlay: ov ? { cls: String(ov.className).slice(0, 120), bg: os.backgroundColor, backdrop: os.backdropFilter } : null }; });
    await shot(page, `versions-drawer__${vp.tag}__${theme}`, { leg, vp: vp.tag, theme, drawer: m });
    await ctx.close();
  }
  if (leg === "u464") for (const hideBar of [false, true]) {
    const vp = VPS[1];
    const { ctx, page } = await open(vp, "dark", "#/palettes", { api: false });
    if (hideBar) await page.addStyleTag({ content: "html,body,*{scrollbar-width:none!important}*::-webkit-scrollbar{display:none!important}" });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(1200);
    const buf = await page.screenshot();
    const px = await page.evaluate(async (b64) => { const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
      const g = c.getContext("2d"); g.drawImage(img, 0, 0); const k = img.width / innerWidth; const at = (x, y) => [...g.getImageData(Math.round(x * k), Math.round(y * k), 1, 1).data].slice(0, 3);
      return { x382: [200, 500, 800].map((y) => at(382, y)), x370: [200, 500, 800].map((y) => at(370, y)), scrollbarW: innerWidth - document.documentElement.clientWidth, overflowX: document.documentElement.scrollWidth > innerWidth }; }, buf.toString("base64"));
    await shot(page, `u464-palettes-scrollend__390__dark__${hideBar ? "nobar" : "bar"}`, { leg, hideBar, px });
    await ctx.close();
  }
  if (leg === "dock-idle") for (const [hash, theme] of [["#/admin/audit", "dark"], ["#/admin/audit", "light"], ["#/mix", "light"]]) {
    const vp = VPS[0];
    const { ctx, page } = await open(vp, theme, hash, { admin: true });
    const series = [];
    const t0 = Date.now();
    for (const t of [0, 1000, 2000, 4000, 7000]) { const wait = t - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait);
      series.push({ t: Date.now() - t0, ...(await page.evaluate(() => { const d = document.querySelector(".glass-dock"); if (!d) return { dock: null }; const r = d.getBoundingClientRect(); return { collapsed: d.classList.contains("collapsed"), w: Math.round(r.width), h: Math.round(r.height) }; })) }); }
    await shot(page, `dock-idle__${hash.replace(/[#/]/g, "")}__1440__${theme}`, { leg, hash, theme, series, note: "t=0 is 2.5 s after main mounted; no pointer, no key" });
    await page.mouse.move(720, 30); await page.waitForTimeout(1200);
    const reexp = await page.evaluate(() => document.querySelector(".glass-dock")?.classList.contains("collapsed"));
    log.push({ leg, hash, theme, collapsedAfterPointerToDock: reexp });
    await ctx.close();
  }
  if (leg === "flag-fail") for (const theme of ["light"]) {
    const { ctx, page } = await open(VPS[0], theme, "#/browse", {});
    await card(page, "Sunset Coast").getByRole("button", { name: "Palette menu" }).click(); await page.waitForTimeout(600);
    await page.getByRole("menuitem", { name: /Report/ }).click(); await page.waitForTimeout(800);
    await page.getByRole("radio", { name: /Spam/ }).click(); await page.locator('[role="dialog"] textarea').fill("u1 typed detail");
    await page.getByRole("button", { name: /^Report$/ }).click(); await page.waitForTimeout(500);
    const read = () => page.evaluate(() => { const d = document.querySelector('[role="dialog"]'); if (!d) return { open: false };
      const b = [...d.querySelectorAll("button")].find((x) => x.textContent.trim() === "Report");
      return { open: true, checked: d.querySelector('[role="radio"][aria-checked="true"]')?.textContent?.trim() ?? null, detail: d.querySelector("textarea")?.value, loading: b?.getAttribute("aria-busy") ?? b?.dataset.loading ?? null, disabled: b?.disabled, alert: d.querySelector('[role="alert"]')?.textContent?.trim() ?? null }; });
    const during = await read(); await shot(page, `flag-fail-pending__1440__${theme}`, { leg, during });
    await page.waitForTimeout(2500); const after = await read(); await shot(page, `flag-fail-after__1440__${theme}`, { leg, after });
    await ctx.close();
  }
  if (leg === "dock-engage") for (const theme of ["dark", "light"]) {
    const { ctx, page } = await open(VPS[0], theme, "#/admin/audit", { admin: true });
    await page.mouse.move(720, 30); await page.waitForTimeout(800); await page.mouse.move(720, 600);
    const t0 = Date.now(); const series = [];
    for (const t of [500, 3000, 5500, 7000]) { const wait = t - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait);
      series.push({ t: Date.now() - t0, collapsed: await page.evaluate(() => document.querySelector(".glass-dock")?.classList.contains("collapsed")) }); }
    await shot(page, `dock-engage__adminaudit__1440__${theme}`, { leg, theme, series, note: "pointer engaged the dock 800 ms, then left to the content; t from the leave" });
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}capture-gaps-${legs.join("+")}${process.env.RUN ?? ""}.json`, JSON.stringify(log, null, 1));
