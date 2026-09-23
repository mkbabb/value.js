// READ-ONLY cascade probe: which rule paints the drawer's Revert / Load-more labels italic.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = "http://localhost:9000";
const NOW = "2026-09-20T00:00:00.000Z";
const pal = { name: "Harbour Dusk", slug: "harbour-dusk", userSlug: "test-user", tags: ["a"], versionCount: 3, voteCount: 1, visibility: "public", tier: "standard", currentHash: "p1", colors: [{css:"#123",position:0}], createdAt: NOW, updatedAt: NOW, isLocal: false };
const vers = [1,2,3].map((i)=>({hash:`r${i}`,payloadHash:`p${i}`,name:"H",colors:[{css:"#123",position:0}],createdAt:NOW,forkedFromHash:null}));
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.route((u) => /^\/(palettes|sessions|colors|admin|users|tags)(\/|$)/.test(u.pathname) && !/\.\w+$/.test(u.pathname), (r) => {
  const p = new URL(r.request().url()).pathname;
  const body = p === "/palettes" ? { data: [pal], nextCursor: null, hasMore: false } : p.endsWith("/versions") ? { data: vers, total: 30 } : p.startsWith("/sessions") ? { token: "t", userSlug: "test-user" } : { data: [] };
  return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
});
await page.addInitScript(() => { localStorage.setItem("palette-user-slug", "test-user"); localStorage.setItem("palette-user-token", "t"); });
await page.goto(`${BASE}/#/browse`, { timeout: 90000 });
await page.locator('[aria-label="Palette: Harbour Dusk"] button[aria-label="Palette menu"]').click({ timeout: 60000 });
await page.locator('[role="menuitem"]', { hasText: "Versions" }).click();
await page.locator('[role="dialog"] .group.relative').first().waitFor();
await page.waitForTimeout(800);
const out = await page.evaluate(() => {
  const dlg = document.querySelector('[role="dialog"]');
  const btns = [...dlg.querySelectorAll("button")].filter((b) => /Revert|Load older/.test(b.textContent));
  const rules = [];
  const walk = (list, layer) => { for (const r of list) { try {
    if (r.cssRules && !(r instanceof CSSStyleRule)) walk(r.cssRules, (r.name ?? r.conditionText ?? layer));
    if (r instanceof CSSStyleRule && r.style.fontStyle) for (const b of btns) { try { if (b.matches(r.selectorText)) rules.push({ btn: b.textContent.trim(), layer, sel: r.selectorText.slice(0, 160), fst: r.style.fontStyle }); } catch {} }
  } catch {} } };
  for (const s of document.styleSheets) { try { walk(s.cssRules, "(unlayered)"); } catch {} }
  return { computed: btns.map((b) => ({ t: b.textContent.trim(), fs: getComputedStyle(b).fontStyle, attrs: [...b.attributes].map((a) => `${a.name}=${a.value.slice(0,60)}`) })), rules };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
