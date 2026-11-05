/**
 * The slice route, read from the entry's hash: `#/picker?palette=…&scheme=…`
 * or `#/gradient?palette=…&scheme=…`.
 *
 * `palette` is either a palette slug (`[a-z0-9-]+`, read from the palette API)
 * or inline stops: colours separated by `;`, each optionally named, as in
 * `efflorescence:oklch(73% 0.185 2);gulabi:oklch(90% 0.055 18)`. A colour
 * literal is kept only if value.js parses it.
 */
import { parseCssColor } from "@mkbabb/value.js/css";
import type { Scheme } from "./bridge";

export type SliceName = "picker" | "gradient";

export interface SliceStop {
    css: string;
    name?: string;
}

export type SlicePalette =
    | { kind: "stops"; stops: SliceStop[] }
    | { kind: "slug"; slug: string }
    | { kind: "none" };

export interface SliceRoute {
    slice: SliceName | null;
    scheme: Scheme | null;
    palette: SlicePalette;
}

const SLUG = /^[a-z0-9][a-z0-9-]{0,127}$/;
const NAMED = /^([a-z][a-z0-9 -]{0,63}):(.+)$/i;

export function parseStops(source: string): SliceStop[] {
    const stops: SliceStop[] = [];
    for (const raw of source.split(";")) {
        const entry = raw.trim();
        if (!entry) continue;
        const named = NAMED.exec(entry);
        const css = (named ? named[2]! : entry).trim();
        if (!parseCssColor(css).ok) continue;
        stops.push(named ? { css, name: named[1]!.trim() } : { css });
    }
    return stops;
}

export function parsePalette(value: string | null): SlicePalette {
    if (!value) return { kind: "none" };
    const trimmed = value.trim();
    if (SLUG.test(trimmed)) return { kind: "slug", slug: trimmed };
    const stops = parseStops(trimmed);
    return stops.length > 0 ? { kind: "stops", stops } : { kind: "none" };
}

export function parseSliceRoute(hash: string): SliceRoute {
    const body = hash.replace(/^#/, "");
    const queryAt = body.indexOf("?");
    const path = (queryAt < 0 ? body : body.slice(0, queryAt)).replace(/^\/+|\/+$/g, "");
    const query = new URLSearchParams(queryAt < 0 ? "" : body.slice(queryAt + 1));
    const scheme = query.get("scheme");
    return {
        slice: path === "picker" || path === "gradient" ? path : null,
        scheme: scheme === "dark" || scheme === "light" ? scheme : null,
        palette: parsePalette(query.get("palette")),
    };
}
