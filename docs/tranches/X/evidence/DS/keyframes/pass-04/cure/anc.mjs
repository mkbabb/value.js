import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(6000);
const r = await p.evaluate(() => {
  const o=[]; let e=document.querySelector(".square-stage");
  while(e){const s=getComputedStyle(e);
    const f={filter:s.filter,op:s.opacity,wc:s.willChange,mask:s.maskImage,cp:s.clipPath,mbm:s.mixBlendMode,bf:s.backdropFilter,tf:s.transform==="none"?"":"T",iso:s.isolation,cont:s.contain,ov:s.overflow};
    o.push(e.tagName+"."+e.className.toString().split(" ").slice(0,4).join(".")+" "+JSON.stringify(Object.fromEntries(Object.entries(f).filter(([k,v])=>!["none","1","auto","normal","","visible"].includes(v)))));
    e=e.parentElement;}
  return o;});
console.log(r.join("\n")); await b.close();
