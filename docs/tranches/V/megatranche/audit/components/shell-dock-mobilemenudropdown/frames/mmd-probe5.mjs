import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:1, isMobile:true, hasTouch:true, colorScheme:"light" });
const page = await ctx.newPage();
await page.addInitScript(() => {
  localStorage.setItem("palette-user-slug","amaranthine-quokka-northern-marches");
  window.__clip = [];
  const orig = navigator.clipboard && navigator.clipboard.writeText;
  Object.defineProperty(navigator, "clipboard", { configurable:true, value: { writeText: (t)=>{ window.__clip.push(["api",t]); return Promise.resolve(); }, readText: ()=>Promise.resolve("") } });
  const oe = document.execCommand ? document.execCommand.bind(document) : null;
  document.execCommand = (c,...a)=>{ window.__clip.push(["exec",c]); return oe?oe(c,...a):false; };
});
await page.goto("http://localhost:9000/#/", { waitUntil:"load" });
await page.waitForTimeout(3000);
await page.locator(".dock-dropdown-trigger").first().click();
await page.waitForTimeout(500);
const before = await page.evaluate(()=>({menu:!!document.querySelector('[role="menu"]'), clip: window.__clip.slice()}));
await page.locator('[role="menuitem"]', { hasText: "Copy slug" }).first().click();
await page.waitForTimeout(800);
const after = await page.evaluate(()=>({
  menu: !!document.querySelector('[role="menu"]'),
  clip: window.__clip.slice(),
  menuText: document.querySelector('[role="menu"]') ? document.querySelector('[role="menu"]').textContent.replace(/\s+/g," ").trim().slice(0,160) : null,
  live: [...document.querySelectorAll('[aria-live]')].map(e=>({al:e.getAttribute('aria-live'), t:(e.textContent||'').trim().slice(0,60)})).filter(x=>x.t),
}));
// now Share color for comparison
let share=null;
if (after.menu) {
  await page.locator('[role="menuitem"]', { hasText: "Share color" }).first().click();
  await page.waitForTimeout(600);
  share = await page.evaluate(()=>({ menu:!!document.querySelector('[role="menu"]'), text: document.querySelector('[role="menu"]')?.textContent.replace(/\s+/g," ").trim().slice(0,160), clip: window.__clip.slice() }));
}
console.log(JSON.stringify({before,after,share},null,1));
await browser.close();
