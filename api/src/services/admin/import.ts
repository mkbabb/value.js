/**
 * Admin import service — bulk-import palettes to a user account.
 *
 * Extracted from `services/admin/users.ts` to keep both files under the
 * 250-line cap (D.W2 Lane B sub-gate). The route still lives under
 * `routes/admin/users.ts` (`POST /admin/users/:slug/import`).
 *
 * Emits a typed audit event via `emitAuditEvent`.
 */

import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { NotFoundError } from "../../errors/index.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import type { PaletteColor } from "../../models.js";

export interface ImportPaletteInput {
    name: string;
    slug: string;
    colors: PaletteColor[];
}

export interface ImportResult {
    imported: number;
    errors: string[];
}

export async function importPalettes(
    c: Context<AppEnv>,
    slug: string,
    entries: ImportPaletteInput[],
): Promise<ImportResult> {
    const { users, palettes } = c.var.services.repositories;
    const user = await users.findBySlug(slug);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const now = new Date();
    let imported = 0;
    const errors: string[] = [];

    for (const p of entries) {
        try {
            await palettes.insert({
                name: p.name,
                slug: p.slug,
                colors: p.colors,
                oklabColors: [],
                tags: [],
                voteCount: 0,
                sessionToken: null,
                userSlug: slug,
                status: "published",
                visibility: "public",
                tier: "standard",
                deletedAt: null,
                createdAt: now,
                updatedAt: now,
                currentHash: null,
                forkOf: null,
                forkOfHash: null,
                forkCount: 0,
                versionCount: 1,
            });
            imported++;
        } catch (e: unknown) {
            // Duplicate slug — record the conflict but don't fail the whole batch.
            const code = (e as { code?: number } | undefined)?.code;
            if (code === 11000) {
                errors.push(`Duplicate slug: ${p.slug}`);
                continue;
            }
            throw e;
        }
    }

    await emitAuditEvent(c, "import-palettes", {
        target: `slug=${slug} count=${imported}`,
    });
    return { imported, errors };
}
