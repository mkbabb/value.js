/**
 * Colour-naming domain — the approved-name registry + propose-new-name surface.
 *
 * This is a color-session concern, not a palette concern (ARCHITECTURE §1): the
 * picker resolves custom names and proposes new ones against the CURRENT color;
 * palette admin merely MODERATES the proposal queue (approve/reject), consuming
 * the `ProposedColorName` DTO from here. Lifted out of `palettes/api/colors.ts`
 * at W43b3 (RF-15). Tag listing (a palette concern) stays in `palettes/api`.
 */
import { request } from "../platform/transport/client";

export interface ProposedColorName {
    id: string;
    name: string;
    css: string;
    status: "proposed" | "approved" | "rejected";
    contributor?: string;
    createdAt: string;
    approvedAt?: string;
}

// color-session reads only `.data`; the full pagination envelope is a
// palette-api transport concern the color domain does not depend on.
export function getApprovedColorNames(
    limit?: number,
    offset?: number,
): Promise<{ data: ProposedColorName[] }> {
    const params = new URLSearchParams();
    if (limit != null) params.set("limit", String(limit));
    if (offset != null) params.set("offset", String(offset));
    const qs = params.toString();
    return request(`/colors/approved${qs ? `?${qs}` : ""}`);
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
