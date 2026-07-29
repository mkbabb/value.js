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
await p.waitForTimeout(1400);
console.log(JSON.stringify(await p.evaluate(()=>{
  const walk=(n,out=[])=>{ for(const c of n.children){ if(c.children.length===0 && c.textContent.trim()) out.push(c); walk(c,out);} return out; };
  const m=document.querySelector('main');
  return walk(m).map(el=>{const cs=getComputedStyle(el); const r=el.getBoundingClientRect();
    return {tag:el.tagName, cls:(el.className||'').toString().slice(0,60), text:el.textContent.trim().slice(0,70),
      color:cs.color, opacity:cs.opacity, fontSize:cs.fontSize, visibility:cs.visibility, display:cs.display,
      rect:{x:+r.x.toFixed(0),y:+r.y.toFixed(0),w:+r.width.toFixed(0),h:+r.height.toFixed(0)}};});
}),null,1));
await p.screenshot({path:process.argv[2]+"/mtf001-boundary-state.png"});
await b.close();
