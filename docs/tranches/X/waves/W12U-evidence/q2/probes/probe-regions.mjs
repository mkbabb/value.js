// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o29 :109 diagnosis: every [role=region] inside .pane-container
// on a route, with its owner chain (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const route = process.argv[3] ?? "/#/gradient";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + route);
    await page.waitForTimeout(6000);
    const r = await page.evaluate(() =>
        [...document.querySelectorAll('.pane-container [role="region"]')].map((el) => {
            const chain = [];
            for (let p = el.parentElement; p && chain.length < 4; p = p.parentElement) chain.push(`${p.tagName.toLowerCase()}.${[...p.classList].slice(0, 3).join(".")}`);
            return { tag: el.tagName, cls: el.className.toString().slice(0, 140), label: el.getAttribute("aria-label"), labelledby: el.getAttribute("aria-labelledby"), chain };
        }),
    );
    console.log(JSON.stringify(r, null, 1));
} finally {
    await browser.close();
}
