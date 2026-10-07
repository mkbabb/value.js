import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/spring",{waitUntil:"load"}); await p.waitForTimeout(5000);
const r = await p.evaluate(()=>[...document.querySelectorAll('[data-dock-tether]')].map(e=>{const b=e.getBoundingClientRect();const c=getComputedStyle(e);return [e.dataset.dockTether,e.className.slice(0,80),Math.round(b.y),Math.round(b.height),Math.round(b.bottom),c.bottom,c.top,c.paddingTop,c.paddingBottom, c.positionAnchor]}));
console.log(JSON.stringify(r));
await b.close();
