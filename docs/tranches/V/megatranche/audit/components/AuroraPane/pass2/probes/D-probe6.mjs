import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(() => {
  const t = document.querySelector("[aria-label='Palette harmony']");
  const lab = document.querySelector(".aurora-row-label");
  const cs = getComputedStyle(t);
  const probe = document.createElement("span");
  t.parentElement.appendChild(probe);
  const rd = (el, n) => getComputedStyle(el).getPropertyValue(n).trim();
  const out = {
    trigComputedFontSize: cs.fontSize, trigFontStyle: cs.fontStyle, trigClass: t.className.split(/\s+/).filter(c=>/^text-/.test(c)),
    tokens_at_trigger: { caption: rd(t,"--type-caption"), small: rd(t,"--type-small"), dropdown: rd(t,"--type-dropdown") },
    tokens_at_root: { caption: rd(document.documentElement,"--type-caption"), small: rd(document.documentElement,"--type-small"), dropdown: rd(document.documentElement,"--type-dropdown") },
    labelComputedFontSize: getComputedStyle(lab).fontSize,
  };
  // resolve the clamps numerically by applying them to a probe element
  const resolve = (v) => { probe.style.fontSize = v; return getComputedStyle(probe).fontSize; };
  out.resolved = { caption: resolve(out.tokens_at_trigger.caption || "0"), small: resolve(out.tokens_at_trigger.small || "0"), dropdown: resolve(out.tokens_at_trigger.dropdown || "0") };
  probe.remove();
  // which rule supplies the italic / the size
  const rules = [];
  for (const sheet of document.styleSheets) {
    let rs; try { rs = sheet.cssRules; } catch { continue; }
    for (const r of rs) {
      if (r.selectorText && /\.text-caption\b|\.text-dropdown\b/.test(r.selectorText) && !/\s/.test(r.selectorText))
        rules.push({ sel: r.selectorText, css: r.style.cssText.slice(0,160) });
    }
  }
  out.rules = rules;
  return out;
}), null, 1));
await b.close();
