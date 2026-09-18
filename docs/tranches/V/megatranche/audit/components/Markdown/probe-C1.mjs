// CHALLENGE-C probe 1 — baseline: does the markdown mount at all right now?
import { webkit } from "playwright";
const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: "light", deviceScaleFactor: 1 });
const p = await c.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
p.on("console", (m) => m.type() === "error" && errs.push("CONSOLE " + m.text().slice(0, 160)));
await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(9000);
const s = await p.evaluate(() => {
  const body = document.querySelector(".markdown-body");
  const wrapper = document.querySelector(".markdown-wrapper");
  return {
    wrapperPresent: !!wrapper,
    markdownBodyPresent: !!body,
    bodyTextLen: body ? body.textContent.trim().length : 0,
    marks: document.querySelectorAll("mark.cs-name").length,
    markTexts: [...document.querySelectorAll("mark.cs-name")].slice(0, 6).map((m) => m.textContent),
    styleAttr: wrapper ? wrapper.getAttribute("style") : null,
    alerts: [...document.querySelectorAll('[role="alert"]')].map((a) => a.textContent.trim().slice(0, 70)),
    ariaBusy: wrapper ? wrapper.getAttribute("aria-busy") : null,
  };
});
console.log(JSON.stringify({ state: s, errors: errs.slice(0, 8) }, null, 2));
await p.screenshot({ path: "docs/tranches/V/megatranche/audit/components/Markdown/frames/C1-baseline.png", fullPage: false });
await b.close();
