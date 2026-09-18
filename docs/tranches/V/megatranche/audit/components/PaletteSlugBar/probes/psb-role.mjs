// CHALLENGE-D run-4 · probe 2 — what ARIA contract does a hover-`Popover`
// actually publish, versus the `Tooltip` primitive the demo already owns?
//
// PaletteSlugBar.vue:45-59 explains the user's identity through
// `<Popover trigger="hover">` + `<PopoverContent>`. `demo/ui/tooltip/index.ts`
// re-exports glass-ui `Tooltip/TooltipTrigger/TooltipContent/TooltipProvider`
// and five demo components already consume it. Measure the rendered role and
// the describedby wiring of each, in the live app.
//
// Read-only: hover + read. No clicks, no writes.
import { webkit } from "playwright";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const read = () =>
    page.evaluate(() => {
        const surfaces = [...document.querySelectorAll("[role='tooltip'],[role='dialog'],[data-radix-popper-content-wrapper],[data-reka-popper-content-wrapper]")];
        return surfaces.map((el) => {
            const inner = el.getAttribute("role") ? el : el.querySelector("[role]");
            return {
                role: inner?.getAttribute("role") ?? null,
                id: inner?.id ?? null,
                text: (inner?.textContent ?? "").trim().slice(0, 44),
            };
        });
    });

const describedby = () =>
    page.evaluate(() =>
        [...document.querySelectorAll("[aria-describedby]")].map((e) => ({
            tag: e.tagName.toLowerCase(),
            describedby: e.getAttribute("aria-describedby"),
            label: (e.getAttribute("aria-label") ?? e.textContent ?? "").trim().slice(0, 30),
        })),
    );

console.log("baseline surfaces:", JSON.stringify(await read()));

// --- A. the demo's Tooltip primitive (CurrentPaletteEditor add-slot, :88-110)
const dot = page.locator("[data-slot='add'], .watercolor-dot, [aria-label*='Add current color' i]").first();
if (await dot.count()) {
    await dot.hover({ force: true }).catch(() => {});
    await page.waitForTimeout(700);
    console.log("\nAFTER hovering the Tooltip trigger:");
    console.log("  surfaces:", JSON.stringify(await read()));
    console.log("  describedby:", JSON.stringify(await describedby()));
    await page.mouse.move(5, 5);
    await page.waitForTimeout(500);
} else {
    console.log("\nTooltip trigger not found on /palettes");
}

// --- B. a hover-`Popover` (dock ActionButton / ColorInput — the same primitive
//        and the same `trigger="hover" :close-delay="0" :open-delay="300"`
//        recipe PaletteSlugBar.vue:45 uses)
const dockBtn = page.locator(".glass-dock button, [class*='dock'] button").first();
if (await dockBtn.count()) {
    await dockBtn.hover({ force: true }).catch(() => {});
    await page.waitForTimeout(900);
    console.log("\nAFTER hovering a dock hover-Popover trigger:");
    console.log("  surfaces:", JSON.stringify(await read()));
    console.log("  describedby:", JSON.stringify(await describedby()));
} else {
    console.log("\nno dock trigger found");
}

// --- C. is a bare <span> focusable? (the slug pill is `<span class="slug-pill">`)
const spanProbe = await page.evaluate(() => {
    const s = document.createElement("span");
    s.className = "slug-pill";
    s.textContent = "silent-drifting-cerulean-pelican";
    document.body.appendChild(s);
    s.focus();
    const out = { tabIndex: s.tabIndex, focused: document.activeElement === s, role: s.getAttribute("role") };
    s.remove();
    return out;
});
console.log("\nbare <span class='slug-pill'>:", JSON.stringify(spanProbe));

await browser.close();
