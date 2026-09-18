import { webkit } from "playwright";
const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const p = await c.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.route(/lab\.md/, (route) => route.abort("failed"));
await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(12000);
const s = await p.evaluate(() => {
  const alert = document.querySelector('[role="alert"], .alert');
  const skelHost = [...document.querySelectorAll("div")].find(e => /space-x-4/.test(e.className) && /h-full/.test(e.className));
  return {
    markdownBodyPresent: !!document.querySelector(".markdown-body"),
    alertPresent: !!alert,
    alertText: alert ? alert.textContent.trim().slice(0, 90) : null,
    skeletonStillMounted: !!skelHost,
    skeletonRect: skelHost ? { w: +skelHost.getBoundingClientRect().width.toFixed(1), h: +skelHost.getBoundingClientRect().height.toFixed(1) } : null,
  };
});
console.log(JSON.stringify({ state: s, errors: errs.slice(0, 6) }, null, 2));
await p.screenshot({ path: "docs/tranches/V/megatranche/audit/components/Markdown/frames/error-state.png" });
await b.close();
