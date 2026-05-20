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
import { NotFoundError, OwnershipError } from "../../errors/index.js";
import { computeContentHash } from "../../hash.js";
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
    sessionToken: string;
    userSlug: string | undefined;
}

export interface RevertOutput {
    palette: Palette & { _id: unknown };
}

export async function revertToVersion(
    services: Services,
    input: RevertInput,
): Promise<RevertOutput> {
    const { slug, hash, sessionToken, userSlug } = input;

    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    const isOwner =
        palette.sessionToken === sessionToken ||
        (userSlug !== undefined && palette.userSlug === userSlug);
    if (!isOwner) throw new OwnershipError("Not the owner");

    const version = await services.repositories.paletteVersions.findByHash(hash);
    if (!version) throw new NotFoundError("Version not found");

    const newHash = computeContentHash(version.name, version.colors);
    if (userSlug) {
        await createVersionRecord(services, {
            paletteSlug: slug,
            name: version.name,
            colors: version.colors,
            authorSlug: userSlug,
            parentHash: palette.currentHash,
            forkedFromHash: null,
        });
    }

    const newOklab: OklabTriple[] = computeOklabColors(version.colors);
    await services.repositories.palettes.update(slug, {
        $set: {
            name: version.name,
            colors: version.colors,
            oklabColors: newOklab,
            currentHash: newHash,
            updatedAt: new Date(),
        },
        $inc: { versionCount: 1 },
    });

    const updated = await services.repositories.palettes.findBySlug(slug);
    if (!updated) throw new NotFoundError("Palette not found after revert");
    return { palette: updated as Palette & { _id: unknown } };
}
