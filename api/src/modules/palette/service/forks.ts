/**
 * Palette forks service (D.W2 Lane A).
 *
 * Handles the three fork-related routes: fork (cross-collection write),
 * list-forks, provenance-chain.
 */

import type { WithId } from "mongodb";
import type { Services } from "../../../platform/http/inject-services.js";
import type { Palette } from "../model.js";
import { ConflictError, NotFoundError, ValidationError } from "../../../platform/http/errors/index.js";
import { computeContentHash } from "../hash.js";
import { computeOklabColors } from "./oklab.js";
import { createVersionRecord } from "./versions.js";
import { isActivePublic } from "./visibility.js";

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export interface ForkInput {
    sourceSlug: string;
    name?: string | undefined;
    slug?: string | undefined;
    userSlug: string;
}

export interface ForkOutput {
    palette: WithId<Palette>;
}

/**
 * Fork a palette: copy the source's colors into a new child + record the
 * provenance edge. The cross-collection `withTransaction` discipline (insert
 * child + version + bump parent fork-count; in-txn source re-read closes the
 * race) is the single fork write path — the J.W2 remix/atom-diff arm was
 * excised at T.W1 (TA-4: the `/remix`+`/diff` write-only apparatus), so fork is
 * now the sole caller and there is no `colors`-diff branch to fold.
 *
 * H1 invariant: this is the cross-collection write site (palettes insert +
 * parent fork-count `$inc` + paletteVersions); tracked at
 * `docs/tranches/H/audit/api-withTransaction-coverage.md` row 2.
 */
export async function forkPalette(
    services: Services,
    input: ForkInput,
): Promise<ForkOutput> {
    const { sourceSlug, userSlug } = input;

    // Source fetch + input validation is read-only and pure — keep OUTSIDE the
    // transaction so we fail fast (404 / 400) without a session.
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

    const colors = source.colors;
    const contentHash = computeContentHash(forkName, colors);
    const now = new Date();

    const newDoc: Palette = {
        name: forkName,
        slug: forkSlug,
        colors,
        oklabColors: computeOklabColors(colors),
        tags: source.tags ?? [],
        voteCount: 0,
        userSlug,
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
                paletteSlug: forkSlug,
                name: forkName,
                colors,
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

    return { palette: doc };
}

export interface ForkListResult {
    data: WithId<Palette>[];
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
        data,
        total,
    };
}

/**
 * A single provenance step. A public, live ancestor is a minimal, release-
 * scoped `palette` step; a private / unlisted / trashed / purged ancestor
 * collapses to a non-correlatable `unavailable` step carrying ONLY its
 * ordinal (V·W45 item 4). No raw document or lineage field (userSlug,
 * contentHash, createdAt, parent slug) ever crosses the wire for a
 * non-public hop.
 */
export type ProvenanceStep =
    | {
          kind: "palette";
          ordinal: number;
          slug: string;
          name: string;
          isFork: boolean;
      }
    | { kind: "unavailable"; ordinal: number };

export async function getProvenance(
    services: Services,
    slug: string,
): Promise<ProvenanceStep[]> {
    const chain: ProvenanceStep[] = [];
    const visited = new Set<string>();
    let currentSlug: string | null = slug;
    let ordinal = 0;

    while (currentSlug && chain.length < 50) {
        if (visited.has(currentSlug)) break;
        visited.add(currentSlug);

        const doc = await services.repositories.palettes.findBySlug(currentSlug);
        if (!doc) {
            // Purged ancestor: a non-correlatable step; we cannot walk past it.
            chain.push({ kind: "unavailable", ordinal });
            break;
        }

        if (isActivePublic(doc)) {
            chain.push({
                kind: "palette",
                ordinal,
                slug: doc.slug,
                name: doc.name,
                isFork: !!doc.forkOf,
            });
        } else {
            // Private / unlisted / trashed hop: collapse to a non-correlatable
            // step. We still hold the doc, so the walk continues to reveal the
            // PUBLIC ancestors above — but this hop's identity/lineage is not
            // emitted.
            chain.push({ kind: "unavailable", ordinal });
        }

        ordinal++;
        currentSlug = doc.forkOf;
    }

    return chain;
}
