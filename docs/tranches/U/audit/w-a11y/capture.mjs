// U.W-A11Y π-frame capture (headless — a11y properties are deterministic).
// Usage: node capture.mjs <before|after>
// Serves off my OWN build on :8800 (NEVER :9000). Element-clipped frames only
// (probe-parsimony — no full-page dumps). Emits gradient-focus + tap-target
// frames in both schemes (+ forced-colors), with a compact DELTA line per shot.
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PHASE = process.argv[2] === "after" ? "after" : "before";
const HERE = dirname(fileURLToPath(import.meta.url));
const PI = join(HERE, "pi");
const ORIGIN = "http://localhost:8800";

const SWIFTSHADER = [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
];

async function openGradient(page) {
    await page.goto(ORIGIN, { waitUntil: "domcontentloaded" });
    // Expand the dock + switch to the Gradient view (real-user idiom).
    const pill = page.locator(".glass-dock.collapsed");
    if (await pill.count()) await pill.click().catch(() => {});
    const select = page.getByRole("combobox", { name: "Select view" });
    await select.click();
    await page.getByRole("option", { name: "Gradient", exact: true }).click();
    const main = page.getByRole("main", { name: "Color tool panes" });
    await main.getByRole("heading", { name: "Gradient" }).last().waitFor();
    await page.waitForTimeout(1200); // let the enter transition settle
    return main;
}

async function tabToHandle(page) {
    for (let i = 0; i < 80; i++) {
        await page.keyboard.press("Tab");
        const on = await page.evaluate(
            () => document.activeElement?.hasAttribute("data-stop-id") ?? false,
        );
        if (on) return true;
    }
    return false;
}

async function shot(loc, name) {
    const path = join(PI, `${name}-${PHASE}.png`);
    await loc.screenshot({ path });
    console.log(`  wrote ${name}-${PHASE}.png`);
}

async function scheme(browser, dark, forced) {
    const ctx = await browser.newContext({
        deviceScaleFactor: 2,
        colorScheme: dark ? "dark" : "light",
        ...(forced ? { forcedColors: "active" } : {}),
    });
    const page = await ctx.newPage();
    const main = await openGradient(page);
    // Set the app's own theme class to match the emulated scheme.
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(300);

    // Freeze the box-shadow transition so the ring is fully painted in the
    // frame (a capture aid — the product keeps its transition).
    await page.addStyleTag({
        content:
            ".rail-handle, .rail-remove-chip { transition: none !important; }",
    });
    const rail = main.getByTestId("gradient-stop-bar").last();
    const found = await tabToHandle(page);
    const handle = page.locator("[data-stop-id]:focus").first();
    const target = (await handle.count()) ? handle : rail;

    // Report the measured DELTA quantities for this scheme.
    const box = await (await target.count() ? target : rail).evaluate((el) => {
        const cs = getComputedStyle(el);
        const before = getComputedStyle(el, "::before");
        return {
            boxShadow: cs.boxShadow,
            outlineWidth: cs.outlineWidth,
            outlineStyle: cs.outlineStyle,
            hit: before.width,
        };
    });
    const label = `${dark ? "dark" : "light"}${forced ? "+forced" : ""}`;
    console.log(
        `  [${label}] focusFound=${found} outline=${box.outlineStyle} ${box.outlineWidth} hit(::before)=${box.hit}`,
    );
    console.log(`  [${label}] box-shadow=${box.boxShadow.slice(0, 160)}`);

    const suffix = forced ? "forced-colors" : dark ? "dark" : "light";
    await shot(rail, `gradient-focus-${suffix}`);
    await ctx.close();
}

async function tapTargets(browser, coarse) {
    const ctx = await browser.newContext(
        coarse
            ? { isMobile: true, hasTouch: true, viewport: { width: 412, height: 915 }, deviceScaleFactor: 2 }
            : { deviceScaleFactor: 2 },
    );
    const page = await ctx.newPage();
    const main = await openGradient(page);
    const rail = main.getByTestId("gradient-stop-bar").last();
    const hit = await rail
        .locator("[data-stop-id]")
        .first()
        .evaluate((el) => getComputedStyle(el, "::before").width);
    console.log(`  tap-targets ${coarse ? "coarse" : "fine"}: hit(::before)=${hit}`);
    // A wider crop around the rail so the hit-inflation context reads.
    await shot(rail, `tap-targets-${coarse ? "coarse" : "fine"}`);
    await ctx.close();
}

const browser = await chromium.launch({ args: SWIFTSHADER, channel: "chromium" });
console.log(`── capture phase=${PHASE} ──`);
await scheme(browser, false, false); // light
await scheme(browser, true, false); // dark
await scheme(browser, false, true); // forced-colors
await tapTargets(browser, false); // fine
await tapTargets(browser, true); // coarse
await browser.close();
console.log("done");
