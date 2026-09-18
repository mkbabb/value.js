import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(() => {
  const t = document.querySelector("[aria-label='Palette harmony']");
  const par = t.parentElement;
  const rd = (el, n) => getComputedStyle(el).getPropertyValue(n).trim();
  const probe = document.createElement("span"); par.appendChild(probe);
  const resolve = (v) => { if(!v) return "(unset)"; probe.style.fontSize = v; return getComputedStyle(probe).fontSize; };
  const toks = ["--dropdown-text","--control-text","--type-caption","--type-small"];
  const at = Object.fromEntries(toks.map(k=>[k, rd(t,k)]));
  const res = Object.fromEntries(toks.map(k=>[k, resolve(at[k])]));
  probe.remove();
  return { computedFontSize: getComputedStyle(t).fontSize, computedFontStyle: getComputedStyle(t).fontStyle,
           parentFontSize: getComputedStyle(par).fontSize, tokensAtTrigger: at, resolved: res };
}), null, 1));
await b.close();
