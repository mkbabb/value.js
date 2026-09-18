import { webkit } from "playwright";
const SEL='[role="textbox"][aria-label="Gradient CSS"]';
const OUT=process.argv[2];
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:"light"});
const p=await ctx.newPage();
const errs=[]; p.on("pageerror",e=>errs.push(e.message.slice(0,140)));
await p.goto("http://localhost:9000/#/gradient",{waitUntil:"load"});
await p.waitForTimeout(3200);
await p.locator(SEL).scrollIntoViewIfNeeded();
const clear=async()=>{await p.evaluate((s)=>{const el=document.querySelector(s);el.focus();const r=document.createRange();r.selectNodeContents(el);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);},SEL);await p.keyboard.press("Backspace");};

// --- A: unmount while a parse is pending -------------------------------
await clear();
await p.keyboard.type("linear-gradient(90deg, red, blue)",{delay:2});
await p.evaluate(()=>{location.hash="#/mix";});    // route away IMMEDIATELY (<500ms)
await p.waitForTimeout(1500);
console.log("A unmount-during-debounce: pageErrors=",JSON.stringify(errs));
console.log("A route now:", await p.evaluate(()=>location.hash), " editorPresent:", await p.evaluate((s)=>!!document.querySelector(s),SEL));

// --- B: MT-F001 crash → what recovery does the user get? ---------------
errs.length=0;
await p.evaluate(()=>{location.hash="#/gradient";});
await p.waitForTimeout(2500);
await p.locator(SEL).scrollIntoViewIfNeeded();
await clear();
await p.keyboard.type("linear-gradient(90deg, oklch(), blue)",{delay:3});
await p.waitForTimeout(1400);
await p.screenshot({path:`${OUT}/mtf001-panel-destroyed.png`});
const crash = await p.evaluate(()=>{
  const m=document.querySelector('main');
  const btns=[...document.querySelectorAll('button')].map(x=>(x.getAttribute('aria-label')||x.textContent||'').trim()).filter(Boolean);
  return {text:m.innerText.replace(/\s+/g,' ').slice(0,220), buttons:btns.slice(0,20), buttonCount:document.querySelectorAll('button').length};
});
console.log("B crash panel:",JSON.stringify(crash));
// click Try again
const again = p.getByRole('button',{name:/try again/i});
if (await again.count()) {
  await again.first().click(); await p.waitForTimeout(2000);
  const after=await p.evaluate((s)=>{const el=document.querySelector(s);
    return {editorPresent:!!el, text:el?el.textContent:null};},SEL);
  console.log("B after Try again:",JSON.stringify(after));
  await p.screenshot({path:`${OUT}/mtf001-after-try-again.png`});
} else console.log("B: no Try-again button found");
console.log("B pageErrors:",JSON.stringify(errs.slice(0,3)));
await b.close();
