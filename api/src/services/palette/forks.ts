/**
 * Palette forks service (D.W2 Lane A).
 *
 * Handles the three fork-related routes: fork (cross-collection write),
 * list-forks, provenance-chain.
 */

import type { Services } from "../../middleware/inject-services.js";
import type { Palette, PaletteColor } from "../../models.js";
import { ConflictError, NotFoundError, ValidationError } from "../../errors/index.js";
import { computeContentHash } from "../../hash.js";
import { diffAtoms, type AtomDiffOp } from "../../lib/crud/atomdiff.js";
import { computeOklabColors } from "./oklab.js";
import { createVersionRecord } from "./versions.js";

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export interface RemixInput {
    sourceSlug: string;
    name?: string | undefined;
    slug?: string | undefined;
    /** ABSENT → a plain fork (the recorded atom-diff is empty). PRESENT → the
     * remix payload; the server diffs it against the source's colors and
     * records the atom-diff on the child version edge. */
    colors?: PaletteColor[] | undefined;
    sessionToken: string;
    userSlug: string;
}

export interface RemixOutput {
    palette: Palette & { _id: unknown };
    /** The recorded source→child atom-diff (empty for a plain fork). */
    atomDiff: AtomDiffOp[];
    /** The provenance edge source: the slug + content-hash forked from. */
    remixedFrom: { slug: string; hash: string | null };
}

/**
 * Remix = fork + a RECORDED atom-diff (J.W2). The cross-collection
 * `withTransaction` discipline is UNCHANGED from the original fork (insert
 * child + version + bump parent fork-count; in-txn source re-read closes the
 * race) — the delta is that the child version records the atom-diff from the
 * source. `fork` is `remix` with no colors (an empty diff): ONE code path, no
 * legacy shim (see `forkPalette` below).
 *
 * H1 invariant: this is the SAME cross-collection write site previously named
 * `forkPalette` (palettes insert + parent fork-count `$inc` + paletteVersions);
 * tracked at `docs/tranches/H/audit/api-withTransaction-coverage.md` row 2.
 */
export async function remixPalette(
    services: Services,
    input: RemixInput,
): Promise<RemixOutput> {
    const { sourceSlug, sessionToken, userSlug } = input;

    // Source fetch + input validation is read-only and pure — keep OUTSIDE the
    // transaction so we fail fast (404 / 400) without a session.
    const source = await services.repositories.palettes.findBySlug(sourceSlug);
    if (!source) throw new NotFoundError("Palette not found");

    const remixName = input.name ?? `${source.name} (remix)`;
    const remixSlug =
        input.slug ?? `${sourceSlug}-remix-${crypto.randomUUID().slice(0, 8)}`;

    if (remixName.length > 100) {
        throw new ValidationError("name too long (max 100 chars)");
    }
    if (!SLUG_PATTERN.test(remixSlug) || remixSlug.length > 120) {
        throw new ValidationError("Invalid slug");
    }

    const sourceColors: PaletteColor[] = source.colors;
    const targetColors: PaletteColor[] = input.colors ?? sourceColors;
    // The recorded atom-diff (source → target). A plain fork (colors absent)
    // diffs against itself → empty (fork IS remix-with-empty-diff).
    const atomDiff = diffAtoms(sourceColors, targetColors);

    const contentHash = computeContentHash(remixName, targetColors);
    const now = new Date();

    const newDoc: Palette = {
        name: remixName,
        slug: remixSlug,
        colors: targetColors,
        oklabColors: computeOklabColors(targetColors),
        tags: source.tags ?? [],
        voteCount: 0,
        sessionToken,
        userSlug,
        status: "published",
        visibility: "public",
        tier: "standard",
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
        currentHash: contentHash,
        forkOf: sourceSlug,
        forkOfHash: source.currentHash ?? null,
        forkCount: 0,
        versionCount: 1,
    };

    // Cross-collection write: insert child + insert version + bump parent
    // fork-count. The race window (E-AUDIT-6 §2.4: source deleted between
    // initial read and `incrementForkCount`) closes here — the transaction
    // re-reads `source` under session-isolation BEFORE bumping the counter.
    // If the source is gone, the whole transaction aborts (404) and no
    // orphaned child persists.
    const doc = await services.withTransaction(async (session) => {
        // Re-verify source still exists inside the transaction. Mongo's
        // snapshot read-concern guarantees this reflects committed-only
        // state; a concurrent delete that committed before us sees the
        // missing slug here and we abort cleanly.
        const sourceInTxn = await services.repositories.palettes.findBySlug(
            sourceSlug,
            session,
        );
        if (!sourceInTxn) {
            throw new NotFoundError("Palette not found");
        }

        try {
            await services.repositories.palettes.insert(newDoc, session);
        } catch (e) {
            if ((e as { code?: number })?.code === 11000) {
                throw new ConflictError("Duplicate slug");
            }
            throw e;
        }

        await createVersionRecord(
            services,
            {
                paletteSlug: remixSlug,
                name: remixName,
                colors: targetColors,
                authorSlug: userSlug,
                parentHash: null,
                forkedFromHash: source.currentHash ?? null,
                atomDiff,
            },
            session,
        );

        await services.repositories.palettes.incrementForkCount(sourceSlug, session);

        const inserted = await services.repositories.palettes.findBySlug(
            remixSlug,
            session,
        );
        if (!inserted) throw new NotFoundError("Palette missing after insert");
        return inserted;
    });

    return {
        palette: doc as Palette & { _id: unknown },
        atomDiff,
        remixedFrom: { slug: sourceSlug, hash: source.currentHash ?? null },
    };
}

