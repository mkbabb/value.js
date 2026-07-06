export interface PaletteColor {
    css: string;
    name?: string;
    position: number;
}

export interface Palette {
    /**
     * The demo-LOCAL store key — client-minted (`crypto.randomUUID()` or a
     * `gen-`/`mix-`/`__extracted__` temp prefix), present **iff** `isLocal`.
     *
     * K-PALID id-honesty (R.W2): the server is slug-identified end to end and
     * emits NO `id` (see `api/src/format/palette.ts` — `formatPalette` strips
     * `_id` and returns a slug-keyed body). A remote palette therefore has NO
     * `id`; declaring it `string` was a type-lie that let a client-minted local
     * key masquerade as a persisted server id. `id` is now honestly optional:
     * `isLocal === true` ⟹ `id` present; a remote palette (`isLocal === false`)
     * is identified by `slug` alone.
     */
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
    /** I.W1 canonical visibility (3-state). */
    visibility?: "public" | "unlisted" | "private";
    /** I.W1 canonical curation tier (3-state). */
    tier?: "standard" | "featured" | "archived";
    /**
     * J.W1c derived convenience emitted by the API (`formatPalette`): true ⟺
     * `visibility === "public"`. NEVER a persisted column — computed read-time.
     * W5-13 · F-7: typed here so consumers get compile-time coverage instead of
     * implicit-`any`-shaped access through an untyped wire field.
     */
    published?: boolean;
    /** I.W2 soft-delete timestamp (ISO); `null`/absent means live (F-7). */
    deletedAt?: string | null;
    /**
     * J.W2 atom-set-hash — the colors-only, order-independent fingerprint
     * (dedup hint + the `/diff` envelope's hash basis), emitted by the API (F-7).
     */
    atomSetHash?: string;
    // Versioning
    currentHash?: string;
    versionCount?: number;
    // Forking
    forkOf?: string | null;
    forkOfHash?: string | null;
    forkCount?: number;
}

export interface PaletteVersion {
    hash: string;
    name: string;
    colors: PaletteColor[];
    parentHash: string | null;
    forkedFromHash: string | null;
    authorSlug: string;
    paletteSlug: string;
    createdAt: string;
    rootHash: string;
    depth: number;
}

export interface ProvenanceNode {
    slug: string;
    name: string;
    userSlug: string;
    contentHash: string;
    createdAt: string;
    isFork: boolean;
}

export interface ProposedColorName {
    id: string;
    name: string;
    css: string;
    status: "proposed" | "approved" | "rejected";
    contributor?: string;
    createdAt: string;
    approvedAt?: string;
}

export interface User {
    slug: string;
    createdAt: string;
    lastSeenAt?: string;
    status?: "active" | "suspended";
    paletteCount?: number;
}

export interface Tag {
    id: string;
    name: string;
    category: string;
    createdAt?: string;
}

export interface Flag {
    reporterSlug: string;
    reason: string;
    detail?: string;
    createdAt: string;
}

export interface FlaggedPalette {
    paletteSlug: string;
    palette: Palette | null;
    flagCount: number;
    flags: Flag[];
}

export interface AuditEntry {
    id: string;
    timestamp: string;
    action: string;
    target: string;
    ipHash: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
}

export interface CursorPaginatedResponse<T> {
    data: T[];
    nextCursor: string | null;
    hasMore: boolean;
}

export interface PaletteStore {
    version: number;
    palettes: Palette[];
}
