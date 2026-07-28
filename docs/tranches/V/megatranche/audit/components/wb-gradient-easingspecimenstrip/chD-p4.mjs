import { chromium } from "playwright";
const OUT = process.argv[2];
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 2 });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
await p.locator('[aria-label="Author a custom curve"]').first().click();
await p.waitForTimeout(900);
const info = await p.evaluate(() => {
  const stage = document.querySelector(".easing-authoring");
  if (!stage) return { missing: true };
  const ctrls = [...stage.querySelectorAll("button, select, [role=combobox], [role=button], input")].map(e => ({
    tag: e.tagName, role: e.getAttribute("role"), name: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 50),
    w: +e.getBoundingClientRect().width.toFixed(0), h: +e.getBoundingClientRect().height.toFixed(0),
  }));
  const rect = stage.getBoundingClientRect();
  return { stageRect: { w: +rect.width.toFixed(1), h: +rect.height.toFixed(1) }, controls: ctrls, html: stage.innerHTML.slice(0, 900) };
});
console.log(JSON.stringify(info, null, 2));
// full open row
await p.locator("[id^=easing-interval]").first().screenshot({ path: `${OUT}-row-tuneopen.png` });
// tab-stop census across the strip
const tabs = await p.evaluate(() => {
  const strip = document.querySelector(".specimen-strip");
  const focusables = [...strip.querySelectorAll('button, [tabindex]:not([tabindex="-1"]), a[href], input, select')];
  return { count: focusables.length, anyRovingTabindex: focusables.filter(e => e.getAttribute("tabindex") === "-1").length };
});
console.log("TABSTOPS", JSON.stringify(tabs));
// label-in-name check
const lin = await p.evaluate(() => [...document.querySelectorAll(".specimen-tile")].map(e => ({ acc: e.getAttribute("aria-label"), vis: e.querySelector(".tile-label")?.textContent?.trim() })).filter(x => !x.acc.toLowerCase().includes((x.vis||"").toLowerCase())));
console.log("LABEL_IN_NAME_FAILURES", JSON.stringify(lin));
await b.close();
