/**
 * Palette votes service (D.W2 Lane A + Lane D F3 + N.W3.B).
 *
 * The single canonical vote-toggle implementation. F3 fix (idempotent upsert
 * + gated `$inc`):
 *   - If the user has an existing vote, delete it and `$inc -1` (gated by the
 *     delete-returns-true signal).
 *   - Otherwise, `upsertIdempotent` the vote; the `inserted` flag from the
 *     repository gates the `$inc +1` so a race that loses the upsert (matched,
 *     not inserted) does NOT double-count.
 *
 * N.W3.B — the transaction is RIGHT-SIZED OUT. The correctness anchor was
 * always the unique `(userSlug, paletteSlug)` index, not transactional
 * isolation: the index makes the delete-or-upsert idempotent and its
 * true-insert / true-delete signal gates the `$inc` so the counter never
 * double-applies. The transaction only ADDED snapshot-isolation on the
 * post-update `voteCount` re-read — but that count is advisory UI state, not
 * an invariant. A concurrent vote on the same palette making the returned
 * count off-by-one for ONE response is harmless and self-heals on the next
 * read; it is not worth the replica-set transaction cost on the busiest
 * write path. The `$inc` is atomic at the document level WITHOUT a session,
 * and `findOneAndIncrementVoteCount` folds the increment + the count re-read
 * into a single round-trip.
 *
 * The previous handler's `findOneAndDelete → insert → catch 11000` pattern
 * is replaced with this precise gating; `VoteRepository.upsertIdempotent`
 * preserves the atomicity-like semantic via the unique
 * `(userSlug, paletteSlug)` index.
 */

import type { Services } from "../../../platform/http/inject-services.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";

export interface VoteToggleResult {
    voted: boolean;
    voteCount: number;
}

export async function toggleVote(
    services: Services,
    slug: string,
    userSlug: string,
): Promise<VoteToggleResult> {
    // Existence check is read-only — a non-existent palette fails fast (404).
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    // Step 1: try to remove an existing vote.
    const removed = await services.repositories.votes.deleteOne(userSlug, slug);
    if (removed) {
        const after = await services.repositories.palettes.findOneAndIncrementVoteCount(
            slug,
            -1,
        );
        // A null here means the palette vanished between the read and the
        // increment — a real invariant break, not a default-to-zero.
        if (!after) throw new NotFoundError("Palette disappeared during vote");
        return { voted: false, voteCount: after.voteCount };
    }

    // Step 2: no existing vote — idempotent upsert; only `$inc` on true insert.
    const result = await services.repositories.votes.upsertIdempotent(userSlug, slug);
    if (result.inserted) {
        const after = await services.repositories.palettes.findOneAndIncrementVoteCount(
            slug,
            1,
        );
        if (!after) throw new NotFoundError("Palette disappeared during vote");
        return { voted: true, voteCount: after.voteCount };
    }

    // The upsert matched an existing vote (a concurrent insert won the race);
    // no `$inc` fires. Re-read the current count — `voted` is true because a
    // vote row now exists for this user+palette.
    const current = await services.repositories.palettes.findBySlug(slug);
    if (!current) throw new NotFoundError("Palette disappeared during vote");
    return { voted: true, voteCount: current.voteCount };
}
