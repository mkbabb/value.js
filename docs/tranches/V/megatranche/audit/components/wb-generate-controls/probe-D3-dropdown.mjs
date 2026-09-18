import { webkit } from "playwright";
const OUT = "docs/tranches/V/megatranche/audit/components/wb-generate-controls/frames-D3";
const URL = "http://localhost:9000/#/generate";

const rect = (el) => { const r = el.getBoundingClientRect(); return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}; };

async function run(name, viewport) {
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);

  // ---- 1. geometry of the plate regions
  const geo = await p.evaluate(() => {
    const R = (el) => { if(!el) return null; const r = el.getBoundingClientRect(); return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),area:+(r.width*r.height).toFixed(0)}; };
    const plate = document.querySelector("[data-generate-plate]");
    const strip = plate?.firstElementChild;
    const regen = [...plate.querySelectorAll("button")].find(b=>/Regenerate/.test(b.textContent));
    const save = plate.querySelector('[aria-label="Save palette"]');
    const copy = plate.querySelector('[aria-label="Copy all colors"]');
    const dots = [...plate.querySelectorAll(".generate-swatch")];
    const name = plate.querySelector('input[aria-label="Palette name"]');
    const badge = [...plate.querySelectorAll("*")].find(e=>e.className && typeof e.className==="string" && e.className.includes("text-mono-small") && e.tagName!=="P" && /^\s*\d+\s*$/.test(e.textContent));
    const seed = plate.querySelector("p");
    const saveGlyph = save?.querySelector("svg");
    return {
      plate: R(plate), strip: R(strip), regen: R(regen), save: R(save), copy: R(copy),
      saveGlyph: R(saveGlyph), name: R(name), badge: R(badge), seed: R(seed),
      dotCount: dots.length, dot0: R(dots[0]),
      dotsRowArea: dots.reduce((s,d)=>s+d.getBoundingClientRect().width*d.getBoundingClientRect().height,0)|0,
      verbClusterArea: (R(regen)?.area||0)+(R(save)?.area||0)+(R(copy)?.area||0),
      docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  // ---- 2. trigger typography vs option typography
  const trigFont = await p.evaluate(() => {
    const t = document.querySelector('[aria-label="Generation preset"]');
    const cs = getComputedStyle(t);
    const inner = t.querySelector("span,*");
    return { triggerFont: cs.fontFamily, triggerSize: cs.fontSize, innerFont: inner?getComputedStyle(inner).fontFamily:null };
  });

  // ---- 3. OPEN the preset dropdown
  await p.click('[aria-label="Generation preset"]');
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/${name}-preset-open.png` });

  const dd = await p.evaluate(() => {
    const items = [...document.querySelectorAll('[role="option"]')];
    const R = (el) => { const r = el.getBoundingClientRect(); return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}; };
    const content = items[0]?.closest('[role="listbox"]') || items[0]?.parentElement;
    const nameSpans = items.map(i => i.querySelector("span.font-display")).filter(Boolean);
    const strips = [...document.querySelectorAll(".preview-strip")];
    const descs = items.map(i => i.querySelector(".text-micro")).filter(Boolean);
    const cs = nameSpans[0] ? getComputedStyle(nameSpans[0]) : null;
    const dcs = descs[0] ? getComputedStyle(descs[0]) : null;
    return {
      itemCount: items.length,
      content: content ? R(content) : null,
      contentRight: content ? +(content.getBoundingClientRect().right).toFixed(1) : null,
      viewportW: window.innerWidth,
      item0: items[0]?R(items[0]):null,
      itemHeights: items.map(i=>+i.getBoundingClientRect().height.toFixed(1)),
      nameFont: cs?.fontFamily, nameSize: cs?.fontSize, nameWeight: cs?.fontWeight,
      descFont: dcs?.fontFamily, descSize: dcs?.fontSize,
      stripCount: strips.length,
      strip0: strips[0]?R(strips[0]):null,
      stripSegments: strips.map(s=>s.querySelectorAll(".preview-strip-segment").length),
      stripAriaHidden: strips[0]?.getAttribute("aria-hidden"),
      truncatedStrips: strips.filter(s=>s.classList.contains("preview-strip--truncated")).length,
      descTexts: descs.map(d=>d.textContent.trim()),
      // does any description wrap to >1 line?
      descLines: descs.map(d => Math.round(d.getBoundingClientRect().height / parseFloat(getComputedStyle(d).lineHeight||"16"))),
      docOverflowOpen: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      itemAccName: items.slice(0,3).map(i=>i.textContent.trim().replace(/\s+/g," ")),
    };
  });
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);

  // ---- 4. set count to 12, reopen, look at truncation
  await p.evaluate(() => {
    const s = document.querySelector('[role="slider"]');
    s.focus();
  });
  for (let i=0;i<7;i++){ await p.keyboard.press("ArrowRight"); await p.waitForTimeout(60); }
  await p.waitForTimeout(400);
  const count12 = await p.evaluate(()=>({ label: document.querySelectorAll("[data-generate-plate] .generate-swatch").length,
      slider: document.querySelector('[role="slider"]')?.getAttribute("aria-valuenow") }));
  await p.screenshot({ path: `${OUT}/${name}-count12.png` });
  await p.click('[aria-label="Color harmony"]');
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/${name}-harmony-open-count12.png` });
  const dd12 = await p.evaluate(() => {
    const strips = [...document.querySelectorAll(".preview-strip")];
    return { stripSegments: strips.map(s=>s.querySelectorAll(".preview-strip-segment").length),
             truncated: strips.filter(s=>s.classList.contains("preview-strip--truncated")).length,
             stops: strips.map(s=>(s.getAttribute("data-stops")||"").split(/\s*,\s*/).length) };
  });
  await p.keyboard.press("Escape");

  console.log(`\n########## ${name}  ${viewport.width}x${viewport.height} ##########`);
  console.log("GEO", JSON.stringify(geo, null, 1));
  console.log("TRIGGER FONT", JSON.stringify(trigFont));
  console.log("DROPDOWN (count=5)", JSON.stringify(dd, null, 1));
  console.log("COUNT12", JSON.stringify(count12), "HARMONY DD @12", JSON.stringify(dd12));
  await b.close();
}

await run("desktop", { width: 1440, height: 900 });
await run("mobile", { width: 390, height: 844 });
