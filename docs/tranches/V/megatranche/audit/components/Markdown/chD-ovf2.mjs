import { webkit } from "@playwright/test";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: {width:390,height:844}, colorScheme:"light", deviceScaleFactor:2, isMobile:true, hasTouch:true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/", { waitUntil: "load" });
await p.waitForTimeout(6000);
for (let i=0;i<5;i++){
  const ok = await p.evaluate(() => {
    if (document.querySelector(".about-card")) return true;
    const h=document.querySelector(".dock-mobile-panes");
    if(!h) return false;
    const it=[...h.querySelectorAll("button,[role=tab],[role=radio]")];
    it[1]?.click(); return false;
  });
  if (ok) break;
  await p.waitForTimeout(2500);
}
await p.waitForTimeout(2000);
const m = await p.evaluate(() => {
  const card = document.querySelector(".about-card");
  if (!card) return { err: "no card" };
  const cr = card.getBoundingClientRect();
  const out = [];
  const walk = (el) => {
    for (const c of el.children) {
      const r = c.getBoundingClientRect();
      if (r.right > cr.right + 1) out.push({ tag: c.tagName, cls: (c.className||"").toString().slice(0,55),
          right: Math.round(r.right), w: Math.round(r.width), over: Math.round(r.right - cr.right),
          inMarkdown: !!c.closest(".markdown-wrapper") });
      if (out.length < 30) walk(c);
    }
  };
  walk(card);
  return { cardW: Math.round(cr.width), cardScrollW: card.scrollWidth, cardClientW: card.clientWidth,
    overflowX: getComputedStyle(card).overflowX, offenders: out.slice(0,15) };
});
console.log(JSON.stringify(m, null, 1));
await b.close();
