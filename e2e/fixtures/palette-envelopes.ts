/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — the e2e-OWNED wire-envelope DTOs (G-1 root cure, fold R4/R31).
 *
 * WHY THIS FILE EXISTS. Two e2e fixtures type-imported `demo/@/lib/palette/types`,
 * a demo path deleted at `a61094e3`/`bc06a0cd`. Both imports were `import type`,
 * so esbuild erased them and Playwright's collector never resolved them; and
 * `e2e/` sat in NO TypeScript program (`tsconfig.lib.json` = `src/` subpaths,
 * `tsconfig.demo.json` = `demo/` + `src/vite-env.d.ts`), so nothing ever
 * reported the break. `tsconfig.e2e.json` now programs `e2e/` and the
 * `typecheck` script runs it — that is the ROOT cure; this file is what the
 * cured imports point AT.
 *
 * WHY NOT RE-POINT AT `demo/palettes/types.ts`. The demo module survives at a
 * NEW path, and re-pointing would be the one-line fix. `W1.md:211-215` forbids
 * it by name: *"the demo module is gone; re-pointing at a moved demo path would
 * re-couple e2e to a tree X-W5/X-W8 will move again"*. These envelopes are what
 * the e2e fixtures put ON THE WIRE, so their home is `e2e/`, and a demo rename
 * can no longer red the browser suite for a non-product reason.
 *
 * THE SHAPES ARE RE-DERIVED FROM THE SERVER, NOT INHERITED (fold R31's
 * cure-shape lock: *"type the mocks against the RE-DERIVED DTO"* — typing alone
 * does not discharge the row). Each declaration below names the api module it
 * was read from. Divergences found while re-deriving are recorded here rather
 * than silently absorbed:
 *
 *   · `Palette.id` — the server emits NO `id`
 *     (`api/src/modules/palette/format.ts:68-90` destructures `_id` away and
 *     returns a slug-keyed body). `id` is present IFF `isLocal`, and no
 *     server-shaped fixture envelope may carry one.
 *   · `ProposedColorName.status` — the server union is exactly
 *     `["proposed","approved","rejected"]`
 *     (`api/src/modules/color/model.ts:9`). `"pending"` is producible by
 *     neither the server nor the demo; it is live at
 *     `e2e/smoke/admin/flows/color-approve.spec.ts` and is cured at this wave
 *     (fold R31).
 *   · `DELETE /admin/palettes/:slug` answers **200 `{ deleted: true }`**
 *     (`api/src/modules/admin/routes/palettes.ts:37-40`), never `204` with an
 *     empty body — and `demo/platform/transport/client.ts` calls `res.json()`
 *     unconditionally, so an empty body THROWS. The server truth is exported
 *     below as `ADMIN_DELETE_PALETTE_BODY` so a fixture cannot re-invent it
 *     (fold R32).
 */

/** `api/src/modules/palette/model.ts` — a palette swatch on the wire. */
export interface PaletteColor {
    css: string;
    name?: string;
    position: number;
    /** Quantizer population share, normalized to [0,1]; extracted palettes only. */
    weight?: number;
}

/**
 * `api/src/modules/palette/format.ts:58-91` (`formatPalette`) — the palette
 * body every read route emits. `isLocal` is hard-`false` server-side; the demo
 * store re-uses the shape for its client-minted rows, which is the only case
 * where `id` appears.
 */
export interface Palette {
    /** Client-minted, present IFF `isLocal`. The server never emits it. */
    id?: string;
    name: string;
    slug: string;
    userSlug?: string;
    colors: PaletteColor[];
    oklabColors?: { L: number; a: number; b: number }[];
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    isLocal: boolean;
    voted?: boolean;
    voteCount?: number;
    visibility?: "public" | "unlisted" | "private";
    tier?: "standard" | "featured" | "archived";
    /** Derived read-time: `visibility === "public"`. Never persisted. */
    published?: boolean;
    deletedAt?: string | null;
    atomSetHash?: string;
    currentHash?: string;
    versionCount?: number;
    forkOf?: string | null;
    forkOfHash?: string | null;
    forkCount?: number;
}

/** `api/src/modules/admin/service/users.ts:22-30` (`AdminUserRow`). */
export interface User {
    slug: string;
    createdAt: string;
    lastSeenAt?: string;
    status?: "active" | "suspended";
    paletteCount?: number;
}

/** `api/src/modules/admin/routes/tags.ts` / the tag repository row. */
export interface Tag {
    id: string;
    name: string;
    category: string;
    createdAt?: string;
}

/** One report against a palette (`api/src/modules/admin/service/flagged.ts`). */
export interface Flag {
    reporterSlug: string;
    reason: string;
    detail?: string;
    createdAt: string;
}

/** `GET /admin/flagged` row. `palette` is `null` once the palette is gone. */
export interface FlaggedPalette {
    paletteSlug: string;
    palette: Palette | null;
    flagCount: number;
    flags: Flag[];
}

/**
 * `api/src/modules/admin/model.ts:8-16` — `timestamp` is a `Date` in Mongo and
 * an ISO string on the wire; `ipHash` is optional server-side.
 */
export interface AuditEntry {
    id: string;
    timestamp: string;
    action: string;
    target: string;
    ipHash?: string;
}

/**
 * `demo/color-session/color-names.ts:12-20`, whose union is pinned to the
 * server's `PROPOSED_NAME_STATUSES` (`api/src/modules/color/model.ts:9`).
 */
export interface ProposedColorName {
    id: string;
    name: string;
    css: string;
    status: "proposed" | "approved" | "rejected";
    contributor?: string;
    createdAt: string;
    approvedAt?: string;
}

/** The offset envelope every admin list route emits. */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
}

/** The keyset envelope `GET /palettes` emits (N.W3.D — cursor-only). */
export interface CursorPaginatedResponse<T> {
    data: T[];
    nextCursor: string | null;
    hasMore: boolean;
}

/**
 * The server's own success body for `DELETE /admin/palettes/:slug`
 * (`api/src/modules/admin/routes/palettes.ts:37-40`), exported so a fixture
 * states the server's truth instead of inventing one. Status is **200**.
 */
export const ADMIN_DELETE_PALETTE_STATUS = 200 as const;
export const ADMIN_DELETE_PALETTE_BODY = { deleted: true } as const;
