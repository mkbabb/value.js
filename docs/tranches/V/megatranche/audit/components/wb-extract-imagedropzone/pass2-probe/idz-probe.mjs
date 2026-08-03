import { chromium } from "@playwright/test";

const url = "http://localhost:9000/#/extract";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const out = await page.evaluate(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    const zone = document.querySelector('[role="button"][aria-label*="Upload image"]')
        || document.querySelector('[role="button"][aria-label*="image"]');
    if (!zone) return { error: "drop zone not found" };
    const z = getComputedStyle(zone);
    const r = zone.getBoundingClientRect();
    // find a certified well consumer to compare against
    const wellEl = document.querySelector(".dashed-well");
    return {
        inkMuted: cs.getPropertyValue("--ink-muted").trim(),
        mutedForeground: cs.getPropertyValue("--muted-foreground").trim(),
        wellBg: cs.getPropertyValue("--well-bg").trim(),
        cardEdge: cs.getPropertyValue("--card-edge").trim(),
        durationFast: cs.getPropertyValue("--duration-fast").trim(),
        durationNormal: cs.getPropertyValue("--duration-normal").trim(),
        defaultTransitionDuration: cs.getPropertyValue("--default-transition-duration").trim(),
        zone: {
            inlineStyleAttr: zone.getAttribute("style"),
            classAttr: zone.getAttribute("class"),
            ariaLabel: zone.getAttribute("aria-label"),
            tabIndex: zone.getAttribute("tabindex"),
            transitionDuration: z.transitionDuration,
            transitionTimingFunction: z.transitionTimingFunction,
            transitionProperty: z.transitionProperty.slice(0, 120),
            backgroundColor: z.backgroundColor,
            borderColor: z.borderTopColor,
            borderWidth: z.borderTopWidth,
            borderStyle: z.borderTopStyle,
            borderRadius: z.borderTopLeftRadius,
            boxShadow: z.boxShadow,
            rect: { w: Math.round(r.width), h: Math.round(r.height) },
        },
        plateInkResolved: (() => {
            const el = zone.querySelector(".plate-ink");
            return el ? getComputedStyle(el).color : null;
        })(),
        dashedWellPresent: !!wellEl,
    };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
