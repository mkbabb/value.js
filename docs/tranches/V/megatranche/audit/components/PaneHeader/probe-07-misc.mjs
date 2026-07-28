// CHALLENGE-C probe 07 — (a) duplicate pane-title headings incl. hidden;
// (b) does `contain: layout` on .pane-scroll-fade capture position:fixed
//     descendants (the classic containment trap)?
// (c) is the opacity-0 description still in the a11y tree / still selectable?
import { webkit } from "playwright";
const b = await webkit.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
for (const route of ["#/admin/users", "#/"]) {
  await p.goto(`http://localhost:9000/${route}`, {waitUntil:"networkidle", timeout:45000});
  await p.waitForTimeout(2600);
  const r = await p.evaluate(() => {
    const all = [...document.querySelectorAll("h3.pane-header-title")];
    const dup = {};
    for (const h of all) { const t=(h.textContent||"").trim().replace(/\s+/g," ");
      dup[t] = (dup[t]||0)+1; }
    // containment trap: inject a position:fixed probe inside a pane-scroll-fade
    const host = [...document.querySelectorAll("main .pane-scroll-fade")].find(e=>e.offsetParent!==null);
    let fixedTrap = "NO-HOST";
    if (host) {
      const d=document.createElement("div");
      d.style.cssText="position:fixed;top:0;left:0;width:10px;height:10px";
      host.appendChild(d);
      const r=d.getBoundingClientRect();
      const hr=host.getBoundingClientRect();
      fixedTrap = { fixedTop:+r.top.toFixed(1), fixedLeft:+r.left.toFixed(1),
                    hostTop:+hr.top.toFixed(1), hostLeft:+hr.left.toFixed(1),
                    trapped: Math.abs(r.top-hr.top)<1 && Math.abs(r.left-hr.left)<1 };
      d.remove();
      const cs=getComputedStyle(host);
      fixedTrap.contain = cs.contain;
    }
    return {
      route: location.hash,
      titlesTotalIncludingHidden: all.length,
      titlesByText: dup,
      titlesVisible: all.filter(h=>h.offsetParent!==null).length,
      badgeInsideHeading: all.map(h=>({text:(h.textContent||"").trim().replace(/\s+/g," ").slice(0,40), childEls:[...h.children].map(c=>c.tagName+"."+String(c.className).split(" ")[0])})),
      fixedTrap,
    };
  });
  console.log(JSON.stringify(r,null,1));
}
await b.close();
