import { chromium } from "playwright";
const b=await chromium.launch({channel:"chromium",args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
const p=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
p.on("console",m=>{if(m.type()==="error")console.log("ERR:",m.text().slice(0,160));});
await p.goto("http://localhost:9000/#/browse",{waitUntil:"domcontentloaded"});
try{await p.waitForSelector("main",{timeout:15000});}catch{await p.reload({waitUntil:"domcontentloaded"});await p.waitForSelector("main",{timeout:30000});}
await p.waitForTimeout(3000);
const read = () => p.evaluate(()=>[...document.querySelector("main").querySelectorAll("input")]
  .filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.height>0;})
  .map(i=>({placeholder:i.getAttribute("placeholder"),value:i.value})));
console.log("BEFORE:", JSON.stringify(await read()));
await p.getByPlaceholder("Search your palettes...").filter({visible:true}).first().fill("typed-into-MY-PALETTES-box");
await p.waitForTimeout(900);
console.log("AFTER :", JSON.stringify(await read()));
await b.close();
