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
import type { AtomDiffOp } from "./lib/crud/atomdiff.js";

// ---------------------------------------------------------------
// Branded nominal id types (L.W2 — the architectural transposition)
// ---------------------------------------------------------------
// `Session._id` is the session token; `User._id` is the user slug. Both are
// plain runtime strings, but branding them nominally lets `Collection<Session>`/
// `Collection<User>` filters typecheck against a string token/slug without the
// ObjectId-cast escape hatch the DI-bypass once needed (ledger #13/#17).
//
// Brand placement is `models.ts`, not `types.ts`: the brands live in the model
// domain they describe, and this keeps the import graph acyclic. (Declaring
// them in `types.ts` would force `models.ts → types.ts`, closing a type-only
// cycle `models ← repositories ← inject-services ← types`; `import type` +
// `verbatimModuleSyntax` erase it at runtime so `tsc` accepts it, but the model
// domain is the honest home — see `brandHome` analysis.)
//
// Mirrors the `src/units/color/index.ts` `ColorChannel<T>` phantom-brand idiom:
// a `unique symbol` phantom field, zero runtime cost, minted via a single
// boundary helper. CONTAINMENT: only the two `_id` fields carry a brand;
// `Session.userSlug` and every other slug/token string field stays raw.
declare const __SessionToken: unique symbol;
declare const __UserSlug: unique symbol;

/** A session token (uuid). Brands `Session._id`. */
export type SessionToken = string & { readonly [__SessionToken]: true };

/** A user slug. Brands `User._id`. */
export type UserSlug = string & { readonly [__UserSlug]: true };

/**
 * THE one-time model-boundary assertion that a raw `string` is a session token.
 * Mint at the repository filter boundary (where a request token enters a typed
 * `Collection<Session>` query) and at genuine id-construction sites (a freshly
 * generated `crypto.randomUUID()` becoming a new `Session._id`). Per ledger #13
 * the escape is RETIRED here, not relocated: never sprinkle this mid-flow to
 * silence an error — if a value is already a `Session`/`User` field, use the
 * branded field it carries. Zero runtime cost (identity; inlined).
 */
export const asSessionToken = (s: string): SessionToken => s as SessionToken;

/**
 * THE one-time model-boundary assertion that a raw `string` is a user slug.
 * Same discipline as `asSessionToken`: mint only at the repository filter
 * boundary or at genuine slug-construction (the generated slug becoming a new
 * `User._id`). Retired-at-the-boundary, not relocated (ledger #13). Zero
 * runtime cost.
 */
export const asUserSlug = (s: string): UserSlug => s as UserSlug;

// ---------------------------------------------------------------
// Status enums
// ---------------------------------------------------------------

// I.W1 visibility split — CRUD-CONTRACT v2.0.0 §3 binding.
// `visibility` carries WHO-can-see (orthogonal to admin curation);
// `tier` carries WHAT-position-in-curation (orthogonal to visibility).
// The canonical 9-tuple curation state-machine.
export const PALETTE_VISIBILITIES = ["public", "unlisted", "private"] as const;
export type PaletteVisibility = (typeof PALETTE_VISIBILITIES)[number];

export const PALETTE_TIERS = ["standard", "featured", "archived"] as const;
export type PaletteTier = (typeof PALETTE_TIERS)[number];

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
    /**
     * Optional human-readable name. `undefined` is accepted alongside absent so
     * zod-parsed inputs (where `.optional()` emits `string | undefined`) flow
     * through without a normalization step.
     */
    name?: string | undefined;
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
    userSlug: string | null;
    /** I.W1 canonical visibility (3-state): `public`/`unlisted`/`private`. */
    visibility: PaletteVisibility;
    /** I.W1 canonical curation tier (3-state): `standard`/`featured`/`archived`. */
    tier: PaletteTier;
    /** I.W2 soft-delete timestamp. `null` means live; a Date means
     * soft-deleted-within-grace-window (default 30 days). Reaper cron hard-
     * deletes when (now - deletedAt) > grace. CRUD-CONTRACT v2.0.0 §4. */
    deletedAt: Date | null;
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
    /** J.W2 — the recorded atom-diff from this version's parent
     * (`parentHash ?? forkedFromHash`) to THIS version. `null` for a root
     * version (no parent). The diff-bearing provenance edge. Optional for
     * read-compat with pre-J version rows (no field → read as absent). inv-J-2:
     * a JSON payload on the existing edge — no new collection. */
    atomDiff?: AtomDiffOp[] | null;
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
    _id: SessionToken;
    ipHash: string;
    userSlug?: string | undefined;
    createdAt: Date;
    lastSeenAt: Date;
    expiresAt?: Date | undefined;
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
    ipHash?: string | undefined;
    /** Free-form target description: "slug=foo", "id=...", etc. */
    target?: string | undefined;
    /** Slug of the admin user (D.W2 evolution). */
    actorSlug?: string | null | undefined;
    /** Structured payload; replaces the stringly-typed `target` for new emits. */
    payload?: Record<string, unknown> | undefined;
}

// ---------------------------------------------------------------
// 9. users
// ---------------------------------------------------------------

export interface User {
    /** _id is the user slug. */
    _id: UserSlug;
    createdAt: Date;
    lastSeenAt?: Date | undefined;
    status?: UserStatus | undefined;
}
