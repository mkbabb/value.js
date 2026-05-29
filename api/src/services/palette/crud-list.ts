/**
 * Palette LIST + MINE service helpers (D.W2 Lane A).
 *
 * Split out of `crud.ts` to keep file size ≤ 250 lines. These two read-only,
 * pagination-heavy operations carry the bulk of the cursor / filter / sort /
 * color-distance logic; the create / patch / delete / get-single paths live
 * in `crud.ts` (which imports + re-exports these).
 */

import type { Filter, Sort } from "mongodb";
import type { Services } from "../../middleware/inject-services.js";
import type { OklabTriple, Palette } from "../../models.js";
import { formatPalette, type FormattedPalette } from "../../format/palette.js";
import type { listPalettesQuery } from "../../validation/palette.js";
import type { z } from "zod";

type ListQuery = z.infer<typeof listPalettesQuery>;

// ---------------------------------------------------------------
// Cursor encode / decode
// ---------------------------------------------------------------

interface PaginationCursor {
    _id: string;
    createdAt: string;
    voteCount?: number;
    forkCount?: number;
}

function decodeCursor(raw: string | undefined): PaginationCursor | null {
    if (!raw) return null;
    try {
        return JSON.parse(Buffer.from(raw, "base64url").toString());
    } catch {
        // Befitting graceful per D3: a malformed/stale cursor is treated as
        // "start from beginning" — the documented pagination semantic, not a
        // silent data-loss. (D.W2 Lane D rationale.)
        return null;
    }
}

function encodeCursor(obj: PaginationCursor): string {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

// ---------------------------------------------------------------
// LIST
// ---------------------------------------------------------------

export interface ListResult {
    data: FormattedPalette[];
    /** Present in cursor mode. */
    nextCursor?: string | null;
    /** Present in cursor mode. */
    hasMore?: boolean;
    /** Present in offset mode. */
    total?: number;
    limit?: number;
    offset?: number;
}

export async function listPalettes(
    services: Services,
    query: ListQuery,
    currentUserSlug: string | undefined,
): Promise<ListResult> {
    const limit = Math.max(1, Math.min(query.limit ?? 20, 100));
    const useCursor = query.cursor !== undefined;
    const offset = useCursor ? 0 : Math.min(Math.max(0, query.offset ?? 0), 10_000);

    const sortParam = query.sort ?? "newest";
    const sortSpec: Sort =
        sortParam === "popular"
            ? { voteCount: -1, createdAt: -1, _id: -1 }
            : sortParam === "most-forked"
                ? { forkCount: -1, createdAt: -1, _id: -1 }
                : { createdAt: -1, _id: -1 };

    const filter: Filter<Palette> = {};
    const f = filter as Record<string, unknown>;

    // I.W2: public listings exclude soft-deleted palettes. A doc with
    // `deletedAt === null` is live; a doc with a Date is within grace OR
    // about-to-be-reaped. Listings show only live palettes.
    f.deletedAt = null;

    const q = query.q?.trim();
    if (q) f.$text = { $search: q };

    if (query.status) {
        const statuses = query.status.split(",").map((s) => s.trim()).filter(Boolean);
        if (statuses.length === 1) f.status = statuses[0];
        else if (statuses.length > 1) f.status = { $in: statuses };
    }

    if (query.tags) {
        const tags = query.tags.split(",").map((t) => t.trim()).filter(Boolean);
        if (tags.length > 0) f.tags = { $all: tags };
    }

    if (query.userSlug) f.userSlug = query.userSlug;

    const cursor = decodeCursor(query.cursor);
    if (cursor && useCursor) {
        if (sortParam === "popular" && cursor.voteCount != null) {
            f.$or = [
                { voteCount: { $lt: cursor.voteCount } },
                { voteCount: cursor.voteCount, createdAt: { $lt: new Date(cursor.createdAt) } },
                { voteCount: cursor.voteCount, createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
            ];
        } else if (sortParam === "most-forked" && cursor.forkCount != null) {
            f.$or = [
                { forkCount: { $lt: cursor.forkCount } },
                { forkCount: cursor.forkCount, createdAt: { $lt: new Date(cursor.createdAt) } },
                { forkCount: cursor.forkCount, createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
            ];
        } else if (cursor.createdAt) {
            f.$or = [
                { createdAt: { $lt: new Date(cursor.createdAt) } },
                { createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
            ];
        }
    }

    const results = useCursor
        ? await services.repositories.palettes.findManyForCursor(filter, sortSpec, limit)
        : await services.repositories.palettes.findManyByFilter(filter, sortSpec, offset, limit + 1);

    const hasMore = results.length > limit;
    if (hasMore) results.pop();

    let votedSlugs = new Set<string>();
    if (currentUserSlug && results.length > 0) {
        const slugs = results.map((r) => r.slug);
        const votes = await services.repositories.votes.findByUserAndPaletteSlugs(currentUserSlug, slugs);
        votedSlugs = new Set(votes.map((v) => v.paletteSlug));
    }

    let nextCursor: string | undefined;
    if (hasMore && results.length > 0) {
        const last = results[results.length - 1] as Palette & { _id: unknown };
        nextCursor = encodeCursor({
            _id: String(last._id),
            createdAt: last.createdAt.toISOString(),
            voteCount: last.voteCount,
            forkCount: last.forkCount ?? 0,
        });
    }

    let data = results.map((r) => formatPalette(r as Palette & { _id: unknown }, votedSlugs));

    if (
        query.colorL !== undefined &&
        query.colorA !== undefined &&
        query.colorB !== undefined
    ) {
        const radius = query.colorRadius ?? 0.15;
        const tL = query.colorL;
        const tA = query.colorA;
        const tB = query.colorB;
        data = data.filter((p) => {
            const oklabColors = p.oklabColors;
            if (!oklabColors || oklabColors.length === 0) return false;
            return oklabColors.some((c: OklabTriple) => {
                const dL = c.L - tL;
                const da = c.a - tA;
                const db = c.b - tB;
                return Math.sqrt(dL * dL + da * da + db * db) <= radius;
            });
        });
    }

    if (useCursor) {
        return { data, nextCursor: nextCursor ?? null, hasMore };
    }

    const countFilter: Filter<Palette> = { ...filter };
    delete (countFilter as Record<string, unknown>).$or;
    const total = await services.repositories.palettes.countByFilter(countFilter);
    return { data, total, limit, offset };
}

// ---------------------------------------------------------------
// MINE
// ---------------------------------------------------------------

export interface MineResult {
    data: FormattedPalette[];
    total: number;
    limit: number;
    offset: number;
}

export async function listMine(
    services: Services,
    userSlug: string,
    limit: number,
    offset: number,
): Promise<MineResult> {
    const clampedLimit = Math.max(1, Math.min(limit, 100));
    const clampedOffset = Math.max(0, offset);
    const [results, total] = await Promise.all([
        services.repositories.palettes.findByUserSlug(userSlug, clampedOffset, clampedLimit),
        services.repositories.palettes.countByUserSlug(userSlug),
    ]);
    return {
        data: results.map((r) => formatPalette(r as Palette & { _id: unknown })),
        total,
        limit: clampedLimit,
        offset: clampedOffset,
    };
}
