/**
 * Riders on the perf track's files.
 *
 *   FORTY-SECOND A ("most apps have text that's too small"): at 390 no text in
 *   the About card is under 14 px, and none of its prose or facts (the guide's
 *   paragraphs and list items, the fact sheet's definition, keys and values)
 *   is under 16 px. Set mathematics is outside the rule (STUDY 2.6).
 *   FORTIETH I ("De-dupe"): no two of Blob's sliders share an accessible name
 *   (there were two "Noise frequency" and two "Noise speed").
 */
import { test, expect } from "@playwright/test";

test("FORTY-SECOND A · 390: the About card reads at the floors", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
    await expect(page.locator(".about-card .markdown-body > *").nth(10)).toBeAttached({ timeout: 60_000 });
    await expect(page.locator(".about-card [data-space-facts]")).toBeAttached();
    await page.waitForTimeout(800);
    const under = await page.evaluate(() => {
        const card = document.querySelector(".about-card")!;
        const prose = ".markdown-body p, .markdown-body li, [data-space-facts] p, [data-space-facts] dt, [data-space-facts] dd";
        const out: string[] = [];
        const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const text = n.textContent?.trim();
            const el = n.parentElement;
            if (!text || !el || el.closest(".katex, .sr-only, [aria-hidden='true']")) continue;
            const cs = getComputedStyle(el);
            if (cs.display === "none" || cs.visibility === "hidden") continue;
            const px = parseFloat(cs.fontSize);
            const floor = el.closest(prose) && !el.closest("code") ? 16 : 14;
            if (px < floor - 0.05 && out.length < 12) out.push(`${px.toFixed(1)} px < ${floor}: "${text.slice(0, 30)}" (${el.tagName.toLowerCase()})`);
        }
        return out;
    });
    expect(under, "text under its floor in the About card").toEqual([]);
});

test("FORTIETH I: Blob's sliders have distinct accessible names", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#/blob", { waitUntil: "load", timeout: 60_000 });
    const sliders = page.locator(".pane-wrapper--inspector [role='slider']");
    await expect(sliders.first()).toBeAttached({ timeout: 60_000 });
    const names = await sliders.evaluateAll((els) =>
        els.map((el) => {
            const by = el.getAttribute("aria-labelledby");
            if (by)
                return by
                    .split(/\s+/)
                    .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
                    .join(" ");
            return el.getAttribute("aria-label") ?? "";
        }),
    );
    const twice = names.filter((n, i) => names.indexOf(n) !== i);
    expect(twice, `slider names: ${names.join(", ")}`).toEqual([]);
});
