import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [w,h] of [[390,844],[1440,900]]) {
const ctx = await b.newContext({ viewport:{width:w,height:h}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/square",{waitUntil:"load"}); await p.waitForTimeout(5000);
const r = await p.evaluate(()=>{
  const res=(v)=>{const d=document.createElement('div');d.style.position='absolute';d.style.height=v;document.body.append(d);const x=d.getBoundingClientRect().height;d.remove();return Math.round(x*10)/10};
  const sh=document.querySelector('[data-slot=sheet-content]');
  return {sbi:res('var(--stage-bottom-inset)'), dmr:res('var(--dock-menubar-reserve)'), dbr:res('var(--dock-band-reserve)'), stbr:res('var(--dock-top-band-reserve-stable)'), dba:res('var(--dock-bottom-anchor)'), wamh: res('var(--work-area-max-height)'),
   sheetTop: sh? Math.round(sh.getBoundingClientRect().y):null, sheetStyle: sh?.getAttribute('style'), plate: document.querySelector('.square-stage')?.getBoundingClientRect().toJSON()};
});
console.log(w, JSON.stringify(r));
await ctx.close();
}
await b.close();
