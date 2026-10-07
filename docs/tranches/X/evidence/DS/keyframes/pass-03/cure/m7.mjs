import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const go = async (w,h,scheme,route) => { const ctx = await b.newContext({ viewport:{width:w,height:h}, colorScheme:scheme }); const p = await ctx.newPage(); const logs=[]; p.on('console',m=>{if(m.type()==='warning'||m.type()==='error')logs.push(m.text().slice(0,160))}); await p.goto("http://localhost:5173/#/"+route,{waitUntil:"load"}); await p.waitForTimeout(4500); return {ctx,p,logs}; };
{ const {ctx,p,logs} = await go(1440,900,"light","spring");
  out.spring = await p.evaluate(()=>{
    const R=(e)=>{const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height)]};
    const ro=document.querySelector('.spring-readout-primary'); const t=document.querySelector('.spring-target h2, .spring-target [class*=display]');
    const track=document.querySelector('.spring-track'); const plot=document.querySelector('.plot-frame');
    const hdr=document.querySelector('[data-figure-title]')?.parentElement; const leg=document.querySelector('.spring-heatmap-section [data-figure-legend]');
    const tl=getComputedStyle(document.querySelector('.spring-target-line'));
    const hint=document.getElementById('spring-rail-hint');
    return { readout:[getComputedStyle(ro).fontFamily.slice(0,30), getComputedStyle(ro).fontSize, getComputedStyle(ro).fontWeight, getComputedStyle(ro).color],
      title: t? [t.textContent.trim(), getComputedStyle(t).fontSize]:null, track:R(track), plot:R(plot), targetLine: tl.borderRightStyle+" "+tl.borderRightWidth+" "+tl.borderRightColor,
      heatHeader: hdr? [hdr.scrollWidth, hdr.clientWidth]:null, legend: leg? R(leg):null, yTitle: R(document.querySelector('.spring-heatmap-y-title')),
      surface: (()=>{const s=document.querySelector('.controls-surface'); return [s.scrollHeight, s.clientHeight, R(s)]})(), hintRects: hint.getClientRects().length, hintLines: Math.round(hint.getBoundingClientRect().height)};
  });
  out.springLogs = logs; await ctx.close(); }
for (const [w,h] of [[1440,900],[390,844]]) { const {ctx,p} = await go(w,h,"light","easing");
  out['easing'+w] = await p.evaluate(()=>{ const s=document.querySelector('.tile-stage').getBoundingClientRect(); const lt=document.querySelector('.literal-text'); const r=[...lt.getClientRects()]; 
    const range=document.createRange(); range.selectNodeContents(lt); const lines=[...range.getClientRects()].map(x=>Math.round(x.width));
    return {stage:[Math.round(s.width),Math.round(s.height)], literal: lt.textContent, lineWidths: lines}; });
  await ctx.close(); }
{ const {ctx,p} = await go(1440,900,"light","cube");
  await p.evaluate(()=>{const k="animation-groups-control-options-store";const s=JSON.parse(localStorage.getItem(k)??"{}");s.cube={...(s.cube??{}),selectedControl:"timeline",isTimelineExpanded:false};localStorage.setItem(k,JSON.stringify(s));}); await p.reload({waitUntil:"load"}); await p.waitForTimeout(4500);
  out.timeline = await p.evaluate(()=>{ const c=document.querySelector('[aria-label="Clear all keyframes"]'); const e=document.querySelector('[aria-label="Unfold timeline"]'); const cap=[...document.querySelectorAll('.pane-frame p')].find(x=>x.textContent.includes('No keyframes')); const cs=getComputedStyle(cap);
    return {clearDisabled:c?.disabled, clearColor:getComputedStyle(c).color, unfold: !!e, cap:[cs.textAlign, cs.textWrap ?? cs.textWrapStyle]}; });
  await ctx.close(); }
console.log(JSON.stringify(out,null,1));
await b.close();
