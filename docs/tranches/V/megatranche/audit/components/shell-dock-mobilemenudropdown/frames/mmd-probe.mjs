import { webkit } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] || "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const URL = "http://localhost:9000/#/";

const CASES = [
  { id: "logged-out-light", scheme: "light", w: 390, h: 844, ls: {} },
  { id: "logged-out-dark", scheme: "dark", w: 390, h: 844, ls: {} },
  { id: "logged-in-light", scheme: "light", w: 390, h: 844, ls: { "palette-user-slug": "amaranthine-quokka-northern-marches" } },
  { id: "logged-in-dark", scheme: "dark", w: 390, h: 844, ls: { "palette-user-slug": "amaranthine-quokka-northern-marches" } },
  { id: "admin-light", scheme: "light", w: 390, h: 844, ls: { "palette-admin-token": "probe-token" } },
  { id: "admin-dark", scheme: "dark", w: 390, h: 844, ls: { "palette-admin-token": "probe-token" } },
  { id: "logged-in-320", scheme: "light", w: 320, h: 640, ls: { "palette-user-slug": "amaranthine-quokka-northern-marches" } },
  { id: "logged-out-rtl", scheme: "light", w: 390, h: 844, ls: {}, rtl: true },
  { id: "logged-in-reduced", scheme: "light", w: 390, h: 844, ls: { "palette-user-slug": "amaranthine-quokka-northern-marches" }, reduced: true },
];

const results = [];

