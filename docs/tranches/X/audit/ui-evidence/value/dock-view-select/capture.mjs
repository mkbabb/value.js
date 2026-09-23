// dock-view-select capture (X §0bl UI audit seat). READ-ONLY on the app: only reads the served page.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:9000/";
const results = [];
const browser = await chromium.launch({ headless: false });
const probe = async (page) => page.evaluate(() => {
  const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; for (const p of props) o[p] = s.getPropertyValue(p); const r = el.getBoundingClientRect(); o.rect = [r.x, r.y, r.width, r.height].map(Math.round); return o; };
  const trig = document.querySelector('[aria-label="Select view"]');
  const content = document.querySelector('[role="listbox"]');
  const pop = content?.closest('[data-reka-popper-content-wrapper]')?.firstElementChild || content?.parentElement;
  const items = [...document.querySelectorAll('[role="option"]')];
  const sep = content?.querySelector('.border-t');
  return {
    trigger: cs(trig, ["border-radius", "height", "font-size", "font-family", "padding", "background-color", "box-shadow"]),
    triggerText: trig?.innerText,
    popover: cs(pop, ["border-radius", "padding", "background-color", "backdrop-filter", "box-shadow", "max-height", "overflow"]),
    listbox: cs(content, ["border-radius", "padding"]),
    items: items.map(i => ({ text: i.innerText.trim(), sel: i.getAttribute("aria-selected"), hl: i.hasAttribute("data-highlighted"), ...cs(i, ["border-radius", "height", "padding", "font-size", "font-weight", "color", "background-color"]) })),
    sep: cs(sep, ["border-top-color", "margin", "height"]),
    sepRole: sep?.getAttribute("role") ?? null,
    route: location.pathname + location.hash,
    vw: innerWidth,
  };
});
async function run({ scheme, vw, admin }) {
  const vp = vw === 1440 ? { width: 1440, height: 900 } : { width: 390, height: 844 };
  const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 2, hasTouch: vw === 390, isMobile: vw === 390 });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", e => errs.push(String(e)));
  page.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await ctx.addInitScript(({ admin }) => {
    try { if (admin) localStorage.setItem("palette-admin-token", "test-admin-token"); else localStorage.removeItem("palette-admin-token"); } catch {}
  }, { admin });
  await page.goto(BASE, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(2500);
  const tag = `${admin ? "admin" : "user"}-${vw}-${scheme}`;
  const trig = page.locator('[aria-label="Select view"]').first();
  await page.screenshot({ path: `${OUT}${tag}-00-closed.png` });
  await trig.screenshot({ path: `${OUT}${tag}-00-trigger.png` }).catch(() => {});
  await trig.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}${tag}-01-open.png` });
  const r1 = await probe(page);
  results.push({ tag, step: "open", ...r1, errs: [...errs] });
  if (admin) {
    // enter admin mode via the Admin row
    await page.locator('[role="option"]', { hasText: "Admin" }).first().click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}${tag}-02-admin-closed.png` });
    await trig.screenshot({ path: `${OUT}${tag}-02-admin-trigger.png` }).catch(() => {});
    await trig.click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}${tag}-03-admin-open.png` });
    // hover a row
    const opts = page.locator('[role="option"]');
    if (await opts.count() > 2) { await opts.nth(2).hover(); await page.waitForTimeout(300); await page.screenshot({ path: `${OUT}${tag}-04-admin-hover.png` }); }
    results.push({ tag, step: "admin-open", ...(await probe(page)), errs: [...errs] });
    // keyboard: ArrowDown focus
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}${tag}-05-admin-kbd.png` });
    // Back to app
    await page.locator('[role="option"]', { hasText: "Back to app" }).first().click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}${tag}-06-back.png` });
    results.push({ tag, step: "after-back", route: await page.evaluate(() => location.pathname), errs: [...errs] });
  } else {
    const opts = page.locator('[role="option"]');
    await opts.nth(3).hover(); await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}${tag}-02-hover.png` });
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}${tag}-03-kbd.png` });
    // select Mix, then reopen to show selection state
    await page.locator('[role="option"]', { hasText: "Mix" }).first().click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}${tag}-04-mix-closed.png` });
    await trig.screenshot({ path: `${OUT}${tag}-04-mix-trigger.png` }).catch(() => {});
    await trig.click(); await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}${tag}-05-mix-open.png` });
    results.push({ tag, step: "mix-open", ...(await probe(page)), errs: [...errs] });
    await page.keyboard.press("Escape");
  }
  await ctx.close();
}
for (const admin of [false, true]) for (const vw of [1440, 390]) for (const scheme of ["light", "dark"]) {
  try { await run({ scheme, vw, admin }); } catch (e) { results.push({ tag: `${admin ? "admin" : "user"}-${vw}-${scheme}`, error: String(e).slice(0, 400) }); }
}
await browser.close();
fs.writeFileSync(`${OUT}probe.json`, JSON.stringify(results, null, 1));
console.log("done", results.length);
