import { test, expect, type Browser } from "@playwright/test";
import { decodePng } from "./fixtures/frame-diff";

/**
 * SS-8 B12-card-shell — the card meta's live falsifier.
 *
 *   · SS8-0363 (Meta U-1): the tag chip passes AA in every context, but
 *     `prefers-contrast: more` LOWERED its ratio (light 7.22 → 4.72, dark
 *     4.82 → 4.55): the elevated-contrast layer re-seats `--muted-foreground`
 *     at `:root`, the pane re-seats it to its certified `--ink-muted`, so in a
 *     pane the layer only flattened the ground. The contrast-raise layer must
 *     never reduce a ratio.
 *
 * Ratio = WCAG contrast of the chip's computed ink against its ground, the
 * dominant pixel of the chip box with the ink made transparent (the B12 seat's
 * own method). GET /palettes is routed to a two-palette wall; no server writes.
 */

const NOW = "2026-10-19T00:00:00.000Z";
// The B12 seat's routed Browse wall: public palettes carrying tags.
const WALL = ["Tagged Featured", "Tagged Five"].map((name, i) => ({
    name,
    slug: `tagged-${i}`,
    userSlug: "gallery",
    colors: ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"].map((css, position) => ({
        css,
        position,
    })),
    createdAt: NOW,
    updatedAt: NOW,
    isLocal: false,
    voteCount: 3,
    voted: false,
    visibility: "public",
    tier: i === 0 ? "featured" : "standard",
    published: true,
    tags: ["warm", "sunset", "ocean", "calm"],
    versionCount: 1,
    forkCount: 0,
}));
const isPalettesApi = (url: URL) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
    !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

test.describe.configure({ timeout: 300_000 });

function luminance([r, g, b]: number[]): number {
    const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(b!);
}
const ratio = (a: number[], b: number[]) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi! + 0.05) / (lo! + 0.05);
};

async function chipRatio(
    browser: Browser,
    colorScheme: "light" | "dark",
    contrast: "no-preference" | "more",
): Promise<{ ratio: number; ink: number[]; ground: number[] }> {
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme,
        contrast,
    });
    try {
        const page = await context.newPage();
        await page.addInitScript((t) => {
            try {
                localStorage.setItem("vueuse-color-scheme", t);
            } catch {
                /* private window */
            }
        }, colorScheme);
        await page.route(isPalettesApi, (route) =>
            route.request().method() === "GET"
                ? route.fulfill({
                      status: 200,
                      contentType: "application/json",
                      body: JSON.stringify({ data: WALL, nextCursor: null, hasMore: false }),
                  })
                : route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
        );
        await page.goto("/#/browse", { waitUntil: "domcontentloaded", timeout: 90_000 });
        const chip = page
            .locator('[role="article"].palette-card .palette-meta__chip')
            .filter({ visible: true })
            .first();
        await expect(chip).toBeVisible({ timeout: 90_000 });
        await page.waitForTimeout(1200);
        const ink = await chip.evaluate((el) => {
            const c = document.createElement("canvas");
            c.width = c.height = 1;
            const ctx = c.getContext("2d")!;
            ctx.fillStyle = getComputedStyle(el).color;
            ctx.fillRect(0, 0, 1, 1);
            return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
        });
        await chip.evaluate((el) => ((el as HTMLElement).style.color = "transparent"));
        const img = decodePng(await chip.screenshot({ animations: "disabled" }));
        const counts = new Map<string, number>();
        for (let i = 0; i < img.width * img.height; i++) {
            const o = i * img.channels;
            const key = `${img.data[o]},${img.data[o + 1]},${img.data[o + 2]}`;
            counts.set(key, (counts.get(key) ?? 0) + 1);
        }
        const ground = [...counts.entries()]
            .sort((a, b) => b[1] - a[1])[0]![0]
            .split(",")
            .map(Number);
        return { ratio: ratio(ink, ground), ink, ground };
    } finally {
        await context.close();
    }
}

for (const scheme of ["light", "dark"] as const) {
    test(`SS8-0363 · prefers-contrast: more never lowers the tag chip's ratio (${scheme})`, async ({
        browser,
    }) => {
        const normal = await chipRatio(browser, scheme, "no-preference");
        const more = await chipRatio(browser, scheme, "more");
        console.log(`SS8-0363 ${scheme}`, JSON.stringify({ normal, more }));
        expect(normal.ratio).toBeGreaterThanOrEqual(4.5);
        expect(more.ratio).toBeGreaterThanOrEqual(normal.ratio);
    });
}
