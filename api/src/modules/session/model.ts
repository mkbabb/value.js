/**
 * Session-domain document shapes (T.W1 — carved from `models.ts` per E-1/F4).
 *
 * Home of the branded nominal id types (`SessionToken`/`UserSlug`): the brands
 * describe session/user ids, so the session module is their honest home. Other
 * domains import the type only (`import type` + `verbatimModuleSyntax` erase the
 * edge at runtime), keeping the graph acyclic.
 */

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

export const USER_STATUSES = ["active", "suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

// ---------------------------------------------------------------
// sessions
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
// users
// ---------------------------------------------------------------

export interface User {
    /** _id is the user slug. */
    _id: UserSlug;
    createdAt: Date;
    lastSeenAt?: Date | undefined;
    status?: UserStatus | undefined;
}
