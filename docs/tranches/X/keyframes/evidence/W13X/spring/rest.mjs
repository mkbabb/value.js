// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.spring · measurement-only rows: KFA-39 (dock Reset), KFA-152/210 (LoAF on the first chase), KFA-157/187 (Entry view), UIA-KF-310/320 (390 facet)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./frames/", import.meta.url).pathname;
const TAG = process.env.TAG || "rest";
const srv = await serveDist(process.env.DIST);
const b = await chromium.launch();
{ // 1440 light — KFA-152/210, KFA-39, KFA-157/187
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.addInitScript(() => { window.__loaf = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push(Math.round(e.duration)); }).observe({ type: "long-animation-frame", buffered: false }); } catch {} });
  await p.goto(`${srv.url}/#/spring`, { waitUntil: "load" }); await p.waitForTimeout(2500);
  await p.locator(".spring-rail").focus();
  const chase = await p.evaluate(async () => {
    window.__loaf.length = 0; const dts = []; let last = performance.now();
    document.querySelector(".spring-rail").dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    const t0 = performance.now();
    while (performance.now() - t0 < 1500) { await new Promise((q) => requestAnimationFrame(q)); const n = performance.now(); dts.push(n - last); last = n; }
    return { maxDt: Math.round(Math.max(...dts)), over40: dts.filter((d) => d > 40).length, loaf: [...window.__loaf] };
  });
  await p.waitForTimeout(800);
  const x1 = await p.evaluate(() => document.querySelector("[data-readout=primary]")?.textContent?.trim());
  const reset = p.locator('[aria-label="Reset animation"]').filter({ visible: true }).first();
  const hasReset = await reset.count();
  if (hasReset) { await reset.click({ force: true }); await p.waitForTimeout(1500); }
  const x2 = await p.evaluate(() => document.querySelector("[data-readout=primary]")?.textContent?.trim());
  // Entry channel
  const sel = p.locator("[data-dock-tether=bottom] button, button", { hasText: /^Sweep/ }).filter({ visible: true }).first();
  let entry = null;
  if (await sel.count()) {
    await sel.click({ force: true }); await p.waitForTimeout(500);
    await p.locator("[role=option]", { hasText: /Entry/ }).first().click({ force: true }).catch(() => {}); await p.waitForTimeout(1200);
    entry = await p.evaluate(() => {
      const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const verbs = [...document.querySelectorAll("button")].filter(vis).filter((x) => /^(Dismiss|Reveal)/.test(x.textContent.trim())).map((x) => ({ y: Math.round(x.getBoundingClientRect().top), inStage: !!x.closest(".discrete-card, [class*=starting], .scene-host, main") }));
      const thumbs = [...document.querySelectorAll("[role=slider]")].filter(vis).map((t) => { const r = t.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; });
      const outs = [...document.querySelectorAll(".param-value")].filter(vis).map((o) => o.textContent.trim());
      const editor = [...document.querySelectorAll("*")].filter(vis).some((e) => /Keyframe offsets|@keyframes \(editable\)/.test(e.childNodes[0]?.nodeValue || ""));
      return { verbs, thumbs, outs, editor, vh: innerHeight };
    });
    await p.screenshot({ path: `${OUT}${TAG}-1440-light-entry.png` });
  }
  console.log(`${TAG} 1440 chase ${JSON.stringify(chase)} reset {"hasReset":${hasReset},"before":"${x1}","after":"${x2}"} entry ${JSON.stringify(entry)}`);
  await p.close();
}
{ // 390 dark — UIA-KF-310/320
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "dark", isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(`${srv.url}/#/spring`, { waitUntil: "load" }); await p.waitForTimeout(2500);
  const phys = p.locator("button, [role=tab]", { hasText: /^Physics$/ }).first();
  if (await phys.count()) { await phys.click({ force: true }).catch(() => {}); await p.waitForTimeout(1000); }
  const r = await p.evaluate(() => {
    const vis = (e) => { const q = e.getBoundingClientRect(); return q.width > 0 && q.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
    const hm = [...document.querySelectorAll(".spring-heatmap")].find(vis);
    const sec = hm?.closest(".spring-heatmap-section");
    const head = sec?.querySelector("[data-figure-title]")?.parentElement?.getBoundingClientRect();
    const legend = sec?.querySelector("[data-figure-legend]")?.getBoundingClientRect();
    const crit = sec?.querySelector(".spring-heatmap-critical")?.getBoundingClientRect();
    const labels = [...(sec?.querySelectorAll(".spring-heatmap-pip > span") ?? [])].filter(vis).map((e) => ({ t: e.textContent.trim(), r: e.getBoundingClientRect() }));
    const onCrit = crit ? labels.filter((l) => l.r.top < crit.top + 1 && l.r.bottom > crit.top - 1).map((l) => l.t) : null;
    // the scroll host of the facet (nearest scrollable ancestor)
    let sc = hm; while (sc && !(sc.scrollHeight > sc.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(sc).overflowY))) sc = sc.parentElement;
    const cs = sc ? getComputedStyle(sc) : null;
    const first = document.querySelector(".param-row");
    const fr = first?.getBoundingClientRect(); const sr = sc?.getBoundingClientRect();
    return { headH: head && Math.round(head.height), legendH: legend && Math.round(legend.height), labelsOnCriticalLine: onCrit,
      scroll: sc ? { cls: String(sc.className).slice(0, 80), scrollbarWidth: cs.scrollbarWidth, scrollbarColor: cs.scrollbarColor, mask: (cs.maskImage || cs.webkitMaskImage || "").slice(0, 60), firstRowTopInHost: fr && sr ? Math.round(fr.top - sr.top) : null } : null };
  });
  await p.screenshot({ path: `${OUT}${TAG}-390-dark-physics-sheet.png` });
  console.log(`${TAG} 390-dark ${JSON.stringify(r)}`);
  await ctx.close();
}
await b.close(); process.exit(0);
