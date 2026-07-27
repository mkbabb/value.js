import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.addInitScript(() => {
  window.__diag = { rejections: [], errors: [], marks: [] };
  window.addEventListener("unhandledrejection", e => window.__diag.rejections.push(String(e.reason).slice(0,200)));
  window.addEventListener("error", e => window.__diag.errors.push((e.message||String(e)).slice(0,200)), true);
});
const cons=[]; p.on("console",m=>cons.push(m.type()+": "+m.text().slice(0,160)));
await p.goto("http://localhost:8091/", { waitUntil:"networkidle", timeout:45000 });
await p.waitForTimeout(6000);
const r = await p.evaluate(() => ({
  diag: window.__diag,
  vueApp: !!(document.querySelector("#app") && document.querySelector("#app").__vue_app__),
  appChildren: document.querySelector("#app")?.children.length ?? -1,
  perfMarks: performance.getEntriesByType("mark").map(m=>m.name),
  scriptCount: document.querySelectorAll("script").length,
  moduleScripts: [...document.querySelectorAll('script[type="module"]')].map(s=>s.src||"(inline,"+s.textContent.length+"chars)"),
  globalKeys: Object.keys(window).filter(k=>/vue|app|__/i.test(k)).slice(0,15),
}));
console.log(JSON.stringify(r,null,1));
console.log("console:", JSON.stringify(cons.slice(0,10),null,1));
await b.close();
