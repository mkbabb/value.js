// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.spring · the served spring probe (rows KFA-38/40/41/44/156, UIA-KF-110/204/305/307/308, A2-KE-L3-8/9/12)
// usage: DIST=<dist> TAG=<before|after-1|…> node spring.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./frames/", import.meta.url).pathname;
const TAG = process.env.TAG || "before";
const srv = await serveDist(process.env.DIST);
const b = await chromium.launch();
const rect = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
for (const [w, h, theme] of [[1440, 900, "light"], [1440, 900, "dark"], [390, 844, "light"], [390, 844, "dark"]]) {
  const mob = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage();
  await p.goto(`${srv.url}/#/spring`, { waitUntil: "load" }); await p.waitForTimeout(2500);
  const k = `${w}-${theme}`;
  // ── rest on entry (KFA-38 / UIA-KF-204)
  const rest = await p.evaluate(async () => {
    const c = document.querySelector(".spring-carriage"); const t0 = c?.style.transform;
    await new Promise((r) => setTimeout(r, 800));
    return { badge: document.querySelector(".status-badge")?.textContent?.trim(), x: document.querySelector("[data-readout=primary]")?.textContent, carriage0: t0, carriage1: c?.style.transform, marker: document.querySelector(".spring-target-marker")?.style.transform };
  });
  await p.screenshot({ path: `${OUT}${TAG}-${k}-rest.png` });
  // ── rail focus ring (UIA-KF-305)
  await p.keyboard.press("Tab"); await p.locator(".spring-rail").focus(); await p.waitForTimeout(150);
  const ring = await p.evaluate(() => { const e = document.querySelector(".spring-rail"); const s = getComputedStyle(e); return { radius: s.borderRadius, shadow: s.boxShadow.slice(0, 60), focusVisible: e.matches(":focus-visible") }; });
  // ── ribbon Re-seat row (A2-KE-L3-8) + reseed action (A2-KE-L3-9) + facets (KFA-156) + presets (UIA-KF-110, A2-KE-L3-12) + heatmap (UIA-KF-307)
  const phys = p.locator("button, [role=tab]", { hasText: /^Physics$/ }).first();
  if (await phys.count()) { await phys.click({ force: true }).catch(() => {}); await p.waitForTimeout(900); }
  const pane = await p.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const reseat = [...document.querySelectorAll("button")].find((x) => /Re-seat/.test(x.textContent || ""));
    const reseed = document.querySelector('[aria-label="Write physics to keyframes"]') || [...document.querySelectorAll("button")].find((x) => /keyframes/i.test(x.textContent || "") && /physics|Write/i.test(x.textContent || ""));
    const tiles = [...document.querySelectorAll(".preset-cell")].filter(vis);
    const hm = [...document.querySelectorAll(".spring-heatmap")];
    return {
      reseat: reseat ? { r: (() => { const r = reseat.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; })(), parentW: Math.round(reseat.parentElement.getBoundingClientRect().width), inStage: !!reseat.closest(".spring-target") } : null,
      reseed: reseed ? { text: reseed.textContent.trim() || reseed.getAttribute("aria-label"), h: Math.round(reseed.getBoundingClientRect().height), headerRowY: (() => { const hdr = reseed.closest("[class*=configurator-layer]")?.querySelector("[aria-expanded]"); return hdr ? [Math.round(hdr.getBoundingClientRect().top), Math.round(reseed.getBoundingClientRect().top)] : null; })(), anc: [reseed.parentElement?.className, reseed.parentElement?.parentElement?.className].map((c) => String(c).slice(0, 40)) } : null,
      heatmaps: hm.length, heatmapsVisible: hm.filter(vis).length,
      tiles: tiles.map((t) => { const line = t.querySelector(".tabular-nums"); const tr = t.getBoundingClientRect(); const lr = line?.getBoundingClientRect(); return { h: Math.round(tr.height), bg: getComputedStyle(t).backgroundColor, overflowR: lr ? Math.round(lr.right - (tr.right - parseFloat(getComputedStyle(t).paddingRight))) : null }; }),
      heatmapBg: hm.filter(vis)[0] ? getComputedStyle(hm.filter(vis)[0]).backgroundColor : null,
      pipLabels: [...document.querySelectorAll(".spring-heatmap-pip")].filter(vis).length,
    };
  });
  await p.screenshot({ path: `${OUT}${TAG}-${k}-physics.png`, fullPage: false });
  console.log(`${TAG} ${k} rest ${JSON.stringify(rest)} ring ${JSON.stringify(ring)} pane ${JSON.stringify(pane)}`);
  await ctx.close();
}
await b.close(); await srv.close?.(); process.exit(0);
