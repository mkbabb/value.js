// READ-ONLY capture of fourier-analysis PaperSearchModal (Meta+K palette on /paper).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const URL_ = "http://localhost:3100/paper";
const repo = "/Users/mkbabb/Programming/fourier-analysis";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain | wc -l`).toString().trim();
const meta = { sha, dirty, at: new Date().toISOString(), url: URL_, runs: [] };
const browser = await chromium.launch({ headless: false });

const measure = (page) => page.evaluate(() => {
  const dc = document.querySelector('[role="dialog"]');
  if (!dc) return { open: false };
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  const cs = getComputedStyle(dc);
  const btns = [...dc.querySelectorAll("button")].filter(b => !b.closest('[role="listbox"]')).map(b => { const s = getComputedStyle(b); return { text: b.textContent.trim().slice(0, 20), aria: b.getAttribute("aria-label"), rect: r(b), radius: s.borderRadius, h: s.height }; });
  const input = dc.querySelector("input");
  const rows = [...dc.querySelectorAll('[role="option"]')];
  const row0 = rows[0];
  const badge = dc.querySelector(".paper-search-badge");
  const kbd = dc.querySelector("kbd");
  const empty = dc.querySelector(".search-modal-empty");
  const overlay = [...document.querySelectorAll("[data-slot*=overlay], .modal-overlay, [data-state=open]")].filter(e => e !== dc).map(e => ({ slot: e.getAttribute("data-slot"), cls: String(e.className).slice(0, 60), bg: getComputedStyle(e).backgroundColor, bf: getComputedStyle(e).backdropFilter })).slice(0, 4);
  return {
    open: true, rect: r(dc), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter, shadow: cs.boxShadow.slice(0, 90), border: cs.border, dismiss: dc.getAttribute("data-dismiss"),
    input: input && { rect: r(input), value: input.value, fs: getComputedStyle(input).fontSize, focused: document.activeElement === input, ph: input.placeholder },
    btns,
    rows: rows.length, row0: row0 && { rect: r(row0), radius: getComputedStyle(row0).borderRadius, bg: getComputedStyle(row0).backgroundColor, pad: getComputedStyle(row0).padding, cls: row0.className.slice(0, 120), minH: getComputedStyle(row0).minHeight, text: row0.textContent.trim().slice(0, 60) },
    rowsSelected: rows.map((o, i) => o.getAttribute("aria-selected") === "true" ? i : -1).filter(i => i >= 0),
    rowLabelsTruncated: rows.slice(0, 12).map(o => { const l = o.querySelector(".paper-search-label"); return l ? l.scrollWidth > l.clientWidth + 1 : null; }).filter(Boolean).length,
    badge: badge && { fs: getComputedStyle(badge).fontSize, radius: getComputedStyle(badge).borderRadius, color: getComputedStyle(badge).color, bg: getComputedStyle(badge).backgroundColor, text: badge.textContent.trim() },
    kbd: kbd && { fs: getComputedStyle(kbd).fontSize, radius: getComputedStyle(kbd).borderRadius, h: getComputedStyle(kbd).height },
    empty: empty && { text: empty.textContent.trim(), fs: getComputedStyle(empty).fontSize },
    overlay,
    active: document.activeElement?.outerHTML.slice(0, 140),
    bodyOverflow: getComputedStyle(document.body).overflow,
  };
});

for (const [vw, vh] of [[1440, 900], [390, 844]]) {
  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, hasTouch: vw < 500 });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
    await page.goto(URL_, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const tag = `${vw}-${theme}`;
    const run = { tag, isDark: await page.evaluate(() => document.documentElement.classList.contains("dark")), errs };
    // open via Meta+K (click body first so keydown lands in the document)
    await page.mouse.click(vw - 10, vh / 2).catch(() => {});
    await page.keyboard.press("Meta+k"); await page.waitForTimeout(900);
    let m = await measure(page);
    if (!m.open) { await page.keyboard.press("Control+k"); await page.waitForTimeout(900); m = await measure(page); run.usedCtrl = true; }
    run.openEmpty = m;
    await page.screenshot({ path: `${OUT}${tag}-1-open-empty.png` });
    // results
    await page.keyboard.type("fourier", { delay: 40 }); await page.waitForTimeout(700);
    run.results = await measure(page);
    await page.screenshot({ path: `${OUT}${tag}-2-results.png` });
    // keyboard selection
    await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300);
    run.afterArrow = { sel: (await measure(page)).rowsSelected };
    // hover a row (desktop)
    if (vw > 500) {
      const opt = page.locator('[role="option"]').nth(4);
      if (await opt.count()) { await opt.hover(); await page.waitForTimeout(250); run.afterHover = { sel: (await measure(page)).rowsSelected }; }
      await page.screenshot({ path: `${OUT}${tag}-3-hover-select.png` });
    }
    // Tab focus off input
    await page.locator('[role="dialog"] input').focus();
    await page.keyboard.press("Tab"); await page.waitForTimeout(250);
    run.tab1 = await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 140));
    await page.keyboard.press("Tab"); await page.waitForTimeout(250);
    run.tab2 = await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 140));
    await page.screenshot({ path: `${OUT}${tag}-4-tab-focus.png` });
    // no results
    const inp = page.locator('[role="dialog"] input');
    await inp.fill(""); await inp.type("zzqxjvw", { delay: 30 }); await page.waitForTimeout(600);
    run.noResults = await measure(page);
    await page.screenshot({ path: `${OUT}${tag}-5-no-results.png` });
    // Esc semantics: type a query, Esc, reopen, is query kept (footer says "esc collapse")?
    await inp.fill("theorem"); await page.waitForTimeout(500);
    await page.keyboard.press("Escape"); await page.waitForTimeout(600);
    run.afterEsc = { open: (await measure(page)).open, active: await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 100)) };
    await page.screenshot({ path: `${OUT}${tag}-6-after-esc.png` });
    await page.mouse.click(vw - 10, vh / 2).catch(() => {});
    await page.keyboard.press("Meta+k"); await page.waitForTimeout(800);
    run.reopenAfterEsc = await measure(page);
    await page.screenshot({ path: `${OUT}${tag}-7-reopen-after-esc.png` });
    // ✕ close button: does it keep the query?
    const x = page.locator('[role="dialog"] button[aria-label*="lose" i], [role="dialog"] [data-slot*="close"]').first();
    run.hasX = await x.count();
    if (run.hasX) {
      await page.locator('[role="dialog"] input').fill("lemma", { timeout: 4000 }).catch(e => run.xFillErr = String(e).slice(0, 120)); await page.waitForTimeout(400);
      await x.click().catch(e => run.xErr = String(e).slice(0, 200)); await page.waitForTimeout(600);
      await page.mouse.click(vw - 10, vh / 2).catch(() => {});
      await page.keyboard.press("Meta+k"); await page.waitForTimeout(800);
      run.reopenAfterX = (await measure(page)).input;
    }
    // Enter navigates
    run.openBeforeEnter = (await measure(page)).open;
    if (!run.openBeforeEnter) { await page.mouse.click(vw - 10, vh / 2).catch(() => {}); await page.keyboard.press("Meta+k"); await page.waitForTimeout(800); run.openBeforeEnter2 = (await measure(page)).open; }
    await page.locator('[role="dialog"] input').fill("parseval", { timeout: 4000 }).catch(e => run.enterErr = String(e).slice(0, 120)); await page.waitForTimeout(500);
    const beforeScroll = await page.evaluate(() => ({ y: scrollY, h: location.hash }));
    run.enterTarget = (await measure(page)).row0;
    await page.keyboard.press("Enter"); await page.waitForTimeout(1500);
    run.debugWrite = true;
    run.afterEnter = { open: (await measure(page)).open, before: beforeScroll, after: await page.evaluate(() => { const sc = document.querySelector(".paper-scroll, [data-scroll-container], main"); return { y: scrollY, h: location.hash, sc: sc ? sc.scrollTop : null }; }) };
    await page.screenshot({ path: `${OUT}${tag}-8-after-enter.png` });
    meta.runs.push(run);
    await ctx.close();
  }
}
// mobile route to the palette without a keyboard: tap the floating ToC search
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(URL_, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}390-light-9-mobile-bar.png` });
  const cands = await page.evaluate(() => [...document.querySelectorAll(".floating-toc button, .floating-toc [role=button]")].map(b => ({ aria: b.getAttribute("aria-label"), text: b.textContent.trim().slice(0, 30) })));
  const srch = page.locator('.floating-toc button[aria-label*="earch" i]').first();
  const m = { cands, found: await srch.count() };
  if (m.found) {
    await srch.tap(); await page.waitForTimeout(700);
    await page.keyboard.type("fourier", { delay: 40 }); await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}390-light-10-mobile-dropdown.png` });
    const exp = page.locator('button[aria-label="Expand the search palette"]');
    m.expandVisible = await exp.count();
    if (m.expandVisible) { const bb = await exp.first().boundingBox(); m.expandBox = bb; await exp.first().tap(); await page.waitForTimeout(900); m.palette = await measure(page); await page.screenshot({ path: `${OUT}390-light-11-mobile-expanded.png` }); }
  }
  meta.mobileRoute = m;
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}capture.json`, JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta, null, 1));
