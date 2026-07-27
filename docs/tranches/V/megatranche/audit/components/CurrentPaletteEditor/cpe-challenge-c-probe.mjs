import { chromium } from "playwright";

const BASE = "http://localhost:9000";

const run = async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

    await ctx.addInitScript(() => {
        localStorage.setItem("color-picker", JSON.stringify({
            inputColor: "oklch(72% 0.19 25deg)",
            savedColors: ["oklch(72% 0.19 25deg)", "oklch(50% 0.1 200deg)", "oklch(90% 0.05 100deg)"],
        }));
        localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
    });

    await page.goto(BASE + "/");
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.getByRole("option", { name: "Palettes", exact: true }).click();
    await page.waitForSelector(".dashed-well .swatch-row .watercolor-swatch");

    const out = {};

    out.structure = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        const row = w.querySelector(".swatch-row");
        const dots = [...row.querySelectorAll(".watercolor-swatch")];
        return {
            dotCount: dots.length,
            allSpans: dots.every((d) => d.tagName === "SPAN"),
            allAriaHidden: dots.every((d) => d.getAttribute("aria-hidden") === "true"),
            allPointerEventsNone: dots.every((d) => getComputedStyle(d).pointerEvents === "none"),
            anyAriaLabel: dots.some((d) => d.getAttribute("aria-label")),
            anyPlusGlyph: dots.some((d) => d.querySelector("svg:not(.watercolor-filter-host)")),
            focusableInsideWell: [...w.querySelectorAll("*")]
                .filter((e) => e.tabIndex >= 0 && (e.offsetWidth || e.offsetHeight))
                .map((e) => ({
                    tag: e.tagName,
                    name: e.getAttribute("aria-label") || (e.innerText || "").trim() || e.placeholder || "<NO NAME>",
                    rect: (r => ({ w: Math.round(r.width), h: Math.round(r.height) }))(e.getBoundingClientRect()),
                })),
        };
    });

    const firstDot = page.locator(".dashed-well .swatch-row > div").first();
    await firstDot.hover();
    await page.waitForTimeout(250);
    out.hoverPanel = await page.evaluate(() => {
        const p = document.querySelector(".floating-panel");
        if (!p) return null;
        return {
            ariaHidden: p.getAttribute("aria-hidden"),
            buttons: [...p.querySelectorAll("button")].map((b) => ({
                label: b.getAttribute("aria-label"),
                rect: (r => ({ w: Math.round(r.width), h: Math.round(r.height) }))(b.getBoundingClientRect()),
            })),
        };
    });
    await page.mouse.move(5, 5);
    await page.waitForTimeout(400);

    try {
        await page.locator(".add-slot-ghost").click({ timeout: 2500 });
        out.addClick = "CLICK SUCCEEDED";
    } catch (e) {
        out.addClick = "CLICK FAILED: " + String(e.message).split("\n").slice(0, 3).join(" ~ ");
    }
    try {
        await page.getByRole("button", { name: /Add current color .* to palette/ }).first().click({ timeout: 2000 });
        out.addByRole = "ROLE LOCATOR FOUND + CLICKED (the e2e spec's locator)";
    } catch (e) {
        out.addByRole = "ROLE LOCATOR FAILED: " + String(e.message).split("\n").slice(0, 2).join(" ~ ");
    }
    out.afterAddCount = await page.evaluate(() => document.querySelectorAll(".dashed-well .swatch-row .watercolor-swatch").length);

    // save flow
    const input = page.locator(".dashed-well input");
    await input.fill("Dup Test");
    await input.press("Enter");
    await page.waitForTimeout(400);
    out.afterSave = await page.evaluate(() => ({
        stored: (JSON.parse(localStorage.getItem("color-palettes") || "{}").palettes || []).map((p) => ({ name: p.name, n: p.colors.length })),
        wellText: document.querySelector(".dashed-well")?.innerText.replace(/\n/g, " | "),
        bufferDots: document.querySelectorAll(".dashed-well .swatch-row .watercolor-swatch").length,
    }));

    out.errors = errors;
    console.log(JSON.stringify(out, null, 2));
    await browser.close();
};

run().catch((e) => { console.error("PROBE FAILED", e); process.exit(1); });
