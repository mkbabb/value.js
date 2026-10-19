import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5197/#/cube`, { waitUntil: "load" }); await page.waitForTimeout(3500);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "[data-slot=sheet-content]" });
  const r = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
  for (const m of r.matchedCSSRules) { const props = m.rule.style.cssProperties.filter(p => /^(position|top|bottom|inset)/.test(p.name)); if (props.length) console.log(m.rule.selectorList.text.slice(0, 120), "|", props.map(p => p.name + ":" + p.value).join("; "), "|", m.rule.origin, (m.rule.layers||[]).map(l=>l.text).join(",")); }
  await ctx.close();
} finally { await browser.close(); }
