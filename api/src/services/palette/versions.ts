/**
 * Palette versions service (D.W2 Lane A).
 *
 * Owns the version-record creation primitive (`createVersionRecord`) and the
 * three version routes: list, get-by-hash, revert. Every DB call goes through
 * `services.repositories.paletteVersions` or `…palettes`.
 */

import type { ClientSession } from "mongodb";
import type { Services } from "../../middleware/inject-services.js";
import type {
    OklabTriple,
    Palette,
    PaletteColor,
    PaletteVersion,
} from "../../models.js";
import { NotFoundError } from "../../errors/index.js";
import { computeContentHash } from "../../hash.js";
import type { AtomDiffOp } from "../../lib/crud/atomdiff.js";
import { computeOklabColors } from "./oklab.js";

export interface CreateVersionInput {
    paletteSlug: string;
    name: string;
    colors: PaletteColor[];
    authorSlug: string;
    parentHash: string | null;
    forkedFromHash: string | null;
    /** J.W2 — the recorded atom-diff from the parent to this version. Omit/null
     * for a root version (no parent). Persisted on the version edge (inv-J-2). */
    atomDiff?: AtomDiffOp[] | null;
}

/**
 * Idempotent version creation (content-hash dedup). Walks the parent chain
 * to compute `rootHash`/`depth`. Returns the content hash.
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
    const hash = computeContentHash(name, colors);

    const existing = await services.repositories.paletteVersions.findByHash(
        hash,
        session,
    );
    if (existing) return hash;

    let rootHash = hash;
    let depth = 0;
    const parentRef = parentHash ?? forkedFromHash;
    if (parentRef) {
        const parent = await services.repositories.paletteVersions.findByHash(
            parentRef,
            session,
        );
        if (parent) {
            rootHash = parent.rootHash ?? parentRef;
            depth = (parent.depth ?? 0) + 1;
        }
    }

    const version: PaletteVersion = {
        _id: hash,
        name,
        colors,
        parentHash,
        forkedFromHash,
        authorSlug,
        paletteSlug,
        createdAt: new Date(),
        rootHash,
        depth,
        atomDiff: input.atomDiff ?? null,
    };

    await services.repositories.paletteVersions.insertIfAbsent(version, session);
    return hash;
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

export async function getVersionByHash(
    services: Services,
    hash: string,
): Promise<PaletteVersion> {
    const version = await services.repositories.paletteVersions.findByHash(hash);
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
    palette: Palette & { _id: unknown };
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

    const version = await services.repositories.paletteVersions.findByHash(hash);
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
    return { palette: updated as Palette & { _id: unknown } };
}
