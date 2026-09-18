// CHALLENGE-C probe 09 — MT-F023's exact mechanism. The root's ruling says the
// guard "only overrides animation-duration + animation-iteration-count" and a
// scroll animation "has animation-duration:auto". Measure what the guard
// ACTUALLY computes onto the element under reduce.
import { webkit, chromium } from "playwright";
for (const [name, eng] of [["webkit", webkit], ["chromium", chromium]]) {
  const b = await eng.launch();
  for (const rm of ["no-preference", "reduce"]) {
    const p = await (await b.newContext({viewport:{width:1440,height:900}, reducedMotion:rm})).newPage();
    await p.goto("http://localhost:9000/#/", {waitUntil:"networkidle", timeout:45000});
    await p.waitForTimeout(2600);
    const r = await p.evaluate(()=>{
      const h=[...document.querySelectorAll("main .pane-header")].find(e=>e.offsetParent!==null);
      const t=h.querySelector(".pane-header-title");
      const cs=getComputedStyle(t), bs=getComputedStyle(h,"::before");
      return { title:{duration:cs.animationDuration, name:cs.animationName, timeline:cs.animationTimeline,
                      range:cs.animationRange, iter:cs.animationIterationCount, fill:cs.animationFillMode},
               veil:{duration:bs.animationDuration, timeline:bs.animationTimeline},
               matches:matchMedia("(prefers-reduced-motion: reduce)").matches };
    });
    console.log(`${name.padEnd(9)} rm=${rm.padEnd(13)} matches=${r.matches}`);
    console.log(`   title ${JSON.stringify(r.title)}`);
    console.log(`   veil  ${JSON.stringify(r.veil)}`);
    await p.close();
  }
  await b.close();
}
