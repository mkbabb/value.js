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
const consoleErrs = [];
page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") consoleErrs.push(m.text().slice(0, 200));
});

// /#/browse first — forces a transport attempt so the latch resolves.
await page.goto("http://localhost:9000/#/browse", { waitUntil: "domcontentloaded" });
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);

const latchText = await page.evaluate(() => {
    const hits = [];
    for (const n of document.querySelectorAll("*")) {
        if (n.children.length) continue;
        const t = (n.textContent || "").trim();
        if (/misconfigur|backend offline|unreachable/i.test(t)) hits.push(t.slice(0, 80));
    }
    return [...new Set(hits)];
});
console.log("LATCH-STATE surfaces on /#/browse:", JSON.stringify(latchText, null, 1));
console.log(
    "console errors mentioning MISCONFIGURED:",
    JSON.stringify(consoleErrs.filter((e) => /MISCONFIGURED/i.test(e)).slice(0, 2), null, 1),
);

// now /#/palettes — a `saved` palette, whose menu carries the latch-gated Publish item
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const trigger = page.locator('button[aria-label="Palette menu"]').first();
await trigger.click({ force: true });
await page.waitForTimeout(800);

const items = await page.evaluate(() =>
    [...document.querySelectorAll('[role="menuitem"]')].map((n) => ({
        text: n.textContent.replace(/\s+/g, " ").trim(),
        ariaDisabled: n.getAttribute("aria-disabled"),
        dataDisabled: n.hasAttribute("data-disabled"),
    })),
);
console.log("\nMENU on /#/palettes while latch is tripped:");
console.log(JSON.stringify(items, null, 1));

const annotated = await page.evaluate(() =>
    [...document.querySelectorAll('[role="menuitem"] span')]
        .map((s) => s.textContent.trim())
        .filter(Boolean),
);
console.log("in-menu annotations rendered:", JSON.stringify(annotated));

await browser.close();
