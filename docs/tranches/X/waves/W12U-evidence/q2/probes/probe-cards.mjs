// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o7 diagnosis: every [data-slot=card] in <main> on a route, with
// its tier/grain/surface stamps and owner chain (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const route = process.argv[3] ?? "/";
const w = Number(process.argv[4] ?? 1440);
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(base + route);
    await page.waitForTimeout(6000);
    const r = await page.evaluate(() =>
        [...document.querySelectorAll('main [data-slot="card"]')].map((el) => {
            const chain = [];
            for (let p = el.parentElement; p && chain.length < 3; p = p.parentElement) chain.push(`${p.tagName.toLowerCase()}.${[...p.classList].slice(0, 2).join(".")}`);
            return `${el.tagName.toLowerCase()} tier=${el.dataset.tier ?? "-"} grain=${el.dataset.grain ?? "-"} surface=${el.dataset.surface ?? "-"} cls=${el.className.toString().slice(0, 90)} | ${chain.join(" < ")}`;
        }),
    );
    console.log(r.join("\n"));
} finally {
    await browser.close();
}
