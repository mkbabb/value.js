/**
 * Palette LIST + MINE service helpers (D.W2 Lane A; N.W3.D pagination collapse).
 *
 * Split out of `crud.ts` to keep file size ≤ 250 lines. These two read-only,
 * pagination-heavy operations carry the bulk of the cursor / filter / sort /
 * color-distance logic; the create / patch / delete / get-single paths live
 * in `crud.ts` (which imports + re-exports these).
 *
 * N.W3.D — the public `/palettes` list is CURSOR-ONLY. The dual cursor+offset
 * paths collapsed onto the one idiomatic keyset path: a request with no
 * `cursor` is simply "first page" (no `$or` predicate), and `nextCursor` +
 * `hasMore` carry the continuation. Offset pagination (with its `skip` deep-
 * page penalty + the per-page `countDocuments` round-trip) is gone from the
 * hot browse path. `/mine` + `/forks` keep offset — small, owner-scoped sets
 * with no scale pressure where a total count is genuinely shown.
 */

import type { Filter, Sort, WithId } from "mongodb";
import type { Services } from "../../../platform/http/inject-services.js";
import type { OklabTriple, Palette } from "../model.js";
import { formatPalette, type FormattedPalette } from "../format.js";
import type { listPalettesQuery } from "../schema.js";
import type { z } from "zod";

type ListQuery = z.infer<typeof listPalettesQuery>;

/**
 * Fetch-ahead safety bound (N.W3.D). When a color-distance filter is active
 * the keyset scan may consume many non-matching docs before it fills a page;
 * we cap the number of `limit`-sized batches a single request will scan so a
 * pathological "no doc matches" query returns a short honest page instead of
 * walking the whole collection. A page that hits this bound carries
 * `hasMore: true` so the client continues from `nextCursor`.
 */
const MAX_FETCH_AHEAD_BATCHES = 10;

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

function encodeCursor(doc: WithId<Palette>): string {
    const cursor: PaginationCursor = {
        _id: String(doc._id),
        createdAt: doc.createdAt.toISOString(),
        voteCount: doc.voteCount,
        forkCount: doc.forkCount ?? 0,
    };
    return Buffer.from(JSON.stringify(cursor)).toString("base64url");
}

// ---------------------------------------------------------------
// Filter + sort builders
// ---------------------------------------------------------------

type SortMode = "newest" | "popular" | "most-forked";

function sortSpecFor(sort: SortMode): Sort {
    return sort === "popular"
        ? { voteCount: -1, createdAt: -1, _id: -1 }
        : sort === "most-forked"
            ? { forkCount: -1, createdAt: -1, _id: -1 }
            : { createdAt: -1, _id: -1 };
}

/** The base filter (everything except the keyset `$or` continuation). */
function baseFilterFor(
    query: ListQuery,
    currentUserSlug: string | undefined,
): Filter<Palette> {
    const filter: Filter<Palette> = {};
    const f = filter as Record<string, unknown>;

    // I.W2: public listings exclude soft-deleted palettes.
    f.deletedAt = null;

    const q = query.q?.trim();
    if (q) f.$text = { $search: q };

    if (query.tier) f.tier = query.tier;

    if (query.tags) {
        const tags = query.tags.split(",").map((t) => t.trim()).filter(Boolean);
        if (tags.length > 0) f.tags = { $all: tags };
    }

    if (query.userSlug) f.userSlug = query.userSlug;

    // I.W1 visibility (J.W2 [P0] fix): the public browse shows ONLY `public`
    // palettes. An owner filtering by their OWN userSlug may narrow to a
    // specific visibility; anonymous + other users are forced to `public`.
    const viewingOwn =
        query.userSlug !== undefined && query.userSlug === currentUserSlug;
    if (viewingOwn) {
        if (query.visibility) f.visibility = query.visibility;
    } else {
        f.visibility = "public";
    }

    return filter;
}

/**
 * The keyset `$or` continuation predicate for a decoded cursor + sort mode.
 * Returned as the structural Mongo-filter shape (`Record<string, unknown>[]`)
 * — `Palette` omits `_id` from the model, so a strict `Filter<Palette>` typing
 * would force `_id` to `ObjectId` while the live `_id` is a string slug; the
 * structural shape is the same widening the inline filter always used (not an
 * escape cast — `$or` is assigned through the filter's `Record` view below).
 */
