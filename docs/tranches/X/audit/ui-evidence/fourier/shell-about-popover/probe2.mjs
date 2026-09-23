// READ-ONLY: type-scale + trigger open-state probe
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const theme of ["light","dark"]) {
 const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
 await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
 const p = await ctx.newPage(); await p.goto("http://localhost:3100/", { waitUntil: "networkidle" }).catch(()=>{}); await p.waitForTimeout(1200);
 const trig = p.getByRole("button", { name: "About Fourier analysis" });
 const bg0 = await trig.evaluate(e => getComputedStyle(e).backgroundColor);
 await trig.click(); await p.mouse.move(1300, 800); await p.waitForTimeout(700);
 const r = await p.evaluate(() => { const t=document.querySelector('[aria-label="About Fourier analysis"]'); const s=getComputedStyle(t); const pop=document.querySelector('[data-slot="popover-content"]'); const probe=document.createElement("span"); probe.className="text-xs"; pop.appendChild(probe); const xs=getComputedStyle(probe).fontSize; probe.className="text-sm"; const sm=getComputedStyle(probe).fontSize; probe.remove(); return { trigBgOpen: s.backgroundColor, state: t.getAttribute("data-state"), expanded: t.getAttribute("aria-expanded"), rootFs: getComputedStyle(document.documentElement).fontSize, popFs: getComputedStyle(pop).fontSize, xs, sm, popLine: getComputedStyle(pop).lineHeight }; });
 await p.screenshot({ path: new URL(`./1440-${theme}-5-open-mouse-away.png`, import.meta.url).pathname, clip: { x: 440, y: 0, width: 500, height: 260 } });
 console.log(theme, bg0, JSON.stringify(r));
 await ctx.close();
}
await b.close();
