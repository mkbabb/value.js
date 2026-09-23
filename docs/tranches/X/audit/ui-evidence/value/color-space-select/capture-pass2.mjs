// Pass 2 (read-only): viewport scroll, typeahead, 390 clip geometry, About (inline) host.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = "http://localhost:9000/#/";
const rep = {};
const browser = await chromium.launch({ headless: false });
for (const [vn, w, h, theme] of [["1440", 1440, 900, "light"], ["1440", 1440, 900, "dark"], ["390", 390, 844, "light"], ["390", 390, 844, "dark"]]) {
  const key = `${vn}-${theme}`; const r = (rep[key] = { console: [] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") r.console.push(m.text().slice(0, 160)); });
  for (let i = 0; i < 3; i++) {
    await page.goto(BASE, { waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(2500);
    r.aboutError = await page.getByText("This panel hit an unexpected error").count();
    if (!r.aboutError) break; await page.reload();
  }
  r.selectorCount = await page.locator('[aria-label="Select color space"]').count();
  const picker = page.locator('[aria-label="Select color space"]').first();
  await picker.scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}p2-${key}-11-closed-inview.png` });
  await picker.click(); await page.waitForTimeout(900);
  const geo = await page.evaluate(() => {
    const c = document.querySelector('[data-slot="select-content"]'); const v = document.querySelector('[data-slot="select-viewport"]');
    const rc = c.getBoundingClientRect(); const rows = [...document.querySelectorAll('[role="option"]')];
    const visible = rows.filter((o) => { const b = o.getBoundingClientRect(); const vb = v.getBoundingClientRect(); return b.top >= vb.top - 1 && b.bottom <= vb.bottom + 1; }).map((o) => o.dataset.space);
    const oog = [...document.querySelectorAll('.specimen-caption[data-out-of-gamut="true"]')].map((s) => s.closest('[role="option"]').dataset.space);
    const inC = document.querySelector('.specimen-caption[data-out-of-gamut="false"]'); const outC = document.querySelector('.specimen-caption[data-out-of-gamut="true"]');
    const nm = document.querySelector('.specimen-name');
    return { content: { l: rc.left, r: rc.right, w: rc.width, h: rc.height, radius: getComputedStyle(c).borderRadius }, vw: innerWidth, clippedRight: rc.right > innerWidth, viewport: { sh: v.scrollHeight, ch: v.clientHeight, st: v.scrollTop },
      fullyVisibleRows: visible, outOfGamutRows: oog, inkIn: inC && getComputedStyle(inC).color, inkOut: outC && getComputedStyle(outC).color,
      nameFont: nm && { size: getComputedStyle(nm).fontSize, fam: getComputedStyle(nm).fontFamily.slice(0, 30) }, dotOpacityIdle: getComputedStyle(document.querySelector('.specimen-dot-idle')).opacity };
  });
  r.open = geo;
  await page.screenshot({ path: `${OUT}p2-${key}-12-open.png` });
  await page.evaluate(() => { const v = document.querySelector('[data-slot="select-viewport"]'); v.scrollTop = v.scrollHeight / 2; }); await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}p2-${key}-13-open-mid.png` });
  await page.evaluate(() => { const v = document.querySelector('[data-slot="select-viewport"]'); v.scrollTop = v.scrollHeight; }); await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}p2-${key}-14-open-end.png` });
  // typeahead "ok"
  await page.keyboard.type("okl"); await page.waitForTimeout(500);
  r.typeaheadHighlighted = await page.evaluate(() => document.querySelector('[role="option"][data-highlighted]')?.dataset.space ?? null);
  await page.screenshot({ path: `${OUT}p2-${key}-15-typeahead.png` });
  await page.keyboard.press("Escape"); await page.waitForTimeout(400);
  // About inline host
  const about = page.locator('[aria-label="Select color space"]').nth(1);
  if (await about.count()) {
    await about.scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
    const ab = await about.boundingBox(); r.aboutTrigger = { box: ab, ...(await about.evaluate((el) => ({ fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight, text: el.textContent.trim() }))) };
    await page.screenshot({ path: `${OUT}p2-${key}-16-about-closed.png` });
    await about.click(); await page.waitForTimeout(900);
    r.aboutOpen = await page.evaluate(() => { const c = document.querySelector('[data-slot="select-content"]'); if (!c) return null; const b = c.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, h: b.height, vw: innerWidth }; });
    await page.screenshot({ path: `${OUT}p2-${key}-17-about-open.png` });
    await page.locator('[role="option"][data-space="hsl"]').click().catch((e) => r.console.push("about select fail"));
    await page.waitForTimeout(1200);
    r.aboutAfter = { pickerText: (await picker.textContent())?.trim(), aboutText: (await about.textContent())?.trim() };
    await page.screenshot({ path: `${OUT}p2-${key}-18-about-after-select.png` });
  }
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}report-pass2.json`, JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep, null, 1));
