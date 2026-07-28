import { chromium } from "playwright";
const browser = await chromium.launch();
const routes = ["/", "/#/browse", "/#/tools", "/#/about"];
const out = [];
for (const w of [1024, 1100, 1280]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto("http://localhost:9000" + r, { waitUntil: "load" });
    await page.waitForSelector(".glass-dock", { timeout: 15000 });
    await page.waitForTimeout(1000);
    const m = await page.evaluate(() => {
      const l = document.querySelector(".dock-status-lamp");
      const d = document.querySelector(".glass-dock");
      if (!l || !d) return null;
      const lr = l.getBoundingClientRect(), dr = d.getBoundingClientRect();
      const covered = [...document.querySelectorAll("nav.dock-band button,nav.dock-band [role=button],nav.dock-band input")]
        .map(e => ({e, b: e.getBoundingClientRect()}))
        .filter(({e,b}) => b.width>0 && getComputedStyle(e).visibility!=="hidden" &&
          !(b.right<=lr.left||b.left>=lr.right||b.bottom<=lr.top||b.top>=lr.bottom))
        .map(({e,b}) => ({aria:e.getAttribute("aria-label"), vis:getComputedStyle(e).visibility, op:getComputedStyle(e).opacity, box:[+b.x.toFixed(1),+b.y.toFixed(1),+b.width.toFixed(1),+b.height.toFixed(1)]}));
      return { lamp:[+lr.x.toFixed(1),+lr.width.toFixed(1)], dockRight:+dr.right.toFixed(1), gap:+(lr.left-dr.right).toFixed(1), overlapsDock: lr.left < dr.right, covered };
    });
    out.push({ w, r, ...m });
  }
  await ctx.close();
}
// 390 cancel-button reality
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/", { waitUntil: "load" });
await page.waitForSelector(".glass-dock"); await page.waitForTimeout(1500);
const cancel = await page.evaluate(() => {
  const b=[...document.querySelectorAll("nav.dock-band button")].find(x=>x.getAttribute("aria-label")==="Cancel");
  if(!b) return "none";
  const r=b.getBoundingClientRect(); const cs=getComputedStyle(b);
  const anc=[]; let e=b.parentElement; let i=0;
  while(e && i++<4){const c=getComputedStyle(e); anc.push({cls:(e.className?.toString?.()??"").slice(0,40),display:c.display,vis:c.visibility,op:c.opacity,pe:c.pointerEvents}); e=e.parentElement;}
  return {box:[+r.x.toFixed(1),+r.y.toFixed(1),r.width,r.height],vis:cs.visibility,op:cs.opacity,display:cs.display,anc};
});
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/probe/lamp-390.png" });
await page.setViewportSize({width:1440,height:900}); await page.waitForTimeout(600);
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/probe/lamp-1440.png" });
console.log(JSON.stringify({ collide: out, cancel }, null, 2));
await browser.close();
