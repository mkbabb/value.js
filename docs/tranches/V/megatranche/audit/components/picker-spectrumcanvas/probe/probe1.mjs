import { chromium } from "playwright";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/picker-spectrumcanvas/probe";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));

await page.goto("http://localhost:9000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

// 1. Static a11y / DOM facts about the spectrum
const facts = await page.evaluate(() => {
  const el = document.querySelector(".spectrum-picker");
  if (!el) return { found: false };
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    found: true,
    role: el.getAttribute("role"),
    ariaLabel: el.getAttribute("aria-label"),
    tabIndex: el.tabIndex,
    hasTabindexAttr: el.hasAttribute("tabindex"),
    ariaLive: el.getAttribute("aria-live"),
    closestFocusable: !!el.closest("[tabindex],button,a,input"),
    rect: { w: +r.width.toFixed(2), h: +r.height.toFixed(2), x: +r.x.toFixed(2), y: +r.y.toFixed(2) },
    touchAction: cs.touchAction,
    overflow: cs.overflow,
    animationName: cs.animationName,
    backgroundImage: cs.backgroundImage.slice(0, 120),
    backgroundSize: cs.backgroundSize,
    canvasChildren: el.querySelectorAll("canvas").length,
    dotRect: (() => { const d = el.querySelector(".spectrum-dot"); if (!d) return null; const dr = d.getBoundingClientRect(); return { w: +dr.width.toFixed(1), h: +dr.height.toFixed(1) }; })(),
    figureHasCaption: !!el.closest("figure")?.querySelector("figcaption"),
  };
});
console.log("FACTS", JSON.stringify(facts, null, 1));

// 2. keyboard reachability: tab through the page, see if the spectrum ever gets focus
const kb = await page.evaluate(async () => {
  const el = document.querySelector(".spectrum-picker");
  const before = el.getAttribute("aria-label");
  // simulate the only keyboard affordance: is it in the tab order?
  const focusables = Array.from(document.querySelectorAll(
    'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
  )).filter(e => e.offsetParent !== null);
  return { inTabOrder: focusables.includes(el), focusableCount: focusables.length, label: before };
});
console.log("KEYBOARD", JSON.stringify(kb));

await browser.close();
console.log("CONSOLE ERRORS:", JSON.stringify(errs.slice(0, 10), null, 1));
