// FRESH CONFIRM probe (READ-ONLY on app; no regenerate, no login submit).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
async function run(label, opts, fn) {
  const ctx = await b.newContext(opts.ctx);
  await ctx.addInitScript((o) => { localStorage.setItem("vueuse-color-scheme", o.theme); if (o.slug) localStorage.setItem("palette-user-slug", o.slug); }, opts);
  await ctx.route("https://github.com/**", (r) => r.fulfill({ status: 200, body: "stub" }));
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/", { waitUntil: "load", timeout: 60000 }); await p.waitForTimeout(3000);
  try { await fn(p, ctx); } catch (e) { console.log(label, "ERR", e.message.slice(0, 200)); }
  await ctx.close();
}
const mob = (theme, w = 390) => ({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: theme });
const fine = (theme) => ({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: theme });
async function openMenu(p) { await p.locator('[aria-label="Menu"]').first().click(); await p.waitForTimeout(700); }
async function measure(p) {
  return p.evaluate(() => {
    const menu = document.querySelector('[role="menu"]'); const mr = menu.getBoundingClientRect();
    const rows = [...menu.children].map((el) => { const s = getComputedStyle(el), r = el.getBoundingClientRect(); return { tag: el.tagName, role: el.getAttribute("role"), aria: el.getAttribute("aria-checked"), cls: String(el.className).slice(0, 90), txt: el.textContent.trim().replace(/\s+/g, " ").slice(0, 30), h: Math.round(r.height), fs: s.fontSize, ff: s.fontFamily.split(",")[0], color: s.color }; });
    const gh = [...menu.querySelectorAll('[role=menuitem]')].find((e) => e.textContent.trim() === "GitHub");
    const svg = gh?.querySelector("svg");
    const cs = getComputedStyle(document.documentElement);
    // which rule wins font-size on a row?
    let layerInfo = [];
    for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; }
      const walk = (rs, layer) => { for (const r of rs) { if (r instanceof CSSLayerBlockRule) walk(r.cssRules, (layer ? layer + "." : "") + r.name); else if (r.cssRules && !(r instanceof CSSStyleRule)) walk(r.cssRules, layer); else if (r.selectorText && /(^|[ ,])\.(text-small|text-muted-foreground|dropdown-menu__item|menu__item)(?![\w-])/.test(r.selectorText)) layerInfo.push({ sel: r.selectorText.slice(0, 70), layer: layer || "UNLAYERED", decl: r.style.cssText.slice(0, 90) }); } };
      walk(rules, "");
    }
    return { menu: { x: Math.round(mr.x), r: Math.round(mr.right), w: Math.round(mr.width), h: Math.round(mr.height) }, uiScale: cs.getPropertyValue("--ui-scale"), dropdownText: cs.getPropertyValue("--dropdown-text"), rows, gh: gh && { outer: gh.outerHTML.slice(0, 200), svgDisplay: svg && getComputedStyle(svg).display, aDisplay: getComputedStyle(gh.querySelector("a")).display }, layerInfo };
  });
}
await run("light-390-in-coarse", { theme: "light", slug: "vivid-heron-42", ctx: mob("light") }, async (p, ctx) => {
  await openMenu(p); console.log("L390in-coarse", JSON.stringify(await measure(p)));
  await p.screenshot({ path: `${OUT}c-light-390-in-open.png` });
  const walk = []; for (let i = 0; i < 10; i++) { await p.keyboard.press("ArrowDown"); walk.push(await p.evaluate(() => document.activeElement?.textContent.trim().replace(/\s+/g, " ").slice(0, 20))); }
  console.log("walk", JSON.stringify(walk));
  // Enter on GitHub
  await p.keyboard.press("Escape"); await p.waitForTimeout(300); await openMenu(p);
  for (let i = 0; i < 10; i++) { await p.keyboard.press("ArrowDown"); if ((await p.evaluate(() => document.activeElement?.textContent.trim())) === "GitHub") break; }
  const before = ctx.pages().length; await p.keyboard.press("Enter"); await p.waitForTimeout(1500);
  console.log("GitHub Enter pages", before, "->", ctx.pages().length);
  // copy slug feedback
  await p.keyboard.press("Escape").catch(()=>{}); await p.waitForTimeout(300); if (!(await p.locator('[role=menu]').isVisible())) await openMenu(p);
  await p.locator('[role=menuitem]').filter({ hasText: "Copy slug" }).click(); await p.waitForTimeout(500);
  console.log("after copy slug rows", JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('[role=menu] [role=menuitem]')].map((e) => e.textContent.trim()).slice(0, 2))));
  await p.keyboard.press("Escape"); await p.waitForTimeout(300); await openMenu(p);
  await p.locator('[role=menuitem]').filter({ hasText: "Switch account" }).click(); await p.waitForTimeout(900);
  console.log("slug-layer", JSON.stringify(await p.evaluate(() => { const f = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.right)]; }; const inp = document.querySelector('input[aria-label="Slug or admin token"]'); let d = inp; for (let i = 0; i < 8 && d; i++) { d = d.parentElement; if (d && getComputedStyle(d).overflow !== "visible") break; } const dr = d.getBoundingClientRect(); return { input: f('input[aria-label="Slug or admin token"]'), submit: f('[aria-label="Switch to slug"]'), regen: f('[aria-label="Generate new slug"]'), cancel: f('[aria-label="Cancel"]'), clip: [Math.round(dr.x), Math.round(dr.right), getComputedStyle(d).overflow] }; })));
  await p.screenshot({ path: `${OUT}c-light-390-in-slug-layer.png` });
});
await run("light-390-in-fine", { theme: "light", slug: "vivid-heron-42", ctx: fine("light") }, async (p) => {
  await openMenu(p); const m = await measure(p); console.log("L390in-fine", JSON.stringify({ menu: m.menu, uiScale: m.uiScale, rows: m.rows.map((r) => [r.txt, r.h, r.fs]) }));
  await p.screenshot({ path: `${OUT}c-light-390-in-open-fine.png` });
});
await run("dark-390-out-coarse", { theme: "dark", ctx: mob("dark") }, async (p) => {
  await openMenu(p); const m = await measure(p); console.log("D390out", JSON.stringify({ menu: m.menu, rows: m.rows.map((r) => [r.txt, r.role, r.aria, r.h, r.fs]) }));
  await p.screenshot({ path: `${OUT}c-dark-390-out-open.png` });
  await p.locator('[role=menuitem]').filter({ hasText: "Login" }).click(); await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}c-dark-390-out-login.png` });
});
await run("light-320-in-coarse", { theme: "light", slug: "vivid-heron-42", ctx: mob("light", 320) }, async (p) => {
  await openMenu(p); const m = await measure(p); console.log("L320in", JSON.stringify({ menu: m.menu }));
  await p.screenshot({ path: `${OUT}c-light-320-in-open.png` });
});
await b.close();
