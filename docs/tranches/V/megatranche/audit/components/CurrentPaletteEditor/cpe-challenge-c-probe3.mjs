import { chromium, devices } from "playwright";

const BASE = "http://localhost:9000";
const SEED = {
    inputColor: "oklch(72% 0.19 25deg)",
    savedColors: ["oklch(72% 0.19 25deg)", "oklch(50% 0.1 200deg)", "oklch(90% 0.05 100deg)"],
};

const openPalettes = async (page) => {
    await page.goto(BASE + "/");
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.getByRole("option", { name: "Palettes", exact: true }).click();
    await page.waitForSelector(".dashed-well .swatch-row .watercolor-swatch");
};

const run = async () => {
    const browser = await chromium.launch();
    const out = {};

    // ---------- MOBILE ----------
    {
        const ctx = await browser.newContext({ ...devices["iPhone 14"] });
        await ctx.addInitScript((seed) => {
            localStorage.setItem("color-picker", JSON.stringify(seed));
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
        }, SEED);
        const page = await ctx.newPage();
        await openPalettes(page);
        out.mobileWells = await page.evaluate(() => {
            const wells = [...document.querySelectorAll(".dashed-well")];
            return wells.map((w) => ({
                visible: !!(w.offsetWidth || w.offsetHeight),
                rect: (r => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }))(w.getBoundingClientRect()),
                dots: w.querySelectorAll(".watercolor-swatch").length,
            }));
        });
        // scroll the well into view and force-tap the first swatch
        await page.evaluate(() => document.querySelector(".dashed-well")?.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(300);
        const dot = page.locator(".dashed-well .swatch-row .watercolor-swatch").first();
        out.mobileDotBox = await dot.boundingBox().catch((e) => "no box: " + e.message);
        try {
            await dot.tap({ timeout: 3000, force: true });
            await page.waitForTimeout(400);
            out.mobileTap = "TAP DISPATCHED (forced)";
        } catch (e) {
            out.mobileTap = "TAP FAILED: " + String(e.message).split("\n").slice(0, 2).join(" ~ ");
        }
        out.mobileAfterTap = await page.evaluate(() => ({
            popoverContent: document.querySelectorAll("[data-reka-popper-content-wrapper]").length,
            floatingPanel: document.querySelectorAll(".floating-panel").length,
            anyEditCopyRemoveButton: document.querySelectorAll("button[aria-label^='Edit color'],button[aria-label^='Copy color'],button[aria-label^='Remove color']").length,
        }));
        await ctx.close();
    }

    // ---------- DESKTOP a11y names + aria-hidden focus trap ----------
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        await ctx.addInitScript((seed) => {
            localStorage.setItem("color-picker", JSON.stringify(seed));
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] }));
        }, SEED);
        const page = await ctx.newPage();
        await openPalettes(page);

        const saveBtn = page.locator(".dashed-well button").first();
        out.saveButtonAria = await saveBtn.evaluate((b) => ({
            html: b.outerHTML.slice(0, 160),
            ariaLabel: b.getAttribute("aria-label"),
            title: b.getAttribute("title"),
            text: (b.innerText || "").trim(),
            disabled: b.disabled,
        }));
        out.saveButtonAccessibleName = await page.evaluate(() => {
            const b = document.querySelector(".dashed-well button");
            // crude accname: aria-label > aria-labelledby > text > title
            return b.getAttribute("aria-label") || (b.innerText || "").trim() || b.getAttribute("title") || "";
        });
        out.inputAccessibleName = await page.evaluate(() => {
            const i = document.querySelector(".dashed-well input");
            return {
                ariaLabel: i.getAttribute("aria-label"),
                labelFor: !!(i.id && document.querySelector(`label[for="${i.id}"]`)),
                placeholder: i.placeholder,
                wrappedInLabel: !!i.closest("label"),
            };
        });

        // hover -> panel focusables inside aria-hidden
        await page.locator(".dashed-well .swatch-row > div").first().hover();
        await page.waitForTimeout(250);
        out.hoverPanelAriaHiddenFocus = await page.evaluate(() => {
            const p = document.querySelector(".floating-panel");
            if (!p) return null;
            const f = [...p.querySelectorAll("button")].filter((e) => e.tabIndex >= 0);
            return { panelAriaHidden: p.getAttribute("aria-hidden"), focusableCount: f.length, labels: f.map((e) => e.getAttribute("aria-label")) };
        });

        // Tab walk: which controls in the editor are keyboard reachable?
        await page.evaluate(() => document.querySelector(".dashed-well input")?.focus());
        const seq = [];
        for (let i = 0; i < 4; i++) {
            await page.keyboard.press("Tab");
            seq.push(await page.evaluate(() => {
                const a = document.activeElement;
                const inWell = !!(a && a.closest(".dashed-well"));
                return (inWell ? "[in-well] " : "[outside] ") + a.tagName + ":" + (a.getAttribute("aria-label") || a.placeholder || (a.innerText || "").trim() || "<NO NAME>");
            }));
        }
        out.tabSequenceFromNameInput = seq;

        // filter-graph census: how many SVG turbulence filters does the editor mount?
        out.filterCensus = await page.evaluate(() => {
            const w = document.querySelector(".dashed-well");
            return {
                inEditor: w.querySelectorAll("filter feTurbulence").length,
                pageWide: document.querySelectorAll("filter feTurbulence").length,
            };
        });
        await ctx.close();
    }

    console.log(JSON.stringify(out, null, 2));
    await browser.close();
};

run().catch((e) => { console.error("PROBE FAILED", e); process.exit(1); });
