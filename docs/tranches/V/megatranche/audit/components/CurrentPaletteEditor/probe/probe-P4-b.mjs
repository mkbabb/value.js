// CHALLENGE-C pass 4 — probe B: populated-palette DOM truth, silhouette
// mismatch (ghost preview vs the swatch it claims to preview), instance
// multiplicity, fleet-wide watercolor churn, keyboard set, tooltip liveness.
// Read-only. Run: node docs/.../probe/probe-P4-b.mjs
import { chromium } from "playwright";

const ORIGIN = "http://localhost:9000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
await page.evaluate(() => {
    localStorage.setItem(
        "color-picker",
        JSON.stringify({
            inputColor: "rgb(255 0 0)",
            savedColors: ["rgb(255 0 0)", "rgb(0 255 0)", "rgb(0 0 255)", "rgb(255 255 0)"],
        }),
    );
});
await page.goto(ORIGIN + "/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const out = {};

// --- instance multiplicity: how many editors are mounted at once ---
out.instances = await page.evaluate(() => ({
    addSlots: document.querySelectorAll(".add-slot-ghost").length,
    dashedWells: document.querySelectorAll(".dashed-well").length,
    watercolorSwatchesTotal: document.querySelectorAll(".watercolor-swatch").length,
    feTurbulenceTotal: document.querySelectorAll("feTurbulence").length,
}));

// --- the swatch row, as DOM ---
out.swatches = await page.evaluate(() => {
    const row = document.querySelector(".swatch-row");
    if (!row) return { found: false };
    const dots = [...row.querySelectorAll(".watercolor-swatch")];
    return {
        found: true,
        count: dots.length,
        detail: dots.map((d) => {
            const cs = getComputedStyle(d);
            return {
                tag: d.tagName,
                variant: d.getAttribute("data-variant"),
                ariaHidden: d.getAttribute("aria-hidden"),
                ariaLabel: d.getAttribute("aria-label"),
                tabIndex: d.tabIndex,
                pointerEvents: cs.pointerEvents,
                bg: cs.backgroundColor,
                borderRadius: cs.borderRadius,
            };
        }),
    };
});

// --- SILHOUETTE MISMATCH: the ghost preview vs the swatch it "will fill" ---
out.silhouette = await page.evaluate(() => {
    const ghost = document.querySelector(".add-slot-ghost");
    const row = document.querySelector(".swatch-row");
    const solid = row?.querySelector('.watercolor-swatch[data-variant="solid"]');
    const norm = (el) => (el ? getComputedStyle(el).borderRadius : null);
    return {
        liveColorGhostBg: ghost ? getComputedStyle(ghost).getPropertyValue("--watercolor-color").trim() : null,
        firstSwatchBg: solid ? getComputedStyle(solid).backgroundColor : null,
        ghostRadius: norm(ghost),
        firstSwatchRadius: norm(solid),
        identical: norm(ghost) === norm(solid),
        ghostTurbSeed: ghost?.querySelector("feTurbulence")?.getAttribute("seed") ?? null,
        swatchTurbSeed: solid?.querySelector("feTurbulence")?.getAttribute("seed") ?? null,
    };
});

// --- keyboard reachability inside the editor ---
out.keyboard = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    const focusables = [...well.querySelectorAll("a[href],button,input,select,textarea,[tabindex]")]
        .filter((e) => e.tabIndex >= 0 && !e.hasAttribute("disabled"));
    return focusables.map((e) => ({
        tag: e.tagName,
        name:
            e.getAttribute("aria-label") ??
            e.getAttribute("title") ??
            e.textContent.trim() ??
            "",
        placeholder: e.getAttribute("placeholder") ?? null,
        rect: (({ width, height }) => ({ width: Math.round(width), height: Math.round(height) }))(
            e.getBoundingClientRect(),
        ),
    }));
});

// --- nameless buttons in the whole pane (this component's contribution) ---
out.namelessButtonsInWell = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    return [...well.querySelectorAll("button")].map((b) => ({
        name: (b.getAttribute("aria-label") ?? b.getAttribute("title") ?? b.textContent.trim()),
        w: Math.round(b.getBoundingClientRect().width),
        h: Math.round(b.getBoundingClientRect().height),
    }));
});

// --- tooltip liveness on the add slot (TooltipTrigger as-child + inheritAttrs:false) ---
{
    const ghost = page.locator(".add-slot-ghost").first();
    const box = await ghost.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(900);
    out.tooltip = await page.evaluate(() => ({
        tooltipRoleNodes: document.querySelectorAll('[role="tooltip"]').length,
        textMentionsAddCurrent: document.body.innerText.includes("Add current color ("),
    }));
    await page.mouse.move(5, 5);
}

// --- FLEET-WIDE watercolor churn under one slider drag ---
await page.evaluate(() => {
    window.__fleet = { styleMutations: 0, seedMutations: 0, nodes: 0 };
    for (const el of document.querySelectorAll(".watercolor-swatch")) {
        window.__fleet.nodes++;
        new MutationObserver((ms) => {
            window.__fleet.styleMutations += ms.length;
        }).observe(el, { attributes: true, attributeFilter: ["style"] });
        const t = el.querySelector("feTurbulence");
        if (t)
            new MutationObserver((ms) => {
                window.__fleet.seedMutations += ms.length;
            }).observe(t, { attributes: true, attributeFilter: ["seed"] });
    }
});

const thumb = page.locator('[role="slider"]').first();
out.thumbFound = (await thumb.count()) > 0;
let dragMs = 0;
if (out.thumbFound) {
    const box = await thumb.boundingBox();
    const t0 = Date.now();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    for (let i = 1; i <= 60; i++) {
        await page.mouse.move(box.x + box.width / 2 + i * 2, box.y + box.height / 2);
        await page.waitForTimeout(8);
    }
    await page.mouse.up();
    dragMs = Date.now() - t0;
    await page.waitForTimeout(300);
}
out.fleetChurn = { ...(await page.evaluate(() => window.__fleet)), dragMs };

await page.screenshot({
    path: new URL("./p4-populated.png", import.meta.url).pathname,
    fullPage: false,
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
