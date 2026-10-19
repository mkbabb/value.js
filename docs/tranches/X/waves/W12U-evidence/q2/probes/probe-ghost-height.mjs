// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o9 :142 diagnosis (r3/r6 ✘ by 0.035 px): does the Extract
// ghost's BOX move after first paint while its LAYOUT height holds, i.e. is
// the oracle's boundingBox read catching a transform on an ancestor?
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(base + "/#/extract");
    await page.locator('[data-slot="shadow-palette"]').first().waitFor();
    const t0 = Date.now();
    for (let i = 0; i < 12; i++) {
        const r = await page.evaluate(() => {
            const g = [...document.querySelectorAll('[data-slot="shadow-palette"]')].find((e) => e.getClientRects().length);
            if (!g) return "none";
            const tf = [];
            for (let a = g; a; a = a.parentElement) {
                const cs = getComputedStyle(a);
                if (cs.transform !== "none" || cs.scale !== "none") tf.push(`${a.tagName.toLowerCase()}.${[...a.classList].slice(0, 2).join(".")}:${cs.transform.slice(0, 40)}|${cs.scale}`);
            }
            return `box=${g.getBoundingClientRect().height.toFixed(4)} layout=${getComputedStyle(g).height} tf=[${tf.join(" ; ")}]`;
        });
        console.log(`+${Date.now() - t0}ms ${r}`);
        await page.waitForTimeout(150);
    }
} finally {
    await browser.close();
}
