// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.easing · the re-homed rows' served readings (UIA-KF-203 · 300 · 302)
// usage: node rehome.mjs <baseUrl> <tag>
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = new URL("./frames/", import.meta.url).pathname; const [BASE, TAG] = process.argv.slice(2);
const b = await chromium.launch(); const out = {};
// UIA-KF-203 — 390: the Curve sheet open; how much of the gallery shows above it
{ const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  await p.goto(`${BASE}/#/easing`, { waitUntil: "load" }); await p.waitForTimeout(3000);
  const curve = p.locator("button, [role=tab]", { hasText: /^\s*Curve\s*$/ }).first(); if (await curve.count()) { await curve.click({ force: true, timeout: 5000 }).catch(() => {}); await p.waitForTimeout(1200); }
  out["203"] = await p.evaluate(() => { const g = document.querySelector(".specimen-drawer").getBoundingClientRect(); const sheet = [...document.querySelectorAll("[role=dialog], [data-sheet], .sheet, [data-vaul-drawer]")].map((e) => e.getBoundingClientRect()).filter((r) => r.height > 0).sort((a, b) => a.top - b.top)[0]; const top = sheet ? sheet.top : innerHeight; return { galleryTop: Math.round(g.top), sheetTop: sheet ? Math.round(sheet.top) : null, galleryVisiblePx: Math.max(0, Math.round(Math.min(g.bottom, top) - g.top)), pickerVisible: !!document.querySelector("[aria-label='Easing curve editor']") }; });
  await p.screenshot({ path: `${OUT}${TAG}-203-390-curve-open.png` }); await ctx.close(); }
// UIA-KF-300 + UIA-KF-302 — 1440
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto(`${BASE}/#/easing`, { waitUntil: "load" }); await p.waitForTimeout(3000);
  const eye = p.locator("button[aria-label*='ball preview']").first(); const read = () => eye.evaluate((e) => ({ label: e.getAttribute("aria-label"), pressed: e.getAttribute("aria-pressed"), y: Math.round(e.getBoundingClientRect().top) }));
  const s0 = await read(); await eye.click(); await p.waitForTimeout(500); const s1 = await read(); await eye.click(); await p.waitForTimeout(400);
  out["300"] = { shown: s0, hidden: s1 };
  const kf = p.locator("button, [role=tab]", { hasText: /^\s*Keyframes\s*$/ }).first(); await kf.click({ force: true, timeout: 5000 }).catch(() => {}); await p.waitForTimeout(2500);
  out["302"] = await p.evaluate(() => { const m = document.querySelector(".monaco-editor"); if (!m) return { monaco: false }; const card = m.closest("[class*=card]") || m.parentElement; const c = card.getBoundingClientRect(), r = m.getBoundingClientRect(); return { monaco: true, overflowRight: Math.round(r.right - c.right), overflowBottom: Math.round(r.bottom - c.bottom), cardRadius: getComputedStyle(card).borderRadius }; });
  await p.screenshot({ path: `${OUT}${TAG}-302-1440-keyframes.png` }); await ctx.close(); }
console.log(JSON.stringify(out)); await b.close();
