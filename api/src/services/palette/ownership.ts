/**
 * Palette ownership + ETag service (L.W1 Lane B — inv-L-5).
 *
 * Lifts the two route-layer repository reads that reached past the service
 * wall straight into `repositories.palettes.findBySlug` (the inv-L-5 leak) into
 * service-owned helpers. Routes call these; the repository stays behind the
 * `validate → authn → authz → SERVICE → repository` boundary.
 *
 * Both helpers mirror the prior inline reads EXACTLY (same repository method,
 * same filter, same null-on-missing semantic) so no HTTP status code or branch
 * changes — they are a pure transposition, not a behaviour change.
 */

import type { Palette } from "../../models.js";
import type { Services } from "../../middleware/inject-services.js";

/**
 * Owner-slug for `requireOwnership`: the palette's `userSlug`, or `null` when
 * the palette does not exist (the middleware maps null → 404; a mismatch
 * against the caller's `userSlug` → 403). Soft-deleted/visibility semantics are
 * untouched — `findBySlug` carries no liveness filter, exactly as the prior
 * inline extractor did.
 */
export async function getOwnerSlug(
    services: Services,
    slug: string,
): Promise<string | null> {
    const palette = await services.repositories.palettes.findBySlug(slug);
    return palette?.userSlug ?? null;
}

/**
 * ETag inputs (`currentHash` + `updatedAt`) for the route-level If-Match
 * pre-check, or `null` when the palette does not exist (the caller skips the
 * guard and the request proceeds straight to the service write).
 *
 * This read backs the SINGLE pre-write optimistic-concurrency check. Neither
 * `patchPalette` nor `setVisibility` re-validates the ETag inside its write, so
 * a concurrent write between this read and the service write is not fenced — an
 * accepted narrow TOCTOU window (ledger #16).
 */
export async function getPaletteETagData(
    services: Services,
    slug: string,
): Promise<Pick<Palette, "currentHash" | "updatedAt"> | null> {
    return services.repositories.palettes.findBySlug(slug);
}
