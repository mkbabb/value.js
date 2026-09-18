import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const routes = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/admin/users"];
console.log("route".padEnd(16), "finalURL".padEnd(26), "activePane/heading");
for (const r of routes) {
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000" + r, { waitUntil: "networkidle", timeout: 45000 }).catch(()=>{});
  await p.waitForTimeout(2000);
  const info = await p.evaluate(() => {
    const pick = (sel) => { const e = document.querySelector(sel); return e ? (e.textContent||"").trim().slice(0,40) : null; };
    return {
      path: location.pathname,
      // the biggest visible heading-ish text
      h: pick("main h1") || pick("main h2") || pick("[class*='pane'] h2") || pick("h2") || "(none)",
      panes: [...document.querySelectorAll("[data-pane],[data-view],[data-route]")].map(e=>e.getAttribute("data-pane")||e.getAttribute("data-view")||e.getAttribute("data-route")).slice(0,6),
      aria: [...document.querySelectorAll("[aria-current]")].map(e=>(e.textContent||"").trim().slice(0,20)),
      title: document.title,
    };
  }).catch(e=>({err:String(e).slice(0,80)}));
  console.log(r.padEnd(16), String(info.path).padEnd(26), JSON.stringify(info.h), "| panes:", JSON.stringify(info.panes), "| aria-current:", JSON.stringify(info.aria), "| title:", JSON.stringify(info.title));
  await p.close();
}
await b.close();
