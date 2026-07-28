import { webkit } from '@playwright/test';
const b = await webkit.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)',{waitUntil:'networkidle',timeout:60000});
await p.waitForTimeout(4000);
console.log(JSON.stringify(await p.evaluate(() => {
  const card=document.querySelector('.about-card'); const cr=card.getBoundingClientRect();
  const wraps=[...card.querySelectorAll('div.inline-block')].filter(e=>e.querySelector(':scope > .katex-display'))
    .map(e=>{const s=getComputedStyle(e);const r=e.getBoundingClientRect();
      return {ox:s.overflowX, disp:s.display, w:Math.round(r.width), clientW:e.clientWidth, scrollW:e.scrollWidth, scrollable: e.scrollWidth>e.clientWidth+1, over:Math.round(r.right-cr.right), parentTag:e.parentElement.tagName.toLowerCase(), parentCls:(typeof e.parentElement.className==='string'?e.parentElement.className.split(/\s+/).slice(0,2).join('.'):'')};});
  const inlineWraps=[...card.querySelectorAll('div.inline-block')].filter(e=>e.querySelector(':scope > .katex') && !e.querySelector(':scope > .katex-display'))
    .map(e=>{const s=getComputedStyle(e);const r=e.getBoundingClientRect();return {ox:s.overflowX,w:Math.round(r.width),scrollW:e.scrollWidth,over:Math.round(r.right-cr.right)};});
  return {cardW:Math.round(cr.width), displayWrapCount:wraps.length, wraps, inlineWrapOverflowing: inlineWraps.filter(x=>x.over>0)};
}),null,1));
await b.close();
