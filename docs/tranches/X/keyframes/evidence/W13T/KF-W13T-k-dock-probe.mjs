// SERVED MODEL: claude-opus-5-5[1m]
// X.KF.W13T.k — the bounded OA-6 dock-containment probe (headless chromium via value.js's playwright 1.60.0, kf dev server :5173).
// Usage: node KF-W13T-k-dock-probe.mjs <tag> [shotDir]. Hovers the top ChromeDock to expand it; counts every rendered descendant box outside the .glass-dock capsule and every dock button that intersects an out-of-dock button.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const tag = process.argv[2] || "before";
const shotDir = process.argv[3] || null;
const vps = [[1440,900],[768,1024],[390,844]];
const routes = ["#/", "#/cube"];
const b = await chromium.launch();
const out = [];
for (const [w,h] of vps) for (const r of routes) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  await p.goto("http://localhost:5173/"+r, { waitUntil:"networkidle" });
  await p.waitForTimeout(800);
  const dock = p.locator('[data-dock-tether="top"] .glass-dock').first();
  await dock.hover(); await p.waitForTimeout(900);
  const res = await p.evaluate(() => {
    const d = document.querySelector('[data-dock-tether="top"] .glass-dock');
    const c = d.getBoundingClientRect();
    const bad = [];
    for (const el of d.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const cs = getComputedStyle(el); if (cs.visibility==='hidden'|| cs.display==='none') continue;
      if (el.closest('[inert]') && el.closest('.dock-summary, [data-dock-summary]')) continue;
      if (r.left < c.left-0.5 || r.right > c.right+0.5 || r.top < c.top-0.5 || r.bottom > c.bottom+0.5)
        bad.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0,3).join('.')} [${[r.left,r.top,r.right,r.bottom].map(Math.round)}]`);
    }
    // collisions with other fixed chrome
    const others = [...document.querySelectorAll('button, a')].filter(e=>!d.contains(e) && e.getBoundingClientRect().width>0).map(e=>({e,r:e.getBoundingClientRect()}));
    const coll = [];
    for (const el of d.querySelectorAll('button')) { const r=el.getBoundingClientRect(); if(!r.width) continue;
      for (const o of others) if (r.left<o.r.right && r.right>o.r.left && r.top<o.r.bottom && r.bottom>o.r.top) coll.push(`${el.getAttribute('aria-label')||el.textContent.trim()} x ${o.e.getAttribute('aria-label')||o.e.textContent.trim().slice(0,20)}`); }
    return { expanded: d.className, capsule:[c.left,c.top,c.right,c.bottom].map(Math.round), vw: innerWidth, sw: document.documentElement.scrollWidth, bad, coll };
  });
  out.push({ vp:`${w}x${h}`, r, ...res });
  if (shotDir) await p.screenshot({ path:`${shotDir}/KF-W13T-k-${tag}-${w}x${h}-${r.replace(/[#/]/g,'')||'home'}.png`, clip:{x:0,y:0,width:w,height:Math.min(160,h)} });
  await p.close();
}
await b.close();
for (const o of out) console.log(o.vp, o.r, JSON.stringify(o.capsule), "out=", o.bad.length, "coll=", o.coll.length, o.expanded.includes("dock-overflow-wrap")?"wrap":"", JSON.stringify(o.bad.slice(0,2)), JSON.stringify(o.coll.slice(0,3)));
