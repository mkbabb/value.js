// SERVED MODEL: claude-opus-5-5
// KF.W13R.m — occlusion easing/desktop read (1440x900 /#/easing, dev at 10.0.1): the largest subject ball + its ancestor chain vs the dock/menubar rects.
import { withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const url = process.argv[2] ?? "http://localhost:5173";
const r = await withBrowser(async (b) => {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${url}/#/easing`, { waitUntil: "load" }); await p.waitForTimeout(3000);
  const out = [];
  for (let i = 0; i < 1; i++) {
    out.push(await p.evaluate(() => {
      const R = (el) => { const r = el.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom].map(Math.round).join(","); };
      let best=null; for (const e of document.querySelectorAll(".progress-ball, .hero-ball")) { const cs=getComputedStyle(e); if (cs.visibility==="hidden"||cs.display==="none"||+cs.opacity===0) continue; const r=e.getBoundingClientRect(); if (r.width<=8||r.height<=8||r.bottom<0||r.top>innerHeight) continue; const a=r.width*r.height; if(!best||a>best.a) { const chain=[]; let n=e.parentElement; while(n&&chain.length<9){ chain.push((n.tagName+'.'+String(n.className).split(' ').slice(0,2).join('.')).slice(0,48)); n=n.parentElement;} best={a,cls:String(e.className).slice(0,40),r:R(e),chain}; } }
      const subs=best; const subR=null;
      const docks = [...document.querySelectorAll(".glass-dock, [class*=menubar], [class*=top-dock]")].filter(e=>{const r=e.getBoundingClientRect(); return r.width>0&&r.height>0;}).map((e) => String(e.className).slice(0, 50) + " @ " + R(e));
      return { subs, subR, docks };
    }));
    await p.waitForTimeout(700);
  }
  return out;
}, { launch: { headless: false } });
console.log(JSON.stringify(r.value ?? r, null, 0));
