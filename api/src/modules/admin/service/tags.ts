/**
 * Admin tags service — tag CRUD + cascade-remove from palettes on delete.
 *
 * Owns:
 *   - GET /admin/tags             (list, sorted by name)
 *   - POST /admin/tags            (create)
 *   - DELETE /admin/tags/:name    (delete + cascade $pull from palettes)
 *
 * All admin actions emit a typed audit event via `emitAuditEvent`.
 */

import type { WithId } from "mongodb";
import type { Services } from "../../../platform/http/inject-services.js";
import { ConflictError, NotFoundError } from "../../../platform/http/errors/index.js";
import { emitAuditEvent } from "../audit-log.js";
import type { Tag } from "../../color/model.js";

export interface TagDTO {
    id: string;
    name: string;
    category: string;
    createdAt: Date;
}

export interface CreateTagResult {
    id: string;
    name: string;
    category: string;
}

function format(tag: WithId<Tag>): TagDTO {
    return {
        id: String(tag._id),
        name: tag.name,
        category: tag.category,
        createdAt: tag.createdAt,
    };
}

export async function listTags(services: Services): Promise<TagDTO[]> {
    const { tags } = services.repositories;
    const rows = await tags.findAllSorted();
    return rows.map((t) => format(t));
}

export async function createTag(
    services: Services,
    actorSlug: string | undefined,
    name: string,
    category: string,
): Promise<CreateTagResult> {
    const { tags } = services.repositories;
    try {
        const id = await tags.insert({
            name,
            category,
            createdAt: new Date(),
        });
        await emitAuditEvent(services, actorSlug, "create-tag", {
            target: `name=${name} category=${category}`,
        });
        return { id: id.toString(), name, category };
    } catch (e: unknown) {
        const code = (e as { code?: number } | undefined)?.code;
        if (code === 11000) {
            throw new ConflictError("Tag already exists");
        }
        throw e;
    }
}

export async function deleteTag(
    services: Services,
    actorSlug: string | undefined,
    name: string,
): Promise<void> {
    const { tags, palettes } = services.repositories;
    // Cross-collection write (H.W1 Lane A.2 — H1 invariant): delete the
    // tag row AND cascade-pull the tag string from every palette that
    // carries it, in lock-step. A partial failure must not leave a deleted
    // tag whose name still appears in `palettes[*].tags`, nor a still-
    // present tag whose name was already pulled from every palette. Post-
    // txn `emitAuditEvent` stays befitting-graceful per D3.
    await services.withTransaction(async (session) => {
        const deleted = await tags.deleteByName(name, session);
        if (deleted === 0) {
            throw new NotFoundError("Tag not found");
        }
        await palettes.pullTagFromAll(name, session);
    });
    await emitAuditEvent(services, actorSlug, "delete-tag", { target: `name=${name}` });
}
