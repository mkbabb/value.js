import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const URL = "http://localhost:9000/#/";
const SLUG = "amaranthine-quokka-northern-marches";
const LONG = "a-very-long-generated-slug-name-for-overflow-testing-1234567890";

const out = {};
const browser = await webkit.launch();

async function mk({ w = 390, h = 844, isMobile = true, scheme = "light", ls = {}, forced = false }) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h }, deviceScaleFactor: 2,
    isMobile, hasTouch: isMobile, colorScheme: scheme,
    forcedColors: forced ? "active" : "none",
  });
  const page = await ctx.newPage();
  await page.addInitScript((l) => { for (const [k, v] of Object.entries(l)) localStorage.setItem(k, v); }, ls);
  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  return { ctx, page };
}

// (A) type scale: isMobile true vs false
for (const isMobile of [true, false]) {
  const { ctx, page } = await mk({ isMobile, ls: { "palette-user-slug": SLUG } });
  await page.locator(".dock-dropdown-trigger").first().click();
  await page.waitForTimeout(500);
  out[`type_isMobile_${isMobile}`] = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const it = document.querySelector('[role="menuitem"]');
    const p = document.querySelector('[role="menu"] p');
    const a = document.querySelector('[role="menu"] a[href*="github.com/mkbabb"]');
    const pill = document.querySelector('[role="menu"] .slug-pill');
    const menu = document.querySelector('[role="menu"]');
    const g = (e) => e ? (() => { const c = getComputedStyle(e); return { fam: c.fontFamily.split(",")[0].replace(/"/g, ""), size: c.fontSize, lh: c.lineHeight, weight: c.fontWeight, style: c.fontStyle, color: c.color }; })() : null;
    return {
      typeSmall: root.getPropertyValue("--type-small").trim(),
      typeMicro: root.getPropertyValue("--type-micro").trim(),
      fontDisplay: root.getPropertyValue("--font-display").trim().slice(0, 60),
      textSizeAdjust: getComputedStyle(document.body).webkitTextSizeAdjust || getComputedStyle(document.body).textSizeAdjust,
      htmlFontSize: root.fontSize,
      menu: g(menu), item: g(it), desc: g(p), ghLink: g(a), pill: g(pill),
    };
  });
  await ctx.close();
}

// (B) GitHub row anatomy + keyboard + escape + hidden twin census
{
  const { ctx, page } = await mk({ ls: { "palette-user-slug": SLUG } });
  out.twinCensus = await page.evaluate(() => {
    const trigs = [...document.querySelectorAll(".dropdown-menu__trigger, .dock-dropdown-trigger, [data-o18='profile-trigger']")];
    return {
      dropdownTriggers: trigs.length,
      detail: trigs.map((t) => { const r = t.getBoundingClientRect(); const cs = getComputedStyle(t); const par = t.closest("div"); return { cls: String(t.className).slice(0, 60), display: cs.display, w: +r.width.toFixed(1), h: +r.height.toFixed(1), text: (t.textContent || "").trim().slice(0, 20), parentDisplay: par ? getComputedStyle(par).display : null, parentCls: par ? String(par.className).slice(0, 40) : null }; }),
      lgHiddenWrappers: [...document.querySelectorAll(".hidden.lg\\:flex, .lg\\:hidden")].map((e) => ({ cls: String(e.className).slice(0, 40), display: getComputedStyle(e).display, childCount: e.childElementCount })),
    };
  });
  await page.locator(".dock-dropdown-trigger").first().click();
  await page.waitForTimeout(500);
  out.github = await page.evaluate(() => {
    const a = document.querySelector('[role="menu"] a[href*="github.com/mkbabb/value.js"]');
    if (!a) return null;
    const cs = getComputedStyle(a);
    const r = a.getBoundingClientRect();
    const svg = a.querySelector("svg"); const sr = svg.getBoundingClientRect();
    // text node rect
    const range = document.createRange();
    const tn = [...a.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
    let tr = null; if (tn) { range.selectNode(tn); tr = range.getBoundingClientRect(); }
    const share = document.querySelector('[role="menu"] [role="menuitem"]');
    return {
      display: cs.display, alignItems: cs.alignItems, flexWrap: cs.flexWrap, gap: cs.gap, padding: cs.padding, lineHeight: cs.lineHeight,
      rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), y: +r.y.toFixed(1) },
      svgRect: { x: +sr.x.toFixed(1), y: +sr.y.toFixed(1), w: +sr.width.toFixed(1), h: +sr.height.toFixed(1) },
      textRect: tr ? { x: +tr.x.toFixed(1), y: +tr.y.toFixed(1), w: +tr.width.toFixed(1), h: +tr.height.toFixed(1) } : null,
      sameLine: tr ? Math.abs(tr.y - sr.y) < 6 : null,
    };
  });
  // icon x-alignment across rows
  out.iconAlign = await page.evaluate(() =>
    [...document.querySelectorAll('[role="menu"] [role="menuitem"]')].map((el) => {
      const s = el.querySelector("svg"); const sr = s.getBoundingClientRect();
      const txt = (el.textContent || "").trim().slice(0, 18);
      // first text node x
      const tn = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()) || [...el.querySelectorAll("*")].find((n) => n.childNodes.length === 1 && n.firstChild.nodeType === 3);
      let tx = null; if (tn && tn.nodeType === 3) { const rg = document.createRange(); rg.selectNode(tn); tx = +rg.getBoundingClientRect().x.toFixed(1); }
      return { txt, iconX: +sr.x.toFixed(1), iconW: +sr.width.toFixed(1), iconH: +sr.height.toFixed(1), textX: tx };
    }));
  // keyboard: ArrowDown highlight, Escape restore
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(200);
  out.keyboard = await page.evaluate(() => {
    const h = document.querySelector('[data-highlighted]');
    const cs = h ? getComputedStyle(h) : null;
    return { highlighted: h ? (h.textContent || "").trim().slice(0, 20) : null, bg: cs ? cs.backgroundColor : null, outline: cs ? cs.outlineStyle + " " + cs.outlineWidth : null, boxShadow: cs ? cs.boxShadow.slice(0, 60) : null, activeEl: document.activeElement ? (document.activeElement.textContent || document.activeElement.className || "").toString().trim().slice(0, 30) : null };
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  out.afterEscape = await page.evaluate(() => ({
    menuPresent: !!document.querySelector('[role="menu"]'),
    activeEl: document.activeElement ? { tag: document.activeElement.tagName, cls: String(document.activeElement.className).slice(0, 50), label: document.activeElement.getAttribute && document.activeElement.getAttribute("aria-label") } : null,
  }));
  await ctx.close();
}

// (C) long slug overflow at 390 and 320
for (const w of [390, 320]) {
  const { ctx, page } = await mk({ w, h: 800, ls: { "palette-user-slug": LONG } });
  await page.locator(".dock-dropdown-trigger").first().click();
  await page.waitForTimeout(600);
  out[`longSlug_${w}`] = await page.evaluate(() => {
    const m = document.querySelector('[role="menu"]');
    const p = m.querySelector(".slug-pill");
    const mr = m.getBoundingClientRect(); const pr = p.getBoundingClientRect();
    return {
      viewport: document.documentElement.clientWidth,
      menu: { x: +mr.x.toFixed(1), w: +mr.width.toFixed(1), right: +mr.right.toFixed(1), h: +mr.height.toFixed(1) },
      pill: { w: +pr.width.toFixed(1), right: +pr.right.toFixed(1) },
      overflowRight: +(mr.right - document.documentElement.clientWidth).toFixed(1),
      pillClipped: pr.right > mr.right + 0.5,
      docScrollW: document.documentElement.scrollWidth, docClientW: document.documentElement.clientWidth,
      bodyOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  await page.screenshot({ path: `${OUT}/mmd-longslug-${w}.png` });
  await ctx.close();
}

// (D) forced-colors
{
  const { ctx, page } = await mk({ forced: true, ls: { "palette-admin-token": "t" } });
  await page.locator(".dock-dropdown-trigger").first().click();
  await page.waitForTimeout(600);
  out.forcedColors = await page.evaluate(() => {
    const m = document.querySelector('[role="menu"]');
    const pill = m ? m.querySelector(".slug-pill") : null;
    return {
      menuPresent: !!m,
      menuBg: m ? getComputedStyle(m).backgroundColor : null,
      pillColor: pill ? getComputedStyle(pill).color : null,
      pillBorder: pill ? getComputedStyle(pill).borderColor : null,
      forcedActive: matchMedia("(forced-colors: active)").matches,
    };
  });
  await page.screenshot({ path: `${OUT}/mmd-forced-admin.png` });
  await ctx.close();
}

// (E) zoom 200% equivalent (deviceScaleFactor irrelevant; use 195x422 CSS px)
{
  const { ctx, page } = await mk({ w: 195, h: 422, ls: { "palette-user-slug": SLUG } });
  out.zoom200 = await page.evaluate(() => ({ triggerPresent: !!document.querySelector(".dock-dropdown-trigger"), display: document.querySelector(".dock-dropdown-trigger") ? getComputedStyle(document.querySelector(".dock-dropdown-trigger").closest("div")).display : null }));
  try {
    await page.locator(".dock-dropdown-trigger").first().click({ timeout: 3000 });
    await page.waitForTimeout(600);
    out.zoom200.menu = await page.evaluate(() => { const m = document.querySelector('[role="menu"]'); if (!m) return null; const r = m.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), overflowRight: +(r.right - document.documentElement.clientWidth).toFixed(1), maxH: getComputedStyle(m).maxHeight }; });
  } catch (e) { out.zoom200.err = String(e).slice(0, 100); }
  await page.screenshot({ path: `${OUT}/mmd-zoom200.png` });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/mmd-probe2.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
