import { webkit } from "playwright";
const SEL = '[role="textbox"][aria-label="Gradient CSS"]';
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await p.waitForTimeout(3200);
await p.locator(SEL).scrollIntoViewIfNeeded();
console.log(JSON.stringify(await p.evaluate((sel) => {
  const el = document.querySelector(sel), cs = getComputedStyle(el);
  const rail = document.querySelector(".readout-rail");
  const rcs = rail ? getComputedStyle(rail) : null;
  // find the .glass-wash rule text
  let washRules = [];
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rs) => { for (const r of rs) {
      if (r.cssRules) { walk(r.cssRules); continue; }
      if (r.selectorText && /\.glass-wash\b/.test(r.selectorText)) washRules.push((r.cssText || "").slice(0, 320));
    } };
    walk(rules);
  }
  return {
    editor: { backgroundColor: cs.backgroundColor, backgroundImage: cs.backgroundImage,
      backdropFilter: cs.backdropFilter, webkitBackdropFilter: cs.webkitBackdropFilter,
      borderRadius: cs.borderRadius, borderColor: cs.borderTopColor, borderWidth: cs.borderTopWidth,
      padding: cs.padding, minHeight: cs.minHeight, maxHeight: cs.maxHeight,
      fontSize: cs.fontSize, lineHeight: cs.lineHeight, wordBreak: cs.wordBreak, overflowWrap: cs.overflowWrap,
      isolation: cs.isolation, boxShadow: cs.boxShadow },
    rail: rail ? { borderRadius: rcs.borderRadius, backgroundColor: rcs.backgroundColor, padding: rcs.padding,
      fontSize: rcs.fontSize, borderWidth: rcs.borderTopWidth } : null,
    washRules,
  };
}, SEL), null, 1));

// Tab reachability: focus the copy button then Tab
await p.evaluate(() => { const b=[...document.querySelectorAll('button')].find(x=>x.getAttribute('title')==='Copy CSS'); if(b) b.focus(); });
await p.keyboard.press("Tab");
await p.waitForTimeout(200);
console.log("TAB→ " + JSON.stringify(await p.evaluate(() => {
  const a = document.activeElement;
  return { tag: a.tagName, role: a.getAttribute('role'), label: a.getAttribute('aria-label') || a.textContent.slice(0,40), ce: a.isContentEditable };
})));
// shift-tab back and forward from the element before
await p.evaluate((sel)=>{document.querySelector(sel).focus();},SEL);
await p.keyboard.press("Tab");
await p.waitForTimeout(200);
console.log("TAB from editor → " + JSON.stringify(await p.evaluate(() => {
  const a = document.activeElement;
  return { tag: a.tagName, label: a.getAttribute('aria-label') || a.textContent.slice(0,40) };
})));
await b.close();
