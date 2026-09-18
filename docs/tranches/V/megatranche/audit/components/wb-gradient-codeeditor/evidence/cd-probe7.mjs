import { webkit } from "playwright";
const SEL = '[role="textbox"][aria-label="Gradient CSS"]';
const OUT = process.argv[2];
for (const scheme of ["light","dark"]) {
  const b = await webkit.launch();
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme: scheme });
  await ctx.addInitScript(`try{localStorage.setItem('vueuse-color-scheme',${JSON.stringify(scheme)});const d=document.documentElement;${JSON.stringify(scheme)}==='dark'?d.classList.add('dark'):d.classList.remove('dark');}catch(e){}`);
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
  await p.waitForTimeout(3200);
  await p.locator(SEL).scrollIntoViewIfNeeded();
  await p.evaluate((sel)=>{const el=document.querySelector(sel);el.focus();const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);},SEL);
  await p.keyboard.press("Backspace");
  await p.keyboard.type("linear-gradient(90deg, notacolor, blue)", { delay: 4 });
  await p.waitForTimeout(1400);          // verdict has landed; NO reveal scroll
  await p.screenshot({ path: `${OUT}/clipped-verdict-${scheme}.png`, clip: { x: 180, y: 560, width: 560, height: 340 } });
  console.log(scheme, JSON.stringify(await p.evaluate(()=>{
    const v=document.querySelector('[data-testid="gradient-parse-verdict"]');
    const r=v.getBoundingClientRect();
    const card=v.closest('.card');
    const cr=card.getBoundingClientRect();
    return {verdictBottom:+r.bottom.toFixed(1), cardBottom:+cr.bottom.toFixed(1), viewportH:innerHeight,
      belowCardBy:+(r.bottom-cr.bottom).toFixed(1), visiblePx:+Math.max(0,Math.min(r.bottom,cr.bottom)-r.top).toFixed(1), verdictH:+r.height.toFixed(1)};
  })));
  await b.close();
}