function keysetPredicate(
    cursor: PaginationCursor,
    sort: SortMode,
): Record<string, unknown>[] {
    if (sort === "popular" && cursor.voteCount != null) {
        return [
            { voteCount: { $lt: cursor.voteCount } },
            { voteCount: cursor.voteCount, createdAt: { $lt: new Date(cursor.createdAt) } },
            { voteCount: cursor.voteCount, createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
        ];
    }
    if (sort === "most-forked" && cursor.forkCount != null) {
        return [
            { forkCount: { $lt: cursor.forkCount } },
            { forkCount: cursor.forkCount, createdAt: { $lt: new Date(cursor.createdAt) } },
            { forkCount: cursor.forkCount, createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
        ];
    }
    return [
        { createdAt: { $lt: new Date(cursor.createdAt) } },
        { createdAt: new Date(cursor.createdAt), _id: { $lt: cursor._id } },
    ];
}

/**
 * Build the OKLab color-distance matcher when the query carries a full
 * `colorL/colorA/colorB` target, else `null` (no filter). The matcher returns
 * true iff ANY of a palette's oklab colors lies within `colorRadius` of the
 * target (Euclidean distance in OKLab).
 */
function colorMatcherFor(query: ListQuery): ((p: WithId<Palette>) => boolean) | null {
    if (
        query.colorL === undefined ||
        query.colorA === undefined ||
        query.colorB === undefined
    ) {
        return null;
    }
    const radius = query.colorRadius ?? 0.15;
    const tL = query.colorL;
    const tA = query.colorA;
    const tB = query.colorB;
    return (p) => {
        const oklabColors: OklabTriple[] = p.oklabColors;
        if (!oklabColors || oklabColors.length === 0) return false;
        return oklabColors.some((c) => {
            const dL = c.L - tL;
            const da = c.a - tA;
            const db = c.b - tB;
            return Math.sqrt(dL * dL + da * da + db * db) <= radius;
        });
    };
}

// ---------------------------------------------------------------
// LIST
// ---------------------------------------------------------------

export interface ListResult {
    data: FormattedPalette[];
    nextCursor: string | null;
    hasMore: boolean;
}

export async function listPalettes(
    services: Services,
    query: ListQuery,
    currentUserSlug: string | undefined,
): Promise<ListResult> {
    const limit = Math.max(1, Math.min(query.limit ?? 20, 100));
    const sort: SortMode = query.sort ?? "newest";
    const sortSpec = sortSpecFor(sort);
    const baseFilter = baseFilterFor(query, currentUserSlug);
    const matcher = colorMatcherFor(query);

    // The keyset position we resume from. Starts at the request cursor and
    // advances across fetch-ahead batches when a color filter is active.
    let cursor = decodeCursor(query.cursor);

    const matched: WithId<Palette>[] = [];
    let hasMore = false;

    // Fetch-ahead loop. Without a color filter this runs exactly once (one
    // page of `limit + 1`). WITH a filter it keeps pulling `limit`-sized
    // batches — advancing the internal keyset cursor — until it has `limit`
    // matches, the collection is exhausted, or the safety bound is hit. This
    // makes pagination HONEST with the filter: a returned page is full unless
    // the matching set is genuinely exhausted (N.W3.D — closes the old
    // post-filter short-page contrivance where a page could come back empty
    // with hasMore:true).
    for (let batch = 0; batch < MAX_FETCH_AHEAD_BATCHES; batch++) {
        const filter: Filter<Palette> = { ...baseFilter };
        if (cursor) {
            (filter as Record<string, unknown>).$or = keysetPredicate(cursor, sort);
        }

        // Pull one extra so we can detect more-pages-exist for the unfiltered
        // case; the filtered case detects continuation by loop control.
        const rows = await services.repositories.palettes.findManyForCursor(
            filter,
            sortSpec,
            limit,
        );
        const pageHasExtra = rows.length > limit;
        const page = pageHasExtra ? rows.slice(0, limit) : rows;

        if (!matcher) {
            // No color filter — the classic single page.
            matched.push(...page);
            hasMore = pageHasExtra;
            break;
        }

        // Color filter active — accumulate matches, advance the cursor.
        for (const doc of page) {
            if (matched.length >= limit) break;
            if (matcher(doc)) matched.push(doc);
        }

        if (matched.length >= limit) {
            // We filled the page. There may be more matches beyond it — the
            // next request resumes from the last matched doc's cursor and
            // re-scans only docs strictly after it.
            hasMore = true;
            break;
        }
        if (page.length < limit && !pageHasExtra) {
            // The underlying collection is exhausted — the matching set is
            // genuinely finished. Honest short (or empty) final page.
            hasMore = false;
            break;
        }
        // More underlying docs remain but we haven't filled the page —
        // advance past the last SCANNED doc and pull the next batch.
        const lastScanned = page.at(-1);
        if (!lastScanned) {
            hasMore = false;
            break;
        }
        cursor = decodeCursor(encodeCursor(lastScanned));
        if (batch === MAX_FETCH_AHEAD_BATCHES - 1) {
            // Hit the scan bound without filling the page — report more so the
            // client continues rather than wrongly concluding "no more".
            hasMore = true;
        }
    }

    let votedSlugs = new Set<string>();
    if (currentUserSlug && matched.length > 0) {
        const slugs = matched.map((r) => r.slug);
        const votes = await services.repositories.votes.findByUserAndPaletteSlugs(
            currentUserSlug,
            slugs,
        );
        votedSlugs = new Set(votes.map((v) => v.paletteSlug));
    }

    // The continuation cursor is the last RETURNED doc's keyset position, so
    // the next request resumes strictly after it (re-scanning any unmatched
    // docs in between — idempotent, no skips, no dupes).
    const lastReturned = matched.at(-1);
    const nextCursor = hasMore && lastReturned ? encodeCursor(lastReturned) : null;

    const data = matched.map((r) => formatPalette(r, votedSlugs));
    return { data, nextCursor, hasMore };
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
        data: results.map((r) => formatPalette(r)),
        total,
        limit: clampedLimit,
        offset: clampedOffset,
    };
}
