import { webkit } from "playwright";
const OUT = "docs/tranches/V/megatranche/audit/components/wb-generate-controls/frames-D3";
const URL = "http://localhost:9000/#/generate";
const b = await webkit.launch();

for (const [name, viewport] of [["desktop",{width:1440,height:900}],["mobile",{width:390,height:844}]]) {
  const ctx = await b.newContext({ viewport, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForSelector("[data-generate-plate]", {timeout:20000});
  await p.waitForTimeout(1500);

  const r = await p.evaluate(() => {
    const R = (el)=>{ if(!el) return null; const q=el.getBoundingClientRect(); return {x:+q.x.toFixed(1),y:+q.y.toFixed(1),w:+q.width.toFixed(1),h:+q.height.toFixed(1),area:+(q.width*q.height).toFixed(0)};};
    const plate = document.querySelector("[data-generate-plate]");
    const strip = plate.firstElementChild;
    const regen = [...plate.querySelectorAll("button")].find(b=>/Regenerate/.test(b.textContent));
    const dots = [...plate.querySelectorAll(".generate-swatch")];
    const slider = document.querySelector('[role="slider"]');
    const sliderRoot = slider?.closest('[class*="slider"],[data-slot],span,div');
    // the hand-rolled ramp underlay = the div with inline background gradient
    const ramp = [...document.querySelectorAll("div")].find(d=>d.style.background && d.style.background.startsWith("linear-gradient"));
    const track = document.querySelector('[data-slot="slider-track"]') || slider?.parentElement;
    const range = document.querySelector('[data-slot="slider-range"]') || document.querySelector('[class*="slider-range"]');
    const countLabel = [...plate.parentElement.parentElement.querySelectorAll("label")].pop();
    const cs = (el,prop)=>el?getComputedStyle(el)[prop]:null;
    return {
      plate:R(plate), strip:R(strip), regen:R(regen),
      dotsArea: dots.reduce((s,d)=>s+d.getBoundingClientRect().width*d.getBoundingClientRect().height,0)|0,
      dotN: dots.length,
      ramp:R(ramp), rampBg: ramp?.style.background?.slice(0,90),
      track:R(track), range:R(range), rangeBg: cs(range,"backgroundImage"), rangeW: range?+range.getBoundingClientRect().width.toFixed(1):null,
      thumb:R(slider), thumbVal: slider?.getAttribute("aria-valuenow"),
      sliderVariant: slider?.closest("[variant],[data-variant]")?.getAttribute("data-variant"),
      countLabel: R(countLabel), countLabelText: countLabel?.textContent.trim(),
      countLabelScroll: countLabel? {sw: countLabel.scrollWidth, cw: countLabel.clientWidth}:null,
      plateBorder: cs(plate,"borderTopWidth")+" "+cs(plate,"borderTopColor"),
      plateShadow: cs(plate,"boxShadow"),
      plateBg: cs(plate,"backgroundColor"),
      seedText: plate.querySelector("p")?.textContent.trim(),
      seedUserSelect: cs(plate.querySelector("p"),"userSelect") || cs(plate.querySelector("p"),"webkitUserSelect"),
    };
  });

  // accessibility tree for one dropdown option
  await p.click('[aria-label="Generation preset"]');
  await p.waitForTimeout(600);
  const opts = await p.evaluate(()=>[...document.querySelectorAll('[role="option"]')].slice(0,4).map(o=>({label:o.getAttribute("aria-label"), text:o.textContent.replace(/\s+/g," ").trim(), labelledby:o.getAttribute("aria-labelledby"), describedby:o.getAttribute("aria-describedby")})));
  await p.keyboard.press("Escape"); await p.waitForTimeout(200);

  // drag count 5 -> 6 under harmony=triadic : do the existing colours survive?
  await p.evaluate(()=>{ /* set harmony via the select is fiddly; read palette at 5 */ });
  const pal5 = await p.evaluate(()=>[...document.querySelectorAll("[data-generate-plate] .generate-swatch")].map(d=>d.getAttribute("aria-label")));
  await p.evaluate(()=>document.querySelector('[role="slider"]').focus());
  await p.keyboard.press("ArrowRight"); await p.waitForTimeout(400);
  const pal6 = await p.evaluate(()=>[...document.querySelectorAll("[data-generate-plate] .generate-swatch")].map(d=>d.getAttribute("aria-label")));
  await p.keyboard.press("ArrowLeft"); await p.waitForTimeout(300);

  // count=12 label clip check
  for(let i=0;i<7;i++){ await p.keyboard.press("ArrowRight"); await p.waitForTimeout(40); }
  await p.waitForTimeout(300);
  const at12 = await p.evaluate(()=>{
    const labels=[...document.querySelectorAll("label")];
    const l=labels.find(x=>/^\d+$/.test(x.textContent.trim()));
    const plate=document.querySelector("[data-generate-plate]");
    const dots=[...plate.querySelectorAll(".generate-swatch")];
    const rows = new Set(dots.map(d=>Math.round(d.getBoundingClientRect().y)));
    return { labelText:l?.textContent.trim(), sw:l?.scrollWidth, cw:l?.clientWidth, dotRows:[...rows].length, dotN:dots.length, plateH:+plate.getBoundingClientRect().height.toFixed(1) };
  });
  await p.screenshot({ path: `${OUT}/${name}-axis.png` });

  console.log(`\n##### ${name} #####`);
  console.log(JSON.stringify(r,null,1));
  console.log("AX OPTIONS:", JSON.stringify(opts));
  console.log("PAL@5:", JSON.stringify(pal5));
  console.log("PAL@6:", JSON.stringify(pal6));
  console.log("survived:", pal5.filter((c,i)=>c===pal6[i]).length, "/", pal5.length);
  console.log("AT COUNT 12:", JSON.stringify(at12));
  await ctx.close();
}
await b.close();
