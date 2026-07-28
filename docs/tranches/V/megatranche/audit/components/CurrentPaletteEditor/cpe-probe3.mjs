import { chromium } from "playwright";
const out = (...a) => console.log(...a);
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => out("PAGEERROR:", e.message));
await page.goto("http://localhost:9000/", { waitUntil: "load" });
await page.waitForTimeout(4000);
await page.getByRole("combobox", { name: "Select view" }).click();
await page.waitForTimeout(300);
await page.getByRole("option", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(3000);

const dump = await page.evaluate(() => {
    const wells = [...document.querySelectorAll(".dashed-well")];
    return wells.map((w) => {
        const r = w.getBoundingClientRect();
        return {
            visible: r.width > 0 && r.height > 0,
            rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
            html: w.outerHTML.replace(/\s+/g, " ").slice(0, 2200),
        };
    });
});
out("dashed-well count:", dump.length);
for (const d of dump) out(JSON.stringify(d, null, 1));

const anyAdd = await page.evaluate(() =>
    [...document.querySelectorAll('[aria-label]')]
        .filter((e) => /Add current color/i.test(e.getAttribute("aria-label")))
        .map((e) => ({ tag: e.tagName, role: e.getAttribute("role"), cls: String(e.className).slice(0, 120), rect: e.getBoundingClientRect().width })),
);
out("elements labelled 'Add current color':", JSON.stringify(anyAdd, null, 1));
await browser.close();
