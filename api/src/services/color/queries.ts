/**
 * Color queries service (E.W2 Lane A — pipeline migration of `routes/colors.ts`).
 *
 * Owns the read-side of the public color-name surface:
 *   - GET /colors/approved  → paginated list of status="approved" names
 *   - GET /colors/search    → text + regex search (status="approved" only)
 *   - GET /colors/tags      → all tags, sorted by name
 *
 * Writes (the propose flow) live in `./proposals.ts` to keep each service
 * file under the 250-LoC partition cap.
 *
 * All DB access routes through `c.var.services.repositories.{proposedNames,tags}`.
 */

import type { Context } from "hono";
import type { WithId } from "mongodb";
import type { AppEnv } from "../../types.js";
import { escapeRegex } from "../../regex.js";
import type { ProposedName, Tag } from "../../models.js";

export interface ProposedNameDTO {
    id: string;
    name: string;
    css: string;
    status: ProposedName["status"];
    contributor: string | null;
    createdAt: Date;
    approvedAt: Date | null;
}

export interface ApprovedListPage {
    data: ProposedNameDTO[];
    total: number;
    limit: number;
    offset: number;
}

export interface SearchResults {
    data: ProposedNameDTO[];
}

export interface TagDTO {
    id: string;
    name: string;
    category: string;
}

function formatProposedName(
    doc: WithId<ProposedName>,
): ProposedNameDTO {
    return {
        id: String(doc._id),
        name: doc.name,
        css: doc.css,
        status: doc.status,
        contributor: doc.contributor,
        createdAt: doc.createdAt,
        approvedAt: doc.approvedAt,
    };
}

function formatTag(tag: WithId<Tag>): TagDTO {
    return {
        id: String(tag._id),
        name: tag.name,
        category: tag.category,
    };
}

export async function listApprovedColors(
    c: Context<AppEnv>,
    limit: number,
    offset: number,
): Promise<ApprovedListPage> {
    const { proposedNames } = c.var.services.repositories;
    const [results, total] = await Promise.all([
        proposedNames.findByStatus("approved", offset, limit),
        proposedNames.countByStatus("approved"),
    ]);
    return {
        data: results.map((r) => formatProposedName(r)),
        total,
        limit,
        offset,
    };
}

export async function searchApprovedColors(
    c: Context<AppEnv>,
    q: string,
    limit: number,
): Promise<SearchResults> {
    const { proposedNames } = c.var.services.repositories;

    // Primary: $text search ordered by score.
    const textResults = await proposedNames.searchText(q, limit);

    // Fallback: regex on (name, css) for the remaining slots — preserves the
    // pre-migration behaviour where text-search misses (e.g. short tokens,
    // partial matches) are filled in by case-insensitive substring matches.
    const collected = new Map<string, WithId<ProposedName>>();
    for (const doc of textResults) {
        collected.set(String(doc._id), doc);
        if (collected.size >= limit) break;
    }

    if (collected.size < limit) {
        const remaining = limit - collected.size;
        // Fetch a small buffer to absorb overlap with the text-search hits.
        const regexResults = await proposedNames.findManyByFilter(
            {
                status: "approved",
                $or: [
                    { name: { $regex: escapeRegex(q), $options: "i" } },
                    { css: { $regex: escapeRegex(q), $options: "i" } },
                ],
            },
            0,
            remaining + 5,
        );
        for (const doc of regexResults) {
            if (collected.size >= limit) break;
            const id = String(doc._id);
            if (collected.has(id)) continue;
            collected.set(id, doc);
        }
    }

    return {
        data: Array.from(collected.values()).map(formatProposedName),
    };
}

export async function listColorTags(c: Context<AppEnv>): Promise<TagDTO[]> {
    const { tags } = c.var.services.repositories;
    const rows = await tags.findAllSorted();
    return rows.map((t) => formatTag(t));
}
