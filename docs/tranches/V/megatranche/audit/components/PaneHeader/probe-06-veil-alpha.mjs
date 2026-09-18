// CHALLENGE-C probe 06 — the veil's COMPOSITED alpha at the "swell complete"
// state (animation opacity 1). O-11 gate 3 asserts opacity===1 and calls that
// the double-exposure cure; measure what alpha 1.0 of the material actually is.
import { webkit } from "playwright";
const b = await webkit.launch();
for (const scheme of ["light","dark"]) {
  const p = await (await b.newContext({viewport:{width:1440,height:900}, colorScheme:scheme})).newPage();
  await p.goto("http://localhost:9000/#/", {waitUntil:"networkidle", timeout:45000});
  await p.waitForTimeout(2800);
  if (scheme==="dark") await p.evaluate(()=>document.documentElement.classList.add("dark"));
  await p.evaluate(()=>{const h=[...document.querySelectorAll("main .pane-scroll-fade")].find(e=>e.offsetParent!==null&&e.scrollHeight>e.clientHeight); if(h) h.scrollTop=300;});
  await p.waitForTimeout(500);
  const m = await p.evaluate(()=>{
    const hdr=[...document.querySelectorAll("main .pane-header")].find(e=>e.offsetParent!==null);
    const cs=getComputedStyle(hdr,"::before");
    const root=getComputedStyle(document.documentElement);
    return { animOpacity: cs.opacity, bg: cs.backgroundColor,
             backdrop: cs.backdropFilter || cs.webkitBackdropFilter,
             tokenBg: root.getPropertyValue("--glass-bg-resting").trim(),
             tokenBlur: root.getPropertyValue("--glass-blur-resting").trim() };
  });
  console.log(scheme, JSON.stringify(m));
  await p.close();
}
await b.close();
