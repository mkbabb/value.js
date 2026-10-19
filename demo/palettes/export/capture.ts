// X.W7.b — capture: the ONE seam from a demo `Palette` to the immutable
// `ExportSnapshot` the five certified serializers consume (Appendix W51 §1).
//
// Capture either yields a snapshot or a typed, user-facing failure — never a
// partial snapshot, a silently dropped colour/tag, or a "repaired" value. No
// slugifier exists here (fold W7.14 / S-6 cure lock): the filename stem and the
// identifier prefix are `canonical.ts`'s, derived from the source identity.
//
// Source mapping (the demo carries no IndexedDB draft ledger — that routed half
// is W50's Prepare→Download seat, not built here):
//   - a LOCAL palette is a Device Draft captured at its first revision;
//   - a REMOTE palette is its current immutable Release (`versionCount`,
//     `currentHash`); a remote palette with no release is a capture failure.
// Tags travel by name: the API identifies a tag by its name end to end.

import { parseCssColor } from "@mkbabb/value.js/css";
import { convertPickerColor } from "../../color-session/picker-color";
import type { Palette, PaletteColor } from "../types";
import { computeContentDigest } from "./digest";
import type { CanonicalNamedColor, ExportSnapshot, ExportTag, SnapshotSource } from "./types";

/** Appendix §1 bounds. */
const MAX_COLORS = 50;
const MAX_TAGS = 10;
const MAX_NAME_SCALARS = 100;
const MAX_NAME_BYTES = 400;

export type CaptureFailureCode =
    | "snapshot_empty"
    | "snapshot_over_cap"
    | "name_out_of_bounds"
    | "tag_invalid"
    | "source_incomplete"
    | "color_unparseable"
    | "color_out_of_contract";

export type CaptureResult =
    | { readonly ok: true; readonly snapshot: ExportSnapshot }
    | { readonly ok: false; readonly failureCode: CaptureFailureCode; readonly message: string };

function fail(failureCode: CaptureFailureCode, message: string): CaptureResult {
    return { ok: false, failureCode, message };
}

/** A missing component (`none`) reads as zero — CSS Color 4 §4.2. */
function numeric(value: number | "none"): number {
    return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

/** `Math.round`, with negative zero folded to zero (a uint has no sign). */
function roundUint(value: number): number {
    return Math.round(value) || 0;
}

/**
 * One colour → the integer-encoded OKLCH atom: lightness in thousandths of a
 * percent, chroma in millionths, hue in thousandths of a degree (wrapped into
 * `[0, 360000)`), alpha in millionths. An atom outside the Appendix bounds is
 * returned as `null`, never clamped into shape; an unparseable one as `undefined`.
 */
function atomOf(color: PaletteColor): CanonicalNamedColor | null | undefined {
    const parsed = parseCssColor(color.css.trim());
    if (!parsed.ok) return undefined;
    const oklch = convertPickerColor(parsed.value, "oklch");
    const [l, c, h] = oklch.channels;
    const atom: CanonicalNamedColor = {
        name: color.name ?? null,
        l: roundUint(numeric(l) * 100000),
        c: roundUint(numeric(c) * 1000000),
        h: ((roundUint(numeric(h) * 1000) % 360000) + 360000) % 360000,
        a: roundUint(numeric(oklch.alpha) * 1000000),
    };
    const inBounds =
        atom.l >= 0 && atom.l <= 100000 &&
        atom.c >= 0 && atom.c <= 1000000 &&
        atom.a >= 0 && atom.a <= 1000000;
    return inBounds ? atom : null;
}

/** Appendix §1: 0..10 unique tags sorted ascending by ASCII code unit. */
function canonicalTagsOf(tags: readonly string[]): readonly ExportTag[] | null {
    const sorted = [...tags].sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i - 1]) return null;
    }
    return sorted.map((name) => ({ tagId: name, label: name }));
}

function sourceOf(palette: Palette): SnapshotSource | null {
    if (palette.isLocal) {
        if (palette.id == null) return null;
        return { sourceKind: "device-draft", deviceDraftId: palette.id, deviceDraftRevision: 1 };
    }
    const releaseNo = palette.versionCount;
    const releaseId = palette.currentHash;
    if (releaseNo == null || releaseNo < 1 || releaseId == null) return null;
    return {
        sourceKind: "release",
        paletteId: palette.slug,
        slug: palette.slug,
        releaseId,
        releaseNo,
    };
}

export async function captureSnapshot(palette: Palette): Promise<CaptureResult> {
    const n = palette.colors.length;
    if (n === 0) return fail("snapshot_empty", "This palette has no colors to export.");
    if (n > MAX_COLORS) {
        return fail("snapshot_over_cap", `A palette exports at most ${MAX_COLORS} colors; this one has ${n}.`);
    }

    const scalars = [...palette.name].length;
    if (scalars < 1 || scalars > MAX_NAME_SCALARS || new TextEncoder().encode(palette.name).length > MAX_NAME_BYTES) {
        return fail("name_out_of_bounds", `A palette name must be 1–${MAX_NAME_SCALARS} characters to export.`);
    }

    const tags = palette.tags ?? [];
    const canonicalTags = tags.length <= MAX_TAGS ? canonicalTagsOf(tags) : null;
    if (canonicalTags === null) {
        return fail("tag_invalid", `A palette exports at most ${MAX_TAGS} distinct tags.`);
    }

    const source = sourceOf(palette);
    if (source === null) {
        return fail("source_incomplete", "This palette has no saved version to export yet.");
    }

    const orderedNamedColors: CanonicalNamedColor[] = [];
    for (const color of palette.colors) {
        const atom = atomOf(color);
        if (atom === undefined) {
            return fail("color_unparseable", `The color ${color.css} is not a CSS color.`);
        }
        if (atom === null) {
            return fail("color_out_of_contract", `The color ${color.css} cannot be exported.`);
        }
        orderedNamedColors.push(atom);
    }

    return {
        ok: true,
        snapshot: {
            schema: "value.export-snapshot/v1",
            source,
            displayName: palette.name,
            orderedNamedColors,
            canonicalTags,
            contentDigest: await computeContentDigest(orderedNamedColors),
        },
    };
}
