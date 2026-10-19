// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o15 T-36 diagnosis: which element wears .dock-tools-btn, what
// its padding/var read, and which rule supplies the padding (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(base + "/");
    await page.waitForSelector(".glass-dock");
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
        return [...document.querySelectorAll(".dock-tools-btn")].map((el) => {
            const cs = getComputedStyle(el);
            return {
                tag: el.tagName,
                cls: el.className,
                attrs: [...el.attributes].map((a) => a.name).filter((n) => n.startsWith("data-v")),
                padding: cs.padding,
                varPad: cs.getPropertyValue("--dock-compact-control-padding"),
                margin: `${cs.marginLeft} ${cs.marginRight}`,
            };
        });
    });
    console.log(JSON.stringify(r, null, 1));
    // Which rules declare padding on it (CDP matched styles).
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument");
    const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: ".dock-tools-btn" });
    const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
    for (const rm of m.matchedCSSRules ?? []) {
        const decl = rm.rule.style.cssProperties.filter((p) => /^padding/.test(p.name) && p.value);
        if (decl.length) console.log(rm.rule.selectorList.text.slice(0, 140), "|", (rm.rule.layers ?? []).map((l) => l.text).join(">"), "|", decl.map((d) => `${d.name}:${d.value}`).join("; "));
    }
} finally {
    await browser.close();
}
