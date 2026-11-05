// SERVED MODEL: claude-opus-5-5
/**
 * V-D3 · BC-PCS-10 (X realization, value-DESIGN §V-D3, falsifier "every
 * compact render at 390 shows its +k when truncated") — the ONE compact
 * palette render, in the served page.
 *
 * The admin Flagged cluster is a fixed 5.25rem column of 20 px discs (four
 * px overlap): five seats. A flagged palette of nine colours used to draw
 * five discs and drop four silently (`slice(0, 5)`); under the one policy it
 * draws four and a `+5` seat, so drawn + k is the palette's count. A
 * three-colour palette in the same list draws all three and no count.
 *
 * RED before the cure: 5 discs, no `+k` (5 + 0 ≠ 9).
 */
import { adminPopulatedTest as test, expect } from "./fixtures/admin-populated";

const NOW = "2026-11-05T00:00:00.000Z";
const NINE = ["#e11d48", "#f97316", "#facc15", "#16a34a", "#0ea5e9", "#2563eb", "#7c3aed", "#db2777", "#78716c"];

function flaggedPalette(slug: string, name: string, colors: string[]) {
    return {
        paletteSlug: slug,
        palette: {
            name,
            slug,
            userSlug: "crimson-owl-77",
            colors: colors.map((css, position) => ({ css, position })),
            tags: [],
            createdAt: NOW,
            updatedAt: NOW,
            isLocal: false,
            voteCount: 0,
            visibility: "public",
            tier: "standard",
            published: true,
        },
        flagCount: 1,
        flags: [{ reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW }],
    };
}

test.use({ viewport: { width: 390, height: 844 } });

test("390 · a truncated compact render shows +k, and drawn + k is the count", async ({ page }) => {
    const rows = [flaggedPalette("nine-hues-9a9a", "Nine Hues", NINE), flaggedPalette("three-hues-3b3b", "Three Hues", NINE.slice(0, 3))];
    await page.route("**/admin/flagged**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: rows, total: rows.length, limit: 50, offset: 0 }),
        }),
    );
    await page.goto("/#/admin/flagged");
    await expect(page.getByText("Nine Hues").first()).toBeVisible({ timeout: 60_000 });

    const read = (name: string) =>
        page
            .locator(".rounded-md.border-card-edge")
            .filter({ has: page.getByText(name, { exact: true }) })
            .first()
            .evaluate((row) => {
                // The row's swatch cluster: the compact render, or (pre-cure)
                // the five-disc column.
                const cluster =
                    row.querySelector<HTMLElement>(".compact-palette") ??
                    row.querySelector<HTMLElement>(".w-\\[5\\.25rem\\]");
                if (!cluster) return null;
                const swatches = cluster.querySelectorAll(".compact-palette [data-compact-swatch]").length ||
                    cluster.querySelectorAll(":scope > div").length;
                const more = cluster.querySelector<HTMLElement>("[data-compact-more]");
                const k = more ? Number(more.textContent!.trim().replace(/^\+/, "")) : 0;
                const box = cluster.getBoundingClientRect();
                const rights = [...cluster.children].map((c) => +(c.getBoundingClientRect().right - box.left).toFixed(2));
                const overflow = rights.some((r) => r > box.width + 0.5);
                const cs = getComputedStyle(cluster);
                return {
                    swatches,
                    k,
                    more: more?.textContent?.trim() ?? null,
                    overflow,
                    rights,
                    width: box.width,
                    size: cs.getPropertyValue("--compact-size"),
                    step: cs.getPropertyValue("--compact-step"),
                };
            });

    await expect
        .poll(async () => (await read("Nine Hues"))?.k ?? -1, { timeout: 10_000 })
        .toBeGreaterThan(0)
        .catch(async (e) => {
            console.log(`[vd3-compact] ${JSON.stringify(await read("Nine Hues"))}`);
            throw e;
        });
    const nine = await read("Nine Hues");
    const three = await read("Three Hues");
    test.info().annotations.push({ type: "reading", description: JSON.stringify({ nine, three }) });
    console.log(`[vd3-compact] ${JSON.stringify({ nine, three })}`);

    // The frame, when asked for (VD3_OUT): the flagged list at 390.
    if (process.env.VD3_OUT) await page.screenshot({ path: `${process.env.VD3_OUT}/admin-flagged-390.png` });

    expect(nine, "the nine-colour row's cluster").not.toBeNull();
    expect(nine!.more, "a truncated render shows its +k").toBe("+5");
    expect(nine!.swatches + nine!.k, "drawn + k is the palette's count").toBe(9);
    expect(nine!.overflow, "no seat crosses the column").toBe(false);
    expect(three!.swatches, "a palette that fits draws every colour").toBe(3);
    expect(three!.more, "and no count").toBeNull();
});
