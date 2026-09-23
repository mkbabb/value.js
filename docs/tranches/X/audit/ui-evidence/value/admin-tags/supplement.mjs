// X audit seat · admin-tags — supplement (READ-ONLY; all API stubbed): true signed-out boot,
// confirm-dialog leave timing, typography probes. Run after capture.mjs.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = "http://localhost:9000";
const REPO = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${REPO} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${REPO} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const isApi = (url) => { const p = url.pathname; if (/\/(@fs|@id|@vite|node_modules|src|demo)\//.test(p)) return false; if (/\.\w+$/.test(p)) return false; return /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(p); };
const out = { head: sha, dirty, frames: [] };
const ONLY = process.env.ONLY;
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist", "--enable-gpu"] });
for (const vp of [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }]) for (const theme of ["light", "dark"]) {
  const tag = `${vp.tag}-${theme}`; if (ONLY && !ONLY.split(",").includes(tag)) continue;
  let tags = [{ name: "warm", category: "mood" }, { name: "calm", category: "mood" }, { name: "autumn", category: "season" }];
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 600 });
  const page = await ctx.newPage();
  await page.addInitScript(([t]) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.removeItem("palette-admin-token"); } catch {} }, [theme]);
  await page.route(isApi, async (route) => { const u = new URL(route.request().url()); const m = route.request().method(); const p = u.pathname;
    const j = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) });
    if (p === "/admin/tags" && m === "GET") return j(tags);
    let mm; if ((mm = p.match(/^\/admin\/tags\/([^/]+)$/)) && m === "DELETE") { const n = decodeURIComponent(mm[1]); tags = tags.filter((x) => x.name !== n); return j({ deleted: true }); }
    return j({ data: [], total: 0, limit: 50, offset: 0, nextCursor: null, hasMore: false }); });
  try {
    await page.goto(`${BASE}/#/admin/tags`, { waitUntil: "commit", timeout: 300000 });
    await page.locator('[data-admin-notice="tags"]').first().waitFor({ timeout: 300000 }); await page.waitForTimeout(3000);
    await page.screenshot({ path: OUT + `${tag}-02-signed-out.png` });
    out.frames.push({ file: `${tag}-02-signed-out.png`, head: sha, dirty, state: "stub · fresh boot with NO admin token", probe: await page.evaluate(() => ({ access: document.querySelector('[data-admin-access]')?.textContent.trim().slice(0, 200), refreshDisabled: document.querySelector('[aria-label="Refresh tags"]')?.disabled, formVisible: !!document.querySelector('[aria-label="New tag name"]') })) });
    await page.evaluate(() => localStorage.setItem("palette-admin-token", "dev")); await page.reload({ waitUntil: "commit" });
    await page.locator('.group.rounded-full').first().waitFor({ timeout: 300000 }); await page.waitForTimeout(2000);
    out.frames.push({ tag, typo: await page.evaluate(() => { const f = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return { font: `${c.fontStyle} ${c.fontSize} ${c.fontFamily.split(",")[0]} ${c.fontWeight}`, color: c.color, opacity: c.opacity, vis: c.visibility, clip: c.clipPath, rect: [r.x, r.y, r.width, r.height].map(Math.round) }; };
      return { routeTitle: f('.route-title'), paneTitle: f('.pane-header-title'), paneDesc: f('.pane-header-desc'), card: f('.pane-scroll-fade'), count: f('.text-mono-small') }; }) });
    await page.locator('[aria-label="Delete tag calm"]').click(); await page.locator('[role="dialog"]').waitFor({ timeout: 8000 }); await page.waitForTimeout(800);
    out.frames.push({ tag, dialogTypo: await page.evaluate(() => { const d = document.querySelector('[role="dialog"]'); const t = d.querySelector('h2'); const p = d.querySelector('p'); const c = (e) => { const s = getComputedStyle(e); return `${s.fontSize} ${s.fontFamily.split(",")[0]} ${s.fontWeight}`; }; return { title: c(t), desc: c(p), focused: document.activeElement?.textContent.trim().slice(0, 30), docScrollW: document.documentElement.scrollWidth, rect: d.getBoundingClientRect().toJSON() }; }) });
    await page.screenshot({ path: OUT + `${tag}-08b-confirm-open.png` });
    const t0 = Date.now(); await page.locator('[role="dialog"] button', { hasText: "Delete tag" }).click();
    for (const ms of [150, 450, 1200]) { await page.waitForTimeout(ms - (Date.now() - t0) > 0 ? ms - (Date.now() - t0) : 0);
      const file = `${tag}-09-leave-${ms}ms.png`; await page.screenshot({ path: OUT + file });
      out.frames.push({ file, head: sha, dirty, state: `stub · ${ms}ms after Delete tag confirmed`, dialogInDom: await page.locator('[role="dialog"]').count(), contentNodes: await page.locator('[data-slot="dialog-content"]').count(), chips: await page.locator('.group.rounded-full').count() }); }
  } catch (e) { console.log("ERR", tag, String(e).slice(0, 300)); out.frames.push({ tag, err: String(e).slice(0, 300) }); }
  await ctx.close(); console.log("done", tag);
}
writeFileSync(OUT + `supplement-${ONLY ?? "all"}.json`, JSON.stringify(out, null, 1));
await browser.close();
