import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:1000}})).newPage();
const hits=[];
p.on("response", async r=>{const u=r.url();
  if(/subpaths|@mkbabb_value|@mkbabb_glass-ui(_dropdown)?\.js/.test(u)){
    let len=0; try{ len=(await r.body()).length; }catch{}
    hits.push({u:u.replace("http://localhost:9000/@fs/Users/mkbabb/Programming/value.js","<repo>").split("?")[0], bytes:len});
  }});
await p.goto("http://localhost:9000/#/mix",{waitUntil:"networkidle"});
await p.waitForTimeout(2500);
// also: does the page hold ONE value.js instance? probe for duplicate subpath module URLs
const uniq={}; for(const h of hits) uniq[h.u]=h.bytes;
console.log(JSON.stringify(uniq,null,2));
await b.close();
