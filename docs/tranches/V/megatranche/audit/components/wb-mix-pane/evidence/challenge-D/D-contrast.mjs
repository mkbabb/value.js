import { webkit } from "playwright";
const lin=(c)=>{c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);};
const L=([r,g,b])=>0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);
const CR=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return +((x+0.05)/(y+0.05)).toFixed(2);};

const b = await webkit.launch();
for (const scheme of ["light","dark"]) {
  const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,colorScheme:scheme});
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
  const boxes = await p.evaluate(()=>{
    const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
    const R=(e)=>{const r=e.getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
    const mix=[...card.querySelectorAll("button")].find(x=>x.innerText.trim()==="Mix");
    const well=[...card.querySelectorAll("div")].find(d=>d.textContent.trim().startsWith("Selected"));
    const ghost=card.querySelector(".add-slot-ghost")||card.querySelector("[class*=ghost]");
    const selLbl=[...card.querySelectorAll("*")].find(e=>e.children.length===0&&e.textContent.trim()==="Selected");
    return { mix:R(mix), well:R(well), ghost:ghost?R(ghost):null, selLbl:selLbl?R(selLbl):null };
  });
  const png = await p.screenshot({ type:"png" });
  const stats = await p.evaluate(async ({b64, boxes})=>{
    const img = new Image();
    await new Promise(r=>{img.onload=r; img.src="data:image/png;base64,"+b64;});
    const c=document.createElement("canvas"); c.width=img.width; c.height=img.height;
    const g=c.getContext("2d",{willReadFrequently:true}); g.drawImage(img,0,0);
    const region=(bx)=>{ if(!bx) return null; const d=g.getImageData(bx.x,bx.y,bx.w,bx.h).data;
      const hist=new Map(); let minL=1e9,maxL=-1,minPx=null,maxPx=null;
      const lin=(v)=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
      for(let i=0;i<d.length;i+=4){const px=[d[i],d[i+1],d[i+2]];
        const l=0.2126*lin(px[0])+0.7152*lin(px[1])+0.0722*lin(px[2]);
        if(l<minL){minL=l;minPx=px;} if(l>maxL){maxL=l;maxPx=px;}
        const k=px.join(","); hist.set(k,(hist.get(k)||0)+1);}
      const modal=[...hist.entries()].sort((a,b)=>b[1]-a[1])[0];
      return { darkest:minPx, lightest:maxPx, modal:modal[0].split(",").map(Number), modalShare:+(modal[1]/(d.length/4)).toFixed(3) }; };
    return { mix:region(boxes.mix), well:region(boxes.well), ghost:region(boxes.ghost), selLbl:region(boxes.selLbl) };
  }, { b64: png.toString("base64"), boxes });
  console.log(`### ${scheme}`);
  for (const [k,v] of Object.entries(stats)) {
    if(!v) { console.log(`  ${k}: (not found)`); continue; }
    console.log(`  ${k}: modal=${v.modal} (${(v.modalShare*100).toFixed(1)}%) darkest=${v.darkest} lightest=${v.lightest}`);
    console.log(`     ink-vs-plate contrast: darkest/modal = ${CR(v.darkest,v.modal)}   lightest/modal = ${CR(v.lightest,v.modal)}`);
  }
  await ctx.close();
}
await b.close();
