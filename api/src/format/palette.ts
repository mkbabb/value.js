/**
 * Shared palette response formatter (D.W2 Lane C #8 — D-HARDEN-3 §1 C1
 * extraction).
 *
 * One canonical place to convert a `Palette` document to its API envelope.
 * Lanes A + B will replace their inline `formatPalette` helpers with this
 * import; the demo-side TS client should infer its `PaletteResponse` shape
 * from the return type here once contract-v2 lands.
 *
 * Pre-migration defaults (`?? []`, `?? null`, etc.) are preserved here for
 * **read-side compatibility** with existing documents; Lane D's F1 migration
 * smoke probe verifies the at-rest data is post-migration and the defaults
 * can be safely excised once the probe passes.
 */

import type { Palette } from "../models.js";

export interface FormattedPalette {
    id: string;
    name: string;
    slug: string;
    colors: Palette["colors"];
    oklabColors: Palette["oklabColors"];
    tags: string[];
    voteCount: number;
    userSlug: string | null;
    status: Palette["status"];
    createdAt: Date;
    updatedAt: Date;
    currentHash: string | null;
    forkOf: string | null;
    forkOfHash: string | null;
    forkCount: number;
    versionCount: number;
    isLocal: false;
    voted?: boolean;
}

/**
 * Format a palette document for API response.
 *
 * @param doc - the Palette document (with the driver-supplied `_id`)
 * @param votedSlugs - optional set of paletteSlugs the current user has voted on;
 *   when supplied, `voted` is set to true/false; when omitted, `voted` is undefined.
 */
export function formatPalette(
    doc: Palette & { _id: unknown },
    votedSlugs?: Set<string>,
): FormattedPalette {
    const { _id, ...rest } = doc;
    // `sessionToken` is a legacy ownership shim — strip from the response.
    const restWithoutSessionToken = { ...rest } as Partial<Palette>;
    delete restWithoutSessionToken.sessionToken;

    return {
        id: String(_id),
        name: rest.name,
        slug: rest.slug,
        colors: rest.colors,
        // Pre-migration defaults — see file-header note + Lane D F1.
        tags: rest.tags ?? [],
        versionCount: rest.versionCount ?? 1,
        forkCount: rest.forkCount ?? 0,
        forkOf: rest.forkOf ?? null,
        forkOfHash: rest.forkOfHash ?? null,
        currentHash: rest.currentHash ?? null,
        oklabColors: rest.oklabColors ?? [],
        voteCount: rest.voteCount,
        userSlug: rest.userSlug,
        status: rest.status,
        createdAt: rest.createdAt,
        updatedAt: rest.updatedAt,
        isLocal: false,
        voted: votedSlugs ? votedSlugs.has(rest.slug) : undefined,
    };
}
