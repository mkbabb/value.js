/**
 * Palette visibility service (J.W1c — the publish/unpublish OPERATION).
 *
 * Publish is a binary OPERATION over the existing 3-state visibility enum —
 * NOT a new state (J.W1c §0). `publish` flips `visibility` to `public`;
 * `unpublish` flips to `private` (value.js's not-in-public-view state — all 9
 * `(visibility, tier)` tuples are legal resting states, §5.1). The `unlisted`
 * middle state is preserved and never destroyed.
 *
 * The load-bearing guarantee (§3): publish is an idempotent IN-PLACE
 * visibility mutation on the SAME `{slug}` row. It NEVER creates a new document
 * — the only write verb is `$set` on `{slug}`, a SINGLE-collection write (so it
 * is deliberately NOT wrapped in `withTransaction` and is NOT a cross-collection
 * H1 site). It touches `visibility` + `updatedAt` ONLY — never `tier` or
 * `deletedAt` (§5.4 orthogonality).
 */

import type { Palette, PaletteVisibility } from "../model.js";
import { PALETTE_VISIBILITIES } from "../model.js";
import type { Services } from "../../../platform/http/inject-services.js";
import { GoneError, NotFoundError, UnprocessableEntityError } from "../../../platform/http/errors/index.js";
import { formatPalette, type FormattedPalette } from "../format.js";

/**
 * The single active-public predicate (V·W45 item 4). A palette is publicly
 * visible iff its visibility is exactly `public` AND it is not soft-deleted.
 * Shared by the provenance walk (and available to any detail/social read that
 * must decide whether a row may cross the public wire) so those surfaces cannot
 * drift apart. `unlisted`/`private` and trashed rows are NOT active-public.
 */
export function isActivePublic(
    p: Pick<Palette, "visibility" | "deletedAt">,
): boolean {
    return (
        p.visibility === "public" &&
        (p.deletedAt === null || p.deletedAt === undefined)
    );
}

/**
 * inv-I-2 visibility transition guard — the FIRST LIVE caller (J.W1c §5.1).
 *
 * value.js treats all 9 `(visibility, tier)` tuples as valid resting states, so
 * every transition between the three enum members is legal; the guard's real
 * job is to reject a MALFORMED target (outside the closed enum) — materializing
 * inv-I-2 as real, composed code rather than the dead-authored guard it was
 * through I→J. (Contrast fourier, whose flat enum forbids `public→draft`; the
 * `from` parameter is the composition point if a forbidden-pair rule is ever
 * introduced here.)
 */
export function assertVisibilityTransition(
    from: PaletteVisibility,
    to: PaletteVisibility,
): void {
    if (!PALETTE_VISIBILITIES.includes(to)) {
        throw new UnprocessableEntityError(`Illegal visibility target: ${String(to)}`);
    }
    void from; // all from→to pairs legal under the (visibility, tier) model.
}

export interface SetVisibilityInput {
    slug: string;
    /** publish → "public"; unpublish → "private". The binary public-membership toggle. */
    target: Extract<PaletteVisibility, "public" | "private">;
}

/**
 * Publish / unpublish: an idempotent in-place visibility flip on the SAME row.
 *
 * - Missing row → 404; soft-deleted row → 410 (no resurrect — publish never
 *   touches `deletedAt`; soft-delete is the orthogonal liveness axis, §5.3).
 * - Already-at-target → 200 no-op (mirrors `restorePalette`'s already-live
 *   short-circuit, crud.ts:279) — no write, no `updatedAt` bump, NOT a duplicate.
 * - Otherwise a single `$set { visibility, updatedAt }`.
 */
export async function setVisibility(
    services: Services,
    input: SetVisibilityInput,
): Promise<FormattedPalette> {
    const { slug, target } = input;

    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");
    if (palette.deletedAt !== null && palette.deletedAt !== undefined) {
        throw new GoneError("Palette has been deleted");
    }

    assertVisibilityTransition(palette.visibility, target);

    if (palette.visibility === target) {
        // Idempotent no-op: already at target. Same row, no new document.
        return formatPalette(palette);
    }

    await services.repositories.palettes.update(slug, {
        $set: { visibility: target, updatedAt: new Date() },
    });

    const updated = await services.repositories.palettes.findBySlug(slug);
    if (!updated) throw new NotFoundError("Palette not found after publish");
    return formatPalette(updated);
}
