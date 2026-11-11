// SERVED MODEL: claude-opus-5-5
/**
 * X·§0hh OD-2 — "the top edge of the search bar and other bars is clipped".
 *
 * Mechanism: a focused seated bar paints its focus ring outside its border
 * box (glass's `--focus-ring-shadow` then; since o1109 canon V5 the house
 * `.focus-ring` outline, width + offset). The header-to-body gap was
 * the header's block-end padding, outside PaneShell's FadingScroll port, so
 * every pane's first-row bar sat flush (0.00px) against the port's top edge
 * and the port's padding box sliced the ring and glow flat along the top.
 *
 * The cure seats the gap as the port's block-start padding (`.pane-scroll-fade`,
 * PaneHeader.vue). Falsifier: focus each route's first-row bar and read the
 * room between the port's top edge and the bar's top against the focused
 * shadow's own outward extent (spread + blur of every outer layer). RED while
 * the room is under the extent (it read 0 before the cure); GREEN once the
 * whole ring fits inside the port.
 */
import { test, expect } from "@playwright/test";

const ROUTES = ["/browse", "/palettes", "/extract", "/generate", "/gradient"] as const;

for (const route of ROUTES) {
    test(`OD-2 — a focused first-row bar's ring fits inside the port (${route})`, async ({ page }) => {
        test.setTimeout(90_000);
        await page.goto(`/#${route}`, { timeout: 60_000 });
        const input = page.locator("main .pane-scroll-fade .input-bar input").first();
        await expect(input).toBeVisible({ timeout: 30_000 });
        await input.focus();

        // The focus ring transitions in; read it once the bar's transitions
        // have settled (a mid-transition read under-reports the extent).
        const read = () =>
            input.evaluate((el) => {
                const bar = el.closest<HTMLElement>(".input-bar")!;
                const port = bar.closest<HTMLElement>(".pane-scroll-fade")!;
                // Outward extent of the focused shadow: per outer layer,
                // spread + blur (the focus ring's offsets are 0).
                const layers = getComputedStyle(bar).boxShadow.split(/,(?![^(]*\))/);
                let extent = 0;
                for (const layer of layers) {
                    if (/\binset\b/.test(layer)) continue;
                    const lens = (layer.replace(/[a-z-]+\([^)]*\)/g, "").match(/-?[\d.]+px/g) ?? []).map(parseFloat);
                    const [, , blur = 0, spread = 0] = lens;
                    extent = Math.max(extent, spread + blur);
                }
                // o1109 canon V5: keyboard focus on a seated search wears the
                // house ring as an OUTLINE (width + offset), not a shadow.
                const cs = getComputedStyle(bar);
                if (cs.outlineStyle !== "none")
                    extent = Math.max(extent, parseFloat(cs.outlineWidth) + parseFloat(cs.outlineOffset));
                return {
                    focused: bar.matches(":focus-within"),
                    settled: bar.getAnimations().every((a) => a.playState !== "running"),
                    room: bar.getBoundingClientRect().top - port.getBoundingClientRect().top,
                    scrollTop: port.scrollTop,
                    extent,
                };
            });
        await expect.poll(async () => {
            const s = await read();
            return s.focused && s.settled && s.extent > 0;
        }, { timeout: 10_000 }).toBe(true);
        const r = await read();
        expect(r.scrollTop, `${route}: the port is at rest`).toBe(0);
        expect(
            r.room,
            `${route}: room above the first-row bar inside the port (${r.room}px) holds the focus ring (${r.extent}px)`,
        ).toBeGreaterThanOrEqual(r.extent);
    });
}
