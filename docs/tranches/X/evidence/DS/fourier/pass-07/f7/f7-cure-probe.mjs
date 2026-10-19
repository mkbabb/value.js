// X-DS fourier pass 7 (critic F7) — AFTER frames and the cure measurements. Headless real Chrome only (§0ei).
// DS-F7-C5: the aside is scrolled by setting its scroller's scrollTop (no wheel at the viewport origin).
// Usage: node f7-cure-probe.mjs OUT [BASE]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3137";
const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.clear(); localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  ctx.setDefaultTimeout(60000);
  return ctx.newPage();
}
const caption = (p) => p.evaluate(() => [...document.querySelectorAll(".fn-layer *")].map((e) => e.childNodes.length === 1 && e.firstChild.nodeType === 3 ? e.textContent.trim() : "").find((t) => /^f\([a-z]\)$/.test(t)) ?? null);
const res = {};
const only = process.env.ONLY ? process.env.ONLY.split(",") : null;
const want = (n) => !only || only.includes(n);
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`;
  // /equation with a result (C1 caption after, C5 the aside scrolled to the Coefficients layer)
  if (want("equation")) {
    const p = await page(theme, w);
    await p.goto(BASE + "/equation", { waitUntil: "domcontentloaded" });
    const ok = await p.waitForResponse((r) => r.url().includes("/api/equations/compute"), { timeout: 120000 }).then((r) => r.status()).catch(() => null);
    await p.mouse.move(0, 0); await p.waitForTimeout(3500);
    await p.screenshot({ path: `${OUT}/equation-${k}.png` });
    const r = { computeStatus: ok, captionWithResult: await caption(p) };
    {
      // The aside's scroll box is glass's `.configurator-controls` (`.configurator-aside` itself does not scroll);
      // at 390 the Controls pane's box is the one with the most overflow. Set scrollTop directly.
      r.aside = await p.evaluate(() => { const els = [...document.querySelectorAll(".configurator-controls, .configurator-aside, main *")].filter((e) => e.scrollHeight > e.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(e).overflowY)); els.sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight)); const a = els[0]; if (!a) return null; a.scrollTop = a.scrollHeight; return { el: a.className.toString().slice(0, 60), scrollTop: Math.round(a.scrollTop), scrollHeight: a.scrollHeight, clientHeight: a.clientHeight }; });
      await p.waitForTimeout(1200);
      await p.screenshot({ path: `${OUT}/eq-aside-scrolled-${k}.png` });
    }
    res[`equation-${k}`] = r;
    await p.context().close();
  }
  // /equation failure state (C1 caption with no result, C2 the recovery action)
  if (want("error")) {
    const p = await page(theme, w);
    await p.route("**/api/equations/compute", (rt) => rt.fulfill({ status: 503, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503 }) }));
    await p.goto(BASE + "/equation", { waitUntil: "domcontentloaded" });
    await p.locator(".eq-state-failure").waitFor({ timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(1500);
    const r = { captionNoResult: await caption(p) };
    if (w === 390) { await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {}); await p.waitForTimeout(1000); }
    await p.mouse.move(0, 0); await p.waitForTimeout(500);
    r.retry = await p.evaluate(() => { const f = document.querySelector(".eq-state-failure"); const btn = f && [...f.querySelectorAll("button")].find((x) => /Try again/.test(x.textContent)); if (!btn) return null; const svg = btn.querySelector("svg"); const bb = btn.getBoundingClientRect(); return { label: btn.textContent.trim(), glyph: svg ? [...svg.classList].join(" ") : null, glyphLeadsLabel: !!svg && svg === btn.firstElementChild, w: Math.round(bb.width), h: Math.round(bb.height), boxShadow: getComputedStyle(btn).boxShadow }; });
    await p.screenshot({ path: `${OUT}/equation-error-${k}.png` });
    res[`equation-error-${k}`] = r;
    await p.context().close();
  }
  // /paper (C3) — the foot of the viewport mid-article
  if (want("paper")) {
    const p = await page(theme, w);
    await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded" });
    await p.locator(".paper-article").waitFor({ timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(3000);
    await p.evaluate(() => { const s = document.querySelector(".paper-scroll"); if (s) s.scrollTop = 2400; });
    await p.mouse.move(0, 0); await p.waitForTimeout(1500);
    res[`paper-${k}`] = await p.evaluate(() => { const r = document.querySelector(".paper-root"); const pe = (x) => { const c = getComputedStyle(r, x); return c.content === "none" || c.content === "normal" ? null : { content: c.content, left: c.left, right: c.right, bg: c.backgroundImage.slice(0, 60) }; }; return { before: pe("::before"), after: pe("::after") }; });
    await p.screenshot({ path: `${OUT}/paper-${k}.png` });
    if (w === 1440) { const vh = 900; await p.screenshot({ path: `${OUT}/paper-foot-crop-${theme}.png`, clip: { x: 0, y: vh - 140, width: 1440, height: 140 } }); }
    await p.context().close();
  }
  // /gallery (C4) — the toolbar's right edge against the grid's filled tracks
  if (want("gallery")) {
    const p = await page(theme, w);
    await p.goto(BASE + "/gallery", { waitUntil: "domcontentloaded" });
    await p.locator(".gallery-card").first().waitFor({ timeout: 60000 }).catch(() => {});
    await p.mouse.move(0, 0); await p.waitForTimeout(3000);
    res[`gallery-${k}`] = await p.evaluate(() => {
      const field = document.querySelector('[role="search"] input, [role="searchbox"]')?.closest(".search-pill") ?? document.querySelector(".search-pill");
      const fb = field?.getBoundingClientRect(); const cards = [...document.querySelectorAll(".gallery-card")].map((c) => c.getBoundingClientRect());
      const tabs = document.querySelector('[role="tablist"]')?.getBoundingClientRect();
      return { searchLeft: fb && Math.round(fb.left), searchRight: fb && Math.round(fb.right), searchW: fb && Math.round(fb.width), tabsRight: tabs && Math.round(tabs.right), cards: cards.length, cardW: cards[0] && Math.round(cards[0].width), filledRight: cards.length ? Math.round(Math.max(...cards.map((c) => c.right))) : null };
    });
    await p.screenshot({ path: `${OUT}/gallery-${k}.png` });
    await p.context().close();
  }
  // glass evidence (G1 /v hover at 1440, G2 /morph at 390) — cited, not cured
  if (want("glass") && theme === "light") {
    const p = await page(theme, w);
    if (w === 1440) {
      await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "domcontentloaded" });
      await p.waitForTimeout(8000);
      await p.mouse.move(175, 625); await p.waitForTimeout(1200);
      await p.screenshot({ path: `${OUT}/v-hover-${k}.png` });
    } else {
      await p.goto(BASE + "/morph", { waitUntil: "domcontentloaded" });
      await p.waitForTimeout(6000); await p.mouse.move(0, 0);
      await p.screenshot({ path: `${OUT}/morph-${k}.png` });
    }
    await p.context().close();
  }
}
console.log(JSON.stringify(res, null, 1));
await b.close();
