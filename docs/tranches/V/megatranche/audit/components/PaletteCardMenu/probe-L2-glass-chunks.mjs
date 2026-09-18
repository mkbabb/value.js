import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:1000}})).newPage();
const hits={};
p.on("response", async r=>{const u=r.url();
  if(/@mkbabb_glass-ui/.test(u)){ let len=0; try{len=(await r.body()).length;}catch{}
    hits[u.split("/").pop().split("?")[0]]=len; }});
await p.goto("http://localhost:9000/#/palettes",{waitUntil:"networkidle"});
await p.waitForTimeout(2500);
const total=Object.values(hits).reduce((a,x)=>a+x,0);
console.log(JSON.stringify({chunks:hits,totalBytes:total},null,2));
await b.close();
