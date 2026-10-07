import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [w,h] of [[1440,900],[390,844]]) {
const ctx = await b.newContext({ viewport:{width:w,height:h}, colorScheme:"light" }); const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/spring",{waitUntil:"load"}); await p.waitForTimeout(4500);
console.log(w, JSON.stringify(await p.evaluate(()=>{const R=(e)=>{const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y),Math.round(b.right),Math.round(b.height)]};
 const sec=document.querySelector('.spring-heatmap-section'); return {sec:R(sec), legend:R(sec.querySelector('[data-figure-legend]')), title:R(sec.querySelector('[data-figure-title]')), field:R(sec.querySelector('.spring-heatmap'))};})));
await ctx.close(); }
await b.close();
