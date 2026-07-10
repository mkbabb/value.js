/**
 * Regex helpers (E.W2 Lane E — extracted from the middleware god module).
 *
 * `escapeRegex` is the only consumer of this module. It defangs user-supplied
 * strings before they reach MongoDB `$regex` query operators (see
 * `services/color/queries.ts`, `services/admin/users.ts`,
 * `services/admin/audit.ts`). Kept as a sibling of `hash.ts`: a pure leaf
 * helper at the api/src/ root, no middleware coupling.
 */

/** Escape special regex characters for safe use in MongoDB $regex queries. */
export function escapeRegex(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
