import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/blob", { waitUntil:"load" });
await p.waitForTimeout(6000);
const o = await p.evaluate(() => {
  const btn = document.querySelector(".config-action-bar button");
  const hits = [];
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rs, media) => {
      for (const r of rs) {
        if (r.cssRules) { walk(r.cssRules, r.conditionText || media); continue; }
        if (!r.style) continue;
        const bc = r.style.getPropertyValue("background-clip") || r.style.getPropertyValue("-webkit-background-clip");
        if (!bc) continue;
        let matches = false;
        try { matches = btn.matches(r.selectorText); } catch {}
        hits.push({ sel: (r.selectorText||"").slice(0,120), bc, matches, media, href: (sheet.href||"inline").slice(-40) });
      }
    };
    walk(rules, null);
  }
  // count how many buttons app-wide are affected
  const all = [...document.querySelectorAll("button")];
  const affected = all.filter(e => getComputedStyle(e).backgroundClip === "content-box");
  return {
    matchedRules: hits.filter(h => h.matches),
    sampleRules: hits.slice(0, 12),
    totalRulesWithBgClip: hits.length,
    buttonsTotal: all.length,
    buttonsContentBoxClip: affected.length,
    affectedSample: affected.slice(0,6).map(e => ({ t: e.textContent.trim().slice(0,20), cls: e.className.toString().slice(0,60), pad: getComputedStyle(e).padding, bg: getComputedStyle(e).backgroundColor })),
  };
});
console.log(JSON.stringify(o,null,1));
await b.close();
