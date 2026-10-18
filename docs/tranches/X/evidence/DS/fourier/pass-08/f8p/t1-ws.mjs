// DS-F8C-T1: which stylesheet rule sets white-space on the first inline .katex in the article (CDP matched styles; headless, §0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage();
  await p.goto("http://localhost:3217/paper", { waitUntil: "domcontentloaded" }); await p.waitForTimeout(5000);
  const s = await ctx.newCDPSession(p); await s.send("DOM.enable"); await s.send("CSS.enable");
  const { root } = await s.send("DOM.getDocument", { depth: 0 });
  const { nodeId } = await s.send("DOM.querySelector", { nodeId: root.nodeId, selector: ".paper-article p .katex" });
  const m = await s.send("CSS.getMatchedStylesForNode", { nodeId });
  const dump = (rules) => rules.filter((r) => r.rule.style.cssProperties.some((c) => c.name === "white-space")).map((r) => r.rule.selectorList.text + " => " + r.rule.style.cssProperties.filter((c) => c.name === "white-space").map((c) => c.value).join(","));
  console.log("own:", dump(m.matchedCSSRules));
  for (const [i, inh] of (m.inherited ?? []).entries()) { const d = dump(inh.matchedCSSRules); if (d.length) console.log("inherited", i, d); }
  await ctx.close();
} finally { await b.close(); }
