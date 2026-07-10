/**
 * Palette ownership + ETag service (L.W1 Lane B — inv-L-5; N.W3.E read-fold).
 *
 * Lifts the route-layer repository read that reached past the service wall
 * straight into `repositories.palettes.findBySlug` (the inv-L-5 leak) into a
 * service-owned helper. Routes call this; the repository stays behind the
 * `validate → authn → authz → SERVICE → repository` boundary.
 *
 * N.W3.E — the ownership extractor now returns the WHOLE palette it reads
 * (`getOwnedPalette`) so the owner-gated routes can reuse that single document
 * for the ETag pre-check AND the service write, instead of re-reading the same
 * slug 3× before the write. The PATCH read-amplification collapses 4 → 2: one
 * read here (stashed on `c.var.palette`), one post-write re-read in the
 * service for the fresh envelope. The legacy single-purpose `getOwnerSlug` /
 * `getPaletteETagData` helpers are retired — there is one read, one doc.
 */

import type { WithId } from "mongodb";
import type { Palette } from "../model.js";
import type { Services } from "../../../platform/http/inject-services.js";

/**
 * The full palette for the owner-gated routes, or `null` when it does not
 * exist (the `requireOwnership` middleware maps null → 404; a `userSlug`
 * mismatch → 403). This is the SINGLE pre-write read of the resource: the
 * route stashes the returned doc on `c.var.palette` and the ETag pre-check +
 * the service write both reuse it, so the request reads the palette exactly
 * once before writing (N.W3.E).
 *
 * `findBySlug` carries no liveness filter — soft-deleted/visibility semantics
 * are untouched, exactly as the prior inline extractor read.
 *
 * Note on the accepted narrow TOCTOU (ledger #16): neither `patchPalette` nor
 * `setVisibility` re-validates the ETag inside its write, so a concurrent
 * write between this read and the service write is not fenced. Folding the
 * three former reads into this one does not change that window's nature — the
 * optimistic-concurrency check remains a single pre-write validator.
 */
export async function getOwnedPalette(
    services: Services,
    slug: string,
): Promise<WithId<Palette> | null> {
    return services.repositories.palettes.findBySlug(slug);
}
