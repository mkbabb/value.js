/**
 * Public tag-listing endpoint (palette-domain).
 *
 * Colour-NAME endpoints (approved-name registry + propose-new-name) moved to
 * `color-session/color-names.ts` at W43b3 (RF-15) — naming is a color-session
 * concern, not a palette concern. Admin tag CRUD + proposal moderation live in
 * `./admin-colors.ts`.
 */

import type { Tag } from "../types";

import { request } from "../../platform/transport/client";

export function getTags(): Promise<Tag[]> {
    return request("/colors/tags");
}
