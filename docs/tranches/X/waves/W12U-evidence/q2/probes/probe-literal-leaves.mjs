// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o17 :152 one-literal leg: which leaves of the open row speak a
// cubic-bezier()/steps() literal under the glass 10.1.0 EasingPicker.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(base + "/#/gradient");
    await page.waitForTimeout(5000);
    const head = page.locator("main button.interval-head").first();
    if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
    await page.getByRole("button", { name: "Author a custom curve" }).first().click();
    await page.waitForTimeout(800);
    const r = await page.evaluate(() => {
        const head = document.querySelector("main button.interval-head");
        const row = document.getElementById(head?.getAttribute("aria-controls") ?? "") ?? document.querySelector("main");
        const out = [`row=${row.tagName.toLowerCase()}.${[...row.classList].slice(0, 3).join(".")}`];
        for (const n of row.querySelectorAll("*")) {
            if (n.childElementCount === 0 && /(cubic-bezier|steps)\s*\(/.test(n.textContent ?? "")) {
                const p = n.parentElement;
                out.push(`${n.tagName.toLowerCase()}.${[...n.classList].slice(0, 3).join(".")} slot=${n.getAttribute("data-slot") ?? p?.getAttribute("data-slot") ?? "-"} parent=${p?.tagName.toLowerCase()}.${[...(p?.classList ?? [])].slice(0, 2).join(".")} vis=${n.getClientRects().length > 0} sr=${getComputedStyle(n).clip} text=${(n.textContent ?? "").slice(0, 50)}`);
            }
        }
        return out;
    });
    console.log(r.slice(0, 30).join("\n"));
    // The mint-law leg: a tile press re-prints the row's first <code>.
    const row = page.locator(`[id="${await head.getAttribute("aria-controls")}"]`);
    await row.locator("[data-specimen='ease-out-back']").click();
    await page.waitForTimeout(600);
    console.log("after ease-out-back tile, first code:", await row.locator("code").first().textContent());
} finally {
    await browser.close();
}
