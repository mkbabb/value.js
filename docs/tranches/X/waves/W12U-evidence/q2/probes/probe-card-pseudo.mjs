// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o7 grain diagnosis: what the rung-1 card's ::before / ::after
// paint at the installed glass (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + (process.argv[3] ?? "/"));
    await page.waitForTimeout(6000);
    const r = await page.evaluate(() =>
        [...document.querySelectorAll('main [data-slot="card"].glass-resting')].map((el) => {
            const read = (p) => {
                const cs = getComputedStyle(el, p);
                return { content: cs.content, bg: cs.backgroundImage.slice(0, 80), opacity: cs.opacity, blend: cs.mixBlendMode, shadow: cs.boxShadow.slice(0, 60), border: cs.borderTopWidth };
            };
            return { cls: el.className.toString().slice(0, 60), before: read("::before"), after: read("::after") };
        }),
    );
    console.log(JSON.stringify(r, null, 1));
} finally {
    await browser.close();
}
