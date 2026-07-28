import { webkit } from "playwright";
const b = await webkit.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs=[]; p.on("pageerror", e=>errs.push(String(e))); p.on("console", m=>{if(m.type()==="error")errs.push("console:"+m.text());});
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
// open the Harmony select
await p.locator("[aria-label='Palette harmony']").click();
await p.waitForTimeout(900);
const info = await p.evaluate(() => {
  const opts=[...document.querySelectorAll("[role='option']")];
  return {
    optionCount: opts.length,
    firstOptionHTMLsnippet: opts[0]?.outerHTML.slice(0,600),
    strips: document.querySelectorAll("[role='option'] [class*='strip'],[role='option'] [style*='oklch']").length,
  };
});
console.log(JSON.stringify(info,null,1));
await p.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/harmony-open.png" });
// now the Medium select
await p.keyboard.press("Escape"); await p.waitForTimeout(500);
await p.locator("[aria-label='Painterly medium']").click(); await p.waitForTimeout(700);
const media = await p.evaluate(()=>[...document.querySelectorAll("[role='option']")].map(o=>o.textContent.trim()));
console.log("MEDIA options in live DOM:", JSON.stringify(media));
await p.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/medium-open.png" });
console.log("errors:", JSON.stringify(errs));
await b.close();
