// SERVED MODEL: claude-opus-5-5
/**
 * V-D4 (X realization, value-DESIGN) — the About inspector's colour-space
 * nutrition label, measured in the served page.
 *
 *   · BC-CNL-9  zero separators inside `.nutrition-label` (rhythm, not rules);
 *   · BC-CNL-24 at 1800 the key→value gutter is ≤ `--phi-3` + 1 px (the
 *               label column hugs its labels; a 50 % split opened ~500 px);
 *   · BC-CNL-11 under `dir=rtl` every component row keeps its name and range
 *               inside its own column;
 *   · BC-CNL-25 no `svg` inside the label lacks both a name and `aria-hidden`;
 *   · BC-CNL-8  no element inside the label carries a hover-only background.
 */
import { test, expect, type Page } from "@playwright/test";

test.describe.configure({ timeout: 120_000 });

async function boot(page: Page) {
    await page.goto("/#/", { waitUntil: "domcontentloaded" });
    const label = page.locator(".pane-wrapper--inspector [data-space-facts]").first();
    await expect(label).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(800);
    return label;
}

for (const scheme of ["light", "dark"] as const) {
    test(`label structure at 1800 · ${scheme}`, async ({ browser }) => {
        const ctx = await browser.newContext({ viewport: { width: 1800, height: 1000 }, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            const label = await boot(page);
            const r = await label.evaluate((root) => {
                const phi3 = (() => {
                    const p = document.createElement("div");
                    p.style.cssText = "position:absolute;visibility:hidden;width:var(--phi-3)";
                    document.body.append(p);
                    const w = p.getBoundingClientRect().width;
                    p.remove();
                    return w;
                })();
                const separators = root.querySelectorAll('[data-orientation][role="none"], [role="separator"], hr').length;
                // The key→value gutter of each key/value group: from the
                // right edge of its WIDEST key's text to the left edge of its
                // value column — the column gap a reader's eye crosses. (A
                // 50 % split opened ~500 px here; a hugging column, one gap.)
                let gutter = 0;
                const textBox = (el: Element) => {
                    const range = document.createRange();
                    range.selectNodeContents(el);
                    return range.getBoundingClientRect();
                };
                // Key/value groups alternate key, value: the new `dl.nl-facts`
                // and the retired `div.grid-cols-2` alike.
                const groups: Element[][] = [
                    ...[...root.querySelectorAll("dl.nl-facts")].map((dl) => [...dl.children]),
                    ...[...root.querySelectorAll("div.grid-cols-2")].map((g) => [...g.children]),
                ];
                for (const kids of groups) {
                    const keys = kids.filter((_, i) => i % 2 === 0);
                    const vals = kids.filter((_, i) => i % 2 === 1);
                    if (!keys.length || !vals.length) continue;
                    const keyRight = Math.max(...keys.map((k) => textBox(k).right));
                    const valLeft = Math.min(...vals.map((v) => v.getBoundingClientRect().left));
                    gutter = Math.max(gutter, valLeft - keyRight);
                }
                const bareSvg = [...root.querySelectorAll("svg")].filter(
                    (s) => s.getAttribute("aria-hidden") !== "true" && !s.getAttribute("aria-label") && !s.querySelector("title"),
                ).length;
                const hoverOnly = [...root.querySelectorAll("*")].filter((e) =>
                    [...e.classList].some((c) => c.startsWith("hover:")),
                ).length;
                return { phi3, separators, gutter, bareSvg, hoverOnly };
            });
            test.info().annotations.push({ type: "reading", description: JSON.stringify(r) });
            expect(r.separators, "separators inside the label").toBe(0);
            expect(r.gutter, "key → value gutter at 1800").toBeLessThanOrEqual(r.phi3 + 1);
            expect(r.bareSvg, "svg without a name or aria-hidden").toBe(0);
            expect(r.hoverOnly, "hover-only backgrounds").toBe(0);
        } finally {
            await ctx.close();
        }
    });
}

test("component rows hold under dir=rtl at 1440", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        const label = await boot(page);
        await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
        await page.waitForTimeout(300);
        const rows = await label.evaluate((root) => {
            const cells = [...root.querySelectorAll('[data-o18="component-name"]')].map((name) => {
                const cell = name.parentElement!;
                const c = cell.getBoundingClientRect();
                const n = name.getBoundingClientRect();
                const v = (name.nextElementSibling as HTMLElement | null)?.getBoundingClientRect();
                const inside = (b: DOMRect | undefined) => !!b && b.left >= c.left - 0.5 && b.right <= c.right + 0.5;
                return { inside: inside(n) && inside(v), w: c.width };
            });
            return cells;
        });
        expect(rows.length, "component rows").toBeGreaterThan(0);
        for (const [i, row] of rows.entries()) expect(row.inside, `component row ${i} intact under rtl`).toBe(true);
    } finally {
        await ctx.close();
    }
});
