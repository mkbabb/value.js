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

import type { WithId } from "mongodb";
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
 * The subject of a read decision: the three facts the policy reads, and
 * nothing else. Taking a structural subset (rather than the whole document)
 * keeps the predicate callable from a provenance hop, a version's addressing
 * palette, and a detail read alike, and makes it impossible for a caller to
 * smuggle a decision in on a field the policy never inspects.
 *
 * `moderation` is the withdrawal clock ruled by D9: it is a SEPARATE axis from
 * `visibility`, so a withdrawn row is not silently re-spelled as private. The
 * field itself is minted on `Palette` at X.W3.5 (G-15); until then no document
 * carries it and an absent value reads `clear`, which is the same answer the
 * two-field model gives. The predicate therefore needs no amendment when the
 * field lands — only the model does.
 */
export type ReadableSubject = Pick<
    Palette,
    "visibility" | "deletedAt" | "userSlug"
> & {
    readonly moderation?: "clear" | "withdrawn";
};

/**
 * THE palette object-read predicate (X-W3 · X.A1 · G-1). One decision point
 * owns every read: a viewer may read a palette iff they own it — in any state,
 * including trashed and withdrawn, because an owner is entitled to the truth
 * about their own row — or the row is active-public with a clear moderation
 * clock.
 *
 * Two surfaces, one decision: `isReadable` for a walk that must keep going
 * past a hop it may not disclose (the provenance redaction, V·W45 item 4), and
 * `assertReadable` for a read entry point that must refuse. Nothing else may
 * re-derive this rule — a second spelling of it is the drift this gate exists
 * to close.
 *
 * A null-owned row (`userSlug: null`, an anonymously created palette) is
 * nobody's: an absent viewer must never match it, which is why the viewer is
 * tested for presence before it is compared.
 */
export function isReadable(
    doc: ReadableSubject,
    viewer: string | null | undefined,
): boolean {
    if (viewer && doc.userSlug === viewer) return true;
    return isActivePublic(doc) && (doc.moderation ?? "clear") === "clear";
}

/**
 * The throwing form of `isReadable`. Refusal is ALWAYS `NotFoundError`: a
 * refusal that distinguished "exists but is not yours" from "does not exist"
 * would be the existence oracle the predicate is here to remove.
 */
export function assertReadable(
    doc: ReadableSubject,
    viewer: string | null | undefined,
): void {
    if (!isReadable(doc, viewer)) throw new NotFoundError("Palette not found");
}

/**
 * Resolve a palette by slug and authorize the viewer against it, returning the
 * document so the caller need not read it twice.
 *
 * This is the service-level entry point for a surface that is ADDRESSED by a
 * palette slug but does not itself format the palette — the revision list is
 * the first (G-3). Routes call services, never repositories (D-6), so the
 * resolve half belongs here beside the predicate rather than in a handler.
 */
export async function assertPaletteReadable(
    services: Services,
    slug: string,
    viewer: string | null | undefined,
): Promise<WithId<Palette>> {
    const doc = await services.repositories.palettes.findBySlug(slug);
    if (!doc) throw new NotFoundError("Palette not found");
    assertReadable(doc, viewer);
    return doc;
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
