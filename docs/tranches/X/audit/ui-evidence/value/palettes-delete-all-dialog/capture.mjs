// READ-ONLY capture: palettes delete-all dialog. Seeds localStorage (browser-side only).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:9000/";
const now = new Date().toISOString();
const mk = (i, name, cols) => ({ id: `local-${i}`, name, slug: name.toLowerCase().replace(/\s+/g, "-"),
  colors: cols.map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true });
const store = { version: 1, palettes: [
  mk(1, "Sunset Drift", ["#ff6b6b", "#feca57", "#ff9ff3", "#48dbfb"]),
  mk(2, "Forest Floor", ["#2d6a4f", "#40916c", "#95d5b2", "#d8f3dc", "#1b4332"]),
  mk(3, "Ink", ["#111827", "#374151", "#9ca3af"]),
]};
const log = [];
const browser = await chromium.launch({ headless: false });
for (const vp of [{ w: 1440, h: 900, n: "1440" }, { w: 390, h: 844, n: "390" }]) {
  for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2 });
    await ctx.addInitScript(([s, t]) => {
      try { localStorage.setItem("color-palettes", s); localStorage.setItem("vueuse-color-scheme", t); } catch {}
    }, [JSON.stringify(store), theme]);
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    await page.goto(BASE + "#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    const tag = `${vp.n}-${theme}`;
    await page.screenshot({ path: `${OUT}${tag}-0-pane.png` });
    const trig = page.getByRole("button", { name: "Delete all saved palettes" });
    const cnt = await trig.count();
    let rec = { tag, triggerCount: cnt };
    if (cnt) {
      await trig.first().scrollIntoViewIfNeeded();
      await trig.first().hover(); await page.waitForTimeout(300);
      rec.triggerBox = await trig.first().boundingBox();
      await page.screenshot({ path: `${OUT}${tag}-1-trigger-hover.png`, clip: { x: Math.max(0, rec.triggerBox.x - 200), y: Math.max(0, rec.triggerBox.y - 120), width: 320, height: 260 } });
      await trig.first().click(); await page.waitForTimeout(700);
      await page.screenshot({ path: `${OUT}${tag}-2-open.png` });
      const dlg = page.getByRole("alertdialog").or(page.getByRole("dialog"));
      rec.dialogRole = await page.evaluate(() => [...document.querySelectorAll('[role=dialog],[role=alertdialog]')].map(e => e.getAttribute('role')));
      const d = dlg.first();
      rec.dialogBox = await d.boundingBox().catch(() => null);
      rec.metrics = await page.evaluate(() => {
        const d = document.querySelector('[role=dialog],[role=alertdialog]'); if (!d) return null;
        const cs = (e) => { const c = getComputedStyle(e); return { r: c.borderRadius, bg: c.backgroundColor, bf: c.backdropFilter, pad: c.padding, fs: c.fontSize, fw: c.fontWeight, h: e.getBoundingClientRect().height, w: e.getBoundingClientRect().width, cls: e.className?.toString().slice(0, 240) }; };
        const btns = [...d.querySelectorAll('button')].map(b => ({ text: b.textContent.trim(), ...cs(b) }));
        const title = d.querySelector('h2,[id*=title]'); const desc = d.querySelector('p');
        const overlay = [...document.querySelectorAll('[data-state=open]')].filter(e => e !== d && getComputedStyle(e).position === 'fixed').map(cs);
        return { dialog: cs(d), title: title && { text: title.textContent.trim(), ...cs(title) }, desc: desc && { text: desc.textContent.trim(), ...cs(desc) }, btns, overlay, active: document.activeElement?.textContent?.trim().slice(0, 40), labelledby: d.getAttribute('aria-labelledby'), describedby: d.getAttribute('aria-describedby') };
      });
      // focus ring on keyboard traversal
      await page.keyboard.press("Tab"); await page.waitForTimeout(250);
      rec.afterTab = await page.evaluate(() => document.activeElement?.textContent?.trim());
      await page.screenshot({ path: `${OUT}${tag}-3-focus-tab.png` });
      if (rec.dialogBox) {
        const b = rec.dialogBox;
        await page.screenshot({ path: `${OUT}${tag}-4-dialog-crop.png`, clip: { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 16), width: Math.min(vp.w, b.width + 32), height: b.height + 32 } });
      }
      // Escape closes?
      await page.keyboard.press("Escape"); await page.waitForTimeout(500);
      rec.openAfterEsc = await page.locator('[role=dialog],[role=alertdialog]').count();
      // Cancel path
      await trig.first().click(); await page.waitForTimeout(600);
      await page.getByRole("button", { name: "Cancel" }).click(); await page.waitForTimeout(500);
      rec.openAfterCancel = await page.locator('[role=dialog],[role=alertdialog]').count();
      rec.storeAfterCancel = await page.evaluate(() => JSON.parse(localStorage.getItem('color-palettes')).palettes.length);
      // Confirm path (only in one run per viewport to record BROKEN/non-broken), dark run
      if (theme === "dark") {
        await trig.first().click(); await page.waitForTimeout(600);
        await page.getByRole("button", { name: "Delete all" }).click(); await page.waitForTimeout(900);
        rec.openAfterConfirm = await page.locator('[role=dialog],[role=alertdialog]').count();
        rec.storeAfterConfirm = await page.evaluate(() => JSON.parse(localStorage.getItem('color-palettes')).palettes.length);
        rec.triggerAfterConfirm = await trig.count();
        await page.screenshot({ path: `${OUT}${tag}-5-after-confirm.png` });
      }
    }
    rec.errors = errs.slice(0, 10);
    log.push(rec);
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}capture-log.json`, JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 2));
