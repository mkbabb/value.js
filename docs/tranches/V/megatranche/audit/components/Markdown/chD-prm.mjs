import { webkit } from "@playwright/test";
async function arm(reduce) {
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light", ...(reduce?{reducedMotion:"reduce"}:{}) });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/", { waitUntil:"domcontentloaded", timeout: 90000 });
  await p.waitForTimeout(8000);
  await p.evaluate(()=>{const c=document.querySelector(".about-card");const h=[...document.querySelectorAll("h2")].find(e=>e.textContent.includes("Detailed Guide"));if(c&&h)c.scrollTop=h.offsetTop-24;});
  await p.waitForTimeout(700);
  const m = await p.evaluate(() => {
    const body=document.querySelector(".markdown-body");
    const g=(s)=>{const e=body?.querySelector(s);if(!e)return null;const c=getComputedStyle(e);return c.transitionDuration+" | "+c.transitionProperty;};
    const mm=document.querySelector(".katex-mathml");
    const mmcs=mm?getComputedStyle(mm):null;
    return {
      prmMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
      h2: g("h2"), code: g("p code, li code"), mark: g("mark.cs-name"), p: g("p"),
      katexMathmlPresent: !!mm,
      katexMathmlClip: mmcs ? { position: mmcs.position, clip: mmcs.clip, clipPath: mmcs.clipPath, w: Math.round(mm.getBoundingClientRect().width) } : null,
    };
  });
  console.log((reduce?"REDUCE":"NORMAL")+": "+JSON.stringify(m));
  await b.close();
}
await arm(false); await arm(true);
