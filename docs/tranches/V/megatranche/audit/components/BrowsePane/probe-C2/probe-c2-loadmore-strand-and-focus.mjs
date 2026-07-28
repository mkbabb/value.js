import { chromium } from "playwright";
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/repro";
const out = {};
const mk = (n, off, cursor, hasMore) => ({
  data: Array.from({length: n}, (_, i) => ({
    name: `Wall Palette ${off + i + 1}`, slug: `wall-palette-${off + i + 1}`,
    colors: [{css:"#ff00aa", position:0},{css:"#00aaff", position:1},{css:"#aaff00", position:2}],
    oklabColors: [{L:0.7,a:0.1,b:0.0}], tags: [], voteCount: 0, userSlug: "someone",
    visibility: "public", tier: "standard", deletedAt: null,
    createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z",
    currentHash: "h"+(off+i), forkOf: null, forkOfHash: null, forkCount: 0,
    versionCount: 1, published: true, atomSetHash: "a"+(off+i), isLocal: false })),
  nextCursor: cursor, hasMore });

const browser = await chromium.launch({ args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"], channel:"chromium" });
const ctx = await browser.newContext({ viewport:{width:1440,height:900} });
const page = await ctx.newPage();
const CORS = {"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"};
let calls = [];
await page.route(u => /^http:\/\/localhost:9100\/palettes(\?|$)/.test(u.toString()), async (route) => {
  const url = route.request().url();
  calls.push(url.replace(/^https?:\/\/[^/]+/,""));
  const isCont = url.includes("cursor=");
  if (isCont) await new Promise(r => setTimeout(r, 2500));
  await route.fulfill({ status:200, contentType:"application/json", headers:CORS,
    body: JSON.stringify(isCont ? mk(2,50,null,false) : mk(6,0,"c1",true)) });
});
await page.route(u => /^http:\/\/localhost:9100\/(colors\/)?tags/.test(u.toString()), r => r.fulfill({status:200,contentType:"application/json",headers:CORS,body:"[]"}));
await page.route(u => /^http:\/\/localhost:9100\/sessions/.test(u.toString()), r => r.fulfill({status:200,contentType:"application/json",headers:CORS,body:JSON.stringify({slug:"tester"})}));
page.on("console", m => { if (m.type()==="error") (out.consoleErrors ??= []).push(m.text().slice(0,200)); });

await page.goto("http://localhost:9100/#/browse", {waitUntil:"domcontentloaded"});
await page.waitForTimeout(3500);
const main = page.getByRole("main");
out.cards = await main.getByRole("article").filter({visible:true}).count();

out.a11y = await page.evaluate(() => {
  const m = document.querySelector("main");
  const vis = el => { const r = el.getBoundingClientRect(); return r.width>0 && r.height>0; };
  const q = s => [...m.querySelectorAll(s)].filter(vis);
  const inputs = q("input");
  return {
    divAriaLabel: q("div[aria-label]").map(d => ({label:d.getAttribute("aria-label"), role:d.getAttribute("role")||"(none)"})),
    ariaLiveCount: q("[aria-live]").length,
    roleStatusCount: q('[role="status"]').length,
    inputs: inputs.map(i => ({aria:i.getAttribute("aria-label"), ph:i.getAttribute("placeholder"), labels:i.labels?i.labels.length:0, h:Math.round(i.getBoundingClientRect().height), w:Math.round(i.getBoundingClientRect().width)})),
    smallTargets: q('a,button,input,[role="button"],[tabindex]:not([tabindex="-1"])')
      .map(el=>{const r=el.getBoundingClientRect();return {tag:el.tagName.toLowerCase(),w:Math.round(r.width),h:Math.round(r.height),label:(el.getAttribute("aria-label")||el.textContent||"").trim().slice(0,32)};})
      .filter(t=>t.w<24||t.h<24),
  };
});

const more = main.getByRole("button", {name:"More from the commons"}).filter({visible:true});
out.moreCount = await more.count();
await more.first().focus();
out.focusBefore = await page.evaluate(()=> (document.activeElement?.textContent||"").trim().slice(0,40));
await page.keyboard.press("Enter");
await page.waitForTimeout(300);
out.focusAfterActivate = await page.evaluate(()=>({tag:document.activeElement?.tagName, text:(document.activeElement?.textContent||"").trim().slice(0,40)}));

// fresh load supersedes the in-flight continuation: type into the browse search box
const search = main.getByPlaceholder("Search the commons...").filter({visible:true}).first();
await search.fill("Wall");
await page.waitForTimeout(6500);

out.after = await page.evaluate(()=>{
  const m = document.querySelector("main");
  const vis = el => { const r = el.getBoundingClientRect(); return r.width>0 && r.height>0; };
  const q = s => [...m.querySelectorAll(s)].filter(vis);
  return { stuckSkeletons: q('[data-slot="palette-card-skeleton"]').length,
           moreButtons: q("button").filter(b=>(b.textContent||"").includes("More from the commons")).length,
           cards: q('[role="article"]').length,
           divLabels: q("div[aria-label]").map(d=>d.getAttribute("aria-label")) };
});
await page.waitForTimeout(4000);
out.after10s = await page.evaluate(()=>{
  const m = document.querySelector("main");
  const vis = el => { const r = el.getBoundingClientRect(); return r.width>0 && r.height>0; };
  return { stuckSkeletons: [...m.querySelectorAll('[data-slot="palette-card-skeleton"]')].filter(vis).length,
           moreButtons: [...m.querySelectorAll("button")].filter(vis).filter(b=>(b.textContent||"").includes("More from the commons")).length };
});
out.requests = calls;
await page.screenshot({path: SP + "/browse-stuck.png", fullPage:false});
console.log(JSON.stringify(out, null, 1));
await browser.close();
