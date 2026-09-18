import { chromium } from "playwright";
const b = await chromium.launch();
for (const fc of ["none","active"]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, forcedColors: fc });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/admin/users",{waitUntil:"networkidle",timeout:45000});
  await p.waitForTimeout(2000);
  const r = await p.evaluate(() => {
    // reconstruct the AdminUsersPanel row's focus treatment verbatim (AdminUsersPanel.vue:80-82)
    const d=document.createElement("div");
    d.className="flex items-center gap-3 px-3 py-2.5 transition-colors cursor-pointer hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
    d.setAttribute("role","button"); d.tabIndex=0; d.textContent="probe-row";
    document.body.appendChild(d); d.focus();
    const cs=getComputedStyle(d);
    const out={forced:matchMedia("(forced-colors: active)").matches,
      boxShadow:cs.boxShadow, outline:cs.outlineStyle+" "+cs.outlineWidth+" "+cs.outlineColor,
      bg:cs.backgroundColor, color:cs.color};
    // what a bare ring-2 resolves to
    const e=document.createElement("div"); e.className="ring-2 ring-ring"; document.body.appendChild(e);
    out.bareRing=getComputedStyle(e).boxShadow; e.remove(); d.remove();
    return out;
  });
  console.log("forcedColors="+fc, JSON.stringify(r));
  await ctx.close();
}
await b.close();
