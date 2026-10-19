// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o15 :87 diagnosis: Tab to the Tools trigger; read its focus
// paint (box-shadow, outline) and the rules that paint it (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(base + "/");
    await page.waitForSelector(".glass-dock");
    await page.waitForTimeout(1500);
    let hit = -1;
    for (let i = 0; i < 25; i++) {
        await page.keyboard.press("Tab");
        if (await page.evaluate(() => document.activeElement?.classList.contains("dock-tools-btn"))) { hit = i; break; }
    }
    const r = await page.evaluate(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        return { cls: el.className, fv: el.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, outlineOffset: cs.outlineOffset };
    });
    console.log("tabs", hit, JSON.stringify(r));
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument");
    const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: ".dock-tools-btn" });
    await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: ["focus", "focus-visible"] });
    const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
    for (const rm of m.matchedCSSRules ?? []) {
        const decl = rm.rule.style.cssProperties.filter((p) => /^(box-shadow|outline)/.test(p.name) && p.value);
        if (decl.length) console.log(rm.rule.selectorList.text.slice(0, 160), "|", (rm.rule.layers ?? []).map((l) => l.text).join(">"), "|", decl.map((d) => `${d.name}:${d.value}`).join("; ").slice(0, 200));
    }
} finally {
    await browser.close();
}
