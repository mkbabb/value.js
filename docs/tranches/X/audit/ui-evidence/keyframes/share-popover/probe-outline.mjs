// which rule kills the Copy button's focus-visible outline — READ-ONLY (CDP matched styles).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100);
await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800);
await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(800);
await page.keyboard.press("Tab"); await page.waitForTimeout(300);
const cdp = await page.context().newCDPSession(page);
await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "button[title='Copy share link']" });
await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: ["focus", "focus-visible"] });
const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
for (const r of m.matchedCSSRules) { const o = r.rule.style.cssProperties.filter(p => /^(outline|box-shadow)$|^outline/.test(p.name) && p.value); if (o.length) console.log(r.rule.selectorList.text.slice(0, 120), "|", (r.rule.layers || []).map(l => l.text).join(">"), "|", o.map(p => p.name + ":" + p.value.slice(0, 60)).join("; "), "|", r.rule.origin, r.rule.styleSheetId && "", ); }
await browser.close();