const browser = await webkit.launch();
for (const c of CASES) {
  const ctx = await browser.newContext({
    viewport: { width: c.w, height: c.h },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    colorScheme: c.scheme,
    reducedMotion: c.reduced ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  await page.addInitScript((ls) => {
    for (const [k, v] of Object.entries(ls)) localStorage.setItem(k, v);
  }, c.ls);
  const consoleErrs = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text().slice(0, 160)); });
  page.on("pageerror", (e) => consoleErrs.push("PAGEERROR " + String(e).slice(0, 160)));
  await page.goto(URL, { waitUntil: "load" });
  if (c.rtl) await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
  await page.waitForTimeout(3200);

  const rec = { id: c.id, consoleErrs };

  // ---- CLOSED state: the trigger ----
  rec.trigger = await page.evaluate(() => {
    const t = document.querySelector(".dock-dropdown-trigger");
    if (!t) return null;
    const r = t.getBoundingClientRect();
    const cs = getComputedStyle(t);
    const svg = t.querySelector("svg");
    const sr = svg ? svg.getBoundingClientRect() : null;
    return {
      tag: t.tagName, cls: t.className,
      rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      glyph: sr ? { w: +sr.width.toFixed(1), h: +sr.height.toFixed(1) } : null,
      ariaLabel: t.getAttribute("aria-label"),
      ariaExpanded: t.getAttribute("aria-expanded"),
      ariaHasPopup: t.getAttribute("aria-haspopup"),
      ariaControls: t.getAttribute("aria-controls"),
      dataState: t.getAttribute("data-state"),
      type: t.getAttribute("type"),
      bg: cs.backgroundColor, color: cs.color,
      padding: cs.padding, minW: cs.minWidth, minH: cs.minHeight,
      transition: cs.transitionProperty + " / " + cs.transitionDuration,
      wrapperDisplay: getComputedStyle(t.closest("div")).display,
    };
  });

  // sibling comparison: home trigger (select) rect, for optical balance
  rec.siblings = await page.evaluate(() => {
    const out = {};
    const sel = document.querySelector(".dock-select-trigger");
    if (sel) { const r = sel.getBoundingClientRect(); out.selectTrigger = { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }
    const seg = document.querySelector(".dock-mobile-panes");
    if (seg) { const r = seg.getBoundingClientRect(); out.segmented = { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }
    const plate = document.querySelector(".dock-plate") || document.querySelector(".glass-dock");
    if (plate) { const r = plate.getBoundingClientRect(); out.plate = { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }
    const prof = document.querySelector('[data-o18="profile-trigger"]');
    out.profileTriggerPresent = !!prof;
    return out;
  });

  await page.screenshot({ path: `${OUT}/mmd-${c.id}-closed.png` });

  // ---- OPEN it ----
  const trig = page.locator(".dock-dropdown-trigger").first();
  let opened = false;
  try { await trig.click({ timeout: 3000 }); opened = true; } catch (e) { rec.openErr = String(e).slice(0, 120); }
  await page.waitForTimeout(700);

  rec.afterOpen = await page.evaluate(() => {
    const t = document.querySelector(".dock-dropdown-trigger");
    return t ? { ariaExpanded: t.getAttribute("aria-expanded"), dataState: t.getAttribute("data-state") } : null;
  });

  rec.menu = await page.evaluate(() => {
    const c = document.querySelector('[role="menu"]');
    if (!c) return null;
    const r = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    const items = [...c.querySelectorAll('[role="menuitem"]')].map((el) => {
      const rr = el.getBoundingClientRect();
      const ecs = getComputedStyle(el);
      return {
        text: (el.textContent || "").trim().slice(0, 40),
        w: +rr.width.toFixed(1), h: +rr.height.toFixed(1), y: +rr.y.toFixed(1),
        font: ecs.fontFamily.split(",")[0].replace(/"/g, ""),
        size: ecs.fontSize, weight: ecs.fontWeight, color: ecs.color,
        pad: ecs.padding, gap: ecs.gap,
        icon: (() => { const s = el.querySelector("svg"); if (!s) return null; const sr = s.getBoundingClientRect(); return { w: +sr.width.toFixed(1), h: +sr.height.toFixed(1) }; })(),
      };
    });
    const seps = [...c.querySelectorAll('[role="separator"], .h-px, [data-orientation]')].map((el) => {
      const rr = el.getBoundingClientRect();
      return { cls: String(el.className).slice(0, 60), h: +rr.height.toFixed(2), y: +rr.y.toFixed(1), bg: getComputedStyle(el).backgroundColor };
    });
    const pill = c.querySelector(".slug-pill");
    const avatarLink = c.querySelector('a[href*="github.com/mkbabb"]');
    const al = avatarLink ? avatarLink.getBoundingClientRect() : null;
    const nonItemBlocks = [...c.children].map((el) => {
      const rr = el.getBoundingClientRect();
      return { tag: el.tagName, role: el.getAttribute("role"), cls: String(el.className).slice(0, 50), h: +rr.height.toFixed(1), y: +rr.y.toFixed(1) };
    });
    return {
      rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      overflowRight: +(r.right - document.documentElement.clientWidth).toFixed(1),
      overflowBottom: +(r.bottom - window.innerHeight).toFixed(1),
      font: cs.fontFamily.split(",")[0].replace(/"/g, ""),
      bg: cs.backgroundColor, minW: cs.minWidth, maxH: cs.maxHeight, overflowY: cs.overflowY,
      animName: cs.animationName, animDur: cs.animationDuration, transProp: cs.transitionProperty, transDur: cs.transitionDuration,
      itemCount: items.length, items, seps, nonItemBlocks,
      pill: pill ? (() => { const pr = pill.getBoundingClientRect(); const pcs = getComputedStyle(pill); return { text: pill.textContent.trim(), w: +pr.width.toFixed(1), h: +pr.height.toFixed(1), right: +pr.right.toFixed(1), color: pcs.color, border: pcs.borderColor, bw: pcs.borderWidth, font: pcs.fontFamily.split(",")[0].replace(/"/g, ""), size: pcs.fontSize, overflowsMenu: pr.right > r.right + 0.5 }; })() : null,
      avatarLink: al ? { w: +al.width.toFixed(1), h: +al.height.toFixed(1), text: avatarLink.textContent.trim() } : null,
      accentLive: getComputedStyle(document.documentElement).getPropertyValue("--accent-live").trim(),
    };
  });

  // focus-visible on first item
  rec.focus = await page.evaluate(() => {
    const el = document.querySelector('[role="menuitem"]');
    if (!el) return null;
    el.focus();
    const cs = getComputedStyle(el);
    return { outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineColor, boxShadow: cs.boxShadow.slice(0, 90), bg: cs.backgroundColor };
  });

  await page.screenshot({ path: `${OUT}/mmd-${c.id}-open.png` });
  results.push(rec);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${OUT}/mmd-probe.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
