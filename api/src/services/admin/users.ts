/**
 * Admin users service — listing, status, deletion.
 *
 * Owns:
 *   - GET /admin/users                       (paginated list with search)
 *   - GET /admin/users/:slug/palettes        (raw list of any user's palettes)
 *   - POST /admin/users/:slug/status         (active | suspended)
 *   - DELETE /admin/users/:slug              (delete + cascade palettes/votes/flags/sessions)
 *   - DELETE /admin/users/:slug/palettes     (delete palettes only)
 *   - POST /admin/users/prune-empty          (delete users with zero palettes)
 *
 * Bulk palette import is in `./import.ts` (route still under `/admin/users/:slug/import`).
 * All admin actions emit a typed audit event via `emitAuditEvent`.
 */

import type { Context } from "hono";
import type { Filter } from "mongodb";
import type { AppEnv } from "../../types.js";
import { NotFoundError } from "../../errors/index.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import { escapeRegex } from "../../regex.js";
import type { Palette, PaletteColor, User, UserStatus } from "../../models.js";

export interface UserListEntry {
    slug: string;
    createdAt: Date;
    lastSeenAt?: Date;
    status?: UserStatus;
    paletteCount: number;
}

export interface UserListPage {
    data: UserListEntry[];
    total: number;
    limit: number;
    offset: number;
}

export async function listUsers(
    c: Context<AppEnv>,
    limit: number,
    offset: number,
    q: string | undefined,
): Promise<UserListPage> {
    const { users } = c.var.services.repositories;
    const match: Filter<User> = {};
    if (q && q.length > 0) {
        // _id is the slug — regex search against it
        (match as Record<string, unknown>)._id = {
            $regex: escapeRegex(q),
            $options: "i",
        };
    }

    const [rows, total] = await Promise.all([
        users.aggregateUsersWithPaletteCount(match, offset, limit),
        users.countByFilter(match),
    ]);

    const data: UserListEntry[] = rows.map((row) => ({
        slug: row.slug as string,
        createdAt: row.createdAt as Date,
        lastSeenAt: row.lastSeenAt as Date | undefined,
        status: row.status as UserStatus | undefined,
        paletteCount: (row.paletteCount as number) ?? 0,
    }));

    return { data, total, limit, offset };
}

export interface UserPaletteEntry {
    id: string;
    name: string;
    slug: string;
    colors: PaletteColor[];
    status: Palette["status"];
    voteCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function listUserPalettes(
    c: Context<AppEnv>,
    slug: string,
): Promise<UserPaletteEntry[]> {
    const { palettes } = c.var.services.repositories;
    // Use a wide window — the original route had no pagination here.
    const rows = await palettes.findByUserSlug(slug, 0, 1000);
    return rows.map((p) => {
        const doc = p as Palette & { _id: unknown };
        return {
            id: String(doc._id),
            name: doc.name,
            slug: doc.slug,
            colors: doc.colors,
            status: doc.status,
            voteCount: doc.voteCount,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    });
}

export async function setUserStatus(
    c: Context<AppEnv>,
    slug: string,
    status: UserStatus,
): Promise<void> {
    const { users, sessions } = c.var.services.repositories;
    const user = await users.findBySlug(slug);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    await users.setStatus(slug, status);
    // Invalidate sessions on suspension
    if (status === "suspended") {
        await sessions.deleteByUserSlug(slug);
    }
    await emitAuditEvent(c, "set-user-status", { target: `slug=${slug} status=${status}` });
}

export interface DeleteUserResult {
    palettesDeleted: number;
}

/**
 * Delete a user + cascade: all their palettes, votes on those palettes,
 * flags on those palettes, and all their sessions.
 *
 * Used directly by `DELETE /admin/users/:slug` AND by `batch.ts` when
 * action="delete" is applied to multiple users.
 *
 * On `throwIfMissing=false`, returns null (not an error) when the user
 * does not exist — used by `batch` to skip absent slugs.
 */
export async function deleteUser(
    c: Context<AppEnv>,
    slug: string,
    options: { throwIfMissing?: boolean; emit?: boolean } = {},
): Promise<DeleteUserResult | null> {
    const { throwIfMissing = true, emit = true } = options;
    const services = c.var.services;
    const { users, palettes, votes, flags, sessions, adminAudit } =
        services.repositories;

    // Quick pre-check OUTSIDE the transaction — `throwIfMissing=false` callers
    // (batch.ts) want a fast skip without paying a session-startup cost. The
    // canonical check still happens INSIDE the transaction below.
    const userExists = await users.findBySlug(slug);
    if (!userExists) {
        if (throwIfMissing) throw new NotFoundError("User not found");
        return null;
    }

    // Cascade inside a single transaction (E.W2 Lane B). All-or-nothing: if
    // any step throws (e.g. transient driver error, write concern timeout),
    // the user is NOT deleted and the request fails with a 5xx — the client
    // can retry. Outside-the-transaction `emitAuditEvent` STAYS befitting-
    // graceful per `events/auditLog.ts` D3 carve-out: an audit-log hiccup
    // must not roll back a real admin action.
    const paletteSlugs = await services.withTransaction(async (session) => {
        const userPalettes = await palettes.findByUserSlug(slug, 0, 10_000, session);
        const slugs = userPalettes.map((p) => p.slug);
        if (slugs.length > 0) {
            await votes.deleteByPaletteSlugs(slugs, session);
            await flags.deleteByPaletteSlugs(slugs, session);
            await palettes.deleteManyByUserSlug(slug, session);
        }
        await sessions.deleteByUserSlug(slug, session);
        await adminAudit.deleteByActorSlug(slug, session);
        await users.delete(slug, session);
        return slugs;
    });

    if (emit) {
        await emitAuditEvent(c, "delete-user", {
            target: `slug=${slug} palettes=${paletteSlugs.length}`,
        });
    }
    return { palettesDeleted: paletteSlugs.length };
}

export async function deleteUserPalettes(
    c: Context<AppEnv>,
    slug: string,
): Promise<number> {
    const { users, palettes, votes, flags } = c.var.services.repositories;
    const user = await users.findBySlug(slug);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const userPalettes = await palettes.findByUserSlug(slug, 0, 10_000);
    const paletteSlugs = userPalettes.map((p) => p.slug);
    if (paletteSlugs.length > 0) {
        await votes.deleteByPaletteSlugs(paletteSlugs);
        await flags.deleteByPaletteSlugs(paletteSlugs);
    }
    const deletedCount = await palettes.deleteManyByUserSlug(slug);
    await emitAuditEvent(c, "delete-user-palettes", {
        target: `slug=${slug} count=${deletedCount}`,
    });
    return deletedCount;
}

export async function pruneEmptyUsers(c: Context<AppEnv>): Promise<number> {
    const { users, sessions } = c.var.services.repositories;
    const slugs = await users.findEmptyUserSlugs();
    if (slugs.length === 0) {
        await emitAuditEvent(c, "prune-empty-users", { target: "count=0" });
        return 0;
    }
    await sessions.deleteByUserSlugs(slugs);
    const deleted = await users.deleteMany(slugs);
    await emitAuditEvent(c, "prune-empty-users", { target: `count=${deleted}` });
    return deleted;
}

// Bulk-import lives in `./import.ts` to keep this file under the 250-line cap.
