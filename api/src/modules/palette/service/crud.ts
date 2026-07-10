/**
 * Palette CRUD service (D.W2 Lane A + E.W2 Lane C).
 *
 * Owns the single-document CRUD operations: get-by-slug, create, patch, delete.
 * The list+mine read-side (heavy pagination/filter logic) lives in
 * `crud-list.ts` and is re-exported from this module so the route layer has
 * a single import point per concern.
 *
 * All DB access goes through repositories on `c.var.services`. Ownership is
 * enforced UPSTREAM by the `requireOwnership` middleware on the owner-gated
 * routes (`PATCH /palettes/:slug`, `DELETE /palettes/:slug`) — see
 * `routes/palettes/crud.ts`. E.W2 Lane C deleted the inline ownership
 * duplicates that lived here pre-wiring. The route's middleware reads the palette's
 * `userSlug`, compares it to `c.var.userSlug`, and throws
 * `OwnershipError`/`NotFoundError` BEFORE the handler runs — so these service
 * methods are reachable only when ownership already holds.
 */

import type { WithId } from "mongodb";
import type { Services } from "../../../platform/http/inject-services.js";
import type { Palette } from "../model.js";
import { ConflictError, GoneError, NotFoundError } from "../../../platform/http/errors/index.js";
import { computeContentHash } from "../hash.js";
import { formatPalette, type FormattedPalette } from "../format.js";
import type {
    createPaletteBody,
    updatePaletteBody,
} from "../schema.js";
import type { z } from "zod";
import { computeOklabColors } from "./oklab.js";
import { createVersionRecord } from "./versions.js";

type CreateBody = z.infer<typeof createPaletteBody>;
type UpdateBody = z.infer<typeof updatePaletteBody>;

// Re-exports for the route layer.
export { listPalettes, listMine } from "./crud-list.js";
export type { ListResult, MineResult } from "./crud-list.js";

// ---------------------------------------------------------------
// GET BY SLUG
// ---------------------------------------------------------------

export async function getPaletteBySlug(
    services: Services,
    slug: string,
    currentUserSlug: string | undefined,
): Promise<FormattedPalette> {
    const doc = await services.repositories.palettes.findBySlug(slug);
    if (!doc) throw new NotFoundError("Palette not found");

    // I.W2: soft-deleted palettes within grace window return 410 Gone with
    // an explicit `gone` code so consumers can distinguish from 404. After
    // grace expires, the reaper hard-deletes the doc and findBySlug returns
    // null → 404 NotFound (the natural state-transition).
    if (doc.deletedAt !== null && doc.deletedAt !== undefined) {
        throw new GoneError("Palette has been deleted");
    }

    let voted = false;
    if (currentUserSlug) {
        const vote = await services.repositories.votes.findOne(currentUserSlug, slug);
        voted = vote !== null;
    }

    const result = formatPalette(doc);
    result.voted = voted;
    return result;
}

// ---------------------------------------------------------------
// CREATE
// ---------------------------------------------------------------

export interface CreateInput {
    body: CreateBody;
    userSlug: string | null;
}

export async function createPalette(
    services: Services,
    input: CreateInput,
): Promise<FormattedPalette> {
    const { body, userSlug } = input;
    const now = new Date();
    const contentHash = computeContentHash(body.name, body.colors);
    const oklabColors = computeOklabColors(body.colors);

    const doc: Palette = {
        name: body.name,
        slug: body.slug,
        colors: body.colors,
        oklabColors,
        tags: body.tags ?? [],
        voteCount: 0,
        userSlug,
        visibility: "public",
        tier: "standard",
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
        currentHash: contentHash,
        forkOf: null,
        forkOfHash: null,
        forkCount: 0,
        versionCount: 1,
    };

    // Create is a cross-collection write when `userSlug` is present: insert
    // the palette row AND its initial version record in lock-step (H.W1 Lane
    // A — H1 invariant). A partial failure (transient driver error,
    // write-concern timeout) must not leave an orphan version row pointing
    // at a palette that never landed, nor a palette whose `currentHash`
    // doesn't resolve to any version record. Both writes thread `session`.
    try {
        await services.withTransaction(async (session) => {
            await services.repositories.palettes.insert(doc, session);
            if (userSlug) {
                await createVersionRecord(
                    services,
                    {
                        paletteSlug: body.slug,
                        name: body.name,
                        colors: body.colors,
                        authorSlug: userSlug,
                        parentHash: null,
                        forkedFromHash: null,
                    },
                    session,
                );
            }
        });
    } catch (e) {
        if ((e as { code?: number })?.code === 11000) {
            throw new ConflictError("Duplicate entry");
        }
        throw e;
    }

    const saved = await services.repositories.palettes.findBySlug(body.slug);
    if (!saved) throw new NotFoundError("Palette missing after insert");
    return formatPalette(saved);
}

// ---------------------------------------------------------------
// PATCH
// ---------------------------------------------------------------

export interface PatchInput {
    slug: string;
    body: UpdateBody;
    // `userSlug` is the authenticated caller's slug. The route's
    // `requireOwnership` middleware (E.W2 Lane C) guarantees this is also the
    // palette's owner — we use it here purely to attribute the version record.
    userSlug: string | undefined;
    // The pre-read palette, supplied by the route's `requireOwnership`
    // extractor (N.W3.E). When present the service reuses it for the content-
    // hash diff instead of re-reading the slug — the PATCH read-amplification
    // collapse. Optional so direct service callers (tests) still work.
    palette?: WithId<Palette> | undefined;
}

