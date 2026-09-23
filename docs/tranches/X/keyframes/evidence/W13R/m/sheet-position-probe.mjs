// SERVED MODEL: claude-opus-5-5
// KF.W13R.m — SHEET-POSITION probe (390x844 touch, /#/amiga, dev at 10.0.1): the mobile controls SheetContent geometry + every rule that sets its position.
import { withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const r = await withBrowser(async (b) => {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const p = await ctx.newPage();
  await p.goto("http://localhost:5173/#/amiga", { waitUntil: "load" }); await p.waitForTimeout(2500);
  const read = () => p.evaluate(() => {
    const s = document.querySelector('[data-slot="sheet-content"]');
    if (!s) return null; const cs = getComputedStyle(s); const r = s.getBoundingClientRect();
    const reg = s.querySelector('[data-slot="sheet-content-region"]');
    const rules=[]; for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch { continue; } const walk=(list,ctx)=>{ for (const ru of list) { if (ru.cssRules && !ru.selectorText) walk(ru.cssRules, ctx+" "+(ru.conditionText||ru.name||ru.constructor.name)); else if (ru.selectorText && ru.style && ru.style.position) { try { if (s.matches(ru.selectorText)) rules.push(ctx+" | "+ru.selectorText.slice(0,120)+" => "+ru.style.position); } catch {} } } }; walk(rs,""); }
    return { cls: s.className, rules, rect: [r.top, r.bottom, r.height].map(Math.round), bottom: cs.bottom, top: cs.top, height: cs.height, blockSize: cs.blockSize, position: cs.position, translate: cs.translate, transform: cs.transform, inlineStyle: s.getAttribute("style"), detentT: cs.getPropertyValue("--detent-t"), band: getComputedStyle(document.documentElement).getPropertyValue("--dock-band-reserve-stable"), region: reg && { h: Math.round(reg.getBoundingClientRect().height), sh: reg.scrollHeight, oy: getComputedStyle(reg).overflowY }, vh: innerHeight };
  });
  return { peek: await read() };
}, { launch: { headless: false } });
console.log(JSON.stringify(r.value ?? r, null, 1));
