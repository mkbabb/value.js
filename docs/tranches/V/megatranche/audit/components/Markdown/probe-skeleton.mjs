import { webkit } from "playwright";
const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const p = await c.newPage();
// delay the lab.md chunk so the skeleton is observable
await p.route(/lab\.md/, async (route) => { await new Promise(r => setTimeout(r, 12000)); await route.continue(); });
await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(6000);
const m = await p.evaluate(() => {
  const sk = [...document.querySelectorAll('[class*="rounded-full"]')].filter(e => e.className.includes("h-12"));
  const all = [...document.querySelectorAll("div")].filter(e => /space-x-4/.test(e.className) && /h-full/.test(e.className));
  const host = all[0];
  if (!host) return { found: false, skeletonHostCount: all.length };
  const kids = [...host.children];
  return {
    found: true,
    hostRect: (({width,height,top,left}) => ({width:+width.toFixed(1),height:+height.toFixed(1),top:+top.toFixed(1),left:+left.toFixed(1)}))(host.getBoundingClientRect()),
    hostClass: host.className,
    children: kids.map(k => ({ cls: k.className.slice(0,60), w: +k.getBoundingClientRect().width.toFixed(1), h: +k.getBoundingClientRect().height.toFixed(1),
      inner: [...k.children].map(g => ({ cls: g.className.slice(0,50), w: +g.getBoundingClientRect().width.toFixed(1), h: +g.getBoundingClientRect().height.toFixed(1) })) })),
    animation: (() => { const s = host.querySelector('[class*="shimmer"]'); return s ? getComputedStyle(s).animationName + " " + getComputedStyle(s).animationDuration : null; })(),
  };
});
console.log(JSON.stringify(m, null, 2));
await p.screenshot({ path: "docs/tranches/V/megatranche/audit/components/Markdown/frames/loading-skeleton.png" });
await b.close();
