// CHALLENGE-C probe 08 —
// (A) the shrink scales INTERACTIVE content slotted into the <h3>: measure the
//     About pane's color-space <button> tap target at rest vs stuck.
// (B) control experiment: is `contain` on .pane-scroll-fade load-bearing for the
//     named scroll-timeline, as PaneHeader.vue:50-53 claims? Kill it and re-measure.
import { webkit, chromium } from "playwright";
for (const [name, eng] of [["webkit", webkit], ["chromium", chromium]]) {
  const b = await eng.launch();
  const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
  await p.goto("http://localhost:9000/#/", {waitUntil:"networkidle", timeout:45000});
  await p.waitForTimeout(2800);
  const readBtn = () => {
    const h = [...document.querySelectorAll("main h3.pane-header-title")].find(e=>e.offsetParent!==null);
    const btn = h && h.querySelector("button");
    if (!btn) return "NO-BUTTON";
    const r = btn.getBoundingClientRect();
    return { name:(btn.textContent||"").trim(), w:+r.width.toFixed(1), h:+r.height.toFixed(1),
             wcag258_24px: r.width>=24 && r.height>=24,
             titleTf: getComputedStyle(h).transform,
             fixedTrapContain: (()=>{const host=h.closest(".pane-scroll-fade"); return host?getComputedStyle(host).contain:"none";})() };
  };
  const scrub = (y) => new Promise(res=>{
    const host=[...document.querySelectorAll("main .pane-scroll-fade")].find(e=>e.offsetParent!==null&&e.scrollHeight>e.clientHeight);
    if(!host) return res("NO-HOST"); host.scrollTop=y;
    requestAnimationFrame(()=>requestAnimationFrame(()=>res(host.scrollTop)));
  });
  await p.evaluate(scrub, 0); await p.waitForTimeout(300);
  const rest = await p.evaluate(readBtn);
  await p.evaluate(scrub, 300); await p.waitForTimeout(400);
  const stuck = await p.evaluate(readBtn);
  console.log(`\n===== ${name} (A) tap target inside the scaled <h3> =====`);
  console.log("  REST :", JSON.stringify(rest));
  console.log("  STUCK:", JSON.stringify(stuck));

  // (B) control: strip `contain` entirely; does the scroll-driven veil/title still work?
  await p.evaluate(scrub, 0); await p.waitForTimeout(300);
  await p.addStyleTag({content:".pane-scroll-fade{contain:none !important}"});
  await p.waitForTimeout(300);
  const cRest = await p.evaluate(()=>{
    const h=[...document.querySelectorAll("main .pane-header")].find(e=>e.offsetParent!==null);
    return {contain:getComputedStyle(h.closest(".pane-scroll-fade")).contain,
            titleTf:getComputedStyle(h.querySelector(".pane-header-title")).transform,
            veil:getComputedStyle(h,"::before").opacity};
  });
  await p.evaluate(scrub, 300); await p.waitForTimeout(400);
  const cStuck = await p.evaluate(()=>{
    const hs=[...document.querySelectorAll("main .pane-header")].filter(e=>e.offsetParent!==null);
    return hs.map(h=>({titleTf:getComputedStyle(h.querySelector(".pane-header-title")).transform,
                       veil:getComputedStyle(h,"::before").opacity}));
  });
  const fixedNow = await p.evaluate(()=>{
    const host=[...document.querySelectorAll("main .pane-scroll-fade")].find(e=>e.offsetParent!==null);
    const d=document.createElement("div"); d.style.cssText="position:fixed;top:0;left:0;width:10px;height:10px";
    host.appendChild(d); const r=d.getBoundingClientRect(); d.remove();
    return {fixedTop:+r.top.toFixed(1), fixedLeft:+r.left.toFixed(1)};
  });
  console.log(`  (B) contain:none  REST ${JSON.stringify(cRest)}`);
  console.log(`  (B) contain:none  STUCK ${JSON.stringify(cStuck)}  fixed-at-0,0 lands at ${JSON.stringify(fixedNow)}`);
  await b.close();
}
