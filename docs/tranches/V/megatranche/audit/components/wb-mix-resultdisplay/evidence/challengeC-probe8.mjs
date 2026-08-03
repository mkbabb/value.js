import { webkit } from "playwright";
const out = {};
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(4200);
const F = `(() => { let c = document.querySelector(".swatch-row").__vueParentComponent;
  while (c) { const ss = c.setupState || {}; if (ss.startMix && ss.selectedColors) return c; c = c.parent; } return null; })()`;
await page.evaluate(`(() => { const c = ${F}; c.setupState.selectedColors = [{css:"oklab(0.7 0.1 0.05)",source:"p"},{css:"oklab(0.4 -0.08 0.12)",source:"p"}]; })()`);
await page.waitForTimeout(300);

// (1) WebKit opacity trace across the whole vj-morph enter window
await page.evaluate(`(() => { ${F}.setupState.startMix(); })()`);
out.opacityTrace = [];
for (let i = 0; i < 12; i++) {
  out.opacityTrace.push(await page.evaluate(() => {
    const p = document.querySelector(".mix-plate");
    if (!p) return null;
    const cs = getComputedStyle(p);
    return [Math.round(performance.now()), cs.opacity, cs.transitionProperty, cs.transitionDuration,
            /vj-morph-enter/.test(p.className), /--ghost/.test(p.className)];
  }));
  await page.waitForTimeout(30);
}
out.ghostH = await page.evaluate(() => Math.round(document.querySelector(".mix-plate").getBoundingClientRect().height));
await page.waitForTimeout(2600);
out.settledH = await page.evaluate(() => Math.round(document.querySelector(".mix-plate").getBoundingClientRect().height));
out.settledOpacity = await page.evaluate(() => getComputedStyle(document.querySelector(".mix-plate")).opacity);

// (2) label association of the value
out.labelling = await page.evaluate(() => {
  const p = document.querySelector(".mix-plate");
  const label = p.querySelector("span");
  const value = [...p.querySelectorAll("span")].find(s => /oklab/.test(s.textContent));
  return {
    plateRole: p.getAttribute("role"), plateAriaLabel: p.getAttribute("aria-label"),
    plateId: p.id || null,
    labelText: label.textContent.trim(), labelId: label.id || null,
    valueAriaLabelledby: value ? value.getAttribute("aria-labelledby") : null,
    valueRole: value ? value.getAttribute("role") : null,
    headingsInPlate: p.querySelectorAll("h1,h2,h3,h4,h5,h6,[role=heading]").length,
  };
});

// (3) SAVE: does anything change? does the store take it?
const storeLen = () => page.evaluate(() => {
  try { const s = JSON.parse(localStorage.getItem("value-js-palettes") || localStorage.getItem("palettes") || "null");
        return s ? (s.palettes ? s.palettes.length : (Array.isArray(s) ? s.length : null)) : null; } catch { return null; }
});
out.lsKeys = await page.evaluate(() => Object.keys(localStorage));
const beforeHTML = await page.evaluate(() => document.querySelector(".mix-plate").outerHTML);
out.storeBefore = await storeLen();
const saveBtn = page.locator('.mix-plate button[title="Save to palettes"]');
await saveBtn.click();
await page.waitForTimeout(700);
out.storeAfter = await storeLen();
const afterHTML = await page.evaluate(() => document.querySelector(".mix-plate").outerHTML);
out.saveChangedPlateDom = beforeHTML !== afterHTML;
out.saveFeedback = await page.evaluate(() => {
  const p = document.querySelector(".mix-plate");
  return { plateText: p.innerText.trim(), liveRegionsInPlate: p.querySelectorAll("[aria-live],[role=status],[role=alert]").length,
           saveTitle: [...p.querySelectorAll("button")].map(x => x.getAttribute("title")),
           docToasts: document.querySelectorAll("[data-sonner-toast],.toast,[role=status]").length };
});
await saveBtn.click(); await page.waitForTimeout(500);
out.storeAfterSecondSave = await storeLen();
console.log(JSON.stringify(out, null, 1));
await b.close();
