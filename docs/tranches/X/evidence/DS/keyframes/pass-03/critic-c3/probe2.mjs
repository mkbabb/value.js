import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/cube",{waitUntil:"load"}); await p.waitForTimeout(4500);
const out = {};
await p.locator(".pane-frame button", { hasText: /^layer$/ }).first().click(); await p.waitForTimeout(1200);
out.layer = await p.evaluate(() => {
  const f = document.querySelector(".pane-frame .panel-row--active") || document.querySelector(".pane-frame");
  return [...f.querySelectorAll("input,button,[role=switch]")].filter(e=>e.getBoundingClientRect().width>0).map(e=>({tag:e.tagName, cls:e.className.toString().slice(0,60), txt:(e.textContent||e.value||'').trim().slice(0,20), disabled:e.disabled, ariaDis:e.getAttribute('aria-disabled'), dataDis:e.getAttribute('data-disabled'), opacity:getComputedStyle(e).opacity, bg:getComputedStyle(e).backgroundColor, state:e.getAttribute('data-state')}));
});
await p.screenshot({path:"layer.png", clip:{x:60,y:50,width:430,height:470}});
await p.goto("http://localhost:5173/#/cube",{waitUntil:"load"}); await p.waitForTimeout(3000);
// timeline tab
const tabs = await p.evaluate(()=>[...document.querySelectorAll('button,[role=tab]')].filter(e=>e.getBoundingClientRect().width>0).map(e=>(e.getAttribute('aria-label')||e.textContent).trim().slice(0,30)));
out.tabs = tabs;
const tl = await p.evaluate(()=>{const t=[...document.querySelectorAll('button')].filter(e=>/timeline|keyframe/i.test(e.getAttribute('aria-label')||e.textContent)); return t.map(e=>(e.getAttribute('aria-label')||e.textContent).trim().slice(0,40))});
out.tl=tl;
console.log(JSON.stringify(out,null,1));
await b.close();
