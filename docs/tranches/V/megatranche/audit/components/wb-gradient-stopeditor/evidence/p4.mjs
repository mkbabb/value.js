import { webkit, devices } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/wbgse";
const b = await webkit.launch();
const st = (p) => p.evaluate(() => {
  const hs = [...document.querySelectorAll("[data-stop-id]")];
  return { n: hs.length, pos: hs.map(h=>h.getAttribute("aria-label").replace(/\D+/g,"")),
           centers: hs.map(h=>{const r=h.getBoundingClientRect();return +(r.x+r.width/2).toFixed(1);}) };
});
const barOf = (p) => p.evaluate(()=>{const r=document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});

// ── T10: cross-drag → non-monotonic CSS stop positions in the painted ramp ──
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const errs=[]; p.on("pageerror",e=>errs.push(String(e).slice(0,200)));
  await p.goto("http://localhost:9000/#/gradient", { waitUntil:"networkidle", timeout:45000 });
  await p.waitForTimeout(2200);
  const bar = await barOf(p); const y = bar.y + bar.h/2;
  await p.mouse.click(bar.x + bar.w*0.30, y); await p.waitForTimeout(300);
  await p.mouse.click(bar.x + bar.w*0.62, y); await p.waitForTimeout(300);
  let s = await st(p);
  await p.mouse.move(s.centers[2], y); await p.mouse.down();
  for (let i=1;i<=14;i++){ await p.mouse.move(s.centers[2] - (s.centers[2]-(bar.x+bar.w*0.10))*i/14, y); await p.waitForTimeout(20); }
  await p.mouse.up(); await p.waitForTimeout(450);
  s = await st(p); console.log("T10 stops after cross", JSON.stringify(s));
  const pcts = await p.evaluate(() => {
    const bg = getComputedStyle(document.querySelector('[data-testid="gradient-stop-bar"]')).backgroundImage;
    const nums = [...bg.matchAll(/([\d.]+)%/g)].map(m=>+m[1]);
    const desc = []; for (let i=1;i<nums.length;i++) if (nums[i] < nums[i-1]) desc.push([i, nums[i-1], nums[i]]);
    return { count: nums.length, first20: nums.slice(0,20), descendingPairs: desc.slice(0,10), tail: nums.slice(-6) };
  });
  console.log("T10 ramp stop %s:", JSON.stringify(pcts, null, 1));
  await p.screenshot({ path: OUT+"/10-crossed-rail.png", clip: { x: bar.x-8, y: bar.y-10, width: bar.w+16, height: 62 } });
  console.log("T10 errs", JSON.stringify(errs));
  await p.close(); await ctx.close();
}

// ── T11: COARSE — does a tap on the lower part of a SELECTED handle delete the stop? ──
{
  const ctx = await b.newContext({ ...devices["iPhone 14"] });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil:"networkidle", timeout:45000 });
  await p.waitForTimeout(2500);
  const bar = await barOf(p); const y = bar.y + bar.h/2;
  await p.mouse.click(bar.x + bar.w*0.5, y); await p.waitForTimeout(350);
  let s = await st(p); console.log("T11 before", JSON.stringify(s));
  await p.mouse.click(s.centers[1], y); await p.waitForTimeout(400);        // select
  console.log("T11 selected", JSON.stringify(await st(p)));
  const h = await p.evaluate(()=>{const e=[...document.querySelectorAll("[data-stop-id]")][1];const r=e.getBoundingClientRect();return {cx:r.x+r.width/2, cy:r.y+r.height/2, h:r.height};});
  // tap 20px BELOW the handle centre — still inside the handle's 44px+ coarse expander
  await p.mouse.click(h.cx, h.cy + 20); await p.waitForTimeout(400);
  console.log("T11 after tap at handle-centre + 20px", JSON.stringify(await st(p)));
  await p.close(); await ctx.close();
}
await b.close();
