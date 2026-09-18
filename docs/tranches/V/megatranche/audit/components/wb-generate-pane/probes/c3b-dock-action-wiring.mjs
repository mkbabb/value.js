// C-3b — disambiguated: click the DOCK's Regenerate/Save (never the plate's)
// at mobile 390 vs desktop 1440, and report which DOM element was clicked.
import { chromium } from "playwright";

const browser = await chromium.launch();

async function run(label, viewport, isMobile) {
    const ctx = await browser.newContext({ viewport, isMobile, hasTouch: isMobile, deviceScaleFactor: isMobile ? 3 : 1 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-generate-plate]", { timeout: 30000 });
    await page.evaluate(() => localStorage.removeItem("color-palettes"));

    const plate = page.locator("[data-generate-plate]");
    const seedOf = async () => (await plate.getByText(/seed: [0-9a-f]{8}/).textContent()).trim();

    // Open the dock action bar.
    const toggle = page.getByRole("button", { name: /Toggle action bar/i });
    if (await toggle.count()) { await toggle.first().click(); await page.waitForTimeout(600); }

    // The DOCK's own Regenerate = a Regenerate button that is NOT inside the plate.
    const info = await page.evaluate(() => {
        const plateEl = document.querySelector("[data-generate-plate]");
        const all = [...document.querySelectorAll("button,[role=button]")]
            .filter((b) => /^\s*Regenerate\s*$/i.test((b.getAttribute("aria-label") || b.textContent || "")));
        return all.map((b, i) => ({
            i, inPlate: plateEl.contains(b),
            cls: (b.className || "").toString().slice(0, 50),
            dockAncestor: !!b.closest(".glass-dock"),
        }));
    });
    console.log(`[${label}] Regenerate buttons:`, JSON.stringify(info));

    const dockIdx = info.findIndex((x) => !x.inPlate);
    if (dockIdx === -1) { console.log(`[${label}] no dock Regenerate found`); await ctx.close(); return; }

    const b = await seedOf();
    await page.evaluate((i) => {
        const plateEl = document.querySelector("[data-generate-plate]");
        const all = [...document.querySelectorAll("button,[role=button]")]
            .filter((x) => /^\s*Regenerate\s*$/i.test((x.getAttribute("aria-label") || x.textContent || "")));
        all[i].click();
    }, dockIdx);
    await page.waitForTimeout(600);
    const a = await seedOf();
    console.log(`[${label}] DOCK Regenerate: ${b} -> ${a} :: ${a !== b ? "WORKS" : "DEAD (silent no-op)"}`);

    // DOCK Save palette (never the plate's).
    const savedInfo = await page.evaluate(() => {
        const plateEl = document.querySelector("[data-generate-plate]");
        const all = [...document.querySelectorAll("button,[role=button]")]
            .filter((x) => /^\s*Save palette\s*$/i.test((x.getAttribute("aria-label") || x.textContent || "")));
        const dock = all.find((x) => !plateEl.contains(x));
        if (!dock) return "no dock save";
        dock.click();
        return "clicked";
    });
    await page.waitForTimeout(600);
    const stored = await page.evaluate(() => localStorage.getItem("color-palettes"));
    console.log(`[${label}] DOCK Save (${savedInfo}) -> localStorage:`,
        stored === null ? "NULL :: DEAD (silent no-op)" : "WROTE " + stored.slice(0, 90));

    await ctx.close();
}

await run("mobile-390", { width: 390, height: 844 }, true);
await run("desktop-1440", { width: 1440, height: 900 }, false);
await browser.close();
