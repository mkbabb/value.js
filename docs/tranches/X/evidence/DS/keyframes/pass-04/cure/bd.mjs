import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(6000);
const box = await p.locator(".square-stage").boundingBox();
console.log(box);
const clip = { x: box.x + 20, y: box.y + box.height - 120, width: 200, height: 100 };
const variants = {
  base: "",
  nobf: ".square-stage{backdrop-filter:none!important}",
  nocontain: ".square-stage{contain:none!important}",
  noov: ".square-stage{overflow:visible!important}",
  nobg: ".square-stage{background:transparent!important}",
  nokids: ".square-stage > *{visibility:hidden!important}",
  pseudo: ".square-stage::before,.square-stage::after{display:none!important}",
};
for (const [k, css] of Object.entries(variants)) {
  const h = css ? await p.addStyleTag({ content: css }) : null;
  await p.waitForTimeout(400);
  await p.screenshot({ path: `v-${k}.png`, clip });
  if (h) await h.evaluate((n) => n.remove());
}
const info = await p.evaluate(() => { const e=document.querySelector(".square-stage"); const out={};
  for (const ps of ["::before","::after"]) { const s=getComputedStyle(e,ps); out[ps]={content:s.content,bg:s.backgroundColor,bgi:s.backgroundImage.slice(0,120),bf:s.backdropFilter,pos:s.position,inset:s.inset,z:s.zIndex}; }
  const s=getComputedStyle(e); out.self={bg:s.backgroundColor,bgi:s.backgroundImage.slice(0,200),bs:s.boxShadow.slice(0,200)};
  out.kids=[...e.children].map(c=>{const t=getComputedStyle(c);return c.className.toString().slice(0,60)+" bg="+t.backgroundColor+" bgi="+t.backgroundImage.slice(0,80)+" bf="+t.backdropFilter;});
  return out;});
console.log(JSON.stringify(info,null,1));
await b.close();
