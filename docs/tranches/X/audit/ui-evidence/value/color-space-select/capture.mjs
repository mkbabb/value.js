// Read-only UI audit capture — color-space-select. Headed Chromium, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000/#/";
const VPS = [["1440", 1440, 900], ["390", 390, 844]];
const THEMES = ["light", "dark"];
const report = {};
const browser = await chromium.launch({ headless: false });
for (const [vn, w, h] of VPS) for (const theme of THEMES) {
  const key = `${vn}-${theme}`; const r = (report[key] = { console: [] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) r.console.push(m.type() + ": " + m.text().slice(0, 200)); });
  page.on("pageerror", (e) => r.console.push("pageerror: " + e.message.slice(0, 200)));
  await page.goto(BASE, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(2500);
  const trig = page.locator('[aria-label="Select color space"]').first();
  r.triggerCount = await page.locator('[aria-label="Select color space"]').count();
  await trig.waitFor({ state: "visible", timeout: 10000 }).catch((e) => r.console.push("trigger not visible"));
  await page.screenshot({ path: `${OUT}${key}-01-closed-page.png` });
  const box = await trig.boundingBox(); r.triggerBox = box;
  r.trigger = await trig.evaluate((el) => { const cs = getComputedStyle(el); return { text: el.textContent.trim(), fontSize: cs.fontSize, fontWeight: cs.fontWeight, fontFamily: cs.fontFamily.slice(0, 60), color: cs.color, radius: cs.borderRadius, pad: cs.padding, bg: cs.backgroundColor, h: el.offsetHeight, w: el.offsetWidth }; });
  if (box) await page.screenshot({ path: `${OUT}${key}-02-closed-trigger.png`, clip: { x: Math.max(0, box.x - 40), y: Math.max(0, box.y - 40), width: Math.min(w - Math.max(0, box.x - 40), box.width + 360), height: box.height + 120 } });
  await trig.hover(); await page.waitForTimeout(400);
  if (box) await page.screenshot({ path: `${OUT}${key}-03-hover-trigger.png`, clip: { x: Math.max(0, box.x - 40), y: Math.max(0, box.y - 40), width: Math.min(w - Math.max(0, box.x - 40), box.width + 360), height: box.height + 120 } });
  // keyboard focus
  await page.mouse.move(2, h - 2); await trig.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
  r.focusIsTrigger = await trig.evaluate((el) => document.activeElement === el);
  if (box) await page.screenshot({ path: `${OUT}${key}-04-focus-trigger.png`, clip: { x: Math.max(0, box.x - 40), y: Math.max(0, box.y - 40), width: Math.min(w - Math.max(0, box.x - 40), box.width + 360), height: box.height + 120 } });
  // open
  await trig.click(); await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}${key}-05-open-listbox.png` });
  const lb = page.locator('[role="listbox"]').first();
  r.listbox = await lb.evaluate((el) => {
    let c = el; for (let i = 0; i < 4 && c; i++) { if (getComputedStyle(c).borderRadius !== "0px") break; c = c.parentElement; }
    const cs = getComputedStyle(c); const rc = c.getBoundingClientRect();
    const items = [...document.querySelectorAll('[role="option"]')];
    const it0 = items[0]; const ics = it0 ? getComputedStyle(it0) : null;
    const sel = items.find((i) => i.getAttribute("data-state") === "checked" || i.getAttribute("aria-selected") === "true");
    return { contentRadius: cs.borderRadius, contentBg: cs.backgroundColor, backdrop: cs.backdropFilter, rect: { x: rc.x, y: rc.y, w: rc.width, h: rc.height }, scrollH: el.scrollHeight, clientH: el.clientHeight, items: items.length,
      itemRadius: ics?.borderRadius, itemH: it0?.offsetHeight, itemPad: ics?.padding, selected: sel?.getAttribute("data-space"), selectedBg: sel ? getComputedStyle(sel).backgroundColor : null,
      names: items.map((i) => i.getAttribute("data-space")), captionsTruncated: [...document.querySelectorAll(".specimen-caption")].filter((s) => s.scrollWidth > s.clientWidth).length,
      overflowX: document.documentElement.scrollWidth > innerWidth };
  }).catch((e) => ({ err: e.message.slice(0, 200) }));
  const lbb = await lb.boundingBox().catch(() => null);
  // item hover/highlight
  const opt = page.locator('[role="option"]').nth(2);
  await opt.hover().catch(() => {}); await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}${key}-06-open-item-hover.png` });
  r.hoverItemBg = await opt.evaluate((el) => ({ bg: getComputedStyle(el).backgroundColor, radius: getComputedStyle(el).borderRadius, hl: el.getAttribute("data-highlighted") })).catch(() => null);
  // keyboard nav
  await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}${key}-07-open-keyboard.png` });
  // scroll to bottom of listbox
  await lb.evaluate((el) => (el.scrollTop = el.scrollHeight)).catch(() => {}); await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}${key}-08-open-scrolled-end.png` });
  // select a different space
  const target = r.trigger.text.toLowerCase().includes("oklch") ? "lab" : "oklch";
  await page.locator(`[role="option"][data-space="${target}"]`).click().catch((e) => r.console.push("select click failed " + e.message.slice(0, 100)));
  await page.waitForTimeout(900);
  await page.mouse.move(2, h - 2); await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}${key}-09-after-select.png` });
  r.after = { target, text: (await trig.textContent().catch(() => ""))?.trim(), listboxGone: (await page.locator('[role="listbox"]').count()) === 0 };
  // reopen to show selection marker
  await trig.click(); await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}${key}-10-reopen-selected.png` });
  r.reopenSel = await page.evaluate(() => [...document.querySelectorAll('[role="option"]')].filter((i) => i.getAttribute("aria-selected") === "true").map((i) => i.getAttribute("data-space")));
  await page.keyboard.press("Escape"); await page.waitForTimeout(400);
  r.escClosed = (await page.locator('[role="listbox"]').count()) === 0;
  r.focusAfterEsc = await trig.evaluate((el) => document.activeElement === el);
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
