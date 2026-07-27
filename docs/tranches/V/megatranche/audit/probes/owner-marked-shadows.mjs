import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();

// OM-1 — dock pills, FULL shadow strings
await p.goto("http://localhost:9000/#/",{waitUntil:"networkidle",timeout:45000});
await p.waitForTimeout(2500);
await p.mouse.move(720, 870); await p.waitForTimeout(1200);
const dock = await p.evaluate(() => {
  const scope = document.querySelector(".glass-dock") || document;
  const plate = document.querySelector(".dock-plate");
  const items = [];
  for (const el of scope.querySelectorAll("button,a,[role=button]")) {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 8 || cs.boxShadow === "none") continue;
    // split the shadow list into layers and flag NON-inset (i.e. cast) layers
    const layers = cs.boxShadow.split(/,(?![^()]*\))/).map(s=>s.trim());
    items.push({ label:(el.getAttribute("aria-label")||el.textContent||"").trim().slice(0,14),
      castLayers: layers.filter(l=>!l.includes("inset")),
      insetLayers: layers.filter(l=>l.includes("inset")).length,
      cls: el.className.toString().slice(0,70) });
  }
  return { plateShadow: plate?getComputedStyle(plate).boxShadow:"(no .dock-plate)", items };
});
console.log("OM-1 DOCK ITEMS");
console.log("  plate box-shadow:", dock.plateShadow);
for (const i of dock.items) { console.log(`  "${i.label}"  insetLayers=${i.insetLayers}  CAST LAYERS:`); i.castLayers.forEach(l=>console.log("      "+l)); console.log("      class:",i.cls); }

// OM-2 — find palette cards on whichever route renders them
for (const route of ["#/browse","#/palettes"]) {
  await p.goto("http://localhost:9000/"+route,{waitUntil:"networkidle",timeout:45000});
  await p.waitForTimeout(3500);
  const r = await p.evaluate(() => {
    const cast = document.querySelector(".cartoon-cast");
    const surf = document.querySelector(".cartoon-surface");
    if (!cast) return { cartoonSurfaces: document.querySelectorAll(".cartoon-surface").length,
                        anyCartoon: document.querySelectorAll("[class*=cartoon]").length,
                        cards: document.querySelectorAll("[class*=rounded-card]").length };
    const parent = cast.parentElement, cs = getComputedStyle(cast), ps = getComputedStyle(parent);
    return { FOUND:true, parentCls: parent.className.toString().slice(0,90),
      parentRadius: ps.borderTopLeftRadius+" / "+ps.borderBottomLeftRadius,
      castRadius:   cs.borderTopLeftRadius+" / "+cs.borderBottomLeftRadius,
      castShadow: cs.boxShadow, castScale: cs.scale, castTranslate: cs.translate,
      token: getComputedStyle(document.documentElement).getPropertyValue("--shadow-cartoon-md").trim() };
  });
  console.log(`\nOM-2 on ${route}:`, JSON.stringify(r,null,1));
  if (r.FOUND) break;
}
await b.close();
