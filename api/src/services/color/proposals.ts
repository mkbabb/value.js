/**
 * Color proposal service (E.W2 Lane A — pipeline migration of `routes/colors.ts`).
 *
 * Owns the write-side of the public color-name surface:
 *   - POST /colors/propose  → submit a new color name (status="proposed")
 *
 * All DB access routes through `c.var.services.repositories.proposedNames`.
 * The duplicate-name check is layered (pre-check + 11000-recovery) — the
 * unique index on `proposed_names.name` is authoritative; the pre-check
 * short-circuits the common-case for a cleaner error envelope.
 */

import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import {
    AuthenticationError,
    ConflictError,
} from "../../errors/index.js";
import type { ProposedName } from "../../models.js";
import type { ProposedNameDTO } from "./queries.js";

export interface ProposeInput {
    name: string;
    css: string;
    contributor?: string;
}

export async function proposeColor(
    c: Context<AppEnv>,
    input: ProposeInput,
): Promise<ProposedNameDTO> {
    const sessionToken = c.var.sessionToken;
    if (!sessionToken) throw new AuthenticationError("Session token required");

    const { proposedNames } = c.var.services.repositories;

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
            contributor: input.contributor ?? null,
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
            contributor: input.contributor ?? null,
            createdAt: now,
            approvedAt: null,
        };
    }
    const typed = doc as ProposedName & { _id: unknown };
    return {
        id: String(typed._id),
        name: typed.name,
        css: typed.css,
        status: typed.status,
        contributor: typed.contributor,
        createdAt: typed.createdAt,
        approvedAt: typed.approvedAt,
    };
}
