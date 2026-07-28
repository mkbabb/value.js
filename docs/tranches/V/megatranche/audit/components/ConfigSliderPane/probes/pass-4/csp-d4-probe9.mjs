import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/blob", { waitUntil:"load" });
await p.waitForTimeout(6000);
const o = await p.evaluate(() => {
  const btn = document.querySelector(".config-action-bar button");
  const out = { inline: btn.getAttribute("style"), rules: [] };
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rs) => { for (const r of rs) {
      if (r.cssRules) { walk(r.cssRules); continue; }
      if (!r.style || !r.selectorText) continue;
      let m=false; try { m = btn.matches(r.selectorText); } catch {}
      if (m && /background/.test(r.cssText)) out.rules.push(r.cssText.slice(0,300));
    }};
    walk(rules);
  }
  return out;
});
console.log(JSON.stringify(o,null,1));
await b.close();
