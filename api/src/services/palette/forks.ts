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
import { computeOklabColors } from "./oklab.js";
import { createVersionRecord } from "./versions.js";

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export interface ForkInput {
    sourceSlug: string;
    name?: string;
    slug?: string;
    sessionToken: string;
    userSlug: string;
}

export interface ForkOutput {
    palette: Palette & { _id: unknown };
}

export async function forkPalette(
    services: Services,
    input: ForkInput,
): Promise<ForkOutput> {
    const { sourceSlug, sessionToken, userSlug } = input;

    // Initial source fetch + input validation is read-only and pure — keep
    // OUTSIDE the transaction so we fail fast (404 / 400) without a session.
    const source = await services.repositories.palettes.findBySlug(sourceSlug);
    if (!source) throw new NotFoundError("Palette not found");

    const forkName = input.name ?? `${source.name} (remix)`;
    const forkSlug =
        input.slug ?? `${sourceSlug}-remix-${crypto.randomUUID().slice(0, 8)}`;

    if (forkName.length > 100) {
        throw new ValidationError("name too long (max 100 chars)");
    }
    if (!SLUG_PATTERN.test(forkSlug) || forkSlug.length > 120) {
        throw new ValidationError("Invalid slug");
    }

    const sourceColors: PaletteColor[] = source.colors;
    const contentHash = computeContentHash(forkName, sourceColors);
    const now = new Date();

    const newDoc: Palette = {
        name: forkName,
        slug: forkSlug,
        colors: sourceColors,
        oklabColors: source.oklabColors ?? computeOklabColors(sourceColors),
        tags: source.tags ?? [],
        voteCount: 0,
        sessionToken,
        userSlug,
        status: "published",
        createdAt: now,
        updatedAt: now,
        currentHash: contentHash,
        forkOf: sourceSlug,
        forkOfHash: source.currentHash ?? null,
        forkCount: 0,
        versionCount: 1,
    };

    // Cross-collection write: insert fork + insert version + bump parent
    // fork-count. The race window (E-AUDIT-6 §2.4: source deleted between
    // initial read and `incrementForkCount`) closes here — the transaction
    // re-reads `source` under session-isolation BEFORE bumping the counter.
    // If the source is gone, the whole transaction aborts (404) and no
    // orphaned fork persists.
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
                paletteSlug: forkSlug,
                name: forkName,
                colors: sourceColors,
                authorSlug: userSlug,
                parentHash: null,
                forkedFromHash: source.currentHash ?? null,
            },
            session,
        );

        await services.repositories.palettes.incrementForkCount(sourceSlug, session);

        const inserted = await services.repositories.palettes.findBySlug(
            forkSlug,
            session,
        );
        if (!inserted) throw new NotFoundError("Palette missing after insert");
        return inserted;
    });

    return { palette: doc as Palette & { _id: unknown } };
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
