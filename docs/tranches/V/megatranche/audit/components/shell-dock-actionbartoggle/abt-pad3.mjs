import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: '[aria-label="Toggle action bar"]' });
const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
for (const e of m.matchedCSSRules) {
  const props = e.rule.style.cssProperties.filter(x => x.name.startsWith("padding") || x.name === "--dock-compact-control-padding");
  if (props.length) console.log(JSON.stringify({ sel: e.rule.selectorList.text.slice(0, 110), layers: (e.rule.layers||[]).map(l=>l.text), origin: e.rule.origin,
    props: props.map(x => `${x.name}: ${x.value}${x.disabled ? " (DISABLED)" : ""}${x.important?" !imp":""}`) }));
}
await b.close();
