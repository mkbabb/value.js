// READ-ONLY cascade probe: why the destructive/muted classes do not paint on menu rows; where the menu font comes from.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = "http://localhost:9000";
const NOW = "2026-09-20T00:00:00.000Z";
const pal = { name: "Harbour Dusk", slug: "harbour-dusk", userSlug: "test-user", tags: ["a"], versionCount: 1, voteCount: 1, visibility: "public", tier: "standard", colors: [{css:"#123",position:0}], createdAt: NOW, updatedAt: NOW, isLocal: false };
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.route((u) => /^\/(palettes|sessions|colors|admin|users)(\/|$)/.test(u.pathname) && !/\.\w+$/.test(u.pathname), (r) => {
  const p = new URL(r.request().url()).pathname;
  const body = p === "/palettes" ? { data: [pal], nextCursor: null, hasMore: false } : p.startsWith("/sessions") ? { token: "t", userSlug: "test-user" } : { data: [] };
  return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
});
await page.addInitScript(() => { localStorage.setItem("palette-user-slug", "test-user"); localStorage.setItem("palette-user-token", "t"); });
await page.goto(`${BASE}/#/browse`, { timeout: 90000 });
await page.locator('[aria-label="Palette: Harbour Dusk"] button[aria-label="Palette menu"]').click({ timeout: 60000 });
await page.locator('[role="menu"]').waitFor();
await page.waitForTimeout(800);
await page.locator("[role=menu] >> text=Export").hover(); await page.waitForTimeout(600);
const out = await page.evaluate(() => {
  const menu = document.querySelector('[role="menu"]');
  const menus=[...document.querySelectorAll("[role=menu]")]; const del = menus[1].querySelector("[role=menuitem]"); const ver=[...menu.querySelectorAll("span")].find(s=>s.textContent.trim()==="1");
  const rules = [];
  const walk = (list, layer) => { for (const r of list) { try {
    if (r.cssRules && !(r instanceof CSSStyleRule)) walk(r.cssRules, (r.name ?? r.conditionText ?? layer));
    if (r instanceof CSSStyleRule) {
      for (const [el, tag] of [[menus[1], "sub"], [menus[1].parentElement, "subparent"]]) {
        try { if (el.matches(r.selectorText) && (r.style.fontStyle)) rules.push({ tag, layer, sel: r.selectorText.slice(0, 140), fst: r.style.fontStyle }); } catch {}
      }
    } } catch {} } };
  for (const s of document.styleSheets) { try { walk(s.cssRules, "(unlayered)"); } catch {} }
  return { delClass: del.className, menuClass: menu.className, subCls: menus[1].className, subStyle: getComputedStyle(menus[1]).fontStyle, delStyle: getComputedStyle(del).fontStyle, delFam: getComputedStyle(del).fontFamily, rules };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
