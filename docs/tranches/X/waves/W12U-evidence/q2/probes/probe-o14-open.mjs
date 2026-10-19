// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — o14 :198 diagnosis: its own first steps, with the dock's state
// logged at each (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
// argv[3] = "swiftshader": the smoke project's own launch (playwright.config.ts:74-77).
const soft = process.argv[3] === "swiftshader";
const browser = await chromium.launch({ headless: true, ...(soft ? { channel: "chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] } : {}) });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const t0 = Date.now();
    const state = async (tag) => console.log(`${Date.now() - t0}ms ${tag}: ` + (await page.evaluate(() => {
        const d = document.querySelector(".glass-dock");
        const v = document.querySelector('[aria-label="Select view"]');
        return `cls=${[...d.classList].filter((c) => /collap|expand|hover|pinned/.test(c)).join(".")} morph=${d.hasAttribute("data-morphing")} viewVisible=${!!v && v.getClientRects().length > 0 && getComputedStyle(v).visibility !== "hidden"}`;
    })));
    await page.goto(base + "/");
    await page.waitForSelector(".glass-dock");
    await state("boot");
    for (let i = 0; i < 10; i++) { await page.waitForTimeout(500); await state("idle"); }
    console.log("mouse", JSON.stringify(await page.evaluate(() => ({ hover: document.querySelector(".glass-dock")?.matches(":hover") }))));
} finally {
    await browser.close();
}
