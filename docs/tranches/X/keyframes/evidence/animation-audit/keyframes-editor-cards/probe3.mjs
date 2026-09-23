import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "load" }); await p.waitForTimeout(4000);
console.log(JSON.stringify(await p.evaluate(() => ({
  sections: [...document.querySelectorAll(".keyframes-section")].map(s => ({ vis: !!s.offsetParent, n: s.querySelectorAll('button[aria-label^="Remove the keyframe"]').length, rect: s.getBoundingClientRect().toJSON(), path: (()=>{let a=[],e=s;while(e&&a.length<12){a.push(e.tagName+(e.className&&typeof e.className==="string"?"."+e.className.split(" ").slice(0,2).join("."):""));e=e.parentElement}return a.join("<")})() })),
  bars: [...document.querySelectorAll(".progress-bar")].map(b => ({ vis: !!b.offsetParent, r: b.getBoundingClientRect().toJSON() })),
}))));
await b.close();
