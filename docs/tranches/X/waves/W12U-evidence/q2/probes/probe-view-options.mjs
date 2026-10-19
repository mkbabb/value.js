// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o27 :321 diagnosis: the dock view-select's option names.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(base + (process.argv[3] ?? "/"));
    await page.waitForSelector(".glass-dock");
    await page.waitForTimeout(1500);
    const sel = page.getByRole("combobox", { name: "Select view" });
    console.log("combobox visible", await sel.isVisible());
    if (!(await sel.isVisible())) {
        await page.locator(".glass-dock").click({ position: { x: 10, y: 10 } }).catch(() => {});
        await page.waitForTimeout(800);
    }
    await sel.click();
    await page.waitForTimeout(800);
    const names = await page.getByRole("option").evaluateAll((els) => els.map((e) => (e.textContent ?? "").trim() + " | aria=" + e.getAttribute("aria-label")));
    console.log(names.join("\n"));
} finally {
    await browser.close();
}
