// SERVED MODEL: claude-opus-5-5 — KF.W13X.springd · KFA-216 host check: every scene's stage plate bottom vs the transport dock top.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5196"; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch(); 
for (const vp of ["1440x900", "390x844"]) { const [w, h] = vp.split("x").map(Number);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 1024, hasTouch: w < 1024 }); const p = await ctx.newPage();
  for (const s of ["cube", "easing", "spring", "sequence"]) { await p.goto(`${BASE}/#/${s}`); await sleep(2800);
    const r = await p.evaluate(() => { const vis = (e) => e && e.getBoundingClientRect().width > 0; const dock = [...document.querySelectorAll('[aria-label="Select animation"],[aria-label^="Play"],[aria-label^="Pause"]')].find(vis)?.closest(".glass-dock");
      const plate = document.querySelector("main [data-tier], main .glass-card, [data-slot=card]"); const host = plate?.parentElement;
      return { dockTop: dock ? Math.round(dock.getBoundingClientRect().top) : null, plateB: plate ? Math.round(plate.getBoundingClientRect().bottom) : null, hostB: host ? Math.round(host.getBoundingClientRect().bottom) : null }; });
    console.log(vp, s, JSON.stringify(r)); } await ctx.close(); }
await b.close();
