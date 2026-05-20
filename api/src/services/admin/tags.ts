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

import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { ConflictError, NotFoundError } from "../../errors/index.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import type { Tag } from "../../models.js";

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

function format(tag: Tag & { _id: unknown }): TagDTO {
    return {
        id: String(tag._id),
        name: tag.name,
        category: tag.category,
        createdAt: tag.createdAt,
    };
}

export async function listTags(c: Context<AppEnv>): Promise<TagDTO[]> {
    const { tags } = c.var.services.repositories;
    const rows = await tags.findAllSorted();
    return rows.map((t) => format(t as Tag & { _id: unknown }));
}

export async function createTag(
    c: Context<AppEnv>,
    name: string,
    category: string,
): Promise<CreateTagResult> {
    const { tags } = c.var.services.repositories;
    try {
        const id = await tags.insert({
            name,
            category,
            createdAt: new Date(),
        });
        await emitAuditEvent(c, "create-tag", { target: `name=${name} category=${category}` });
        return { id: id.toString(), name, category };
    } catch (e: unknown) {
        const code = (e as { code?: number } | undefined)?.code;
        if (code === 11000) {
            throw new ConflictError("Tag already exists");
        }
        throw e;
    }
}

export async function deleteTag(c: Context<AppEnv>, name: string): Promise<void> {
    const { tags, palettes } = c.var.services.repositories;
    const deleted = await tags.deleteByName(name);
    if (deleted === 0) {
        throw new NotFoundError("Tag not found");
    }
    // Cascade: pull the tag from every palette that carries it
    await palettes.pullTagFromAll(name);
    await emitAuditEvent(c, "delete-tag", { target: `name=${name}` });
}
