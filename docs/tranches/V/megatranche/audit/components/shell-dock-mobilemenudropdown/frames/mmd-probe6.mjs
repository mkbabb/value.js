import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.addInitScript(()=>localStorage.setItem("palette-admin-token","t"));
await p.goto("http://localhost:9000/#/",{waitUntil:"load"});
await p.waitForTimeout(3000);
const r = await p.evaluate(()=>{
  const root=getComputedStyle(document.documentElement);
  const pill=[...document.querySelectorAll(".slug-pill")].find(e=>e.textContent.trim()==="admin" && e.offsetParent!==null) || document.querySelector(".slug-pill");
  if(!pill) return {none:true, all:[...document.querySelectorAll('.slug-pill')].map(e=>e.textContent.trim())};
  const cs=getComputedStyle(pill); const rc=pill.getBoundingClientRect();
  return {
    goldVar: root.getPropertyValue("--color-gold").trim(),
    goldDark: root.getPropertyValue("--color-gold-dark").trim(),
    goldLight: root.getPropertyValue("--color-gold-light").trim(),
    cls: String(pill.className),
    color: cs.color, borderColor: cs.borderColor,
    backgroundImage: cs.backgroundImage.slice(0,120),
    backgroundClip: cs.backgroundClip || cs.webkitBackgroundClip,
    animationName: cs.animationName, animationDuration: cs.animationDuration,
    rect:{w:+rc.width.toFixed(1),h:+rc.height.toFixed(1)},
    visible: rc.width>0,
  };
});
console.log(JSON.stringify(r,null,1));
await b.close();
