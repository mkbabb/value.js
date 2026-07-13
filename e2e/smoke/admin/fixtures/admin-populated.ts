/**
 * S.W5-13 — the POPULATED admin fixture (the "populated-fixture pattern").
 *
 * The sibling `admin-auth.ts` fixture seeds an authenticated admin token but
 * answers every admin envelope EMPTY — so the moderation surface the suite
 * exercises has never once seen a row (the api-crud-audit's standing gap; the
 * W5-12 F-1 mobile-overflow bug is only reachable WITH rows present). This
 * fixture is the same auth seam with SHAPE-CORRECT POPULATED envelopes routed
 * per-endpoint, so admin specs can assert real users / flagged palettes / audit
 * entries / pending color-names / tags — and drive the moderation actions
 * (feature / dismiss / delete) against live rows.
 *
 * Envelope shapes track `demo/@/lib/palette/types.ts`:
 *   PaginatedResponse<T> = { data: T[]; total; limit; offset }
 *   getAdminTags / getUserPalettes return the RAW array (no envelope).
 *
 * Mutation verbs (POST feature, DELETE palette/flags, POST prune) answer a
 * shape-correct success body so a click-through never errors.
 */
import { test as base } from "@playwright/test";
import type {
    User,
    FlaggedPalette,
    AuditEntry,
    ProposedColorName,
    Tag,
    Palette,
} from "../../../../demo/@/lib/palette/types";

const STORAGE_KEY = "palette-admin-token";
const FAKE_TOKEN = "test-admin-token";

const NOW = "2026-07-05T00:00:00.000Z";

function palette(slug: string, name: string, userSlug: string): Palette {
    return {
        name,
        slug,
        userSlug,
        colors: [
            { css: "#e11d48", position: 0 },
            { css: "#2563eb", position: 1 },
            { css: "#16a34a", position: 2 },
        ],
        tags: ["moody"],
        createdAt: NOW,
        updatedAt: NOW,
        isLocal: false,
        voteCount: 3,
        visibility: "public",
        tier: "standard",
        published: true,
    };
}

