import type { Palette } from "./types";

/**
 * The ONE palette slug rule (X.W7.b, G5/G6 — ruled once): NFKD transliteration,
 * then a percent-safe fallback. Decomposition strips combining marks, so
 * `Café` → `cafe`; a letter or number with no ASCII decomposition (`日本`) keeps
 * its identity as the lowercase hex of its UTF-8 bytes — its percent-encoding
 * without the `%` — so the slug stays inside the server grammar
 * `^[a-z0-9][a-z0-9-]*$` and needs no escaping in a URL. Everything else is a
 * separator; separator runs collapse to one `-`, and none leads or trails.
 */
export function slugify(str: string): string {
    return str
        .normalize("NFKD")
        .replace(/\p{M}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/gu, (ch) => (/[\p{L}\p{N}]/u.test(ch) ? percentSafe(ch) : " "))
        .trim()
        .replace(/[\s-]+/g, "-");
}

function percentSafe(ch: string): string {
    let hex = "";
    for (const byte of new TextEncoder().encode(ch)) hex += byte.toString(16).padStart(2, "0");
    return hex;
}

export function createSlug(name: string): string {
    const stem = slugify(name);
    const suffix = crypto.randomUUID().slice(0, 8);
    return stem === "" ? suffix : `${stem}-${suffix}`;
}

export type PaletteKind = "temporary" | "saved" | "remote";

const TEMP_ID_PREFIXES = ["gen-", "__extracted__", "mix-"];

export function getPaletteKind(palette: Palette): PaletteKind {
    if (!palette.isLocal) return "remote";
    // K-PALID: a local palette always carries an `id`; the temp prefixes mark
    // the ephemeral (gen/mix/extracted) locals apart from the saved ones.
    const id = palette.id;
    if (id != null && TEMP_ID_PREFIXES.some((p) => id.startsWith(p))) {
        return "temporary";
    }
    return "saved";
}
