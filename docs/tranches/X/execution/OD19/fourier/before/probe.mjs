// OD19 fourier BEFORE probe — F1..F8, V1(fourier), ALL. Headless; ONE browser; context per cell; closed in finally.
// Run: ~/.claude/guard/guarded --timeout 20 -- node probe.mjs [cellFilter]
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:3100";
const VIZ = "/v/hazy-etching-cream-elk";
const only = process.argv[2];
const R = {};
const log = (...a) => console.log(...a);

// in-page rAF geometry sampler over every selector, for `ms`
async function trace(page, sels, ms) {
  return page.evaluate(([sels, ms]) => new Promise((res) => {
    const rows = []; const t0 = performance.now();
    const f = () => {
      const t = Math.round(performance.now() - t0);
      const row = { t };
      for (const [k, s] of Object.entries(sels)) {
        const e = document.querySelector(s); if (!e) { row[k] = null; continue; }
        const b = e.getBoundingClientRect(); const cs = getComputedStyle(e);
        row[k] = [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height), cs.getPropertyValue("--dock-morph-t").trim() || cs.transform.slice(0, 40), cs.borderTopLeftRadius];
      }
      rows.push(row);
      if (performance.now() - t0 < ms) requestAnimationFrame(f); else res(rows);
    };
    requestAnimationFrame(f);
  }), [sels, ms]);
}
const summarise = (rows, key) => {
  const v = rows.map((r) => r[key]).filter(Boolean);
  if (!v.length) return "absent";
  const xs = v.map((a) => a[0]), cx = v.map((a) => a[0] + a[2] / 2), ws = v.map((a) => a[2]), hs = v.map((a) => a[3]);
  const span = (a) => `${Math.min(...a)}..${Math.max(...a)}`;
  // jumps: frame-to-frame |dx|>12 or |dw|>40 (a discontinuity, not a spring step)
  let jumps = 0; for (let i = 1; i < v.length; i++) if (Math.abs(v[i][2] - v[i - 1][2]) > 40 || Math.abs(cx[i] - cx[i - 1]) > 12) jumps++;
  return `n=${v.length} x ${span(xs)} centreX ${span(cx.map(Math.round))} w ${span(ws)} h ${span(hs)} jumps=${jumps} r0=${v[0][5]} rEnd=${v.at(-1)[5]}`;
};
const docksInv = (page) => page.evaluate(() => [...document.querySelectorAll(".glass-dock")].map((d) => {
  const q = (s) => { const e = d.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), r: cs.borderTopLeftRadius, r2: cs.borderStartStartRadius, clip: cs.clipPath.slice(0, 60), anim: cs.animationName, ovf: cs.overflow }; };
  const b = d.getBoundingClientRect(); const run = d.querySelector(".dock-run");
  return { cls: d.className, box: [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)], plate: q(".dock-plate"), persistent: q(".dock-persistent"), summary: q(".dock-layer--summary"), full: q(".dock-layer--full"), run: run && [run.scrollWidth, run.clientWidth, run.scrollLeft], kids: [...d.querySelectorAll(".dock-layer--summary > *, .dock-persistent > *")].map((e) => { const r = e.getBoundingClientRect(); return `${(e.className?.baseVal ?? e.className ?? e.tagName).toString().slice(0, 30)}:${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} "${e.textContent.trim().slice(0, 8)}"`; }) };
}));
const shot = async (page, name, el, pad = 24) => {
  try {
    if (!el) return page.screenshot({ path: `${OUT}${name}.png` });
    const b = await el.boundingBox(); if (!b) return;
    const vp = page.viewportSize();
    const x = Math.max(0, b.x - pad), y = Math.max(0, b.y - pad);
    await page.screenshot({ path: `${OUT}${name}.png`, clip: { x, y, width: Math.min(vp.width - x, b.width + 2 * pad), height: Math.min(vp.height - y, b.height + 2 * pad) } });
  } catch (e) { log("shot fail", name, e.message.slice(0, 80)); }
};

