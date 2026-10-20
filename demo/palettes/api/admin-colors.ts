/**
 * Admin colour-name + tag-management endpoints.
 *
 * Two cohering admin concerns over the colour-vocabulary corpus:
 *   - **Proposal queue**: list/approve/reject/delete the proposed-name backlog
 *   - **Tag CRUD**: admin-only `getAdminTags` / `createTag` / `deleteTag`
 *
 * Public read-side counterparts (search, approved-list, tag-list, propose)
 * live in `./colors.ts`.
 *
 * H.W3 Lane A — extracted from `api.ts §ADMIN — COLORS` + `§ADMIN — TAGS`.
 */

import type { Tag, PaginatedResponse } from "../types";
import type { ProposedColorName } from "../../color-session/color-names";

import { adminRequest } from "../../platform/transport/client";

// ---- Proposal queue ---------------------------------------------------------

export function getAdminQueue(
    token: string,
    limit = 50,
    offset = 0,
): Promise<PaginatedResponse<ProposedColorName>> {
    return adminRequest(`/admin/queue?limit=${limit}&offset=${offset}`, token);
}

export function approveColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/approve`, token, {
        method: "POST",
    });
}

export function rejectColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}/reject`, token, {
        method: "POST",
    });
}

export function getApprovedColorNamesAdmin(
    token: string,
    limit = 50,
    offset = 0,
): Promise<PaginatedResponse<ProposedColorName>> {
    return adminRequest(
        `/admin/colors/approved?limit=${limit}&offset=${offset}`,
        token,
    );
}

export function deleteColorName(token: string, id: string): Promise<void> {
    return adminRequest(`/admin/colors/${encodeURIComponent(id)}`, token, {
        method: "DELETE",
    });
}

// ---- Tag CRUD ---------------------------------------------------------------

// SS8-0532 (C-18 · the ATP-13 identity): a tag IS its name — the list keys,
// labels and deletes by it — so a row without a non-empty string `name` is
// dropped at the wire, never drawn as an empty pill ("Delete tag undefined").
const isNamedTag = (row: unknown): row is Tag =>
    typeof (row as Partial<Tag> | null)?.name === "string" && (row as Tag).name !== "";

export async function getAdminTags(token: string): Promise<Tag[]> {
    const rows = await adminRequest<unknown[]>("/admin/tags", token);
    return rows.filter(isNamedTag);
}

export function createTag(
    token: string,
    name: string,
    category: string,
): Promise<Tag> {
    return adminRequest("/admin/tags", token, {
        method: "POST",
        body: JSON.stringify({ name, category }),
    });
}

export function deleteTag(
    token: string,
    name: string,
): Promise<{ deleted: boolean }> {
    return adminRequest(`/admin/tags/${encodeURIComponent(name)}`, token, {
        method: "DELETE",
    });
}
