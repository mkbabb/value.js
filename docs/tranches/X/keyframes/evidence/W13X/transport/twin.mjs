// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.transport · UIA-KF-051 twin-coupling probe (the ribbon Play and the dock Play drive one state?)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
for (const r of ["easing","spring","cube"]) { await p.goto(`${process.env.BASE || "http://localhost:5261"}/#/${r}`); await p.evaluate(()=>localStorage.clear()); await p.reload(); await new Promise(x=>setTimeout(x,3500));
 const st = async () => p.evaluate(()=>({ dock: document.querySelector("[data-dock-tether=bottom] button[aria-label$=' animation']")?.getAttribute("aria-label"), ribbon: [...document.querySelectorAll("button.btn-playback")].map(b=>b.textContent.trim()).join("/") }));
 const a = await st(); await p.locator("[data-dock-tether=bottom] button[aria-label$=' animation']").first().click({force:true}); await new Promise(x=>setTimeout(x,900)); const bb = await st();
 const rb = p.locator("button.btn-playback").filter({hasText:/^(Play|Pause)/}).first(); let c = null; if (await rb.count()) { await rb.click(); await new Promise(x=>setTimeout(x,900)); c = await st(); }
 console.log(r, JSON.stringify({ boot: a, afterDock: bb, afterRibbon: c })); }
await b.close();
