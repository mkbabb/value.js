import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
const info = await p.evaluate(() => {
  const vis = e => { const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),vis:cs.visibility,disp:cs.display,op:cs.opacity}; };
  const out = {};
  out.heat = [...document.querySelectorAll(".spring-heatmap")].map(vis);
  out.marker = [...document.querySelectorAll(".spring-heatmap-marker")].map(e=>({...vis(e), tr:getComputedStyle(e).transform, trans:getComputedStyle(e).transition}));
  out.presetBalls = [...document.querySelectorAll(".preset-ball")].map(e=>({...vis(e),tr:e.style.transform}));
  out.buttons = [...document.querySelectorAll("button")].filter(e=>/Play|Reverse|Re-seat|Controls|Reset|Select anim/.test(e.getAttribute("aria-label")||e.textContent)).map(e=>({l:(e.getAttribute("aria-label")||e.textContent.trim()).slice(0,20),...vis(e)}));
  out.sliders = [...document.querySelectorAll("[role=slider]")].map(e=>({l:e.getAttribute("aria-label"),now:e.getAttribute("aria-valuenow"),max:e.getAttribute("aria-valuemax"),...vis(e)}));
  out.anims = document.getAnimations().map(a=>({n:a.animationName||a.transitionProperty||a.constructor.name, t:a.effect?.target?.className?.toString().slice(0,40), ps:a.playState}));
  out.trace = [...document.querySelectorAll(".plot-frame")].map(vis);
  out.editors = [...document.querySelectorAll(".keyframes-editor-scroll")].map(vis);
  // ancestors of the second heatmap
  const hs=[...document.querySelectorAll(".spring-heatmap")];
  out.heatAnc = hs.map(h=>{let a=[];let e=h;for(let i=0;i<12&&e;i++){a.push((e.tagName+"."+(e.className?.toString()||"")).slice(0,50));e=e.parentElement;}return a.slice(4);});
  return out;
});
console.log(JSON.stringify(info,null,0));
await b.close();
