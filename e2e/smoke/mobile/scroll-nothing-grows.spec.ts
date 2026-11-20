/**
 * The FORTIETH order, C-2 ("on scroll components and items ... reload and
 * flash"): nothing grows under the finger.
 *
 * Measured on production at 390: as Home's About guide scrolled in, its
 * skipped blocks (`content-visibility: auto`) changed size on entering:
 * formula rows 24 to 41, 70 and 71 px, list items 78 to 52, 104 and 182, so
 * the text under the finger moved while it was read. The contract: scrolling
 * Home end to end at 390x844 (the document, and any scroller inside the page),
 * no element that is inside the viewport at two readings changes its block
 * size by more than 1 px between them.
 */
import { test, expect } from "@playwright/test";

test("c40 · 390: scrolling Home end to end, nothing in view changes its block size", async ({ page }) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
    await expect(page.locator(".about-card .markdown-body > *").nth(20)).toBeAttached({ timeout: 60_000 });
    // the guide's one whole layout, then skipping begins (bounded, so a guide
    // that never settles is measured as it stands)
    await page
        .locator(".markdown-wrapper[data-sized]")
        .waitFor({ state: "attached", timeout: 15_000 })
        .catch(() => {});
    await page.waitForTimeout(800);

    const faults = await page.evaluate(async () => {
        const frame = () => new Promise((r) => requestAnimationFrame(r));
        const seen = new Map<Element, number>();
        const out: string[] = [];
        const name = (el: Element) => {
            const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
            return `${el.tagName.toLowerCase()}${cls ? `.${cls}` : ""}`;
        };
        const read = () => {
            for (const el of document.querySelectorAll<HTMLElement>("main *")) {
                if (!(el instanceof HTMLElement)) continue;
                const r = el.getBoundingClientRect();
                if (r.bottom <= 0 || r.top >= window.innerHeight || r.height === 0) {
                    seen.delete(el);
                    continue;
                }
                const h = el.offsetHeight;
                const was = seen.get(el);
                if (was !== undefined && Math.abs(h - was) > 1 && out.length < 12) out.push(`${name(el)} ${was} → ${h}`);
                seen.set(el, h);
            }
        };
        const scrollers: HTMLElement[] = [
            document.scrollingElement as HTMLElement,
            ...[...document.querySelectorAll<HTMLElement>("main *")].filter((el) => {
                const oy = getComputedStyle(el).overflowY;
                return (oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1;
            }),
        ];
        for (const sc of scrollers) {
            read();
            for (let i = 0; i < 200 && sc.scrollTop + sc.clientHeight < sc.scrollHeight - 1; i++) {
                sc.scrollTop += Math.round(sc.clientHeight * 0.6);
                await frame();
                await frame();
                await new Promise((r) => setTimeout(r, 40));
                read();
            }
        }
        return out;
    });
    expect(faults, "block sizes that changed while in view").toEqual([]);
});
