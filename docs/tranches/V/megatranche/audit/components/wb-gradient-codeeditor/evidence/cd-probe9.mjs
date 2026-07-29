import { webkit } from "playwright";
const SEL='[role="textbox"][aria-label="Gradient CSS"]';
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:"light"});
const p=await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient",{waitUntil:"load"});
await p.waitForTimeout(3200);
await p.locator(SEL).scrollIntoViewIfNeeded();
const clear=async()=>{await p.evaluate((s)=>{const el=document.querySelector(s);el.focus();const r=document.createRange();r.selectNodeContents(el);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);},SEL);await p.keyboard.press("Backspace");};
const state=()=>p.evaluate((s)=>{const el=document.querySelector(s);const v=document.querySelector('[data-testid="gradient-parse-verdict"]');
  return {border:getComputedStyle(el).borderTopColor, ariaInvalid:el.getAttribute('aria-invalid'), verdict:v?v.textContent.trim():null, text:el.textContent.slice(0,60)};},SEL);
await clear();
await p.keyboard.type("linear-gradient(90deg, notacolor, blue)",{delay:3});
await p.waitForTimeout(900);
console.log("1 invalid settled:", JSON.stringify(await state()));
// now fix it: retype a valid value
await clear();
await p.keyboard.type("linear-gradient(90deg, red, blue)",{delay:3});
for (const t of [0,120,300,480,650]) { await p.waitForTimeout(t===0?0:120); console.log("   +"+t+"ms:", JSON.stringify(await state())); }
await p.waitForTimeout(900);
console.log("2 valid settled:", JSON.stringify(await state()));
// stale-highlight witness: is the typed text highlighted?
console.log("spans while focused:", await p.evaluate((s)=>document.querySelector(s).querySelectorAll('span').length, SEL));
await p.evaluate((s)=>document.querySelector(s).blur(),SEL);
await p.waitForTimeout(600);
console.log("after blur:", JSON.stringify(await state()), "spans:", await p.evaluate((s)=>document.querySelector(s).querySelectorAll('span').length, SEL));
await b.close();
