import { webkit } from '@playwright/test';
const OUT='/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad';
const b = await webkit.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)',{waitUntil:'networkidle',timeout:60000});
await p.waitForTimeout(4000);
const m = await p.evaluate(() => {
  const card = document.querySelector('.about-card');
  if(!card) return {err:'no card'};
  const cr = card.getBoundingClientRect();
  const cs = getComputedStyle(card);
  const wide = [...card.querySelectorAll('*')].filter(e=>{
     const r=e.getBoundingClientRect(); return r.width>0 && r.right > cr.right + 1;
  }).slice(0,14).map(e=>({tag:e.tagName.toLowerCase(), cls:(e.className&&typeof e.className==='string'?e.className.split(/\s+/).slice(0,2).join('.'):''), w:Math.round(e.getBoundingClientRect().width), overshootPx: Math.round(e.getBoundingClientRect().right - cr.right)}));
  const katex = [...card.querySelectorAll('.katex-display, .katex')].map(e=>({w:Math.round(e.getBoundingClientRect().width), ox:getComputedStyle(e).overflowX}));
  const pres = [...card.querySelectorAll('pre')].map(e=>({w:Math.round(e.getBoundingClientRect().width), sw:e.scrollWidth, ox:getComputedStyle(e).overflowX}));
  return { cardW: Math.round(cr.width), cardOverflowX: cs.overflowX, cardScrollW: card.scrollWidth, cardClientW: card.clientWidth, wideCount: wide.length, wide, katexCount: katex.length, katexMax: Math.max(0,...katex.map(k=>k.w)), katexSample: katex.slice(0,4), pres: pres.slice(0,4) };
});
console.log(JSON.stringify(m,null,1));
await p.screenshot({path:OUT+'/about-katex-clip.png'});
await b.close();
