/**
 * Admin user-management endpoints.
 *
 * Two cohering admin concerns over the user corpus:
 *   - **CRUD**: list, fetch palettes-by-user, delete (+ delete-all-palettes)
 *   - **Lifecycle helpers**: impersonate, prune-empty
 *
 * H.W3 Lane A — extracted from `api.ts §ADMIN — USERS` + `§ADMIN — BATCH
 * ACTIONS` (user half). W5-13 · F-5: `setUserStatus`, `importPalettes`,
 * `batchUserAction` deleted — wired wrappers with zero UI consumers
 * (`setUserStatus` was self-documented dead since E.W3). The server routes
 * remain; the affordances re-add their wrapper when built.
 */

import type { Palette, User, PaginatedResponse } from "../types";

import { adminRequest } from "./client";

// ---- CRUD -------------------------------------------------------------------

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
