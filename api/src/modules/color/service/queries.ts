/**
 * Color queries service (E.W2 Lane A — pipeline migration of `routes/colors.ts`).
 *
 * Owns the read-side of the public color-name surface:
 *   - GET /colors/approved  → paginated list of status="approved" names
 *   - GET /colors/search    → indexed byte-prefix search (status="approved")
 *   - GET /colors/tags      → all tags, sorted by name
 *
 * Writes (the propose flow) live in `./proposals.ts` to keep each service
 * file under the 250-LoC partition cap.
 *
 * All DB access routes through `services.repositories.{proposedNames,tags}`.
 */

import type { WithId } from "mongodb";
import type { Services } from "../../../platform/http/inject-services.js";
import type { ProposedName, Tag } from "../model.js";

export interface ProposedNameDTO {
    id: string;
    name: string;
    css: string;
    status: ProposedName["status"];
    proposerSlug: string | null;
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
        proposerSlug: doc.proposerSlug,
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
    services: Services,
    limit: number,
    offset: number,
): Promise<ApprovedListPage> {
    const { proposedNames } = services.repositories;
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
    services: Services,
    q: string,
    limit: number,
): Promise<SearchResults> {
    const { proposedNames } = services.repositories;

    // V·W45 item 2 — indexed byte-prefix search ONLY. The former text-index
    // rank-primary + case-insensitive substring (regex) fallback — which
    // matched anywhere in a name/css and ranked non-deterministically — is
    // retired: search is now a single bounded, normalized prefix range over
    // the unique `{name:1}` index. A query matches iff a name STARTS WITH it.
    const prefix = q.trim().toLowerCase();
    const results = await proposedNames.searchByNamePrefix(prefix, limit);

    return {
        data: results.map(formatProposedName),
    };
}

export async function listColorTags(services: Services): Promise<TagDTO[]> {
    const { tags } = services.repositories;
    const rows = await tags.findAllSorted();
    return rows.map((t) => formatTag(t));
}
