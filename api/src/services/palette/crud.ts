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
 * `routes/palettes/crud.ts`. E.W2 Lane C deleted the inline duplicates that
 * lived here pre-wiring (the legacy sessionToken equality shim and its
 * userSlug companion). The route's middleware reads the palette's
 * `userSlug`, compares it to `c.var.userSlug`, and throws
 * `OwnershipError`/`NotFoundError` BEFORE the handler runs — so these service
 * methods are reachable only when ownership already holds.
 */

import type { Services } from "../../middleware/inject-services.js";
import type { Palette } from "../../models.js";
import { ConflictError, NotFoundError } from "../../errors/index.js";
import { computeContentHash } from "../../hash.js";
import { formatPalette, type FormattedPalette } from "../../format/palette.js";
import type {
    createPaletteBody,
    updatePaletteBody,
} from "../../validation/palette.js";
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

    let voted = false;
    if (currentUserSlug) {
        const vote = await services.repositories.votes.findOne(currentUserSlug, slug);
        voted = vote !== null;
    }

    const result = formatPalette(doc as Palette & { _id: unknown });
    result.voted = voted;
    return result;
}

// ---------------------------------------------------------------
// CREATE
// ---------------------------------------------------------------

export interface CreateInput {
    body: CreateBody;
    sessionToken: string;
    userSlug: string | null;
}

export async function createPalette(
    services: Services,
    input: CreateInput,
): Promise<FormattedPalette> {
    const { body, sessionToken, userSlug } = input;
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
        sessionToken,
        userSlug,
        status: "published",
        createdAt: now,
        updatedAt: now,
        currentHash: contentHash,
        forkOf: null,
        forkOfHash: null,
        forkCount: 0,
        versionCount: 1,
    };

    try {
        await services.repositories.palettes.insert(doc);
    } catch (e) {
        if ((e as { code?: number })?.code === 11000) {
            throw new ConflictError("Duplicate entry");
        }
        throw e;
    }

    if (userSlug) {
        await createVersionRecord(services, {
            paletteSlug: body.slug,
            name: body.name,
            colors: body.colors,
            authorSlug: userSlug,
            parentHash: null,
            forkedFromHash: null,
        });
    }

    const saved = await services.repositories.palettes.findBySlug(body.slug);
    if (!saved) throw new NotFoundError("Palette missing after insert");
    return formatPalette(saved as Palette & { _id: unknown });
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
}

export async function patchPalette(
    services: Services,
    input: PatchInput,
): Promise<FormattedPalette> {
    const { slug, body, userSlug } = input;
    // Ownership is enforced by the `requireOwnership` middleware on the route
    // (E.W2 Lane C). The middleware has already verified the palette exists
    // and is owned by `c.var.userSlug`; we still re-read here for the patch
    // payload + content-hash diff. A 404 here would indicate the resource was
    // deleted between middleware and handler (extremely narrow race).
    const palette = await services.repositories.palettes.findBySlug(slug);
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
        if (userSlug) {
            await createVersionRecord(services, {
                paletteSlug: slug,
                name: newName,
                colors: newColors,
                authorSlug: userSlug,
                parentHash: palette.currentHash,
                forkedFromHash: null,
            });
        }
    }

    await services.repositories.palettes.update(slug, { $set });
    const updated = await services.repositories.palettes.findBySlug(slug);
    if (!updated) throw new NotFoundError("Palette missing after update");
    return formatPalette(updated as Palette & { _id: unknown });
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
): Promise<{ deleted: true }> {
    const { slug } = input;
    // Ownership is enforced by the `requireOwnership` middleware on the route
    // (E.W2 Lane C). A 404 here would indicate the resource was deleted
    // between middleware and handler (extremely narrow race).
    const palette = await services.repositories.palettes.findBySlug(slug);
    if (!palette) throw new NotFoundError("Palette not found");

    await services.repositories.palettes.delete(slug);
    await services.repositories.votes.deleteByPaletteSlug(slug);
    await services.repositories.flags.deleteByPaletteSlug(slug);

    if (palette.forkOf) {
        await services.repositories.palettes.decrementForkCount(palette.forkOf);
    }

    return { deleted: true };
}
