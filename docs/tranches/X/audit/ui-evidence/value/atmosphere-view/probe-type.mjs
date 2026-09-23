// READ-ONLY probe (atmosphere-view): computed type of the Select value span, pane desc, and the card's offset shadow.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const res = {};
for (const [tag, vp] of [["1440", { width: 1440, height: 900 }], ["390", { width: 390, height: 844 }]]) {
  const ctx = await b.newContext({ viewport: vp, colorScheme: "light", hasTouch: tag === "390" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "domcontentloaded", timeout: 240000 });
  await page.locator(".config-console").first().waitFor({ timeout: 120000 }).catch(async (e) => { await page.screenshot({ path: OUT + `probe-type-fail-${tag}.png` }); res[tag + "-fail"] = [page.url(), await page.evaluate(() => document.body.innerText.slice(0, 300))]; }); await new Promise((r) => setTimeout(r, 2500));
  res[tag] = await page.evaluate(() => {
    const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); return { tag: el.tagName, cls: String(el.className).slice(0, 140), font: `${s.fontStyle} ${s.fontSize}/${s.lineHeight} ${s.fontFamily.slice(0, 30)}`, synth: s.fontSynthesis, overflow: s.overflow, clamp: s.webkitLineClamp, w: el.getBoundingClientRect().width, sw: el.scrollWidth }; };
    const trig = document.querySelector(".aurora-row button[role=combobox]");
    const span = trig?.querySelector("span");
    const card = [...document.querySelectorAll(".card")].find((c) => c.querySelector(".config-console"));
    const cardS = card ? getComputedStyle(card) : null;
    const wrap = card?.parentElement; const ws = wrap ? getComputedStyle(wrap) : null;
    const root = getComputedStyle(document.documentElement);
    return { trigger: cs(trig), valueSpan: cs(span), valueSpanInner: cs(span?.firstElementChild), desc: cs(document.querySelector(".pane-header-desc")), cardShadow: cardS?.boxShadow, cardFilter: cardS?.filter, wrapShadow: ws?.boxShadow, wrapCls: String(wrap?.className).slice(0, 120), grandCls: String(wrap?.parentElement?.className).slice(0, 160), grandShadow: wrap?.parentElement ? getComputedStyle(wrap.parentElement).boxShadow : null, tokens: { dropdownText: root.getPropertyValue("--dropdown-text"), typeCaption: root.getPropertyValue("--type-caption"), radiusControl: root.getPropertyValue("--radius-control"), radiusField: root.getPropertyValue("--radius-field") } };
  });
  await ctx.close();
}
writeFileSync(OUT + "probe-type.json", JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await b.close();
