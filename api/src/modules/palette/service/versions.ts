/**
 * Palette versions service (D.W2 Lane A).
 *
 * Owns the version-record creation primitive (`createVersionRecord`) and the
 * three version routes: list, get-by-hash, revert. Every DB call goes through
 * `services.repositories.paletteVersions` or `…palettes`.
 */

import type { ClientSession, WithId } from "mongodb";
import type { Services } from "../../../platform/http/inject-services.js";
import type { OklabTriple, Palette, PaletteColor, PaletteVersion } from "../model.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
import { computeContentHash, computeReleaseHash } from "../hash.js";
import { assertPaletteReadable } from "./visibility.js";
import { computeOklabColors } from "./oklab.js";

export interface CreateVersionInput {
    paletteSlug: string;
    name: string;
    colors: PaletteColor[];
    authorSlug: string;
    parentHash: string | null;
    forkedFromHash: string | null;
}

/**
 * Append a release to a palette's version log. Returns the RELEASE hash — the
 * new row's `_id`.
 *
 * X-W3 · G-7 splits the two identities this function used to conflate:
 *
 *   - `payloadHash` (`computeContentHash`) says WHAT the revision is.
 *   - `_id` (`computeReleaseHash`) says WHICH EVENT it is — palette slug +
 *     `revisionNo` + payload + parent + author.
 *
 * Consequences, both deliberate: releasing the same payload twice now appends
 * two rows (before, the second silently vanished into the content-hash dedup
 * while the palette's `versionCount` was incremented anyway), and a release id
 * is palette-scoped, so it cannot address a row in another palette.
 * `insertIfAbsent` still makes a re-entrant write of the SAME event a no-op.
 *
 * The chain is resolved by MEMBERSHIP — the palette's own head release —
 * rather than by looking up the caller-supplied `parentHash`, which is a
 * payload reference (`Palette.currentHash`) and therefore no longer an `_id`.
 *
 * Accepts an optional `session` (E.W2 Lane B) so the call can participate in
 * a caller's transaction (currently: `forkPalette`'s cross-collection write).
 */
export async function createVersionRecord(
    services: Services,
    input: CreateVersionInput,
    session?: ClientSession,
): Promise<string> {
    const { paletteSlug, name, colors, authorSlug, parentHash, forkedFromHash } = input;
    const payloadHash = computeContentHash(name, colors);

    const head = await services.repositories.paletteVersions.findHeadByPaletteSlug(
        paletteSlug,
        session,
    );
    const revisionNo = (head?.revisionNo ?? 0) + 1;

    const releaseHash = computeReleaseHash({
        paletteSlug,
        revisionNo,
        payloadHash,
        parentHash,
        forkedFromHash,
        authorSlug,
    });

    // Lineage bookkeeping. A palette's first release roots its own chain; each
    // successor extends the palette's head. (A fork's first release roots its
    // own chain rather than continuing the source's: resolving the source's
    // row would need the source SLUG, which only `service/forks.ts` holds.
    // Both fields are write-only — `db.ts:64-66` dropped their indexes as
    // "ZERO query consumers" — and `forkedFromHash` still records the edge.)
    const rootHash = head?.rootHash ?? releaseHash;
    const depth = head === null ? 0 : (head.depth ?? 0) + 1;

    const version: PaletteVersion = {
        _id: releaseHash,
        payloadHash,
        revisionNo,
        name,
        colors,
        parentHash,
        forkedFromHash,
        authorSlug,
        paletteSlug,
        createdAt: new Date(),
        rootHash,
        depth,
    };

    await services.repositories.paletteVersions.insertIfAbsent(version, session);
    return releaseHash;
}

// ---------------------------------------------------------------
// Public service methods (1:1 with the version routes)
// ---------------------------------------------------------------

export interface VersionListResult {
    data: PaletteVersion[];
    total: number;
}

