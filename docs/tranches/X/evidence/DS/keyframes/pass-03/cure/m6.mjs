import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/spring",{waitUntil:"load"}); await p.waitForTimeout(5000);
const r = await p.evaluate(()=>{
  const s=document.querySelector('.controls-surface');
  const R=(e)=>{const b=e.getBoundingClientRect();return [Math.round(b.y),Math.round(b.height),Math.round(b.bottom)]};
  const kids=[...s.querySelectorAll('.spring-heatmap-section > *, .spring-heatmap')].map(e=>[e.className.slice(0,40),R(e)]);
  return {sh:s.scrollHeight, ch:s.clientHeight, s:R(s), kids, frame:R(document.querySelector('.pane-frame'))};
});
console.log(JSON.stringify(r));
await b.close();
