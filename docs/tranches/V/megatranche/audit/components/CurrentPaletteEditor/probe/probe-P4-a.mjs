// CHALLENGE-C pass 4 — probe A: add-slot DOM truth + per-frame watercolor churn.
// Read-only. Run: node docs/.../probe/probe-P4-a.mjs
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/palettes";

const page = await (await chromium.launch()).newPage({
    viewport: { width: 1440, height: 900 },
});
const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + e.message));

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const out = {};

// --- 1. the add slot as it actually exists in the DOM ---
out.addSlot = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    return {
        found: true,
        tagName: el.tagName,
        ariaHidden: el.getAttribute("aria-hidden"),
        ariaLabel: el.getAttribute("aria-label"),
        tabIndex: el.tabIndex,
        pointerEvents: cs.pointerEvents,
        borderRadius: cs.borderRadius,
        childTags: [...el.children].map((c) => c.tagName + "." + (c.getAttribute("class") ?? "")),
        hasPlusSvg: !!el.querySelector("svg.lucide, svg[class*='lucide']"),
        outerHTMLHead: el.outerHTML.slice(0, 260),
    };
});
out.addButtonsByRole = await page
    .getByRole("button", { name: /Add current color/ })
    .count();

// --- 2. phantom-class resolution: walk every live stylesheet rule ---
out.rulesFor = await page.evaluate(() => {
    const names = [
        "btn-interactive",
        "floating-panel",
        "add-slot-ghost",
        "edit-overlay",
        "dashed-well",
        "swatch-row",
    ];
    const found = Object.fromEntries(names.map((n) => [n, []]));
    const walk = (rules) => {
        for (const r of rules) {
            if (r.cssRules) walk(r.cssRules);
            const sel = r.selectorText;
            if (!sel) continue;
            for (const n of names) if (sel.includes("." + n)) found[n].push(sel);
        }
    };
    for (const ss of document.styleSheets) {
        try {
            walk(ss.cssRules);
        } catch {
            /* cross-origin */
        }
    }
    return Object.fromEntries(
        Object.entries(found).map(([k, v]) => [k, { count: v.length, sample: v.slice(0, 2) }]),
    );
});

// --- 3. per-colour-change watercolor churn on the ALWAYS-MOUNTED add slot ---
// Instrument: count style-attribute mutations on the add-slot span and
// `seed` mutations on its feTurbulence, while the live colour changes.
await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    const turb = el?.querySelector("feTurbulence");
    window.__churn = { style: 0, turbSeed: 0, radii: new Set(), seeds: new Set() };
    if (!el) return;
    new MutationObserver((ms) => {
        for (const m of ms) {
            if (m.attributeName === "style") {
                window.__churn.style++;
                window.__churn.radii.add(getComputedStyle(el).borderRadius);
            }
        }
    }).observe(el, { attributes: true, attributeFilter: ["style"] });
    if (turb) {
        new MutationObserver((ms) => {
            for (const m of ms) {
                if (m.attributeName === "seed") {
                    window.__churn.turbSeed++;
                    window.__churn.seeds.add(turb.getAttribute("seed"));
                }
            }
        }).observe(turb, { attributes: true, attributeFilter: ["seed"] });
    }
});

// Drive a real colour drag on the first picker slider thumb.
const thumb = page.locator('[role="slider"]').first();
out.thumbFound = (await thumb.count()) > 0;
if (out.thumbFound) {
    const box = await thumb.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    for (let i = 1; i <= 60; i++) {
        await page.mouse.move(box.x + box.width / 2 + i * 2, box.y + box.height / 2);
        await page.waitForTimeout(8);
    }
    await page.mouse.up();
    await page.waitForTimeout(300);
}

out.churn = await page.evaluate(() => ({
    styleMutations: window.__churn.style,
    turbSeedMutations: window.__churn.turbSeed,
    distinctBorderRadii: window.__churn.radii.size,
    distinctTurbSeeds: window.__churn.seeds.size,
    sampleRadii: [...window.__churn.radii].slice(0, 3),
}));

out.consoleErrors = consoleErrors;
console.log(JSON.stringify(out, null, 2));
await page.context().browser().close();
