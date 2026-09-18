import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil:"load" });
await p.waitForTimeout(7000);
const o = await p.evaluate(() => {
  const btn = document.querySelector(".config-action-bar button");
  const grab = (el, pseudo) => {
    const cs = getComputedStyle(el, pseudo);
    return {
      content: pseudo ? cs.content : undefined,
      bg: cs.backgroundColor, bgImage: cs.backgroundImage.slice(0,160),
      bgSize: cs.backgroundSize, bgPos: cs.backgroundPosition,
      bgClip: cs.backgroundClip, bgOrigin: cs.backgroundOrigin, bgRepeat: cs.backgroundRepeat,
      mask: (cs.maskImage||cs.webkitMaskImage||"none").slice(0,160),
      maskSize: cs.maskSize, radius: cs.borderRadius,
      inset: [cs.top,cs.right,cs.bottom,cs.left].join("/"),
      w: cs.width, h: cs.height, position: cs.position, zIndex: cs.zIndex,
      transform: cs.transform, filter: cs.filter, mixBlend: cs.mixBlendMode,
      boxShadow: cs.boxShadow.slice(0,200), padding: cs.padding,
      className: pseudo ? undefined : el.className.toString(),
    };
  };
  const out = { button: grab(btn, null), before: grab(btn, "::before"), after: grab(btn, "::after") };
  out.parent = grab(btn.parentElement, null);
  out.parentBefore = grab(btn.parentElement, "::before");
  out.parentAfter = grab(btn.parentElement, "::after");
  const dock = document.querySelector(".config-action-bar .glass-dock");
  out.dock = grab(dock, null);
  const plate = document.querySelector(".config-action-bar .dock-plate");
  if (plate) { out.plate = grab(plate,null); out.plateAfter = grab(plate,"::after"); out.plateBefore = grab(plate,"::before"); }
  // rects of everything in the bar
  out.rects = [...document.querySelector(".config-action-bar").querySelectorAll("*")]
    .filter(e => e.tagName !== "path" && e.tagName !== "svg")
    .map(e => ({ cls:(e.className?.toString?.()||e.tagName).slice(0,50), r:[+e.getBoundingClientRect().x.toFixed(1), +e.getBoundingClientRect().width.toFixed(1), +e.getBoundingClientRect().height.toFixed(1)] }));
  return out;
});
console.log(JSON.stringify(o,null,1));
await b.close();
