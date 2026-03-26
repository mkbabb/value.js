export interface PaletteColor {
    css: string;
    name?: string;
    position: number;
}

export interface Palette {
    id: string;
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
    status?: "published" | "featured";
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
