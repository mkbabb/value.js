import { chromium } from "playwright";

const seed = {
    version: 1,
    palettes: [
        {
            id: "11111111-2222-3333-4444-555555555555",
            name: "Probe Alpha",
            slug: "probe-alpha-11111111",
            colors: [
                { css: "#ff0055", position: 0 },
                { css: "#00aaff", position: 1 },
                { css: "#22cc88", position: 2 },
            ],
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
            isLocal: true,
        },
        {
            id: "66666666-7777-8888-9999-000000000000",
            name: "Probe Beta",
            slug: "probe-beta-66666666",
            colors: [
                { css: "#111111", position: 0 },
                { css: "#eeeeee", position: 1 },
            ],
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
            isLocal: true,
        },
    ],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await ctx.addInitScript((s) => {
    localStorage.setItem("color-palettes", JSON.stringify(s));
}, seed);
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));

await page.goto("http://localhost:9000/#/mix", { waitUntil: "domcontentloaded" });
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const toggles = await page.evaluate(() =>
    [...document.querySelectorAll("button,[role=tab],[role=radio]")]
        .map((b) => (b.textContent || "").replace(/\s+/g, " ").trim())
        .filter((t) => t && t.length < 30),
);
console.log("candidate controls:", JSON.stringify([...new Set(toggles)]));

const alt = page.locator("button", { hasText: /Palettes/i }).first();
if (await alt.count()) {
    await alt.click({ force: true });
    console.log("clicked Palettes-mode control");
}
await page.waitForTimeout(1500);

const cards = await page.locator('[role="article"]').count();
console.log("cards on /mix palettes-mode:", cards);

const nested = await page.evaluate(() =>
    [...document.querySelectorAll("button button")].map((b) => {
        const outer = b.parentElement?.closest("button");
        return {
            outerAria: outer?.getAttribute("aria-label") ?? null,
            inner: b.getAttribute("aria-label") ?? (b.textContent || "").trim().slice(0, 30),
        };
    }),
);
console.log("NESTED button-in-button:", nested.length, JSON.stringify(nested, null, 1));

const trigger = page.locator('button[aria-label="Palette menu"]').first();
if (await trigger.count()) {
    await trigger.click({ force: true });
    await page.waitForTimeout(800);
    const items = await page.evaluate(() =>
        [...document.querySelectorAll('[role="menuitem"]')].map((n) =>
            n.textContent.replace(/\s+/g, " ").trim(),
        ),
    );
    console.log("menu items on /mix card:", JSON.stringify(items));
    // did opening the menu also toggle the outer selection button?
    const pressed = await page.evaluate(() =>
        [...document.querySelectorAll("button[aria-pressed]")].map(
            (b) => `${b.getAttribute("aria-label")}=${b.getAttribute("aria-pressed")}`,
        ),
    );
    console.log("aria-pressed after menu open:", JSON.stringify(pressed));

    // DEADNESS REPRODUCTION: click Delete; the store must change if the emit is wired.
    const before = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name),
    );
    let downloadFired = false;
    page.on("download", () => { downloadFired = true; });
    await page.getByRole("menuitem", { name: "Delete" }).first().click({ force: true });
    await page.waitForTimeout(1200);
    const after = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => p.name),
    );
    console.log("store BEFORE Delete:", JSON.stringify(before));
    console.log("store AFTER  Delete:", JSON.stringify(after));

    // and Export -> JSON
    await page.locator('button[aria-label="Palette menu"]').first().click({ force: true });
    await page.waitForTimeout(600);
    await page.getByRole("menuitem", { name: "Export" }).first().hover();
    await page.waitForTimeout(700);
    const sub = await page.evaluate(() =>
        [...document.querySelectorAll('[role="menuitem"]')].map((n) => n.textContent.trim()),
    );
    console.log("menu incl. submenu:", JSON.stringify(sub));
    const json = page.getByRole("menuitem", { name: "JSON" }).first();
    if (await json.count()) {
        await json.click({ force: true });
        await page.waitForTimeout(1500);
    }
    console.log("download fired after Export>JSON:", downloadFired);
} else {
    console.log("no Palette menu trigger on /mix");
}

await browser.close();
