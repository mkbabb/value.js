import { chromium } from "playwright";
const now = new Date().toISOString();
const mk = (n,s,c)=>({id:"l-"+s,name:n,slug:s,colors:c.map((css,i)=>({css,position:i})),createdAt:now,updatedAt:now,isLocal:true});
const store = { version:1, palettes:[ mk("Sunset","sunset",["#ff5a5f","#ffb400"]), mk("Forest","forest",["#0b3d2e","#7cb518"]), mk("Ocean","ocean",["#012a4a","#a9d6e5"]) ]};
const browser = await chromium.launch();
try{
const page = await browser.newPage({ viewport:{width:1440,height:900} });
const errs=[]; page.on("pageerror",e=>errs.push("PAGEERROR "+e.message.slice(0,200)));
await page.addInitScript(s=>window.localStorage.setItem("color-palettes",JSON.stringify(s)),store);
await page.goto("http://localhost:9000/#/mix",{waitUntil:"networkidle"});
await page.waitForTimeout(2500);
await page.getByRole("button",{name:"Palettes",exact:true}).click({timeout:5000});
await page.waitForTimeout(800);
await page.getByRole("button",{name:/Select palette Sunset/}).click({timeout:4000});
await page.getByRole("button",{name:/Select palette Forest/}).click({timeout:4000});
await page.waitForTimeout(400);
const mixBtn = page.getByRole("button",{name:"Mix",exact:true});
console.log("SELECTED-SOURCES", await page.locator("[data-mix-source]").count(), "MIX-DISABLED", await mixBtn.isDisabled());

// delete Sunset from the store, same-tab, exactly as usePaletteStore would after deletePalette
await page.evaluate(() => {
  const raw = JSON.parse(localStorage.getItem("color-palettes"));
  raw.palettes = raw.palettes.filter(p => p.slug !== "sunset");
  const next = JSON.stringify(raw);
  localStorage.setItem("color-palettes", next);
  window.dispatchEvent(new StorageEvent("storage",{key:"color-palettes",newValue:next,storageArea:localStorage}));
});
await page.waitForTimeout(900);
console.log("CARDS-AFTER-DELETE", await page.locator("main [role='article']").count());
console.log("RING-LIT-AFTER-DELETE", await page.locator("main button[aria-pressed='true']").count());
console.log("MIX-SOURCES-AFTER-DELETE", await page.locator("[data-mix-source]").count());
console.log("MIX-DISABLED-AFTER-DELETE", await mixBtn.isDisabled());
// press mix and see whether the deleted palette's colors show up in the result
await mixBtn.click({timeout:4000}).catch(e=>console.log("MIXCLICK-ERR",String(e).split("\n")[0]));
await page.waitForTimeout(2500);
const txt = (await page.locator("main").innerText()).replace(/\n+/g," | ");
console.log("RESULT-TAIL", txt.slice(txt.indexOf("RESULT")).slice(0,300));
console.log("ERRS", JSON.stringify(errs));
}catch(e){console.log("ERR",String(e).split("\n")[0]);}
await browser.close();
