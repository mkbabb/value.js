import { webkit } from "playwright";
const SEL='[role="textbox"][aria-label="Gradient CSS"]';
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:"light"});
const p=await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient",{waitUntil:"load"});
await p.waitForTimeout(3200);
await p.locator(SEL).scrollIntoViewIfNeeded();
await p.evaluate((s)=>{const el=document.querySelector(s);el.focus();const r=document.createRange();r.selectNodeContents(el);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);},SEL);
await p.keyboard.press("Backspace");
await p.keyboard.type("linear-gradient(90deg, oklch(), blue)",{delay:3});
await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(()=>{
  const els=[...document.querySelectorAll('main p')];
  const target=els.find(e=>/unexpected error/.test(e.textContent));
  const chain=[]; let n=target;
  while(n && n!==document.documentElement){ const cs=getComputedStyle(n);
    chain.push({tag:n.tagName, cls:(n.className||'').toString().slice(0,70), opacity:cs.opacity,
      animationName:cs.animationName, animationFillMode:cs.animationFillMode, animationPlayState:cs.animationPlayState,
      animationDuration:cs.animationDuration, transform:cs.transform.slice(0,40), visibility:cs.visibility,
      clipPath:cs.clipPath, contentVisibility:cs.contentVisibility, filter:cs.filter.slice(0,30), mixBlendMode:cs.mixBlendMode });
    n=n.parentElement; }
  return chain;
}),null,1));
const r=await p.evaluate(()=>{const e=[...document.querySelectorAll('main p')].find(x=>/unexpected error/.test(x.textContent));const b=e.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height};});
await p.screenshot({path:process.argv[2]+"/mtf001-boundary-2500ms.png"});
console.log("RECT "+JSON.stringify(r));
await b.close();
