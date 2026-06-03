/**
 * Palette atom-diff service (J.W2 — the `/diff` read-side).
 *
 * Computes the canonical `/diff` WIRE envelope (J-diff-shape §3.2) between two
 * versions of a palette. The diff is a DERIVED PROJECTION, never a new store
 * (inv-J-2): it recomputes on demand from the two versions' colors, so any two
 * versions on the chain are answerable without persisting an O(n²) edge set.
 *
 * `/diff` is a CHAIN diff, never a merge-base (inv-J-1): `from` and `to` must
 * lie on the same single-parent line (one an ancestor of the other) — a
 * divergent pair is a 422.
 */

import type { Services } from "../../middleware/inject-services.js";
import { NotFoundError, UnprocessableEntityError } from "../../errors/index.js";
import { computeAtomSetHash } from "../../hash.js";
import { diffAtoms, type DiffResponse } from "../../lib/crud/atomdiff.js";

const MAX_CHAIN_WALK = 50; // mirrors the provenance walk bound (forks.ts:169).

/**
 * Walk `descendantHash`'s `parentHash` chain (≤50) looking for `ancestorHash`.
 * `descendantHash === ancestorHash` is true at step 0 (a hash is its own
 * trivial ancestor) — so identical from/to is always "on chain".
 */
async function isAncestor(
    services: Services,
    descendantHash: string,
    ancestorHash: string,
): Promise<boolean> {
    let current: string | null = descendantHash;
    let steps = 0;
    while (current && steps < MAX_CHAIN_WALK) {
        if (current === ancestorHash) return true;
        const v = await services.repositories.paletteVersions.findByHash(current);
        current = v?.parentHash ?? null;
        steps++;
    }
    return false;
}

/**
 * Compute the atom-diff between two versions of `slug`.
 *
 * @param from  REQUIRED — a version content-hash on `slug`'s single-parent chain.
 * @param to    OPTIONAL — defaults to the live `currentHash`.
 *
 * The response `fromHash`/`toHash` are the atom-SET-hashes of the two versions
 * (J-diff-shape §2.4 — they ARE the set-hashes; the redundant
 * fromSetHash/toSetHash are dropped). `identical === (ops.length === 0)`.
 */
export async function computePaletteDiff(
    services: Services,
    slug: string,
    from: string,
    to: string | undefined,
): Promise<DiffResponse> {
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    const toRef = to ?? palette.currentHash;
    if (!toRef) throw new NotFoundError("Palette has no current version");

    const fromVersion =
        await services.repositories.paletteVersions.findByHash(from);
    if (!fromVersion || fromVersion.paletteSlug !== slug) {
        throw new NotFoundError("`from` is not a version of this palette");
    }
    const toVersion =
        await services.repositories.paletteVersions.findByHash(toRef);
    if (!toVersion || toVersion.paletteSlug !== slug) {
        throw new NotFoundError("`to` is not a version of this palette");
    }

    // inv-J-1: chain-only. One must be an ancestor of the other.
    const onChain =
        (await isAncestor(services, toVersion._id, fromVersion._id)) ||
        (await isAncestor(services, fromVersion._id, toVersion._id));
    if (!onChain) {
        throw new UnprocessableEntityError(
            "`from` and `to` are not on the same single-parent chain",
        );
    }

    const ops = diffAtoms(fromVersion.colors, toVersion.colors);
    return {
        fromHash: computeAtomSetHash(fromVersion.colors),
        toHash: computeAtomSetHash(toVersion.colors),
        ops,
        identical: ops.length === 0,
    };
}
