import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await p.waitForSelector('[role="textbox"][aria-label="Gradient CSS"]', { timeout: 20000 });
console.log(JSON.stringify(await p.evaluate(() => {
  const cs = getComputedStyle(document.documentElement);
  const el = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
  const es = getComputedStyle(el);
  return {
    radiusField: cs.getPropertyValue("--radius-field").trim(),
    radiusPill: cs.getPropertyValue("--radius-pill").trim(),
    focusRingShadow: cs.getPropertyValue("--focus-ring-shadow").trim().slice(0,80),
    invalidRing: cs.getPropertyValue("--invalid-ring").trim().slice(0,80),
    inputOnGlass: cs.getPropertyValue("--input-on-glass").trim(),
    editorRadius: es.borderRadius,
    editorBg: es.backgroundColor,
    editorBorder: es.borderColor + " / " + es.borderWidth,
    editorFontSize: es.fontSize,
  };
}), null, 1));
await b.close();
