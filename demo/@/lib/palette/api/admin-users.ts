/**
 * Admin user-management endpoints.
 *
 * Three cohering admin concerns over the user corpus:
 *   - **CRUD + status**: list, fetch palettes-by-user, set status, delete
 *   - **Lifecycle helpers**: impersonate, prune-empty, bulk-import palettes
 *   - **Batch**: multi-user delete/suspend/unsuspend
 *
 * H.W3 Lane A — extracted from `api.ts §ADMIN — USERS` + `§ADMIN — BATCH
 * ACTIONS` (user half).
 */

import type { Palette, User, PaginatedResponse } from "../types";

import { adminRequest } from "./client";

// ---- CRUD + status ----------------------------------------------------------

export function listUsers(
    token: string,
    limit = 20,
    offset = 0,
    q?: string,
): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
    });
    if (q) params.set("q", q);
    return adminRequest(`/admin/users?${params}`, token);
}

export function getUserPalettes(token: string, slug: string): Promise<Palette[]> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/palettes`, token);
}

export function setUserStatus(
    token: string,
    slug: string,
    status: "active" | "suspended",
): Promise<{ slug: string; status: string }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/status`, token, {
        method: "POST",
        body: JSON.stringify({ status }),
    });
}

export function deleteUser(
    token: string,
    slug: string,
): Promise<{ deleted: boolean; palettesDeleted: number }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}`, token, {
        method: "DELETE",
    });
}

export function deleteUserPalettes(
    token: string,
    slug: string,
): Promise<{ deleted: number }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/palettes`, token, {
        method: "DELETE",
    });
}

// ---- Lifecycle helpers ------------------------------------------------------

export function impersonateUser(
    token: string,
    slug: string,
): Promise<{ token: string; userSlug: string }> {
    return adminRequest("/admin/impersonate", token, {
        method: "POST",
        body: JSON.stringify({ slug }),
    });
}

export function pruneEmptyUsers(token: string): Promise<{ pruned: number }> {
    return adminRequest("/admin/users/prune-empty", token, { method: "POST" });
}

export function importPalettes(
    token: string,
    slug: string,
    palettes: {
        name: string;
        slug: string;
        colors: { css: string; name?: string; position: number }[];
    }[],
): Promise<{ imported: number; errors: string[] }> {
    return adminRequest(`/admin/users/${encodeURIComponent(slug)}/import`, token, {
        method: "POST",
        body: JSON.stringify({ palettes }),
    });
}

// ---- Batch actions ----------------------------------------------------------

export function batchUserAction(
    token: string,
    action: "delete" | "suspend" | "unsuspend",
    slugs: string[],
): Promise<{ processed: number }> {
    return adminRequest("/admin/batch/users", token, {
        method: "POST",
        body: JSON.stringify({ action, slugs }),
    });
}
