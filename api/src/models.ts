/**
 * Typed document shapes for the 9 MongoDB collections.
 *
 * Each interface mirrors the literal write-paths in
 * `api/src/routes/{palettes,admin,sessions,colors}.ts` (D-HARDEN-3 §1).
 * Inferred from `db.collection("foo").insertOne({...})` + `findOneAndUpdate(...)`
 * shapes; canonical schema lives in MongoDB (and the indexes declared in
 * `api/src/db.ts`).
 *
 * Status enums use `as const` literal unions so consumers can narrow exhaustively.
 *
 * Notes on the `_id` field:
 * - `palettes`, `palette_versions`, `users`, `sessions` use string ids
 *   (slugs / content-hashes / session tokens), NOT ObjectId.
 * - `votes`, `tags`, `proposed_names`, `flags`, `admin_audit` use ObjectId
 *   (auto-assigned by the driver).
 *
 * The `_id` field is omitted from most interfaces here; the `Collection<T>`
 * generic + driver-level `InsertOneResult` cover it. Where `_id` is the slug
 * (users, sessions), it's declared explicitly.
 */

import type { ObjectId } from "mongodb";

// ---------------------------------------------------------------
// Status enums
// ---------------------------------------------------------------

export const PALETTE_STATUSES = ["published", "featured", "hidden", "draft"] as const;
export type PaletteStatus = (typeof PALETTE_STATUSES)[number];

export const USER_STATUSES = ["active", "suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const PROPOSED_NAME_STATUSES = ["proposed", "approved", "rejected"] as const;
export type ProposedNameStatus = (typeof PROPOSED_NAME_STATUSES)[number];

export const FLAG_REASONS = ["inappropriate", "spam", "copyright", "other"] as const;
export type FlagReason = (typeof FLAG_REASONS)[number];

// ---------------------------------------------------------------
// Embedded value shapes
// ---------------------------------------------------------------

export interface PaletteColor {
    css: string;
    name?: string;
    position: number;
}

export interface OklabTriple {
    L: number;
    a: number;
    b: number;
}

// ---------------------------------------------------------------
// 1. palettes
// ---------------------------------------------------------------

export interface Palette {
    name: string;
    slug: string;
    colors: PaletteColor[];
    oklabColors: OklabTriple[];
    tags: string[];
    voteCount: number;
    /** Legacy ownership shim — replaced by `userSlug` once migration completes. */
    sessionToken: string | null;
    userSlug: string | null;
    status: PaletteStatus;
    createdAt: Date;
    updatedAt: Date;
    /** Content-hash of (name, colors) for version dedup. */
    currentHash: string | null;
    /** Slug of the source palette this was forked from, if any. */
    forkOf: string | null;
    forkOfHash: string | null;
    forkCount: number;
    versionCount: number;
}

// ---------------------------------------------------------------
// 2. palette_versions
// ---------------------------------------------------------------

export interface PaletteVersion {
    /** _id is the content-hash. */
    _id: string;
    name: string;
    colors: PaletteColor[];
    /** Hash of immediate parent version (null = root). */
    parentHash: string | null;
    /** Hash of source-palette current-version at fork time (null = not a fork). */
    forkedFromHash: string | null;
    authorSlug: string;
    paletteSlug: string;
    createdAt: Date;
    rootHash: string;
    depth: number;
}

// ---------------------------------------------------------------
// 3. votes
// ---------------------------------------------------------------

export interface Vote {
    userSlug: string;
    paletteSlug: string;
    createdAt: Date;
}

// ---------------------------------------------------------------
// 4. sessions
// ---------------------------------------------------------------

export interface Session {
    /** _id is the session token (uuid). */
    _id: string;
    ipHash: string;
    userSlug?: string;
    createdAt: Date;
    lastSeenAt: Date;
    expiresAt?: Date;
}

// ---------------------------------------------------------------
// 5. proposed_names
// ---------------------------------------------------------------

export interface ProposedName {
    _id?: ObjectId;
    name: string;
    css: string;
    status: ProposedNameStatus;
    contributor: string | null;
    createdAt: Date;
    approvedAt: Date | null;
}

// ---------------------------------------------------------------
// 6. tags
// ---------------------------------------------------------------

export interface Tag {
    _id?: ObjectId;
    name: string;
    category: string;
    createdAt: Date;
}

// ---------------------------------------------------------------
// 7. flags
// ---------------------------------------------------------------

export interface Flag {
    _id?: ObjectId;
    paletteSlug: string;
    reporterSlug: string;
    reason: FlagReason;
    detail: string | null;
    createdAt: Date;
}

// ---------------------------------------------------------------
// 8. admin_audit
// ---------------------------------------------------------------

export interface AdminAuditEvent {
    _id?: ObjectId;
    timestamp: Date;
    action: string;
    /** IP hash of the admin actor; populated by audit middleware. */
    ipHash?: string;
    /** Free-form target description: "slug=foo", "id=...", etc. */
    target?: string;
    /** Slug of the admin user (D.W2 evolution). */
    actorSlug?: string | null;
    /** Structured payload; replaces the stringly-typed `target` for new emits. */
    payload?: Record<string, unknown>;
}

// ---------------------------------------------------------------
// 9. users
// ---------------------------------------------------------------

export interface User {
    /** _id is the user slug. */
    _id: string;
    createdAt: Date;
    lastSeenAt?: Date;
    status?: UserStatus;
}
