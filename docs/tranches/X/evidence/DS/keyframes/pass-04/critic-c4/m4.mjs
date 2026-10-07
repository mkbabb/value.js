import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true, args:["--use-angle=metal","--enable-gpu","--ignore-gpu-blocklist"] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(5000);
await p.screenshot({path:"sq-gpu.png", clip:{x:540,y:560,width:260,height:200}});
const r = await p.evaluate(()=>{const e=document.querySelector(".square-stage"); const s=getComputedStyle(e); return [s.backdropFilter, s.transform, s.contain, s.overflow]});
console.log(r);
await b.close();
