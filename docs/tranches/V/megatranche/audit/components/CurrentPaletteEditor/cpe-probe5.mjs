import { chromium, devices } from "playwright";
const out = (...a) => console.log(...a);
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const SEED = {
    inputColor: "lab(50% 20 -30)",
    savedColors: ["lab(50% 20 -30)", "lab(70% -40 10)", "lab(30% 5 60)"],
};

const browser = await chromium.launch();

// ── PART 1: TOUCH path (canHover === false) ──────────────────────────────────
{
    const ctx = await browser.newContext({ ...devices["iPhone 14"], isMobile: true, hasTouch: true });
    await ctx.addInitScript((s) => localStorage.setItem("color-picker", JSON.stringify(s)), SEED);
    const page = await ctx.newPage();
    page.on("pageerror", (e) => out("T PAGEERROR:", e.message));
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(5000);
    const canHover = await page.evaluate(() => matchMedia("(hover: hover)").matches);
    out("T (hover:hover) matches:", canHover);

    const info = await page.evaluate(() => {
        const wells = [...document.querySelectorAll(".dashed-well")].filter((w) => w.getBoundingClientRect().width > 0);
        const w = wells[0];
        if (!w) return "no visible well";
        const wrappers = [...w.querySelectorAll(".swatch-row > div.relative")];
        return {
            wrappers: wrappers.length,
            firstWrapperHTML: wrappers[0]?.outerHTML.replace(/\s+/g, " ").slice(0, 400),
            popoverTriggers: w.querySelectorAll('[aria-haspopup="dialog"],[data-reka-popper-anchor],[aria-expanded]').length,
        };
    });
    out("T well info:", JSON.stringify(info, null, 1));

    // tap the first swatch
    const wrapper = page.locator(".dashed-well .swatch-row > div.relative").first();
    if (await wrapper.count()) {
        const box = await wrapper.boundingBox();
        out("T first swatch box:", JSON.stringify(box));
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(700);
        const opened = await page.evaluate(() => ({
            popoverContent: document.querySelectorAll('[role="dialog"]').length,
            floatingPanel: document.querySelectorAll(".floating-panel").length,
            anyEditBtn: [...document.querySelectorAll("button")].filter((b) => /Edit color/.test(b.getAttribute("aria-label") || "")).length,
        }));
        out("T after tap on swatch:", JSON.stringify(opened));
    }
    await page.screenshot({ path: `${SP}/cpe-touch.png` });
    await ctx.close();
}

// ── PART 2: save + duplicate flow (desktop) ──────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript((s) => localStorage.setItem("color-picker", JSON.stringify(s)), SEED);
    const page = await ctx.newPage();
    page.on("pageerror", (e) => out("S PAGEERROR:", e.message));
    await page.goto("http://localhost:9000/", { waitUntil: "load" });
    await page.waitForTimeout(4000);
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.waitForTimeout(300);
    await page.getByRole("option", { name: "Palettes", exact: true }).click();
    await page.waitForTimeout(2500);

    const well = page.locator(".dashed-well").first();
    const nameInput = well.locator("input");
    // save #1 under an explicit name that collides with the FUTURE default
    await nameInput.fill("Palette 2");
    await nameInput.press("Enter");
    await page.waitForTimeout(800);
    let store = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes") || "{}"));
    out("S after save#1:", JSON.stringify(store.palettes?.map((p) => ({ name: p.name, n: p.colors.length }))));
    out("S current swatches after save (cleared?):", await page.locator(".dashed-well .swatch-row > div.relative").count());

    // re-seed the current buffer by re-adding via localStorage is not live; instead re-load with seed
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(4000);
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.waitForTimeout(300);
    await page.getByRole("option", { name: "Palettes", exact: true }).click();
    await page.waitForTimeout(2500);

    const well2 = page.locator(".dashed-well").first();
    const input2 = well2.locator("input");
    const ph = await input2.getAttribute("placeholder");
    out("S placeholder on 2nd save (default name):", JSON.stringify(ph));
    // press Enter with the field EMPTY -> uses the default name
    await input2.click();
    await input2.press("Enter");
    await page.waitForTimeout(700);
    const banner = await well2.innerText();
    out("S well text after default-name save:", JSON.stringify(banner.replace(/\s+/g, " ")));
    store = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes") || "{}"));
    out("S store after default-name save:", JSON.stringify(store.palettes?.map((p) => p.name)));

    // stale-banner: type a DIFFERENT name; does the banner clear?
    await input2.fill("Totally different");
    await page.waitForTimeout(400);
    const banner2 = await well2.innerText();
    out("S well text after retyping a unique name (banner still there?):", JSON.stringify(banner2.replace(/\s+/g, " ")));

    // click Update while the typed name is 'Totally different'
    const updateBtn = well2.getByRole("button", { name: "Update" });
    out("S Update button visible:", await updateBtn.count());
    if (await updateBtn.count()) {
        await updateBtn.click();
        await page.waitForTimeout(700);
        store = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes") || "{}"));
        out("S store after Update:", JSON.stringify(store.palettes?.map((p) => ({ name: p.name, n: p.colors.length }))));
    }
    await page.screenshot({ path: `${SP}/cpe-dup.png` });
    await ctx.close();
}

await browser.close();
