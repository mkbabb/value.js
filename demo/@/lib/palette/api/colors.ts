/**
 * Public colour-name + tag-listing endpoints.
 *
 * Read-mostly surface consumed by the colour-picker (custom-name resolution,
 * propose-new-name) and by tag-listing UI. Admin moderation of the proposal
 * queue lives in `./admin-colors.ts`; admin tag CRUD in `./admin-colors.ts`
 * as well.
 *
 * H.W3 Lane A — extracted from `api.ts §COLORS`.
 */

import type { ProposedColorName, Tag, PaginatedResponse } from "../types";

import { request } from "./client";

export function getApprovedColorNames(
    limit?: number,
    offset?: number,
): Promise<PaginatedResponse<ProposedColorName>> {
    const params = new URLSearchParams();
    if (limit != null) params.set("limit", String(limit));
    if (offset != null) params.set("offset", String(offset));
    const qs = params.toString();
    return request(`/colors/approved${qs ? `?${qs}` : ""}`);
}

export function searchColorNames(
    q: string,
    limit = 10,
): Promise<{ data: ProposedColorName[] }> {
    return request(`/colors/search?q=${encodeURIComponent(q)}&limit=${limit}`);
}

export function getTags(): Promise<Tag[]> {
    return request("/colors/tags");
}

export function proposeColorName(
    name: string,
    css: string,
    contributor?: string,
): Promise<ProposedColorName> {
    return request("/colors/propose", {
        method: "POST",
        body: JSON.stringify({ name, css, contributor }),
    });
}
