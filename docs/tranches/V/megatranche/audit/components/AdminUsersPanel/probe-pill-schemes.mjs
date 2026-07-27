import { webkit } from "playwright";
const USERS=[{slug:"aurora-drifting-lantern-4471",createdAt:"2026-07-01T10:00:00Z",status:"active",paletteCount:12}];
const b=await webkit.launch();
const out={};
for (const scheme of ["light","dark"]) {
  const c=await b.newContext({viewport:{width:1440,height:900},colorScheme:scheme});
  await c.addInitScript(`try{localStorage.setItem('vueuse-color-scheme','${scheme}');localStorage.setItem('palette-admin-token','T');const d=document.documentElement;if('${scheme}'==='dark')d.classList.add('dark');else d.classList.remove('dark');}catch(e){}`);
  await c.route("**/admin/users?**",r=>r.fulfill({status:200,contentType:"application/json",body:JSON.stringify({data:USERS,total:1,limit:50,offset:0})}));
  const p=await c.newPage();
  await p.goto("http://localhost:9000/#/admin/users",{waitUntil:"domcontentloaded"});
  await p.waitForTimeout(3400);
  out[scheme]=await p.evaluate(()=>{
    const pill=document.querySelector("main .slug-pill");
    const trash=document.querySelector('button[aria-label^="Delete user"]');
    const pal=[...document.querySelectorAll("button")].find(x=>/Palettes/.test(x.textContent||""));
    const g=e=>e?{color:getComputedStyle(e).color,border:getComputedStyle(e).borderColor,bg:getComputedStyle(e).backgroundColor}:null;
    let plate=pill,plateBg=null;
    while(plate){const bg=getComputedStyle(plate).backgroundColor;if(bg&&bg!=="rgba(0, 0, 0, 0)"){plateBg=bg;break;}plate=plate.parentElement;}
    return {pill:g(pill),trash:g(trash),palettesBtn:g(pal),plateBg,pillW:pill?.getBoundingClientRect().width};
  });
  await c.close();
}
await b.close();
console.log(JSON.stringify(out,null,1));
