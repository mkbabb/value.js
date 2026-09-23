// UIA-F gallery-drafts — headed Chromium, real GPU. READ-ONLY on the app tree and the backend:
// drafts are seeded into the browser context's own IndexedDB (fourier-drafts v2, keyPath imageSlug —
// web/src/lib/draftStorage.ts:17-32); login = localStorage keys (stores/auth.ts:6-9); EVERY non-GET
// /api request is stubbed (no backend writes); thumbnails stubbed with an SVG.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const THUMB = (hue) => `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="hsl(${hue} 40% 92%)"/><path d="M64 14 C104 14 114 54 94 74 C74 94 104 114 64 114 C24 114 34 84 44 64 C54 44 24 14 64 14Z" fill="none" stroke="hsl(${hue} 60% 35%)" stroke-width="5"/></svg>`;
const now = Date.now();
const mk = (slug, bases, minsAgo, hue) => ({
  imageSlug: slug, hue,
  contour: { contour_hash: "deadbeef" + minsAgo, points: [] },
  contourSettings: { n_harmonics: 64 },
  animationSettings: { active_bases: bases },
  epicycleData: null, basesData: null, savedSnapshots: [],
  lastOpenedAt: new Date(now - minsAgo * 60000).toISOString(),
});
const DRAFTS = [mk("img-amber-fox-spiral", ["fourier-epicycles", "chebyshev"], 3, 30),
  mk("img-quiet-heron-lake-with-a-rather-long-slug-name", ["legendre"], 95, 200),
  mk("img-coral-knot", [], 60 * 26, 340)];
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = []; const posts = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor,
        border: cs.borderTopWidth + " " + cs.borderTopColor, font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 28), color: cs.color, pad: cs.padding }; };
    const coll = q("[data-state].mx-4") || q(".drafts-header")?.closest("[data-state]")?.parentElement;
    return {
      theme: document.documentElement.className, url: location.pathname,
      tabs: box(q("[role=tablist]")), tabsText: [...document.querySelectorAll("[role=tab]")].map((t) => t.textContent.trim() + (t.getAttribute("aria-selected") === "true" ? "*" : "")),
      collapsible: box(q(".drafts-header")?.parentElement), header: box(q(".drafts-header")),
      headerAttrs: q(".drafts-header") ? { exp: q(".drafts-header").getAttribute("aria-expanded"), ctl: q(".drafts-header").getAttribute("aria-controls"), tag: q(".drafts-header").tagName } : null,
      headerTitle: box(q(".drafts-header .cm-serif")), metric: box(q(".drafts-header .cm-serif")?.nextElementSibling),
      rows: document.querySelectorAll(".draft-item").length, row0: box(q(".draft-item")), thumb0: box(q(".draft-item > div")),
      slug0: box(q(".draft-item .fira-code")), meta0: box(q(".draft-item .text-muted-foreground")),
      metaTexts: [...document.querySelectorAll(".draft-item .flex-col > span:last-child")].map((s) => s.textContent.replace(/\s+/g, " ").trim()),
      publish0: box(q(".draft-item button")), publishDisabled: [...document.querySelectorAll(".draft-item button")].map((b) => b.disabled),
      rowTabindex: [...document.querySelectorAll(".draft-item > div")].map((d) => d.getAttribute("tabindex") + "/" + d.getAttribute("role")),
      empty: box([...document.querySelectorAll("p")].find((p) => /No drafts/.test(p.textContent))),
      emptyTexts: [...document.querySelectorAll("p")].filter((p) => /draft/i.test(p.textContent)).map((p) => p.textContent.trim()),
      emptyCTA: !![...document.querySelectorAll("button,a")].find((b) => /Visualizer/.test(b.textContent)),
      toasts: [...document.querySelectorAll("[data-sonner-toast], [role=status], .toast, [data-toast]")].map((t) => t.textContent.trim().slice(0, 80)),
      bodyBg: getComputedStyle(document.body).backgroundColor, scrollW: document.documentElement.scrollWidth, vw: innerWidth,
      activeEl: document.activeElement?.outerHTML.slice(0, 140),
    };
  });
}
async function shot(page, name, extra) {
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = { ...(await measure(page)), ...(extra || {}) };
}
async function newPage(vp, theme, { login, seed, publishDelay = 0 }) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${vp}-${theme} console.error ${m.text().slice(0, 200)}`); });
  await page.route("**/api/**", async (route) => {
    const req = route.request(); const u = new URL(req.url());
    if (/\/api\/images\/.+\/thumbnail/.test(u.pathname)) {
      const d = DRAFTS.find((x) => u.pathname.includes(x.imageSlug));
      return route.fulfill({ status: 200, contentType: "image/svg+xml", body: THUMB(d?.hue ?? 120) });
    }
    if (req.method() === "GET") return route.continue();
    posts.push(`${vp}-${theme} ${req.method()} ${u.pathname}`);
    if (u.pathname === "/api/visualizations") {
      await new Promise((r) => setTimeout(r, publishDelay));
      return route.fulfill({ status: 201, contentType: "application/json", headers: { etag: '"x"' },
        body: JSON.stringify({ slug: "published-stub-1", image_slug: DRAFTS[0].imageSlug, visibility: "public", tier: "normal", active_bases: ["fourier-epicycles"], created_at: new Date().toISOString(), updated_at: new Date().toISOString() }) });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ slug: "amber-fox-12", token: "stub", user_slug: "amber-fox-12" }) });
  });
  await page.addInitScript(({ login }) => {
    if (login) { localStorage.setItem("fourier-user-slug", "amber-fox-12"); localStorage.setItem("fourier-user-token", "stub-token"); }
  }, { login });
  await page.goto(BASE + "/gallery", { waitUntil: "domcontentloaded" });
  if (seed) {
    await page.evaluate((drafts) => new Promise((res, rej) => {
      const r = indexedDB.open("fourier-drafts", 2);
      r.onupgradeneeded = () => { const s = r.result.objectStoreNames.contains("drafts") ? r.transaction.objectStore("drafts") : r.result.createObjectStore("drafts", { keyPath: "imageSlug" });
        if (!s.indexNames.contains("by-visualization-slug")) s.createIndex("by-visualization-slug", "visualizationSlug", { unique: false }); };
      r.onsuccess = () => { const tx = r.result.transaction("drafts", "readwrite"); const st = tx.objectStore("drafts");
        drafts.forEach((d) => { const { hue, ...rest } = d; st.put(rest); }); tx.oncomplete = () => { r.result.close(); res(); }; tx.onerror = () => rej(tx.error); };
      r.onerror = () => rej(r.error);
    }), DRAFTS);
    await page.reload({ waitUntil: "domcontentloaded" });
  }
  await page.waitForTimeout(1500);
  return { ctx, page };
}
const clickDrafts = async (page) => { await page.getByRole("tab", { name: "Drafts" }).click(); await page.waitForTimeout(500); };

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const p = `${vp}-${theme}-`;
  // 1 empty — logged out, no drafts
  { const { ctx, page } = await newPage(vp, theme, { login: false, seed: false });
    await clickDrafts(page); await shot(page, p + "1-empty-loggedout"); await ctx.close(); }
  // 1b empty — logged in, no drafts
  if (theme === "light") { const { ctx, page } = await newPage(vp, theme, { login: true, seed: false });
    await clickDrafts(page); await shot(page, p + "1b-empty-loggedin"); await ctx.close(); }
  // 2 listed (collapsible open by default) + closed + hover/focus + keyboard reach
  { const { ctx, page } = await newPage(vp, theme, { login: true, seed: true, publishDelay: 4000 });
    await clickDrafts(page); await shot(page, p + "2-listed-open");
    if (vp === "d") {
      await page.locator(".draft-item").nth(1).hover(); await shot(page, p + "2b-row-hover");
      await page.locator(".draft-item button").first().hover(); await shot(page, p + "2c-publish-hover");
      await page.mouse.move(5, 5);
      // keyboard: Tab from the tablist through the section
      await page.getByRole("tab", { name: "Drafts" }).focus();
      const seq = [];
      for (let i = 0; i < 6; i++) { await page.keyboard.press("Tab"); seq.push(await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 90))); }
      metrics[p + "tab-sequence"] = seq;
      await page.locator(".drafts-header").focus(); await shot(page, p + "2d-header-focus");
    }
    await page.locator(".drafts-header").click(); await shot(page, p + "3-collapsed");
    await page.locator(".drafts-header").click(); await page.waitForTimeout(300);
    // 4 publishing (POST held 4s)
    await page.locator(".draft-item button").first().click();
    await page.waitForTimeout(600); await shot(page, p + "4-publishing");
    await page.waitForTimeout(4200); await shot(page, p + "4b-after-publish", { rowsAfterPublish: await page.locator(".draft-item").count() });
    // open: click the thumbnail
    if (vp === "d" && theme === "light") {
      await page.locator(".draft-item > div").first().click(); await page.waitForTimeout(1200);
      metrics[p + "open-click-url"] = page.url();
    }
    await ctx.close(); }
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ metrics, errors, posts }, null, 1));
await browser.close();
console.log("done", Object.keys(metrics).length, "errors", errors.length, "posts", posts.length);