export interface ForkInput {
    sourceSlug: string;
    name?: string | undefined;
    slug?: string | undefined;
    sessionToken: string;
    userSlug: string;
}

export interface ForkOutput {
    palette: Palette & { _id: unknown };
}

/**
 * Fork = remix with an empty diff. ONE code path — `forkPalette` is the
 * zero-change special case of `remixPalette` (no `colors` → empty atomDiff).
 * The existing `POST /:slug/fork` route + its contract are preserved; this is
 * a semantic alias, NOT a backward-compat shim.
 */
export async function forkPalette(
    services: Services,
    input: ForkInput,
): Promise<ForkOutput> {
    const { palette } = await remixPalette(services, {
        sourceSlug: input.sourceSlug,
        name: input.name,
        slug: input.slug,
        colors: undefined,
        sessionToken: input.sessionToken,
        userSlug: input.userSlug,
    });
    return { palette };
}

export interface ForkListResult {
    data: (Palette & { _id: unknown })[];
    total: number;
}

export async function listForks(
    services: Services,
    slug: string,
    skip: number,
    limit: number,
): Promise<ForkListResult> {
    const [data, total] = await Promise.all([
        services.repositories.palettes.findForksOf(slug, skip, limit),
        services.repositories.palettes.countForksOf(slug),
    ]);
    return {
        data: data as (Palette & { _id: unknown })[],
        total,
    };
}

export interface ProvenanceEntry {
    slug: string;
    name: string;
    userSlug: string | null;
    contentHash: string | null;
    createdAt: Date;
    isFork: boolean;
}

export async function getProvenance(
    services: Services,
    slug: string,
): Promise<ProvenanceEntry[]> {
    const chain: ProvenanceEntry[] = [];
    const visited = new Set<string>();
    let current = await services.repositories.palettes.findBySlug(slug);

    while (current && chain.length < 50) {
        if (visited.has(current.slug)) break;
        visited.add(current.slug);

        chain.push({
            slug: current.slug,
            name: current.name,
            userSlug: current.userSlug,
            contentHash: current.currentHash,
            createdAt: current.createdAt,
            isFork: !!current.forkOf,
        });

        if (!current.forkOf) break;
        current = await services.repositories.palettes.findBySlug(current.forkOf);
    }

    return chain;
}
