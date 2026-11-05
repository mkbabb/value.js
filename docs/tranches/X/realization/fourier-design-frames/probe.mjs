// fourier DESIGN pass probe: one browser, one context per cell, closed in finally.
import pw from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.js"; const { chromium } = pw;
import fs from "node:fs";
const OUT = "/Users/mkbabb/.dev-logs/fourier-design-2026-11-04";
const BASE = "https://fourier.babb.dev";
const VPS = [[390,844],[430,932],[844,390],[1440,900],[1800,1000]];
const ROUTES = ["/","/w","/equation","/morph","/paper","/gallery"];
const SCHEMES = ["light","dark"];
const run = process.argv[2] || "r1";
const rows = [];
const browser = await chromium.launch();
try {
  for (const scheme of SCHEMES) for (const [w,h] of VPS) for (const r of ROUTES) {
    const ctx = await browser.newContext({ viewport:{width:w,height:h}, colorScheme:scheme, deviceScaleFactor:1 });
    try {
      const page = await ctx.newPage();
      const errs = [];
      page.on("console", m => { if (m.type()==="error") errs.push(m.text().slice(0,160)); });
      page.on("pageerror", e => errs.push("pageerror "+String(e).slice(0,160)));
      await page.goto(BASE+r, { waitUntil:"networkidle", timeout:45000 }).catch(e=>errs.push("nav "+e.message.slice(0,80)));
      await page.waitForTimeout(1800);
      const m = await page.evaluate(async (route) => {
        const de = document.documentElement;
        const dock = document.querySelector('[class*="dock"]');
        const db = dock?.getBoundingClientRect();
        const fonts = [...document.fonts].filter(f=>f.status==="loaded").map(f=>f.family.replace(/"/g,""));
        let fps = null;
        if (route === "/equation") {
          const ts=[]; await new Promise(res=>{ let n=0; const f=t=>{ts.push(t); if(++n<120) requestAnimationFrame(f); else res();}; requestAnimationFrame(f);});
          const d=ts.slice(1).map((t,i)=>t-ts[i]).sort((a,b)=>a-b); fps={p50:d[d.length>>1], p95:d[Math.floor(d.length*.95)]};
        }
        return { hOverflow: de.scrollWidth - de.clientWidth, dock: db ? {x:Math.round(db.x),w:Math.round(db.width),cx:Math.round(db.x+db.width/2),y:Math.round(db.y),h:Math.round(db.height)} : null,
                 fonts:[...new Set(fonts)], fps, title: document.title };
      }, r);
      const name = `${scheme}-${w}x${h}${r.replace(/\//g,"_")||"_root"}.png`;
      if (run==="r1") await page.screenshot({ path:`${OUT}/frames/${name}` });
      rows.push({ scheme, vp:`${w}x${h}`, route:r, errs, ...m });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(`${OUT}/cells-${run}.json`, JSON.stringify(rows,null,1));
console.log(rows.length, "cells; err cells:", rows.filter(x=>x.errs.length).length, "overflow cells:", rows.filter(x=>x.hOverflow>0).length);
