// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o10d :165 diagnosis: every visible h1-h3 in <main> on a route,
// its font, its own classes and its owner (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(base + (process.argv[3] ?? "/#/gradient"));
    await page.waitForTimeout(6000);
    const r = await page.evaluate(() =>
        [...document.querySelectorAll("main h1, main h2, main h3")].filter((el) => el.getClientRects().length > 0).map((el) => {
            const cs = getComputedStyle(el);
            const child = el.firstElementChild;
            return `${el.tagName} "${(el.textContent ?? "").trim().slice(0, 24)}" font=${cs.fontFamily.slice(0, 24)} cls=${el.className.toString().slice(0, 50)} parent=${el.parentElement?.className.toString().slice(0, 40)} child=${child?.tagName}.${child?.className.toString().slice(0, 40)} childFont=${child ? getComputedStyle(child).fontFamily.slice(0, 20) : "-"}`;
        }),
    );
    console.log(r.join("\n"));
} finally {
    await browser.close();
}
