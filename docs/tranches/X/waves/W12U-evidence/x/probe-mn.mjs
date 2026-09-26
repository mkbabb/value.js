// SERVED MODEL: claude-opus-5-5
// X.W12U.x — A2-VA-X-16 read: the only sub-11 px glyph the 11 px census found
// (`mn` 10.648 px) is KaTeX MathML inside `span.katex-mathml` (the a11y copy).
// Usage: node probe-mn.mjs
import { chromium } from "@playwright/test";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:9000/#/", { timeout: 90000 });
await p.waitForTimeout(4000);
console.log(await p.evaluate(() => [...document.querySelectorAll("mn")].map(e => { let a=e; const path=[]; for(let i=0;i<6&&a;i++){path.push(a.tagName.toLowerCase()+(a.className&&typeof a.className==="string"?"."+a.className.split(" ").slice(0,2).join("."):""));a=a.parentElement;} return getComputedStyle(e).fontSize+" '"+e.textContent+"' "+path.join("<"); }).join("\n")));
await b.close();
