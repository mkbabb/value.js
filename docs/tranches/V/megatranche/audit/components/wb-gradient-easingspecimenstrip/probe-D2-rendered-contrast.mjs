import { webkit } from "playwright";
const URL_ = "http://localhost:9000/#/gradient";
const browser = await webkit.launch();
const out = {};
const lum = ([r,g,b]) => { const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
const cr = (a,b) => { const l=[lum(a),lum(b)].sort((p,q)=>q-p); return +((l[0]+0.05)/(l[1]+0.05)).toFixed(2); };

for (const scheme of ["light","dark"]) {
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, colorScheme: scheme, deviceScaleFactor: 3 });
  const page = await ctx.newPage();
  await page.goto(URL_, { waitUntil: "load" });
  await page.waitForTimeout(3200);
  const boxes = await page.evaluate(() => {
    const card = document.querySelector(".readout-rail").closest(".rounded-card");
    const strip = card.querySelector(".fading-scroll");
    const sr = strip.getBoundingClientRect();
    const rel = (el) => { const r = el.getBoundingClientRect();
      return { x:+(r.x-sr.x).toFixed(2), y:+(r.y-sr.y).toFixed(2), w:+r.width.toFixed(2), h:+r.height.toFixed(2) }; };
    return {
      eyebrow: rel(card.querySelector(".family-eyebrow")),
      selLabel: rel(card.querySelector('.specimen-tile[data-state="on"] .tile-label')),
      restLabel: rel(card.querySelector('[data-specimen="ease"] .tile-label')),
      restGlyph: rel(card.querySelector('[data-specimen="ease"] .tile-glyph')),
      selGlyph: rel(card.querySelector('.specimen-tile[data-state="on"] .tile-glyph')),
      stripW: +sr.width.toFixed(2),
    };
  });
  const strip = await page.evaluateHandle(() => document.querySelector(".fading-scroll"));
  const buf = await strip.asElement().screenshot();
  const blank = await ctx.newPage(); await blank.goto("about:blank");
  const px = await blank.evaluate(async ({src, boxes}) => {
    const img = new Image(); await new Promise(r => { img.onload = r; img.src = src; });
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const g = c.getContext("2d"); g.drawImage(img,0,0);
    const S = img.width / boxes.stripW;
    const extremes = (b) => {
      const d = g.getImageData(Math.round(b.x*S), Math.round(b.y*S), Math.max(1,Math.round(b.w*S)), Math.max(1,Math.round(b.h*S))).data;
      let dk=null,lt=null,dl=1e9,ll=-1;
      for (let i=0;i<d.length;i+=4){ const p=[d[i],d[i+1],d[i+2]]; const l=p[0]*0.3+p[1]*0.59+p[2]*0.11;
        if(l<dl){dl=l;dk=p;} if(l>ll){ll=l;lt=p;} }
      return { dark: dk, light: lt };
    };
    const o = {}; for (const k of ["eyebrow","selLabel","restLabel","restGlyph","selGlyph"]) o[k]=extremes(boxes[k]);
    o.scale = +S.toFixed(2);
    return o;
  }, { src: `data:image/png;base64,${buf.toString("base64")}`, boxes });
  out[scheme] = {
    eyebrow: { ink: px.eyebrow, ratio: cr(px.eyebrow.dark, px.eyebrow.light) },
    selLabel: { ink: px.selLabel, ratio: cr(px.selLabel.dark, px.selLabel.light) },
    restLabel: { ink: px.restLabel, ratio: cr(px.restLabel.dark, px.restLabel.light) },
    restGlyph: { ink: px.restGlyph, ratio: cr(px.restGlyph.dark, px.restGlyph.light) },
    selGlyph: { ink: px.selGlyph, ratio: cr(px.selGlyph.dark, px.selGlyph.light) },
  };
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
