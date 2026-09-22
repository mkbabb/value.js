// SERVED MODEL: claude-opus-5-5[1m] — X-W6 Repair 1 probe (read-only against a vite dev server; argv[2] = origin)
import { chromium } from "@playwright/test";
const origin = process.argv[2];
const b = await chromium.launch({ channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(origin + "/");
const card = p.locator(".about-card");
await card.waitFor({ state: "visible", timeout: 30000 });
await p.waitForTimeout(4000);
const trig = card.getByRole("combobox", { name: "Select color space" });
for (const label of ["Display P3", "Lab", "RGB", "HSL"]) {
  await trig.click();
  const lb = p.getByRole("listbox");
  await lb.waitFor({ state: "visible" });
  await p.evaluate(() => { window.__lt = []; window.__po?.disconnect(); window.__po = new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(Math.round(e.duration)))); window.__po.observe({ type: "longtask" }); window.__t0 = performance.now(); });
  await lb.getByRole("option", { name: label, exact: true }).click();
  try { await lb.waitFor({ state: "hidden", timeout: 6000 }); } catch { const d = await p.evaluate(() => { const el=document.querySelector('[role="listbox"]'); const out=[]; let n=el; for(let i=0;i<4&&n;i++){ const cs=getComputedStyle(n); out.push(n.tagName+" ds="+n.getAttribute("data-state")+" anim="+cs.animationName+"|"+cs.animationDuration+"|"+cs.animationPlayState+"|"+cs.animationIterationCount+" op="+cs.opacity+" tr="+cs.transform+" anims="+n.getAnimations({subtree:false}).map(a=>(a.animationName||a.transitionProperty)+":"+a.playState+":"+Math.round(a.currentTime??-1)+"/"+JSON.stringify(a.effect?.getComputedTiming?.().endTime)).join(",")); n=n.parentElement;} out.push("docHidden="+document.visibilityState+" prm="+matchMedia("(prefers-reduced-motion: reduce)").matches); out.push("allRunning="+document.getAnimations().filter(a=>a.playState!=="finished").slice(0,8).map(a=>(a.animationName||a.transitionProperty)+"@"+(a.effect?.target?.className||"").toString().slice(0,30)+":"+a.playState).join(" ; ")); return out.join("\n   "); }); const f = await p.evaluate(() => new Promise(res => { const ts=[]; const t0=performance.now(); const step=(t)=>{ ts.push(Math.round(t-t0)); if(ts.length<6) requestAnimationFrame(step); else res(ts); }; requestAnimationFrame(step); setTimeout(()=>res(ts), 15000); })); const cv = await p.evaluate(() => [...document.querySelectorAll("canvas")].map(c => (c.className||c.dataset.testid||"")+" "+c.width+"x"+c.height).join(" | ")); console.log("STUCK", label, "\n   "+d, "\n   rAF@", JSON.stringify(f), "\n   canvases", cv); break; }
  const r = await p.evaluate(() => ({ closeMs: Math.round(performance.now() - window.__t0), lt: window.__lt }));
  console.log(label, JSON.stringify(r));
  await p.waitForTimeout(1500);
}
await b.close();
