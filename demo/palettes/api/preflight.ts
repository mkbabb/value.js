/**
 * X.W7.d — the client pre-flight over the server's palette write contract
 * (W7.md §5.d: "Enforce the server bounds client-side (`colors ≤ 50`,
 * `tags ≤ 10`) with a pre-flight signal, not a relayed zod string").
 *
 * The bounds are the published contract at `api/src/modules/palette/schema.ts`
 * (`colorsArraySchema` 1..50 · `tagsArraySchema` ≤ 10 of 1..30 chars ·
 * `colorEntrySchema` = `{ css, name?, position }`) and the tag vocabulary at the
 * admin tag schema (`/^[a-z0-9-]+$/`, ≤ 30). A write that would violate them is
 * refused HERE, in words, before a request exists — the user never reads a zod
 * issue path, and no request is spent on a known 400.
 *
 * N-14 (the rejection arm): the wire carries no `weight`. zod strips unknown
 * keys without a 400 or a log, so an extracted palette's population shares would
 * vanish on publish with nothing said. Until the wire carries the field (an
 * `api/**` cure, not this wave's), a weighted palette's publish is refused
 * explicitly and the refusal is rendered.
 */
import type { PaletteColor } from "../types";

export const PALETTE_WIRE_LIMITS = {
    minColors: 1,
    maxColors: 50,
    maxTags: 10,
    maxTagLength: 30,
} as const;

const TAG_PATTERN = /^[a-z0-9-]+$/;

export type Preflight = { readonly ok: true } | { readonly ok: false; readonly message: string };

const OK: Preflight = { ok: true };

/** Pre-flight a palette's colours for a server write (publish / save). */
export function preflightColors(colors: readonly PaletteColor[]): Preflight {
    const n = colors.length;
    if (n < PALETTE_WIRE_LIMITS.minColors) {
        return { ok: false, message: "A palette needs at least one color to be published." };
    }
    if (n > PALETTE_WIRE_LIMITS.maxColors) {
        return {
            ok: false,
            message: `A published palette holds at most ${PALETTE_WIRE_LIMITS.maxColors} colors — this one has ${n}. Remove ${n - PALETTE_WIRE_LIMITS.maxColors} to publish it.`,
        };
    }
    if (colors.some((c) => c.weight != null)) {
        return {
            ok: false,
            message: "This palette carries color weights, which publishing would discard. It stays saved locally with its weights.",
        };
    }
    return OK;
}

/** Pre-flight a tag set for a server write. */
export function preflightTags(tags: readonly string[]): Preflight {
    if (tags.length > PALETTE_WIRE_LIMITS.maxTags) {
        return {
            ok: false,
            message: `A palette carries at most ${PALETTE_WIRE_LIMITS.maxTags} tags — remove ${tags.length - PALETTE_WIRE_LIMITS.maxTags}.`,
        };
    }
    const bad = tags.find((t) => !isTagName(t));
    if (bad !== undefined) return { ok: false, message: tagNameProblem(bad) };
    return OK;
}

/** W7.80 (ATP-10): lower-casing is not validation — the vocabulary is. */
export function isTagName(name: string): boolean {
    return name.length >= 1 && name.length <= PALETTE_WIRE_LIMITS.maxTagLength && TAG_PATTERN.test(name);
}

export function tagNameProblem(name: string): string {
    if (name.length === 0) return "A tag needs at least one character.";
    if (name.length > PALETTE_WIRE_LIMITS.maxTagLength) {
        return `“${name}” is longer than ${PALETTE_WIRE_LIMITS.maxTagLength} characters.`;
    }
    return `“${name}” may use only lowercase letters, digits and hyphens.`;
}
