/**
 * Palette votes service (D.W2 Lane A + Lane D F3).
 *
 * The single canonical vote-toggle implementation. F3 fix (idempotent upsert
 * + gated `$inc`):
 *   - If the user has an existing vote, delete it and `$inc -1` (gated by the
 *     delete-returns-true signal).
 *   - Otherwise, `upsertIdempotent` the vote; the `inserted` flag from the
 *     repository gates the `$inc +1` so a race that loses the upsert (matched,
 *     not inserted) does NOT double-count.
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
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    // Step 1: try to remove an existing vote.
    const removed = await services.repositories.votes.deleteOne(userSlug, slug);
    if (removed) {
        await services.repositories.palettes.incrementVoteCount(slug, -1);
        const after = await services.repositories.palettes.findBySlug(slug);
        return { voted: false, voteCount: after?.voteCount ?? 0 };
    }

    // Step 2: no existing vote — idempotent upsert; only `$inc` on true insert.
    const result = await services.repositories.votes.upsertIdempotent(userSlug, slug);
    if (result.inserted) {
        await services.repositories.palettes.incrementVoteCount(slug, 1);
    }
    const after = await services.repositories.palettes.findBySlug(slug);
    return { voted: true, voteCount: after?.voteCount ?? 0 };
}
