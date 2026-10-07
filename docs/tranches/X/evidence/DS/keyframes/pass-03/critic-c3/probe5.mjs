import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const KEY = "animation-groups-control-options-store";
const setSurface = (page, scene, control, expanded) => page.evaluate(([k, scene, control, expanded]) => {
  const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), selectedControl: control, isTimelineExpanded: expanded }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, scene, control, expanded]);
const out = {};
for (const scheme of ["light","dark"]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:scheme });
  const p = await ctx.newPage();
  p.setDefaultTimeout(5000);
  await p.goto("http://localhost:5173/#/cube",{waitUntil:"load"}); await p.waitForTimeout(3000);
  await setSurface(p,"cube","keyframes",false); await p.reload({waitUntil:"load"}); await p.waitForTimeout(5000);
  await p.screenshot({path:`keyframes-pane-1440-${scheme}.png`});
  await setSurface(p,"cube","timeline",false); await p.reload({waitUntil:"load"}); await p.waitForTimeout(5000);
  for (let i=0;i<2;i++){ try{ await p.locator('.pane-frame button',{hasText:"Snapshot"}).first().click(); }catch(e){ out.snapErr=String(e).slice(0,120);} await p.waitForTimeout(1600);}
  await p.mouse.move(1000,880); await p.waitForTimeout(4000);
  await p.screenshot({path:`timeline-2kf-docked-1440-${scheme}.png`});
  out[`frame-${scheme}`] = await p.evaluate(()=>{const e=document.querySelector('.pane-frame'); const cs=getComputedStyle(e); return {op:cs.opacity, sh:cs.boxShadow.slice(0,200)}});
  await setSurface(p,"cube","controls",false);
  await ctx.close();
}
console.log(JSON.stringify(out,null,1));
await b.close();
