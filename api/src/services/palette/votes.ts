/**
 * Palette votes service (D.W2 Lane A + Lane D F3 + E.W2 Lane B).
 *
 * The single canonical vote-toggle implementation. F3 fix (idempotent upsert
 * + gated `$inc`):
 *   - If the user has an existing vote, delete it and `$inc -1` (gated by the
 *     delete-returns-true signal).
 *   - Otherwise, `upsertIdempotent` the vote; the `inserted` flag from the
 *     repository gates the `$inc +1` so a race that loses the upsert (matched,
 *     not inserted) does NOT double-count.
 *
 * E.W2 Lane B wraps the (delete-or-upsert) + (gated `$inc`) sequence inside
 * `withTransaction`. The idempotent-upsert pattern STAYS — it's a correctness
 * invariant grounded in the unique `(userSlug, paletteSlug)` index that
 * doesn't depend on transactional isolation. The transaction ADDS defense
 * against a partial-write race where the gated `$inc` could be interleaved
 * with a concurrent vote on the SAME palette (e.g. two browsers, one user) —
 * the snapshot-isolation guarantees the `voteCount` we read post-update
 * matches the increment we just committed.
 *
 * The previous handler's `findOneAndDelete → insert → catch 11000` pattern
 * is replaced with this precise gating; `VoteRepository.upsertIdempotent`
 * preserves the atomicity-like semantic via the unique
 * `(userSlug, paletteSlug)` index.
 */

import type { Services } from "../../middleware/inject-services.js";
import { NotFoundError } from "../../errors/index.js";

export interface VoteToggleResult {
    voted: boolean;
    voteCount: number;
}

export async function toggleVote(
    services: Services,
    slug: string,
    userSlug: string,
): Promise<VoteToggleResult> {
    // Initial existence check is read-only — keep OUTSIDE the transaction so
    // a non-existent palette fails fast (404) without a session start cost.
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    return services.withTransaction(async (session) => {
        // Step 1: try to remove an existing vote.
        const removed = await services.repositories.votes.deleteOne(
            userSlug,
            slug,
            session,
        );
        if (removed) {
            await services.repositories.palettes.incrementVoteCount(
                slug,
                -1,
                session,
            );
            const after = await services.repositories.palettes.findBySlug(
                slug,
                session,
            );
            // In-txn re-read: a null here means the palette vanished mid-txn —
            // a real invariant break, not a default-to-zero.
            if (!after) throw new NotFoundError("Palette disappeared during vote");
            return { voted: false, voteCount: after.voteCount };
        }

        // Step 2: no existing vote — idempotent upsert; only `$inc` on true insert.
        const result = await services.repositories.votes.upsertIdempotent(
            userSlug,
            slug,
            session,
        );
        if (result.inserted) {
            await services.repositories.palettes.incrementVoteCount(
                slug,
                1,
                session,
            );
        }
        const after = await services.repositories.palettes.findBySlug(slug, session);
        // In-txn re-read: a null here means the palette vanished mid-txn —
        // a real invariant break, not a default-to-zero.
        if (!after) throw new NotFoundError("Palette disappeared during vote");
        return { voted: true, voteCount: after.voteCount };
    });
}
