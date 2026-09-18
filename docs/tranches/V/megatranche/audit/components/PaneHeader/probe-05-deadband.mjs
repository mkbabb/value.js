// CHALLENGE-C probe 05 — the collapse reclaims ZERO scrollport: capture the
// dead band on desktop Safari, About pane, scrolled past the 120px range.
import { webkit } from "playwright";
const OUT="/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaneHeader";
const b = await webkit.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto("http://localhost:9000/#/", {waitUntil:"networkidle", timeout:45000});
await p.waitForTimeout(3000);
await p.evaluate(()=>{const h=[...document.querySelectorAll("main .pane-scroll-fade")].find(e=>e.offsetParent!==null&&e.scrollHeight>e.clientHeight); if(h) h.scrollTop=300;});
await p.waitForTimeout(600);
const m = await p.evaluate(()=>{
  const h=[...document.querySelectorAll("main .pane-scroll-fade")].find(e=>e.offsetParent!==null&&e.scrollHeight>e.clientHeight);
  const hdr=h.querySelector(".pane-header"), t=hdr.querySelector(".pane-header-title"), d=hdr.querySelector(".pane-header-desc-wrap");
  const hr=hdr.getBoundingClientRect(), tr=t.getBoundingClientRect(), dr=d.getBoundingClientRect();
  // sample elementFromPoint down the header column
  const samples=[];
  for(let y=Math.round(tr.bottom)+2; y<hr.bottom; y+=12){
    const el=document.elementFromPoint(hr.left+hr.width/2, y);
    samples.push({y, el: el? `${el.tagName}.${String(el.className).split(" ")[0]}`:"null", inHeader: el? !!el.closest(".pane-header"):null});
  }
  return {headerH:+hr.height.toFixed(1), viewportH:innerHeight, titleBottom:+tr.bottom.toFixed(1),
          descWrap:{top:+dr.top.toFixed(1),h:+dr.height.toFixed(1)},
          deadBandPx:+(hr.bottom-tr.bottom).toFixed(1),
          deadBandPctOfViewport:+((hr.bottom-tr.bottom)/innerHeight*100).toFixed(1), samples};
});
console.log(JSON.stringify(m,null,1));
await p.screenshot({path:`${OUT}/shot-webkit-desktop-about-scrolled300.png`, clip:{x:660,y:90,width:780,height:300}});
await b.close();
