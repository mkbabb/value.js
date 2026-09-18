import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/admin/users",{waitUntil:"networkidle",timeout:45000});
await p.waitForTimeout(2500);
const out = await p.evaluate(() => {
  const btns=[...document.querySelectorAll("button")].filter(x=>/Prune empty|Refresh/.test(x.textContent||""));
  const r=btns.map(x=>{const cs=getComputedStyle(x);const rc=x.getBoundingClientRect();
    return {text:(x.textContent||"").trim(),html:x.outerHTML.slice(0,240),
      attrs:[...x.attributes].map(a=>a.name+"="+a.value).join(" | "),
      font:cs.fontFamily,size:cs.fontSize,style:cs.fontStyle,weight:cs.fontWeight,
      color:cs.color,bg:cs.backgroundColor,border:cs.borderWidth+" "+cs.borderColor,
      opacity:cs.opacity, w:Math.round(rc.width),h:Math.round(rc.height),x:Math.round(rc.x),y:Math.round(rc.y)};});
  const count=[...document.querySelectorAll("span")].find(s=>/^\d+ users?$/.test((s.textContent||"").trim()));
  const cc=count?getComputedStyle(count):null; const cr=count?count.getBoundingClientRect():null;
  const badge=[...document.querySelectorAll("*")].find(e=>e.className&&String(e.className).includes("badge"));
  // main + panel geometry
  const main=document.querySelector("main"); const mr=main?main.getBoundingClientRect():null;
  const cards=[...document.querySelectorAll("main *")].filter(e=>{const b=e.getBoundingClientRect();return b.width>300&&b.height>300;})
     .slice(0,6).map(e=>{const b=e.getBoundingClientRect();return `${e.tagName}.${String(e.className).split(/\s+/).slice(0,3).join(".")} ${Math.round(b.width)}x${Math.round(b.height)}@${Math.round(b.x)}`;});
  return {buttons:r, count: count?{text:count.textContent.trim(),font:cc.fontFamily,size:cc.fontSize,color:cc.color,x:Math.round(cr.x),y:Math.round(cr.y),w:Math.round(cr.width)}:null,
    mainW: mr?Math.round(mr.width):null, bigBoxes:cards, innerW: innerWidth};
});
console.log(JSON.stringify(out,null,1));
await b.close();
