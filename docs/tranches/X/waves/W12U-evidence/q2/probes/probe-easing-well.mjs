// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o17 :152 diagnosis: the authoring stage's DOM under the glass
// 10.1.0 EasingPicker — which element is the canvas well, and its material.
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
        const root = document.querySelector("#easing-authoring-0");
        if (!root) return ["no #easing-authoring-0"];
        const out = [];
        const walk = (el, d) => {
            if (d > 6) return;
            const cs = getComputedStyle(el);
            out.push(`${"  ".repeat(d)}${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 4).join(".")} slot=${el.getAttribute("data-slot") ?? "-"} shadow=${cs.boxShadow.slice(0, 30)} bg=${cs.backgroundColor.slice(0, 30)}`);
            for (const c of el.children) if (c.tagName !== "svg") walk(c, d + 1);
        };
        walk(root, 0);
        return out;
    });
    console.log(r.slice(0, 30).join("\n"));
} finally {
    await browser.close();
}
