/**
 * Color proposal service (E.W2 Lane A — pipeline migration of `routes/colors.ts`).
 *
 * Owns the write-side of the public color-name surface:
 *   - POST /colors/propose  → submit a new color name (status="proposed")
 *
 * All DB access routes through `services.repositories.proposedNames`.
 * The duplicate-name check is layered (pre-check + 11000-recovery) — the
 * unique index on `proposed_names.name` is authoritative; the pre-check
 * short-circuits the common-case for a cleaner error envelope.
 */

import type { Services } from "../../../platform/http/inject-services.js";
import {
    AuthenticationError,
    ConflictError,
} from "../../../platform/http/errors/index.js";
import type { ProposedNameDTO } from "./queries.js";

export interface ProposeInput {
    name: string;
    css: string;
}

export async function proposeColor(
    services: Services,
    proposerSlug: string | undefined,
    input: ProposeInput,
): Promise<ProposedNameDTO> {
    // V·W45 item 3 — attribution is server-derived from the authenticated
    // Principal (the resolved session's `userSlug`), NEVER a caller-supplied
    // body field. Anonymous / user-less sessions cannot propose.
    if (!proposerSlug) throw new AuthenticationError("Authentication required");

    const { proposedNames } = services.repositories;

    const existing = await proposedNames.findByName(input.name);
    if (existing) {
        throw new ConflictError("A color with this name already exists");
    }

    const now = new Date();
    let id;
    try {
        id = await proposedNames.insert({
            name: input.name,
            css: input.css,
            status: "proposed",
            proposerSlug,
            createdAt: now,
            approvedAt: null,
        });
    } catch (e: unknown) {
        // Defence-in-depth: a race between the pre-check and the insert can
        // surface the unique-index violation; map it to the same envelope.
        if ((e as { code?: number } | undefined)?.code === 11000) {
            throw new ConflictError("A color with this name already exists");
        }
        throw e;
    }

    const doc = await proposedNames.findById(id);
    // Best-effort: the document was just inserted, so this should never miss.
    // If it does, the most useful thing is the canonical envelope we built.
    if (!doc) {
        return {
            id: id.toString(),
            name: input.name,
            css: input.css,
            status: "proposed",
            proposerSlug,
            createdAt: now,
            approvedAt: null,
        };
    }
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