export async function patchPalette(
    services: Services,
    input: PatchInput,
): Promise<FormattedPalette> {
    const { slug, body, userSlug } = input;
    // Ownership is enforced by the `requireOwnership` middleware on the route
    // (E.W2 Lane C). The middleware already read the palette and threads it in
    // via `input.palette` (N.W3.E) — we reuse it for the content-hash diff
    // instead of a redundant re-read. Direct service callers that omit it fall
    // back to a single read. A null here would indicate the resource was
    // deleted between middleware and handler (extremely narrow race).
    const palette =
        input.palette ?? (await services.repositories.palettes.findBySlug(slug));
    if (!palette) throw new NotFoundError("Palette not found");

    const $set: Record<string, unknown> = { updatedAt: new Date() };
    if (body.name !== undefined) $set.name = body.name;
    if (body.colors !== undefined) {
        $set.colors = body.colors;
        $set.oklabColors = computeOklabColors(body.colors);
    }
    if (body.tags !== undefined) $set.tags = body.tags;

    const newName = body.name ?? palette.name;
    const newColors = body.colors ?? palette.colors;
    const newHash = computeContentHash(newName, newColors);
    const contentChanged = newHash !== palette.currentHash;

    if (contentChanged) {
        $set.currentHash = newHash;
        $set.versionCount = (palette.versionCount ?? 1) + 1;
    }

    // Patch is a cross-collection write when content changes AND the caller
    // is attributable: insert the new version record AND mutate the palette
    // document in lock-step (H.W1 Lane A — H1 invariant). A partial failure
    // must not leave a palette whose `currentHash` points at a version row
    // that never committed, nor a freshly-inserted version row that the
    // palette never adopted. When content is unchanged this still runs as a
    // single-statement transaction — cheap, and keeps the call site uniform.
    await services.withTransaction(async (session) => {
        if (contentChanged && userSlug) {
            await createVersionRecord(
                services,
                {
                    paletteSlug: slug,
                    name: newName,
                    colors: newColors,
                    authorSlug: userSlug,
                    parentHash: palette.currentHash,
                    forkedFromHash: null,
                },
                session,
            );
        }
        await services.repositories.palettes.update(slug, { $set }, session);
    });

    const updated = await services.repositories.palettes.findBySlug(slug);
    if (!updated) throw new NotFoundError("Palette missing after update");
    return formatPalette(updated);
}

// ---------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------

export interface DeleteInput {
    slug: string;
}

export async function deletePalette(
    services: Services,
    input: DeleteInput,
): Promise<{ deleted: true; deletedAt: Date }> {
    const { slug } = input;
    // Ownership is enforced by the `requireOwnership` middleware on the route
    // (E.W2 Lane C). A 404 here would indicate the resource was deleted
    // between middleware and handler (extremely narrow race).
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    // I.W2 soft-delete: set `deletedAt` rather than hard-removing. The reaper
    // cron hard-deletes after the grace window expires (default 30 days). The
    // parent fork-count decrement still fires immediately because consumer
    // listings filter `deletedAt: null` — a soft-deleted fork should not
    // count toward its parent's forkCount in the public surface.
    //
    // Votes + flags are preserved attached to the slug; they'll be cleaned
    // up at hard-delete time (the reaper cascade). This matches CRUD-CONTRACT
    // v2.0.0 §4 cascade-delete-with-grace semantics for non-embedded entities.
    const deletedAt = new Date();
    await services.withTransaction(async (session) => {
        await services.repositories.palettes.update(
            slug,
            { $set: { deletedAt, updatedAt: deletedAt } },
            session,
        );
        if (palette.forkOf) {
            await services.repositories.palettes.decrementForkCount(
                palette.forkOf,
                session,
            );
        }
    });

    return { deleted: true, deletedAt };
}

export interface RestoreInput {
    slug: string;
}

export async function restorePalette(
    services: Services,
    input: RestoreInput,
): Promise<FormattedPalette> {
    const { slug } = input;
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");
    if (palette.deletedAt === null || palette.deletedAt === undefined) {
        // Already-live restore is a no-op success (idempotent).
        return formatPalette(palette);
    }
    const now = new Date();
    // N.W3.B — no transaction. Restore is SINGLE-collection: every write here
    // touches only `palettes` (the doc's own `deletedAt` clear + the parent's
    // fork-count recompute), so the H1 cross-collection invariant does not
    // bind. The recompute is itself the heal: `setForkCount` writes the
    // counted-from-truth value (N.W3.J), so the parent's `forkCount` converges
    // to its live-fork count on every restore regardless of interleaving — no
    // transactional isolation required. The clear runs BEFORE the recount so
    // `countForksOf` (which filters `deletedAt: null`) includes this
    // just-restored fork.
    await services.repositories.palettes.update(slug, {
        $set: { deletedAt: null, updatedAt: now },
    });
    if (palette.forkOf) {
        const liveForks = await services.repositories.palettes.countForksOf(
            palette.forkOf,
        );
        await services.repositories.palettes.setForkCount(palette.forkOf, liveForks);
    }
    const restored = await services.repositories.palettes.findBySlug(slug);
    if (!restored) throw new NotFoundError("Palette not found");
    return formatPalette(restored);
}
