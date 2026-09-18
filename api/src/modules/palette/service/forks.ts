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
import { assertPaletteReadable, assertReadable, isReadable } from "./visibility.js";

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
    //
    // X-W3 · G-12 — the source is AUTHORIZED here, at the pre-flight read.
    // Fork is a read of someone else's palette followed by a write of its
    // whole payload into a row the forker owns: without this line it was the
    // widest read surface in the domain, and it answered everyone. The refusal
    // is `assertPaletteReadable`'s `NotFoundError`, identical to the detail
    // route's, so fork cannot be used as an existence oracle either.
    const source = await assertPaletteReadable(services, sourceSlug, userSlug);

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
        // X-W3 · G-12 (class 2) — the child is born PRIVATE. A fork was
        // published on creation, so forking any palette silently minted a new
        // public row carrying a copy of its payload; the forker had no step at
        // which they chose to publish. Publication is now the explicit
        // `POST /:slug/publish` verb, as it is for every other palette.
        visibility: "private",
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
        // X-W3 · G-12 — and it is AUTHORIZED again here, not merely proven to
        // exist. The race this re-read closes is not only "the source was
        // deleted": it is "the source was UNPUBLISHED", between the pre-flight
        // read and this write. An existence-only recheck would let that fork
        // commit, copying a payload the owner had just withdrawn.
        assertReadable(sourceInTxn, userSlug);

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

/**
 * X-W3 · G-13 (class 3) — the fork list, filtered per child by the read
 * policy, with `total` derived from the SAME filtered join the page is drawn
 * from.
 *
 * Classes 2 and 3 are one cure, not two (`W3.md:248-249`): birthing the child
 * private without filtering this list would have moved the leak rather than
 * closed it — every private child would still have been enumerated here, in
 * full, to anybody who could name the parent.
 *
 * The addressing palette is authorized first. The list is a disclosure ABOUT
 * the parent (its child count and their identities), so a parent this viewer
 * may not read has no readable fork list either — and the refusal is the same
 * `404` every other palette-addressed surface gives.
 */
export async function listForks(
    services: Services,
    slug: string,
    skip: number,
    limit: number,
    viewer: string | null | undefined,
): Promise<ForkListResult> {
    await assertPaletteReadable(services, slug, viewer);
    const [data, total] = await Promise.all([
        services.repositories.palettes.findForksOf(slug, skip, limit, viewer),
        services.repositories.palettes.countForksOf(slug, viewer),
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
    viewer: string | null | undefined,
): Promise<ProvenanceStep[]> {
    // X-W3 · G-4 — the TARGET is authorized before the walk begins. The
    // redaction half (V·W45 item 4, D-5) has always been correct per hop, but
    // it answered every caller: a stranger could name any private palette and
    // learn its ancestry DEPTH and which of its ancestors are public — a
    // correlatable shape the detail route refuses to serve. `assertPaletteReadable`
    // is the SAME predicate the detail read takes (never a second spelling of
    // it) and returns the document, so hop 0 is not read twice.
    let doc: WithId<Palette> | null = await assertPaletteReadable(
        services,
        slug,
        viewer,
    );

    const chain: ProvenanceStep[] = [];
    const visited = new Set<string>();
    let ordinal = 0;

    while (doc && chain.length < 50) {
        if (visited.has(doc.slug)) break;
        visited.add(doc.slug);

        if (isReadable(doc, viewer)) {
            // X-W3 · G-4 — `isReadable`, not `isActivePublic`: an owner is
            // entitled to the truth about their OWN row, so their private hops
            // resolve to real `palette` steps instead of collapsing into an
            // `unavailable` run that hides their own lineage from them.
            chain.push({
                kind: "palette",
                ordinal,
                slug: doc.slug,
                name: doc.name,
                isFork: !!doc.forkOf,
            });
        } else {
            // A hop this viewer may not read: collapse to a non-correlatable
            // step. We still hold the doc, so the walk continues to reveal the
            // ancestors above — but this hop's identity/lineage is not emitted.
            chain.push({ kind: "unavailable", ordinal });
        }

        ordinal++;

        const parentSlug: string | null = doc.forkOf;
        doc = parentSlug
            ? await services.repositories.palettes.findBySlug(parentSlug)
            : null;
        if (parentSlug && !doc) {
            // Purged ancestor: a non-correlatable step; we cannot walk past it.
            chain.push({ kind: "unavailable", ordinal });
            break;
        }
    }

    return chain;
}
