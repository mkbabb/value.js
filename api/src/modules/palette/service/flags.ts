/**
 * Palette flags service (D.W2 Lane A).
 *
 * Single route: `POST /palettes/:slug/flag` — user flags a palette for admin
 * review. Self-flagging is rejected (ValidationError). Duplicate flags by the
 * same reporter are rejected via the unique `(paletteSlug, reporterSlug)`
 * index → ConflictError.
 */

import type { Services } from "../../../platform/http/inject-services.js";
import type { FlagReason } from "../model.js";
import {
    ConflictError,
    NotFoundError,
    ValidationError,
} from "../../../platform/http/errors/index.js";

export interface FlagInput {
    paletteSlug: string;
    reporterSlug: string;
    reason: FlagReason;
    detail?: string | undefined;
}

export async function flagPalette(
    services: Services,
    input: FlagInput,
): Promise<void> {
    const { paletteSlug, reporterSlug, reason, detail } = input;

    const palette = await services.repositories.palettes.findBySlug(paletteSlug);
    if (!palette) throw new NotFoundError("Palette not found");

    if (palette.userSlug === reporterSlug) {
        throw new ValidationError("Cannot flag your own palette");
    }

    try {
        await services.repositories.flags.insert({
            paletteSlug,
            reporterSlug,
            reason,
            detail: detail ?? null,
            createdAt: new Date(),
        });
    } catch (e) {
        if ((e as { code?: number })?.code === 11000) {
            throw new ConflictError("Already flagged");
        }
        throw e;
    }
}