export const USERS: User[] = [
    { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
    { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
    { slug: "verdant-mole-33", createdAt: NOW, lastSeenAt: NOW, status: "suspended", paletteCount: 0 },
];

const FLAGGED: FlaggedPalette[] = [
    {
        paletteSlug: "sunset-riot-9a3f",
        palette: palette("sunset-riot-9a3f", "Sunset Riot", "crimson-owl-77"),
        flagCount: 2,
        flags: [
            { reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW },
            { reporterSlug: "verdant-mole-33", reason: "offensive", detail: "harsh clash", createdAt: NOW },
        ],
    },
    {
        paletteSlug: "neon-haze-1b2c",
        palette: palette("neon-haze-1b2c", "Neon Haze", "azure-fox-01"),
        flagCount: 1,
        flags: [{ reporterSlug: "crimson-owl-77", reason: "duplicate", createdAt: NOW }],
    },
];

const AUDIT: AuditEntry[] = [
    { id: "a1", timestamp: NOW, action: "palette.feature", target: "sunset-riot-9a3f", ipHash: "ip-3f9a" },
    { id: "a2", timestamp: NOW, action: "user.delete", target: "spammer-42", ipHash: "ip-7c1d" },
    { id: "a3", timestamp: NOW, action: "flag.dismiss", target: "neon-haze-1b2c", ipHash: "ip-b2c0" },
];

export const QUEUE: ProposedColorName[] = [
    { id: "c1", name: "Wax Seal", css: "oklch(0.52 0.18 25)", status: "proposed", contributor: "azure-fox-01", createdAt: NOW },
    { id: "c2", name: "Field Floor", css: "oklch(0.74 0.06 120)", status: "proposed", contributor: "crimson-owl-77", createdAt: NOW },
    // S.W5-12 (F-1 fence): the min-width-chain stressor — an un-breakable
    // long name + a wide function css literal, the exact string class that
    // pushed approve/reject ~250px off-card at 390px pre-fix.
    {
        id: "c3",
        name: "A Very Long Proposed Color Name That Stresses The Row Min-Width Chain Well Past Any Phone Viewport",
        css: "color(display-p3 0.23456 0.71234 0.41234 / 0.98765)",
        status: "proposed",
        contributor: "verdant-mole-33",
        createdAt: NOW,
    },
];

const TAGS: Tag[] = [
    { id: "t1", name: "moody", category: "mood", createdAt: NOW },
    { id: "t2", name: "pastel", category: "tone", createdAt: NOW },
    { id: "t3", name: "duotone", category: "structure", createdAt: NOW },
];

const USER_PALETTES: Palette[] = [
    palette("azure-one-11aa", "Azure One", "azure-fox-01"),
    palette("azure-two-22bb", "Azure Two", "azure-fox-01"),
];

function paginated<T>(data: T[]): string {
    return JSON.stringify({ data, total: data.length, limit: 50, offset: 0 });
}

export const adminPopulatedTest = base.extend({
    page: async ({ page }, use) => {
        // 1. Seed the admin token before any page script runs (same as admin-auth).
        await page.addInitScript(
            ([key, val]) => localStorage.setItem(key, val),
            [STORAGE_KEY, FAKE_TOKEN],
        );

        // 2. Anonymous session POST — keep boot deterministic without the API.
        await page.route("**/sessions", (route) => {
            if (route.request().method() === "POST") {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({ token: "test-session-token", userSlug: "test-user" }),
                });
            }
            return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
        });

        // 3. Populated admin surface — routed per-endpoint, most-specific first.
        await page.route("**/admin/**", (route) => {
            const req = route.request();
            const url = req.url();
            // T.W1 F4: the `palette-browser/admin/` source dir now puts `/admin/`
            // in vite MODULE URLs (`/@fs/…/admin/AdminUsersPanel.vue`), which this
            // glob also matches. Mock ONLY genuine API calls (pathname `/admin/…`);
            // let module/asset requests fall through to the dev server.
            if (!new URL(url).pathname.startsWith("/admin/")) return route.continue();
            const method = req.method();
            const json = (body: string, status = 200) =>
                route.fulfill({ status, contentType: "application/json", body });

            // Mutations answer a shape-correct success so click-throughs never error.
            if (method === "DELETE") {
                if (url.includes("/flags/")) return json(JSON.stringify({ dismissed: 1 }));
                if (url.includes("/palettes/")) return json("", 204);
                if (url.includes("/users/") && url.includes("/palettes")) return json(JSON.stringify({ deleted: 1 }));
                if (url.includes("/users/")) return json(JSON.stringify({ deleted: true, palettesDeleted: 0 }));
                return json("{}");
            }
            if (method === "POST") {
                if (url.includes("/feature")) return json(JSON.stringify({ slug: "sunset-riot-9a3f", tier: "featured" }));
                if (url.includes("/prune-empty")) return json(JSON.stringify({ pruned: 1 }));
                if (url.includes("/approve") || url.includes("/reject")) return json("{}");
                return json("{}");
            }

            // GET envelopes.
            if (url.includes("/admin/tags")) return json(JSON.stringify(TAGS));
            if (url.includes("/admin/users/") && url.includes("/palettes")) return json(JSON.stringify(USER_PALETTES));
            if (url.includes("/admin/users")) return json(paginated(USERS));
            if (url.includes("/admin/flagged")) return json(paginated(FLAGGED));
            if (url.includes("/admin/audit")) return json(paginated(AUDIT));
            if (url.includes("/admin/queue") || url.includes("/admin/approved")) return json(paginated(QUEUE));
            return json(paginated([]));
        });

        await use(page);
    },
});

export { expect } from "@playwright/test";
