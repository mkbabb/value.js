/**
 * Color-names-domain document shapes (T.W1 — carved from `models.ts` per
 * E-1/F4). The color bounded context spans two collections — `proposed_names`
 * and `tags`.
 */

import type { ObjectId } from "mongodb";

export const PROPOSED_NAME_STATUSES = ["proposed", "approved", "rejected"] as const;
export type ProposedNameStatus = (typeof PROPOSED_NAME_STATUSES)[number];

// ---------------------------------------------------------------
// proposed_names
// ---------------------------------------------------------------

export interface ProposedName {
    _id?: ObjectId;
    name: string;
    css: string;
    status: ProposedNameStatus;
    /**
     * Server-derived attribution: the slug of the authenticated Principal who
     * proposed the name (V·W45 item 3). NEVER a caller-controlled body field.
     * `null` for legacy/seeded rows with no known proposer.
     */
    proposerSlug: string | null;
    createdAt: Date;
    approvedAt: Date | null;
}

// ---------------------------------------------------------------
// tags
// ---------------------------------------------------------------

export interface Tag {
    _id?: ObjectId;
    name: string;
    category: string;
    createdAt: Date;
}
