// finds the CSS rules painting the hovered row's box-shadow + 390 token readback (read-only)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const [w,h,mob] of [[1440,900,false],[390,844,true]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile:mob, hasTouch:mob, deviceScaleFactor:2 });
  const p = await ctx.newPage(); await p.goto("http://localhost:9000/#/", {waitUntil:"load", timeout:60000}); await p.waitForTimeout(3500);
  await p.locator('[aria-label="Select view"]').first().click(); await p.waitForTimeout(600);
  if (!mob) { await p.locator('[role="option"]').nth(2).hover(); await p.waitForTimeout(400); }
  const r = await p.evaluate(() => {
    const it = document.querySelectorAll('[role="option"]')[2];
    const hits = [];
    const walk = (rules, ctxt) => { for (const r of rules) { if (r.cssRules && !r.selectorText) walk(r.cssRules, ctxt + (r.conditionText||r.name||'')); else if (r.selectorText && r.style && (r.style.boxShadow || r.style.getPropertyValue('--tw-ring-shadow'))) { try { if (it.matches(r.selectorText)) hits.push(ctxt+' '+r.selectorText.slice(0,160)+' => '+(r.style.boxShadow||'').slice(0,120)); } catch {} } } };
    for (const ss of document.styleSheets) { try { walk(ss.cssRules, (ss.href||'inline').split('/').pop().slice(0,40)+'|'); } catch {} }
    const root = getComputedStyle(document.documentElement);
    return { hits, uiScale: root.getPropertyValue('--ui-scale'), control: root.getPropertyValue('--control-text'), itemFS: getComputedStyle(it).fontSize, trigFS: getComputedStyle(document.querySelector('[aria-label="Select view"]')).fontSize, focusVisible: it.matches(':focus-visible'), focus: it.matches(':focus') };
  });
  console.log(w, JSON.stringify(r, null, 1));
  await ctx.close();
}
await b.close();
