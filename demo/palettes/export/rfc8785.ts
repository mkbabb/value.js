// V.W51 (F5) — RFC 8785 (JSON Canonicalization Scheme), the subset the export
// contract needs. Byte authority: Appendix W51 §1/§3/§5.
//
//   • Object members are sorted by their key's UTF-16 code units (JS default
//     string sort IS that ordering).
//   • No insignificant whitespace.
//   • Strings use the ECMAScript JSON string production (== `JSON.stringify`).
//   • Numbers are integers only — the export contract's closed data (revisions,
//     uint colour components, releaseNo) carries no non-integer number; a
//     non-integer is a corrupt input, not a value to round-trip.

/**
 * Canonicalize an already-plain JSON value to its RFC 8785 string form.
 * `undefined`-valued object members are omitted (optional source arms).
 */
export function canonicalizeJson(value: unknown): string {
    if (value === null) return "null";

    const t = typeof value;
    if (t === "boolean") return value ? "true" : "false";
    if (t === "number") {
        const n = value as number;
        if (!Number.isFinite(n) || !Number.isInteger(n)) {
            throw new RangeError(`RFC8785: refusing non-integer number ${String(n)}`);
        }
        return String(n);
    }
    if (t === "string") return JSON.stringify(value as string);

    if (Array.isArray(value)) {
        return "[" + value.map((v) => canonicalizeJson(v)).join(",") + "]";
    }

    if (t === "object") {
        const obj = value as Record<string, unknown>;
        const keys = Object.keys(obj)
            .filter((k) => obj[k] !== undefined)
            .sort();
        const members = keys.map(
            (k) => JSON.stringify(k) + ":" + canonicalizeJson(obj[k]),
        );
        return "{" + members.join(",") + "}";
    }

    throw new TypeError(`RFC8785: unsupported value of type ${t}`);
}
