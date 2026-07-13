/**
 * Session-domain document shapes (T.W1 — carved from `models.ts` per E-1/F4).
 *
 * Home of the branded nominal id types (`SessionToken`/`UserSlug`): the brands
 * describe session/user ids, so the session module is their honest home. Other
 * domains import the type only (`import type` + `verbatimModuleSyntax` erase the
 * edge at runtime), keeping the graph acyclic.
 */

import { createHash } from "node:crypto";

// ---------------------------------------------------------------
// Branded nominal id types (L.W2 — the architectural transposition)
// ---------------------------------------------------------------
// `Session._id` is the session token; `User._id` is the user slug. Both are
// plain runtime strings, but branding them nominally lets `Collection<Session>`/
// `Collection<User>` filters typecheck against a string token/slug without the
// ObjectId-cast escape hatch the DI-bypass once needed (ledger #13/#17).
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
 * THE pure brand primitive — assert a `string` already IS a session-token id
 * (the SHA-256 digest stored as `Session._id`). Zero runtime cost (identity;
 * inlined); the sibling of `asUserSlug`.
 *
 * This does NOT hash. The raw-token → at-rest-digest transform is
 * `hashSessionToken` (U-F38) — the ONLY seam a cleartext token crosses into the
 * collection. `asSessionToken` stamps the brand on an already-final id string
 * (its sole caller is `hashSessionToken`, wrapping the digest). Per ledger #13
 * the escape is RETIRED here, not relocated: never sprinkle it mid-flow to
 * silence an error — if a value is already a `Session`/`User` field, use the
 * branded field it carries.
 */
export const asSessionToken = (s: string): SessionToken => s as SessionToken;

/**
 * Digest a RAW session token into the branded `_id` the collection stores at
 * rest (U-F38 — SHA-256 via `node:crypto`).
 *
 * Session tokens are stored HASHED, never cleartext: a leaked DB dump yields
 * only digests, un-replayable against the auth path (the mass-hijack class the
 * registry §12/§15 names). This is THE single seam where a raw token crosses
 * into `Collection<Session>` — call it at every mint
 * (`_id: hashSessionToken(token)`) and every repository filter
 * (`{ _id: hashSessionToken(token) }`). Mint and lookup hash the SAME raw input
 * (a fresh `crypto.randomUUID()`, or an incoming `X-Session-Token`) to the SAME
 * digest, so the seam round-trips and the client wire contract is unchanged: the
 * raw `token` is what's returned to the caller; only the DB holds the digest.
 *
 * NEVER call this on a value already read from the DB as `_id` — that would
 * double-hash (registry §15/§28 R-2). Every call site is verified to take a raw
 * token (a mint uuid or an incoming header), never a stored id.
 */
export const hashSessionToken = (token: string): SessionToken =>
    asSessionToken(createHash("sha256").update(token).digest("hex"));

/**
 * 30 days — THE single source for the session lifetime (U-F36 lifted it here
 * from `service/auth.ts` so the impersonation mint shares the one horizon rather
 * than duplicating the literal).
 *
 * This is the documented cross-repo session contract (CRUD-CONTRACT §6:
 * `session_ttl_days = 30`). A session is minted with `expiresAt = createdAt +
 * SESSION_TTL_MS` and the value is never extended; the `sessions.expiresAt` TTL
 * index (`db.ts`, `expireAfterSeconds: 0`) is what discharges §6's "the cron
 * hard-deletes sessions where expires_at < now()" — the DB engine does it, so
 * there is no application-level session sweep (N.W3.C/I reconcile).
 */
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

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

export const USER_STATUSES = ["active", "suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

// ---------------------------------------------------------------
// sessions
// ---------------------------------------------------------------

export interface Session {
    /**
     * _id is the SHA-256 digest of the session token, NOT the cleartext token
     * (U-F38). The raw uuid is minted + returned to the client; only its digest
     * (via `hashSessionToken`) is ever persisted here.
     */
    _id: SessionToken;
    ipHash: string;
    userSlug?: string | undefined;
    createdAt: Date;
    lastSeenAt: Date;
    expiresAt?: Date | undefined;
}

// ---------------------------------------------------------------
// users
// ---------------------------------------------------------------

export interface User {
    /** _id is the user slug. */
    _id: UserSlug;
    createdAt: Date;
    lastSeenAt?: Date | undefined;
    status?: UserStatus | undefined;
}