const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const w of [1440, 390]) {
    const cell = `${scheme}-${w}`; if (only && !cell.includes(only)) continue;
    const H = w === 390 ? 844 : 900; const C = (R[cell] = {});
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme, deviceScaleFactor: 2, hasTouch: false });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + VIZ, { waitUntil: "load" });
      if (w === 390) { await page.waitForTimeout(2500); await page.getByText("Canvas", { exact: true }).first().click(); }
      await page.waitForSelector(".animation-dock", { timeout: 15000 });
      await page.waitForTimeout(2500);
      await page.mouse.move(2, H / 2);
      await shot(page, `${cell}-viz`);
      C.inv = await docksInv(page);
      const anim = page.locator(".animation-dock"), small = page.locator(".glass-dock.fit-content").first(), app = page.locator(".app-dock");
      // V1/F6 app dock + toggle
      await shot(page, `${cell}-V1-appdock`, await app.elementHandle(), 12);
      C.toggle = await page.evaluate(() => { const d = document.querySelector(".app-dock"); return [...d.querySelectorAll("button, a, [role=button]")].map((e) => { const b = e.getBoundingClientRect(); return `${(e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 18)} ${Math.round(b.width)}x${Math.round(b.height)}`; }); });
      // F1 collapsed transport dock
      await shot(page, `${cell}-F1-transport-collapsed`, await anim.elementHandle(), 28);
      // F1/F2 expand trace (transport)
      const ab = await anim.boundingBox();
      const sel = { dock: ".animation-dock", plate: ".animation-dock .dock-plate", play: ".animation-dock .dock-persistent", summary: ".animation-dock .dock-layer--summary", full: ".animation-dock .dock-layer--full" };
      const pE = trace(page, sel, 1400); await page.mouse.move(ab.x + ab.width / 2, ab.y + ab.height / 2); const tE = await pE;
      C.F1_expand = Object.fromEntries(Object.keys(sel).map((k) => [k, summarise(tE, k)]));
      await page.waitForTimeout(300);
      await shot(page, `${cell}-F1-transport-expanded`, await anim.elementHandle(), 28);
      C.inv_expanded = (await docksInv(page)).find((d) => d.cls.includes("animation-dock"));
      // collapse trace
      await page.mouse.move(2, H / 2); await page.waitForTimeout(3300);
      const tC = await trace(page, sel, 1500);
      C.F1_collapse = Object.fromEntries(Object.keys(sel).map((k) => [k, summarise(tC, k)]));
      writeFileSync(`${OUT}${cell}-F1-trace.json`, JSON.stringify({ expand: tE, collapse: tC }));
      // frame strip of the transport expand (screenshots, ~1 per 70-100 ms)
      { const sb = await anim.boundingBox(); await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2);
        for (let i = 0; i < 6; i++) await page.screenshot({ path: `${OUT}${cell}-F2-strip-transport-${i}.png`, clip: { x: 0, y: Math.max(0, sb.y - 20), width: w, height: sb.height + 40 } });
        await page.mouse.move(2, H / 2); await page.waitForTimeout(4600); }
      // F2 small dock (fit-content) trace
      if (await small.count()) {
        const sb = await small.boundingBox();
        const ssel = { dock: ".glass-dock.fit-content", plate: ".glass-dock.fit-content .dock-plate", full: ".glass-dock.fit-content .dock-layer--full", summary: ".glass-dock.fit-content .dock-layer--summary" };
        await shot(page, `${cell}-F2-small-collapsed`, await small.elementHandle(), 28);
        const p2 = trace(page, ssel, 1400); await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2); const t2 = await p2;
        C.F2_small_expand = Object.fromEntries(Object.keys(ssel).map((k) => [k, summarise(t2, k)]));
        for (let i = 0; i < 4; i++) await page.screenshot({ path: `${OUT}${cell}-F2-strip-small-${i}.png`, clip: { x: Math.max(0, w - 520), y: Math.max(0, sb.y - 20), width: Math.min(w, 520), height: sb.height + 40 } });
        await page.mouse.move(2, H / 2); await page.waitForTimeout(3300);
        const t3 = await trace(page, ssel, 1500);
        C.F2_small_collapse = Object.fromEntries(Object.keys(ssel).map((k) => [k, summarise(t3, k)]));
        writeFileSync(`${OUT}${cell}-F2-trace.json`, JSON.stringify({ expand: t2, collapse: t3 }));
      }
      // F3/F4: open the ⋯ menu, then leave the dock; does the dock collapse with the menu still open?
      { const sb = await anim.boundingBox(); await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2); await page.waitForTimeout(900);
        const trig = page.locator('.animation-dock [aria-label="More options"]');
        await trig.click(); await page.waitForTimeout(500);
        await shot(page, `${cell}-F3-overflow-menu`);
        C.F3_menu = await page.evaluate(() => { const m = document.querySelector('[role="menu"]'); if (!m) return null; const b = m.getBoundingClientRect(); return { box: [b.x, b.y, b.width, b.height].map(Math.round), labels: [...m.querySelectorAll('[role="group"], [role="menuitemradio"]')].length, text: m.innerText.replace(/\s+/g, " ").slice(0, 120) }; });
        await page.mouse.move(2, 2); await page.waitForTimeout(400); await page.mouse.move(4, H - 4);
        await page.waitForTimeout(4800);
        C.F4_after_leave = await page.evaluate(() => ({ dock: document.querySelector(".animation-dock").className, menuOpen: !!document.querySelector('[role="menu"]'), trigInert: !!document.querySelector('.animation-dock [aria-label="More options"]')?.closest("[inert]") }));
        await shot(page, `${cell}-F4-after-leave`);
        // the other path: focus leaves (keyboard) while menu open
        await page.keyboard.press("Escape"); await page.waitForTimeout(400);
      }
      // F8: the timeline caret ("time popover") — hover the rail
      { const sb = await anim.boundingBox(); await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2); await page.waitForTimeout(900);
        const row = page.locator(".animation-dock .timeline-row"); const rb = await row.boundingBox();
        if (rb) { await page.mouse.move(rb.x + rb.width * 0.4, rb.y + rb.height / 2); await page.waitForTimeout(500);
          C.F8 = await page.evaluate(() => { const c = document.querySelector(".animation-dock .caret-value"); if (!c) return null; const b = c.getBoundingClientRect(); const out = { caret: [b.x, b.y, b.width, b.height].map(Math.round), opacity: getComputedStyle(c.closest(".timeline-caret")).opacity, clippers: [] };
            for (let e = c.parentElement; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.overflow !== "visible" || cs.clipPath !== "none" || cs.contain.includes("paint")) { const r = e.getBoundingClientRect(); out.clippers.push(`${String(e.className).slice(0, 50)} ovf=${cs.overflow} clip=${cs.clipPath.slice(0, 40)} contain=${cs.contain} box=${Math.round(r.y)}..${Math.round(r.bottom)}`); } } return out; });
          await page.screenshot({ path: `${OUT}${cell}-F8-caret.png`, clip: { x: 0, y: Math.max(0, rb.y - 80), width: w, height: rb.height + 120 } }); }
        await page.mouse.move(2, H / 2); }
      // F5: the "Image" layer header in the controls panel
      if (w === 390) { await page.getByText("Controls", { exact: true }).first().click(); await page.waitForTimeout(600); }
      C.F5 = await page.evaluate(() => { const h = [...document.querySelectorAll("button, h2, h3, summary, [role=button], span")].find((e) => e.textContent.trim() === "Image"); if (!h) return null; const out = []; let e = h;
        for (let i = 0; i < 7 && e; i++, e = e.parentElement) { const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); out.push(`${e.tagName}.${String(e.className).slice(0, 60)} ${Math.round(b.width)}x${Math.round(b.height)} border=${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor} outline=${cs.outlineStyle} shadow=${cs.boxShadow.slice(0, 50)} r=${cs.borderTopLeftRadius} bg=${cs.backgroundColor} ovf=${cs.overflow}`); } return out; });
      { const h = page.getByText("Image", { exact: true }).first(); if (await h.count()) { await h.scrollIntoViewIfNeeded().catch(() => {}); const p = await h.evaluateHandle((e) => e.closest("section, details, [class*=layer], [class*=Layer]") ?? e.parentElement); await shot(page, `${cell}-F5-image-panel`, p, 16); } }
      // F7: equation sliders (double border)
      await page.goto(BASE + "/equation", { waitUntil: "load" }); await page.waitForTimeout(2500);
      C.F7 = await page.evaluate(() => [...document.querySelectorAll('[role="slider"]')].slice(0, 3).map((t) => { const out = []; let e = t; for (let i = 0; i < 6 && e; i++, e = e.parentElement) { const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); out.push(`${e.tagName}.${String(e.className).slice(0, 48)} ${Math.round(b.width)}x${Math.round(b.height)} bw=${cs.borderTopWidth}/${cs.borderTopStyle} shadow=${cs.boxShadow.slice(0, 40)} out=${cs.outlineStyle} bg=${cs.backgroundColor.slice(0, 28)}`); } return out; }));
      { const s = page.locator('[role="slider"]').first(); if (await s.count()) { const root = await s.evaluateHandle((e) => e.closest(".slider-control, [class*=slider-control], [class*=SliderControl]") ?? e.parentElement.parentElement.parentElement); await shot(page, `${cell}-F7-slider`, root, 12); } }
      // ALL: route→route transition (router push), rAF trace of main's first child
      C.routeTx = {};
      for (const to of ["/gallery", "/paper", VIZ, "/equation"]) {
        const p = page.evaluate((ms) => new Promise((res) => { const rows = []; const t0 = performance.now(); let firstNew = null; const start = document.querySelector("main")?.firstElementChild;
          const f = () => { const m = document.querySelector("main"); const c = m?.firstElementChild; const t = Math.round(performance.now() - t0);
            if (c && c !== start && firstNew === null) firstNew = t;
            const cs = c ? getComputedStyle(c) : null; const b = c?.getBoundingClientRect();
            rows.push([t, cs ? +(+cs.opacity).toFixed(2) : null, cs?.transform.slice(0, 30), b ? Math.round(b.y) : null, b ? Math.round(b.height) : null, !!document.querySelector("[aria-busy=true]"), (m?.innerText ?? "").includes("Loading")]);
            if (performance.now() - t0 < ms) requestAnimationFrame(f); else res({ firstNew, rows }); };
          requestAnimationFrame(f); }), 1600);
        await page.evaluate((to) => document.querySelector("#app").__vue_app__.config.globalProperties.$router.push(to), to);
        const r = await p; const ops = r.rows.map((x) => x[1]).filter((x) => x !== null); const ys = r.rows.map((x) => x[3]).filter((x) => x !== null);
        C.routeTx[to] = `newChildAt=${r.firstNew}ms opacity ${Math.min(...ops)}..${Math.max(...ops)} y ${Math.min(...ys)}..${Math.max(...ys)} busyFrames=${r.rows.filter((x) => x[5]).length} loadingTextFrames=${r.rows.filter((x) => x[6]).length} frames=${r.rows.length}`;
        writeFileSync(`${OUT}${cell}-routeTx${to.replace(/\W/g, "_")}.json`, JSON.stringify(r.rows));
        await page.waitForTimeout(600);
      }
    } catch (e) { C.error = e.message.slice(0, 300); log(cell, "ERROR", C.error); }
    finally { await ctx.close(); }
    // ALL: cold load per route (fresh context, light only)
    if (scheme === "light") {
      C.cold = {};
      for (const route of ["/paper", "/visualize", VIZ, "/gallery", "/equation", "/morph"]) {
        const c2 = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme });
        const p2 = await c2.newPage();
        try {
          await p2.addInitScript(() => { window.__lcp = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = Math.round(e.startTime); }).observe({ type: "largest-contentful-paint", buffered: true }); });
          await p2.goto(BASE + route, { waitUntil: "load" });
          await p2.waitForFunction(() => { const m = document.querySelector("main"); return m && m.innerText.trim().length > 20 && !m.innerText.includes("Loading") && !document.querySelector("main [aria-busy=true]"); }, null, { timeout: 20000 }).catch(() => {});
          const t = await p2.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; const res = performance.getEntriesByType("resource"); return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), ready: Math.round(performance.now()), lcp: window.__lcp, fcp: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? -1), nRes: res.length, kb: Math.round(res.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024), loadingText: document.body.innerText.includes("Loading") }; });
          await p2.waitForTimeout(1500); t.lcpLate = await p2.evaluate(() => window.__lcp);
          C.cold[route] = t;
        } catch (e) { C.cold[route] = e.message.slice(0, 120); } finally { await c2.close(); }
      }
    }
    log(cell, JSON.stringify(C, null, 1).slice(0, 6000));
  }
} finally { await browser.close(); }
writeFileSync(`${OUT}probe-${only ?? "all"}.json`, JSON.stringify(R, null, 1));
