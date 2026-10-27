// OD19 residue — the displayed pane roots under each region wrapper (DOM read only).
// Headless shell; one browser, one context, closed in finally.
import { chromium } from "@playwright/test";
const BASE = process.env.BASE ?? "http://localhost:8475";
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    try {
        const page = await ctx.newPage();
        for (const h of ["#/", "#/mix", "#/gradient"]) {
            await page.goto(BASE + "/" + h, { timeout: 120000 });
            await page.getByRole("main").waitFor();
            await page.waitForTimeout(4000);
            console.log("==", h, await page.evaluate(() => [...document.querySelectorAll(".pane-wrapper")].map((w) => {
                const walk = (el, d) => d > 3 || !el ? "" : `<${el.tagName.toLowerCase()} ${[...el.attributes].filter((a) => a.name !== "style").map((a) => `${a.name}="${a.value.slice(0, 60)}"`).join(" ")}>` + (el.firstElementChild ? " > " + walk(el.firstElementChild, d + 1) : "");
                return walk(w, 0);
            }).join("\n")));
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
