// CHALLENGE-D r2 · probe 08 — verify the ICtCp / Jzazbz arms: is the space
// actually selected, and which glyph set does the rail paint? Read-only.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

const out = {};
async function pick(prefix) {
    const combo = page.locator('[role=combobox][aria-label="Select color space"]').first();
    await combo.click(); await page.waitForTimeout(700);
    const opts = await page.locator("[role=option]").allTextContents();
    const idx = opts.findIndex((t) => t.trim().startsWith(prefix));
    if (idx < 0) { await page.keyboard.press("Escape"); return { picked: false, opts }; }
    await page.locator("[role=option]").nth(idx).click();
    await page.waitForTimeout(1800);
    return { picked: true, chosenOptionText: opts[idx].slice(0, 40) };
}

async function truth(tag) {
    return page.evaluate((tag) => {
        const combo = document.querySelector('[role=combobox][aria-label="Select color space"]');
        const rail = document.querySelector(".channel-rail");
        const items = [...rail.querySelectorAll(".channel-rail-item")];
        const sliders = [...document.querySelectorAll(".channel-slider")].map((el) => el.getAttribute("aria-label"));
        const meters = [...document.querySelectorAll(".channel-meter")].map((el) => el.textContent.trim());
        return {
            tag,
            comboLabel: combo?.textContent.trim().slice(0, 40),
            railGlyphs: items.map((el) => el.textContent.trim()),
            railAria: items.map((el) => el.getAttribute("aria-label")),
            sliderAria: sliders, meters,
            tooltipSource: items.map((el) => el.getAttribute("aria-label")),
        };
    }, tag);
}

for (const s of ["ICtCp", "Jzazbz"]) {
    out[s] = { pick: await pick(s) };
    out[s].truth = await truth(s);
    // open the first tooltip to read the description + range the rail claims
    await page.hover(".channel-rail-item >> nth=1");
    await page.waitForTimeout(900);
    out[s].tooltip = await page.evaluate(() => {
        const tip = document.querySelector("[role=tooltip], [data-radix-popper-content-wrapper], [data-reka-popper-content-wrapper]");
        return tip ? tip.textContent.trim().slice(0, 160) : null;
    });
    await page.screenshot({ path: join(HERE, `shot-V-${s}-verified.png`), clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: Math.max(0, b.x - 200), y: Math.max(0, b.y - 10), width: b.width + 420, height: b.height + 20 }; }) });
    await page.mouse.move(2, 2); await page.waitForTimeout(400);
}

writeFileSync(join(HERE, "probe-08-ictcp-verify.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
