import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/easing",{waitUntil:"load"}); await p.waitForTimeout(5000);
const r = await p.evaluate(()=>{
  const t=[...document.querySelectorAll('.specimen-tile')];
  const cs=(e)=>{const c=getComputedStyle(e);return {cls:e.className, bg:c.backgroundColor, bgi:c.backgroundImage, bs:c.boxShadow, bf:c.backdropFilter, border:c.border, w:e.getBoundingClientRect().width}};
  return {rest:cs(t.find(x=>x.dataset.state==='off')), on:cs(t.find(x=>x.dataset.state==='on')), stage: document.querySelector('.tile-stage').getBoundingClientRect().toJSON(),
    plates:[...document.querySelectorAll('.square-stage,.easing-target,.spring-target,.glass-dock')].map(e=>[e.className.slice(0,40), e.getBoundingClientRect().toJSON()])};
});
console.log(JSON.stringify(r,null,1));
await b.close();
