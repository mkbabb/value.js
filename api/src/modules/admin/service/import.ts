/**
 * Admin import service — bulk-import palettes to a user account.
 *
 * Extracted from `services/admin/users.ts` to keep both files under the
 * 250-line cap (D.W2 Lane B sub-gate). The route still lives under
 * `routes/admin/users.ts` (`POST /admin/users/:slug/import`).
 *
 * Emits a typed audit event via `emitAuditEvent`.
 */

import type { Services } from "../../../platform/http/inject-services.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
import { emitAuditEvent } from "../audit-log.js";
import type { PaletteColor } from "../../palette/model.js";

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
    services: Services,
    actorSlug: string | undefined,
    slug: string,
    entries: ImportPaletteInput[],
): Promise<ImportResult> {
    const { users, palettes } = services.repositories;
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
                userSlug: slug,
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

    await emitAuditEvent(services, actorSlug, "import-palettes", {
        target: `slug=${slug} count=${imported}`,
    });
    return { imported, errors };
}
