import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await p.waitForTimeout(4200);
const r = await p.evaluate(() => {
  const colors = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Colors");
  const grp = colors && colors.closest("[role]");
  const wrap = colors && colors.parentElement;
  return {
    tabBtn: { role: colors.getAttribute("role"), pressed: colors.getAttribute("aria-pressed"), sel: colors.getAttribute("aria-selected"), type: colors.getAttribute("type") },
    group: grp && { role: grp.getAttribute("role"), ariaLabel: grp.getAttribute("aria-label"), ariaLabelledby: grp.getAttribute("aria-labelledby"), cls: String(grp.className).slice(0,70) },
    wrapperHtml: wrap && wrap.outerHTML.slice(0, 300),
    // the source-selector root: how much vertical space does the whole thing take vs the pane
    rootRect: (() => { const w = document.querySelector(".dashed-well"); const root = w.parentElement; const rr = root.getBoundingClientRect(); const card = root.closest("[class*=pane-scroll-fade]").getBoundingClientRect(); return { root: {w:+rr.width.toFixed(1), h:+rr.height.toFixed(1)}, card: {w:+card.width.toFixed(1), h:+card.height.toFixed(1)}, share: +((rr.height/card.height)*100).toFixed(1) }; })(),
    // measure gap between segmented tabs block and the well
    gaps: (() => { const root = document.querySelector(".dashed-well").parentElement; const kids=[...root.children].map(k=>{const b=k.getBoundingClientRect(); return {cls:String(k.className).slice(0,30), top:+b.top.toFixed(1), bottom:+b.bottom.toFixed(1), h:+b.height.toFixed(1)};}); return kids; })(),
  };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
