// token/computed-style probe for dock-view-select (read-only)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const [w,h,mob] of [[1440,900,false],[390,844,true]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile:mob, hasTouch:mob, deviceScaleFactor:2 });
  const p = await ctx.newPage(); await p.goto("http://localhost:9000/#/", {waitUntil:"networkidle"}); await p.waitForTimeout(2000);
  await p.locator('[aria-label="Select view"]').first().click(); await p.waitForTimeout(600);
  const opts = p.locator('[role="option"]');
  if (!mob) { await opts.nth(2).hover(); await p.waitForTimeout(400); }
  const r = await p.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const lb = document.querySelector('[role="listbox"]');
    const content = lb.closest('[data-reka-popper-content-wrapper]').firstElementChild;
    const it = document.querySelectorAll('[role="option"]')[2];
    const s = getComputedStyle(it); const cs = getComputedStyle(content);
    const trig = document.querySelector('[aria-label="Select view"]');
    return { radiusCard: root.getPropertyValue('--radius-card'), uiScale: root.getPropertyValue('--ui-scale'), touch: root.getPropertyValue('--touch-target'), typeSmall: root.getPropertyValue('--type-small'), contentClass: content.className.slice(0,300), contentRadius: cs.borderRadius, itemClass: it.className, itemShadow: s.boxShadow, itemOutline: s.outline, itemBg: s.backgroundColor, itemMinH: s.minBlockSize, trigClass: trig.className, trigAria: [trig.getAttribute('aria-expanded'), trig.getAttribute('role'), trig.getAttribute('aria-haspopup')], trigSpanFS: getComputedStyle(trig.querySelector('span')||trig).fontSize, focused: document.activeElement?.getAttribute('role')+':'+document.activeElement?.textContent?.trim().slice(0,20) };
  });
  console.log(w, JSON.stringify(r, null, 1));
  await ctx.close();
}
await b.close();
