// SERVED MODEL: claude-opus-5-5[1m]
// X.W5.d2 — containment arm: during the /→/gradient swap, the LEAVING About pane (inspector) computes
// contain: layout paint, and its markdown sections keep content-visibility:auto with the off-viewport ones skipped.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright-core/index.mjs";
const BASE = process.env.PROBE_BASE ?? "http://127.0.0.1:8131";
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto(`${BASE}/#/`, { waitUntil: "load" });
await page.waitForTimeout(2800);
const settled = await page.evaluate(() => {
  const secs = [...document.querySelectorAll(".pane-wrapper--inspector .markdown-body > *:not(:first-child)")];
  return { sections: secs.length, cvAuto: secs.filter((s) => getComputedStyle(s).contentVisibility === "auto").length,
    probed: secs.filter((s) => s.querySelector("*")).length, skipped: secs.filter((s) => { const c = s.querySelector("*"); return c && !c.checkVisibility({ contentVisibilityAuto: true }); }).length };
});
await page.evaluate(() => {
  window.__mid = null;
  const mo = new MutationObserver(() => {
    const el = document.querySelector(".pane-wrapper--inspector > .vj-enter-leave-active");
    if (!el || window.__mid) return;
    requestAnimationFrame(() => {
      const secs = [...el.querySelectorAll(".markdown-body > *:not(:first-child)")];
      const cs = getComputedStyle(el);
      window.__mid = { contain: cs.contain, clipMargin: cs.overflowClipMargin, h: Math.round(el.getBoundingClientRect().height),
        sections: secs.length, cvAuto: secs.filter((s) => getComputedStyle(s).contentVisibility === "auto").length,
        probed: secs.filter((s) => s.querySelector("*")).length, skipped: secs.filter((s) => { const c = s.querySelector("*"); return c && !c.checkVisibility({ contentVisibilityAuto: true }); }).length };
    });
  });
  mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
  location.hash = "#/gradient";
});
await page.waitForTimeout(1500);
const mid = await page.evaluate(() => window.__mid);
const after = await page.evaluate(() => [...document.querySelectorAll(".pane-wrapper--stage > *, .pane-wrapper--inspector > *")].map((e) => getComputedStyle(e).contain));
await b.close();
console.log(JSON.stringify({ probe: "cv-probe (X.W5.d2 containment arm)", base: BASE, at: new Date().toISOString(), settled, midLeave: mid, containAfterSwap: after }));
