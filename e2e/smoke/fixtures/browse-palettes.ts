/**
 * S.W5-13 — the browse keyset-cursor fixture (the "populated-fixture pattern"
 * for the public wall).
 *
 * `GET /palettes` is cursor-only (N.W3.D) and returns
 * `{ data, nextCursor, hasMore }`. The demo never advanced past page 1 until
 * W5-13 wired `nextCursor`/`loadMoreRemotePalettes`. This route helper answers
 * two keyset pages so a browse spec can prove the wall renders MORE than the
 * 50-cap:
 *   - no `cursor` param  → page 1 (`PAGE1_COUNT` rows) + `nextCursor` + hasMore
 *   - `cursor=page-2`    → page 2 (`PAGE2_COUNT` rows), `nextCursor: null`
 *
 * The card grid (Lane A) reads `role="list"`; each card is `role="article"`
 * with `aria-label="Palette: <name>"`, so a spec can count rows by name. The
 * load-more TRIGGER is Lane A's BrowsePane affordance; this fixture is the data
 * seam its pagination spec drives.
 */
import type { Page } from "@playwright/test";
import type { Palette } from "../../../demo/@/lib/palette/types";

export const PAGE1_COUNT = 50;
export const PAGE2_COUNT = 12;
export const PAGE2_CURSOR = "page-2";

const NOW = "2026-07-05T00:00:00.000Z";

function makePalette(i: number, page: 1 | 2): Palette {
    const n = page === 1 ? i : PAGE1_COUNT + i;
    return {
        name: `Wall Palette ${n}`,
        slug: `wall-palette-${n}`,
        userSlug: "gallery",
        colors: [
            { css: "#e11d48", position: 0 },
            { css: "#2563eb", position: 1 },
        ],
        createdAt: NOW,
        updatedAt: NOW,
        isLocal: false,
        voteCount: n,
        visibility: "public",
        tier: "standard",
        published: true,
    };
}

const PAGE1: Palette[] = Array.from({ length: PAGE1_COUNT }, (_, i) => makePalette(i + 1, 1));
const PAGE2: Palette[] = Array.from({ length: PAGE2_COUNT }, (_, i) => makePalette(i + 1, 2));

/**
 * Route `GET /palettes` to the two keyset pages. Scoped to the REST path only
 * (never the demo's own `/@fs/.../api/palettes.ts` Vite source module), mirroring
 * the existing `views/browse.spec.ts` guard.
 */
export async function routeBrowsePalettes(page: Page): Promise<void> {
    await page.route(
        (url) =>
            !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
            !/\.\w+$/.test(url.pathname) &&
            /(^|\/)palettes(\/|$)/.test(url.pathname),
        (route) => {
            const cursor = new URL(route.request().url()).searchParams.get("cursor");
            const body =
                cursor === PAGE2_CURSOR
                    ? { data: PAGE2, nextCursor: null, hasMore: false }
                    : { data: PAGE1, nextCursor: PAGE2_CURSOR, hasMore: true };
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        },
    );
}
