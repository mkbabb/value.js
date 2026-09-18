import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const readout = () => page.evaluate(() => document.querySelector(".readout-rail code")?.textContent);
const pressed = () => page.evaluate(() => [...document.querySelectorAll(".specimen-tile")].filter((t) => t.dataset.state === "on" || t.getAttribute("data-state") === "on").map((t) => t.dataset.specimen));

// select the generic steps tile first (mode = steps)
await page.click('[data-specimen="steps"]');
await page.waitForTimeout(600);
console.log("after steps tile:", await readout(), await pressed());

// disclose the authoring stage
await page.click('button[aria-label="Author a custom curve"]');
await page.waitForTimeout(1200);

const controls = await page.evaluate(() => {
    const stage = document.querySelector("#easing-authoring-0");
    if (!stage) return { err: "no stage" };
    return {
        inputs: [...stage.querySelectorAll("input,select,[role='slider'],[role='spinbutton'],button")].slice(0, 20).map((e) => ({
            tag: e.tagName.toLowerCase(), type: e.type ?? null, role: e.getAttribute("role"),
            label: e.getAttribute("aria-label") ?? e.textContent?.trim().slice(0, 24),
            value: e.value ?? e.getAttribute("aria-valuenow"),
        })),
    };
});
console.log("=== AUTHORING CONTROLS ===", JSON.stringify(controls, null, 1));

// try to bump the steps count with the keyboard on whatever slider/spinbutton exists
const bumped = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const stage = document.querySelector("#easing-authoring-0");
    const slider = stage.querySelector("[role='slider'],input[type='range'],input[type='number']");
    if (!slider) return { err: "no steps control" };
    slider.focus();
    for (let i = 0; i < 3; i++) {
        slider.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
        await wait(150);
    }
    return { ok: true, tag: slider.tagName, role: slider.getAttribute("role"), now: slider.getAttribute("aria-valuenow") ?? slider.value };
});
console.log("=== BUMP ===", JSON.stringify(bumped, null, 1));
await page.waitForTimeout(700);
console.log("after bump — readout:", await readout(), "pressed:", await pressed());

// now press the (already-pressed) steps tile: can the user get back to steps(4, jump-end)?
await page.click('[data-specimen="steps"]');
await page.waitForTimeout(700);
console.log("after pressing the lit `steps` tile — readout:", await readout(), "pressed:", await pressed());

await browser.close();