export async function listVersions(
    services: Services,
    paletteSlug: string,
    skip: number,
    limit: number,
): Promise<VersionListResult> {
    const [data, total] = await Promise.all([
        services.repositories.paletteVersions.findByPaletteSlug(paletteSlug, skip, limit),
        services.repositories.paletteVersions.countByPaletteSlug(paletteSlug),
    ]);
    return { data, total };
}

/**
 * X-W3 · G-5 — read ONE revision through the palette that addresses it.
 *
 * Replaces the global `getVersionByHash`, which took a hash alone: any caller
 * holding any hash read any revision of any palette, and hashes are handed out
 * freely by the version list and by `currentHash` on every detail envelope.
 * Here the addressing palette is authorized first (so a private palette's
 * revisions are not a side door around the detail route), and the revision is
 * then read JOINED to that palette, so a hash belonging to another object
 * resolves to nothing.
 *
 * Both refusals are `NotFoundError`: distinguishing "exists but is not
 * addressed by this palette" from "does not exist" would be an existence
 * oracle over other people's objects.
 */
export async function getPaletteVersion(
    services: Services,
    paletteSlug: string,
    hash: string,
    viewer: string | undefined,
): Promise<PaletteVersion> {
    await assertPaletteReadable(services, paletteSlug, viewer);
    const version = await services.repositories.paletteVersions.findByPaletteAndHash(
        paletteSlug,
        hash,
    );
    if (!version) throw new NotFoundError("Version not found");
    return version;
}

export interface RevertInput {
    slug: string;
    hash: string;
    // `userSlug` is the authenticated caller's slug. The route's
    // `requireOwnership` middleware (E.W2 Lane C) guarantees this also owns
    // the palette — we use it here purely to attribute the new version record.
    userSlug: string | undefined;
}

export interface RevertOutput {
    palette: WithId<Palette>;
}

export async function revertToVersion(
    services: Services,
    input: RevertInput,
): Promise<RevertOutput> {
    const { slug, hash, userSlug } = input;

    // Ownership is enforced upstream by `requireOwnership` on the route. We
    // still re-read here for the parent-hash bookkeeping; a 404 here would
    // indicate the palette was deleted between middleware and handler
    // (extremely narrow race).
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    // X-W3 · G-6 (P0) — the source revision is read JOINED to the palette
    // being reverted. Unjoined, `findByHash(hash)` let an owner name any
    // revision of any palette and have its `name`+`colors` written into their
    // own document: a content transplant across an object boundary, driven by
    // a hash the version list hands out for free. The refusal is `404` and it
    // happens BEFORE the transaction, so the target is byte-unchanged.
    const version = await services.repositories.paletteVersions.findByPaletteAndHash(
        slug,
        hash,
    );
    if (!version) throw new NotFoundError("Version not found");

    const newHash = computeContentHash(version.name, version.colors);
    const newOklab: OklabTriple[] = computeOklabColors(version.colors);

    // Revert is a cross-collection write: insert the attribution version
    // record into `palette_versions` AND mutate the `palettes` document in
    // bidirectional lock-step (G.W3 Lane E). A partial failure must not
    // leave an orphaned version record without the corresponding palette
    // update, nor a palette pointing at a hash whose version row never
    // committed. `session` threads through both writes.
    await services.withTransaction(async (session) => {
        if (userSlug) {
            await createVersionRecord(
                services,
                {
                    paletteSlug: slug,
                    name: version.name,
                    colors: version.colors,
                    authorSlug: userSlug,
                    parentHash: palette.currentHash,
                    forkedFromHash: null,
                },
                session,
            );
        }

        await services.repositories.palettes.update(
            slug,
            {
                $set: {
                    name: version.name,
                    colors: version.colors,
                    oklabColors: newOklab,
                    currentHash: newHash,
                    updatedAt: new Date(),
                },
                $inc: { versionCount: 1 },
            },
            session,
        );
    });

    const updated = await services.repositories.palettes.findBySlug(slug);
    if (!updated) throw new NotFoundError("Palette not found after revert");
    return { palette: updated };
}
