// KF-C8-10 debug: which rule makes the 390 sheet position: relative. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(4000);
  const cls = await page.evaluate(() => document.querySelector("[data-slot=sheet-content]")?.className);
  console.log("class:", cls);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "[data-slot=sheet-content]" });
  const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
  for (const r of m.matchedCSSRules) {
    const pos = r.rule.style.cssProperties.filter((p) => p.name === "position" && p.value);
    if (pos.length) console.log(r.rule.selectorList.text.slice(0, 120), "=>", pos.map((p) => p.value).join(","), r.rule.origin, (r.rule.layers ?? []).map((l) => l.text).join("/"), r.rule.styleSheetId);
  }
} finally { await browser.close(); }
