import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(2500);
const res = await page.evaluate(async () => {
  const m = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/picker-color.ts");
  const probe = (s) => {
    try { const v = m.parsePickerColor(s); return { input: s, kind: "ok", v: String(v?.space ?? "?") }; }
    catch (e) { return { input: s, kind: "THROW", name: e.constructor.name, msg: e.message,
                         top: (e.stack || "").split("\n").slice(1, 3).join(" | ").slice(0, 260) }; }
  };
  return ["oklch()", "rgb()", "lab()", "color()", "", "oklch(1 0)", "not-a-color", "#zzz"].map(probe);
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
