/**
 * atomdiff — per-atom set-difference over a small, flat, content-addressable bag.
 *
 * The CANONICAL artifact of the constellation WAVE-D atom-diff pattern
 * (`fourier-analysis/docs/tranches/J/design/J-diff-shape.md` §2.5: `atomdiff`
 * names the ARTIFACT; `remix` names the FEATURE). This is value.js's
 * per-language twin of fourier's `api/lib/crud/atomdiff.py` — same WIRE
 * envelope, palette-local atom VALUE. Neither binds to the other; BOTH bind to
 * the repo-neutral shape doc (J-diff-shape §3/§4). No shared package, no
 * codegen (inv-16 / inv-26): the pattern is hand-typed per repo, only the atom
 * value differs.
 *
 * The value.js atom is a color stop (`PaletteColor`). Its KEY is `position`
 * (the stable slot identity in the ladder); its CONTENT hash is over
 * `(css, name)` (NOT position). Consequences: a recolor-at-a-slot is one
 * `changed` op; an append is `added`; a deletion is `removed`; a full re-order
 * degrades to `changed` ops (honest, KISS — there is NO `moved` op, the
 * vocabulary is the closed past-tense triple, J-diff-shape §2.1).
 */

import type { PaletteColor } from "../../models.js";
import { computeAtomHash } from "../../hash.js";

/** The closed, past-tense op vocabulary (J-diff-shape §2.1). No `moved`/fourth. */
export type AtomDiffOpKind = "added" | "removed" | "changed";

/**
 * One atom-level change on a provenance edge (J-diff-shape §3.1).
 *
 * - `before` present for `removed` + `changed`; absent for `added`.
 * - `after`  present for `added`   + `changed`; absent for `removed`.
 * - `atomKey` is the palette-local key: the stop `position` (a number).
 *   (fourier-J overrides the key type to a config-atom name string — the
 *   parameterization seam; the WIRE shape is identical.)
 */
export interface AtomDiffOp {
    op: AtomDiffOpKind;
    atomKey: number;
    before?: PaletteColor;
    after?: PaletteColor;
}

/**
 * The `/diff` WIRE response envelope (J-diff-shape §3.2). EXACTLY four fields:
 * the two set-hashes (which ARE the from/to identifiers — there is NO redundant
 * `fromSetHash`/`toSetHash`, §2.4), the ops array (empty ⟺ identical, never
 * null/omitted), and the one kept convenience boolean.
 */
export interface DiffResponse {
    fromHash: string;
    toHash: string;
    ops: AtomDiffOp[];
    identical: boolean;
}

/**
 * Pure, deterministic set-difference of two atom bags, keyed by position.
 *
 * - position only in `before` → `removed`
 * - position only in `after`  → `added`
 * - position in both, differing atom-hash → `changed`
 * - position in both, equal atom-hash → elided (no op)
 *
 * Output is sorted by `atomKey` for a stable, comparable diff. SYMMETRIC:
 * `diffAtoms(B, A)` is the inverse of `diffAtoms(A, B)` (`added`↔`removed`,
 * `changed` swaps `before`↔`after`, key set identical) — the J.W2 conformance
 * gate. `diffAtoms(A, A)` is the empty array (the dedup property on the wire).
 */
export function diffAtoms(
    before: PaletteColor[],
    after: PaletteColor[],
): AtomDiffOp[] {
    const byKeyBefore = new Map<number, PaletteColor>(
        before.map((a) => [a.position, a]),
    );
    const byKeyAfter = new Map<number, PaletteColor>(
        after.map((a) => [a.position, a]),
    );
    const ops: AtomDiffOp[] = [];

    for (const [key, b] of byKeyBefore) {
        const a = byKeyAfter.get(key);
        if (!a) {
            ops.push({ op: "removed", atomKey: key, before: b });
        } else if (computeAtomHash(a) !== computeAtomHash(b)) {
            ops.push({ op: "changed", atomKey: key, before: b, after: a });
        }
        // equal hash → no op
    }
    for (const [key, a] of byKeyAfter) {
        if (!byKeyBefore.has(key)) {
            ops.push({ op: "added", atomKey: key, after: a });
        }
    }
    return ops.sort((x, y) => x.atomKey - y.atomKey);
}
